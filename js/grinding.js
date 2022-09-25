function calc() {
    var M2 = parseFloat(document.getElementById("M2").value);
    var M4 = parseFloat(document.getElementById("M4").value);
    var M6 = parseFloat(document.getElementById("M6").value);
    var M8 = parseFloat(document.getElementById("M8").value);

  
    var output = document.getElementById("output");
    var gtable = document.getElementById("gtable");
  
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
      data[i].Cum_Mass_Percent = (data[i].Cum_Mass/500)*100;
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
        htmlgt += "<td>" + (data[i].Cum_Mass_Percent).toFixed(2) + "</td>";
        htmlgt += "</tr>";
    }
  
    if (!M2 || !M4 || !M6 || !M8) {
      htmlres += "Invalid Data";
      document.getElementById("graph").style.display = "none";
    } else {
      document.getElementById("graph").style.display = "block";
      htmlres +=
        "<b>Result: Differential Analysis</b><br>The average size (volume surface mean diameter) of the sample is: " +
        data[3].Cum_Mass_Percent +
        " mm";
  
    }
    var glabel = document.getElementById("glabel");
    glabel.innerText = "Observation Table";
  
    gtable.innerHTML = htmlgt;
    output.innerHTML = htmlres;

  
    parent.location = "#results";
    document.getElementById("output").style.display = "none";
    document.getElementById("gtable").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("hspinner").style.display = "block";
    if (!M2 || !M4 || !M6 || !M8 ) {
      setTimeout(function () {
        document.getElementById("hspinner").style.display = "none";
        document.getElementById("output").style.display = "block";
        document.getElementById("graph").style.display = "none";
      }, 500);
    } else {
      setTimeout(function () {
        document.getElementById("hspinner").style.display = "none";
        document.getElementById("gtable").style.display = "block";
        document.getElementById("output").style.display = "block";
      }, 500);
    }
  
    //Graph
    if ((!M2 || !M4 || !M6 || !M8) == false) {
      var c = new CanvasJS.Chart("graph", {
        zoomEnabled: true,
        title: {
          text: "Graph",
        },
        axisX: {
          title: "Cumulative Time",
        },
        axisY: {
          title: "Cumulative Mass Percent",
        },
        data: [
          {
            type: "area",
            xValueType: "number",
            dataPoints: [
              { x: data[0].Cum_Time, y: data[0].Cum_Mass_Percent },
              { x: data[1].Cum_Time, y: data[1].Cum_Mass_Percent },
              { x: data[2].Cum_Time, y: data[2].Cum_Mass_Percent },
              { x: data[3].Cum_Time, y: data[3].Cum_Mass_Percent },
            ],
          },
        ],
      });
      c.render();
    }
  }
  