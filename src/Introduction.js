
Game.Introduction = function(game) {};

var explorertype;

Game.Introduction.prototype = {

  create: function(game) {

        this.add.sprite(0, 0, 'instroback');

        window.devicePixelRatio = 100;

    var title = game.add.text(315, 44, "YOUR ADVENTURE BEGINS...", {fill: '#fff', fontSize:'25px', align:'center'});
    title.anchor.setTo(0.5, 0.5);
    var info = game.add.text(310  , 80, "You have successfully escaped\nfrom the Mummy's tomb!\n\nYou scored " + quizscore + " / 9 on the quiz!\nThis makes you an:", {fill: '#fff', fontSize:'20px', align:'center'});
    info.anchor.setTo(0.5, 0);

    /*
    var button = this.add.button(155, 395 , 'popupbutton', function() {
      game.state.start('Title'); //CHANGE
    }, this);
    var buttontext = this.add.text(155, 395, "PLAY AGAIN", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);
    button.scale.setTo(0.9, 0.9);
    */

  },

  update: function(game) {

  },




  }
