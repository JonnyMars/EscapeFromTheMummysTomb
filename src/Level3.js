Game.Level3 = function(game) {};

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

Game.Level3.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'

    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map3', 1, 100);

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

    counter = this.add.text(16, 16, 'Items Left: 3', {
      fontSize: '32px',
      fill: '#000',
      stroke: '#ffffff',
      strokeThickness: 4
    });
    counter.fixedToCamera = true;

    itemsLeft = 3;

    //652 1850
    player = this.add.sprite(100, 100, 'player');
    player.anchor.setTo(0.5, 0.5);

    player.animations.add('right', [0, 1, 2], 4, true);
    player.animations.add('left', [4, 5, 6], 4, true);
    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collideWorldBounds = true;


    nxtlvlbutton = game.add.button(game.camera.width / 2, game.camera.height / 2, 'popupbutton', function() {
      game.state.start('Level3');
    }, this)
    nxtlvlbutton.visible = false;
    nxtlvlbutton.anchor.setTo(0.5, 0.5);
    nxtlvlbutton.fixedToCamera = true;
    nxtlvlbuttontext = game.add.text(game.camera.width / 2, (game.camera.height / 2), "Quiz", {
      fontSize: '22px',
      fill: '#fff'
    });
    nxtlvlbuttontext.visible = false;
    nxtlvlbuttontext.anchor.setTo(0.5, 0.40);
    nxtlvlbuttontext.fixedToCamera = true;

    controls = this.input.keyboard.createCursorKeys();

    mummy1 = new Mummy(0, game, 200, 1850, 3, 680, 220); //Mummy's starting position. - index, game, x, y, frame, tweenspeed, tweenx
    mummy2 = new Mummy(0, game, 200, 1850, 3, 620, 220); //Mummy's starting position. - index, game, x, y, frame, tweenspeed, tweenx
    mummy3 = new Mummy(0, game, 200, 1850, 3, 1100, 220); //Mummy's starting position. - index, game, x, y, frame, tweenspeed, tweenx

    item1 = new Item(0, game, 1230, 1400, "\n RAZOR \n \n \n \n \n \nThis metal razor would have\nbeen used for shaving people's\n hair in ancient Egyptian times.\nPriests would shave their hair\nto help them keep clean", 0.35, 'razor', 105); //image, height, scalex, scaley
    item2 = new Item(0, game, 50, 720, "\nNECKLACE\n \n \n \n \n \nThis necklace is made up of\nball and cylinder shaped beads\nwith amulets. It has a pendant,\nwhich has been made to look\nlike a freshwater oyster shell.", 0.35, 'necklace', 102);
    item3 = new Item(0, game, 50, 210, "\nSANDALS\n \n \n \n \n \nSandals were valued personal\nposessions. The dead person\nwould always be sure they had \nfootwear in the afterlife.", 0.35, 'sandals', 90);




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

    if (controls.right.isDown) {
      player.animations.play('right');
      player.body.velocity.x += playerSpeed;
    } else if (controls.left.isDown) {
      player.animations.play('left')
      player.body.velocity.x -= playerSpeed;
    } else {
      player.animations.stop();
      player.frame = 3;
    }

    if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -600;
    }

    if (checkOverlap(player, mummy1.mummy) || checkOverlap(player, mummy2.mummy) || checkOverlap(player, mummy3.mummy)) {
      this.state.start('Level3');
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
      }
    }
    if (itemsLeft == 0 && (item3.item.popup.visible == false && item3.item.popup.visible == false && item2.item.popup.visible == false)) { //This checks that all three pop ups have been read and closed before enabling the next level button
      nxtlvlbutton.visible = true;
      nxtlvlbuttontext.visible = true;
    }
  },

}
