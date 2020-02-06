	
	"use strict";
	
	let CWindBeforeLevel = {};
	
	CWindBeforeLevel.newObject = function(){
		this.winds = {};
		return this;
	};
	
	CWindBeforeLevel.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup( Handler.gWinds );

		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
 
		self.windGroup = Handler.newGroup( self.mainGroup );
		if ( isMobile ) self.windGroup.x -= 4;

		if( isMobile ) {
			let backgrWindM = Handler.showImgRect( self.windGroup, "mobBackHight.png", 0, 0, 450, 714 );
			Handler.showImgRect( self.windGroup, "headMobBack.png", -10, -335, 348, 63 );
		} else {
			let backgrWindM = Handler.showImgRect( self.windGroup, "backgrWindM.png", 0, 0, 594, 624 );
		}
		
		let xCross = isMobile ?  206 :  275;
		let yCross = isMobile ? -334 : -270;
		let cross = Handler.showImgRect(self.windGroup,"cross.png", xCross, yCross, 36,36);
		cross.onEL("pointerdown", function() { self.shutdown(); } );
		
		let yLableLevel = isMobile ? - 334 : -270;
		Handler.showImgRect(self.windGroup,"lableLevel.png",-45,yLableLevel,171,38);
		
		let levelNumber = params.numLevel == null ? User.ml+1 : params.numLevel;
		Head.levelName = 'l'+Handler.cv( levelNumber );
		let levelImg = Handler.showNumber('w',110, yLableLevel,levelNumber,20,28,self.windGroup,'',0);
		levelImg.x -= Math.floor(levelImg.width/2);
		//panelBonuses
		let yLableBuyBonus = isMobile ? -262 : -224;
		Handler.showImgRect(self.windGroup,"lableBuyBons.png",0,yLableBuyBonus,383,39);
		
		let yBackgrBons = isMobile ? -190 : -170 ;
		let wBackgrBons  = isMobile ? 412 : 494;
		let hBackgrBons  = isMobile ? 100 :  72;
		let nameBackgrBons = isMobile ? "backgrBonsMob.png" : "backgrBons.png";
		let backgrBons = Handler.showImgRect(self.windGroup,nameBackgrBons,-2,yBackgrBons,wBackgrBons,hBackgrBons);
		//panelTasks
		let yLableTasks = isMobile ? -90 : -114;
		let lableTasks = Handler.showImgRect(self.windGroup,"lableTasks.png",0,yLableTasks,130,39);
		
		let yBackgrTasks = isMobile ? 35 : -3;
		let nameBackgrTasks = isMobile ? "backgrTasksMob.png" : "backgrTasks.png";
		let wBackgrTasks = isMobile ? 412 : 551;
		let hBackgrTasks = isMobile ? 217 : 190;
		let backgrTasks = Handler.showImgRect(self.windGroup, nameBackgrTasks,-2,yBackgrTasks,wBackgrTasks,hBackgrTasks);
		
		let pointerDownButPlay = function ( evt ) {
			let but = evt.target;
			but.y += 7;
			setTimeout(  function() { but.y -=  7;  },  500 );
		};
	
		let askLevelGet = function() {
			var fparams = {};
			fparams['l'] 		= Head.levelName;
			fparams['energy_v'] = Head.energy;
			fparams['coins'] 	= Head.coins;
			BackClient.ask(	BackClient.LEVEL_GET, Handler.onStartLevel,fparams);
			self.shutdown(1);
		};
		let butPlay = null;
		let backgrButPlay = null;
		let truePlay = User.energy > 0;
		if ( truePlay == false ) {
			//butContinue
			let onBuyedNextLevel = function() {
				Head.energy += 5;
				askLevelGet();
			}
			let onButContinue = function() {
				SocialClient.callbackPayment = onBuyedNextLevel;
				SocialClient.Payment( 27, Langs.payBefoLevel,  19 );
			}
			
			if ( !isMobile ) {
				let backgrButContinue = Handler.showImgRect(self.windGroup,"backgrButContinue.png",0,192,468,200);
			} else {
				Handler.showImgRect( self.windGroup, "lableLivesEndedMob.png", 0, 174, 394, 38 );
				Handler.showImgRect( self.windGroup, "lable5Lives.png", 0, 306, 347, 59 );
			}
			let wButContinue    = isMobile ? 386 : 401;
			let hButContinue    = isMobile ?  78 :  76;
			let xButContinue    = isMobile ?   0 :   2;
			let yButContinue    = isMobile ? 236 : 206;
			let nameButContinue = isMobile ? "butContinueMob.png" : "butContinue.png";
			let butContinue = Handler.showImgRect( self.windGroup, nameButContinue, xButContinue, yButContinue, wButContinue, hButContinue );
			butContinue.onEL( "pointertap", onButContinue );
		} else {
			if ( !isMobile ) backgrButPlay = Handler.showImgRect(self.windGroup,"backgrButPlay.png",0,193,242,68);
			let nameButPlay = isMobile ? "butPlayMob.png" : "butPlay.png";
			let wButPlay    = isMobile ? 249 : 242;
			let hButPlay    = isMobile ?  82 :  65;
			butPlay = Handler.showImgRect(self.windGroup, nameButPlay,0, isMobile ? 195 : 185,wButPlay,hButPlay);
			butPlay.name = 'l'+Handler.cv(levelNumber);
			butPlay.onEL('pointerdown', pointerDownButPlay);
			butPlay.onEL('pointerup', askLevelGet);
		};
		
		if ( Handler.butBonuses )
            for( const b of Handler.butBonuses )
                b.destroy();

        Handler.butBonuses = [];
        for ( let i = 0; i < 6; i++ ) {
			if ( i > 1 && i < 5 ) {
				let bname = Consts.BONUSES_NAMES[i-2];
				let xButBon = isMobile ? -330 + i*110 : -208 + i*83;
				Handler.butBonuses[i-2] = new ButBonus(self.windGroup, xButBon, yBackgrBons + 2, bname, 1 );
				if ( isMobile ) Handler.butBonuses[i-2].scale = 1.3;
			} else if( !isMobile ) {
				Handler.showImgRect(self.windGroup,"disbon"+i+".png",-208+i*83,yBackgrBons,63,69);
			};
		};
		
		if ( isMobile ) {
			Handler.setMobiletask( levelNumber );
		}

		TaskBeforeLevel.show( self.windGroup, levelNumber );
	
		
		self.windGroup.toFront();
		if ( isMobile ) {
			self.windGroup.y += 5;
			//self.windGroup.y += 42;
			self.windGroup.x += 3;
		} else {
			self.windGroup.x += 85;
			self.windGroup.y -= 12;
		}
		//------------------------//
		//-------WindRating-------//
		//------------------------//
		let showRating = function( evt ) {
			if ( !Handler.visibleRt ) {
				self.windRating = CWindSmallRating.showWindRating( { levelNumber: levelNumber } );
				self.windRating.x = /*self.windRating.width/2*/ 150 + visibleWidth/2;
				self.windRating.y += 34;
				let shRtX = self.windRating.x - 200;
				Handler.toFront( self.windRating );
				self.mainGroup.addChild(self.windRating);
				TweenMax.to( self.windRating, 0.8, { x: shRtX } );
			};
		};
		
		if ( isMobile ) {
			if ( truePlay ) {
				let butShowRating = Handler.showImgRect(self.windGroup,"butRtBeforeLevel.png",0,290,190,81);
				butShowRating.onEL("pointertap",showRating);
			}
		} else {
			self.windRating = CWindSmallRating.showWindRating( { levelNumber: levelNumber } );
			self.mainGroup.addChild(self.windRating);
			TweenMax.to( self.windRating, 2, { x:-250 } );
		};
		
		return self.mainGroup;
	}
	
	CWindBeforeLevel.shutdown = function( fastShutdown ) {
		let self = this;
		if ( Winds.shutdown( self.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage( self.mainGroup );
				self.mainGroup.removeSelf();
			} else {
				Handler.removeWindAfterTransition( self.mainGroup );
			};
  		};
	};

	//return CWindBeforeLevel;