ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

collides: ig.Entity.COLLIDES.ACTIVE,
type: ig.Entity.TYPE.A,
checkAgainst: ig.Entity.TYPE.B,
gravityFactor: 2,

size: {x:30, y:30},

energy: 100,

flipped: false,

speed: 50,

invisible: false,

usingJetPack: false,

animSheet: new ig.AnimationSheet('media/playerg.png', 30, 30),

init: function(x, y, settings){
    this.addAnim('idle', 1, [0]);
    this.addAnim('walk', 0.15, [0,2,0,1]);
    this.addAnim('invisiblewalk', 0.25, [3,5,3,4]);
    this.addAnim('invisibleidle', 1, [5]);
        
    this.parent(x,y, settings);
},

collideWith: function(other, axis){

    if (other.tag == "gem") {
        other.kill();
        this.energy += 9;
    }
    
    this.parent(other,axis);
    
    
},

update: function(){
    
    doWalk(this);
    doJump(this);
    doInvisibility(this);
    doAnimation(this);

    this.parent();    
}
    
    
});
});

function doWalk(p){
    //Player can only walk when not falling or when using the jetpack
    var newVelocity = 0;
    
    if (ig.input.state('left')){
        newVelocity = -p.speed;
        p.flipped = false;
    }
    else if (ig.input.state('right')){
        newVelocity = p.speed;
        p.flipped = true;
    }
    else{
        if (p.vel.x != 0) p.vel.x = 0;
    }
        
    if (!isFalling(p)){
        p.vel.x = newVelocity;    
    }
}

function doJump(p){
    if (ig.input.state('jetpack'))
    {
        if (hasEnoughEnergy(p) && !isInvisible(p)) {
            startJetPack(p);
            return;
        }
    }    
    stopJetPack(p);
}

function doInvisibility(p){
        if (ig.input.state('invisible')){
        if (!p.usingJetPack){
            if (p.energy > 1) p.invisible = true;
        }
    }
    else
        p.invisible = false;

    if (p.invisible || p.usingJetPack) {
        p.energy -=.1;
        if (p.energy < 1) p.invisible = false;
    }
}

function doAnimation(p){
    var anim =p.vel.x != 0 ? (p.invisible ? p.anims.invisiblewalk : p.anims.walk) : (p.invisible ? p.anims.invisibleidle : p.anims.idle);
    if (p.usingJetPack) anim = p.invisible ? p.anims.invisibleidle : p.anims.idle;    
    p.currentAnim = anim
    p.currentAnim.flip.x = p.flipped;
}

function isFalling(p){
    return !p.standing && !p.usingJetPack;
}

function hasEnoughEnergy(p){
    return p.energy > 0;    
}

function isInvisible(p){
    return p.invisible;
}

function startJetPack(p){
    p.accel.y = -(p.speed*4);
    p.usingJetPack = true;    
}

function stopJetPack(p){
    p.usingJetPack = false;
    if (!p.standing) p.vel.y =p.speed;
}