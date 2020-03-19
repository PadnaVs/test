	
	"use strict";
	
	let TouchControl = function( domElement ) {
		let self = this;
		this.touch = false;
		
		this.sideTouch = null;
		
		let touchStartM = function( evt ) {
			console.log("evt",evt);
			//Handler.player.jumping = false;
			self.touch = true;
			
			self.checkSideTouch( evt.clientX );
			
			//Handler.player.anim.kill();
			//Handler.player.createAnimDown();
		};
		
		let touchStart = function( evt ) {
			console.log("evt",evt);
			//Handler.player.jumping = false;
			self.touch = true;
			
			self.checkSideTouch( evt.touches[0].clientX );
			
			//Handler.player.anim.kill();
			//Handler.player.createAnimDown();
		};
		
		let touchEnd = function() {
			self.touch = false;
			//Handler.player.jumping = true;
		};
		
		domElement.addEventListener( "mousedown", touchStartM, false);
		domElement.addEventListener( "mouseup", touchEnd, false);
		domElement.addEventListener( "touchstart", touchStart, false);
		domElement.addEventListener( "touchend", touchEnd, false);
	};
	
	TouchControl.prototype.checkSideTouch = function( x ) {
		if ( x > Handler.cw/2 ) {
			this.sideTouch = Consts.sideTouchRight;
		} else {
			this.sideTouch = Consts.sideTouchLeft;
		}
		console.log( "sideTouch", this.sideTouch );
	};