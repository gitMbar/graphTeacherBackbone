var BasicGraphView = Backbone.View.extend({
	model: BasicGraph,

	initialize: function(){
		graph = new BasicGraph()

		var width = 1200,
		    height = 600;

		var color = d3.scale.category20();

		var force = d3.layout.force()
		      .nodes(graph.nodes) ///graph is where the data comes from
		      .links(graph.links)
		      .charge(function(d){ return Math.max(((d.weight * -200)-500), -1500)})
		      .linkDistance(90)
		      .size([width, height]);

		var svg = d3.select(".svgContainer").append("svg")
			.attr("class", "col-md-12")
		    .attr("width", width)
		    .attr("height", height);

		graph.addVertex("bob");
		graph.addVertex("mike");
		graph.addEdge("bob", "mike");
		console.log(graph.nodes)
		console.log(graph.links)

		var update = function(){

		  force.linkDistance(200 - graph.nodes.length * 2)

		  
		  var node = svg.selectAll("g")
		      .data(force.nodes())
		      
		  node.exit().transition().duration(100).remove()

		  var nodeEnter = node.enter().append("g")
		        .call(force.drag);
		  nodeEnter.append("circle")
		        .attr("class", "node")
		        .attr("r", 17)
		        .style("stroke", "black")
		        .style("fill", "lightblue")
		        .call(force.drag);

		  //text and titles
		  nodeEnter.append("text")
		      .attr("text-anchor", "middle")
		      .attr("dy", ".3em")
		      .text(function(d) { return d.id; });

		  //start links
		  var link = svg.selectAll(".link")
		      .data(force.links(), function(d){ return d.source.index + "-" + d.target.index; });

		  var linkEnter = link.enter().append("line", ".node")
		        .attr("class", "link")
		        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

		  link.exit().transition().duration(100).remove()
		  
		  force.start();

		  force.on("tick", function() {
		    link.attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });
		    node
		        .attr("transform", function(d) { 
		            return "translate(" + d.x + "," + d.y + ")"; });
		      });


		}

		//only for testing.  No need to update blank graph
		update()

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
		          if (graph === undefined){
		            graph = new Graph();
		          }
		          graph.addVertex(val);
		          update();
		        $(this).val("")
		    }
		});

		$("#addEdgeInputA").on("keypress", addEdgeInput);
		$("#addEdgeInputB").on("keypress", addEdgeInput);

	},

	render: function(){
		return this;
	}

})