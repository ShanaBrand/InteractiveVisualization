var selection = d3.select("select")
      		.on("change", function(){
            console.log("You selected someting",d3.select(this));
            var sample_sel = d3.select("onchange");
            buildMetadata(sample_sel);

          });
          

function buildMetadata(sample) {

  url = '/metadata/<samples>';
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(response){
    console.log(response)
  
    // @TODO: Complete the following function that builds the metadata panel

   // Use d3 to select the panel with id of `#sample-metadata`
  d3.select("sample-metadata")
  .html(" ")
    // Use `.html("") to clear any existing metadata
    

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.



  

  
    
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);

  })

  


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  url = "samples/<samples>"

  d3.json(url).then(function(response){

    console.log(response);

    var sample_data = [response];

// @TODO: Build a Bubble Chart using the sample data
    bub_trace = 

    pie_trace = 



    var layout = {
      title: "Pet Pals",
      xaxis: {
        title: "Pet Type"
      },
      yaxis: {
        title: "Number of Pals"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}






  })
    
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

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
