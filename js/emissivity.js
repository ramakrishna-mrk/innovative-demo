// var btn = document.getElementById("btn");
// btn.addEventListener("click", calc);
function calc() {
  var T1 = parseFloat(document.getElementById("T1").value) + 273;
  var T2 = parseFloat(document.getElementById("T2").value) + 273;
  var T3 = parseFloat(document.getElementById("T3").value) + 273;
  var T4 = parseFloat(document.getElementById("T4").value) + 273;
  var T5 = parseFloat(document.getElementById("T5").value) + 273;
  var T6 = parseFloat(document.getElementById("T6").value) + 273;
  var T7 = parseFloat(document.getElementById("T7").value) + 273;

  var Tb = (T1 + T2 + T3) / 3;
  var Tp = (T4 + T5 + T6) / 3;
  var Tc = T7;
  var Eb = 1;
  var Tb4 = Tb * Tb * Tb * Tb;
  var Tp4 = Tp * Tp * Tp * Tp;
  var Tc4 = Tc * Tc * Tc * Tc;
  var Ep = (Tb4 - Tc4) / (Tp4 - Tc4);

  if (Tp4==Tc4 || !Tb || !Tp || !Tc ) {
    alert("Please provide correct data!");
    return;
  }
  const output = document.getElementById("output");
  output.textContent = "Emissivity Test Surface: " + Ep.toFixed(3);
  
  parent.location='#results';
  document.getElementById("output").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("hspinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("hspinner").style.display = "none";
  }, 1000);

  setTimeout(function () {
    document.getElementById("output").style.display = "block";
  }, 1000);

  // alert("Emissivity Test Surface: " + Ep.toFixed(3));
}
