var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 800;
var marginTop = -1600;


var solar;
var wind;
var geothermal;

var clicked = true;

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//set up the projection for the map
var albersProjection = d3.geoAlbersUsa()  //tell it which projection to use
    .scale(10000)                           //tell it how big the map should be
    .translate([(width), (height/50000)]);  //set the center of the map to show up in the center of the screen


//set up the path generator function to draw the map outlines
path = d3.geoPath()
    .projection(albersProjection);        //tell it to use the projection that we just made to convert lat/long to pixels




//import the data from the .csv file
d3.json('./cb_2016_15_bg_500k.json', function(dataIn){

    svg.selectAll("path")               //make empty selection
        .data(dataIn.features)
        .enter()//bind to the features array in the map data
        .append("path")                 //add the paths to the DOM
        .attr("d", path)                //actually draw them
        .attr("class", "feature")
        .attr('fill','gainsboro')
        .attr('stroke','black')
        .attr('stroke-width',.25);



    d3.csv('./Hawaii_Geothermal.csv', function(dataIn){

        svg.selectAll('circle')
            .data(dataIn)
            .enter()
            .append('circle')
            .attr('cx', function (d){
                return albersProjection([d.long, d.lat])[0]
            })
            .attr('cy', function (d){
                return albersProjection([d.long, d.lat])[1]
            })
            .attr('r', 3)
            .attr('fill', function (d){
                return d.fill;
            })
            .attr('stroke','black')
            .attr('stroke-width',1)
            .attr('data-toggle', 'tooltip')
            .attr('title', function(d) {
                return d.site;
            });
        $('[data-toggle="tooltip"]').tooltip();
    });

});


