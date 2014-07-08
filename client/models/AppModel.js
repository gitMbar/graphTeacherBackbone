var AppModel = Backbone.Model.extend({
	initialize: function(){
		this.set("currentAlgorithm", new BasicGraph())
		this.set("optionCollection", new OptionCollection())
		this.set("algorithmOptionCollection", new AlgorithmOptionCollection())
	}
})