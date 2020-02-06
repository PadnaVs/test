	
	"use strict";
	
	let CWindAcInvToGame = {};
	
	CWindAcInvToGame.newObject = function(){
		this.wind = {};
		return this;
	}
	
	CWindAcInvToGame.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_INV_TO_GAME + "backgrAcInvToGame.png",0,0,655,578);
			let cross = Handler.showImgRect(self.mainGroup,"cross.png",305,-267,36,36);
			let onCross = function(evt) {
				self.shutdown();
			};
			cross.onEL( "pointertap", onCross );
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_INV_TO_GAME + "lablePlayTheGame.png",0,-190,551,82);
			Handler.showImgRect(self.mainGroup, Consts.DIR_AC_INV_TO_GAME + "gameGems.png",0,20,598,301);
			let butPlay = Handler.showImgRect(self.mainGroup, Consts.DIR_AC_INV_TO_GAME + "buyPlayAcInvToGame.png",-5,220,242,64);
			butPlay.interactive = true;
			butPlay.buttonMode = true;
			let pointerDownButPlay = function( evt ) {
				let but = evt.target;
				but.y +=  7;
				setTimeout(  function() { but.y -=  7;  },  500 );
				console.log(evt.target.name);	
			};
			butPlay.on("pointerdown",pointerDownButPlay);
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_AC_INV_TO_GAME ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_AC_INV_TO_GAME ] = 1;
				let listOfImages = [
					"winds/acInvToGame/backgrAcInvToGame.png",
					"winds/acInvToGame/lablePlayTheGame.png",
					"winds/acInvToGame/gameGems.png",
					"winds/acInvToGame/buyPlayAcInvToGame.png"
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindAcInvToGame.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAcInvToGame;