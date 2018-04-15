
Game.Quiz8 = function(game) {};

var answered;

Game.Quiz8.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30 , 30, "Q8. This object was a very useful tool in\nancient Egyptian times - What was this razor\nused for?", {fill: '#fff', fontSize:'20px'});
    var img = this.add.sprite(480, 20, 'razor');
    img.scale.setTo(0.7, 0.7);



    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) for shaving hair", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) for carving wood", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) for cutting meat", function() {
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
        game.state.start('Quiz9');
        game.input.enabled = true;
      }, this);
    }




  },

}
