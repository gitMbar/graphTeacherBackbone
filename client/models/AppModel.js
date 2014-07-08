var AppModel = Backbone.Model.extend({
	initialize: function(){
		this.set("currentAlgorithm", new BasicGraph())

	}
})