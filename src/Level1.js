function Mummy(index, game, x, y, frame, tweenspeed, tweenx){

    this.mummy = game.add.sprite(x, y, 'mummy', frame); //mummy object (global)
    this.mummy.animations.add('mummy', [0, 1, 2, 1], 3, true);
    this.mummy.anchor.setTo(0.5, 0.5);
    this.mummy.name = index.toString(); //assign names to each new mummy created
    game.physics.enable(this.mummy, Phaser.Physics.ARCADE); //enable physics for mummy
    this.mummy.body.immovable = true; //cannot be moved by anything
    this.mummy.body.collideWorldBounds = true; //do not leave bounds of cavnvas

    this.mummyTween = game.add.tween(this.mummy).to({x: tweenx}, tweenspeed,  'Linear', true, 0, 100, true); //{x:425} is it's x location destingation. No need to do Y because starting position places it on platform.
}

function Item(index, game, x, y, text){
  this.item = game.add.sprite(x, y, 'item', 0);
  this.item.anchor.setTo(0.5, 0.5);
  this.item.name = index.toString(); //assign names to each new item created
  game.physics.enable(this.item, Phaser.Physics.ARCADE);
  this.item.body.immovable = true; //cannot be moved by anything
  this.item.body.collideWorldBounds = true;
  this.item.animations.add('open', [1], 1, false);

  this.item.popup = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'popup');
  this.item.popup.anchor.setTo(0.5, 0.5);
  this.item.popup.fixedToCamera = true;
  this.item.popup.visible = false;
  this.item.info = game.add.text(game.camera.width / 2, game.camera.height / 2, text, {fontSize: '32px', fill: '#000'});
  this.item.info.visible = false;
  this.item.info.anchor.setTo(0.5, 0.5);
  this.item.info.fixedToCamera = true;
  this.item.button = game.add.button(game.camera.width / 2, (game.camera.height / 2) + 200, 'popupbutton', function() {this.item.popup.visible = false; this.item.info.visible = false; this.item.button.visible = false;}, this)
  this.item.button.anchor.setTo(0.5, 0.5);
  this.item.button.fixedToCamera = true;
  this.item.button.visible = false;
}

Game.Level1 = function(game){};

var map;
var backgroundlayer;
var platformslayer;
var layer;
var player;
var item;
var controls = {};
var playerSpeed = 250;
var itemsleft;
var counter;
var lvl2button;

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

    counter = this.add.text(16, 16, 'Items Left: 3', {fontSize: '32px', fill: '#000'});
    counter.fixedToCamera = true;
    itemsLeft = 3;

    player = this.add.sprite(100, 620,'player');
    player.anchor.setTo(0.5, 0.5);

    player.animations.add('right', [0, 1, 2], 4, true);
    player.animations.add('left', [4, 5, 6], 4, true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collideWorldBounds = true;


    lvl2button = game.add.button(game.camera.width / 2, (game.camera.height / 2) + 200, 'popupbutton', function() {game.state.start('Level1');}, this)
    lvl2button.visible = false;
    lvl2button.anchor.setTo(0.5, 0.5);
    lvl2button.fixedToCamera = true;


    controls = this.input.keyboard.createCursorKeys();

    mummy1 = new Mummy(0, game, 550, 380, 3, 1000, 340); //Mummy's starting position.

    item1 = new Item(0, game, 500, 570, "This is item 1!");
    item2 = new Item(0, game, 1050, 200);
    item3 = new Item(0, game, 302, 100, "What UP FAM");


  },

  update: function(game){
    this.physics.arcade.collide(player, platformslayer);
    this.physics.arcade.collide(mummy1.mummy, platformslayer);
    this.physics.arcade.collide(item1.item, platformslayer);
    this.physics.arcade.collide(item2.item, platformslayer);
    this.physics.arcade.collide(item3.item, platformslayer);

    player.body.velocity.x = 0;

    mummy1.mummy.animations.play('mummy');

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

    if(checkOverlap(player, item1.item)){
      if (!item1.item.hasOverlapped) {
            player.body.velocity.x = 0;
            player.hasOverlapped = item1.item.hasOverlapped = true;
            item1.item.animations.play('open');
            itemsLeft -=1;
            counter.text = 'Items Left: ' + itemsLeft;
            item1.item.body.enable = false;
            item1.item.popup.visible = true;
            item1.item.info.visible = true;
            item1.item.button.visible = true;
            game.world.bringToTop(item1.item.popup);
            game.world.bringToTop(item1.item.info);
    }
  }
    if(checkOverlap(player, item2.item)){
      if (!item2.item.hasOverlapped) {
          player.body.velocity.x = 0;
            item2.item.hasOverlapped = true;
            item2.item.animations.play('open');
            itemsLeft -=1;
            counter.text = 'Items Left: ' + itemsLeft;
            item2.item.body.enable = false;
            item2.item.popup.visible = true;
            item2.item.button.visible = true;
            game.world.bringToTop(item2.item.popup);
            game.world.bringToTop(item2.item.info);
    }
  }
    if(checkOverlap(player, item3.item)){
      if (!item3.item.hasOverlapped) {
            player.body.velocity.x = 0;
            item3.item.hasOverlapped = true;
            item3.item.animations.play('open');
            itemsLeft -=1;
            counter.text = 'Items Left: ' + itemsLeft;
            item3.item.body.enable = false;
            item3.item.popup.visible = true;
            item3.item.button.visible = true;
            game.world.bringToTop(item2.item.popup);
            game.world.bringToTop(item2.item.info);
    }
  }
    if(itemsLeft == 0){
      lvl2button.visible = true;
  }
},

  resetPlayer: function(){
    this.state.start('Level1');
  },


}

function actionOnClick(){
  this.game.state.start('Level1');
}

function checkOverlap(spriteA, spriteB){
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
