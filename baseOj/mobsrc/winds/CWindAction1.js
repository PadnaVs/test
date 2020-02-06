	
	"use strict";
	
	let CWindAction1 = {};
	
	CWindAction1.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAction1.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function() {
			//backgr
			let wBackgr = isMobile ? 454 : 641;
			let hBackgr = isMobile ? 642 : 366;
			let nameBackgr = isMobile ? "backgrAction1Mob.png" : "backgrAction1.png";
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION1 + nameBackgr,0,0,wBackgr,hBackgr);
			//cross
			let xCross = isMobile ?  202 :  300;
			let yCross = isMobile ? -296 : -160;
			let cross = Handler.showImgRect(self.mainGroup, "cross.png", xCross, yCross,36,36);
			let onCross = function(evt) {
				self.shutdown();
			}
			cross.onEL("pointertap",onCross);
			//title
			let nameTitle = isMobile ? "lableAction1Mob.png" : "lableAction1.png";
			let wTitle = isMobile ?  418 :  580; 
			let hTitle = isMobile ?  132 :   75;
			let yTitle = isMobile ? -205 : -110;
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION1 + nameTitle,0, yTitle, wTitle, hTitle);
			//bonus
			let nameBackgrBon = isMobile ? "backgrAnimAction1Mob.png" : "backgrAnimAction1.png";
 			let wBackgrBon = isMobile ? 193 : 164;
			let hBackgrBon = isMobile ? 240 : 205;
			let xBackgrBon = isMobile ? -12 : 185;
			let yBackgrBon = isMobile ? -20 :  35;
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION1 + nameBackgrBon ,xBackgrBon, yBackgrBon, wBackgrBon, hBackgrBon);
			
			let wLuch = isMobile ? 233 : 200;
			let xLuch = isMobile ? -20 : 185;
			let yLuch = isMobile ? -20 :  35;
			let luch1 = Handler.showImgRect(self.mainGroup, "luch.png",xLuch,yLuch,wLuch, wLuch);
			luch1.alpha = 0.35;
			let luch2 = Handler.showImgRect(self.mainGroup, "luch.png",xLuch,yLuch,wLuch, wLuch);
			luch2.alpha = 0.35;
			TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
			TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
			
			let xBons    = [ null, 185, 125, 125 ];
			let yBons    = [ null,  35, -45, 115 ];
			let xBonsMob = [ null, -10, -120, 124 ];
			let yBonsMob = [ null, -26,   37, -93 ];
			for (let i = 1; i <= 3; i++ ) {
				let endName = isMobile ? "Action1Mob.png" :  "Action1.png";
				let xBon = isMobile ?  xBonsMob[i] : xBons[i];
				let yBon = isMobile ?  yBonsMob[i] : yBons[i];
				let bon = Handler.showImg(self.mainGroup, Consts.DIR_ACTION1 + 'bon'+i+endName, xBon, yBon );
				if ( !isMobile ) {
					bon.width /= 2;
					bon.height /= 2;
				}
			};
			//LableInfo
			let nameLableInfo = isMobile ? "lableBonAction1Mob.png" : "lableBonAction1.png";
			let xLableInfo = isMobile ?   0 : -90;
			let yLableInfo = isMobile ? 162 :  10;
			let wLableInfo = isMobile ? 355 : 354;
			let hLableInfo = isMobile ? 110 : 142;
			Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION1 + nameLableInfo, xLableInfo, yLableInfo, wLableInfo, hLableInfo);
			//butBuy
			let xBut = isMobile ?    0 : -80;
			let yBut = isMobile ?  260 : 125;
			let butBuy = Handler.showImgRect(self.mainGroup, Consts.DIR_ACTION1 + "butBuyAction1.png",xBut,yBut,281,69);
			
			let onBut = function(evt) {
				SocialClient.callbackPayment = function(){ Handler.getUserDataFromServer(); };
				SocialClient.Payment( 23, Langs.payNameAct10,  10 );
				self.shutdown();
			};
			butBuy.on("pointertap", onBut);
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ACTION1 ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ACTION1 ] = 1;
			let listOfImages = [];
				if ( isMobile ) { 
					listOfImages = [
						"winds/action1/backgrAction1Mob.png",
						"winds/action1/lableAction1Mob.png",
						"winds/action1/butBuyAction1.png",
						"winds/action1/lableBonAction1Mob.png",
						"winds/action1/backgrAnimAction1Mob.png",
						"winds/action1/bon1Action1Mob.png",
						"winds/action1/bon2Action1Mob.png",
						"winds/action1/bon3Action1Mob.png",
					];
				} else { 
					listOfImages = [
						"winds/action1/backgrAction1.png",
						"winds/action1/lableAction1.png",
						"winds/action1/butBuyAction1.png",
						"winds/action1/lableBonAction1.png",
						"winds/action1/backgrAnimAction1.png",
						"winds/action1/bon1Action1.png",
						"winds/action1/bon2Action1.png",
						"winds/action1/bon3Action1.png",
					];
				}
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindAction1.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAction1;