ig.module('game.entities.fire')
.requires('impact.entity')

.defines(function(){

EntityFire = ig.Entity.extend({

collides: ig.Entity.COLLIDES.NONE,

size: {x:25, y:25},
tag: "fire",

animSheet: new ig.AnimationSheet('media/fire.png', 25, 25),

init: function(x, y, settings){
    this.addAnim('flaming', .25, [0,1,2,3]);
        
    this.parent(x,y, settings);
},

update: function(){
        
    this.parent();    
},

collideWith: function(other, axis){


},
    
    
});
});