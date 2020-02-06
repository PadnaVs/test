		
	"use strict";
	
	let CWindAc4 = {};
	
	CWindAc4.newObject = function(){
		this.wind = {};
		return this;
	}
	
	CWindAc4.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			Handler.showImgRect(self.mainGroup,Consts.DIR_AC4+"backgrAc4.png", 0, 0, 88, 322);
			let cross = Handler.showImgRect(self.mainGroup,"cross.png", 32, -150, 23, 22);
			cross.interactive = true;
			cross.buttonMode = true;
			let crossTouch = function(evt){
				self.shutdown();
			}
			cross.onEL("pointertap",crossTouch);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "lableAc4.png",-7,-143,54,16);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "bon1Ac4.png",0,-100,62,73);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "lable3Hammer.png",0,-52,76,37);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "bon2Ac4.png",0,-2,59,60);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "lable5Lives.png",0,47,76,38);
			let butBuy = Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "butBuyAc4.png",0,100,77,66);
			let onButBuy = function(evt) {
				SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(); };
				SocialClient.Payment( 22, Langs.payAc4,  44 );
				self.shutdown();
			};
			butBuy.onEL("pointertap",onButBuy);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC4 + "lableRuchAc4.png",0,140,74,16);
		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_AC4 ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_AC4 ] = 1;
				let listOfImages = [
					"winds/ac4/backgrAc4.png",
					"winds/ac4/lableAc4.png",
					"winds/ac4/lable3Hammer.png",
					"winds/ac4/bon2Ac4.png",
					"winds/ac4/lable5Lives.png",
					"winds/ac4/butBuyAc4.png",
					"winds/ac4/lableRuchAc4.png"
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindAc4.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAc4;