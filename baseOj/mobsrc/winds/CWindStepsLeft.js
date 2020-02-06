	
	"use strict";
	
	let CWindStepsLeft = {};
	
	CWindStepsLeft.newObject = function() {
        this.wind = {};
        return this;
    };
	
	CWindStepsLeft.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
	
		if ( isMobile ) {
			self.backgr = Handler.showImgRect(self.mainGroup, "mobBack.png",0,0, 550,552);
			self.backgr.scale.set( visibleWidth0/self.backgr.width );
			self.cross = Handler.showImgRect(self.mainGroup, "cross.png",210,-210, 36,36);
		} else {
			self.backgr = Handler.showWindBackround( -300, -160, 600, 321, "angleStepsLeft.png", "sideStepsLeft.png",Handler.colorLuaToHex( [240,236,182] , false) )
			self.mainGroup.addChild(self.backgr);
			self.cross = Handler.showImgRect(self.mainGroup, "crossStepsLeft.png",270,-135, 31,26);
		};
		let onTouch = function(evt) {
			self.shutdown(1);
			if ( Winds.getTopWindName() == Winds.WIND_SMALL_ACT_INV ) {
	//			Winds.getWind().shutdown(0);
				Winds.shutdownTopWind(1);
			};
			if ( Winds.getTopWindName() == Winds.WIND_ACT_5_STEPS ) {
	//			Winds.getWind().shutdown(0);
				Winds.shutdownTopWind(1);
			};
			if ( Winds.getTopWindName() == Winds.WIND_GAME ) {
	//			Winds.getWind().shutdown(0);
				Winds.shutdownTopWind(1);
			};
			clearTimeout( Handler.timerOpenAcInv);
		};
		self.cross.onEL( 'pointertap',  onTouch);
		
		let nameTitle = isMobile ? "lableStepsLeftMob.png" : "lableStepsLeft.png";
		let xTitle = isMobile ?    0 :   -5;
		let yTitle = isMobile ? -155 : -110;
		let wTitle = isMobile ?  370 :  247;
		let hTitle = isMobile ?   36 :   26;
		let title = Handler.showImgRect( self.mainGroup, nameTitle, xTitle, yTitle, wTitle, hTitle );
		
		let bon = Handler.showImgRect(self.mainGroup, "bonFStepsLeft.png",0,-10,103,103);
		TweenMax.to( bon, 2, { width: bon.width*1.4, height: bon.height*1.4, repeat: -1, ease: Power0.easeNone, yoyo: true } );
		
		let onButBuy = function( evt ) {
			SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(5); };
			SocialClient.Payment( 11, Langs.payNameBuySteps5,  15 );
			self.shutdown();
		};
		
		let nameButBuy = isMobile ? "butBuyStepsLeftMob.png" : "butBuyStepsLeft.png";
		let yButBuy = isMobile ?  150 : 100;
		let wButBuy = isMobile ?  366 : 364;
		let hButBuy = isMobile ?   69 :  50;
		let butBuy = Handler.showImgRect( self.mainGroup, nameButBuy, 0, yButBuy, wButBuy, hButBuy );
		butBuy.name = "butBuy";
		butBuy.onEL( "pointertap", onButBuy );

		return self.mainGroup;
	};
	
	CWindStepsLeft.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindStepsLeft;