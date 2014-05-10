ig.module('game.entities.gem')
.requires('impact.entity')

.defines(function(){

EntityGem = ig.Entity.extend({

collides: ig.Entity.COLLIDES.LITE,
checkAgainst: ig.Entity.TYPE.B,

size: {x:20, y:20},

tag: "gem",

animSheet: new ig.AnimationSheet('media/gem.png', 20, 20),

init: function(x, y, settings){
    this.addAnim('gem', .2, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);        
    this.parent(x,y, settings);
},

update: function(){
        
    this.parent();    
},
    
    
});
});