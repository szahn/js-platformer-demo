ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.player',
	'game.entities.lizard',
	'game.entities.gem',
	'game.entities.crystal',
	'game.entities.fire',
	'game.entities.orb',
	'game.levels.test'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'duck');
		ig.input.bind(ig.KEY.UP_ARROW, 'jetpack');
		ig.input.bind(ig.KEY.SPACE, 'invisible');
		this.loadLevel( LevelTest );

	},
	
	update: function() {
		
		//Center screen on player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}


		// Update all entities and backgroundMaps
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		var player = this.getEntitiesByType( EntityPlayer )[0];
		var showEnergy = false;
		if (player) {
			if (player.invisible){
				this.font.draw( 'Invisible', 320, 0, ig.Font.ALIGN.RIGHT );
				showEnergy = true;
			}
			if (player.usingJetPack){
				this.font.draw( 'Jetpack', 320, 0, ig.Font.ALIGN.RIGHT );
				showEnergy = true;
			}
			if (showEnergy) this.font.draw( 'Energy: ' + player.energy.toFixed(0), 0, 0 );
		}


	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
