let nligne = 1,
   type,
   moyenne,
   mediane,
   mode = {
      forme: "",
      value: null
   },
   mod,
   donne,
   rang,
   datas = [],
   donnes = [],
   cell,
   tab = document.querySelectorAll("tbody")[0],
   ligne = document.createElement("tr"),

   lignes = document.getElementsByClassName("modalite"),
   choix = document.querySelectorAll(".choix"),
   num = true, //indique si les donnes sont numeriques
   OutN = document.getElementById("N"), // resultat du nombre de données
   Outmediane = document.getElementById("mediane"),
   Outmode = document.getElementById("mode"),
   Outmoyenne = document.getElementById("moyenne");

class donnee {
   constructor(forme, type, eff) {
      this.forme = forme;
      this.eff = type === "condense" ? 1 : Number(eff);
      this.freqR = this.eff / N;
      this.freqRC = 0;
      this.xiNi = !isNaN(Number(this.forme)) ? this.eff * Number(this.forme) : null;
      if (type === "classe") {
         for (i of forme) {
            if (i === ";") {
               this.bi = Number(forme.substring(1, forme.indexOf(i)));
               this.bs = Number(forme.substring(forme.indexOf(i) + 1, forme.length - 1));
               this.ci = (this.bi + this.bs) / 2;
               this.ciNi = this.ci * this.eff;
            }
         }

      } else this.xiNi = !isNaN(Number(this.forme)) ? this.eff * Number(this.forme) : null;
   }
}
stats = {
   dispose: function (e) {
      switch (e.target.id) {
         case "condense?":
            document.getElementById("condense").style.display = "inline";
            type = "condense";
            break;
         case "range?":
            document.getElementById("range").style.display = "table";
            type = "range";
            break;
         case "classe?":
            document.getElementById("classe").style.display = "inline-block";
            type = "classe";
            break;

      }
   },
   attach: function () {
      for (i = 0, j = lignes.length; i < j; i++) {
         lignes[i].addEventListener("mouseover", stats.marquer);
      }
   },
   attach1: function () {
      for (i = 0, j = lignes.length; i < j; i++) {
         lignes[i].addEventListener("click", function (e) {
            e.target.removeEventListener("mouseout", stats.demarquer);
            e.target.parentNode.className += " selected";
         });
      }
   },
   marquer: function (e) {
      e.target.parentNode.style.backgroundColor = "hsl(253,100%,90%)";

      e.target.addEventListener("mouseout", stats.demarquer);
   },
   demarquer: function (e) {
      e.target.parentNode.style.background = "initial";

   },
   calcul: function () {
      switch (type) {
         case "condense":
            datas = inputCondense.value.split(",");
            N = datas.length;
            donne = new donnee(datas[0], type);
            donnes.push(donne);
            donnes[0].freqRC = donnes[0].freqR;

            for (i = 1; i < datas.length; i++) {
               if (isNaN(Number(datas[i]))) num = false;
               for (a = 0, b = donnes.length; a < i && a < b; a++) {

                  if (datas[i] === donnes[a].forme) {
                     donnes[a].eff++;
                     donnes[a].freqR = donnes[a].eff / N;
                     if (donnes[a].xiNi) donnes[a].xiNi = donnes[a].eff * Number(donnes[a].forme);
                     break;
                  } else if (a === donnes.length - 1) {
                     donne = new donnee(datas[i], type);
                     donnes.push(donne);
                  }

               }
            }

            for (i = 0, j = donnes.length; i < j; i++) {
               donnes[i].freqRC = i === 0 ? donnes[i].freqR : donnes[i - 1].freqRC + donnes[i].freqR;
               moyenne = i === 0 ? donnes[i].xiNi : donnes[i].xiNi + moyenne;
               mode.forme = i === 0 ? donnes[0].forme :
                  donnes[i].eff > mode.value ? donnes[i].forme :
                     Number(mode.forme) > Number(donnes[i].forme) ? donnes[i].forme : mode.forme;
               mode.value = i === 0 ? donnes[0].eff :
                  donnes[i].eff > mode.value ? donnes[i].eff :
                     Number(mode.forme) > Number(donnes[i].forme) ? donnes[i].eff : mode.value;
            }


            if (num) {
               datas.sort(function (a, b) {
                  if (a < b) {
                     return -1;
                  } else if (a > b) {
                     return 1;
                  } else {
                     return 0;
                  }
               });
            }
            mediane = (N % 2 === 0) ? mediane = datas[N / 2] : mediane = datas[(N + 1) / 2];
            moyenne /= N;

            break;

         case "range":
            N = 0;
            for (i = 0, j = lignes; i < j.length; i++) {
               donne = new donnee(j[i].children[0].textContent, type, j[i].children[1].textContent);
               donnes.push(donne);
               N += donnes[i].eff;
            }

            for (i = 0, j = donnes.length; i < j; i++) {
               donnes[i].freqRC = i === 0 ? donnes[i].freqR : donnes[i - 1].freqRC + donnes[i].freqR;
               moyenne = i === 0 ? donnes[i].xiNi : donnes[i].xiNi + moyenne;
               mode.forme = i === 0 ? donnes[0].forme :
                  donnes[i].eff > mode.value ? donnes[i].forme :
                     Number(mode.forme) > Number(donnes[i].forme) ? donnes[i].forme : mode.forme;
               mode.value = i === 0 ? donnes[0].eff :
                  donnes[i].eff > mode.value ? donnes[i].eff :
                     Number(mode.forme) > Number(donnes[i].forme) ? donnes[i].eff : mode.value;
            }
            if (num) {
               rang = (N % 2 === 0) ? N / 2 : (N + 1) / 2;
               for (i = 0, j = donnes.length; i < j; i++) {
                  if (donnes[i].freqRC * N < rang && rang > donnes[i + 1].freqR * N) {
                     mediane = donnes[i].forme;
                  }
               }
            }
            moyenne /= N;
            break;

         case "classe":
            N = 0;
            for (i = 0, j = clignes; i < j.length; i++) {
               donne = new donnee(j[i].children[0].textContent, type, j[i].children[1].textContent);
               donnes.push(donne);
               N += Number(j[i].childNodes[1].textContent);
            }
            for (i = 0, j = donnes.length; i <= j; i++) {
               donnes[i].freqRC = i === 0 ? donnes[i].freqR : donnes[i - 1].freqRC + donnes[i].freqR;
               moyenne = i === 0 ? donnes[i].ciNi : donnes[i].ciNi + moyenne;
               rang = (N % 2 === 0) ? N / 2 : (N + 1) / 2;

               if (i === j) {
                  for (i = 0, j = donnes.length; i < j; i++) {
                     if (num) {
                        if (donnes[i].freqRC * N < rang && rang > donnes[i + 1].freqR * N) {
                           donnes[i] = this;
                           mediane = this.bi + ((donnes[i - 1].freqRC - 0.500) / this.freQR) * (this.bs - this.bi);
                        }
                     }
                     if (donnes[i].freqRC > 0.500) {
                        donne[i] = this;
                        mode = this.bi + ((donnes[i].eff - donnes[i - 1].eff) / ((donnes[i].eff - donnes[i - 1].eff) + (donnes[i].eff - donnes[i + 1].eff))) * (this.bs - this.bi);
                     }
                     if (mediane && mode) break;
                  }
               }

            }
      }
      stats.affich();
      datas = donnes = [];
   },
   affich: function (type) {
      switch (type) {
         case "condense":
            Outmediane = mediane ? medianee : "N'existe pas";
            OutN = N;
            Outmode = mode;
            Outmoyenne = moyenne;
            break;

         case "range":

      }
   }
}; ``