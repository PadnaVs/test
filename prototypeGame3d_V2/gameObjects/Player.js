
	"use strict";
	
	let Player = function( _model ) {
		let self = this;
		
		this.model = _model.clone();
		
		this._x = this.model.position.x;
		this._y = this.model.position.y;
		this._z = this.model.position.z;
		
		this.maxDownY = 0;
		this.maxUpY = 0;
		
		this.maxRight =  2.5;
		this.maxLeft  = -2.5;
		
		this.zPos = 3.5;
		
		this.anim = null;
		this.jumping = true;
		this.shY = 0;
		
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
	
	Player.prototype.moveSide = function() {
		let self = this;
		self.xPos = 0;
		if ( Handler.touchControl.sideTouch == Consts.sideTouchRight ) {
			self.angle = 35;
			self.xPos = self.maxRight;
		} else if ( Handler.touchControl.sideTouch == Consts.sideTouchLeft ) { 
			self.xPos = self.maxLeft;
			self.angle = -35;
		};
		TweenMax.to( self.model.position, 0.2, { x: self.xPos, ease: Power0.easeNone });
	};
	
	Player.prototype.moveDown = function() {
		let self = this;
		let distance = self.model.position.y - self.maxDownY;
		let time = distance/this.speed;
		TweenMax.to( self.model.position, time, { y: self.maxDownY, ease: Power0.easeNone, onComplete: function(){
			if ( Handler.touchControl.touch == true && Handler.gameWin == false ) {
				if ( Handler.collisionCheck( Handler.spire, self ) ) {
					self.maxUpY   -= self.shY;
					self.maxDownY -= self.shY;
					self.moveDown();
					Handler.cameraMoveDown( 0.9 )
					if ( Handler.gameWin == true ) {
						alert("Win");
					}
					//setTimeout( Handler.cameraMoveDown( 0.8 ) );
				} else {
					//Handler.gameScene.scene.remove( Handler.player.model );
					self.createAnimBounce();
				};
			} else {
				this.kill();
				self.createAnimBounce();
			};
		} });
	};
	
	Player.prototype.createAnimBounce = function() {
		let self = this;
		
		let distance = self.maxUpY - self.model.position.y;
		this.speed = distance/0.2;
		
		self.moveSide();
		TweenMax.to( self.model.position, 0.2, { y: self.maxUpY, ease: Power0.easeNone, onUpdate: function() {
				if ( Handler.touchControl.touch == true && Handler.gameWin == false ) {
					self.moveSide();
				}
			}, onComplete: function() {
				TweenMax.to( self.model.position, 0.2, { y: self.maxDownY, ease: Power0.easeNone 
					, onUpdate: function(){
						if ( Handler.touchControl.touch == true && Handler.gameWin == false ) {
							self.moveSide();
							this.kill();
							self.moveDown();
						}
					}
					,onComplete: function(){
						self.moveSide();
						self.createAnimBounce();
					}				
				});
			}
		});
		
		//let speed = distance/0.2;
		//
		
		//
		//this.anim = TweenMax.to( self.model.position, 0.2, { x: xPos/2, y: self.maxUpY, ease: Power0.easeNone, onComplete: function() {
		//	if ( Handler.touchControl.touch == true && Handler.gameWin == false ) {
		//		let time = distance/speed;
		//		TweenMax.to( self.model.position, 0.2, { x: xPos, y: self.maxDownY, ease: Power0.easeNone, onComplete: function() { self.createAnimBounce() } });
		//	} else {
		//		TweenMax.to( self.model.position, 0.2, { x: xPos, y: self.maxDownY, ease: Power0.easeNone, onComplete: function() { self.createAnimBounce() } });
		//	}
		//}});
		
		//this.speed = ( self.maxUpY - self.model.position.y)/0.2;
		//this.anim = TweenMax.to( self.model.position, 0.2, { y: self.maxUpY, ease: Power0.easeNone, repeat: -1, yoyo: true});
		//0,2 - скорость подьема шарика
		//this.anim = TweenMax.fromTo( self.model.position, 0.2, { y: self.maxUpY }, { y: self.maxDownY }/*, ease: Power0.easeNone, repeat: -1, yoyo: true*/ );
	}
	
	Player.prototype.createAnimDown = function() {
		let self = this;
		
		//let xPos = Handler.touchControl.sideTouch ==  Consts.sideTouchRight ? this.maxRight : this.maxLeft;
		//
		//let s = this.y - self.maxDownY;
		//
		//let time = s/this.speed;
		//
		//this.anim = TweenMax.to( self.model.position, time, { y: self.maxDownY, ease: Power0.easeNone } );
		
		//this.anim = TweenMax.to( self.model.position, 0.04, { y: self.maxDownY, ease: Power0.easeNone, onComplete: function() {
		//	if ( Handler.touchControl.touch == true && Handler.gameWin == false ) {
		//		if ( Handler.collisionCheck( Handler.spire, self ) ) {
		//			self.maxUpY   -= self.shY;
		//			self.maxDownY -= self.shY;
		//			self.createAnimDown();
		//			Handler.cameraMoveDown( 0.9 )
		//			if ( Handler.gameWin == true ) {
		//				alert("Win");
		//			}
		//			//setTimeout( Handler.cameraMoveDown( 0.8 ) );
		//		} else {
		//			Handler.gameScene.scene.remove( Handler.player.model );
		//		};
		//	} else {
		//		self.anim.kill();
		//		self.createAnimBounce();
		//	};
		//} });
	}