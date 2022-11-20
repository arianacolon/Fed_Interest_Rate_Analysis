//Pull dates from json sample data and place in dropdown <options>
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of dates to populate the select options
  d3.json("unemployment_data.json").then((data) => {
    var allDates = data.metadata.map(metaObj => metaObj.date)
    //console.log(allDates)

    allDates.forEach((ddates) => {
      selector
        .append("option")
        .text(ddates)
        .property("value", ddates);
    });

    // Use the first date from the list to build the initial plots
    var firstDate = allDates[0];
    buildMetadata(firstDate);
    loadCharts(data.metadata[0])
  });
}

// Initialize the dashboard
init();
  
function optionChanged(newDate) {
  // Fetch new data each time a new date is selected
  buildMetadata(newDate);
  buildCharts(newDate);

 
}

// Economics Panel 
function buildMetadata(ddates) {
  d3.json("unemployment_data.json").then((data) => {
    var metadata = data.metadata;
    var datesData =data.datesData
    //console.log(datesData)
    // Filter the data for the object with the desired date
    var resultArray = metadata.filter(metaObj => metaObj.date == ddates);
    var result = resultArray[0];
    //console.log(ddates.split("/")[2])
    //console.log(metadata[0].date.split("-")[0]+metadata[0].date.split("-")[0]+metadata[0].date.split("-")[0])

    // Use d3 to select the panel with id of `#date-metadata`
    var PANEL = d3.select("#date-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}



//--------------- Load Bar Chart---------
// Create the loadCharts function.
function loadCharts(ddates) {
  
//---------------------- Chart 1 Fed Fund and Inflation-----------
//Create the trace for the bar chart. 
var barData = [{
  x: ['ue_rates','fed_rates', 'inflation_rates'],
  y: [ddates.unemployment, ddates.federal_ir, ddates.inflation_rate],
  type: "bar",
  orientation: "v"},

];

// Create the layout for the bar chart. 
var barLayout = {
 title: "Unemployment vs Fed Fund and Inflation Rates",
 margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 30
  },
}

Plotly.newPlot("bar", barData, barLayout);

//------------------ Chart 2 CPI and PPI------------ 

//Create the trace for the bar chart. 
var barData = [{
  x: ['ue_rates','cpi_rates', 'ppi_rates'],
  y: [ddates.unemployment, ddates.cpi, ddates.ppi],
  type: "bar",
  orientation: "v"}
];


// Create the layout for the bar chart. 
var barLayout = {
 title: "Unemployment Rates vs CPI and PPI",
 margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 30
  }

};


// Use Plotly to plot the data with the layout. 
Plotly.newPlot("bar2", barData, barLayout);


//------------------ Chart 3 GDP -------------------- 
//Create the trace for the bar chart. 
var barData = [{
  x: ['ue_rates','gdp_rates'],
  y: [ddates.unemployment, ddates.gdp],
  type: "bar",
  orientation: "v"}
];


// Create the layout for the bar chart. 
var barLayout = {
 title: "Unemployment Rates vs Gross Domestic Product",
 margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 30
  }

};

// Use Plotly to plot the data with the layout. 
Plotly.newPlot("bar3", barData, barLayout);

};

//--------------- Build Bar Chart---------
function buildCharts(ddates) {

// Use d3.json to load and retrieve the unemployment_data.json file 
d3.json("unemployment_data.json").then((data) => {

// Create a variable that holds each index
var metadata = data.metadata;

// Create a variable that filters the metadata for the object with the desired date.
var chartArray = metadata.filter(chartObj => chartObj.date == ddates);

// Create a variable that holds the first sample in the array.
var chartResult = chartArray[0];
console.log(chartArray)

// 6. Create variables that hold the chartResults data.
var ue_rates = chartResult.unemployment;
var fed_rates = chartResult.federal_ir;
var cpi_rates = chartResult.cpi;
var gdp_rates = chartResult.gdp;
var ppi_rates = chartResult.ppi;
var inflation_rate = chartResult.inflation_rate;

  
//---------------- Bar Charts ------------------
//---------------------- Chart 1 Fed Fund and Inflation-----------
// Create the yticks for the bar chart.  
var y = [ue_rates, fed_rates, inflation_rate]

//Create the trace for the bar chart. 
var barData = [{
  x: ['ue_rates', 'fed_rates', 'inflation_rates'],
  y: [ue_rates, fed_rates, inflation_rate],
  type: "bar",
  orientation: "v"},
  
];
// Create the layout for the bar chart. 
var barLayout = {
 title: "Unemployment vs Fed Fund and Inflation Rates",
 margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 30
  }

};

// Use Plotly to plot the data with the layout. 
 // call updatePlotly 
Plotly.restyle("bar", "y", [y], barLayout);




//------------------ Chart 2 CPI and PPI------------ 
// Create the yticks for the bar chart.  
var x = ['cpi_rates', 'ppi_rates', 'ue_rates']
var y = [cpi_rates, ppi_rates, ue_rates]

//Create the trace for the bar chart. 
var barData = [{
  x: ['cpi_rates', 'ppi_rates', 'ue_rates'],
  y: [cpi_rates, ppi_rates, ue_rates],
  type: "bar",
  orientation: "v"}
];


// Create the layout for the bar chart. 
var barLayout = {
 title: "Unemployment Rates vs CPI and PPI",
 margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 30
  }

};


// Use Plotly to plot the data with the layout. 
 // call updatePlotly 
Plotly.restyle("bar2", "y", [y], barLayout);


//------------------ Chart 3 GDP -------------------- 
// Create the yticks for the bar chart.  
var y = [ue_rates, gdp_rates]

//Create the trace for the bar chart. 
var barData = [{
  x: ['ue_rates', 'gdp_rates'],
  y: [ue_rates, gdp_rates],
  type: "bar",
  orientation: "v"}
];

// Create the layout for the bar chart. 
var barLayout = {
 title: "Unemployment Rates vs Gross Domestic Product",
 margin: {
  l: 100,
  r: 100,
  t: 100,
  b: 30
  }

};

// Use Plotly to plot the data with the layout. 
 // call updatePlotly 
Plotly.restyle("bar3", "y", [y], barLayout);
});

}