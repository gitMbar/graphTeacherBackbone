var DirectedGraphView = Backbone.View.extend({
	model: DirectedGraph,

	initialize: function(){
		var graph = new DirectedGraph()

		var width = 1200,
		    height = 700;

		var color = d3.scale.category20();

		var force = d3.layout.force()
		      .nodes(graph.nodes) ///graph is where the data comes from
		      .links(graph.links)
		      .charge(function(d){ return Math.max(((d.weight * -200)-500), -1500)})
		      .linkDistance(90)
		      .size([width, height])
		      //.start();

		var svg = d3.select(".svgContainer").append("svg")
			.attr("class", "col-md-12")
		    .attr("width", width)
		    .attr("height", height);

		graph.addVertex("bob");
		graph.addVertex("mike");
		graph.addEdge("bob", "mike");

		var marker = svg.append("svg:defs").selectAll("marker")
		    .data(["end"]);      // Different link/path types can be defined here
		marker
		  .enter().append("marker")    // This section adds in the arrows
		    .attr("id", String)
		    .attr("viewBox", "0 -9 10 10")
		    .attr("refX", 15)
		    .attr("refY", -1.5)
		    .attr("markerWidth", 9)
		    .attr("markerHeight", 8)
		    .attr("orient", "auto")
		  .append("path")
		    .attr("d", "M0,-5L10,0L0,5");
		//update with each vertex and edge
		var update = function(){

		  force.linkDistance(200 - graph.nodes.length * 2)

		  
		  var node = svg.selectAll("g")
		      .data(force.nodes())
		      
		  node.exit().transition().duration(100).remove()

		  var nodeEnter = node.enter().append("g")
		        .call(force.drag);
		  nodeEnter.append("circle")
		        .attr("class", "node")
		        .attr("r", 19)
		        .style("stroke", "black")
		        .style("fill", "lightblue")
		        .call(force.drag);

		  //text and titles
		  nodeEnter.append("text")
		      .attr("text-anchor", "middle")
		      .attr("dy", ".3em")
		      .text(function(d) { return d.id; });

		// add the paths and the arrows
		var path = svg.selectAll(".path")
		    .data(force.links());
		path
		  .enter().append("path")
		    .attr("class", function(d) { return "link " + d.type; })
		    .attr("class", "path")
		    .attr("marker-end", "url(#end)");

		path.exit().transition().duration(100).remove()
		marker.exit().transition().duration(100).remove()
		  
		  force.start();

		  force.on("tick", function() {
		    path.attr("d", function(d) {
		        var dx = d.target.x - d.source.x,
		            dy = d.target.y - d.source.y,
		            dr = Math.sqrt(dx * dx + dy * dy);
		        return "M" + 
		            d.source.x + "," + 
		            d.source.y + "A" + 
		            dr + "," + dr + " 0 0,1 " + 
		            d.target.x + "," + 
		            d.target.y;
		    });
		    node
		        .attr("transform", function(d) { 
		            return "translate(" + d.x + "," + d.y + ")"; });
		      });


		}

		//only for testing.  No need to update blank graph
		update();

		var addEdgeInput = function(){
		 if(event.which == 13) {
		        event.preventDefault();
		        console.log('adding edge')
		        var a = $("#addEdgeInputA").val();
		        var b = $("#addEdgeInputB").val();
		          if (graph === undefined || !graph.contains(a) || !graph.contains(b)){
		            alert("NYOOOPE")
		          } else {
		              graph.addEdge(a, b);
		              update();
		            }
		        $(this).val("")
		    }
		}

		//Add a vertex via addVertexInput field
		$("#addVertexInput").on("keypress", function(event) {
		    if(event.which == 13) {
		        event.preventDefault();
		        console.log('hisf')
		        val = $(this).val();
/*		          if (graph === undefined){
		            graph = new Graph();
		          }*/
		          graph.addVertex(val);
		          update();
		        $(this).val("")
		    }
		});

		$("#addEdgeInputA").on("keypress", addEdgeInput);
		$("#addEdgeInputB").on("keypress", addEdgeInput);

	},

/*	render: function(){
		return this;
	}*/

})