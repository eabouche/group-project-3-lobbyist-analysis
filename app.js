// Get API Endpoint URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function buildMetadata(newSample){

    // Fetch the json data and console log it
    d3.json("data/lobbyists.json").then(function (data){
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
            if (key !== 'lobbyist_id' &&
                key !== 'employer_id' &&
                key !== 'year' &&
                key !== 'fax' &&
                key !== 'lat' &&
                key !== 'long')
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

function buildContributionChart(sample){
    d3.json("data/lobbyist_contribution_info.json").then(function(data){

        console.log("contribution data", data); 

        let contribution_df = data;

        console.log("contribution lobbyist id", sample);

        // filter the data for the object with the desired sample number
        let resultArray = contribution_df.filter(id => id.lobbyist_id == sample);
        let result = resultArray[0];
        console.log('Contribution filter', resultArray);
        console.log('Contribution [0]', result);
   
        let totalContributionAmount = 0
        for (let i = 0; i < resultArray.length; i++){
            totalContributionAmount += resultArray[i].amount;
        };

        console.log('totalContributionAmount', totalContributionAmount);

        let frequency = parseFloat(totalContributionAmount);

        let gaugeData = {
            title: {text: "<b>Lobbyist Total Contributions</b> <br> since 2019"},
            type : "indicator",
            mode : "gauge+number" ,
            value : frequency,
            domain : {x: [0,1], y:[0,1]},
            gauge : {
                axis : {range: [null,100000]},
                bar : {color: "#0b9e17"},
                steps : [
                    {range: [0,20000],color:"#89c9e0"},
                    {range: [20000,40000],color:"#f2b552"},
                    {range: [40000,60000],color:"#b0f056"},
                    {range: [60000,80000],color:"#75f056"},
                    {range: [80000,100000],color:"#17b329"}
                ],

            }
        };

        let gaugeDataArray = [gaugeData];

        // Create layout
        let gaugeLayout = {
            width: 400,
            height: 400,
            margin: {
                t:  25,
                r: 50,
                l: 50,
                b: 25
            },
            font: {
                color: "darklavender",
                familiy:"Tahoma"
            }
        };

        Plotly.newPlot("contribution-chart",gaugeDataArray, gaugeLayout);

        // Build a Bar Chart for lobbyist contributions to politicians and organizations

        // Use `.html("") to clear any existing metadata
        //d3.select('#bar').html("");

        // let yvalues = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        // let xvalues = sample_values.slice(0,10).reverse();
        // let labelValues = otu_labels.slice(0,10).reverse();

        let yvalues = resultArray.map(item => item.recipient);    //.slice(0,10)
        let xvalues = resultArray.map(item => item.amount);    //.slice(0,10)
        let labelValues = resultArray.map(item => item.recipient);      //.slice(0.10)

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
            title: "Lobbyist Contributions",
            width: 1000,
            height: 500,
            margin: {
                t:  100,
                r: 25,
                l: 300,
                b: 25
            },
        };

        Plotly.newPlot("contribution-bar",barChartArray, barLayout);
    });

};

// Build gauge chart accessing Metadata property
function buildGaugeChart(sample){
    // Fetch the json data and console log it
    d3.json("data/compensation.json").then(function (data){
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
                bar : {color: "#0b9e17"},
                steps : [
                    {range: [0,200000],color:"#89c9e0"}, 
                    {range: [200000,400000],color:"#f2b552"}, 
                    {range: [400000,600000],color:"#b0f056"},
                    {range: [600000,800000],color:"#75f056"},
                    {range: [800000,1000000],color:"#17b329"}
                ],

            }
        };

        let gaugeDataArray = [gaugeData];

        // Create layout
        let gaugeLayout = {
            width: 400,
            height: 400,
            margin: {
                t:  25,
                r: 50,
                l: 50,
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
	d3.json("data/compensation.json").then(function(data){

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
            title: "<b>Lobbyist Compensation Over Time</b>",
            hovermode: "closest",
            xaxis : {title: "year"},
            yaxis : {title: "Compensation Amount"}
        };

		// Dispay bubble plot
		Plotly.newPlot("bubble",bubbleChartDataArray, bubbleLayout);
		
		// Build a Bar Chart for lobbyist compensation from clients

        // Use `.html("") to clear any existing metadata
        //d3.select('#bar').html("");

        // let yvalues = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        // let xvalues = sample_values.slice(0,10).reverse();
        // let labelValues = otu_labels.slice(0,10).reverse();

        let yvalues = resultArray.map(item => item.client_name);    //.slice(0,10)
        let xvalues = resultArray.map(item => item.compensation_amount);    //.slice(0,10)
        let labelValues = resultArray.map(item => item.employer_name);      //.slice(0.10)

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
            title: "Lobbyist Clients",
            width: 1000,
            height: 500,
            margin: {
                t:  100,
                r: 25,
                l: 300,
                b: 25
            },
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
    d3.json("data/lobbyists.json").then(function(data){

      console.log('Lobyist data:', data);

      let sampleNames = data;
      //console.log('Lobbyist names', sampleNames);

      sampleNames.sort();
      console.log('sampleNames sorted',sampleNames);
  
      // Use a for loop to append to the 'selector' object 
      for (let i = 0; i < sampleNames.length; i++){
        // append to the selector object
        selector.append("option").text(`${sampleNames[i].last_name}, ${sampleNames[i].first_name}`).property("value",sampleNames[i].lobbyist_id);
      };
  
      // Use the first sample from the list to build the initial plots
      let firstSample = sampleNames[0].lobbyist_id;
      buildCharts(firstSample);              
      buildMetadata(firstSample);
      buildGaugeChart(firstSample);
      buildContributionChart(firstSample);
    });
  };

// Don't make any changes below this line 
// optionChanged() function is referenced in line 25 of index.html

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);      
    buildMetadata(newSample);
    buildGaugeChart(newSample);
    buildContributionChart(newSample);
  };
  
// Initialize the dashboard
init();

