function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = `metadata${sample}`;
  

  // Use `d3.json` to fetch the metadata for a sample
 d3.json(url).then(function(data){
   var data = [data];
   console.log(data)
  })
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.select("#sample-metadata")
  .html("");
  
  // Use `.html("") to clear any existing metadata
  
// Use `Object.entries` to add each key and value pair to the panel
// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.
Object.entries(data).forEach(([key,value])=>{
  var selected = Object.entries.append("p");
  selected.text(`${key}:${value}`);
    });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

}

function buildCharts(sample) {

  url = `samples${sample}`;

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(function(response){
    console.log(response);
    extract = [response];
    topTen = extract.slice(0,10)

  
  var pie_data = [{
      values: topTen.sample_values,
      labels: topTen.otu_ids,
      hoverinfo: topTen.otu_labels,
      type: 'pie',
    }];
    
    var layout = {
      height: 400,
      width: 500
    };
    d3.select('#pie')
    Plotly.newPlot('pie', pie_data, layout);
    

    var bub_data = [{
      'x': extract.otu_ids,
      'y': extract.sample_values,
      'mode':'markers',
      'marker':{
        'size': extract.sample_values,
        'color': otu_ids,
        'text':extract.otu_labels
      }
    }];
    Plotly.newPlot('bubbly', bub_data);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).  
});

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

}
