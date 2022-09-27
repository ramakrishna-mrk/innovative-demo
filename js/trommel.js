function calc() {
  var output = document.getElementById("output");
  var atable = document.getElementById("atable");

  var htmlres = "";
  var htmlat = "";

  var predata = [];
  predata.push({
    MeshNo: 4,
    MeshSize: 4.0,
  });

  predata.push({
    MeshNo: 5,
    MeshSize: 3.35,
  });

  predata.push({
    MeshNo: 6,
    MeshSize: 2.8,
  });

  predata.push({
    MeshNo: 7,
    MeshSize: 2.36,
  });

  predata.push({
    MeshNo: 8,
    MeshSize: 2.0,
  });

  predata.push({
    MeshNo: 12,
    MeshSize: 1.4,
  });

  predata.push({
    MeshNo: 14,
    MeshSize: 1.0,
  });

  predata.push({
    MeshNo: "pan",
    MeshSize: "---",
  });

  var mdata = [];
  var tmf = 0;
  var tmo = 0;
  var tmu = 0;
  for (i = 1; i <= 8; i++) {
    var mf = parseFloat(document.getElementById("f" + i).value);
    var mo = parseFloat(document.getElementById("o" + i).value);
    var mu = parseFloat(document.getElementById("u" + i).value);
    mdata.push({
      M_f: mf,
      M_o: mo,
      M_u: mu,
    });
    tmf += mf;
    tmo += mo;
    tmu += mu;
  }

  var mfdata = [];
  var cmfdata = [];

  var tf4cmf = 0;
  var to4cmf = 0;
  var tu4cmf = 0;

  for (i = 0; i < 8; i++) {
    mfdata.push({
      Mf_f: mdata[i].M_f / tmf,
      Mf_o: mdata[i].M_o / tmo,
      Mf_u: mdata[i].M_u / tmu,
    });

    tf4cmf += mfdata[i].Mf_f;
    to4cmf += mfdata[i].Mf_o;
    tu4cmf += mfdata[i].Mf_u;
    cmfdata.push({
      Cmf_f: tf4cmf,
      Cmf_o: to4cmf,
      Cmf_u: tu4cmf,
    });
  }

  var mf = (cmfdata[1].Cmf_f - cmfdata[2].Cmf_f) / (3.35 - 2.8);
  var mo = (cmfdata[1].Cmf_o - cmfdata[2].Cmf_o) / (3.35 - 2.8);
  var mu = (cmfdata[1].Cmf_u - cmfdata[2].Cmf_u) / (3.35 - 2.8);
  var cf = cmfdata[1].Cmf_f - mf * 3.35;
  var co = cmfdata[1].Cmf_o - mo * 3.35;
  var cu = cmfdata[1].Cmf_u - mu * 3.35;
  var yf = mf * 3 + cf;
  var yo = mo * 3 + co;
  var yu = mu * 3 + cu;

  var DbyF = (yf - yu) / (yo - yu);
  var BbyF = 1 - DbyF;
  var Eff_o = DbyF * (yo / yf);
  var Eff_u = BbyF * ((1 - yu) / (1 - yf));
  var Eff_t = Eff_o * Eff_u;

  htmlat += "<tr>";
  htmlat += "<th rowspan=2>Mesh No</th>";
  htmlat += "<th rowspan=2>Mesh Size D<sub>pi</sub> (mm)</th>";
  htmlat += "<th colspan=3>Mass of Material retained</th>";
  htmlat += "<th colspan=3>Mass Fraction of Material retained</th>";
  htmlat += "<th colspan=3>Cumulative Mass Fraction of Material retained</th>";
  htmlat += "</tr>";
  htmlat += "<tr>";
  htmlat += "<th>Feed</th>";
  htmlat += "<th>Overflow</th>";
  htmlat += "<th>Underflow</th>";
  htmlat += "<th>Feed</th>";
  htmlat += "<th>Overflow</th>";
  htmlat += "<th>Underflow</th>";
  htmlat += "<th>Feed</th>";
  htmlat += "<th>Overflow</th>";
  htmlat += "<th>Underflow</th>";
  htmlat += "</tr>";
  for (i = 0; i < 8; i++) {
    htmlat += "<tr>";
    htmlat += "<td>" + predata[i].MeshNo + "</td>";
    htmlat += "<td>" + predata[i].MeshSize + "</td>";
    htmlat += "<td>" + mdata[i].M_f.toFixed(1) + "</td>";
    htmlat += "<td>" + mdata[i].M_o.toFixed(1) + "</td>";
    htmlat += "<td>" + mdata[i].M_u.toFixed(1) + "</td>";
    htmlat += "<td>" + mfdata[i].Mf_f.toFixed(3) + "</td>";
    htmlat += "<td>" + mfdata[i].Mf_o.toFixed(3) + "</td>";
    htmlat += "<td>" + mfdata[i].Mf_u.toFixed(3) + "</td>";
    htmlat += "<td>" + cmfdata[i].Cmf_f.toFixed(3) + "</td>";
    htmlat += "<td>" + cmfdata[i].Cmf_o.toFixed(3) + "</td>";
    htmlat += "<td>" + cmfdata[i].Cmf_u.toFixed(3) + "</td>";
    htmlat += "</tr>";
  }

  if (false) {
    htmlres += "Invalid Data";
    document.getElementById("graph").style.display = "none";
  } else {
    document.getElementById("graph").style.display = "block";
    htmlres +=
      "<b>Result: </b><br> Overall Effectiveness of Trommel (E) is " +
      Eff_t.toFixed(4);
  }
  var alabel = document.getElementById("alabel");
  alabel.innerHTML = "Observation Table";

  atable.innerHTML = htmlat;
  output.innerHTML = htmlres;

  parent.location = "#results";
  document.getElementById("output").style.display = "none";
  document.getElementById("atable").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("hspinner").style.display = "block";
  if (f1 < 0) {
    setTimeout(function () {
      document.getElementById("hspinner").style.display = "none";
      document.getElementById("output").style.display = "block";
      document.getElementById("graph").style.display = "none";
    }, 500);
  } else {
    setTimeout(function () {
      document.getElementById("hspinner").style.display = "none";
      document.getElementById("atable").style.display = "block";
      document.getElementById("output").style.display = "block";
    }, 500);
  }

  var dataPointsf = [];
  for (var i = 0; i <= 1; i++) {
    dataPointsf.push({
      x: predata[i].MeshSize,
      y: cmfdata[i].Cmf_f,
    });
  }
  dataPointsf.push({
    x: 3,
    y: yf,
    indexLabel: "Xf = " + yf.toFixed(4),
    markerType: "circle",
    markerColor: "#858585",
  });
  for (var i = 2; i <= 7; i++) {
    dataPointsf.push({
      x: predata[i].MeshSize,
      y: cmfdata[i].Cmf_f,
    });
  }

  var dataPointso = [];
  for (var i = 0; i <= 1; i++) {
    dataPointso.push({
      x: predata[i].MeshSize,
      y: cmfdata[i].Cmf_o,
    });
  }
  dataPointso.push({
    x: 3,
    y: yo,
    indexLabel: "Xd = " + yo.toFixed(4),
    markerType: "circle",
    markerColor: "#858585",
  });
  for (var i = 2; i <= 7; i++) {
    dataPointso.push({
      x: predata[i].MeshSize,
      y: cmfdata[i].Cmf_o,
    });
  }

  var dataPointsu = [];
  for (var i = 0; i <= 1; i++) {
    dataPointsu.push({
      x: predata[i].MeshSize,
      y: cmfdata[i].Cmf_u,
    });
  }
  dataPointsu.push({
    x: 3,
    y: yu,
    indexLabel: "Xb = " + yu.toFixed(4),
    markerType: "circle",
    markerColor: "#858585",
  });
  for (var i = 2; i <= 7; i++) {
    dataPointsu.push({
      x: predata[i].MeshSize,
      y: cmfdata[i].Cmf_u,
    });
  }

  var chart = new CanvasJS.Chart("graph", {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: "Graph",
    },
    axisX: {
      title: "Mesh Size",
      stripLines: [
        {
          value: 3,
          color: "#858585",
        },
      ],
    },
    axisY: {
      title: "Cumulative Mass Fraction",
    },
    data: [
      {
        type: "line",
        name: "Feed",
        showInLegend: true,
        dataPoints: dataPointsf,
      },
      {
        type: "line",
        name: "Overflow",
        showInLegend: true,
        dataPoints: dataPointso,
      },
      {
        type: "line",
        name: "Underflow",
        showInLegend: true,
        dataPoints: dataPointsu,
      },
    ],
  });
  chart.render();
}
