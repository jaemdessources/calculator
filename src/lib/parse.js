export default function parse({ input }) {
  //gestion des caracteres du  calcul effectue

  console.log(input);
  // if (e.data === "=") {
  //   saisie.value = calculator.iemeCar(saisie.value, "d");
  //   calculator.verif();
  // } else if (e.inputType === "insertText") {
  //   if (beforeCalcul && !/[/+*%-]/.test(e.data)) {
  //     e.target.value = e.data;
  //     beforeCalcul = false;
  //   } else {
  //     // if (afterResult) e.target.value = e.target.value.substring(0, e.target.value.length - 1);
  //     if (entree.length === 2)
  //       e.target.value =
  //         e.data === "." ? entree : entree[0] === "0" ? e.data : e.target.value;
  //     else e.target.value = entree;
  //     if (e.data === " ") {
  //       e.target.value = calculator.iemeCar(saisie.value, "d");
  //     } else if (
  //       /[+-/*%]/.test(e.data) === true &&
  //       entree.length !== 1 &&
  //       entree[entree.length - 2] !== " " &&
  //       e.data !== "."
  //     ) {
  //       if (afterResult && entree[0] === "0") {
  //         saisie.value = "Ans" + " " + saisie.value + " ";
  //         afterResult = false;
  //       } else {
  //         for (i = 0, j = entree.length; i < j - 1; i++) {
  //           text += entree[i];
  //         }
  //         text += " " + e.data + " ";
  //         e.target.value = text;
  //       }
  //       deg = 1;
  //     } else if (
  //       / [*-/%+] /.test(saisie.value) === true &&
  //       afterResult === true &&
  //       saisie.value.length === 3
  //     ) {
  //       saisie.value = "Ans" + saisie.value;
  //       afterResult = false;
  //     }
  //     text = "";
  //   }
  // } else if (e.inputType === "deleteContentBackward") {
  //   e.target.value = entree.length === 0 ? "0" : entree;
  //   if (
  //     /^[0-9)] [+-/*%]$/.test(
  //       entree[entree.length - 3] +
  //         entree[entree.length - 2] +
  //         entree[entree.length - 1]
  //     ) === true
  //   ) {
  //     calculator.iemeCar(saisie.value, "d+");
  //     e.target.value = text;
  //     text = "";
  //   }
  //   switch (saisie_1[saisie_1.length - 1]) {
  //     case "\u00b0":
  //       deg = 1;
  //       break;
  //     case "'":
  //       deg = 2;
  //       break;
  //     case '"':
  //       deg = 3;
  //   }
  // }
  // saisie_1 = saisie.value;
  // beforeCalcul = false;
  // afterResult = false;
}
