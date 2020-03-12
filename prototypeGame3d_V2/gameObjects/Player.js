
	"use strict";
	
	let Player = function( _model ) {
		let self = this;
		
		this.model = _model.clone();
		
		this._x = this.model.position.x;
		this._y = this.model.position.y;
		this._z = this.model.position.z;
		
		this.maxDownY = 0;
		this.maxUpY = 0;
		
		this.anim = null;
		this.jumping = true;
		
		this.r = 1;//радиус
		
		this.speed = 0.060;
		this.step = 0;
		
		Object.defineProperty( this, "x", {
	       get: function(   ) { return self.model.position.x; },
	       set: function( val ) { 			
               self.model.position.x = val;
	    	}
	    });
		
		Object.defineProperty( this, "y", {
	       get: function(   ) { return self.model.position.y; },
	       set: function( val ) { 			
               self.model.position.y = val;
	    	}
	    });
		
		Object.defineProperty( this, "z", {
	       get: function(   ) { return self.model.position.z; },
	       set: function( val ) { 		
               self.model.position.z = val;
	    	}
	    });
	};
	
	Player.prototype.omitted = function() {
		//let self = this;
		////let down = 
		//if ( down ) {
		//	self.maxDownY -= 0.8;
		//	//self.move();
		//} else {
		//	//TweenMax.to( self.model.position, 0.2, { y: self.maxDownY+1, ease: Power0.easeNone, onComplete: function() { 
		//	//	self.move(); 
		//	//}});
		//}
		
	}
	
	Player.prototype.move = function(  ) {
		let self = this;
		
		if (  Handler.touchControl.touch ) {
			
		} else if ( !this.jumping ) {
			this.jumping = true;
			
		};
	};
	
	Player.prototype.createAnimBounce = function() {
		let self = this;
		this.anim = TweenMax.to( self.model.position, 0.2, { y: self.maxUpY, ease: Power0.easeNone, repeat: -1, yoyo: true});
		//this.anim = TweenMax.fromTo( self.model.position, 0.2, { y: self.maxUpY }, { y: self.maxDownY }/*, ease: Power0.easeNone, repeat: -1, yoyo: true*/ );
	}
	
	Player.prototype.createAnimDown = function() {
		let self = this;
		this.anim = TweenMax.to( self.model.position, 0.1, { y: self.maxDownY, ease: Power0.easeNone, onComplete: function() {
			if ( Handler.touchControl.touch == true ) {
				if ( Handler.collisionCheck( Handler.spire, self ) ) {
					self.maxUpY -= 0.8;
					self.maxDownY -= 0.8;
					self.createAnimDown();
				} else {
					Handler.gameScene.scene.remove( Handler.player.model );
				};
			} else {
				self.anim.kill();
				self.createAnimBounce();
			};
		} });
	}