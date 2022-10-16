function calc() {
  var T1 = parseFloat(document.getElementById("T1").value);
  var T2 = parseFloat(document.getElementById("T2").value);
  var T3 = parseFloat(document.getElementById("T3").value);
  var T4 = parseFloat(document.getElementById("T4").value);
  var T5 = parseFloat(document.getElementById("T5").value);
  var T6 = parseFloat(document.getElementById("T6").value);
  var T7 = parseFloat(document.getElementById("T7").value);
  var T8 = parseFloat(document.getElementById("T8").value);
  var Q = parseFloat(document.getElementById("hs").value);

  if (
    T1 !== T1 ||
    T2 !== T2 ||
    T3 !== T3 ||
    T4 !== T4 ||
    T5 !== T5 ||
    T6 !== T6 ||
    T7 !== T7 ||
    T8 !== T8
  ) {
    // document.getElementById("rlabel").style.display = "none";
    document.getElementById("result").style.display = "none";
    return;
  }

  var Ta = (T1 + T2) / 2;
  var Tb = (T3 + T4) / 2;
  var Tc = (T5 + T6) / 2;
  var Td = (T7 + T8) / 2;

  //Fixed Data
  var b = 20 + 12 + 12;
  var d = 0.2;

  var A = (Math.PI * d * d) / 4;
  var q = Q / A;
  var R_Total = (Ta - Td) / q;
  var K_composite = b / R_Total;

  var result = document.getElementById("result");
  result.innerHTML =
    "<b>Result: </b><br>• Total Thermal Resistance of Composite Slab:  " +
    Math.abs(R_Total).toFixed(6) +
    " <sup>o</sup>C/W <br>" +
    "• Total Thermal Conductivity of Composite slab:  " +
    Math.abs(K_composite).toFixed(6) +
    " W/m<sup>o</sup>C";

  parent.location = "#output";
  // document.getElementById("rlabel").style.display = "none";
  document.getElementById("result").style.display = "none";
  document.getElementById("hspinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("hspinner").style.display = "none";
    // document.getElementById("rlabel").style.display = "block";
    document.getElementById("result").style.display = "block";
  }, 500);
}
