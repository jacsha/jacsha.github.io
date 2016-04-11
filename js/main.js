$(function () {
    initBanner();
    new WOW().init();
    // chinaMap();
});

function initBanner() {
    $('.flexslider').flexslider({
        animation: "fade",
        directionNav: false
    });
}

function chinaMap() {
	var mapWidth = $("#network .container").width()*0.75;
	var width  = mapWidth;
	var height = width * 0.75;
	var scale = width / 530;
	console.log(width, height);

	var svg = d3.select("body #network #map").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("preserveAspectRatio","xMidYMid meet")
	    .attr("viewBox", "0 0 " + 560 + " " + 430)
	    .append("g")
	    .attr("transform", "translate("+0+","+0+") scale(1)");
	
	var projection = d3.geo.mercator()
						.center([72, 55])
						.scale(500)
    					.translate([0,0]);
	
	var path = d3.geo.path()
					.projection(projection);
	
	
	var color = d3.scale.category20();
	
	
	d3.json("assets/json/china_simplify.json", function(error, root) {
		
		if (error) 
			return console.error(error);
		
		svg.selectAll("path")
			.data( root.features )
			.enter()
			.append("path")
			.attr("stroke","#000")
			.attr("stroke-width",0.2)
			.attr("fill", function(d,i){
				return "#eee";
			})
			.attr("d", path )
			.on("mouseover",function(d,i){
                d3.select(this)
                    .attr("fill","yellow");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .attr("fill","#eee");
            });
		
	});

}