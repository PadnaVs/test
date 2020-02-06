
	"use strict";
	
	let JTweenJL = {};
	JTweenJL.to = function ( fcbox, fsignx=0 ) {
		//shiftx 30 +-10
		//shiftY1 15 +-5
		//shiftY2 99 +-10
		//shiftY2 60 +-20
	    //fcbox._sprite = fcbox._sprite || fcbox;
	    fcbox._sprite = fcbox._sprite == null ? fcbox : fcbox._sprite;
		
		let goTween = function () {
			try {
				let shiftX  = 30 + Math.floor(Math.random()*20 - 10);//int(
				let shiftY1 = 10 + Math.floor(Math.random()*10 -  5);//int(
				let shiftY2 = 99 + Math.floor(Math.random()*20 - 10);//int(
				let shiftR  = 60 + Math.floor(Math.random()*40 - 20);//int(
			
				let signX = (fsignx==0)? ((Math.random() > 0.5)? -1: 1) : fsignx;
				
				let x1 = Math.floor(fcbox._sprite.x-shiftX*signX);
				let y1 = Math.floor(fcbox._sprite.y-shiftY1);
			
				TweenMax.to(fcbox._sprite,0.1,{y:y1,onComplete:function () {
					let y2 = fcbox.y+shiftY2;
					TweenMax.to(fcbox._sprite,0.5,{alpha:0.3,y:y2,ease:Cubic.easeIn });
				}});	
				TweenMax.to(fcbox._sprite,0.6,{x:x1,angle:-shiftR, onComplete: function() { JTweenJL.onCompleteTween(fcbox); }});
				
				
				let gcolor = fcbox && fcbox.color+1 ? fcbox.color+1 : 6;
				
				if ( fcbox  && fcbox.boosterGhost) Handler.jlines.taskPanel.refrashGems( 9 );
				if ( fcbox.name.indexOf('ya1Part') < 0 ) {
					//( gcolor );
				};
				//console.log();
				if ( fcbox.color != null ) {
					Sounds.playSingleBoom();
				} else {
					Sounds.playSingleSteklo();
				};
			} catch ( ex ) {
			    Log.onErrorCatched(ex);
			};
		};
		setTimeout(goTween,300);
	};
	JTweenJL.onCompleteTween = function ( fcbox ) {
		if ( fcbox != null ) {
			if ( fcbox.removeGem != null ) {
				//fcbox.filters = [];
				fcbox.selected = false;
				fcbox.removeGem();
			} else {
				if ( fcbox  && fcbox.parent != null ) {
					fcbox.parent.removeChild(fcbox._sprite);
				};
			};
		};
		Sounds.stopElectro();
	};
	