function calc() {
  var M0 = parseFloat(document.getElementById("M0").value);
  var M6 = parseFloat(document.getElementById("M6").value);
  var M1 = parseFloat(document.getElementById("M1").value);
  var M2 = parseFloat(document.getElementById("M2").value);
  var M3 = parseFloat(document.getElementById("M3").value);
  var M4 = parseFloat(document.getElementById("M4").value);
  var M5 = parseFloat(document.getElementById("M5").value);

  var output1 = document.getElementById("output1");
  var output2 = document.getElementById("output2");
  var dtable = document.getElementById("dtable");
  var ctable = document.getElementById("ctable");

  var htmlres1 = "";
  var htmlres2 = "";

  var htmldt = "";
  var htmlct = "";

  var data = [];

  data.push({
    MeshNo: 14,
    MeshSize: 1.18,
    AvgSize: 1.18,
    MassRetained: M0,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 0.85,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 18,
    MeshSize: 1.02,
    AvgSize: 1.1,
    MassRetained: M6,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 0.98,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 22,
    MeshSize: 0.71,
    AvgSize: 0.865,
    MassRetained: M1,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 1.41,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 36,
    MeshSize: 0.425,
    AvgSize: 0.567,
    MassRetained: M2,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 2.35,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 44,
    MeshSize: 0.355,
    AvgSize: 0.39,
    MassRetained: M3,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 2.82,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 60,
    MeshSize: 0.25,
    AvgSize: 0.302,
    MassRetained: M4,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 4.0,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: "pan",
    MeshSize: "-",
    AvgSize: 0.125,
    MassRetained: M5,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: Infinity,
    CumMassFraction: 0,
  });

  var Total_Material = 0;
  for (i = 0; i <= data.length - 1; i++) {
    Total_Material += data[i].MassRetained;
  }

  for (i = 0; i <= data.length - 1; i++) {
    data[i].MassFraction = data[i].MassRetained / Total_Material;
    // data[i].MassFraction = parseFloat(data[i].MassFraction.toFixed(3));
  }

  for (i = 0; i <= data.length - 1; i++) {
    data[i].XibyDpi = data[i].MassFraction / data[i].AvgSize;
    // data[i].XibyDpi = parseFloat(data[i].XibyDpi.toFixed(3));
  }

  var Total_XibyDpi = 0;
  for (i = 0; i <= data.length - 1; i++) {
    Total_XibyDpi += data[i].XibyDpi;
  }

  var TotalMassFraction = 0;
  for (i = 0; i <= data.length - 1; i++) {
    TotalMassFraction += data[i].MassFraction;
    data[i].CumMassFraction = TotalMassFraction;
    // data[i].CumMassFraction = parseFloat(data[i].CumMassFraction.toFixed(3));
  }

    data[6].OneByDp = 2 * data[5].OneByDp - data[4].OneByDp;
  var Area = 0.5 * data[0].CumMassFraction * data[0].OneByDp;
  // var Area = 0;
  for (i = 1; i <= data.length - 1; i++) {
    Area +=
      (data[i].CumMassFraction - data[i - 1].CumMassFraction) *
      data[i - 1].OneByDp;
    Area +=
      0.5 *
      (data[i].CumMassFraction - data[i - 1].CumMassFraction) *
      (data[i].OneByDp - data[i - 1].OneByDp);
  }
    data[6].OneByDp = Infinity;

  htmldt += "<tr>";
  htmldt += "<th>MeshNo</th>";
  htmldt += "<th>MeshSize</th>";
  htmldt += "<th>AvgSize</th>";
  htmldt += "<th>MassRetained</th>";
  htmldt += "<th>MassFraction</th>";
  htmldt += "<th>x<sub>i</sub>/D<sub>pi</sub></th>";
  htmldt += "</tr>";
  for (i = 0; i <= data.length - 1; i++) {
    htmldt += "<tr>";
    htmldt += "<td>" + data[i].MeshNo + "</td>";
    htmldt += "<td>" + data[i].MeshSize + "</td>";
    htmldt += "<td>" + data[i].AvgSize + "</td>";
    htmldt += "<td>" + data[i].MassRetained + "</td>";
    htmldt += "<td>" + data[i].MassFraction.toFixed(3) + "</td>";
    htmldt += "<td>" + data[i].XibyDpi.toFixed(3) + "</td>";
    htmldt += "</tr>";
  }

  htmlct += "<tr>";
  htmlct += "<th>MeshNo</th>";
  htmlct += "<th>MeshSize</th>";
  htmlct += "<th>1/D<sub>pi</sub></th>";
  htmlct += "<th>MassRetained</th>";
  htmlct += "<th>MassFraction</th>";
  htmlct += "<th>CumMassFraction</th>";
  htmlct += "</tr>";
  for (i = 0; i <= data.length - 1; i++) {
    htmlct += "<tr>";
    htmlct += "<td>" + data[i].MeshNo + "</td>";
    htmlct += "<td>" + data[i].MeshSize + "</td>";
    htmlct += "<td>" + data[i].OneByDp + "</td>";
    htmlct += "<td>" + data[i].MassRetained + "</td>";
    htmlct += "<td>" + data[i].MassFraction.toFixed(3) + "</td>";
    htmlct += "<td>" + data[i].CumMassFraction.toFixed(3) + "</td>";
    htmlct += "</tr>";
  }

  if (!M0 || !M1 || !M2 || !M3 || !M4 || !M5) {
    htmlres1 += "Invalid Data";
    htmlres2 += "Invalid Data";
    document.getElementById("graph").style.display = "none";
  } else {
    document.getElementById("graph").style.display = "block";
    htmlres1 +=
      "<b>Result: Differential Analysis</b><br>The average size (volume surface mean diameter) of the sample is: " +
      (1 / Total_XibyDpi).toFixed(3) +
      " mm";

    htmlres2 +=
      "<b>Result: Cumulative Analysis</b><br>The average size (volume surface mean diameter) of the sample is: " +
      (1 / Area).toFixed(3) +
      " mm";
  }
  var dtlabel = document.getElementById("dtlabel");
  dtlabel.innerText = "Differential Analysis";
  var ctlabel = document.getElementById("ctlabel");
  ctlabel.innerText = "Cumulative Analysis";

  dtable.innerHTML = htmldt;
  ctable.innerHTML = htmlct;

  output1.innerHTML = htmlres1;
  output2.innerHTML = htmlres2;

  parent.location = "#results";
  document.getElementById("output1").style.display = "none";
  document.getElementById("output2").style.display = "none";
  document.getElementById("dtable").style.display = "none";
  document.getElementById("ctable").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("hspinner1").style.display = "block";
  document.getElementById("hspinner2").style.display = "block";
  // document.getElementById("graph").style.display = "none";
  if (!M0 || !M1 || !M2 || !M3 || !M4 || !M5) {
    setTimeout(function () {
      document.getElementById("hspinner1").style.display = "none";
      document.getElementById("hspinner2").style.display = "none";
      document.getElementById("output1").style.display = "block";
      document.getElementById("output2").style.display = "block";
      document.getElementById("graph").style.display = "none";
    }, 500);
  } else {
    setTimeout(function () {
      document.getElementById("hspinner1").style.display = "none";
      document.getElementById("hspinner2").style.display = "none";
      document.getElementById("dtable").style.display = "block";
      document.getElementById("ctable").style.display = "block";
      document.getElementById("output1").style.display = "block";
      document.getElementById("output2").style.display = "block";
      // document.getElementById("graph").style.display = "block";
    }, 500);
  }

  //Graph
  if ((!M0 || !M1 || !M2 || !M3 || !M4 || !M5) == false) {
    var c = new CanvasJS.Chart("graph", {
      zoomEnabled: true,
      title: {
        text: "Graph",
      },
      axisX: {
        title: "Cumulative Mass Fraction",
      },
      axisY: {
        title: "1/Dpi",
      },
      data: [
        {
          type: "area",
          xValueType: "number",
          dataPoints: [
            // { x: 0, y: 0 },
            { x: data[0].CumMassFraction, y: data[0].OneByDp },
            { x: data[1].CumMassFraction, y: data[1].OneByDp },
            { x: data[2].CumMassFraction, y: data[2].OneByDp },
            { x: data[3].CumMassFraction, y: data[3].OneByDp },
            { x: data[4].CumMassFraction, y: data[4].OneByDp },
            { x: data[5].CumMassFraction, y: data[5].OneByDp },
            {
              x: data[6].CumMassFraction,
              y: 2 * data[5].OneByDp - data[4].OneByDp,
            },
          ],
        },
      ],
    });
    c.render();
  }
}
