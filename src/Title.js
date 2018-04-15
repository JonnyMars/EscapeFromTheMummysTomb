
Game.Title = function(game) {};

Game.Title.prototype = {

  create: function(game) {


    this.add.sprite(0, 0, 'title');

    var button = this.add.button((game.camera.width / 2) - 10, (game.camera.height / 2) + 190, 'popupbutton', function() {
      game.state.start('Level1'); //CHANGE
    }, this);
    var buttontext = this.add.text((game.camera.width / 2) - 10, (game.camera.height / 2) + 190, "PLAY GAME", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);

  },

  update: function(game) {

  },




  }
