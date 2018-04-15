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

Game.Quiz1.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30, 40, "Q1. What would this bottle allow \n the owner to do in the afterlife?", {fill: '#fff', fontSize: '20px'});
    var img = this.add.sprite(480, 20, 'bottle');
    img.scale.setTo(0.7, 0.7);



    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Drink", function() {
      game.input.enabled = false;
      answered = true;
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
      opt1.option.tint = (0x00ff00);//right
      opt2.option.tint = (0xff0000);
      opt3.option.tint = (0xff0000);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.state.start('Quiz2');
        game.input.enabled = true;
      }, this);
    }




  },

}
