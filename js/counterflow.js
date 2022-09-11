var btn = document.getElementById("btn");
btn.addEventListener("click", calc);
function calc() {
  var Mh = parseFloat(document.getElementById("Mh").value);
  var Mc = parseFloat(document.getElementById("Mc").value);
  var T1 = parseFloat(document.getElementById("T1").value);
  var T2 = parseFloat(document.getElementById("T2").value);
  var T3 = parseFloat(document.getElementById("T3").value);
  var T4 = parseFloat(document.getElementById("T4").value);

  var cp = 4.1868;
  var qh = Mh * 0.001 * cp * (T1 - T2);
  var qc = Mc * 0.001 * cp * (T4 - T3);
  var q = (qh + qc) / 2;
  var del_T1 = T1 - T3;
  var del_T2 = T2 - T4;
  var LMTD = (del_T1 - del_T2) ;
  var A = Math.PI * 0.015 * 1.8;
  var U = q / (A * LMTD);

  const output = document.getElementById("output");
  if (!Mh || !Mc || !T1 || !T2 || !T3 || !T4) {
    output.innerHTML = "Invalid Data"
  } else {
    output.innerHTML = "Overall Heat Transfer Coefficient:  " + U.toFixed(3);
  }

  parent.location='#results';
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
