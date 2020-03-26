
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

	Handler.cameraMoveDown = function( time ) {
		let newCY = Handler.gameScene.camera.position.y - 1;
		TweenMax.to( Handler.gameScene.camera.position, time, { y: newCY, ease: Power0.easeNone } );
	}
	
	Handler.scaleCurrentPlatform = function() {
		let numCurPl = Handler.spire.numCurrentPlatform;
		
		let platform = Handler.spire.model.children[1 + numCurPl ];
		
		TweenMax.to( platform.scale, 0.13, { x: 1.1, z: 1.1, ease: Power0.easeNone, repeat: 1, yoyo: true } );
	};
	
	let rot = function(){
		let self = this;
		
		this._x = 0;
		this._y = 0;
		this._z = 0;
		
		Object.defineProperty( this, "x", {
	       get: function(   ) { return self._x; },
	       set: function( val ) { 
				self._x = val; 			
	    	}
	    });
		
		Object.defineProperty( this, "y", {
	       get: function(   ) { return self._y; },
	       set: function( val ) { 
				self._y = val; 
	    	}
	    });
		
		Object.defineProperty( this, "z", {
	       get: function(   ) { return self._z; },
	       set: function( val ) { 
				self._z = val; 			
	    	}
	    });
	}
	Handler.newRotObj = function() {
		return new rot();
	}