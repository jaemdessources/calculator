for (i = 0; i < choix.length; i++) {
   choix[i].addEventListener("click", stats.dispose);
}
document.getElementById("calcul").addEventListener("click", stats.calcul);
stats.attach();
document.getElementById("add").addEventListener("click", function () {
   nligne++;
   ligne.className += "modalite";
   for (i = 0; i < 4; i++) {
      cell = document.createElement("td");
      if (i < 2) cell.setAttribute("contenteditable", "true");
      ligne.appendChild(cell);
   }
   tab.appendChild(ligne);
   ligne = nligne > 1 ? document.createElement("tr") : ligne;
   stats.attach();
});

stats.attach1();
document.getElementById("supr").addEventListener("click", function () {
   for (i = 0, j = document.getElementsByClassName("selected"); i < j.length; i++) {
      document.querySelector("tbody").removeChild(j[i]);
      nligne--;
      stats.attach1();
   }

});