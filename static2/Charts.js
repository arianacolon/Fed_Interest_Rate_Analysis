
  //Pull ids from json sample data and place in dropdown <options>
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("unemployment_data.json").then((data) => {
    var ueNames = data.names;
    ueNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // 1. Create a variable that holds the each array. 
    var firstSample = ueNames[0];
    //buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
init();
// Demographics Panel 
function buildMetadata(sample) {
  d3.json("unemployment_data.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
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
//Pull dates from json sample data and place in dropdown <options>
var sel = document.getElementById('select');
console.log(sel.options[sel.selectedIndex].value)








