	
	"use strict";
	
	let CWindBuyCoins = {};
	//CWindBuyCoins.__index = CWindBuyCoins;
	
	CWindBuyCoins.newObject = function(){
		this.winds = {};
		return this;
	};
	
	CWindBuyCoins.startup = function( params ) {
		let self = this;
		
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		let showContent = function() {
			//let nameBackgr = isMobile ? "backgrBuyCoinsMob" : "backgrBuyCoins";
			//let wBackgr = isMobile ? 575 : 662;
			//let hBackgr = isMobile ? 544 : 534;
			//self.backgr = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS+nameBackgr+".png",0,2,wBackgr,hBackgr);
			if ( isMobile ) {
				self.backgr = Handler.showImgRect(self.mainGroup,"mobBack.png",0,20,550,552);
				self.backgr.scale.set(575/self.backgr.width);
				self.mainGroup.scale.set(visibleWidth/self.backgr.width);
			} else {
				self.backgr = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS+"backgrBuyCoins.png",0,2,662,534);
				let countLives = Head.energy;
				let countLivesImg = Handler.showNumber('wb',27,-242,countLives,15,22,self.mainGroup,'',0);
				countLivesImg.x -= countLivesImg.width/2;
			}
			
			let xCross = isMobile ?  268 :  310;
			let yCross = isMobile ? -246 : -222;
			let cross = Handler.showImgRect(self.mainGroup,"cross.png",xCross,yCross,36,36);
			cross.onEL("pointerdown",function() {self.shutdown()});
			
			Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS+"lableBuyIgnots.png",0, isMobile ? -208 : -198,502,29);
			
			let pointerDownButBuy = function( evt ) {
				let but = evt.target;
				but.y +=  4;
				setTimeout(  function() { but.y -=  4;  },  500 );
			};
			
			let pointerUpButBuy = function( evt ) {
				let butNumber = parseInt( evt.target.name.substr(3) );
				if ( butNumber < 1 || butNumber > 6 ) return;
				
				let oks = [ 0, 1000, 500, 250, 100, 50, 20 ];
				SocialClient.callbackPayment = Handler.getCoEnFromServer;
				SocialClient.Payment( butNumber, Langs[ "payName" + butNumber ],  oks[ butNumber ] );
				self.shutdown();
			};
		
			let yLine = -187;
			let terminationLineName = isMobile ? "Mob.png" : ".png";
			let nameBut = isMobile ? "butBuyMob.png" : "butBuy.png";
			let wBut    = isMobile ? 143 : 162;
			let xBut    = isMobile ? 190 : 218;
			for ( let i = 1; i <= 6; i++ ) {
				let line = Handler.showImg(self.mainGroup,Consts.DIR_BUY_COINS+"line"+i+terminationLineName,0,yLine);
				line.anchor.set(0.5,0);
				if ( !isMobile ) { 
					line.width  /= 2;
					line.height /= 2;
				};
				let yBut = i == 1 ? yLine + line.height/2 : yLine + line.height/2 - 2;
			
				let butBuy = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_COINS + nameBut, xBut, yBut,wBut,48);
				butBuy.name = "but"+i;
				butBuy.onEL("pointerdown", pointerDownButBuy);
				butBuy.onEL("pointerup", pointerUpButBuy);
				yLine += line.height+2;
			}
 
			
		}
		if ( Handler.windsWithLoadedImages[ Winds.WIND_BUY_COINS ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_BUY_COINS ] = 1;
			let listOfImages = [];
			if ( isMobile ) { 
				listOfImages = [ 
				 //   "winds/buyCoins/backgrBuyCoinsMob.png",
				    "winds/buyCoins/butBuyMob.png",
				    "winds/buyCoins/lableBuyIgnots.png",
				    "winds/buyCoins/line1Mob.png",
				    "winds/buyCoins/line2Mob.png",
				    "winds/buyCoins/line3Mob.png",
				    "winds/buyCoins/line4Mob.png",
				    "winds/buyCoins/line5Mob.png",
				    "winds/buyCoins/line6Mob.png",
				];
			} else {
				listOfImages = [ 
				    "winds/buyCoins/backgrBuyCoins.png",
				    "winds/buyCoins/butBuy.png",
				    "winds/buyCoins/lableBuyIgnots.png",
				    "winds/buyCoins/line1.png",
				    "winds/buyCoins/line2.png",
				    "winds/buyCoins/line3.png",
				    "winds/buyCoins/line4.png",
				    "winds/buyCoins/line5.png",
				    "winds/buyCoins/line6.png",
				];
			};
			
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindBuyCoins.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindBuyCoins;