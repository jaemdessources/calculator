export default function input(btn, field) {
  if (!btn || !field) return;
  //determines which DOM element will receive the input

  let currentField = field.current.querySelector("#currentField") || field.current;
  let currentFieldTextContent = currentField.textContent;
  let currentFieldLength = currentField.textContent.currentFieldTextContent;
  //console.log("the current field is ", currentField);

  //if the btn is a number [0-9], just insert it
  if (/[0-9]/.test(btn)) {
    if (currentFieldTextContent === "0") removeText(currentField, 1);
    //if the last element in the display field is not of the form " operator "
    // another number or an opening parenthesis or a minus sign, add a mulitply
    //  sign with space around before the number
    // Here we will use the texContent property instead of the CurrentFieldTextContent
    // variable to get the most updated value  because the text content could have
    // been modified

    if (
      !(
        / ([+\-÷×]) /.test(currentField.textContent.slice(-3)) ||
        /[0-9(-]/.test(currentField.textContent.slice(-1)) ||
        /^$/.test(currentField.textContent)
      )
    ) {
      insertText(currentField, ` × ${btn}`);
    } else {
      insertText(currentField, btn);
    }
  }
  //If the btn is an operator
  else if (/[+\-÷×]/.test(btn)) {
    //if there's a minus sign with no space around as the last
    // input element
    if (currentFieldTextContent.slice(-1) === "-") return;
    //if there's another operator as the last element in the input
    // Field
    else if (/ ([+\-÷×]) /.test(currentFieldTextContent.slice(-3))) {
      //if the last operator is the same as the new operator just do nothing
      if (currentFieldTextContent.slice(-2, -1) === btn) return field.current;
      //else if the last element is ' × ' or ' ÷ '
      else if (/[×÷]/.test(currentFieldTextContent.slice(-2, -1)) && btn === "-") {
        insertText(currentField, btn);
      }
      // else if the last element in the display is an operator and the sign is not -
      else if (btn !== "-" || /[-+]/.test(currentFieldTextContent.slice(-2, -1))) {
        removeText(currentField, 0, -3);
        insertText(currentField, ` ${btn} `);
      }
    } else if (currentFieldTextContent.slice(-1) === "(" && btn === "-") {
      insertText(currentField, btn);
    }
    //else if the last element is an empty <sup> element, remove it and insert
    // the sign in it's place
    else if (
      currentField.lastElementChild?.nodeName === "SUP" &&
      currentField.lastElementChild?.textContent === ""
    ) {
      currentField.removeChild(currentField.lastElementChild);
      insertText(currentField, ` ${btn} `);
    } //else if the last element of the display is an opening parenthesis
    else {
      insertText(currentField, ` ${btn} `);
    }
  } else if (btn === "(") {
    if (currentFieldTextContent === "0") removeText(currentField, 1);
    // We create a span element assign the "currentField" id to it set the textContent
    // to "(" then we remove the "currentField" id from the actual current field append
    // then span to the previous current field. Finally we insert a placeholder
    // parenthesis
    let element = document.createElement("span");
    element.id = "currentField";
    insertText(element, "(");
    if (currentField.id !== "mainField") currentField.removeAttribute("id");
    currentField.appendChild(element);
    currentField = element;
    insertplaceholderClosingParenthesis(field);
  } else if (btn === ")") {
    //if there is no placeholder closing parenthesis do nothing
    if (!document.querySelector("#placeholderClosingParenthesis")) return;
    // we add ")" to  the current field's  content, remove one placeholder closing parenthesis
    // remove the "currentField" id from the currentField and add it to the parent Element if it's
    // id is not mainField
    // then we set current Field to the parent Element.
    insertText(currentField, ")");
    removeplaceholderClosingParenthesis(field);
    currentField.removeAttribute("id");
    if (currentField.parentElement.id !== "mainField") currentField.parentElement.id = "currentField";
    currentField = currentField.parentElement;
  }
  //if the btn is pi or e check if the last character in the input isn't a pi or a e
  //
  else if (/[πe]/.test(btn)) {
    if (/[πe]/.test(currentFieldTextContent.slice(-1))) {
      insertText(currentField, " × ");
    }
    let element = document.createElement("b");
    element.textContent = btn;
    currentField.appendChild(element);
  } else {
    insertText(currentField, btn);
  }
}

function insertText(currentField, text) {
  //if the field is empty we can safely use the textContent property
  // without destroying any preexisting elements inside it.
  if (currentField.childNodes.length === 0) currentField.textContent += text;
  // else if the last node of the field is a text node (node type 3)
  // we update the last node's value
  else if (currentField.lastChild.nodeType === 3) currentField.lastChild.nodeValue += text;
  // else we insert the next right before the closing tag of the field.
  else currentField.insertAdjacentHTML("beforeend", text);
}

function removeText(currentField, start, end) {
  if (currentField.childNodes.length === 0) {
    currentField.textContent = currentField.textContent.slice(start, end);
  } else if (currentField.lastChild.nodeType === 3) {
    currentField.lastChild.nodeValue = currentField.lastChild.nodeValue.slice(start, end);
  } else {
    throw new Error("We should not have gotten here. Unable to remove Text from removeText Function");
  }
}

function insertplaceholderClosingParenthesis(field) {
  let element = document.querySelector("#placeholderClosingParenthesis");
  if (element) element.textContent += ")";
  else {
    element = document.createElement("span");
    element.id = "placeholderClosingParenthesis";
    element.textContent += ")";
    field.current.appendChild(element);
  }
}

function removeplaceholderClosingParenthesis(field) {
  let element = document.querySelector("#placeholderClosingParenthesis");
  let parenthesisCount = element.textContent.length;
  element.textContent = element.textContent.slice(0, parenthesisCount - 1);
  if (element.textContent === "") field.current.removeChild(element);
}
