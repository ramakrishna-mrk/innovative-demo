function calc() {
  var M0 = parseFloat(document.getElementById("M0").value);
  var M1 = parseFloat(document.getElementById("M1").value);
  var M2 = parseFloat(document.getElementById("M2").value);
  var M3 = parseFloat(document.getElementById("M3").value);
  var M4 = parseFloat(document.getElementById("M4").value);
  var M5 = parseFloat(document.getElementById("M5").value);
  var M6 = parseFloat(document.getElementById("M6").value);

  if (
    M0 !== M0 ||
    M1 !== M1 ||
    M2 !== M2 ||
    M3 !== M3 ||
    M4 !== M4 ||
    M5 !== M5 ||
    M6 !== M6
  ) {
    document.getElementById("dtlabel").style.display = "none";
    document.getElementById("dtable").style.display = "none";
    document.getElementById("result1").style.display = "none";
    document.getElementById("ctlabel").style.display = "none";
    document.getElementById("ctable").style.display = "none";
    document.getElementById("graph").style.display = "none";
    document.getElementById("result2").style.display = "none";
    return;
  }

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
    MassRetained: M1,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 0.98,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 22,
    MeshSize: 0.71,
    AvgSize: 0.865,
    MassRetained: M2,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 1.41,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 36,
    MeshSize: 0.425,
    AvgSize: 0.567,
    MassRetained: M3,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 2.35,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 44,
    MeshSize: 0.355,
    AvgSize: 0.39,
    MassRetained: M4,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 2.82,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: 60,
    MeshSize: 0.25,
    AvgSize: 0.302,
    MassRetained: M5,
    MassFraction: 0,
    XibyDpi: 0,

    OneByDp: 4.0,
    CumMassFraction: 0,
  });

  data.push({
    MeshNo: "pan",
    MeshSize: "-",
    AvgSize: 0.125,
    MassRetained: M6,
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

  // var Area = 0.5 * data[0].CumMassFraction * data[0].OneByDp;
  var Area = 0;
  data[6].OneByDp = 2 * data[5].OneByDp - data[4].OneByDp;
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
  htmldt += "<th>Mesh No</th>";
  htmldt += "<th>Mesh Size, D<sub>p</sub> (mm)</th>";
  htmldt += "<th>Avg Size (mm)</th>";
  htmldt += "<th>Mass of Material Retained (g)</th>";
  htmldt += "<th>Mass Fraction (x<sub>i</sub>)</th>";
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
  htmlct += "<th>Mesh No</th>";
  htmlct += "<th>Mesh Size, D<sub>p</sub> (mm)</th>";
  htmlct += "<th>1/D<sub>pi</sub> (mm<sup>-1</sup>)</th>";
  htmlct += "<th>Mass of Material Retained (g)</th>";
  htmlct += "<th>Mass Fraction (x<sub>i</sub>)</th>";
  htmlct += "<th>Cumulative Mass Fraction (φ)</th>";
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

  htmlres1 +=
    "<b>Result: Differential Analysis</b><br>The average size (volume surface mean diameter) of the sample is: " +
    (1 / Total_XibyDpi).toFixed(3) +
    " mm";

  htmlres2 +=
    "<b>Result: Cumulative Analysis</b><br>The average size (volume surface mean diameter) of the sample is: " +
    (1 / Area).toFixed(3) +
    " mm";

  var dtable = document.getElementById("dtable");
  var ctable = document.getElementById("ctable");
  var result1 = document.getElementById("result1");
  var result2 = document.getElementById("result2");
  dtable.innerHTML = htmldt;
  ctable.innerHTML = htmlct;
  result1.innerHTML = htmlres1;
  result2.innerHTML = htmlres2;

  parent.location = "#output";

  document.getElementById("dtlabel").style.display = "none";
  document.getElementById("dtable").style.display = "none";
  document.getElementById("result1").style.display = "none";
  document.getElementById("ctlabel").style.display = "none";
  document.getElementById("ctable").style.display = "none";
  document.getElementById("graph").style.display = "none";
  document.getElementById("result2").style.display = "none";
  document.getElementById("spinner").style.display = "block";

  setTimeout(function () {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("dtlabel").style.display = "block";
    document.getElementById("dtable").style.display = "block";
    document.getElementById("result1").style.display = "block";
    document.getElementById("ctlabel").style.display = "block";
    document.getElementById("ctable").style.display = "block";
    document.getElementById("graph").style.display = "block";
    document.getElementById("result2").style.display = "block";
    var c = new CanvasJS.Chart("graph", {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Graph",
      },
      axisX: {
        title: "Cumulative Mass Fraction (φ)",
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
  }, 500);
}
