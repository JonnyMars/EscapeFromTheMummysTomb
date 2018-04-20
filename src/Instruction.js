//GAME INSTRUCTIONS
Game.Instruction = function(game) {};

Game.Instruction.prototype = {

  create: function(game) {
    //Load background image
    this.add.sprite(0, 0, 'instroback');

    //Add in title and position
    var title = game.add.text(315, 44, "INSTRUCTIONS", {
      fill: '#fff',
      fontSize: '25px',
      align: 'center'
    });
    title.anchor.setTo(0.5, 0.5);
    //Add in SOME content and position
    var info = game.add.text(180, 85, "Controls:", {
      fill: '#fff',
      fontSize: '23px',
      align: 'center'
    });
    info.anchor.setTo(0.5, 0);

    //This if statement ensures that mobile users see mobile controls, and desktop users see desktop controls
    if (!Phaser.Device.desktop) {
      var left = this.add.sprite(185, 160, 'arrowwhite');
      left.anchor.setTo(0.5, 0.5);
      left.angle = 270;
      this.add.text(140, 200, "Move Left", {
        fill: '#ffff00',
        fontSize: '20px',
        align: 'center'
      });

      var right = this.add.sprite(320, 160, 'arrowwhite');
      right.anchor.setTo(0.5, 0.5);
      right.angle = 90;
      this.add.text(265, 200, "Move Right", {
        fill: '#ffff00',
        fontSize: '20px',
        align: 'center'
      });

      var jump = this.add.sprite(455, 160, 'arrowwhite');
      jump.anchor.setTo(0.5, 0.5);
      this.add.text(428, 200, "Jump", {
        fill: '#ffff00',
        fontSize: '20px',
        align: 'center'
      });
    } else {
      var arrowkeys = this.add.sprite(310, 165, 'arrowkeys');
      arrowkeys.anchor.setTo(0.5, 0.5);
      arrowkeys.scale.setTo(0.9, 0.9);
      this.add.text(130, 180, "Move Left", {
        fill: '#ffff00',
        fontSize: '20px',
        align: 'center'
      });
      this.add.text(400, 180, "Move Right", {
        fill: '#ffff00',
        fontSize: '20px',
        align: 'center'
      });
      this.add.text(285, 80, "Jump", {
        fill: '#ffff00',
        fontSize: '20px',
        align: 'center'
      });
    }

    //This creates lines to make content look seperated
    var seperator = this.add.sprite(112, 230, 'arrowwhite');
    seperator.tint = (0x000000);
    seperator.scale.setTo(5.22, 0.05)
    var seperator2 = this.add.sprite(308, 230, 'arrowwhite');
    seperator2.tint = (0x000000);
    seperator2.scale.setTo(0.05, 2.07)

    //This content section that is shown on both device types, it tells the user to collect chests and avoid mummies
    this.add.text(130, 245, "Collect:", {
      fill: '#fff',
      fontSize: '23px'
    })
    var item = this.add.sprite(140, 290, 'item', 0);
    this.add.text(220, 315, "x 3", {
      fill: '#fff',
      fontSize: '25px'
    })
    item.scale.setTo(2, 2)
    this.add.text(335, 245, "Avoid:", {
      fill: '#fff',
      fontSize: '23px'
    })
    this.add.sprite(350, 300, 'mummy', 2);
    this.add.sprite(400, 300, 'mummy', 1);
    this.add.sprite(450, 300, 'mummy', 0);

    //Add in the button to move onto the next level
    var button = this.add.button(320, 435, 'popupbutton', function() {
      game.state.start('Level1');
    }, this);
    var buttontext = this.add.text(320, 435, "PLAY", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);

  },

  update: function(game) {

  },




}
