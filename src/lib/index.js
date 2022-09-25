let
   scripts = [],
   paths = ["../js/fonctions.js", "../js/calculs.js", "../js/stats.js", "../js/statistiques.js"],
   calcDiv = document.getElementById("calc-wrapper"),
   navDiv = document.getElementById("nav-wrapper"),
   statDiv = document.getElementById("stat-wrapper"),
   geoDiv = document.getElementById("geo-wrapper"),
   phyDiv = document.getElementById("phy-wrapper"),
   pages = [calcDiv, navDiv, statDiv];// geoDiv, phyDiv],
   
   linkNav = document.getElementsByClassName("pageNav"),
   linkCalc = document.getElementsByClassName("pageCalc"),
   linkStat = document.getElementsByClassName("pageStat"),
   linkGeo = document.getElementsByClassName("pageGeo"),
   linkPhy = document.getElementsByClassName("pagePhy"),
   links = [linkCalc, linkStat, linkGeo, linkPhy,linkNav ];

links.forEach(function(elt){
   for( i = 0, j = elt.length; i < j; i++){
      elt[i].addEventListener("click", change);
   }
});

paths.forEach(function(path){
   let script = document.createElement("script");
   script.src = path;
   scripts.push(script);
});



function change(e) {

      switch(e.target.className){
         case "pageCalc":
            document.body.appendChild(scripts[0]);
            document.body.appendChild(scripts[1]);
            break;
         case "pageStat":
            document.body.appendChild(scripts[2]);
            document.body.appendChild(scripts[3]);
            break;
         case "pageGeo":
            document.body.appendChild(scripts[4]);
            document.body.appendChild(scripts[5]);
            break;
         case "pageEqu":
            document.body.appendChild(scripts[6]);
            document.body.appendChild(scripts[7]);
            break;
      }
   
   pages.forEach(function(elt){
      if (elt.id !== e.target.getAttribute("goal")) {
         elt.style.display = "none";
      }
      else elt.style.display = "grid";
      //if (e.target.getAttribute("goal") === "nav-wrapper") document.body.style.background = "hsl(253, 100%, 90%)";
   });
}