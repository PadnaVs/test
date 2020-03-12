
	let Handler = {};
	
	Handler.player = null;
	
	Handler.gameScene = null;
	
	Handler.touchControl = null;
	
	Handler.collisionCheck = function( cSpire, cPlayer ) {
		let disBetPlayerAndPlat = cPlayer.y - cPlayer.r - cSpire.upPoint;
		if ( disBetPlayerAndPlat <= 0 ) { 
			console.log( "hit" );
			let scale = new THREE.Vector3( 1, 0.5, 1 );
			//console.log();
			//player.model.scale.y = 0.5;
			let t = 0.04;
			//TweenMax.to( cPlayer.model.scale, t,{ y: 0.8, ease: Power0.easeNone, onComplete: function() {
			//	TweenMax.to( cPlayer.model.scale, t,{ y: 1, ease: Power0.easeNone });
			//} });
			//self.player.maxDownY -= 0.8;
			return cSpire.checkSelectSector();
		}
		return false;
	}	