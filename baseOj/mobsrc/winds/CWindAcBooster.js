	
	"use strict";
	
	let CWindAcBooster = {};
	
	CWindAcBooster.newObject = function(){
		this.wind = {};
		return this;
	};
	
	CWindAcBooster.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			Handler.showImgRect( self.mainGroup, Consts.DIR_AC_BOOSTER + "backgrAcBooster.png",0,0,279,365 );
			let cross = Handler.showImgRect( self.mainGroup, "cross.png", 125, -158, 36, 36 );
			let onButCross = function(evt) {
				self.shutdown();
			};
			cross.onEL("pointertap",onButCross);
			Handler.showImgRect( self.mainGroup, Consts.DIR_AC_BOOSTER + "lableAcBooster.png", 0, -140, 72, 21 );
			Handler.showImgRect( self.mainGroup, Consts.DIR_AC_BOOSTER + "lable3BonAcBooster.png", 0, -75, 220, 64 );
			let xBon = -78;
			for ( let i = 1; i <= 3; i++)  {
				let bon = Handler.showImgRect( self.mainGroup,Consts.DIR_AC_BOOSTER + "bon"+i+"AcBooster.png", xBon, -4 , 77, 87);
				xBon = xBon + bon.width + 1;
			};
			Handler.showImgRect( self.mainGroup,Consts.DIR_AC_BOOSTER + "lableRushAcBooster.png", 4, 75, 146, 43 );
			let butBuy= Handler.showImgRect( self.mainGroup,Consts.DIR_AC_BOOSTER + "butBuyAcBooster.png", 1, 135, 238, 58 );
			let touchBut = function(evt) {
				SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(); };
				SocialClient.Payment( 21, Langs.payAcBooster,  36 );
				self.shutdown();
			};
			butBuy.on("pointertap",touchBut);
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_AC_BOOSTER ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_AC_BOOSTER ] = 1;
				let listOfImages = [
					"winds/acBooster/backgrAcBooster.png",
					"winds/acBooster/lableAcBooster.png",
					"winds/acBooster/lable3BonAcBooster.png",
					"winds/acBooster/bon1AcBooster.png",
					"winds/acBooster/bon2AcBooster.png",
					"winds/acBooster/bon3AcBooster.png",
					"winds/acBooster/lableRushAcBooster.png",
					"winds/acBooster/butBuyAcBooster.png"
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindAcBooster.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAcBooster;