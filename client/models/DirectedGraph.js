var DirectedGraph = function(){
	this.nodes = [];
	this.links = [];
};

DirectedGraph.prototype.addVertex = function(vert){
	if (!this.contains(vert)){
		this.nodes.push({"id": vert, "group": 1})
	}
};

DirectedGraph.prototype.findIndex = function(vert){
	var index = -1;
	for (var i = 0; i < this.nodes.length; i++){
		if (this.nodes[i].id === vert) return i;
	}
	return index;
}

DirectedGraph.prototype.addEdge = function(from, to){
	if (!this.contains(from) || !this.contains(to)){
		alert("Both vertices must exist!");
	} else {
		fromIndex = this.findIndex(from);
		toIndex = this.findIndex(to);
		console.log(fromIndex + toIndex);
		this.links.push({"source": fromIndex, "target": toIndex, "value": 10})
	}
};

DirectedGraph.prototype.contains = function(vert){
  var found = false;
  for (var i = 0; i < this.nodes.length; i++){
  	if (this.nodes[i].id === vert){
  		found = true
  	}
  }
  return found;
};