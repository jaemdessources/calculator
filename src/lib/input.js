import { inputFieldRef } from "../components/InputField";

export default function input(text) {
  //determines which DOM element will receive the input
  let currentField = document.querySelector("#currentField") || inputFieldRef.current;
  if (currentField.textContent === "0") currentField.textContent = "";
  console.log(currentField);
  //if the text is a number [0-9], check if the input's test is just a 0
  //if it is, remove the zero first, then insert the number.

  //else if the text is a basic operator [+-÷×] insert it with a space before
  // and after
  if (["+", "-", "÷", "×"].includes(text)) insertText(currentField, ` ${text} `);
  // else if the text is in [!%.] just insert it as is
  else if (text === "(") {
    // We create a span element assign the "currentField" id to it set the textContent
    // to "(" then we remove the "currentField" id from the actual current field append
    // then span to the actual current field
    // finally we se currentField to the new span created
    let element = document.createElement("span");
    element.id = "currentField";
    insertText(element, "(");
    currentField.removeAttribute("id");
    currentField.appendChild(element);
    currentField = element;
    insertplaceholderClosingParenthesis();
  } else if (text === ")") {
    // we add ")" to  the current field's text content, remove one placeholder closing parenthesis
    // remove the "currentField" id from the currentField and add it to the parent Element.
    // then we set current Field to the parent Element.
    insertText(currentField, ")");
    removeplaceholderClosingParenthesis();
    currentField.removeAttribute("id");
    currentField.parentElement.id = "currentField";
    currentField = currentField.parentElement;
  } //if the text is pi or e check if the last character in the input isn't a pi or a e
  //
  else if (["π", "e"].includes(text)) {
    if (
      ["π", "e"].includes(currentField.textContent[currentField.textContent.length - 1])
    ) {
      insertText(currentField, " × ");
    }
    let element = document.createElement("b");
    element.textContent = text;
    currentField.appendChild(element);
  } else {
    insertText(currentField, text);
  }
}

function insertText(currentField, text) {
  if (currentField.childNodes.length === 0) currentField.textContent += text;
  else if (currentField.lastChild.nodeType === 3)
    currentField.lastChild.nodeValue += text;
  else currentField.insertAdjacentHTML("beforeend", text);
}

function insertplaceholderClosingParenthesis() {
  let element = document.querySelector("#placeholderClosingParenthesis");
  if (element) element.textContent += ")";
  else {
    element = document.createElement("span");
    element.id = "placeholderClosingParenthesis";
    element.textContent += ")";
    inputFieldRef.current.appendChild(element);
  }
}

function removeplaceholderClosingParenthesis() {
  let element = document.querySelector("#placeholderClosingParenthesis");
  let parenthesisCount = element.textContent.length;
  element.textContent = element.textContent.slice(0, parenthesisCount - 1);
  if (element.textContent === "") inputFieldRef.current.removeChild(element);
}
