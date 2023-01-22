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
    //if the last element in the display field is not of the form " operator "
    // or another number or an opening parenthesis or a minus sign with nospace around before
    // or E or if the display field is not empty  add a mulitply

    if (
      !(
        / ([+\-÷×]) /.test(getCurrentFieldTextContent(currentField).slice(-3)) ||
        /[0-9]|\(|-|E/.test(getCurrentFieldTextContent(currentField).slice(-1)) ||
        /^$/.test(getCurrentFieldTextContent(currentField))
      )
    ) {
      insertText(currentField, ` × ${btn}`);
    } else {
      insertText(currentField, btn);
    }
    return;
  }
  if (btn === "x^2") {
    createSupElement(currentField, "2", "square", mainField);
    return;
  }

  if (btn === "x^y") {
    createSupElement(currentField, "□", "power", mainField);
    return;
  }
  //else if btn is an (
  if (btn === "(") {
    insertOpeningParenthesis(currentField, currentField);
    return;
  }
  //elese if btn is a )
  if (btn === ")") {
    insertClosingParenthesis(currentField, currentField);
    return;
  } //if the btn is pi or e check if the last character in the input isn't a pi or a e
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
      / ([+\-÷×]) /.test(getCurrentFieldTextContent(currentField).slice(-3)) ||
      /-$|\(/.test(getCurrentFieldTextContent(currentField).slice(-2)) ||
      /^$/.test(getCurrentFieldTextContent(currentField).slice(-1))
    ) {
      container.textContent = btn;
    } else {
      container.textContent = ` ${btn}`;
    }
    insertElement(container, currentField);
    insertOpeningParenthesis(container, currentField);
    return;
  }
  //if the key is not a number or an exponent expression and
  // the currentField is a sup tag we need
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
    if (getCurrentFieldTextContent(currentField).slice(-1) === "-") return;
    //if there's another operator as the last element in the input
    // Field
    else if (/ ([+\-÷×]) /.test(getCurrentFieldTextContent(currentField).slice(-3))) {
      //if the last operator is the same as the new operator just do nothing
      if (getCurrentFieldTextContent(currentField).slice(-2, -1) === btn) return;
      //else if the last element is ' × ' or ' ÷ '
      else if (/[×÷]/.test(getCurrentFieldTextContent(currentField).slice(-2, -1)) && btn === "-") {
        insertText(currentField, btn);
      }
      // else if the last element in the display is an operator and the sign is not -
      else if (btn !== "-" || /[-+]/.test(getCurrentFieldTextContent(currentField).slice(-2, -1))) {
        removeText(currentField, 0, -3);
        insertText(currentField, ` ${btn} `);
      }
    } else if (getCurrentFieldTextContent(currentField).slice(-1) === "(" && btn === "-") {
      insertText(currentField, btn);
    } else if (getCurrentFieldTextContent(currentField).slice(-1) === "(" && btn !== "-") {
      return;
    }

    //else if the last element is an empty <sup> element, remove it and insert
    // the sign in it's place
    else if (currentField.nodeName === "SUP" && currentField.textContent === "") {
      currentField.parentElement.removeChild(currentField);
      setNextCurrentFieldId(currentField);
      currentField = mainField.querySelector("#currentField") || mainField;
      insertText(currentField, ` ${btn} `);
    } //else if the last element of the display is an opening parenthesis
    else {
      insertText(currentField, ` ${btn} `);
    }
    return;
  }
  //if the key is the EXP key
  if (btn === "E") {
    // if the last char is not a number or if the last term of the
    // expression already has the E return
    if (!/[0-9]/.test(getCurrentFieldTextContent(currentField).slice(-1))) return;
    //we reverse the current field's text Content by combining split, reverse and join methods
    //then we search for the last ")" or " [+-×÷] "
    // which allows us to recuperate the last term of the expression.
    let startIndex = getCurrentFieldTextContent(currentField)
      .split("")
      .reverse()
      .join("")
      .search(/ [+\-÷×] |\)/);
    let lastTerm = getCurrentFieldTextContent(currentField).slice(-startIndex);
    if (/E/.test(lastTerm)) return;
    insertText(currentField, "E");
    return;
  } else {
    insertText(currentField, btn);
  }
}

