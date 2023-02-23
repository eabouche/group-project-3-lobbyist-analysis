// Get API Endpoint URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function buildMetadata(newSample){

    // Fetch the json data and console log it
    d3.json("lobbyists.json").then(function (data){
        console.log('Samples data:', data);
        // let metadata = data.metadata;
        let lobbyist = data

        //console.log('Lobbyist Name:', lobbyist_last);

        // filter the data for the object with the desired sample number
        let resultArray = lobbyist.filter(id => id.lobbyist_id == newSample);
        let result = resultArray[0];
        console.log('Sample lobbyist object:', result);

        // use d3 to select the panel with id of `#sample-metadata`
        // d3.select('#sample-metadata');

        // Use `.html("") to clear any existing metadata
        d3.select('#sample-metadata').html("");

        // Hint: Inside the loop, you will need to use D3 to append new
        // tags for each key-value in the metadata 
        for (key in result){
            // This line of code takes d3 selection and appends text to it
            d3.select('#sample-metadata').append("h5").text(`${key} : ${result[key]}`);

        };
    });
};

    // let samples = data.samples;
    // let resultSamples = samples.filter(item => item.id = 940);
    // let resultSample = resultSamples[0];
    // console.log('Sample metadata:', resultSample);

    // let otuIds = [];
    // otuIds.push(resultSample.otu_ids);
    // console.log(otuIds);


    // let otuSampleValues = [];
    // otuSampleValues.push(resultSample.sample_values);
    // console.log(otuSampleValues);\


// Build gauge chart accessing Metadata property
function buildGaugeChart(sample){
    // Fetch the json data and console log it
    d3.json("compensation.json").then(function (data){
        //console.log('Samples data:', data);
        let metadata = data;

        //console.log('Metadata:', metadata);

        // filter the data for the object with the desired sample number
        let resultArray = metadata.filter(id => id.lobbyist_id == sample);
        let result = resultArray[0];
        console.log('Sample object:', result);

        let compAmount = resultArray.map(item => item.compensation_amount);
        console.log('compAmount',compAmount);

        let totalAmount = 0
        for (let i = 0; i < resultArray.length; i++){
            totalAmount += resultArray[i].compensation_amount;
        }

        console.log('totalAmount', totalAmount);

        // create a float variable
        let frequency = parseFloat(totalAmount);

        let gaugeData = {
            title: {text: "<b>Lobbyist Total Compensation</b> <br> since 2019"},
            type : "indicator",
            mode : "gauge+number" ,
            value : frequency,
            domain : {x: [0,1], y:[0,1]},
            gauge : {
                axis : {range: [null,1000000]},
                bar : {color: "#1d0066"},
                steps : [
                    {range: [0,2],color:"#ffffd4"},
                    {range: [2,4],color:"#eaf4f6"},
                    {range: [4,6],color:"#d6e9ed"},
                    {range: [6,8],color:"#c1dee5"},
                    {range: [8,10],color:"#add4dc"}
                ],

            }
        };

        let gaugeDataArray = [gaugeData];

        // Create layout
        let gaugeLayout = {
            width: 500,
            height: 400,
            margin: {
                t:  25,
                r: 25,
                l: 25,
                b: 25
            },
            font: {
                color: "darklavender",
                familiy:"Tahoma"
            }
        };

        Plotly.newPlot("gauge",gaugeDataArray, gaugeLayout);

    });


};


// Create a function to build the charts
function buildCharts(sample) {
	d3.json("compensation.json").then(function(data){

        console.log("compensation file", data); 
        console.log('new sample',sample);

		let samples = data;

        console.log('samples',samples);
        console.log('samples[0]',samples[0]);
        console.log('samples[0].lobbyist_id',samples[0].lobbyist_id);

		let resultArray = samples.filter(sampleObj => sampleObj.lobbyist_id == sample);
		let result = resultArray[0];

        console.log("let resultArray", resultArray);
        console.log('result [0]',result);
		
		// let otu_ids = result.otu_ids;
		// let otu_labels = result.otu_labels;
		// let sample_values = result.sample_values;

        let timePeriod = resultArray.map(item => item.period_end).reverse();
        let compAmt = resultArray.map(item => item.compensation_amount);
        let clients = resultArray.map(item => item.client_name);
        let compAmtDiv10 = resultArray.map(item => (item.compensation_amount/ 500)); 
        console.log('compAmtDiv10', compAmtDiv10);

        let clientName = result.client_name;
        console.log('clientName:', clientName );

        let compensationAmount = result.compensation_amount;
        console.log('compensationAmount:', compensationAmount);
		
		// Build a Bubble Chart
		let bubbleChart = {
            x : timePeriod,
            y : compAmt,
            text : clients,
            mode : "markers",
            marker : {
                size : compAmtDiv10,
                color : compAmt,
                colorscale : "Bluered"  
            }

        }

        let bubbleChartDataArray = [bubbleChart];

        // Do layout
        bubbleLayout = {
            title: "Lobbyist compensations over time",
            hovermode: "closest",
            xaxis : {title: "year"},
            yaxis : {title: "Compensation Amount"}
        };

		// Dispay bubble plot
		Plotly.newPlot("bubble",bubbleChartDataArray, bubbleLayout);
		
		// Build a Bar Chart

        // let yvalues = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        // let xvalues = sample_values.slice(0,10).reverse();
        // let labelValues = otu_labels.slice(0,10).reverse();

        let yvalues = resultArray.slice(0,10).map(item => item.client_name);
        let xvalues = resultArray.slice(0,10).map(item => item.compensation_amount);
        let labelValues = resultArray.slice(0.10).map(item => item.employer_name);

        console.log('yvalues:', yvalues);
        console.log('xvalues:', xvalues);

        let barChart = {
            x : xvalues,
            y : yvalues,
            text : labelValues,
            type : 'bar',
            orientation : 'h' 
        };

        let barChartArray = [barChart];

        // Set the layout
        let barLayout = {
            title: "Top Clients"
        };

        Plotly.newPlot("bar",barChartArray, barLayout);
		
	});
};


// Create a function that initializes the dashboard 
function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
    console.log("Init Selector", selector);
  
    // Use the list of sample names to populate the select options
    d3.json("lobbyists.json").then(function(data){

      console.log('Lobyist data:', data);

      let sampleNames = data;
      //console.log('Lobbyist names', sampleNames);
  
      // Use a for loop to append to the 'selector' object 
      for (let i = 0; i < sampleNames.length; i++){
        // append to the selector object
        selector.append("option").text(`${sampleNames[i].first_name} ${sampleNames[i].last_name}`).property("value",sampleNames[i].lobbyist_id);
      };
  
      // Use the first sample from the list to build the initial plots
      let firstSample = sampleNames[0].lobbyist_id;
      buildCharts(firstSample);              
      buildMetadata(firstSample);
      buildGaugeChart(firstSample);
    });
  };

// Don't make any changes below this line 
// optionChanged() function is referenced in line 25 of index.html

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);      
    buildMetadata(newSample);
    buildGaugeChart(newSample);
  };
  
// Initialize the dashboard
init();
