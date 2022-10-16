function calc() {
  var Mh = parseFloat(document.getElementById("Mh").value);
  var Mc = parseFloat(document.getElementById("Mc").value);
  var T1 = parseFloat(document.getElementById("T1").value);
  var T2 = parseFloat(document.getElementById("T2").value);
  var T3 = parseFloat(document.getElementById("T3").value);
  var T4 = parseFloat(document.getElementById("T4").value);

  if (
    T1 !== T1 ||
    T2 !== T2 ||
    T3 !== T3 ||
    T4 !== T4 ||
    Mh !== Mh ||
    Mc !== Mc
  ) {
    document.getElementById("result").style.display = "none";
    return;
  }

  var cp = 4.1868;
  var qh = Mh * 0.001 * cp * Math.abs(T1 - T2);
  var qc = Mc * 0.001 * cp * Math.abs(T3 - T4);
  var q = (qh + qc) / 2;
  var del_T1 = T1 - T3;
  var del_T2 = T2 - T4;
  var LMTD = (del_T1 - del_T2)/Math.log(del_T1/del_T2);
  var A = Math.PI * 0.015 * 1.8;
  var U = q / (A * LMTD);
  U = U*1000;

  var result = document.getElementById("result");
  result.innerHTML = "<b>Result: </b><br>Overall Heat Transfer Coefficient:  " + U.toFixed(3) + "W/m<sup>2</sup>K";

  parent.location = "#output";
  document.getElementById("result").style.display = "none";
  document.getElementById("hspinner").style.display = "block";
  setTimeout(function () {
    document.getElementById("hspinner").style.display = "none";
    document.getElementById("result").style.display = "block";

  }, 500);
}
