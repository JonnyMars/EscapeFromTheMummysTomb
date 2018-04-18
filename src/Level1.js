//Global
function Mummy(index, game, x, y, frame, tweenspeed, tweenx) {

  this.mummy = game.add.sprite(x, y, 'mummy', frame); //mummy object (global)
  this.mummy.animations.add('mummy', [0, 1, 2, 1], 3, true);
  this.mummy.anchor.setTo(0.5, 0.5);
  this.mummy.name = index.toString(); //assign names to each new mummy created
  game.physics.enable(this.mummy, Phaser.Physics.ARCADE); //enable physics for mummy
  this.mummy.body.immovable = true; //cannot be moved by anything
  this.mummy.body.collideWorldBounds = true; //do not leave bounds of cavnvas

  this.mummyTween = game.add.tween(this.mummy).to({
    x: tweenx
  }, tweenspeed, 'Linear', true, 0, 100, true); //{x:425} is it's x location destingation. No need to do Y because starting position places it on platform.
}
//Global
function Item(index, game, x, y, text, textHeightAdjust, image, imgheight) {
  this.item = game.add.sprite(x, y, 'item', 0);
  this.item.anchor.setTo(0.5, 0.5);
  this.item.name = index.toString(); //assign names to each new item created
  game.physics.enable(this.item, Phaser.Physics.ARCADE);
  this.item.body.immovable = true; //cannot be moved by anything
  this.item.body.collideWorldBounds = true;
  this.item.animations.add('open', [1], 1, false);

  this.item.popup = game.add.sprite(game.camera.width / 2, (game.camera.height / 2) - 30, 'popup');
  this.item.popup.anchor.setTo(0.5, 0.5);
  this.item.popup.fixedToCamera = true;
  this.item.popup.visible = false;
  this.item.info = game.add.text(game.camera.width / 2, (game.camera.height / 2) - 100, text, {
    fontSize: '22px',
    fill: '#fff',
    align: 'center'
  });
  this.item.info.visible = false;
  this.item.info.anchor.setTo(0.5, textHeightAdjust);
  this.item.info.fixedToCamera = true;
  this.item.button = game.add.button(game.camera.width / 2, (game.camera.height / 2) + 200, 'popupbutton', function() {
    this.item.popup.visible = false;
    this.item.info.visible = false;
    this.item.button.visible = false;
    this.item.image.visible = false;
    this.item.buttontext.visible = false;
    playermove = true;
  }, this);
  this.item.button.anchor.setTo(0.5, 0.5);
  this.item.button.fixedToCamera = true;
  this.item.button.visible = false;
  this.item.buttontext = game.add.text(game.camera.width / 2, (game.camera.height / 2) + 200, "Close", {
    fontSize: '22px',
    fill: '#fff'
  });
  this.item.buttontext.visible = false;
  this.item.buttontext.anchor.setTo(0.5, 0.5);
  this.item.buttontext.fixedToCamera = true;
  this.item.image = game.add.sprite(game.camera.width / 2, (game.camera.height / 2) - imgheight, image);
  this.item.image.anchor.setTo(0.5, 0.5);
  this.item.image.fixedToCamera = true;
  this.item.image.scale.setTo(0.6, 0.55)
  this.item.image.visible = false;
}

var playermove = true;

Game.Level1 = function(game) {};

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
var nxtlvlbutton;
var nxtlvlbuttontext;
var jump = false;
var right = false;
var left = false;

