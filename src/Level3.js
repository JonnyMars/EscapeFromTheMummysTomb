Game.Level3 = function(game) {};
//Initialise variables
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

Game.Level3.prototype = {

  create: function(game) {
    this.stage.backgroundColor = '#3A5963'
    //Enable physics and set to 1400
    this.physics.arcade.gravity.y = 1400;

    //Load tilemap 3
    map = this.add.tilemap('map3', 1, 100);

    //Link tileset to tilemap
    map.addTilesetImage('tileset');

    //assign tilemap layers to variables
    layer = map.createLayer('Background');
    platformslayer = map.createLayer('Platforms');

    layer.resizeWorld();
    //Make the platforms layer collideable
    map.setCollisionBetween(1, 100, true, 'Platforms');

    //ItemsLeft counter
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

    //add and position player
    player = this.add.sprite(652, 1850, 'player');
    player.anchor.setTo(0.5, 0.5);
    //Add player animations for walking
    player.animations.add('right', [0, 1, 2], 4, true);
    player.animations.add('left', [4, 5, 6], 4, true);
    //Enable physics on player
    this.physics.arcade.enable(player);
    //make the camera follow the player
    this.camera.follow(player);
    //Make the player collide with the world bounds
    player.body.collideWorldBounds = true;

    //Create the next level button, make it not visible
    nxtlvlbutton = game.add.button(game.camera.width / 2, game.camera.height / 2, 'popupbutton', function() {
      game.state.start('Quiz1');
      playermove = true;
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

    //Assign keyboard controls to "controls" Variable
    controls = this.input.keyboard.createCursorKeys();

    //Add 5 mummies using the Mummy function
    mummy1 = new Mummy(0, game, 230, 765, 3, 1000, 435);
    mummy2 = new Mummy(0, game, 720, 765, 3, 1000, 480);
    mummy3 = new Mummy(0, game, 1070, 1120, 3, 1450, 716);
    mummy4 = new Mummy(0, game, 1230, 1760, 3, 900, 1070);
    mummy5 = new Mummy(0, game, 48, 1760, 3, 900, 208);

    //Add 3 items using the Item function
    item1 = new Item(0, game, 1230, 1400, "\n RAZOR \n \n \n \n \n \nThis metal razor would have\nbeen used for shaving people's\n hair in ancient Egyptian times.\nPriests would shave their hair\nto help them keep clean", 0.35, 'razor', 105); //image, height, scalex, scaley
    item2 = new Item(0, game, 50, 720, "\nNECKLACE\n \n \n \n \n \nThis necklace is made up of\nball and cylinder shaped beads\nwith amulets. It has a pendant,\nwhich has been made to look\nlike a freshwater oyster shell.", 0.35, 'necklace', 102);
    item3 = new Item(0, game, 50, 210, "\nWOODEN SANDALS\n \n \n \n \n \nSandals were valued personal\npossessions. The dead person\nwould always be sure to have\nfootwear in the afterlife.", 0.35, 'sandals', 90);


    //If the device is not a desktop device, show the on-screen controls
    if (!Phaser.Device.desktop) {
      buttonjump = game.add.button(593, 432, 'directional');
      buttonjump.fixedToCamera = true;
      buttonjump.anchor.setTo(0.5, 0.5);
      buttonjump.scale.setTo(1.2, 1.2);
      buttonjump.events.onInputOver.add(function() {
        jump = true;
      });
      buttonjump.events.onInputOut.add(function() {
        jump = false;
      });
      buttonjump.events.onInputDown.add(function() {
        jump = true;
      });
      buttonjump.events.onInputUp.add(function() {
        jump = false;
      });

      buttonleft = game.add.button(49, 432, 'directional');
      buttonleft.fixedToCamera = true;
      buttonleft.anchor.setTo(0.5, 0.5);
      buttonleft.scale.setTo(1.20, 1.20);
      buttonleft.angle = 270;
      buttonleft.events.onInputOver.add(function() {
        left = true;
      });
      buttonleft.events.onInputOut.add(function() {
        left = false;
      });
      buttonleft.events.onInputDown.add(function() {
        left = true;
      });
      buttonleft.events.onInputUp.add(function() {
        left = false;
      });

      buttonright = game.add.button(144, 432, 'directional');
      buttonright.fixedToCamera = true;
      buttonright.anchor.setTo(0.5, 0.5);
      buttonright.scale.setTo(1.20, 1.20);
      buttonright.angle = 90;
      buttonright.events.onInputOver.add(function() {
        right = true;
      });
      buttonright.events.onInputOut.add(function() {
        right = false;
      });
      buttonright.events.onInputDown.add(function() {
        right = true;
      });
      buttonright.events.onInputUp.add(function() {
        right = false;
      });

    }


  },

  update: function(game) {
    //Make all objects collideable
    this.physics.arcade.collide(player, platformslayer);
    this.physics.arcade.collide(mummy1.mummy, platformslayer);
    this.physics.arcade.collide(mummy2.mummy, platformslayer);
    this.physics.arcade.collide(mummy3.mummy, platformslayer);
    this.physics.arcade.collide(mummy4.mummy, platformslayer);
    this.physics.arcade.collide(mummy5.mummy, platformslayer);
    this.physics.arcade.collide(item1.item, platformslayer);
    this.physics.arcade.collide(item2.item, platformslayer);
    this.physics.arcade.collide(item3.item, platformslayer);

    //Set player default velocity
    player.body.velocity.x = 0;

    //Play animations for all mummies
    mummy1.mummy.animations.play('mummy');
    mummy2.mummy.animations.play('mummy');
    mummy3.mummy.animations.play('mummy');
    mummy4.mummy.animations.play('mummy');
    mummy5.mummy.animations.play('mummy');

    //if function to say what happens when a key or button is pressed
    if (controls.right.isDown && playermove == true || right == true && playermove == true) {
      player.animations.play('right');
      player.body.velocity.x += playerSpeed;
    } else if (controls.left.isDown && playermove == true || left == true && playermove == true) {
      player.animations.play('left')
      player.body.velocity.x -= playerSpeed;
    } else {
      player.animations.stop();
      player.frame = 3;
    }
    if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && playermove == true || jump == true && (player.body.onFloor() || player.body.touching.down) && playermove == true) {
      player.body.velocity.y = -600;

    }

    //If the player collides with any mummy then the level will be reset
    if (checkOverlap(player, mummy1.mummy) || checkOverlap(player, mummy2.mummy) || checkOverlap(player, mummy3.mummy) || checkOverlap(player, mummy4.mummy) || checkOverlap(player, mummy5.mummy)) {
      this.state.start('Level3');
    }

    //If the player overlaps with an item, the item will be collected and the appropriate pop-up will appear
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
    //If no items left, show the "Quiz" button
    if (itemsLeft == 0 && (item3.item.popup.visible == false && item3.item.popup.visible == false && item2.item.popup.visible == false)) { //This checks that all three pop ups have been read and closed before enabling the next level button
      nxtlvlbutton.visible = true;
      nxtlvlbuttontext.visible = true;
      playermove = false;
    }
  },

}
