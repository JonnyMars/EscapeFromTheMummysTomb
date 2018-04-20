
Game.Quiz4 = function(game) {};

var answered;

Game.Quiz4.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;
    //Load in question background template
    this.add.sprite(0, 0, 'quizback');
    //Add in question and position
    game.add.text(30 , 30, "Q4. How would this model boat help\nthe dead person in the afterlife?", {fill: '#fff', fontSize:'24px'});
    //Add in image of relevant item
    var img = this.add.sprite(480, 20, 'boat');
    img.scale.setTo(0.7, 0.7);

    //Set the three options using the Option variable above
    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Help catch fish to eat", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Bring their servants to the\nafterlife", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Provide them with transport", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
            //Assign the quizscore + 1 to the correct answer and set answered to true. Disable input regardless.
    }, 1.3);


  },

  update: function(game) {
    if(answered == true){
      //If answered is true, make the correct answer green, the two incorrect answers red.
      opt3.option.tint = (0x00ff00);//right
      opt1.option.tint = (0xff0000);
      opt2.option.tint = (0xff0000);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        //Wait three seconds and start the next state and re-enable input
        game.state.start('Quiz5');
        game.input.enabled = true;
      }, this);
    }




  },

}
