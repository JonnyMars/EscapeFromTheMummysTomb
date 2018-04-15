
Game.Quiz3 = function(game) {};

var answered;
var counter;

Game.Quiz3.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30 , 30, "Q3. These two sticks were rubbed\ntogether to create fire. Why did a\ndead person need to be able\nto make fire?", {fill: '#fff', fontSize:'20px'});
    var bottleimg = this.add.sprite(480, 20, 'firestick');
    bottleimg.scale.setTo(0.7, 0.7);


    counter = this.add.text(460, 16, 'Score: ' + quizscore, {
      fontSize: '32px',
      fill: '#000',
      stroke: '#ffffff',
      strokeThickness: 4
    });

    counter.fixedToCamera = true;

    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Light", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Warmth & Cooking", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
      counter.text = 'Score: ' + quizscore;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Protection against the evil spirits", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);


  },

  update: function(game) {
    if(answered == true){
      opt2.option.tint = (0x00ff00);
      opt1.option.tint = (0xff0000);//right
      opt3.option.tint = (0xff4d4d);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.state.start('Quiz2');
        game.input.enabled = true;
      }, this);
    }




  },

}
