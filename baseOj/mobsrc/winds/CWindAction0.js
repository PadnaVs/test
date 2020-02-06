		
	"use strict";
	
	let CWindAction0 = {};
	
	CWindAction0.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAction0.startup = function( params ) {
		let self = this;
		let showContent = function() {
			self.mainGroup = Handler.newGroup();
			self.mainGroup.x = Handler.contentCenterX;
			self.mainGroup.y = Handler.contentCenterY;
			
			if ( isMobile ) {
				Handler.showImgRect( self.mainGroup, "mobBack.png",                           0, 0, 550, 552 );				
			} else { 
				Handler.showImgRect( self.mainGroup, Consts.DIR_ACTION0 + "backgrAction0.png", 0, 0, 544, 556 );
			};
			
			let xCross = isMobile ? 256 : 246;
			//let yCross = isMobile ?  : -254;
			let cross = Handler.showImgRect( self.mainGroup, "cross.png", xCross, -254, 36, 36 );
			let onCross = function(evt) {
				self.shutdown();
			};
			cross.onEL("pointertap", onCross);
			let luch1  = Handler.showImgRect( self.mainGroup, "luch.png", 0, 0, 561, 548 );
			luch1.alpha = 0.35;
			let luch2  = Handler.showImgRect( self.mainGroup, "luch.png", 0, 0, 561, 548 );
			luch2.alpha = 0.35;
			TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
			TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
			
			if ( isMobile ) {				
				Handler.showImgRect( self.mainGroup, "headMobBack.png",                          0, -260, 348,  63 );
				Handler.showImgRect( self.mainGroup, Consts.DIR_ACTION0 +  "titleNewAction.png", 0, -255, 249,  35 );
			} else { 
				Handler.showImgRect( self.mainGroup, Consts.DIR_ACTION0 + "head.png",         0, -260, 403, 65 );
			};
			
			
			Handler.showImgRect( self.mainGroup, Consts.DIR_ACTION0 + "lableBonAction0.png",   0, -178, 320, 106);
			
			Handler.showImgRect( self.mainGroup, Consts.DIR_ACTION0 + "backgrBonAction0.png", -2,  -70, 493, 102);
			
			let xBon = -162;
			for ( let i = 1; i <=  4; i++ ) {			
				let bon = Handler.showImg(self.mainGroup, Consts.DIR_ACTION0 + "bon"+i+"Action0.png",xBon,-70);
				if ( !isMobile ) {
					bon.width /= 2;
					bon.height /= 2;
				};
				xBon = xBon + bon.width + 30;				
			};
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "lableBuyAction0.png",0,0,440,33);
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "backgrLableInfoAc.png",0,94,493,152);
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "lableInfoAc.png",0,94,464,127);
			
			
			let pointerDownButBuy = function( evt ) {
				let but = evt.target;
				but.y +=  4;
				setTimeout(  function() { but.y -=  4;  },  500 );
				console.log(evt.target.name);	
			};
			
			let pointerUpButBuy = function( evt ) {
				SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(); };
				SocialClient.Payment( 18, Langs.payNameAct90,  90 );
				self.shutdown();
			};
			
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "backgrButBuy.png",0,218,311,69);
			let butBuy = Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION0 + "butBuyAction0.png",0,212,312,65);
			butBuy.onEL("pointerdown", pointerDownButBuy);
			butBuy.onEL("pointerup", pointerUpButBuy);
			if ( isMobile ) self.mainGroup.scale.set( visibleWidth/self.mainGroup.width );
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ACTION0 ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ACTION0 ] = 1;
			
			let listOfImages = [
				"winds/action0/backgrButBuy.png",
				"winds/action0/backgrLableInfoAc.png",
				"winds/action0/bon1Action0.png",
				"winds/action0/bon2Action0.png",
				"winds/action0/bon3Action0.png",
				"winds/action0/bon4Action0.png",
				"winds/action0/butBuyAction0.png",
				"winds/action0/lableBonAction0.png",
				"winds/action0/lableBuyAction0.png",
				"winds/action0/lableInfoAc.png" ];
			if ( !isMobile ) {
				listOfImages.push("winds/action0/backgrBonAction0.png");
				listOfImages.push("winds/action0/head.png");
			} 
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindAction0.shutdown = function() {
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAction0;