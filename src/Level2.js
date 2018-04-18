Game.Level2 = function(game) {};

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

Game.Level2.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map2', 1, 100);

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
    counter.fixedToCamera = true;

    itemsLeft = 3;

    player = this.add.sprite(960, 900, 'player');
    player.anchor.setTo(0.5, 0.5);

    player.animations.add('right', [0, 1, 2], 4, true);
    player.animations.add('left', [4, 5, 6], 4, true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collideWorldBounds = true;


    nxtlvlbutton = game.add.button(game.camera.width / 2, game.camera.height / 2, 'popupbutton', function() {
      game.state.start('Level3');
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

    mummy1 = new Mummy(0, game, 50, 600, 3, 680, 220); //Mummy's starting position. - index, game, x, y, frame, tweenspeed, tweenx
    mummy2 = new Mummy(0, game, 1870, 600, 3, 620, 1700); //Mummy's starting position. - index, game, x, y, frame, tweenspeed, tweenx
    mummy3 = new Mummy(0, game, 800, 100, 3, 1100, 1050); //Mummy's starting position. - index, game, x, y, frame, tweenspeed, tweenx

    item1 = new Item(0, game, 1870, 100, "\nWOODEN MODEL OF A GIRL \n \n \n \n \nThis servant carries a basket\nof food on her head and\nholds two geese in her\nhand. When placed inside\nthe tomb she guarantees\nthe dead person an\neternal supply of food.", 0.35, 'modelgirl', 120); //image, height, scalex, scaley
    item2 = new Item(0, game, 50, 100, "\nWOODEN MODEL OF A BOAT\n \n \n \n \nOn this pleasure cruiser,\nthe sailors raise the sail\nto catch the wind. It is in the\ntomb to provide transport\nfor the dead person.\nOnly very important people\ncould afford a boat like this.", 0.35, 'boat', 117);
    item3 = new Item(0, game, 730, 100, "\nWOODEN HARP\n \n \n \n \nThis five-stringed shoulder harp\nis from the tomb of Senuatef\nand his family. This would\nhave allowed the dead person\nto enjoy music and poetry\nat parties in the afterlife.", 0.35, 'harp', 110);

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
    this.physics.arcade.collide(mummy2.mummy, platformslayer);
    this.physics.arcade.collide(mummy3.mummy, platformslayer);
    this.physics.arcade.collide(item1.item, platformslayer);
    this.physics.arcade.collide(item2.item, platformslayer);
    this.physics.arcade.collide(item3.item, platformslayer);

    player.body.velocity.x = 0;

    mummy1.mummy.animations.play('mummy');
    mummy2.mummy.animations.play('mummy');
    mummy3.mummy.animations.play('mummy');

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

    if (checkOverlap(player, mummy1.mummy) || checkOverlap(player, mummy2.mummy) || checkOverlap(player, mummy3.mummy)) {
      this.state.start('Level2');
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
