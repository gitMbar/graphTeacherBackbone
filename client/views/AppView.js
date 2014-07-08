var AppView = Backbone.View.extend({

  template: _.template(
    '<div class="optionsContainer"></div>' +
    '<div class="svgContainer"></div>' +
    '<div class="algoorithmOptionsContainer"></div>' +
    '<button class="basicGraph-button">Basic Graph</button>' + 
    '<button class="directedGraph-button">Directed Graph</button>' +
    '<div class="post-container"></div>'),

  events: {
    "click .normalGraph": function(){
      this.model.set('currentAlgorithm', new NormalGraph());
      //rendering n stuff
    },

    "click .directedGraph": function(){
      this.model.set('currentAlgorithm', new DirectedGraph());
    },


/*    "click .stand-button": function(){
      this.model.get('playerHand').stand()
      this.$('.hit-button, .stand-button').addClass('disabled')
    }

    "click .new-game-button": function(){
      this.model.newGame()
      $('.hit-button, .stand-button').removeClass('disabled')
      this.render()
    }*/
  },

  initialize: function(){
    this.render()

/*    this.model.on('gameOver', (win) ->
        this.$('.game-status-container').text( if win then "YOU WIN" else "YOU LOSE" )
        this.$('.new-game-button').removeClass('disabled')
        this.$('.hit-button, .stand-button').addClass('disabled')
      , this.)*/
  },

  render: function(){
    this.$el.children().detach()
    this.$el.html(this.template())
  /*  this.$('.player-hand-container').html new HandView(collection: this.model.get 'playerHand').el
    this.$('.dealer-hand-container').html new HandView(collection: this.model.get 'dealerHand').el*/
  }
});