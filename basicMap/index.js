var width = document.getElementById('svg').clientWidth;
var height = document.getElementById('svg').clientHeight;

console.log(width, height);

var marginLeft = 0;
var marginTop = 0;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');


var albersProjection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([(width/2), (height/2)]);

var path = d3.geoPath()
    .projection(albersProjection);

//import the data from the .csv file
d3.json('./cb_2016_us_state_20m.json', function(dataIn){

    console.log(dataIn);

    svg.selectAll('path')
        .data(dataIn.features) //datum interactive with each state
        .enter()
        .append('path')
        .attr('d',path)
        .attr('fill','gainsboro')
        .attr('stroke','white')
        .attr('stroke-width','1')
        .on('mouseover',function(d){console.log(d.properties.NAME)});

    svg.selectAll('circle')
        .data([{long:-71.0589, lat:42.3601}])
        .enter()
        .append('circle')
        .attr('cx', function (d){
            return albersProjection([d.long, d.lat])[0]
        })
        .attr('cy', function (d){
            return albersProjection([d.long, d.lat])[1]
        })
        .attr('r', 15)
        .attr('fill','red')
});

//west long. values are negative and east are positive.

