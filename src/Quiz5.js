
Game.Quiz5 = function(game) {};

var answered;
var counter;

Game.Quiz5.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30 , 30, "Q5. This would have allowed the dead person\nto have entertainment at parties in the\nafterlife. What kind of instrument is this? ", {fill: '#fff', fontSize:'20px'});
    var img = this.add.sprite(480, 20, 'harp');
    img.scale.setTo(0.7, 0.7);


    counter = this.add.text(460, 16, 'Score: ' + quizscore, {
      fontSize: '32px',
      fill: '#000',
      stroke: '#ffffff',
      strokeThickness: 4
    });

    counter.fixedToCamera = true;

    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Harp", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
      counter.text = 'Score: ' + quizscore;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Violin", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Guitar", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);


  },

  update: function(game) {
    if(answered == true){
      opt1.option.tint = (0x00ff00);//right
      opt3.option.tint = (0xff0000);
      opt2.option.tint = (0xff0000);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.state.start('Quiz6');
        game.input.enabled = true;
      }, this);
    }




  },

}