function insertText(currentField, text) {
  //if the field is empty we can safely use the textContent property
  // without destroying any preexisting elements inside it.
  if (currentField.childNodes.length === 0) {
    currentField.textContent += text;
  }
  // else if the last node of the field is a text node (node type 3)
  // we update the last node's value
  else if (currentField.lastChild.nodeType === 3) {
    currentField.lastChild.nodeValue += text;
  }
  //else if the last node of the field is a placeholder closing parenthesis element
  else if (currentField.lastChild.id === "placeholderClosingParenthesis") {
    let lastFieldEl = currentField.lastChild.previousSibling;
    if (lastFieldEl.nodeType === 3) {
      lastFieldEl.nodeValue += text;
    } else if (lastFieldEl.nodeType === 1) {
      lastFieldEl.insertAdjacentHTML("afterend", text);
    }
  }
  // else we insert the next right before the closing tag of the field.
  else currentField.insertAdjacentHTML("beforeend", text);
}

function removeText(currentField, start, end) {
  if (currentField.childNodes.length === 0) {
    currentField.textContent = currentField.textContent.slice(start, end);
  } else if (currentField.lastChild.nodeType === 3) {
    currentField.lastChild.nodeValue = currentField.lastChild.nodeValue.slice(start, end);
  }
  //else if the last node of the field is a placeholder closing parenthesis element
  else if (currentField.lastChild.id === "placeholderClosingParenthesis") {
    currentField.lastChild.previousSibling.nodeValue = currentField.lastChild.previousSibling.nodeValue.slice(
      start,
      end
    );
  } else {
    throw new Error("We should not have gotten here. Unable to remove Text from removeText Function");
  }
}

function insertOpeningParenthesis(element, currentField) {
  // We create a span element assign the "currentField" id to it set the textContent
  // to "(" then we remove the "currentField" id from the actual current field append
  // then span to the previous current field. Finally we insert a placeholder
  // parenthesis
  let container = document.createElement("span");
  container.id = "currentField";
  insertText(container, "(");
  if (currentField.id !== "mainField") currentField.removeAttribute("id");
  element.appendChild(container);
  currentField = container;
  insertplaceholderClosingParenthesis(currentField);
}

function insertClosingParenthesis(element, currentField) {
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
  removeplaceholderClosingParenthesis(currentField);
  currentField.removeAttribute("id");
  setNextCurrentFieldId(currentField);
}

function insertplaceholderClosingParenthesis(currentField) {
  let placeholderParenthesis = currentField.querySelector("#placeholderClosingParenthesis");
  if (placeholderParenthesis) placeholderParenthesis.textContent += ")";
  else {
    placeholderParenthesis = document.createElement("span");
    placeholderParenthesis.id = "placeholderClosingParenthesis";
    placeholderParenthesis.textContent += ")";
    currentField.appendChild(placeholderParenthesis);
  }
}

function removeplaceholderClosingParenthesis(currentField) {
  let placeholderParenthesis = currentField.querySelector("#placeholderClosingParenthesis");
  let parenthesisCount = placeholderParenthesis.textContent.length;
  placeholderParenthesis.textContent = placeholderParenthesis.textContent.slice(0, parenthesisCount - 1);
  if (placeholderParenthesis.textContent === "") currentField.removeChild(placeholderParenthesis);
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
function insertElement(element, currentField) {
  if (currentField.lastChild?.id === "placeholderClosingParenthesis") {
    currentField.lastChild.insertAdjacentElement("beforeBegin", element);
  } else {
    currentField.appendChild(element);
  }
}

function getCurrentFieldTextContent(currentField) {
  if (currentField.lastElementChild?.id === "placeholderClosingParenthesis") {
    let placeholderClosingParenthesisCount = currentField.lastElementChild.textContent.length;
    return currentField.textContent.slice(0, -placeholderClosingParenthesisCount);
  } else return currentField.textContent;
}
function createSupElement(currentField, textContent, dataFuncAttr, mainField) {
  if (countExponentLevels(currentField, mainField) === 3) return;
  if (/\(|-|\s|%/.test(getCurrentFieldTextContent(currentField).slice(-1))) return;
  if (currentField.id !== "mainField") currentField.removeAttribute("id");
  let sup = document.createElement("sup");
  sup.id = "currentField";
  sup.textContent = textContent;
  sup.setAttribute("data-func", dataFuncAttr);
  insertElement(sup, currentField);
}
function countExponentLevels(currentField, mainField) {
  let count = 0;
  for (let field = currentField; field !== mainField; field = field.parentElement) {
    if (field.nodeName === "SUP") count++;
  }
  return count;
}
