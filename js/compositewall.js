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
  var newline = "\r\n";

  const output = document.getElementById("output");
  if (Ta - Td == 0 || !T1 || !T2 || !T7 || !T8 || !Q) {
    output.textContent = "Invalid Data";
  } else {
    output.textContent =
      "Total Thermal Resistance of Composite Slab:  " +
      R_Total.toFixed(3) + " Kg/s" + newline + newline + 
      "Total Thermal Conductivity of Composite slab:  " +
      K_composite.toFixed(3) + " m3/s";
  }

  parent.location = "#results";
  document.getElementById("output").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("hspinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("hspinner").style.display = "none";
  }, 500);

  setTimeout(function () {
    document.getElementById("output").style.display = "block";
  }, 500);
}
