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
  var A = 3.14 * 0.015 * 1.8;
  var U = q / (A * LMTD);

  if (!Mh || !Mc || !T1 || !T2 || !T3 || !T4) {
    alert("Please provide correct data!");
    return;
  }

  alert("Overall Heat Transfer Coefficient:  " + U.toFixed(3));
}
