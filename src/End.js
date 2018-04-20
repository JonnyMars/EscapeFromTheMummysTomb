
Game.End = function(game) {};

var explorertype;

Game.End.prototype = {

  create: function(game) {

    //Load background template
    this.add.sprite(0, 0, 'endback');

    //This checks the score the user got, and assigns them a title depending on their score
    if(quizscore >= 8){
      game.add.text(45, 255, "Expert Explorer", {fill: '#ffff00', fontSize:'30px', align:'center'});
    } else if(quizscore >= 4){
      game.add.text(100, 255, "Explorer", {fill: '#ffff00', fontSize:'30px', align:'center'});
    } else {
      game.add.text(15, 255, "Apprentice Explorer", {fill: '#ffff00', fontSize:'30px', align:'center'});
    }

    //text to congratulate the user
    game.add.text(80, 30, "Well Done!", {fill: '#fff', fontSize:'30px', align:'center'});
    game.add.text(10  , 100, "You have successfully escaped\nfrom the Mummy's tomb!\n\nYou scored " + quizscore + " / 9 on the quiz!\nThis makes you an:", {fill: '#fff', fontSize:'20px', align:'center'});

    //This button restarts the game by taking the user back to the Title state, and resets the quizscore variable to 0.
    var button = this.add.button(155, 395 , 'popupbutton', function() {
      quizscore = 0;
      game.state.start('Title');
    }, this);
    //This is the text for the play again button
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
