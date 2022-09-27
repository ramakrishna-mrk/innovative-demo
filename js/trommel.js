function calc() {
    var output = document.getElementById("output");
    var atable = document.getElementById("atable");
  
    var htmlres = "";
    var htmlat = "";

    var predata = [];
    predata.push({
      MeshNo: 4,
      MeshSize: 4.00,
    });

    predata.push({
      MeshNo: 5,
      MeshSize: 3.35,
    });

    predata.push({
      MeshNo: 6,
      MeshSize: 2.80,
    });

    predata.push({
      MeshNo: 7,
      MeshSize: 2.36,
    });

    predata.push({
      MeshNo: 8,
      MeshSize: 2.00,
    });

    predata.push({
      MeshNo: 12,
      MeshSize: 1.00,
    });

    predata.push({
      MeshNo: "pan",
      MeshSize: "---",
    });


    var mdata = [];
    var tmf=0;
    var tmo=0;
    var tmu=0;
    for (i=1; i<=7; i++){
      var mf = parseFloat(document.getElementById("f"+i).value);
      var mo = parseFloat(document.getElementById("o"+i).value);
      var mu = parseFloat(document.getElementById("u"+i).value);
      mdata.push(
        {
          M_f: mf,
          M_o: mo,
          M_u: mu,
        }
      );
      tmf += mf;
      tmo += mo;
      tmu += mu;
    }
  
    var mfdata = [];

    var cmfdata = [];
    var tf4cmf = 0;
    var to4cmf = 0;
    var tu4cmf = 0;

    for (i=0; i<7; i++){
      mfdata.push({
        Mf_f: mdata[i].M_f/tmf,
        Mf_o: mdata[i].M_o/tmo,
        Mf_u: mdata[i].M_u/tmu,
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
  
    htmlat += "<tr>";
    htmlat += "<th>Time (min)</th>";
    htmlat += "<th>Cumulative Time</th>";
    htmlat += "<th>Mass of -52 Fraction</th>";
    htmlat += "<th>Cumulative Mass of -52 fraction</th>";
    htmlat += "<th>Cumulative Mass percent of -52 fraction</th>";
    htmlat += "</tr>";
    for (i = 0; i <= data.length - 1; i++) {
      htmlat += "<tr>";
      htmlat += "<td>" + data[i].Time + "</td>";
      htmlat += "<td>" + data[i].Cum_Time + "</td>";
      htmlat += "<td>" + data[i].Mass + "</td>";
      htmlat += "<td>" + data[i].Cum_Mass + "</td>";
      htmlat += "<td>" + data[i].Cum_Mass_Percent.toFixed(2) + "</td>";
      htmlat += "</tr>";
    }
  
    if (!M2 || !M4 || !M6 || !M8) {
      htmlres += "Invalid Data";
      document.getElementById("graph").style.display = "none";
    } else {
      document.getElementById("graph").style.display = "block";
      htmlres +=
        "<b>Result: </b><br>From the graph, the time corresponding to 80 percent is the time of grinding which is " +
        x80.toFixed(3) +
        " min";
    }
    var alabel = document.getElementById("alabel");
    alabel.innerText = "Observation Table";
  
    atable.innerHTML = htmlat;
    output.innerHTML = htmlres;
  
    parent.location = "#results";
    document.getElementById("output").style.display = "none";
    document.getElementById("gtable").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("hspinner").style.display = "block";
    if (!M2 || !M4 || !M6 || !M8) {
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
        animationEnabled: true,
        title: {
          text: "Graph",
        },
        axisX: {
          title: "Cumulative Time",
          stripLines: [{
            value: x80,
            // label: "time of griding"
          }]
        },
        axisY: {
          title: "Cumulative Mass Percent",
          stripLines: [{
            value: y80,
            // label: "time of griding"
          }]
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
                x: x80,
                y: y80,
                indexLabel: "" + x80.toFixed(3),
                markerType: "circle",
                markerColor: "#F08080",
              },
              { x: data[3].Cum_Time, y: data[3].Cum_Mass_Percent },
            ],
          },
        ],
      });
      c.render();
    }
  }
  