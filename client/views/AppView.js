var AppView = Backbone.View.extend({

  template: _.template(
    '<div class="optionsContainer container-fluid"><div class="row"></div></div>' +
    '<div class="svgContainer"></div>' +
    '<div class="algorithmOptionsContainer container-fluid"><div class="row">' +
    '<button id="main" class="basicGraph-button col-md-3">Basic Graph</button>' + 
    '<button class="directedGraph-button col-md-3">Directed Graph</button></div></div>' +
    '<div class="post-container"></div>'),

  events: {
    "click .basicGraph-button": function(){
      $('.svgContainer').children().remove()
      this.model.set('currentAlgorithm', new BasicGraph());
      this.model.set("currentVisualization", new BasicGraphView());
      //this.render();
    },

    "click .directedGraph-button": function(){
      $('.svgContainer').children().remove()
      this.model.set('currentAlgorithm', new DirectedGraph());
      this.model.set("currentVisualization", new DirectedGraphView());
      //this.render();
    },

  },

  initialize: function(){
    this.model.set('currentAlgorithm', new BasicGraph());
    this.model.set("currentVisualization", new BasicGraphView());
    this.optionsCollectionView = new OptionsCollectionView({
      collection: this.model.get("optionCollection")
    });
    this.algorithmOptionsCollectionView = new AlgorithmOptionsCollectionView({
      collection: this.model.get("algorithmOptionCollection")
    });

    this.render()
  },

  render: function(){
    this.$el.children().detach()
    this.$el.html(this.template())
    //this.$('.svgContainer').html(this.model.get('currentAlgorithm')).el
    //this.$('.dealer-hand-container').html new HandView(collection: this.model.get 'dealerHand').el*/
  }
});