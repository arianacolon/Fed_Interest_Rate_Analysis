
  //Pull ids from json sample data and place in dropdown <options>
function init() 
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("unemployment_data.json").then((data) => {
   
    // 1. Create a variable that holds theeach array. 
    var date = data.dates;

    var unemployment = data.ue_rates;

    var federal_ir = data.federal_ir;

    var cpi = data.cpi;

    var gdp = data.gdp;

    var ppi = data.ppi;

    var inflation_rate = data.inflation_rate;
  });


//Pull dates from json sample data and place in dropdown <options>
var sel = document.getElementById('select');
console.log(sel.options[sel.selectedIndex].value)








