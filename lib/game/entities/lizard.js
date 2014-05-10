ig.module('game.entities.lizard')
.requires('impact.entity')

.defines(function(){

EntityLizard = ig.Entity.extend({

collides: ig.Entity.COLLIDES.ACTIVE,
type: ig.Entity.TYPE.B,
checkAgainst: ig.Entity.TYPE.A,
gravityFactor: 2,

size: {x:20, y:30},
tag: "lizard",

direction: -1,
ticks: 0,
ticksBeforeSwitch: 200,

speed: 12,

animSheet: new ig.AnimationSheet('media/lizard.png', 20, 30),

init: function(x, y, settings){
    this.addAnim('walk', .4, [4,5,6,7]);
    this.addAnim('front_idle', 1, [0]);
    this.currentAnim.flip.x = false;
    this.parent(x,y, settings);
},

update: function(){
    
    if (this.speed != 0){
        this.vel.x = this.direction * this.speed;        
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
    this.currentAnim.flip.x = !this.currentAnim.flip.x
}
    
    
});
});