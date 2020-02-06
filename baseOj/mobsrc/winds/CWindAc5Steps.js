		
	"use strict";
	
	let CWindAc5Steps = {};
	
	CWindAc5Steps.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAc5Steps.startup = function( parent ) {
		let self = this;
		self.mainGroup = Handler.newGroup( parent );
		self.mainGroup.x = isMobile ? 72 :   0;
		self.mainGroup.y = isMobile ? 318 : 283;
		let showContent = function() {
			let nameBackgr  = isMobile ? "backgrAc5StepsMob.png" : "backgrAc5Steps.png";
			let wBackgr  = isMobile ? 308 : 402;
			let hBackgr  = isMobile ?  81 :  42;
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + nameBackgr, 0, 0,wBackgr, hBackgr);
			if ( !isMobile ) Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + "lableSteps.png",-70,0,252,25);
			let nameButBuy = isMobile ? "butBuyAc5StepsMob.png" : "butBuyAc5Steps.png";
			let wButBuy = isMobile ? 167 : 230;
			let hButBuy = isMobile ?  65 :  43;
			let xButBuy = isMobile ?  62 : 172;
			let butBuy = Handler.showImgRect(self.mainGroup, Consts.DIR_AC5STEPS + nameButBuy,xButBuy,0,wButBuy,hButBuy);
			let xCross = isMobile ? -142 : 285;
			let yCross = isMobile ?  -28 : -20;
			let cross = Handler.showImgRect( self.mainGroup, "cross.png", xCross, yCross,28,28);
			cross.onEL("pointertap",function(){ self.shutdown() });
			let onButBuy = function(evt) {
				SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(10); };
				SocialClient.Payment( 25, Langs.payNameBuySteps10,  17 );
				self.shutdown();
			};
			butBuy.onEL( "pointertap", onButBuy);
			self.mainGroup.interactive = true;
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ACT_5_STEPS ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ACT_5_STEPS ] = 1;
			let listOfImages = [];
			if ( isMobile ) {
				listOfImages = [	
								 "winds/ac5Steps/backgrAc5StepsMob.png",
								 "winds/ac5Steps/butBuyAc5StepsMob.png"];
			} else {
				listOfImages = [	
								 "winds/ac5Steps/backgrAc5Steps.png",
								 "winds/ac5Steps/lableSteps.png",
								 "winds/ac5Steps/butBuyAc5Steps.png"];
			}
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindAc5Steps.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAc5Steps;