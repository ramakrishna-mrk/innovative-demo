function calc() {
  var M0 = parseFloat(document.getElementById("M0").value);
  var M1 = parseFloat(document.getElementById("M1").value);
  var M2 = parseFloat(document.getElementById("M2").value);
  var M3 = parseFloat(document.getElementById("M3").value);
  var M4 = parseFloat(document.getElementById("M4").value);
  var M5 = parseFloat(document.getElementById("M5").value);

  var output = document.getElementById("output");
  var table = document.getElementById("dtable");

  var htmlres = "";
  var html = "";

  var data = [];

  data.push({
    MeshNo: 12,
    MeshSize: 1.18,
    AvgSize: 1.18,
    MassRetained: M0,
    MassFraction: 0,
    XibyDpi: 0,
  });

  data.push({
    MeshNo: 22,
    MeshSize: 0.71,
    AvgSize: 0.945,
    MassRetained: M1,
    MassFraction: 0,
    XibyDpi: 0,
  });

  data.push({
    MeshNo: 36,
    MeshSize: 0.425,
    AvgSize: 0.567,
    MassRetained: M2,
    MassFraction: 0,
    XibyDpi: 0,
  });

  data.push({
    MeshNo: 44,
    MeshSize: 0.355,
    AvgSize: 0.39,
    MassRetained: M3,
    MassFraction: 0,
    XibyDpi: 0,
  });

  data.push({
    MeshNo: 60,
    MeshSize: 0.25,
    AvgSize: 0.302,
    MassRetained: M4,
    MassFraction: 0,
    XibyDpi: 0,
  });

  data.push({
    MeshNo: "pan",
    MeshSize: "-",
    AvgSize: 0.125,
    MassRetained: M5,
    MassFraction: 0,
    XibyDpi: 0,
  });

  var Total_Material = 0;
  for (i = 0; i <= data.length - 1; i++) {
    Total_Material += data[i].MassRetained;
  }

  for (i = 0; i <= data.length - 1; i++) {
    data[i].MassFraction = data[i].MassRetained / Total_Material;
    data[i].MassFraction = parseFloat(data[i].MassFraction.toFixed(3));
  }

  for (i = 0; i <= data.length - 1; i++) {
    data[i].XibyDpi = data[i].MassFraction / data[i].AvgSize;
    data[i].XibyDpi = parseFloat(data[i].XibyDpi.toFixed(3));
  }

  var Total_XibyDpi = 0;
  for (i = 0; i <= data.length - 1; i++) {
    Total_XibyDpi += data[i].XibyDpi;
  }

  if (!M0) {
    htmlres += "Invalid Data";
  } else {
    htmlres +=
      "The average size (volume surface mean diameter) of the sample is: " +
      (1 / Total_XibyDpi).toFixed(3) +
      " units";
  }

  html += "<tr>";
  html += "<th>MeshNo</th>";
  html += "<th>MeshSize</th>";
  html += "<th>AvgSize</th>";
  html += "<th>MassRetained</th>";
  html += "<th>MassFraction</th>";
  html += "<th> x<sub>i</sub>/D<sub>pi</sub></th>";
  html += "</tr>";
  for (i = 0; i <= data.length - 1; i++) {
    html += "<tr>";
    html += "<td>" + data[i].MeshNo + "</td>";
    html += "<td>" + data[i].MeshSize + "</td>";
    html += "<td>" + data[i].AvgSize + "</td>";
    html += "<td>" + data[i].MassRetained + "</td>";
    html += "<td>" + data[i].MassFraction + "</td>";
    html += "<td>" + data[i].XibyDpi + "</td>";
    html += "</tr>";
  }
  output.innerHTML = htmlres;
  table.innerHTML = html;
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
