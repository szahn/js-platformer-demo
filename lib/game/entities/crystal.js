ig.module('game.entities.crystal')
.requires('impact.entity')

.defines(function(){

EntityCrystal = ig.Entity.extend({

collides: ig.Entity.COLLIDES.FIXED,

size: {x:30, y:45},
model : 0,
tag: "crystal",

animSheet: new ig.AnimationSheet('media/crystal.png', 30, 45),

init: function(x, y, settings){
    this.addAnim('a', .25, [0]);
    this.addAnim('b', .25, [1]);
    this.addAnim('c', .25, [2]);
    this.addAnim('d', .25, [3]);
        
    this.parent(x,y, settings);
},

update: function(){
        if (this.model == 0) this.currentAnim = this.anims.a;
    if (this.model == 1) this.currentAnim = this.anims.b;
    if (this.model == 2) this.currentAnim = this.anims.c;
    if (this.model == 3) this.currentAnim = this.anims.d;
    
    this.parent();    
}    
    
});
});