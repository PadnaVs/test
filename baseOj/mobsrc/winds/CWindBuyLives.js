	
	"use strict";
	
	let CWindBuyLives = {};
	//CWindBuyLives.__index = CWindBuyLives;
	
	CWindBuyLives.newObject = function(){
		this.winds = {};
		return this;
	}
	
	CWindBuyLives.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		let showContent = function() {
			//let nameBackgr = isMobile ? "backgrBuyLivesMob" : "backgrBuyLives";
			//let wBackgr = isMobile ? 575 : 662;
			//let hBackgr = isMobile ? 544 : 539;
			if ( isMobile ) {
				self.backgr = Handler.showImgRect(self.mainGroup,"mobBack.png",0,20,550,552);
				self.backgr.scale.set(575/self.backgr.width);
				self.mainGroup.scale.set(visibleWidth/self.backgr.width);
			} else {
				self.backgr = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_LIVES+"backgrBuyLives.png",0,2,662,539);
				let countLives = Head.energy;
				let countLivesImg = Handler.showNumber('wb',27,-242,countLives,15,22,self.mainGroup,'',0);
				countLivesImg.x -= countLivesImg.width/2;
			}
			
			let xCross = isMobile ?  268 :  310;
			let yCross = isMobile ? -246 : -228;
			let cross = Handler.showImgRect(self.mainGroup,"cross.png",xCross,yCross,36,36);
			cross.onEL("pointerdown",function() {self.shutdown()});

			Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_LIVES+"lableBuyLives.png",0, isMobile ? -222 : -202,319,35);
			
			let pointerDownButBuy = function( evt ) {
				let but = evt.target;
				but.y +=  4;
				setTimeout(  function() { but.y -=  4;  },  500 );
			};
			let pointerUpButBuy = function( evt ) {
				let butNumber = parseInt( evt.target.name.substr(3) );
				console.log(butNumber);
				if ( butNumber < 1 ) return;	
				if ( butNumber < 5 ) {
					SocialClient.callbackPayment = Handler.getCoEnFromServer;
					let oks = [ 0, 21, 51, 99, 199 ];
					SocialClient.Payment( butNumber, Langs[ "payName" + (butNumber + 6) ],  oks[ butNumber ] );
				} else if ( butNumber < 8 ) {
					let costs = [ 50, 150, 450 ];
					if ( Head.coins < costs[butNumber-5] ) {
						Winds.show( Winds.WIND_BUY_COINS );
					} else {
						let onBuyEnegyForCoinsAsked = function(res) {
							self.shutdown();
							Head.energy = res['energy_v'];
							Head.coins  = res['coins'];
						}
						BackClient.ask( BackClient.COINS_TO_ENERGY, onBuyEnegyForCoinsAsked, { energy_v: User.energy, coins: User.coins, num: butNumber-4 });
					}
				}
			};
			
			let yLine = -195;
			let terminationLineName = isMobile ? "BuyLivesMob.png" : "BuyLives.png";
			let nameBut = isMobile ? "butBuyMob.png" : "butBuyWindLives.png";
			let wBut    = isMobile ? 143 : 162;
			let xBut    = isMobile ? 190 : 218;
			let butName = [ null,'but4','but3','but2','but1','but5','but6' ]
			for ( let i = 1; i <= 6; i++ ) {
				let line = Handler.showImg(self.mainGroup,Consts.DIR_BUY_LIVES+"line"+i+terminationLineName,0,yLine);
				line.anchor.set(0.5,0);
				if ( !isMobile ) { 
					line.width  /= 2;
					line.height /= 2;
				};
				let yBut = i == 1 ? yLine + line.height/2 : yLine + line.height/2 - 2;

				let butBuy = Handler.showImgRect(self.mainGroup,Consts.DIR_BUY_LIVES+nameBut, xBut, yBut,wBut,48);
				butBuy.name = butName[i];
				butBuy.onEL("pointerdown", pointerDownButBuy);
				butBuy.onEL("pointerup", pointerUpButBuy);
				yLine += line.height + 2;
			}

		};
		
		if ( Handler.windsWithLoadedImages[ Winds.WIND_BUY_LIVES ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_BUY_LIVES ] = 1;
			let listOfImages = [];
			if ( isMobile ) {
				listOfImages = [ 
					//"winds/buyLives/backgrBuyLivesMob.png",
					"winds/buyLives/butBuyMob.png",
					"winds/buyLives/lableBuyLives.png",
					"winds/buyLives/line1BuyLivesMob.png",
					"winds/buyLives/line2BuyLivesMob.png",
					"winds/buyLives/line3BuyLivesMob.png",
					"winds/buyLives/line4BuyLivesMob.png",
					"winds/buyLives/line5BuyLivesMob.png",
					"winds/buyLives/line6BuyLivesMob.png",
				];
			} else {
				listOfImages = [ 
					"winds/buyLives/backgrBuyLives.png",
					"winds/buyLives/butBuyWindLives.png",
					"winds/buyLives/lableBuyLives.png",
					"winds/buyLives/line1BuyLives.png",
					"winds/buyLives/line2BuyLives.png",
					"winds/buyLives/line3BuyLives.png",
					"winds/buyLives/line4BuyLives.png",
					"winds/buyLives/line5BuyLives.png",
					"winds/buyLives/line6BuyLives.png",
				];
			};
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindBuyLives.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindBuyLives;