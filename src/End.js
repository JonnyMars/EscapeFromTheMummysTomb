
Game.End = function(game) {};

var explorertype;

Game.End.prototype = {

  create: function(game) {

        this.add.sprite(0, 0, 'endback');

    if(quizscore >= 8){
      game.add.text(45, 255, "Expert Explorer", {fill: '#ffff00', fontSize:'30px', align:'center'});
    } else if(quizscore >= 4){
      game.add.text(100, 255, "Explorer", {fill: '#ffff00', fontSize:'30px', align:'center'});
    } else {
      game.add.text(15, 255, "Apprentice Explorer", {fill: '#ffff00', fontSize:'30px', align:'center'});
    }


    game.add.text(80, 30, "Well Done!", {fill: '#fff', fontSize:'30px', align:'center'});
    game.add.text(10  , 100, "You have successfully escaped\nfrom the Mummy's tomb!\n\nYou scored " + quizscore + " / 9 on the quiz!\nThis makes you an:", {fill: '#fff', fontSize:'20px', align:'center'});

    var button = this.add.button(155, 395 , 'popupbutton', function() {
      quizscore = 0;
      game.state.start('Title'); //CHANGE
    }, this);
    var buttontext = this.add.text(155, 395, "PLAY AGAIN", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);
    button.scale.setTo(0.9, 0.9);


  },

  update: function(game) {

  },




  }
