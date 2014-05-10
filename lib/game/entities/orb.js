ig.module('game.entities.orb')
.requires('impact.entity')

.defines(function(){

EntityOrb = ig.Entity.extend({

collides: ig.Entity.COLLIDES.ACTIVE,
type: ig.Entity.TYPE.B,
checkAgainst: ig.Entity.TYPE.A,
gravityFactor: 2,

size: {x:50, y:40},
tag: "orb",

hspeed: 0,
vspeed: 0,
direction: 1,
ticks: 0,
ticksBeforeSwitch: 200,

speed: 25,

animSheet: new ig.AnimationSheet('media/orb.png', 50, 40),

init: function(x, y, settings){
    this.addAnim('idle', 1, [0]);
        
    this.parent(x,y, settings);
},

update: function(){
    
    if (this.hspeed != 0){
        this.vel.x = this.direction * this.speed;        
    }
    if (this.vspeed != 0){
        this.vel.y = this.direction * this.speed;        
    }
    
    this.ticks +=1;
    if (this.ticks >= this.ticksBeforeSwitch){
           this.switchDirection();
    }
    
    this.parent();    
},

collideWith: function(other, axis){
    if (axis == 'x') this.switchDirection();

},

switchDirection: function(){
    this.direction = -1 * this.direction;
    this.ticks = 0;
}
    
    
});
});