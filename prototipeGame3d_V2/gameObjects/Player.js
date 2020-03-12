
	"use strict"
	
	let Player = function( _model ) {
		let self = this;
		
		this.model = _model.clone();
		
		this._x = this.model.position.x;
		this._y = this.model.position.y;
		this._z = this.model.position.z;
		
		this.maxDownY = 0;
		
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
		let self = this;
		let down = collisionCheck( spire, this );
		if ( down ) {
			self.maxDownY -= 0.8;
			self.move();
		} else {
			TweenMax.to( self.model.position, 0.2, { y: self.maxDownY+1, ease: Power0.easeNone, onComplete: function() { 
				self.move(); 
			}});
		}
		
	}
	
	Player.prototype.move = function(  ) {
		let self = this;
		//this.step += this.speed;
		//this.y = 1 + 2*Math.abs( Math.sin( this.step ) );
		//self.model.position.y = this.maxDownY + 1;
		TweenMax.to( self.model.position, 0.2, { y: self.maxDownY, ease: Power0.easeNone, onComplete: function() {
			self.omitted();
		}});
	};