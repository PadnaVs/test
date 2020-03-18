
	let Handler = {};
	//////////////////////////////
	Handler.player = null;
    Handler.spire = null;
	Handler.gameScene = null;
	
	Handler.touchControl = null;
	//////////////////////////////
	
	Handler.gameWin = false;
	Handler.cw = window.innerWidth;
	Handler.ch = window.innerHeght;
	
	//////////////////////////////
	Handler.collisionCheck = function( cSpire, cPlayer ) {
		let disBetPlayerAndPlat = cPlayer.y - cPlayer.r - cSpire.upPoint;
		console.log(disBetPlayerAndPlat);
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

	Handler.cameraMoveDown = function( shY ) {
		//Handler.gameScene.pointOfSightY     -= shY;
		let newCY = Handler.gameScene.camera.position.y - shY;
		TweenMax.to( Handler.gameScene.camera.position, 0.04, { y: newCY, ease: Power0.easeNone } );
		//Handler.gameScene.camera.position.y -= shY;
		//Handler.gameScene.cameraLookToThePoint( 0, Handler.gameScene.pointOfSightY, 0 );	
	}