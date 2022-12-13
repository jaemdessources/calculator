// THis is getting pretty imperative here. And we don't like that in React
// When I'm done with all the functionalities
//I'll come back to this to implement a more declarative version of it.
//Maybe I'll turn this into a reducer that gives me a state inside of a useReducer() hook;

export default function input(btn, field) {
  if (!btn || !field) return;
  //determines which DOM element will receive the input
  let mainField = field.current;
  let currentField = mainField.querySelector("#currentField") || mainField;

  //console.log("the current field is ", currentField);
  //Do we clear the placeholer 0 or not ?
  if (!/Ans|x\^y|x\^2|y√x|%|[+\-÷×]/.test(btn) && mainField.textContent === "0") {
    mainField.textContent = "";
  }
  if (currentField.textContent === "□") currentField.textContent = "";
  if (/^[0-9]/.test(btn)) {
    //if the btn is a number [0-9], just insert it
    if (currentField.textContent === "0") removeText(currentField, 1);
    //if the last element in the display field is not of the form " operator "
    // or another number or an opening parenthesis or a minus sign with nospace around before
    // or E or if the display field is not empty  add a mulitply

    if (
      !(
        / ([+\-÷×]) /.test(currentField.textContent.slice(-3)) ||
        /[0-9(-E]/.test(currentField.textContent.slice(-1)) ||
        /^$/.test(currentField.textContent)
      )
    ) {
      insertText(currentField, ` × ${btn}`);
    } else {
      insertText(currentField, btn);
    }
    return;
  }

  //if the key is not a number and the currentField is a sup tag we need
  //to set the currentField to the parent element of the sup tag
  if (currentField.nodeName === "SUP") {
    currentField.id = "";
    setNextCurrentFieldId(currentField);
    currentField = mainField.querySelector("#currentField") || mainField;
  }
  //If the btn is an operator
  if (/[+\-÷×]/.test(btn)) {
    //if there's a minus sign with no space around as the last
    // input element
    if (currentField.textContent.slice(-1) === "-") return;
    //if there's another operator as the last element in the input
    // Field
    else if (/ ([+\-÷×]) /.test(currentField.textContent.slice(-3))) {
      //if the last operator is the same as the new operator just do nothing
      if (currentField.textContent.slice(-2, -1) === btn) return;
      //else if the last element is ' × ' or ' ÷ '
      else if (/[×÷]/.test(currentField.textContent.slice(-2, -1)) && btn === "-") {
        insertText(currentField, btn);
      }
      // else if the last element in the display is an operator and the sign is not -
      else if (btn !== "-" || /[-+]/.test(currentField.textContent.slice(-2, -1))) {
        removeText(currentField, 0, -3);
        insertText(currentField, ` ${btn} `);
      }
    } else if (currentField.textContent.slice(-1) === "(" && btn === "-") {
      insertText(currentField, btn);
    } else if (currentField.textContent.slice(-1) === "(" && btn !== "-") {
      return;
    }
    // //else if the last element is an empty <sup> element, remove it and insert
    // // the sign in it's place
    // else if (
    //   currentField.lastElementChild?.nodeName === "SUP" &&
    //   currentField.lastElementChild?.textContent === ""
    // ) {
    //   currentField.removeChild(currentField.lastElementChild);
    //   insertText(currentField, ` ${btn} `);
    // } //else if the last element of the display is an opening parenthesis
    else {
      insertText(currentField, ` ${btn} `);
    }
    return;
  }
  //else if btn is an (
  if (btn === "(") {
    insertOpeningParenthesis(currentField, currentField, mainField);
    return;
  }
  //elese if btn is a )
  if (btn === ")") {
    insertClosingParenthesis(currentField, currentField, mainField);
    return;
  }
  //if the btn is pi or e check if the last character in the input isn't a pi or a e
  if (/[πe]/.test(btn)) {
    if (/[πe]/.test(currentField.textContent.slice(-1))) {
      insertText(currentField, " × ");
    }
    let container = document.createElement("b");
    //check if it is not a power of e key and change output if it is

    if (btn === "e^x") {
      if (currentField.id !== "mainField") currentField.removeAttribute("id");
      let sup = document.createElement("sup");
      sup.id = "currentField";
      container.textContent = "e";
      container.appendChild(sup);
    } else container.textContent = btn;
    currentField.appendChild(container);
    return;
  }
  //if the btn is sin, cos,tan,acrsin,arcos,arctan,log or ln
  if (/sin|cos|tan|log|ln|√/.test(btn)) {
    let container = document.createElement("span");
    container.setAttribute("data-func", btn);
    if (
      / ([+\-÷×]) /.test(currentField.textContent.slice(-3)) ||
      /-|\(/.test(currentField.textContent.slice(-1))
    ) {
      container.textContent = btn;
    } else {
      container.textContent = ` ${btn}`;
    }
    currentField.appendChild(container);
    insertOpeningParenthesis(container, currentField, mainField);
    return;
  }

  if (btn === "x^2") {
    if (/\(|-|\s|%/.test(currentField.textContent.slice(-1))) return;
    let sup = document.createElement("sup");
    sup.textContent = "2";
    sup.setAttribute("data-func", "square");
    currentField.appendChild(sup);
    return;
  }

  if (btn === "x^y") {
    if (/\(|-|\s|%/.test(currentField.textContent.slice(-1))) return;
    if (currentField.id !== "mainField") currentField.removeAttribute("id");
    let sup = document.createElement("sup");
    sup.id = "currentField";
    sup.textContent = "□";
    sup.setAttribute("data-func", "power");
    currentField.appendChild(sup);
    return;
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
  setNextCurrentFieldId(currentField);
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

function setNextCurrentFieldId(currentField) {
  if (
    currentField.parentElement.id !== "mainField" &&
    currentField.id !== "mainField" &&
    !currentField.parentElement.dataset.func &&
    !/SUP|B/.test(currentField.parentElement.nodeName)
  ) {
    currentField.parentElement.id = "currentField";
  } else if (
    currentField.parentElement.id === "mainField" &&
    !/SUP|B/.test(currentField.nodeName) &&
    !currentField.dataset.func
  ) {
    currentField.id = "currentField";
  } else if (currentField.id === "mainField") {
  } else setNextCurrentFieldId(currentField.parentElement);
}
