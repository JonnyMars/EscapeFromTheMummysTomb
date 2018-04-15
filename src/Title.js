
Game.Title = function(game) {};

Game.Title.prototype = {

  create: function(game) {


    this.add.sprite(0, 0, 'titleback');

    var button = this.add.button((game.camera.width / 2) - 10, (game.camera.height / 2) + 190, 'popupbutton', function() {
      game.state.start('Introduction'); //CHANGE
    }, this);
    var buttontext = this.add.text((game.camera.width / 2) - 10, (game.camera.height / 2) + 190, "PLAY GAME", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);

    //Fullscreen Handler - Need to check that it stays across states and then move it onto title screen
    if (!Phaser.Device.desktop) {
      game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      game.scale.forceOrientation(false, false);
      game.scale.updateLayout(true);
      game.scale.refresh();
      game.input.onDown.add(function() {
        if (game.scale.isFullScreen) {
          game.scale.stopFullScreen();
        } else {
          game.scale.startFullScreen(false);
        }
      }, this);
    } else {
      console.log('sup!')
    }

  },

  update: function(game) {

  },




  }
