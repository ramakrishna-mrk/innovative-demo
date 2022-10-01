function calc() {
  var M2 = parseFloat(document.getElementById("M2").value);
  var M4 = parseFloat(document.getElementById("M4").value);
  var M6 = parseFloat(document.getElementById("M6").value);
  var M8 = parseFloat(document.getElementById("M8").value);

  var result = document.getElementById("result");
  var gtable = document.getElementById("gtable");

  if (M2 !== M2 || M4 !== M4 || M6 !== M6 || M8 !== M8) {
    document.getElementById("glabel").style.display = "none";
    document.getElementById("gtable").style.display = "none";
    document.getElementById("graph").style.display = "none";
    document.getElementById("result").style.display = "none";
    return;
  }

  var htmlres = "";
  var htmlgt = "";

  var data = [];

  data.push({
    Time: 2,
    Cum_Time: 2,
    Mass: M2,
    Cum_Mass: 0,
    Cum_Mass_Percent: 0,
  });

  data.push({
    Time: 2,
    Cum_Time: 4,
    Mass: M4,
    Cum_Mass: 0,
    Cum_Mass_Percent: 0,
  });

  data.push({
    Time: 2,
    Cum_Time: 6,
    Mass: M6,
    Cum_Mass: 0,
    Cum_Mass_Percent: 0,
  });

  data.push({
    Time: 2,
    Cum_Time: 8,
    Mass: M8,
    Cum_Mass: 0,
    Cum_Mass_Percent: 0,
  });

  var Total_Material = 0;
  for (i = 0; i <= data.length - 1; i++) {
    Total_Material += data[i].Mass;
    data[i].Cum_Mass = Total_Material;
    data[i].Cum_Mass_Percent = (data[i].Cum_Mass / 500) * 100;
  }

  //Finding out cum time for 80% cum mass percent:
  var m = -1;
  var xi = 0;
  for (; xi < data.length; xi++) {
    if (data[xi].Cum_Mass_Percent >= 80) {
      m =
        (data[xi].Cum_Mass_Percent - data[xi - 1].Cum_Mass_Percent) /
        (data[xi].Cum_Time - data[xi - 1].Cum_Time);

      var c = data[xi].Cum_Mass_Percent - m * data[xi].Cum_Time;
      var y_80 = 80;
      var x_time = (y_80 - c) / m;
      break;
    }
  }

  htmlgt += "<tr>";
  htmlgt += "<th>Time (min)</th>";
  htmlgt += "<th>Cumulative Time</th>";
  htmlgt += "<th>Mass of -52 Fraction</th>";
  htmlgt += "<th>Cumulative Mass of -52 fraction</th>";
  htmlgt += "<th>Cumulative Mass percent of -52 fraction</th>";
  htmlgt += "</tr>";
  for (i = 0; i <= data.length - 1; i++) {
    htmlgt += "<tr>";
    htmlgt += "<td>" + data[i].Time + "</td>";
    htmlgt += "<td>" + data[i].Cum_Time + "</td>";
    htmlgt += "<td>" + data[i].Mass + "</td>";
    htmlgt += "<td>" + data[i].Cum_Mass + "</td>";
    htmlgt += "<td>" + data[i].Cum_Mass_Percent.toFixed(2) + "</td>";
    htmlgt += "</tr>";
  }

  if (m == -1) {
    htmlres += "<b>Error: </b>Cumulative percent did not reached 80%.";
  } else {
    htmlres +=
      "<b>Result: </b><br>From the graph, the time corresponding to 80 percent is the time of grinding which is " +
      x_time.toFixed(3) +
      " min";
  }

  // label, table, result, graph Setting
  gtable.innerHTML = htmlgt;
  result.innerHTML = htmlres;

  //Graph
  function compareDataPointYAscend(dataPoint1, dataPoint2) {
    return dataPoint1.y - dataPoint2.y;
  }
  if (m !== -1) {
    document.getElementById("graph").style.display = "block";
    var c = new CanvasJS.Chart("graph", {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Graph",
      },
      axisX: {
        title: "Cumulative Time",
        stripLines: [
          {
            value: x_time,
          },
        ],
      },
      axisY: {
        title: "Cumulative Mass Percent",
        stripLines: [
          {
            value: y_80,
          },
        ],
      },
      data: [
        {
          type: "line",
          xValueType: "number",
          dataPoints: [
            { x: data[0].Cum_Time, y: data[0].Cum_Mass_Percent },
            { x: data[1].Cum_Time, y: data[1].Cum_Mass_Percent },
            { x: data[2].Cum_Time, y: data[2].Cum_Mass_Percent },
            {
              x: x_time,
              y: y_80,
              indexLabel: "" + x_time.toFixed(3),
              markerType: "circle",
              markerColor: "#F08080",
            },
            { x: data[3].Cum_Time, y: data[3].Cum_Mass_Percent },
          ],
        },
      ],
    });
    c.options.data[0].dataPoints.sort(compareDataPointYAscend);
    c.render();
  } else {
    document.getElementById("graph").style.display = "none";
  }

  // Display Setting
  parent.location = "#output";
  document.getElementById("glabel").style.display = "block";
  document.getElementById("gtable").style.display = "none";
  document.getElementById("result").style.display = "none";
  document.getElementById("hspinner").style.display = "block";

  setTimeout(function () {
    document.getElementById("hspinner").style.display = "none";
    document.getElementById("gtable").style.display = "block";
    document.getElementById("result").style.display = "block";
  }, 500);
}
