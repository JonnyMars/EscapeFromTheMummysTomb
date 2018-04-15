
Game.Quiz7 = function(game) {};

var answered;
var counter;

Game.Quiz7.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    answered = false;

    this.add.sprite(0, 0, 'quizback');
    game.add.text(30 , 10, "Q7. This object is made up of ball and\ncylinder shaped beads - the pendant on\nthis necklace has been made up to look\nlike someting natural, what is it\nsupposed to be?", {fill: '#fff', fontSize:'20px'});
    var img = this.add.sprite(480, 20, 'necklace');
    img.scale.setTo(0.7, 0.7);


    counter = this.add.text(460, 16, 'Score: ' + quizscore, {
      fontSize: '32px',
      fill: '#000',
      stroke: '#ffffff',
      strokeThickness: 4
    });

    counter.fixedToCamera = true;

    opt1 = new Option(0, game, game.camera.width / 2, game.camera.height / 2, "A) an Oyster shell", function() {
      game.input.enabled = false;
      answered = true;
      quizscore += 1;
      counter.text = 'Score: ' + quizscore;
    }, 1.3);
    opt2 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2)+ 100 ,"B) a Stone", function() {
      game.input.enabled = false;
      answered = true;
    }, 1.3);
    opt3 = new Option(0, game, game.camera.width / 2, (game.camera.height / 2) + 200, "C) a Leaf", function() {
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
        game.state.start('Quiz7');
        game.input.enabled = true;
      }, this);
    }




  },

}