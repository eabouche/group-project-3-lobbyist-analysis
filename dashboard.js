//var sampleurl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function buildMetadata(sample) {
  d3.json("data/lobbyists.json").then((data) => {
    //var metadata= data.metadata;
    var resultsarray= data.filter(sampleobject => 
      sampleobject.last_name == sample);
    var result= resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });

  //buildGauge(result.wfreq)



  });
}

function buildMap(sample){

  d3.json("data/lobbyists.json").then((importedData) => {
    //console.log(importedData);
    let data = importedData;
  
    // console.log(data);
  
    // Create a map object.
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5
    });
  
    // Add a tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  
    // Add lobbyist markers
    for (var i = 0; i < data.length; i++) {
      var lobbyist = data[i];
      if(lobbyist.last_name = sample){
         var marker = L.marker([lobbyist.lat, lobbyist.long])
          .bindPopup(`<h1>${lobbyist.first_name} ${lobbyist.last_name}</h1> <hr> <h3>Address: ${lobbyist.address_1}, <br/> ${lobbyist.city},
            ${lobbyist.state} ${lobbyist.zip}</h3> <h4>emal: ${lobbyist.email} </br> phone: ${lobbyist.phone} </br> employer: ${lobbyist.employer_name}</h4>`)
          .addTo(myMap);
          marker._icon.classList.add("huechange");
      }
      else {
        L.marker([lobbyist.lat, lobbyist.long])
          .bindPopup(`<h1>${lobbyist.first_name} ${lobbyist.last_name}</h1> <hr> <h3>Address: ${lobbyist.address_1}, <br/> ${lobbyist.city},
            ${lobbyist.state} ${lobbyist.zip}</h3> <h4>emal: ${lobbyist.email} </br> phone: ${lobbyist.phone} </br> employer: ${lobbyist.employer_name}</h4>`)
          .addTo(myMap);
    }}
  
  });
}

//function buildGauge(wfreq) {}

function buildCharts(sample) {

// Use `d3.json` to fetch the sample data for the plots
d3.json("data/lobbyists.json").then((data) => {
  var samples= data.samples;
  var resultsarray= samples.filter(sampleobject => 
      sampleobject.id == sample);
  var result= resultsarray[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;

//------------------------------------------------------//
//------------------------------------------------------//
          // Build a BUBBLE Chart 
//------------------------------------------------------//
//------------------------------------------------------//

  var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "OTU ID" },
    hovermode: "closest",
    };

    var DataBubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.newPlot("bubble", DataBubble, LayoutBubble);


//---------------------------------------------------------//
//---------------------------------------------------------//
              //  Build a BAR Chart
//---------------------------------------------------------//  
//---------------------------------------------------------// 
  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
  ];

  var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, barLayout);
});
}
 

function init() {
// Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("data/lobbyists.json").then((data) => {
    // var sampleNames = data.last_name;
    var sampleNames = []
    data.forEach((sample) => {
      sampleNames.push(`${sample.first_name} ${sample.last_name}`)
    })
    console.log('hello')
    console.log(sampleNames)
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = data[0].lobbyist_id //sampleNames[0];  
    buildMap(firstSample);
    buildMetadata(firstSample);
    // buildCharts(firstSample);
    
  });
}

function optionChanged(newSample) {
// Fetch new data each time a new sample is selected
// buildCharts(newSample);
 buildMetadata(newSample);
 buildMap(newSample);
}

// Initialize the dashboard
init();