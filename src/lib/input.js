let div = document.querySelector("#x");
let focus = document.querySelector("#focus");
let blur = document.querySelector("#blur");
let edit = div;
focus.addEventListener("click", () => div.setAttribute("tabindex", "0"));
blur.addEventListener("click", () => div.removeAttribute("tabindex"));
div.addEventListener("keypress", (e) => {
  console.log(typeof e.key, e.key);
  if (
    [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "!",
      "%",
      "^",
      "*",
      "(",
      ")",
      "-",
      "+",
      "=",
      "/",
      ".",
    ].includes(e.key)
  ) {
    if (e.key == "(") {
      let span = document.createElement("span");
      edit = span;
      div.appendChild(span);
    } else if (e.key == ")") {
      input(edit, ")");
      edit = div;
      return;
    }
    input(edit, e.key);
  }
});

export default function input(el, text) {
  if (el.childNodes.length == 0) el.textContent += text;
  else if (el.lastChild.nodeType == 3) el.lastChild.nodeValue += text;
  else el.insertAdjacentHTML("beforeend", text);
}
