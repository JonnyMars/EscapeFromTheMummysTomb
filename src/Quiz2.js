
Game.Quiz2 = function(game) {};

var answered;

Game.Quiz2.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30 , 30, "Q2. These two sticks were rubbed\ntogether to create fire. Why did a\ndead person need to be able\nto make fire?", {fill: '#fff', fontSize:'20px'});
    var img = this.add.sprite(480, 20, 'firestick');
    img.scale.setTo(0.7, 0.7);



    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) Light", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) Warmth & Cooking", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) Protection against the evil spirits", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);


  },

  update: function(game) {
    if(answered == true){
      opt2.option.tint = (0x00ff00);//right
      opt1.option.tint = (0xff0000);
      opt3.option.tint = (0xff0000);
      game.time.events.add(Phaser.Timer.SECOND * 3, function() {
        game.state.start('Quiz3');
        game.input.enabled = true;
      }, this);
    }




  },

}
