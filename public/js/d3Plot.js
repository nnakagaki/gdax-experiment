function d3Plotter(data) {
  var m = [80, 80, 80, 80]; // margins
  var w = 1000; // width
  var h = 400; // height

  console.log([0, _.last(data).x - data[0].x]);
  console.log([_.minBy(data, function(o) { return o.y; }).y, _.maxBy(data, function(o) { return o.y; }).y]);

  var x = d3.scaleLinear().domain([0, _.last(data).x - data[0].x]).range([0, w]);
  var y = d3.scaleLinear().domain([_.minBy(data, function(o) { return o.y; }).y, _.maxBy(data, function(o) { return o.y; }).y]).range([h, 0]);

  var line = d3.line()
    .x(function(d) { 
      return x(d.x - data[0].x);
    })
    .y(function(d) { 
      return y(d.y);
    });

  var graph = d3.select("#graph").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

  var xAxis = d3.axisBottom(x);
  graph.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

  var yAxisLeft = d3.axisLeft(y);
  graph.append("svg:g")
    .attr("class", "y axis")
    .call(yAxisLeft);

  graph.append("svg:path")
    .attr("class", "line")
    .attr("d", line(data));
}

function updatePlot(data) {
  var m = [80, 80, 80, 80]; // margins
  var w = 1000; // width
  var h = 400; // height

  var x = d3.scaleLinear().domain([0, _.last(data).x - data[0].x]).range([0, w]);
  var y = d3.scaleLinear().domain([_.minBy(data, function(o) { return o.y; }).y, _.maxBy(data, function(o) { return o.y; }).y]).range([h, 0]);

  var line = d3.line()
    .x(function(d) { 
      return x(d.x - data[0].x);
    })
    .y(function(d) { 
      return y(d.y);
    });

  var graph = d3.select("#graph");

  var xAxis = d3.axisBottom(x);
  graph.select(".x.axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

  var yAxisLeft = d3.axisLeft(y);
  graph.select(".y.axis")
    .call(yAxisLeft);

  graph.select(".line")
    .attr("d", line(data));
}