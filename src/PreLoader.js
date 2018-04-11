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

    //Level 1 assets

    this.load.tilemap('map', 'lvl/lvl12.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'lvl/tilemap.png');
    this.load.spritesheet('player', 'assets/spritesheet-64-high.png', 35, 64);



  },

  create:function(){
    this.state.start('Level1');
  }
}
