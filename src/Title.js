//GAME TITLE SCREEN
Game.Title = function(game) {};

Game.Title.prototype = {

  create: function(game) {

    //Load state background template
    this.add.sprite(0, 0, 'titleback');

    //Assign Button to button variable and position
    var button = this.add.button((game.camera.width / 2) - 10, (game.camera.height / 2) + 190, 'popupbutton', function() {
      game.state.start('Introduction'); //CHANGE
    }, this);
    //Assign text to be placed with the button
    var buttontext = this.add.text((game.camera.width / 2) - 10, (game.camera.height / 2) + 190, "PLAY GAME", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);

    //Fullscreen Handler - This makes the game fullscreen if the device is a touch screen
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
