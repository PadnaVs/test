
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
		
		this.currentSide = Consts.sideTouchLeft;
		
		this.xPos = -2,5;
		this.zPos = 3.5;
		this.angle = 3.5;
		
		this.anim = null;
		this.movesSide = false;
		this.movesDown = false;
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
	
	Player.prototype.checkDirection = function() {
		if ( this.currentSide == Handler.touchControl.sideTouch ) { 
			return true;
		} else {
			return false;
		}
	}
	
	Player.prototype.moveSide = function() {
		let self = this;
		if ( this.checkDirection() ) return;
		if ( Handler.touchControl.sideTouch == Consts.sideTouchRight ) {
			self.angle = 35;
			self.xPos = self.maxRight;
			self.currentSide = Consts.sideTouchRight;
		} else if ( Handler.touchControl.sideTouch == Consts.sideTouchLeft ) { 
			self.xPos = self.maxLeft;
			self.angle = -35;
			self.currentSide = Consts.sideTouchLeft;
		};
		let distance = Math.abs( self.xPos - self.model.position.x );
		
		let time = (distance/this.speed)/2;
		
		this.movesSide = true;
		TweenMax.to( self.model.position, time, { x: self.xPos, ease: Power0.easeNone, onComplete: function(){ self.movesSide = false } });
	};
	
	Player.prototype.moveDown = function() {
		let self = this;
		this.movesDown = true;

		let distance = self.model.position.y - self.maxDownY;
		let time = 0.02;
		TweenMax.to( self.model.position, time, { y: self.maxDownY, ease: Power0.easeNone, onComplete: function(){
			self.movesDown = false;
			if ( Handler.touchControl.touch && !Handler.gameWin ) {
				if ( Handler.collisionCheck( Handler.spire, self ) ) {
					self.maxUpY   -= self.shY;
					self.maxDownY -= self.shY;
					self.moveDown();
					Handler.cameraMoveDown( 0.016 )
					if ( Handler.gameWin ) {
						alert("Win");
					}
				} else {
					Handler.scaleCurrentPlatform();
					setTimeout( function(){
						//удаление игрока						
						if (  Handler.touchControl.touch && !Handler.gameWin ) {
							Handler.gameScene.scene.remove( Handler.player.model );
						} else {
							self.createAnimBounce();
						}
					}, 130 );
				};
			} else {
				Handler.scaleCurrentPlatform();
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
		TweenMax.to( self.model.position, 0.2, { y: self.maxUpY, ease: Power0.easeNone, 
				onUpdate: function() {
				if ( Handler.touchControl.touch && !Handler.gameWin ) {
					self.moveSide();
					if ( !self.movesSide ) {
						this.kill();
						self.moveDown();
					}
				}
			},  onComplete: function() {
					if ( Handler.touchControl.touch && !Handler.gameWin && !self.movesSide && self.checkDirection() ) {
						//self.moveSide();
						this.kill();
						self.moveDown();
					}
					TweenMax.to( self.model.position, 0.2, { y: self.maxDownY, ease: Power0.easeNone 
						, onUpdate: function(){
							if ( Handler.touchControl.touch && !Handler.gameWin && !self.movesSide && self.checkDirection() ) {
								//self.moveSide();
								this.kill();
								self.moveDown();
							}
						}
						,onComplete: function(){
							if ( Handler.touchControl.touch && !Handler.gameWin && !self.movesSide && self.checkDirection() ) {
								//self.moveSide();
								this.kill();
								self.moveDown();
							} else { 
								self.createAnimBounce();
							}
							//self.moveSide();
							//self.createAnimBounce();
						}				
					});
			   }
		});

	}