Game.Level1.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map', 1, 100);

    map.addTilesetImage('tileset');

    /* - music, this stays througout the states.
    var music = game.add.audio('soundtrack', true);
    music.loop = true;
    music.play();
    */

    layer = map.createLayer('Background');
    platformslayer = map.createLayer('Platforms');

    layer.resizeWorld();

    map.setCollisionBetween(1, 100, true, 'Platforms');

    var counterback = this.add.sprite(9, 10, 'popupbutton');
    counterback.fixedToCamera = true;
    counterback.scale.setTo(0.7, 1);
    counterback.tint = (0xFFFF00);

    counter = this.add.text(16, 16, 'Items Left: 3', {
      fontSize: '32px',
      fill: '#fff',
    });
    counter.fixedToCamera = true;
    itemsLeft = 3;

    player = this.add.sprite(100, 620, 'player');
    player.anchor.setTo(0.5, 0.5);

    player.animations.add('right', [0, 1, 2], 4, true);
    player.animations.add('left', [4, 5, 6], 4, true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collideWorldBounds = true;


    nxtlvlbutton = game.add.button(game.camera.width / 2, game.camera.height / 2, 'popupbutton', function() {
      game.state.start('Level2');
      playermove = true;
    }, this)
    nxtlvlbutton.visible = false;
    nxtlvlbutton.anchor.setTo(0.5, 0.5);
    nxtlvlbutton.fixedToCamera = true;
    nxtlvlbuttontext = game.add.text(game.camera.width / 2, (game.camera.height / 2), "Next Level", {
      fontSize: '22px',
      fill: '#fff'
    });
    nxtlvlbuttontext.visible = false;
    nxtlvlbuttontext.anchor.setTo(0.5, 0.40);
    nxtlvlbuttontext.fixedToCamera = true;

    controls = this.input.keyboard.createCursorKeys();

    mummy1 = new Mummy(0, game, 550, 380, 3, 1000, 340); //Mummy's starting position.

    item1 = new Item(0, game, 500, 570, "\n  BOTTLE \n \n \n \n \n This fancy bottle allowed \n the owner to drink in the \n afterlife. Having it in the \n tomb, even when empty, \n guarantees an ever-lasting \n supply of drink.", 0.35, 'bottle', 110); //image, height, scalex, scaley
    item2 = new Item(0, game, 1050, 200, "\n  FIRE STICK \n \n \n \n \n This 'fire stick' was rotated \n at speed against this piece \n of wood to create enough \n friction to light a fire. \n This provided fire and \n warmth for cooking in the \n afterlife.", 0.35, 'firestick', 117);
    item3 = new Item(0, game, 302, 100, "\n  GOLD MASK \n \n \n \n \n This mask would be placed \n over the head of a mummy \n to protect it. The feather \n pattern may represent the \n protective wings of the  \n goddess Isis or the bird- \n like spirit of the dead 'Ba'.", 0.35, 'goldmask', 120);

    if (!Phaser.Device.desktop) {
      buttonjump = game.add.button(593, 432, 'directional');
      buttonjump.fixedToCamera = true;
      buttonjump.anchor.setTo(0.5, 0.5);
      buttonjump.scale.setTo(1.2, 1.2);
      buttonjump.events.onInputOver.add(function(){jump = true;});
      buttonjump.events.onInputOut.add(function(){jump = false;});
      buttonjump.events.onInputDown.add(function(){jump = true;});
      buttonjump.events.onInputUp.add(function(){jump = false;});

      buttonleft = game.add.button(49 , 432, 'directional');
      buttonleft.fixedToCamera = true;
      buttonleft.anchor.setTo(0.5, 0.5);
      buttonleft.scale.setTo(1.20, 1.20);
      buttonleft.angle = 270;
      buttonleft.events.onInputOver.add(function(){left = true;});
      buttonleft.events.onInputOut.add(function(){left = false;});
      buttonleft.events.onInputDown.add(function(){left = true;});
      buttonleft.events.onInputUp.add(function(){left = false;});

      buttonright = game.add.button(144, 432, 'directional');
      buttonright.fixedToCamera = true;
      buttonright.anchor.setTo(0.5, 0.5);
      buttonright.scale.setTo(1.20, 1.20);
      buttonright.angle = 90;
      buttonright.events.onInputOver.add(function(){right = true;});
      buttonright.events.onInputOut.add(function(){right = false;});
      buttonright.events.onInputDown.add(function(){right = true;});
      buttonright.events.onInputUp.add(function(){right = false;});

}



  },

  update: function(game) {
    this.physics.arcade.collide(player, platformslayer);
    this.physics.arcade.collide(mummy1.mummy, platformslayer);
    this.physics.arcade.collide(item1.item, platformslayer);
    this.physics.arcade.collide(item2.item, platformslayer);
    this.physics.arcade.collide(item3.item, platformslayer);

    player.body.velocity.x = 0;

    mummy1.mummy.animations.play('mummy');

    if (controls.right.isDown && playermove == true || right == true && playermove == true) {
      player.animations.play('right');
      player.body.velocity.x += playerSpeed;
    } else if (controls.left.isDown && playermove == true  || left == true && playermove == true) {
      player.animations.play('left')
      player.body.velocity.x -= playerSpeed;
    } else {
      player.animations.stop();
      player.frame = 3;
    }

    if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && playermove == true  || jump == true && (player.body.onFloor() || player.body.touching.down) && playermove == true ) {
      player.body.velocity.y = -600;

    }

    if (checkOverlap(player, mummy1.mummy)) {
      this.state.start('Level1');
    }

    if (checkOverlap(player, item1.item)) {
      if (!item1.item.hasOverlapped) {
        player.body.velocity.x = 0;
        player.hasOverlapped = item1.item.hasOverlapped = true;
        item1.item.animations.play('open');
        itemsLeft -= 1;
        counter.text = 'Items Left: ' + itemsLeft;
        item1.item.body.enable = false;
        item1.item.popup.visible = true;
        item1.item.info.visible = true;
        item1.item.image.visible = true;
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
          item1.item.button.visible = true;
          item1.item.buttontext.visible = true
        }, this);
        game.world.bringToTop(item1.item.popup);
        game.world.bringToTop(item1.item.info);
        game.world.bringToTop(item1.item.image);
        playermove = false;
      }
    }
    if (checkOverlap(player, item2.item)) {
      if (!item2.item.hasOverlapped) {
        player.body.velocity.x = 0;
        item2.item.hasOverlapped = true;
        item2.item.animations.play('open');
        itemsLeft -= 1;
        counter.text = 'Items Left: ' + itemsLeft;
        item2.item.body.enable = false;
        item2.item.popup.visible = true;
        item2.item.info.visible = true;
        item2.item.image.visible = true;
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
          item2.item.button.visible = true;
          item2.item.buttontext.visible = true
        }, this);
        game.world.bringToTop(item2.item.popup);
        game.world.bringToTop(item2.item.info);
        game.world.bringToTop(item2.item.image);
        playermove = false;
      }
    }
    if (checkOverlap(player, item3.item)) {
      if (!item3.item.hasOverlapped) {
        player.body.velocity.x = 0;
        item3.item.hasOverlapped = true;
        item3.item.animations.play('open');
        itemsLeft -= 1;
        counter.text = 'Items Left: ' + itemsLeft;
        item3.item.body.enable = false;
        item3.item.popup.visible = true;
        item3.item.info.visible = true;
        item3.item.image.visible = true;
        game.time.events.add(Phaser.Timer.SECOND * 3, function() {
          item3.item.button.visible = true;
          item3.item.buttontext.visible = true
        }, this);
        game.world.bringToTop(item3.item.popup);
        game.world.bringToTop(item3.item.info);
        game.world.bringToTop(item3.item.image);
        playermove = false;
      }
    }
    if (itemsLeft == 0 && (item3.item.popup.visible == false && item3.item.popup.visible == false && item2.item.popup.visible == false)) { //This checks that all three pop ups have been read and closed before enabling the next level button
      nxtlvlbutton.visible = true;
      nxtlvlbuttontext.visible = true;
      playermove = false;
    }
  },

}

//Global
function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
