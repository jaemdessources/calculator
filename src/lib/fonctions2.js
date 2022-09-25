// Coeur de la calculatrice scientifique, execute toutes les operations complexes;

let text = "",
  entree = "",
  result,
  nexp = 0,
  openP = 0,
  closeP = 0,
  ang = 1,
  deg = 1,
  gst,
  gv,
  degb,
  onShift = false,
  afterResult,
  number1,
  number2,
  beforeCalcul,
  r;
number3, (tabn = -1);
(expressions = [[]]),
  (facteurs = [[]]),
  (saisie = document.getElementById("saisie")),
  (saisie_1 = saisie.value),
  (sortie = document.getElementById("sortie")),
  (egal = document.getElementById("egal")),
  (swich = document.getElementById("switch")),
  (buttons = document.querySelectorAll(
    ".numberButton, .operatorButton, .functionButton"
  )),
  (phase = false);
class nombre {
  constructor(forme) {
    this.forme = forme;
    this.forme2 = "";
    this.operator = "";
    this.valeur = null;
    this.isNegative = forme[0] === "-" ? true : false;
    this.isComposed = false;
    this.isComplex = /\u00b0/.test(forme) ? true : false;
  }
}

calculator = {
  /*add: function(e) { //pour la gestion des boutons de l'interface.
      e.stopPropagation();
      if (/egal|del|ac|deg/.test(e.target.id) === true) {
         switch (e.target.id) {
            case "egal":
               text = "";
               break;
            case "del":
               for (i = 0, j = saisie.value.length; i <= j - 1; i++) text = i === j - 1 ? text : text + saisie.value[i];
               saisie.value = text ? text : "0";
               text = "";
               break;
            case "ac":
               saisie.value = "0";
               sortie.textContent = "0";
               break;
            case "deg":
               saisie.value += deg === 1 ? "\u00b0" : deg === 2 ? "\'" : "\"";
               deg = deg === 3 ? 1 : deg + 1;
         }
      }

      else if (e.target.className === "operatorButton") {
         if (e.target.id !== "Ans") saisie.value += e.target.textContent;
         else saisie.value = saisie.value === "0" ? "Ans" : saisie.value + "Ans";
         deg = 1;
      }

      else if (saisie.value === "0") {
         if (e.target.parentNode.className !== "functionButton" && e.target.getAttribute("value") === ".") {
            saisie.value += ".";
         }
         else {
            saisie.value = e.target.parentNode.className !== "functionButton" ? e.target.getAttribute("value") : onShift && e.target.parentNode.getAttribute("value1") ? e.target.parentNode.getAttribute("value1") :
               e.target.parentNode.getAttribute("value");
         }
      }
      else saisie.value += e.target.parentNode.className !== "functionButton" ? e.target.getAttribute("value") : onShift && e.target.parentNode.getAttribute("value1") ? e.target.parentNode.getAttribute("value1") :
         e.target.parentNode.getAttribute("value");
      if (/([*-/%+])/.test(saisie.value[saisie.value.length - 2]) && afterResult) {
         saisie.value = "Ans " + RegExp.$1 + " ";
      }
      else if (/\^/.test(saisie.value[saisie.value.length - 1]) && afterResult) {
         saisie.value = "Ans^";
      }
      else
      if (beforeCalcul && saisie.value !== "0") {
         text = "";
         for (i = saisie.value.length - 1, j = saisie_1.length - 1; i > j; i--) {
            text = saisie.value[i] + text;
         }
         saisie.value = text;
         if (/(\u00b3|\u00b2)/.test(saisie.value)) saisie.value = "Ans" + RegExp.$1;

      }
      beforeCalcul = false;
      afterResult = false;
      saisie.focus();
      saisie_1 = saisie.value;
   },
   hide: function() { //gestion de l'affichage de l'historique
      number = 23;
      let f = setInterval(function() {
         if (number >= -15) {
            number -= 27 * 0.10;
            document.getElementById("functionButtons").style.width = 36 + 3 + "%";
            document.getElementById("buttons").style.width = 118 - number - 10 + "%";
            document.getElementById("historique").style.width = document.getElementById("historique").style.width === "1.1%" ? number : number - 3 + "%";
            document.getElementById("masterButtons").style.width = "100%";
         }
         else {
            clearInterval(f);
            document.getElementById("historique").style.display = "none";
            document.getElementById("switch").style.display = "inline";
         }
      }, 40);

      phase = false;
   },
   onHide: function() {
      number = 0;
      document.getElementById("historique").style.display = "inline-block";
      let f = setInterval(function() {
         if (number <= 23) {
            number += 27 * 0.10;
            document.getElementById("functionButtons").style.width = 39 - 3 + "%";
            document.getElementById("buttons").style.width = (100 - number - 10) > 71 ? 100 - number - 9.5 + "%" : document.getElementById("buttons").style.width;
            document.getElementById("historique").style.width = number + 1 + "%";
         }
         else {
            clearInterval(f);
            document.getElementById("switch").style.display = "none";
         }
      }, 40);
      phase = true;
   },


   error: function(type, arg) { //gestion des operations a appliquer en cas d'erreur
      gv = false;
      switch (type) {
         case "syntaxe":
            sortie.textContent = "Erreur de syntaxe " + arg;
            break;
         case "domaine":
            sortie.textContent = "Erreur de domaine " + arg;
      }
      calculator.sortie(false);
   },
   inverser: function() { //gestion des deuxiemes fonctions
      onShift = onShift ? false : true;
      buttons = document.querySelectorAll("div[scd ='']");
      for (i = 0, j = buttons.length; i < j; i++) {
         text = buttons[i].firstElementChild.innerHTML;
         buttons[i].childNodes[1].innerHTML = buttons[i].childNodes[3].innerHTML;
         buttons[i].childNodes[3].innerHTML = text;
         text = "";
         buttons[i].addEventListener("click", calculator.reverse);
      }
      buttons = document.querySelectorAll(".numberButton, .functionButton, .operatorButton");
   },
   reverse: function() {
      onShift = onShift ? false : true;
      buttons = document.querySelectorAll("div[scd ='']");
      for (i = 0, j = buttons.length; i < j; i++) {
         text = buttons[i].firstElementChild.innerHTML;
         buttons[i].childNodes[1].innerHTML = buttons[i].childNodes[3].innerHTML;
         buttons[i].childNodes[3].innerHTML = text;
         text = "";
         buttons[i].removeEventListener("click", calculator.reverse);
      }
   },
   iemeCar: function(x, type) { //gestion de la suppression de caracteres
      if (type === "d") text = x.substring(0, x.length - 1);
      else if (type === "d+") text = x.substring(0, x.length - 2);
      else if (type === "b") text = x.substring(1, x.length);
      return text;
   },
   traitement: function(e) { //gestion des caracteres du  calcul effectue
      entree = e.target.value;
      if (e.data === "=") {
         saisie.value = calculator.iemeCar(saisie.value, "d");
         calculator.verif();
      }
      else
      if (e.inputType === "insertText") {
         if (beforeCalcul && !/[/+*%-]/.test(e.data)) {
            e.target.value = e.data;
            beforeCalcul = false;
         }
         else {
            // if (afterResult) e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            if (entree.length === 2) e.target.value = e.data === "." ? entree : entree[0] === "0" ? e.data : e.target.value;
            else e.target.value = entree;
            if (e.data === " ") {
               e.target.value = calculator.iemeCar(saisie.value, "d");
            }
            else
            if (/[+-/*%]/.test(e.data) === true && entree.length !== 1 && entree[entree.length - 2] !== " " && e.data !== ".") {
               if (afterResult && entree[0] === "0") {
                  saisie.value = "Ans" + " " + saisie.value + " ";
                  afterResult = false;
               }
               else {
                  for (i = 0, j = entree.length; i < j - 1; i++) {
                     text += entree[i];
                  }
                  text += " " + e.data + " ";
                  e.target.value = text;
               }
               deg = 1;
            }
            else if (/ [*-/%+] /.test(saisie.value) === true && afterResult === true && saisie.value.length === 3) {
               saisie.value = "Ans" + saisie.value;
               afterResult = false;
            }
            text = "";
         }
      }
      else
      if (e.inputType === "deleteContentBackward") {
         e.target.value = entree.length === 0 ? "0" : entree;
         if (/^[0-9)] [+-/*%]$/.test(entree[entree.length - 3] + entree[entree.length - 2] + entree[entree.length - 1]) === true) {
            calculator.iemeCar(saisie.value, "d+");
            e.target.value = text;
            text = "";
         }
         switch (saisie_1[saisie_1.length - 1]) {
            case "\u00b0":
               deg = 1;
               break;
            case "'":
               deg = 2;
               break;
            case "\"":
               deg = 3;
         }


      }
      saisie_1 = saisie.value;
      beforeCalcul = false;
      afterResult = false;
   },
   touches: function(e) {
      switch (e.keyCode) {
         case 13:
            calculator.verif();
            break;
      }
   },*/

  factorielle: function (x) {
    // autres fonctions de calcul
    if (Math.ceil(x) === x && x > -1) {
      number = 1;
      if (x === 0) return 1;
      else {
        for (i = x; i >= 1; i--) number *= i;
        return number;
      }
    } else calculator.error("domaine", "x  n'appartient  pas  \u00e0  \u2115");
  },
  comb: function (x, y) {
    if (Math.ceil(x) === x && x > -1 && Math.ceil(y) === y && y > -1) {
      return (
        calculator.factorielle(y) /
        (calculator.factorielle(x) * calculator.factorielle(y - x))
      );
    } else calculator.error("domaine", "x  n'appartient  pas  \u00e0  \u2115");
  },
  arr: function (x, y) {
    if (Math.ceil(x) === x && x > -1 && Math.ceil(y) === y && y > -1) {
      return calculator.factorielle(y) / calculator.factorielle(y - x);
    } else calculator.error("domaine", "x  n'appartient  pas  \u00e0  \u2115");
  },
  exp: function (x) {
    if (/(.+)\^(.+)/.test(X)) {
      return math.pow(calculator.evaluate(RegEXp.$1), calculator.evaluate(RegExp.$2));
    }
  },
  evaluate: function (x, y) {
    // fonctions d'evaluation, determine la valeur d'une expression
    number = null;
    if (!isNaN(Number(x))) number = Number(x);
    else if (/^\-$|^\+$/.test(x)) number = 1;
    else if (/(?:sin|cos|tan|.+)\(.+\) [+-/*%] (?:sin|tan|cos|.+)\(.+\)/.test(x))
      number = calculator.calculn(x);
    else if (/^ *-*Ans$/.test(x)) {
      number =
        result && / *Ans/.test(x) ? result : result && / *-Ans/.test(x) ? -1 * result : 0;
    } else if (/\u00b2|\u00b3/.test(x) && /\u00b2|\u00b3/.test(x[x.length - 1])) {
      if (/^(.+)\u00b2$/.test(x) && x[x.length - 1])
        number = Math.pow(calculator.evaluate(RegExp.$1), 2);
      else if (/^(.+)\u00b3$/.test(x))
        number = Math.pow(calculator.evaluate(RegExp.$1), 3);
    } else if (/\u002d\u00b9\(*/.test(x)) {
      switch (ang) {
        case 1:
          number3 = 180 / Math.PI;
          break;
        case 2:
          number3 = 1;
          break;
        case 3:
          number3 = 200 / Math.PI;
      }
      if (/(.+)sin\u002d\u00b9\(*(.+)/.test(x)) {
        if (y) {
          number = number3 * Math.asin(calculator.evaluate(y));
        } else {
          number = number3 * Math.asin(calculator.evaluate(RegExp.$2));
        }
        number1 = number;
        if (!isNaN(calculator.evaluate(RegExp.$1))) {
          number = RegExp.$1 ? number1 * calculator.evaluate(RegExp.$1) : number1;
        } else number = calculator.exp(x);
      } else if (/cos\u002d\u00b9\(*(.+)/.test(x)) {
        if (y) {
          number = nunber3 * Math.acos(calculator.evaluate(y));
        } else {
          number = number3 * Math.acos(calculator.evaluate(RegExp.$1));
        }
        number1 = number;
        if (!isNaN(calculator.evaluate(RegExp.$1))) {
          number = RegExp.$1 ? number1 * calculator.evaluate(RegExp.$1) : number1;
        } else number = calculator.exp(x);
      } else if (/tan\u002d\u00b9\(*(.+)/.test(x)) {
        if (y) {
          number = number3 * Math.atan(calculator.evaluate(y));
        } else {
          number = number3 * Math.atan(calculator.evaluate(RegExp.$1));
        }
        number1 = number;
        if (!isNaN(calculator.evaluate(RegExp.$1))) {
          number = RegExp.$1 ? number1 * calculator.evaluate(RegExp.$1) : number1;
        } else number = calculator.exp(x);
      }
      if (number < 0) number += ang === 1 ? 360 : ang === 2 ? 2 * Math.PI : 400;
    } else if (
      /(.*)\u221a(.+)/.test(x) &&
      !/ [+-/*%] /.test(RegExp.$2) &&
      !/ [+-/*%] /.test(RegExp.$1)
    ) {
      number1 = RegExp.$1;
      number2 = RegExp.$2;
      if (/ [+-/*%] /.test(x)) {
        if (y) {
          number = number1
            ? calculator.evaluate(number1) * Math.sqrt(calculator.evaluate(y))
            : Math.sqrt(calculator.evaluate(y));
        } else {
          number = calculator.calculn(x);
        }
      } else if (/^(.*)\u00b3\u221a\(*(.+)\)*/.test(x)) {
        if (y) {
          number = RegExp.$1
            ? Math.pow(calculator.evaluate(y), 1 / 3) * calculator.evaluate(RegExp.$1)
            : Math.pow(calculator.evaluate(y), 1 / 3);
        } else {
          number = RegExp.$1
            ? Math.pow(calculator.evaluate(RegExp.$2), 1 / 3) *
              calculator.evaluate(RegExp.$1)
            : Math.pow(calculator.evaluate(RegExp.$2), 1 / 3);
        }
      } else if (/(.+)\u00aa\u221a\(*(.+)\)*/.test(x)) {
        if (y) {
          number = Math.pow(calculator.evaluate(y), 1 / calculator.evaluate(RegExp.$1));
        } else {
          number = Math.pow(
            calculator.evaluate(RegExp.$2),
            1 / calculator.evaluate(RegExp.$1)
          );
        }
      } else {
        if (y) {
          number = number1
            ? calculator.evaluate(number1) * Math.sqrt(calculator.evaluate(y))
            : Math.sqrt(calculator.evaluate(y));
        } else {
          number = number1
            ? calculator.evaluate(number1) * Math.sqrt(calculator.evaluate(number2))
            : Math.sqrt(calculator.evaluate(number2));
        }
      }
    } else if (/(.*)(?:sin|cos|tan)/.test(x)) {
      if (RegExp.$1 && isNaN(RegExp.$1)) number = calculator.exp(x);
      else {
        switch (ang) {
          case 1:
            number3 = 180 / Math.PI;
            break;
          case 2:
            number3 = 1;
            break;
          case 3:
            number3 = 200 / Math.PI;
        }
        if (/(.*)sin\(*(.+)$/.test(x)) {
          if (y) {
            switch (calculator.evaluate(y)) {
              case 180:
                number = ang === 1 ? 0 : Math.sin(calculator.evaluate(y) / number3);
                break;
              case 200:
                number = ang === 3 ? 0 : Math.sin(calculator.evaluate(y) / number3);
                break;
              case Math.PI:
                number = ang === 2 ? 0 : Math.sin(calculator.evaluate(y) / number3);
                break;
              default:
                number = Math.sin(calculator.evaluate(y) / number3);
            }
          } else {
            switch (calculator.evaluate(RegExp.$2)) {
              case 180:
                number = ang === 1 ? 0 : Math.sin(number / number3);
                break;
              case 200:
                number = ang === 3 ? 0 : Math.sin(number / number3);
                break;
              case Math.PI:
                number = ang === 2 ? 0 : Math.sin(number / number3);
                break;
              default:
                number = Math.sin(number / number3);
            }
          }
          number1 = number;

          number = RegExp.$1 ? number1 * calculator.evaluate(RegExp.$1) : number1;

          number = RegExp.$1 ? calculator.evaluate(RegExp.$1) * number1 : number1;
        } else if (/(.*)cos\(*(.+)$/.test(x)) {
          if (y) {
            number = Math.cos(calculator.evaluate(y) / number3);
          } else {
            number = Math.cos(calculator.evaluate(RegExp.$2) / number3);
          }
          number1 = number;
          number = RegExp.$1 ? number1 * calculator.evaluate(RegExp.$1) : number1;
          number = RegExp.$1 ? calculator.evaluate(RegExp.$2) * number1 : number1;
        } else if (/(.*)tan\(*(.+)$/.test(x)) {
          if (y) {
            number = Math.tan(calculator.evaluate(y) / number3);
          } else {
            number = Math.tan(calculator.evaluate(RegExp.$2) / number3);
          }
          number1 = number;
          number = RegExp.$1 ? number1 * calculator.evaluate(RegExp.$1) : number1;
          number = RegExp.$1 ? calculator.evaluate(RegExp.$1) * number1 : number1;
        }
      }
    } else if (/C|A/.test(x) && !/Ans/.test(x)) {
      if (/^0*(.+)C(.+)$/.test(x))
        number = calculator.comb(
          calculator.evaluate(RegExp.$1),
          calculator.evaluate(RegExp.$2)
        );
      else if (/^0*(.+)A(.+)$/.test(x))
        number = calculator.arr(
          calculator.evaluate(RegExp.$1),
          calculator.evaluate(RegExp.$2)
        );
    } else if (/(.*)\-*ln(.+)/.test(x)) {
      if (y) {
        number = RegExp.$1
          ? calculator.evaluate(RegExp.$1) * Math.log(calculator.evaluate(y))
          : Math.log(calculator.evaluate(y));
      } else {
        number = RegExp.$1
          ? calculator.evaluate(RegExp.$1) * Math.log(calculator.evaluate(RegExp.$2))
          : Math.log(calculator.evaluate(RegExp.$2));
      }
    } else if (/(.*)\-*log(.+)/.test(x)) {
      number1 = RegExp.$1;
      number2 = RegExp.$2;
      if (y) {
        number = number1
          ? calculator.evaluate(number1) *
            Math.log(calculator.evaluate(y)) *
            0.43429448190325
          : Math.log(calculator.evaluate(y)) * 0.43429448190325;
      } else {
        number = number1
          ? calculator.evaluate(number1) *
            Math.log(calculator.evaluate(number2)) *
            0.43429448190325
          : Math.log(calculator.evaluate(number2)) * 0.43429448190325;
      }
    } else if (/^e(.+)/.test(x)) {
      if (y) {
        number = Math.pow(Math.E, calculator.evaluate(y));
      } else {
        number = Math.pow(Math.E, calculator.evaluate(RegExp.$1));
      }
    } else if (/ [+-/*%] /.test(x)) number = calculator.calculn(x);
    else if (/^(-*.+)\^(-*.+)$/.test(x)) {
      number1 = RegExp.$1;
      number2 = RegExp.$2;
      number = Math.pow(calculator.evaluate(number1), calculator.evaluate(number2));
    } else if (/(.+)!/.test(x))
      number = calculator.factorielle(calculator.evaluate(RegExp.$1));
    else if (/(.+)\u00b0(.*)/.test(x)) {
      number1 = calculator.evaluate(RegExp.$1);
      number2 = /\u00b0(.+)\'/.test(x) ? calculator.evaluate(RegExp.$1) : 0;
      number3 = /'(.+)\"/.test(x) ? calculator.evaluate(RegExp.$1) : 0;
      return {
        deg: number1,
        min: number2,
        sec: number3,
      };
    } else if (/^ *\((.+)\)$/.test(x)) number = calculator.evaluate(RegExp.$1);
    else if (/^ *(.+)\)$/.test(x)) number = calculator.evaluate(RegExp.$1);
    else if (/^ *\((.+)$/.test(x)) number = calculator.evaluate(RegExp.$1);
    else if (/^(.*)\u2147/.test(x))
      number = RegExp.$1 ? calculator.evaluate(RegExp.$1) * Math.E : Math.E;
    else if (/^(.+)*\u03c0/.test(x))
      number = calculator.evaluate(RegExp.$1)
        ? calculator.evaluate(RegExp.$1) * Math.PI
        : Math.PI;
    if (number !== null) {
      if (isNaN(number) && saisie.value.indexOf("Erreur", 0) !== -1)
        calculator.error("domaine", "");
      else return number;
    } else gst = false;
  },

  verif: function () {
    return calculator.calcul(true);
  },

  calcul: function (x) {
    // ensemble de fonctions qui calculent le resultat de l'operation
    if (x) {
      if (
        !/\u221a|\u00aa|\u03c0|\u002d|\u00b9|\u00b3|\u00b0|\u00b2|[!^]|[a-z]|\u2147/i.test(
          saisie.value
        )
      ) {
        number = eval(saisie.value);
        return calculator.sortie(true, true);
      } else {
        tabn++;
        gv = true;
        expressions[tabn] = saisie.value.split(/ [+-/*%] /);
        expressions[tabn].forEach(function (exp) {
          facteurs[tabn].push(new nombre(exp));
        });
        for (
          i = 0, j = saisie.value.length, k = 0;
          i < j && k < facteurs[tabn].length - 1;
          i++
        ) {
          if (
            / [+-/*%] /.test(
              saisie.value[i - 1] + saisie.value[i] + saisie.value[i + 1]
            ) === true
          ) {
            facteurs[tabn][k].operator = saisie.value[i];
            k++;
          }
        }
        for (i = 0; i < facteurs[tabn].length; i++) {
          if (
            facteurs[tabn][i].forme[0] === "(" ||
            /\u221a *\(/.test(facteurs[tabn][i].forme)
          ) {
            let a = i;
            do {
              for (e = 0; e < facteurs[tabn][a].forme.length; e++) {
                switch (facteurs[tabn][a].forme[e]) {
                  case "(":
                    openP++;
                    break;
                  case ")":
                    closeP++;
                    break;
                }
              }
              if (openP !== closeP) {
                facteurs[tabn][i].isComposed = true;
                if (i === 0) {
                  facteurs[tabn][i].forme =
                    facteurs[tabn][i].forme +
                    " " +
                    facteurs[tabn][a].operator +
                    " " +
                    facteurs[tabn][a + 1].forme;
                  nexp++;
                } else {
                  facteurs[tabn][i].forme =
                    facteurs[tabn][i].forme +
                    " " +
                    facteurs[tabn][a].operator +
                    " " +
                    facteurs[tabn][a + 1].forme;
                  nexp++;
                }
                if (nexp !== 0) {
                  facteurs[tabn][i].operator = facteurs[tabn][a]
                    ? facteurs[tabn][a + 1].operator
                    : "";
                }
              }
              a++;
            } while (
              (openP !== closeP || (closeP === 0 && openP === 0)) &&
              a < facteurs[tabn].length - 1
            );

            facteurs[tabn].splice(i + 1, nexp);
            nexp = 0;
            openP = 0;
            closeP = 0;
          } else if (
            /sin\u002d*\u00b9* *\(|cos\u002d*\u00b9* *\(|tan\u002d*\u00b9* *\(|log *\(|ln *\(/i.test(
              facteurs[tabn][i].forme
            )
          ) {
            let a = i;
            do {
              for (e = 0; e < facteurs[tabn][a].forme.length; e++) {
                switch (facteurs[tabn][a].forme[e]) {
                  case "(":
                    openP++;
                    facteurs[tabn][a].openP++;
                    break;
                  case ")":
                    closeP++;
                    facteurs[tabn][a].closeP++;
                    break;
                }
              }

              if (openP !== closeP) {
                facteurs[tabn][i].isComposed = true;
                if (i === 0) {
                  facteurs[tabn][i].forme =
                    facteurs[tabn][i].forme +
                    " " +
                    facteurs[tabn][a].operator +
                    " " +
                    facteurs[tabn][a + 1].forme;
                  nexp++;
                } else if (facteurs[tabn][a]) {
                  facteurs[tabn][i].forme =
                    facteurs[tabn][i].forme +
                    " " +
                    facteurs[tabn][a].operator +
                    " " +
                    facteurs[tabn][a + 1].forme;
                  nexp++;
                }
                if (nexp !== 0) {
                  facteurs[tabn][i].operator = facteurs[tabn][a]
                    ? facteurs[tabn][a + 1].operator
                    : "";
                }
              }
              a++;
            } while (
              (openP !== closeP || (closeP === 0 && openP === 0)) &&
              a < facteurs[tabn].length - 1
            );

            facteurs[tabn].splice(i + 1, nexp);
            nexp = 0;
            openP = 0;
            closeP = 0;
          }
        }
        facteurs[tabn].forEach(function (fact) {
          if (fact.isComposed) {
            for (i = 0; i < fact.forme.length; i++) {
              if (fact.forme[i] === "(") {
                openP++;

                for (a = i; fact.forme.length > a && openP !== closeP; a++) {
                  if (fact.forme[a] === "(" && a !== i) openP++;
                  else if (fact.forme[a] === ")") closeP++;
                  fact.forme2 += fact.forme[a];
                }
              }
              if (fact.forme2) break;
            }
          }
        });

        facteurs[tabn].forEach(function (fact) {
          fact.valeur = fact.forme2
            ? calculator.evaluate(fact.forme, fact.forme2)
            : calculator.evaluate(fact.forme);
          fact.valeur =
            fact.isNegative && fact.valeur > -1 ? fact.valeur * -1 : fact.valeur;
        });
        //fonctions.evaluate(this.forme);
        if (gst === false) calculator.sortie(false);
        else if (gv !== false) calculator.calculs();
      }
    }
  },
  calculn: function (x) {
    openP = 0;
    closeP = 0;
    for (i = 0, j = x.length; i < j; i++) {
      if (x[i] === "(") openP++;
      else if (x[i] === ")") closeP++;
    }
    if (
      !/\u221a|\u00aa|\u03c0|\u002d|\u00b9|\u00b3|\u00b0|\u00b2|[!^]|[a-z]|\u2147/i.test(
        x
      ) &&
      closeP === openP
    ) {
      number = fonctions.calculs(x);
      openP = 0;
      closeP = 0;
      return number;
    } else {
      openP = 0;
      closeP = 0;
      tabn++;
      gv = true;
      /*for(i = 0, j = saisie.value.length; i < j; i++){
             if(/ \(.+\) /.test(saisie.value ===)
         }*/
      facteurs[tabn] = [];
      expressions[tabn] = x.split(/ [+-/*%] /);
      expressions[tabn].forEach(function (exp) {
        facteurs[tabn].push(new nombre(exp));
      });
      for (i = 0, j = x.length, k = 0; i < j && k < facteurs[tabn].length - 1; i++) {
        if (/ [+-/*%] /.test(x[i - 1] + x[i] + x[i + 1]) === true) {
          facteurs[tabn][k].operator = x[i];
          k++;
        }
      }
      /*  if (/sin\u002d*\u00b9*\(|cos\u002d*\u00b9*\(|tan\u002d*\u00b9*\(/i.test(facteurs[tabn][0].forme) === true) facteurs[tabn][0].forme = fonctions.iemeCar(facteurs[tabn][0].forme, "b");*/
      if (facteurs[tabn][0].forme[0] === "(")
        facteurs[tabn][0].forme = calculator.iemeCar(facteurs[tabn][0].forme, "b");
      if (facteurs[tabn].length > 1) {
        if (/\)$/.test(facteurs[tabn][facteurs[tabn].length - 1].forme) === true)
          facteurs[tabn][facteurs[tabn].length - 1].forme = calculator.iemeCar(
            facteurs[tabn][facteurs[tabn].length - 1].forme,
            "d"
          );
      }
      for (i = 0; i < facteurs[tabn].length; i++) {
        if (
          facteurs[tabn][i].forme[0] === "(" ||
          /\u221a\(/.test(facteurs[tabn][i].forme)
        ) {
          let a = i;
          do {
            for (e = 0; e < facteurs[tabn][a].forme.length; e++) {
              switch (facteurs[tabn][a].forme[e]) {
                case "(":
                  openP++;
                  facteurs[tabn][a].openP++;
                  break;
                case ")":
                  closeP++;
                  facteurs[tabn][a].closeP++;
                  break;
              }
            }
            if (openP !== closeP) {
              facteurs[tabn][i].isComposed = true;
              if (i === 0) {
                facteurs[tabn][i].forme =
                  facteurs[tabn][i].forme +
                  " " +
                  facteurs[tabn][a].operator +
                  " " +
                  facteurs[tabn][a + 1].forme;
                nexp++;
              } else {
                facteurs[tabn][i].forme =
                  facteurs[tabn][i].forme +
                  " " +
                  facteurs[tabn][a].operator +
                  " " +
                  facteurs[tabn][a + 1].forme;
                nexp++;
              }
              if (nexp !== 0) {
                facteurs[tabn][i].operator = facteurs[tabn][a]
                  ? facteurs[tabn][a + 1].operator
                  : "";
              }
            }
            a++;
          } while (
            (openP !== closeP || (closeP === 0 && openP === 0)) &&
            a < facteurs[tabn].length - 1
          );
          facteurs[tabn].splice(i + 1, nexp);
          nexp = 0;
          openP = 0;
          closeP = 0;
        } else if (
          /sin\u002d*\u00b9* *\(|cos\u002d*\u00b9* *\(|tan\u002d*\u00b9* *\(| log *\(| ln *\(/i.test(
            facteurs[tabn][i].forme
          )
        ) {
          let a = i;
          do {
            for (e = 0; e < facteurs[tabn][a].forme.length; e++) {
              switch (facteurs[tabn][a].forme[e]) {
                case "(":
                  openP++;
                  break;
                case ")":
                  closeP++;
                  break;
              }
            }

            if (openP !== closeP) {
              facteurs[tabn][i].isComposed = true;
              if (i === 0) {
                facteurs[tabn][i].forme =
                  facteurs[tabn][i].forme +
                  " " +
                  facteurs[tabn][a].operator +
                  " " +
                  facteurs[tabn][a + 1].forme;
                nexp++;
              } else if (facteurs[tabn][a]) {
                facteurs[tabn][i].forme =
                  facteurs[tabn][i].forme +
                  " " +
                  facteurs[tabn][a].operator +
                  " " +
                  facteurs[tabn][a + 1].forme;
                nexp++;
              }
              if (nexp !== 0) {
                facteurs[tabn][i].operator = facteurs[tabn][a]
                  ? facteurs[tabn][a + 1].operator
                  : "";
              }
            }
            a++;
          } while (
            (openP !== closeP || (closeP === 0 && openP === 0)) &&
            a < facteurs[tabn].length - 1
          );
          facteurs[tabn].splice(i + 1, nexp);
          nexp = 0;
          openP = 0;
          closeP = 0;
        }
      }

      facteurs[tabn].forEach(function (fact) {
        if (fact.isComposed) {
          for (i = 0; i < fact.forme.length; i++) {
            if (fact.forme[i] === "(") {
              openP++;

              for (a = i; fact.forme.length > a && openP !== closeP; a++) {
                if (fact.forme[a] === "(" && a !== i) openP++;
                else if (fact.forme[a] === ")") closeP++;
                fact.forme2 += fact.forme[a];
              }
            }

            if (fact.forme2) break;
          }
        }
      });
      facteurs[tabn].forEach(function (fact) {
        fact.valeur = fact.forme2
          ? calculator.evaluate(fact.forme, fact.forme2)
          : calculator.evaluate(fact.forme);
        fact.valeur =
          fact.isNegative && fact.valeur > -1 ? fact.valeur * -1 : fact.valeur;
      });
      if (gst === false) calculator.sortie(false);
      else if (gv !== false) return calculator.calculs();
    }
  },

  calculs: function () {
    if (facteurs[tabn].length === 1) {
      if (tabn > 0) {
        number = facteurs[tabn].valeur;
        tabn--;
        return number;
      } else calculator.sortie(true);
    } else {
      for (i = 0, j = facteurs[tabn].length; i < j; i++) {
        if (facteurs[tabn][i].operator === "*") {
          if (facteurs[tabn][i].isComplex) {
            facteurs[tabn][i + 1].valeur = facteurs[tabn][i + 1].isComplex
              ? {
                  deg: facteurs[tabn][i].valeur.deg * facteurs[tabn][i + 1].valeur.deg,
                  min: facteurs[tabn][i].valeur.min * facteurs[tabn][i + 1].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec * facteurs[tabn][i + 1].valeur.sec,
                }
              : (facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i].valeur.deg * facteurs[tabn][i + 1].valeur,
                  min: facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec,
                });
            facteurs[tabn][i + 1].isComplex = true;
          } else {
            facteurs[tabn][i + 1].valeur *= facteurs[tabn][i].valeur;
          }
        }
      }
      for (i = 0; i < facteurs[tabn].length; i++) {
        if (facteurs[tabn][i].operator === "*") {
          facteurs[tabn].splice(i, 1);
          i--;
        }
      }
      for (i = 0, j = facteurs[tabn].length; i < j; i++) {
        if (facteurs[tabn][i].operator === "/") {
          if (facteurs[tabn][i].isComplex) {
            facteurs[tabn][i + 1].valeur = facteurs[tabn][i + 1].isComplex
              ? {
                  deg: facteurs[tabn][i].valeur.deg / facteurs[tabn][i + 1].valeur.deg,
                  min: facteurs[tabn][i].valeur.min / facteurs[tabn][i + 1].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec / facteurs[tabn][i + 1].valeur.sec,
                }
              : (facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i].valeur.deg / facteurs[tabn][i + 1].valeur,
                  min: facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec,
                });
            facteurs[tabn][i + 1].isComplex = true;
          } else
            facteurs[tabn][i + 1].valeur =
              facteurs[tabn][i].valeur / facteurs[tabn][i + 1].valeur;
        }
      }
      for (i = 0; i < facteurs[tabn].length; i++) {
        if (facteurs[tabn][i].operator === "/") {
          facteurs[tabn].splice(i, 1);
          i--;
        }
      }
      for (i = 0, j = facteurs[tabn].length; i < j; i++) {
        if (facteurs[tabn][i].operator === "%") {
          if (facteurs[tabn][i].isComplex) {
            facteurs[tabn][i + 1].valeur = facteurs[tabn][i + 1].isComplex
              ? {
                  deg: facteurs[tabn][i].valeur.deg % facteurs[tabn][i + 1].valeur.deg,
                  min: facteurs[tabn][i].valeur.min % facteurs[tabn][i + 1].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec % facteurs[tabn][i + 1].valeur.sec,
                }
              : (facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i].valeur.deg % facteurs[tabn][i + 1].valeur,
                  min: facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec,
                });
            facteurs[tabn][i + 1].isComplex === true;
          } else
            facteurs[tabn][i + 1].valeur =
              facteurs[tabn][i].valeur % facteurs[tabn][i + 1].valeur;
        }
      }
      for (i = 0; i < facteurs[tabn].length; i++) {
        if (facteurs[tabn][i].operator === "%") {
          facteurs[tabn].splice(i, 1);
          i--;
        }
      }
      for (i = 0, j = facteurs[tabn].length; i < j; i++) {
        if (facteurs[tabn][i].operator === "+") {
          if (facteurs[tabn][i].isComplex) {
            if (facteurs[tabn][i + 1].isComplex) {
              if (i > 0 && facteurs[tabn][i - 1].operator === "-") {
                facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i + 1].valeur.deg - facteurs[tabn][i].valeur.deg,
                  min: facteurs[tabn][i + 1].valeur.min - facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i + 1].valeur.sec - facteurs[tabn][i].valeur.sec,
                };
                facteurs[tabn][i + 1].isComplex = true;
                facteurs[tabn][i - 1].operator = "+";
                facteurs[tabn][i + 1].valeur = facteurs[tabn][i - 1].isComplex
                  ? {
                      deg:
                        facteurs[tabn][i + 1].valeur.deg +
                        facteurs[tabn][i - 1].valeur.deg,
                      min:
                        facteurs[tabn][i + 1].valeur.min +
                        facteurs[tabn][i - 1].valeur.min,
                      sec:
                        facteurs[tabn][i + 1].valeur.sec +
                        facteurs[tabn][i - 1].valeur.sec,
                    }
                  : (facteurs[tabn][i + 1].valeur += facteurs[tabn][i - 1].valeur);
              } else if (facteurs[tabn][i + 1]) {
                facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i + 1].valeur.deg + facteurs[tabn][i].valeur.deg,
                  min: facteurs[tabn][i + 1].valeur.min + facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i + 1].valeur.sec + facteurs[tabn][i].valeur.sec,
                };
                facteurs[tabn][i + 1].isComplex = true;
              }
            } else {
              if (i > 0 && facteurs[tabn][i - 1].operator === "-") {
                facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i + 1].valeur - facteurs[tabn][i].valeur.deg,
                  min: facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec,
                };
                facteurs[tabn][i + 1].isComplex = true;
                facteurs[tabn][i - 1].operator = "+";
                facteurs[tabn][i + 1].valeur = facteurs[tabn][i - 1].isComplex
                  ? {
                      deg:
                        facteurs[tabn][i + 1].valeur + facteurs[tabn][i - 1].valeur.deg,
                      min: facteurs[tabn][i - 1].valeur.min,
                      sec: facteurs[tabn][i - 1].valeur.sec,
                    }
                  : (facteurs[tabn][i + 1].valeur += facteurs[tabn][i - 1].valeur);
              } else if (facteurs[tabn][i + 1]) {
                facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i + 1].valeur + facteurs[tabn][i].valeur.deg,
                  min: facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec,
                };
                facteurs[tabn][i + 1].isComplex = true;
              }
            }
          } else {
            if (i > 0 && facteurs[tabn][i - 1].operator === "-") {
              facteurs[tabn][i + 1].valeur -= facteurs[tabn][i].valeur;
              facteurs[tabn][i - 1].operator = "+";
              facteurs[tabn][i + 1].valeur += facteurs[tabn][i - 1].valeur;
            } else if (facteurs[tabn][i + 1])
              facteurs[tabn][i + 1].valeur += facteurs[tabn][i].valeur;
          }
        }
      }

      for (i = 0; i < facteurs[tabn].length; i++) {
        if (facteurs[tabn][i].operator === "+") {
          facteurs[tabn].splice(i, 1);
          i--;
        }
      }
      for (i = 0, j = facteurs[tabn].length; i < j; i++) {
        if (facteurs[tabn][i].operator === "-") {
          if (facteurs[tabn][i].isComplex) {
            facteurs[tabn][i + 1].valeur = facteurs[tabn][i + 1].isComplex
              ? {
                  deg: facteurs[tabn][i].valeur.deg - facteurs[tabn][i + 1].valeur.deg,
                  min: facteurs[tabn][i].valeur.min - facteurs[tabn][i + 1].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec - facteurs[tabn][i + 1].valeur.sec,
                }
              : (facteurs[tabn][i + 1].valeur = {
                  deg: facteurs[tabn][i].valeur.deg - facteurs[tabn][i + 1].valeur,
                  min: facteurs[tabn][i].valeur.min,
                  sec: facteurs[tabn][i].valeur.sec,
                });
            facteurs[tabn][i + 1].isComplex = true;
          } else
            facteurs[tabn][i + 1].valeur =
              facteurs[tabn][i].valeur - facteurs[tabn][i + 1].valeur;
        }
      }
      for (i = 0; i < facteurs[tabn].length; i++) {
        if (facteurs[tabn][i].operator === "-") {
          facteurs[tabn].splice(i, 1);
          i--;
        }
      }
      if (tabn > 0) {
        number = facteurs[tabn][0].valeur;
        tabn--;
        return number;
      } else calculator.sortie(true);
    }
  },
  mettre: function () {
    saisie.value = calculator.iemeCar(saisie.value, "d");
    saisie.removeEventListener("focus", calculator.mettre);
  },
  sortie: function (x, m) {
    //gestion de l'affichage du resultat
    if (x) {
      result = m ? number : facteurs[tabn][0].valeur;
      if (facteurs[tabn]) {
        if (facteurs[tabn][0].isComplex) {
          if (facteurs[tabn][0].valeur.sec > 60) {
            facteurs[tabn][0].valeur.min +=
              (facteurs[tabn][0].valeur.sec - (facteurs[tabn][0].valeur.sec % 60)) / 60;
            facteurs[tabn][0].valeur.sec = facteurs[tabn][0].valeur.sec % 60;
          }
          if (facteurs[tabn][0].valeur.min > 60) {
            facteurs[tabn][0].valeur.deg +=
              (facteurs[tabn][0].valeur.min - (facteurs[tabn][0].valeur.min % 60)) / 60;
            facteurs[tabn][0].valeur.min = facteurs[tabn][0].valeur.min % 60;
          }
          result =
            facteurs[tabn][0].valeur.deg +
            "\u00b0" +
            facteurs[tabn][0].valeur.min +
            "'" +
            facteurs[tabn][0].valeur.sec +
            '"';
        }
      }

      sortie.textContent = result === Infinity ? "Erreur : division par 0" : result;
      facteurs = [[]];
      expressions = [[]];
      tabn = -1;
      if (isNaN(result) === false && result !== Infinity) {
        let operation = document.createElement("li");
        operation.textContent = saisie.value + " = " + result;

        operation.addEventListener("click", function (e) {
          entree = "";
          for (
            i = 0, j = operation.textContent.length;
            i < j && operation.textContent[i] !== "=";
            i++
          ) {
            text += operation.textContent[i];
          }
          while (i < j - 1) {
            entree += operation.textContent[i + 1];
            i++;
          }
          saisie.value = text;
          sortie.textContent = entree;
          text = "";
          saisie.addEventListener("focus", calculator.mettre);
        });

        document
          .getElementById("operations")
          .insertBefore(
            operation,
            document.getElementById("operations").firstElementChild
          );
      }
    } else {
      tabn = -1;
      facteurs = [[]];
      expressions = [[]];
      gst = null;
      sortie.textContent = gv ? sortie.getAttribute("href") : sortie.textContent;
      saisie.focus();
    }
    beforeCalcul = true;
    afterResult = true;
    openP = 0;
    closeP = 0;
    text = "";
    deg = 1;
  },
};
//i love you bro
