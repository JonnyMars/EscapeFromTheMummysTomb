
Game.Introduction = function(game) {};

var explorertype;

Game.Introduction.prototype = {

  create: function(game) {

        this.add.sprite(0, 0, 'instroback');

        window.devicePixelRatio = 100;

    var title = game.add.text(315, 44, "YOUR ADVENTURE BEGINS...", {fill: '#fff', fontSize:'25px', align:'center'});
    title.anchor.setTo(0.5, 0.5);
    var info = game.add.text(310  , 85, "You are an explorer who has\ndiscovered an ancient tomb in\nBeni Hasan, Egypt. Inside you will\nfind many items that are thousands\nof years old. You must collect the\nitems and bring them safely back\nto the museum \n\n But watch out, there are some\nMummies on the loose!", {fill: '#fff', fontSize:'20px', align:'center'});
    info.anchor.setTo(0.5, 0);

    var button = this.add.button(320, 435, 'popupbutton', function() {
      game.state.start('Title'); //CHANGE
    }, this);
    var buttontext = this.add.text(320, 435, "NEXT", {
      fill: '#fff',
      align: 'center'
    });
    buttontext.anchor.setTo(0.5, 0.4);
    button.anchor.setTo(0.5, 0.5);

  },

  update: function(game) {

  },




  }
