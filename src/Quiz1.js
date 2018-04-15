var quizscore = 0;

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

var answered;
var counter;

Game.Quiz1.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30, 40, "Q1. What would the bottle allow \n the owner to do in the afterlife?", {fill: '#fff'});
    var bottleimg = this.add.sprite(480, 20, 'bottle');
    bottleimg.scale.setTo(0.7, 0.7);


    counter = this.add.text(460, 16, 'Score: ' + quizscore, {
      fontSize: '32px',
      fill: '#000',
      stroke: '#ffffff',
      strokeThickness: 4
    });

    counter.fixedToCamera = true;

    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Drink", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
      counter.text = 'Score: ' + quizscore;
    }, 1.05);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Play Music", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.05);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Supply water for washing", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.05 );


  },

  update: function(game) {
    if(answered == true){
      opt1.option.tint = (0x00ff00);//right
      opt2.option.tint = (0xff0000);
      opt3.option.tint = (0xff4d4d);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.state.start('Quiz2');
        game.input.enabled = true;
      }, this);
    }




  },

}
