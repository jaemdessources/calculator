export default function input(btn, field) {
  if (!btn || !field) return;
  //determines which DOM element will receive the input
  let mainField = field.current;
  let currentField = mainField.querySelector("#currentField") || mainField;
  let currentFieldTextContent = currentField.textContent;

  //console.log("the current field is ", currentField);

  //if the btn is a number [0-9], just insert it
  if (/[0-9]/.test(btn)) {
    if (currentFieldTextContent === "0") removeText(currentField, 1);
    //if the last element in the display field is not of the form " operator "
    // or another number or an opening parenthesis or a minus sign with nospace around before
    // or if the display field is not empty  add a mulitply

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
      if (currentFieldTextContent.slice(-2, -1) === btn) return;
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
    } else if (currentFieldTextContent.slice(-1) === "(" && btn !== "-") {
      return;
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
  }
  //else if btn is an (
  else if (btn === "(") {
    insertOpeningParenthesis(currentField, currentField, mainField);
  }
  //elese if btn is a )
  else if (btn === ")") {
    insertClosingParenthesis(currentField, currentField, mainField);
  }
  //if the btn is pi or e check if the last character in the input isn't a pi or a e
  else if (/[πe]/.test(btn)) {
    if (/[πe]/.test(currentFieldTextContent.slice(-1))) {
      insertText(currentField, " × ");
    }
    let element = document.createElement("b");
    element.textContent = btn;
    currentField.appendChild(element);
  }
  //if the btn is sin, cos,tan,acrsin,arcos,arctan,log or ln
  else if (/sin|cos|tan|arcsin|arccos|arctan|log|ln/.test(btn)) {
    let element = document.createElement("span");
    element.setAttribute("data-func", btn);
    if (/ ([+\-÷×]) /.test(currentFieldTextContent.slice(-3)) || currentFieldTextContent.slice(-1) === "-") {
      element.textContent = btn;
    } else {
      element.textContent = ` ${btn}`;
    }
    currentField.appendChild(element);
    insertOpeningParenthesis(element, currentField, mainField);
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

function insertOpeningParenthesis(element, currentField, mainField) {
  if (currentField.textContent === "0") removeText(currentField, 1);
  // We create a span element assign the "currentField" id to it set the textContent
  // to "(" then we remove the "currentField" id from the actual current field append
  // then span to the previous current field. Finally we insert a placeholder
  // parenthesis
  let container = document.createElement("span");
  container.id = "currentField";
  insertText(container, "(");
  if (currentField.id !== "mainField") currentField.removeAttribute("id");
  element.appendChild(container);
  // currentField = element;
  insertplaceholderClosingParenthesis(mainField);
}

function insertClosingParenthesis(element, currentField, mainField) {
  //if there is no placeholder closing parenthesis do nothing
  //same if the current field is empty.
  console.log(element.textContent);
  if (!document.querySelector("#placeholderClosingParenthesis") || element.textContent === "(") {
    return;
  }
  // we add ")" to  the current field's  content, remove one placeholder closing parenthesis
  // remove the "currentField" id from the currentField and add it to the parent Element if it's
  // id is not mainField
  // then we set current Field to the parent Element.
  insertText(element, ")");
  removeplaceholderClosingParenthesis(mainField);
  currentField.removeAttribute("id");
  setNextCurrentField(currentField);
}

function insertplaceholderClosingParenthesis(mainField) {
  let placeholderParenthesis = document.querySelector("#placeholderClosingParenthesis");
  if (placeholderParenthesis) placeholderParenthesis.textContent += ")";
  else {
    placeholderParenthesis = document.createElement("span");
    placeholderParenthesis.id = "placeholderClosingParenthesis";
    placeholderParenthesis.textContent += ")";
    mainField.appendChild(placeholderParenthesis);
  }
}

function removeplaceholderClosingParenthesis(mainField) {
  let placeholderParenthesis = document.querySelector("#placeholderClosingParenthesis");
  let parenthesisCount = placeholderParenthesis.textContent.length;
  placeholderParenthesis.textContent = placeholderParenthesis.textContent.slice(0, parenthesisCount - 1);
  if (placeholderParenthesis.textContent === "") mainField.removeChild(placeholderParenthesis);
}

function setNextCurrentField(currentField) {
  if (
    currentField.parentElement.id !== "mainField" &&
    currentField.id !== "mainField" &&
    !currentField.parentElement.dataset.func
  ) {
    currentField.parentElement.id = "currentField";
  } else if (currentField.id === "mainField" || currentField.parentElement.id === "mainField") {
    return;
  } else setNextCurrentField(currentField.parentElement);
}
