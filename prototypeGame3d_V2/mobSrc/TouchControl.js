	
	"use strict";
	
	let TouchControl = function( domElement ) {
		let self = this;
		this.touch = false;
		
		let touchStart = function() {
			//Handler.player.jumping = false;
			self.touch = true;
			Handler.player.anim.kill();
			Handler.player.createAnimDown();
		}
		
		let touchEnd = function() {
			self.touch = false;
			//Handler.player.jumping = true;
		}
		
		
		domElement.addEventListener( "mousedown", touchStart, false);
		domElement.addEventListener( "mouseup", touchEnd, false);
		domElement.addEventListener( "touchstart", touchStart, false);
		domElement.addEventListener( "touchend", touchEnd, false);
	};