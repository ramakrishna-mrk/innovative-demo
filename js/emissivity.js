function calc() {
  var T1 = parseFloat(document.getElementById("T1").value) + 273;
  var T2 = parseFloat(document.getElementById("T2").value) + 273;
  var T3 = parseFloat(document.getElementById("T3").value) + 273;
  var T4 = parseFloat(document.getElementById("T4").value) + 273;
  var T5 = parseFloat(document.getElementById("T5").value) + 273;
  var T6 = parseFloat(document.getElementById("T6").value) + 273;
  var T7 = parseFloat(document.getElementById("T7").value) + 273;

  if (
    T1 !== T1 ||
    T2 !== T2 ||
    T3 !== T3 ||
    T4 !== T4 ||
    T5 !== T5 ||
    T6 !== T6 ||
    T7 !== T7
  ) {
    document.getElementById("result").style.display = "none";
    return;
  }

  var Tb = (T1 + T2 + T3) / 3;
  var Tp = (T4 + T5 + T6) / 3;
  var Tc = T7;
  var Eb = 1;
  var Tb4 = Tb * Tb * Tb * Tb;
  var Tp4 = Tp * Tp * Tp * Tp;
  var Tc4 = Tc * Tc * Tc * Tc;
  var Ep = (Tb4 - Tc4) / (Tp4 - Tc4);

  var result = document.getElementById("result");
  result.innerHTML =
    "<b>Result: </b><br>Emissivity Test Surface: " + Ep.toFixed(3);

  parent.location = "#output";
  document.getElementById("result").style.display = "none";
  document.getElementById("hspinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("hspinner").style.display = "none";
    document.getElementById("result").style.display = "block";
  }, 500);
}
