//Create global quizscore variable
var quizscore = 0;
//New option function makes it easier to add the multiple choice answers to the question
function Option(index, game, x, y, text, func, scale) {
  this.option = game.add.button(x, y, 'popupbutton', func, this);
  this.option.scale.setTo(scale, scale);
  this.option.anchor.setTo(0.5, 0.5);
  this.option.name = index.toString();
  this.optiontext = game.add.text(x, y, text, {
    fontSize: '22px',
    fill: '#fff',
    align: 'center'
  });
  this.optiontext.anchor.setTo(0.5, 0.45);

}
Game.Quiz1 = function(game) {};
//Initialise variable
var answered;

Game.Quiz1.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    //Set to false
    answered = false;

    //Load in question background template
    this.add.sprite(0, 0, 'quizback');
    //Add in question and position
    game.add.text(30, 40, "Q1. What would this bottle allow \n the owner to do in the afterlife?", {fill: '#fff', fontSize: '20px'});
    //Add in image of relevant item
    var img = this.add.sprite(480, 20, 'bottle');
    img.scale.setTo(0.7, 0.7);


    //Set the three options using the Option variable above
    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Drink", function() {
      game.input.enabled = false;
      answered = true;
      //Assign the quizscore + 1 to the correct answer and set answered to true. Disable input regardless.
      quizscore += 1;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Play Music", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Store water for washing", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);


  },

  update: function(game) {
    if(answered == true){
      //If answered is true, make the correct answer green, the two incorrect answers red.
      opt1.option.tint = (0x00ff00);//right
      opt2.option.tint = (0xff0000);
      opt3.option.tint = (0xff0000);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        //Wait three seconds and start the next state and re-enable input
        game.state.start('Quiz2');
        game.input.enabled = true;
      }, this);
    }




  },

}
