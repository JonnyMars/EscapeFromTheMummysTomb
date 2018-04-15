Game.PreLoader = function(game){

  this.loadingbar = null;
}

Game.PreLoader.prototype = {

  preload:function(){


    this.loadingbar = this.add.sprite(this.world.centerX, this.world.centerY, 'loadingbar');

    this.loadingbar.anchor.setTo(0.5, 0.5);

    this.time.advancedTiming = true;

    this.load.setPreloadSprite(this.loadingbar);

    //Load all assets

    //Global Assets

    this.load.spritesheet('mummy', 'assets/mummy-spritesheet-min.png', 27.333, 62);
    this.load.spritesheet('item', 'assets/itemsheet.png', 32, 32);
    this.load.image('popup', 'assets/popupbackground.png');
    this.load.image('popupbutton', 'assets/button.png');
    this.load.audio('soundtrack', 'assets/sound/soundtrack.mp3');
    this.load.spritesheet('player', 'assets/spritesheet-64-high.png', 35, 64);
    this.load.image('tileset', 'lvl/tilemap.png');


    // this.game.add.text(0, 0, 'hack', {font:"55px PAPYRUS", fill:"#FFFFFF"}); do this to enable font!

    //Title Assets
    this.load.image('titleback', 'assets/title-comp.png');

    //Level 1 assets

    this.load.tilemap('map', 'lvl/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('bottle', 'assets/items/bottle.png');
    this.load.image('firestick', 'assets/items/firestick.png');
    this.load.image('goldmask', 'assets/items/goldmask.png');


    //Level 2 assets

    this.load.tilemap('map2', 'lvl/lvl2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('boat', 'assets/items/boat.png');
    this.load.image('harp', 'assets/items/harp.png');
    this.load.image('modelgirl', 'assets/items/modelgirl.png');


    //Level 3 assets
    this.load.tilemap('map3', 'lvl/lvl3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('necklace', 'assets/items/necklace.png');
    this.load.image('razor', 'assets/items/razor.png');
    this.load.image('sandals', 'assets/items/sandals.png');

    //Quiz Assets
    this.load.image('quizback', 'assets/quiz.png');

    //End Screen Assets
    this.load.image('endback', 'assets/end-comp.png');


  },

  create:function(){
    this.state.start('End');
  }
}
