
Game.Quiz6 = function(game) {};

var answered;
var counter;

Game.Quiz6.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30 , 25, "Q6. This servant carries a basket of\nfood on her head and holds two geese\nin her right hand. How would this model\nhelp the dead person in the afterlife?", {fill: '#fff', fontSize:'20px'});
    var img = this.add.sprite(480, 20, 'modelgirl');
    img.scale.setTo(0.7, 0.7);


    counter = this.add.text(460, 16, 'Score: ' + quizscore, {
      fontSize: '32px',
      fill: '#000',
      stroke: '#ffffff',
      strokeThickness: 4
    });

    counter.fixedToCamera = true;

    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Guide them though the afterlife", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Provide an eternal food supply", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
      counter.text = 'Score: ' + quizscore;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Take care of their animals", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);


  },

  update: function(game) {
    if(answered == true){
      opt2.option.tint = (0x00ff00);//right
      opt3.option.tint = (0xff0000);
      opt1.option.tint = (0xff0000);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.state.start('Quiz7');
        game.input.enabled = true;
      }, this);
    }




  },

}
