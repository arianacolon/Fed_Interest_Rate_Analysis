
//Pull dates from json sample data and place in dropdown <options>
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    
  // Use the list of dates to populate the select options
  d3.json("unemployment_data.json").then((data) => {
    var allDates = data.datesData;

    allDates.forEach((ddates) => {
      selector
        .append("option")
        .text(ddates)
        .property("value", ddates);
    });

    // Use the first date from the list to build the initial plots
    var firstDate = allDates[0];
    buildCharts(firstDate);
    buildMetadata(firstDate);
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
    // Filter the data for the object with the desired date
    var resultArray = metadata.filter(metaObj => metaObj.id == ddates);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#date-metadata`
    var PANEL = d3.select("#date-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

//--------------- Build Bar Chart---------
// Create the buildCharts function.
function buildCharts(ddates) {

// Use d3.json to load and retrieve the unemployment_data.json file 
d3.json("unemployment_data.json").then((data) => {

// Create a variable that holds each index
var metadata = data.metadata;
var unemployment = data.unemployment
// Create a variable that filters the metadata for the object with the desired date.
var chartArray = metadata.filter(chartObj => chartObj.id == ddates);

// Create a variable that holds the first sample in the array.
var chartResult = chartArray[0];

// 6. Create variables that hold the chartResults data.
var ddates = chartResult.metadata;

  
//---------------- Bar Chart ------------------
// Create the yticks for the bar chart.  
var yticks = unemployment

    //Create the trace for the bar chart. 
    var barData = [{
      x: metadata,
      y: yticks,
      type: "bar",
      orientation: "h"}
    ];

    // Create the layout for the bar chart. 
    var barLayout = {
     title: "Impact on Unemployment Rates",
     margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 30
      }
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });

}

