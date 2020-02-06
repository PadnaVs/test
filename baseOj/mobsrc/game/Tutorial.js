

	"use strict";

	let Tutorial = {};
	Tutorial.loadedSteps = [];
	Tutorial._mcPLighting;
	Tutorial._tutStep1Num = 0;
	
	Object.defineProperty( Tutorial, 'tutStepNum', {
		get: function(){ return this._tutStep1Num; },
		set: function(val) { this._tutStep1Num = val; }
	});
	
	Tutorial.checkClickStep2PLine = function( isPLine ) {
		return (this._tutStep1Num != 31 || isPLine);
	};
	
	Tutorial.checkShowStep3 = function() {
		if (this._tutStep1Num == 31) {
			let self = this;
//			TweenMax.to(new Sprite(),0.5,{onComplete:Tutorial.tutStep3Show});
			setTimeout( function(){ self.tutStep3Show(); } , 500 );
		};
	};
	
	Tutorial.removeTuts = function(evt=null) {
		try { 
			let self = this;
			if ( this.animGr ) this.animGr.removeSelf();
			if (this._tutStep1Num == 1) {
				let ts1 = Handler.lights.getChildByName('tutStep11');
				if (ts1) Handler.lights.removeChild(ts1);
				this._tutStep1Num = 2;
				setTimeout( function() { self.tutStep2Show }, 500 );
	//			TweenMax.to(new Sprite(),0.5,{ onComplete: });
			} else {
				if (this._tutStep1Num == 2) {
					let ts2 = Handler.lights.getChildByName('tutStep12');
					if (ts2) Handler.lights.removeChild(ts2);
					this._tutStep1Num = 31;
				}  else {
					if (this._tutStep1Num == 3) {
						let ts3 = Handler.lights.getChildByName('tutStep31');
						if (ts3) Handler.lights.removeChild(ts3);
						this._tutStep1Num = 32;
						let self = this;
						//setTimeout(function() { self.tutStep32Show(); }, 2000);
	//					TweenMax.to(new Sprite(),2,{onComplete:});
					}  else {
						if (this._tutStep1Num == 32) {
							let ts32 = Handler.lights.getChildByName('tutStep32');
							if (ts32) Handler.lights.removeChild(ts32);
							this._tutStep1Num = 4;
						} else {
							if (this._tutStep1Num == 4) {
								let ts4 = Handler.lights.getChildByName('tutStep14');
								if (ts4) Handler.lights.removeChild(ts4);
								this._tutStep1Num = 41;
								let self = this;
								setTimeout(function() { self.tutStep42Show(); }, 2000);
	//							TweenMax.to(new Sprite(),2,{onComplete:Tutorial.});
							} else {
								if (this._tutStep1Num == 42) {
									let ts42 = Handler.lights.getChildByName('tutStep42');
									if (ts42) Handler.lights.removeChild(ts42);
									this._tutStep1Num = 5;
								} else {
									if (this._tutStep1Num == 5) {
										let ts5 = Handler.lights.getChildByName('tutStep5');
										if (ts5) Handler.lights.removeChild(ts5);
										this._tutStep1Num = 6;
									}
								}
							}
						}
					}
				}
			}
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	}
	Tutorial.tutStep1Show = function () {
		try { 
			let self = this;
			let showContent = function() {
				let tmpBox;
				for (let i=0; i< self._cx; i++) {
					for (let j=0; j< self._cy; j++ ) {
						tmpBox = Handler.jlines.getBox(i,j);
						if (tmpBox.color == 3) {
							self._eraseBox(i,j);
							self._addNewBox(i,j,2);
						}
					}
				}
				self._eraseBox(3,3);
				self._eraseBox(3,4);
				self._eraseBox(4,3);
				
				self._addNewBox(3,3,3);
				self._addNewBox(3,4,3);
				self._addNewBox(4,3,3);
				
				let points = [  -Math.floor(Consts.coordsWidth/2), -Math.floor(Consts.coordsHeight/2), 
								425, -Math.floor(Consts.coordsHeight/2), 
								425, 525, 
								175, 525,
								175, 175,
								225, 175,
								225, 125,
								125, 125,
								125, 225,
								175, 225,
								175, 525,
								-Math.floor(Consts.coordsWidth/2), 525
								];
				let tutStep1 = new PIXI.Graphics();
				tutStep1.interactive = true;
				tutStep1.beginFill( 0x000000, 0.35 );
				tutStep1.drawPolygon(points);
				tutStep1.endFill();
				//Embeds.tutorialStep1();
				tutStep1.name = 'tutStep11';
				Handler.lights.addChild( tutStep1 );
				self._tutStep1Num = 1;
				let ar1;
				let ar2;
				let ar3;
				let arPointer;
				self.animGr;
				let showAnim = function( parent, ix , iy ) {
					
					self.animGr = Handler.newGroup( parent );
					ar1 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix, iy + 50, 23, 22);
					ar2 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix, iy, 23, 22);
					ar2.angle = 90;
					ar3 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix + 50, iy, 23, 22);
					ar3.angle = 90;

					TweenMax.to( [ar1, ar2, ar3], 0.5, {  alpha: 0.5, ease: Power0.easeNone, repeat: -1, yoyo: true} );
					let arPointerX = ix + 6;
					let arPointerY = iy + 64;
					arPointer = Handler.showImgRect( self.animGr,  'arrow.png', arPointerX, arPointerY, 24, 34);
					let speedMove = 1;
					
					let movePointer = function(){
						try {
							arPointer.x = arPointerX;
							arPointer.y = arPointerY;
							let moveRight = function (){
								TweenMax.to( arPointer, speedMove, { x : ix + 56, ease: Power0.easeNone, onComplete: movePointer });
							};
							TweenMax.to( arPointer, speedMove, { y : (( iy + 64 ) - 50), ease: Power0.easeNone, onComplete: moveRight });
						} catch ( ex ) {
							Handler.onErrorCatched(ex);
						};
					};
					movePointer();
				};
				Handler.showImgRect( tutStep1, Consts.DIR_TUTORIAL + 'lableTutorialStep1Mob.png', 198, 325, 437, 139 );
				showAnim( Handler.lights, 150, 150 );
				
				if ( !isMobile ) self.animGr.interactive = true;
				self.animGr.on('pointerover', function() { self.animGr.isVisible = false; });
				tutStep1.on('pointerover', function() { self.animGr.isVisible = true; });
			};
			
			if ( self.loadedSteps[ 0 ] == null ) {
				 self.loadedSteps[ 0 ] = 1;
					let listOfImages = [
						"tutorial/lableTutorialStep1Mob.png"
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	}
	Tutorial.tutStep2Show = function () {
		try {
			let self = this;
			let showContent = function() {
				/*let tmpBox:CBox;
				for (let i:int=0;i<_cx;i++) {
					for (let j:int=0;j<_cy;j++) {
						tmpBox = getBox(i,j);
						if (tmpBox.color == 3) {
							_eraseBox(i,j);
							_addNewBox(i,j,2);
						}
					}
				}
				_eraseBox(1,6);
				_eraseBox(1,7);
				_eraseBox(2,5);
				_eraseBox(2,6);
				_eraseBox(3,6);
				_eraseBox(3,7);
				_eraseBox(4,6);
				
				_addNewBox(1,6,3);
				_addNewBox(1,7,3);
				_addNewBox(2,5,3);
				_addNewBox(2,6,3);
				_addNewBox(3,6,3);
				_addNewBox(3,7,3);
				_addNewBox(4,6,3);*/
				
				let points = [    -Math.floor(Consts.coordsWidth), -Math.floor(Consts.coordsHeight/2), 
								425, -Math.floor(Consts.coordsHeight/2), 
								425, 525, 
								-Math.floor(Consts.coordsWidth/2), 525
								];
								
				let tutStep2 = new PIXI.Graphics(); //Embeds.tutorialStep2();
				
				tutStep2.interactive = true;
				tutStep2.buttonMode = true;
				tutStep2.beginFill( 0x000000, 0.35 );
				tutStep2.drawPolygon(points);
				tutStep2.endFill();
				tutStep2.name = 'tutStep12';
				Handler.showImgRect( tutStep2, Consts.DIR_TUTORIAL + 'lableTutorialStep2Mob.png', 200, 175, 366, 250 );
				Handler.showImgRect( tutStep2, 'butContinueEndLevelMob.png', 200, 400, 191, 62 );
				
				//tutStep2.addChild(  );
				Handler.lights.addChild(tutStep2);
				self._tutStep1Num = 2;
				tutStep2.on('pointerdown', function() { self.removeTuts(); });
			};
			if ( self.loadedSteps[ 1 ] == null ) {
				 self.loadedSteps[ 1 ] = 1;
					let listOfImages = [
						"tutorial/lableTutorialStep2Mob.png"
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	}
	Tutorial.tutStep3Show = function() {
		try {
			let self = this;
			let showContent = function() {
				let tmpBox;
				/*for (let i:int=0;i<_cx;i++) {
					for (let j:int=0;j<_cy;j++) {
						tmpBox = getBox(i,j);
						if (tmpBox.color == 3) {
							_eraseBox(i,j);
							_addNewBox(i,j,2);
						}
					}
				}*/
				self._eraseBox(3,3);
				self._eraseBox(3,4);
				self._eraseBox(4,3);
				self._eraseBox(5,3);
				self._eraseBox(6,3);
				
				self._addNewBox(3,3,3);
				self._addNewBox(3,4,3);
				self._addNewBox(4,3,3);
				self._addNewBox(5,3,3);
				self._addNewBox(6,3,3);
				
				let points = [  -Math.floor(Consts.coordsWidth), -Math.floor(Consts.coordsHeight/2), 
															425, -Math.floor(Consts.coordsHeight/2), 
															425, 525, 					                            
															325, 525,
															325, 125,
															125, 125,
															125, 225,
															175, 225,
															175, 175,
															325, 175,
															325, 525,
								-Math.floor(Consts.coordsWidth/2), 525
							 ];
				
				let tutStep3 = new PIXI.Graphics(); //Embeds.tutorialStep2();
				
				tutStep3.interactive = true;
				tutStep3.buttonMode = true;
				tutStep3.beginFill( 0x000000, 0.35 );
				tutStep3.drawPolygon(points);
				tutStep3.endFill();//Embeds.tutorialStep3();
				tutStep3.name = 'tutStep31';
				Handler.lights.addChild(tutStep3);
				
				self._tutStep1Num = 3;
				Handler.showImgRect( tutStep3, Consts.DIR_TUTORIAL + 'lableTutorialStep3Mob.png', 198, 300, 440, 92 );
				let ar1;
				let ar2;
				let ar3;
				let ar4;
				let ar5;
				let arPointer;
				self.animGr = null;
				
				let showAnim = function( parent, ix , iy ) {		
					self.animGr = Handler.newGroup( parent );
					ar1 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix, iy + 50, 23, 22);
					ar2 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix, iy, 23, 22);
					ar2.angle = 90;
					ar3 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix + 50, iy, 23, 22);
					ar3.angle = 90;
					ar4 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix + 100, iy, 23, 22);
					ar4.angle = 90;
					ar5 = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix + 150, iy, 23, 22);
					ar5.angle = 90;

					TweenMax.to( [ar1, ar2, ar3,ar4,ar5], 0.5, {  alpha: 0.5, ease: Power0.easeNone, repeat: -1, yoyo: true} );
					let arPointerX = ix + 6;
					let arPointerY = iy + 64;
					arPointer = Handler.showImgRect( self.animGr, 'arrow.png', arPointerX, arPointerY, 24, 34);
					let speedMove = 1;
					let speedMoveRight = 2.5;
					
					let movePointer = function(){
						try {
							arPointer.x = arPointerX;
							arPointer.y = arPointerY;
							let moveRight = function () {
								TweenMax.to( arPointer, speedMoveRight, { x : ix + 156, ease: Power0.easeNone, onComplete: movePointer });
							};
							TweenMax.to( arPointer, speedMove, { y : (( iy + 64 ) - 50), ease: Power0.easeNone, onComplete: moveRight });
						} catch ( ex ) {
							Handler.onErrorCatched(ex);
						};
					};
					movePointer();
				};
				showAnim( Handler.lights,150,150);
				if ( !isMobile ) self.animGr.interactive = true;
				self.animGr.on('pointerover', function() { self.animGr.isVisible = false; });
				tutStep3.on('pointerover', function() { self.animGr.isVisible = true; });
			};
			if ( self.loadedSteps[ 2 ] == null ) {
				 self.loadedSteps[ 2 ] = 1;
					let listOfImages = [
						"tutorial/lableTutorialStep3Mob.png"
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
	//		let mcUk = tutStep3.getChildByName('mcUkazatel');
	//		mcUk.onEL(MouseEvent.MOUSE_OVER,function(evt){mcUk.visible=false;});
	//		mcUk.filters = [ new GlowFilter(0xffffff) ];
	//		let tut3Fon = tutStep3.getChildByName('tut3Fon');
	//		tut3Fon.onEL(MouseEvent.MOUSE_OVER,function(evt){mcUk.visible=true;});
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	/*Tutorial.tutStep32Show = function () {
		try { 
			let self = this;
			let showContent = function() {
				let points = [    -Math.floor(Consts.coordsWidth), -Math.floor(Consts.coordsHeight/2), 
								425, -Math.floor(Consts.coordsHeight/2), 
								425, 525, 
								-Math.floor(Consts.coordsWidth/2), 525
								];
								
				let tutStep3 = new PIXI.Graphics(); 
				
				tutStep3.interactive = true;
				tutStep3.buttonMode = true;
				tutStep3.beginFill( 0x000000, 0.35 );
				tutStep3.drawPolygon(points);
				tutStep3.endFill();//Embeds.tutorialStep32();
				tutStep3.name = 'tutStep32';
				Handler.lights.addChild(tutStep3);
				let arrowsPointerTasks = [];
				for(let i = 0; i <= 3; i++){
					arrowsPointerTasks[i] = Handler.showImgRect( tutStep3, 'pointerTasksTutorial.png', 20, 150+(39*i), 55, 39 );
					TweenMax.to(arrowsPointerTasks[i], 0.45,{ x: 8, ease: Power0.easeNone, repeat: -1, yoyo: true });
				};
				Handler.showImgRect( tutStep3, Consts.DIR_TUTORIAL + 'lableTutorialStep32.png', 200, 75, 403, 92 );
				Handler.showImgRect( tutStep3, 'butNext.png', 200, 210, 166, 60 );
				self._tutStep1Num = 32;
				tutStep3.on('pointerdown', function() { self.removeTuts(); });
				
			};
			if ( self.loadedSteps[ 3 ] == null ) {
				 self.loadedSteps[ 3 ] = 1;
					let listOfImages = [
						"tutorial/lableTutorialStep32.png"
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	}*/
	Tutorial.tutStep42Show = function () {
		try { 
			let self = this;
			let showContent = function() {
				let points = [    -Math.floor(Consts.coordsWidth), -Math.floor(Consts.coordsHeight/2), 
								425, -Math.floor(Consts.coordsHeight/2), 
								425, 525, 
								-Math.floor(Consts.coordsWidth/2), 525
								];
								
				let tutStep4 = new PIXI.Graphics(); 
				
				tutStep4.interactive = true;
				tutStep4.buttonMode = true;
				tutStep4.beginFill( 0x000000, 0.35 );
				tutStep4.drawPolygon(points);
				tutStep4.endFill();
				Handler.showImgRect( tutStep4,  Consts.DIR_TUTORIAL + 'lableTutorialStep42Mob.png', 200, 150, 443, 272 );
				Handler.showImgRect( tutStep4,  'butContinueEndLevelMob.png', 200, 400, 191, 62 );
				tutStep4.name = 'tutStep42';
				Handler.lights.addChild(tutStep4);
				self._tutStep1Num = 42;
				tutStep4.on('pointertap', function() { self.removeTuts() } );
			};
			if ( self.loadedSteps[ 4 ] == null ) {
				 self.loadedSteps[ 4 ] = 1;
					let listOfImages = [
						"tutorial/lableTutorialStep42Mob.png"
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	}
	Tutorial.tutStep4Show = function () {
		try {
			let self = this;
			let showContent = function() {
				self._eraseBox(1,4);
				self._eraseBox(1,3);
				self._eraseBox(2,3);
				self._eraseBox(3,3);
				self._eraseBox(4,3);
				self._eraseBox(5,3);
				
				self._addNewBox(1,4,3);
				self._addNewBox(1,3,3);
				self._addNewBox(2,3,3);
				self._addNewBox(3,3,3);
				self._addNewBox(4,3,3);
				self._addNewBox(5,3,3);
				
				let points = [    -Math.floor(Consts.coordsWidth), -Math.floor(Consts.coordsHeight/2), 
								425, -Math.floor(Consts.coordsHeight/2), 
								425, 525, 
								275, 525,
								275, 125,
								 25, 125,
								 25, 225,
								 75, 225,
								 75, 175,
								275, 175,
								275, 525,
								-Math.floor(Consts.coordsWidth/2), 525
							 ];
				let tutStep4 = new PIXI.Graphics();
				tutStep4.interactive = true;
				tutStep4.beginFill(0x000000, 0.35);
				tutStep4.drawPolygon(points);
				tutStep4.endFill();
				tutStep4.name = 'tutStep14';
				Handler.lights.addChild(tutStep4);
				let ars = [];
				/*let ar1;
				let ar2;
				let ar3;*/
				let arPointer;
				self.animGr = null;
				let showAnim = function( parent, ix , iy ) {		
					self.animGr = Handler.newGroup( parent );
					ars[0] = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix, iy + 50, 23, 22);
					TweenMax.to( ars[0], 0.5, {  alpha: 0.5, ease: Power0.easeNone, repeat: -1, yoyo: true} );
					for( let i = 0; i <= 4; i++){
						ars[i+1] = Handler.showImgRect( self.animGr,  'arrowStepMouse.png', ix + ( i*50 ) , iy, 23, 22);
						ars[i+1].angle = 90;
						TweenMax.to( ars[i+1], 0.5, {  alpha: 0.5, ease: Power0.easeNone, repeat: -1, yoyo: true} );
					};
					let arPointerX = ix + 6;
					let arPointerY = iy + 64;
					arPointer = Handler.showImgRect( self.animGr,  'arrow.png', arPointerX, arPointerY, 24, 34);
					let speedMove = 1;
					let speedMoveRight = 3;
					let movePointer = function(){
						arPointer.x = arPointerX;
						arPointer.y = arPointerY;
						let moveRight = function (){
							TweenMax.to( arPointer, speedMoveRight, { x : ix + 200, ease: Power0.easeNone, onComplete: movePointer });
						};
						TweenMax.to( arPointer, speedMove, { y : (( iy + 64 ) - 50), ease: Power0.easeNone, onComplete: moveRight });
					};
					movePointer();
				};
				showAnim( Handler.lights, 50, 150);
				self._tutStep1Num = 4;
				Handler.showImgRect(tutStep4, Consts.DIR_TUTORIAL + 'lableTutorialStep4Mob.png', 200, 310, 362, 134);
				if ( !isMobile ) self.animGr.interactive = true;
				self.animGr.on('pointerover', function() { self.animGr.isVisible = false; });
				tutStep4.on('pointerover', function() { self.animGr.isVisible = true; });
			};
			if ( self.loadedSteps[ 5 ] == null ) {
				 self.loadedSteps[ 5 ] = 1;
					let listOfImages = [
						"tutorial/lableTutorialStep4Mob.png",
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
	//		let mcUk = tutStep4.getChildByName('mcUkazatel');
	//		mcUk.onEL(MouseEvent.MOUSE_OVER,function(evt){mcUk.visible=false;});
	//		mcUk.filters = [ new GlowFilter(0xffffff) ];
	//		let tut3Fon = tutStep4.getChildByName('tut4Fon');
	//		tut3Fon.onEL(MouseEvent.MOUSE_OVER,function(evt){mcUk.visible=true;});
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	}
	Tutorial.tutStep5Show = function() {
		try { 
			let self = this;
			let showContent = function() {
				let points = [    -Math.floor(Consts.coordsWidth), -Math.floor(Consts.coordsHeight/2), 
								425, -Math.floor(Consts.coordsHeight/2), 
								425, 525, 
								325,525,
								325,175,
								175,175,
								175,325,
								325,325,
								325,525,
								-Math.floor(Consts.coordsWidth/2), 525
							 ];
							 
				let tutStep5 = new PIXI.Graphics();//Embeds.tutorialStep5();
				tutStep5.interactive = true;
				tutStep5.beginFill(0x000000, 0.35);
				tutStep5.drawPolygon(points);
				tutStep5.endFill();
				tutStep5.name = 'tutStep5';
				Handler.lights.addChild(tutStep5);
				self._tutStep1Num = 5;
				tutStep5.on('pointertap', function(){ self.removeTuts() });
				
				Handler.showImgRect(tutStep5, Consts.DIR_TUTORIAL + 'lableTopTutorialStep5Mob.png',  185,60, 373,111);
				Handler.showImgRect(tutStep5, Consts.DIR_TUTORIAL + 'lableDownTutorialStep5Mob.png', 175,368, 384,76);
				Handler.showImgRect(tutStep5, 'butContinueEndLevelMob.png', 300, 440, 191, 62 );
				
			};
			if ( self.loadedSteps[ 6 ] == null ) {
				 self.loadedSteps[ 6 ] = 1;
					let listOfImages = [
						"tutorial/lableTopTutorialStep5.png",
						"tutorial/lableDownTutorialStep5.png"
					];
					ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	
	Tutorial._eraseBox = function(fi,fj) {
		let tmpBox1 = Handler.jlines.gemsContainer.getChildByName('cn'+ Handler.jlines.cv(fi)+''+ Handler.jlines.cv(fj));
		Handler.jlines.gemsContainer.removeChild(tmpBox1);
	}
	Tutorial.getBox = function(fi,fj) {
		return Handler.jlines.getBox(fi,fj);
	}
	Tutorial._addNewBox = function (fi,fj,fcolor = -1) {
		return Handler.jlines.addNewBox(fi,fj,fcolor);
	}
	Object.defineProperty( Tutorial, "_cx", {
	    get: function(   ) { return Handler.jlines.cx; },
	});
	Object.defineProperty( Tutorial, "_cy", {
	    get: function(   ) { return Handler.jlines.cy; },
	});		
