	
	"use strict";
	
	let CWindEndLevel = {};
	
	CWindEndLevel.newObject = function() {
        this.winds = {};
        return this;
    };
	
	CWindEndLevel.showPoints = function() {
		this.minCP += 9;
		if ( this.imgP ) this.imgP.destroy();
		if ( this.minCP >= this.points ) this.minCP = this.points;
		this.imgP = Handler.showText(this.mWind, this.minCP, this.xNumPoints, this.yNumPoints, this.textParams);
		if ( this.minCP == this.points ) clearInterval( this.timerPoints );
	};
	
	CWindEndLevel.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup( Handler.gWinds );
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		self.mainGroup.sortableChildren = true;
		self.mWind = Handler.newGroup(self.mainGroup);
		//backgr
		let nameBackgrM = isMobile ? "mobBackHight.png" : "backgrEndLevelWindM.png";
		let wBackgrM = isMobile ? 450 : 427;
		let hBackgrM = isMobile ? 714 : 584;
		Handler.showImgRect(self.mWind,nameBackgrM,0,0,wBackgrM,hBackgrM);
		//light
		let yLuch = isMobile ? -95 : -45;
		let luch1 = Handler.showImgRect(self.mWind,"luch.png", 0, yLuch, 379,370);
		let luch2 = Handler.showImgRect(self.mWind,"luch.png", 0, yLuch, 379,370);
		luch1.alpha = 0.35;
		luch2.alpha = 0.35;
		TweenMax.to( luch1, 10, { angle:  360, ease: Power0.easeNone, repeat: -1 } );
		TweenMax.to( luch2, 10, { angle: -360, ease: Power0.easeNone, repeat: -1 } );
		if ( isMobile ) {
			Handler.showImgRect(self.mWind,"headMobBack.png",-10,-335,348,63);
		}
		//cross
		let xCross = isMobile ?  208 :  195;
		let yCross = isMobile ? -336 : -270;
		let cross = Handler.showImgRect(self.mWind,"cross.png", xCross, yCross,36,36);
		cross.onEL("pointerdown", function(evt) { clearInterval( this.timerPoints ); self.shutdown(); });
		//level
		let yTitle = isMobile ? -335 : -255;
		Handler.showImgRect(self.mWind,"lableLevel.png",-60, yTitle,171,38);
		let levelNumber = parseInt(Head.levelName.substr(1));;
		let levelImg = Handler.showNumber('w',95, yTitle,levelNumber,20,28,self.mWind,'',0);
		levelImg.x -= Math.floor(levelImg.width/2);
		//star
		let starArray = [];
		let starKor_X =    [ -160,  -95, -155, -140, -30, -160, 160, 115, 150, 170,  115 ];
		let starKor_Y =    [ -200, -118,   40,  150, 150,  240, 215, 135,  75,  30, -212 ];
		let starKor_YMob = [ -250, -168,  -10,  100, 100,  190, 165,  95,  25, -20, -262 ];
		for ( let i = 0; i <= starKor_X.length; i++ ) {
			starArray[i] = Handler.showImgRect(self.mWind,"star.png",starKor_X[i],isMobile ? starKor_YMob[i] : starKor_Y[i],40,38);
			TweenMax.to( starArray[i], Consts.TIME_ROT_START/1000, { angle: 90, ease: Power0.easeNone, repeat: -1, yoyo: true} );
		}
		//lableWin
		let yLableWin = isMobile ? -225 : -175;
		let lableWin = Handler.showImgRect(self.mWind,"lableWinEndLevel.png", 0, yLableWin, 348,90);
		//starWin
		let countStar = params.stars;
		let xStartStar = -133;
		let showStar = true;
		let shYBackgrStar = isMobile ? -117 : -45;// isMobile shElems
		for( let i = 1; i <= 3; i++ ) { 	
			let numStar = i;
			if ( i == 3 ) { numStar = 1; };
			let backgrStar = Handler.showImg(self.mWind,"backgrStarRt"+numStar+".png",xStartStar,shYBackgrStar);
			if ( !isMobile) {
				backgrStar.width  /= 2;
				backgrStar.height /= 2;
			};
			if ( i <= countStar ) {
				let starRt = Handler.showImg(self.mWind,'starRt'+numStar+'.png',xStartStar,shYBackgrStar);
				if ( !isMobile ) {
					starRt.width  /= 2;
					starRt.height /= 2;
				};
			}
			xStartStar = xStartStar + 130;
		}
		//fields achievements
		let xFieldPoint = isMobile ? -95 : -15;
		let yFieldPoint = isMobile ?  10 : 60;
		
		let xFieldIgnots = isMobile ? 90 : -15;
		let yFieldIgnots = isMobile ? 10 : 110;
		
		Handler.showImgRect(self.mWind,"fieldPoint.png",xFieldPoint,yFieldPoint,157,46);
		Handler.showImgRect(self.mWind,"fieldIgnots.png",xFieldIgnots,yFieldIgnots,158,34);
		
		this.points = params.points;
		this.minCP = 0;

		this.ingnots = params.coins;
		
		this.textParams = {
			fontFamily: 'Arial',
			fontSize: 26,
			fontWeight: 'bold',
			fill: '#B04001',
			stroke: '#F3EFB8',
			lineJoin: 'round',
			strokeThickness: 3,
		};
		
		self.xNumPoints = isMobile ? -83 : 0;
		self.yNumPoints = isMobile ?  10 : 60;
		this.timerPoints = setInterval( function(){ self.showPoints() }, 10 );
		
		let xNumIgnots = isMobile ?  110 :  12;
		let yNumIgnots = isMobile ?    9 : 109;
		let imgI = Handler.showText(self.mWind, this.ingnots, xNumIgnots, yNumIgnots, this.textParams);
		imgI.x = Math.floor( imgI.x - imgI.width/2 );
		
		if ( !isMobile ) {
			Handler.showImgRect(self.mWind,"lablePointsEndLevel.png",120,60,83,18);
			Handler.showImgRect(self.mWind,"lableIgnots.png",130,110,107,18);
		}
		
		//butContinue
		if ( !isMobile ) Handler.showImgRect(self.mWind,"backgrButContinueEndLevel.png", 0, 210, 243, 70);
		let pointerDownButContinue = function( evt ) {
			//TweenMax.to(evt.target,  0.2, { y: evt.target.y+ 4 });
			let but = evt.target;
			but.y +=  5;
			setTimeout(  function() { but.y -=  4;  },  500 );
			console.log(evt.target.name);
		};
		let pointerUpButContinue = function( evt ) {
			self.shutdown();
			
			let nextLevelNum = parseInt( Head.levelName.substr(1) ) + 1;
			let nlev = 'l'+Handler.cv( nextLevelNum );
			Handler.onStartLevelClick( { target: { name: nlev } } );
		};
		
		let nameButContinue = isMobile ? "butContinueEndLevelMob.png" : "butContinueEndLevel.png";
		let xButContibue = isMobile ?   90 :   0;
		let yButContibue = isMobile ?  251 : 205;
		let wButContibue = isMobile ?  191 : 242;
		let hButContibue = isMobile ?   62 :  66;
		let butContinue = Handler.showImgRect(self.mWind, nameButContinue, xButContibue, yButContibue, wButContibue, hButContibue);
		butContinue.onEL( 'pointerdown', pointerDownButContinue );
		butContinue.onEL( 'pointerup',   pointerUpButContinue );
		//tellFr
		let xCheckBox = isMobile ?  30 : -38;
		let yCheckBox = isMobile ? 315 : 260;
		let checkBox = Handler.showImgRect(self.mWind,"checkBox.png",xCheckBox,yCheckBox,19,19);
		let onCheckBox = function() { 
			if ( self.checkMark.visible ) {
				self.checkMark.visible = false;
			}else{
				self.checkMark.visible = true;
			}
		}
		checkBox.onEL('pointerdown', onCheckBox );
		self.checkMark = Handler.showImgRect(self.mWind,"marker.png",xCheckBox+3,yCheckBox - 5,30,24);
		
		let lableTellFrName = isMobile ? "lableTellFrEndLevelMob.png" : "lableTellFrEndLevel.png";
		let wLableTellFr = isMobile ? 162 : 195;
		let hLableTellFr = isMobile ?  25 :  16;
		let xLableTellFr = isMobile ? 125 :  75;
 		let lableTellFr = Handler.showImgRect(self.mWind,lableTellFrName,xLableTellFr,yCheckBox+2,wLableTellFr,hLableTellFr);
		
		self.pWind = Handler.newGroup();	
		self.mainGroup.addChild(self.pWind);
		
		if ( !isMobile ) { 
			Handler.showImgRect(self.pWind,"backgrEndLevelWindP.png",0,0,383,447);
			self.pWind.x = 182;
			self.mWind.toFront();
		};
		
		let nameLableNewElem = isMobile ? "lablePuzzleNewElemMob.png" : "lablePuzzleNewElem.png";
		let xLableNewElem = isMobile ?   0 : 108;
		let yLableNewElem = isMobile ?  76 : 155;
		let wLableNewElem = isMobile ? 399 : 163;
		let hLableNewElem = isMobile ?  26 :  98;
		Handler.showImgRect(self.pWind, nameLableNewElem, xLableNewElem, yLableNewElem, wLableNewElem, hLableNewElem);
		
		let nameLableGetPrize = isMobile ? "lableGetPrizeMob.png" : "lableGetPrize.png";
		let xLableGetPrize = isMobile ? -122 : 108;
		let yLableGetPrize = isMobile ?  146 : 155;
		let wLableGetPrize = isMobile ?  164 : 163;
		let hLableGetPrize = isMobile ?   77 :  98;
		Handler.showImgRect(self.pWind, nameLableGetPrize, xLableGetPrize, yLableGetPrize, wLableGetPrize, hLableGetPrize);
		
		let xBackgrPuzzleElem = isMobile ?  16 : 108;
		let yBackgrPuzzleElem = isMobile ? 144 : -27;
		Handler.showImgRect(self.pWind,"backgrPuzzleElem.png", xBackgrPuzzleElem, yBackgrPuzzleElem,102,102);
		
		let numPuzzle = Math.floor( ( User.puzzlenum - 1 ) / 81 ) + 1;
		let countPuz = ( User.puzzlenum - 1 ) % 81 + 1;
		let xPuzMask = isMobile ? -33 :  58;
		let yPuzMask = isMobile ?  96 : -76;
        let puzMask = Handler.showRect( self.pWind,xPuzMask+50, yPuzMask+49,100,100, [1,1,1], 1 );
        self.puzzleImageGroup = Handler.showPuzzleImageAndFront( self.pWind, numPuzzle, countPuz );
		
		let puzFrontGroup = self.puzzleImageGroup.getChildByName( 'puzFrontGroup' );
		let lastOpened = puzFrontGroup.getChildByName( 'p'+countPuz );

		let x1 = -lastOpened.x;
		let y1 = -lastOpened.y;

		if ( x1 > 0 ) x1 = 0;
		if ( y1 > 0 ) y1 = 0;
		if ( x1 < -320 ) x1 = -320;
		if ( y1 < -320 ) y1 = -320;
		
		let showPuzzle = function () {
			Winds.show( Winds.WIND_PUZZLE );
		};
		let nameButPuzzle = isMobile ? "butShowPuzzleMob.png" : "butShowPuzzle.png";
		let xButPuzzle = isMobile ? 136 : 108;
		let yButPuzzle = isMobile ? 150 :  60;
		let wButPuzzle = isMobile ? 132 : 140;
		let hButPuzzle = isMobile ?  56 :  59;
		let butShowPuzzle = Handler.showImgRect(self.pWind, nameButPuzzle, xButPuzzle, yButPuzzle, wButPuzzle, hButPuzzle);
		butShowPuzzle.onEL('pointertap',showPuzzle);
		if ( isMobile ) {
			self.puzzleImageGroup.translate( x1-43, y1+84	 );
		} else {
			self.puzzleImageGroup.translate( x1+48, y1-87 );
		};
		//self.puzzleImageGroup.translate( 0, 0 );
		self.puzzleImageGroup.mask = puzMask;
		//------------------------//
		//-------WindReting-------//
		//------------------------//
		
		let showRating = function( evt ) {
			if ( !Handler.visibleRt ) {
				self.windRating = CWindSmallRating.showWindRating( { levelNumber: levelNumber } );
				self.windRating.x = self.windRating.width/2 + visibleWidth/2;
				self.windRating.y += 4;
				let shRtX = self.windRating.x - 200;
				Handler.toFront( self.windRating );
				self.mainGroup.addChild(self.windRating);
				TweenMax.to( self.windRating, 0.8, { x: shRtX } );
			};
		};
		
		if ( isMobile ) { 
			lableWin.y -= 12;
			luch1.y -= 12;
			luch2.y -= 12;
			let butShowRating = Handler.showImgRect(self.mWind,"butShowRatingEndLevelMob.png",-110,250,145,62);
			butShowRating.onEL("pointertap",showRating);
			self.mWind.y += 4;
		} else {
			self.windReting = CWindSmallRating.showWindRating( { levelNumber: levelNumber } );
			self.mainGroup.addChild(self.windReting);
			TweenMax.to( self.windReting, 2, { x:-250 } );
		}
		return self.mainGroup;
	}
	
	CWindEndLevel.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( this.checkMark.isVisible ) {
				let txt = "Ещё одни уровень пройден! А ты сможешь? Заходи в игру и попробуй!";
				let imgUrl = Config.BASE_URL + "wall492x364.jpg";
				SocialClient.MediaTopicPost( txt, imgUrl );
			}
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindEndLevel;