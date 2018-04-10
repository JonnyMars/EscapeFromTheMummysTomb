Mummy = function(index, game, x, y){

    this.mummy = game.add.sprite(x, y, 'mummy'); //mummy object (global)
    this.mummy.anchor.setTo(0.5, 0.5);
    this.mummy.name = index.toString(); //assign names to each new mummy created
    game.physics.enable(this.mummy, Phaser.Physics.ARCADE); //enable physic for mummy
    this.mummy.body.immovable = true; //cannot be moved by anything
    this.mummy.body.collideWorldBounds = true; //do not leave bounds of cavnvas


    this.mummyTween = game.add.tween(this.mummy).to({x: 425}, 1000,  'Linear', true, 0, 100, true); //{x:425} is it's x location destingation. No need to do Y because starting position places it on platform.
}

var enemy;


Game.Level1 = function(game){};

var map;
var backgroundlayer;
var platformslayer;

var player;
var controls = {};
var playerSpeed = 250;

Game.Level1.prototype = {

  create:function(game){
    this.stage.backgroundColor = '#3A5963'

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map', 1, 100);

    map.addTilesetImage('tileset');

    layer = map.createLayer('Background');
    platformslayer = map.createLayer('Platforms');

    layer.resizeWorld();

    map.setCollisionBetween(1, 100, true, 'Platforms');

    player = this.add.sprite(100,420,'player');
    player.anchor.setTo(0.5, 0.5);

    player.animations.add('right', [0, 1, 2], 4, true);
    player.animations.add('left', [4, 5, 6], 4, true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collideWorldBounds = true;

    controls = this.input.keyboard.createCursorKeys();

    mummy1 = new Mummy(0, game, 720, 320); //Mummy's starting position.




  },

  update: function(){
    this.physics.arcade.collide(player, platformslayer);
    this.physics.arcade.collide(mummy1.mummy, platformslayer);

    player.body.velocity.x = 0;

    if (controls.right.isDown) {
      player.animations.play('right');
      player.body.velocity.x += playerSpeed;
    }
    else if(controls.left.isDown){
      player.animations.play('left')
      player.body.velocity.x -= playerSpeed;
    }
    else {
      player.animations.stop();
      player.frame = 3;
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down)){
      player.body.velocity.y = -600;
    }

    if(checkOverlap(player, mummy1.mummy)){
      this.resetPlayer();
    }



  },

  resetPlayer: function(){
    player.reset(100, 420);
  }

}


function checkOverlap(spriteA, spriteB){
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
