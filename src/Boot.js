var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
  init:function(){
    this.input.maxPointers = 2; //How many inputs at once?

    this.stage.disableVisibilityChange = true; //Carry on game whilst not looking at the window.
  },

  preload:function(){
    this.load.image('loadingbar', 'assets/loadingbar.png'); //TEMPORARY

  },

  create:function(){
    this.state.start('PreLoader');
  }
}
