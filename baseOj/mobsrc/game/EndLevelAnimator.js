	
	"use strict";
	
	const EndLevelAnimator = {};
	EndLevelAnimator.callback = null; 
	EndLevelAnimator.animation = null;
	
	EndLevelAnimator._addBomb = function(fi,fj) {
		if (!EndLevelAnimator.animation || Handler.jlines.countSteps < 1) return;
		Handler.jlines.pointsPanel.countPoints += 60;
		Handler.jlines.pointsPanel.showNumber();
		let px = Handler.indexXToCoords(fi);
		let py = Handler.indexYToCoords(fj);
		let ps = Handler.jlines.gemsContainer.parent;
		
		let fp = FlyPoints.init(fi,fj,60);
//		Handler.flyPointsStart(fi,fj,60);
		let cbox = Handler.jlines.getBox(fi,fj);//:CBox
		if (cbox != null) {
			cbox.boosterPLine = true;
			cbox.countBombs = 5;
		};
	};
	
	EndLevelAnimator._stepPointAnimate = function() {
		try { 
			let self = this;
			if (Handler.jlines.stepsPanel.countSteps >= 9) {
				this._addBomb(1,1);this._addBomb(5,1);this._addBomb(8,1);
				this._addBomb(1,5);this._addBomb(4,5);this._addBomb(7,5);
				this._addBomb(1,9);this._addBomb(5,9);this._addBomb(8,9);
				Handler.jlines.checkBombs();
				Handler.jlines.stepsPanel.countSteps -= 9;
				Handler.jlines.stepsPanel.showNumber();
				setTimeout( function(){ self._stepPointAnimate(); },  3000 );
	//			TweenLite.to(new Sprite(),3,{onComplete:_stepPointAnimate});
				/*
				if (Handler.jlines.deltaSteps > 0) Handler.countScore += 60*Handler.jlines.countSteps;
				*/
				
				//_stepPointAnimate();
			} else {
				let cs = Handler.jlines.stepsPanel.countSteps;
				if (cs > 0) this._addBomb(1,1); 
				if (cs > 1) this._addBomb(4,1);
				if (cs > 2) this._addBomb(7,1);
				if (cs > 3) this._addBomb(1,5);
				if (cs > 4) this._addBomb(4,5);
				if (cs > 5) this._addBomb(7,5);
				if (cs > 6) this._addBomb(1,9);
				if (cs > 7) this._addBomb(4,9);
				
				let time = 0;
				if ( cs > 0 ) {
					Handler.jlines.checkBombs();
					time = 3000;
				}; 
				
				Handler.jlines.countSteps = 0;
				setTimeout( function(){ try { self.animation = false; self.callback(); } catch( ex ) { Handler.onErrorCatched(ex); } },  time );
				//TweenLite.to(new Sprite(),time,{onComplete:function (){EndLevelAnimator.animation = false;callback();}});
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	
	EndLevelAnimator.showEndLevel = function( fcallback ) {
		let self = this;
		this.animation = true;
		this.callback = fcallback;
		this._stepPointAnimate();
		
//		setTimeout( function() { self._showWindEndLevel(); }, 5000 );
		/*Handler.jlines.checkBombs();
		if ( ) {
			TweenLite.to( new Sprite(), 1, { onComplete:_shootRemainBalls } );
		} else {
			TweenLite.to( new Sprite(), 2, { onComplete:_showWindEndLevel } );
		}*/
	};
	
	EndLevelAnimator._showWindEndLevel = function(e = null) {
		
	};

