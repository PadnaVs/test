	
	"use strict";

	let CWindFrInvited = {};
	
	CWindFrInvited.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindFrInvited.startup = function( params ) {
		let self = this;
		this.mainGroup = Handler.newGroup();
		this.mainGroup.x = Handler.contentCenterX;
		this.mainGroup.y = Handler.contentCenterY;
		
		//backgr
		let nameBackgr = isMobile ? "backgrAcInviteMob.png": "backgrAcInvite.png";
		let wBackgr = isMobile ? 457 : 662;
		let hBackgr = isMobile ? 524 : 521;
		let backgr = Handler.showImgRect(self.mainGroup, nameBackgr, 0,0,wBackgr,hBackgr);
		
		let nameBackgrSmoll = isMobile ? "backgrSmollMob.png": "backgrSmoll.png";
		let wBackgrSmoll = isMobile ? 407 : 599;
		let hBackgrSmoll = isMobile ? 327 : 442;
		let yBackgrSmoll = isMobile ? -20 :  10;
		Handler.showImgRect(this.mainGroup, nameBackgrSmoll, 0, yBackgrSmoll, wBackgrSmoll, hBackgrSmoll);
		
		let xCross = isMobile ?  210:   310;
		let yCross = -236;
		this.cross = Handler.showImgRect(this.mainGroup, "cross.png",xCross, yCross,36,36);
		let onCross = function(evt){
			self.shutdown();
		};
		this.cross.onEL("pointertap",onCross);
		
		//light
		let wLight = isMobile ? 400 : 501;
		this.luch1 = Handler.showImgRect( this.mainGroup, "luch.png", 0, 0, wLight, wLight );
		this.luch1.alpha = 0.15;
		this.luch2 = Handler.showImgRect( this.mainGroup, "luch.png", 0, 0, wLight, wLight );
		this.luch2.alpha = 0.15;
		TweenMax.to( this.luch1, 10, { angle:  360, ease: Power0.easeNone, repeat: -1 } );
		TweenMax.to( this.luch2, 10, { angle: -360, ease: Power0.easeNone, repeat: -1 } );
		
		//lableTop
		if ( isMobile ) Handler.showImgRect( this.mainGroup, "lableTopMob.png", 0, -210, 346, 46 );
		
		//title
		let nameTitle = isMobile ? "lableTitleMob.png" : "lableTitle.png";
		let wTitle = isMobile ?  378 :  562;
		let hTitle = isMobile ?  123 :   78;
		let yTitle = isMobile ? -120 : -160;
		let title = Handler.showImgRect(this.mainGroup, nameTitle, 0, yTitle, wTitle, hTitle);
		
		//bon
		let nameBon = isMobile ? "bon100IgnotsMob.png" : "bonAcInvite.png";
		let wBon = isMobile ?  282 : 270;
		let hBon = isMobile ?  100 :  97;
		let yBon = isMobile ?    0 : -61;
		Handler.showImgRect(this.mainGroup, nameBon, 0, yBon, wBon, hBon );

		//lableMid
		let nameLableMid = isMobile ? "lableMidlineMob.png" : "lableMidline.png";
		let wLableMid = isMobile ? 388 : 367;
		let hLableMid = isMobile ?  73 :  66;
		let yLableMid = isMobile ? 100 : 100;
		Handler.showImgRect( this.mainGroup, nameLableMid, 0, yLableMid, wLableMid, hLableMid );
		
		//butInv
		let butInvite = null;
		let yButInv = isMobile ? 174 : 165;
		if ( isMobile ) {
			Handler.showImgRect( this.mainGroup, "backgrButAcInviteMob.png", 0, yButInv+6, 285, 60 );
			butInvite = Handler.showImgRect( this.mainGroup, "butInviteAcInviteMob.png", -2, yButInv, 284,62);
		} else {
			butInvite = Handler.showImgRect( this.mainGroup, "butInviteWindFrInvited.png", 0, yButInv, 443,61);
			//butGold
			let ybutGold = isMobile ? 0 : 25;
			let butGetGold = Handler.showImgRect(this.mainGroup, "butGold.png",0,ybutGold,443,60);
			butGetGold.onEL("pointertap", function(){});
		};
		butInvite.onEL( "pointertap", function( evt ){ SocialClient.invite(); } );
		
		//lableTell
		let xCheckBox = isMobile ?  30 : 85;
		let yCheckBox = isMobile ? 225 : 216;
		let lableTellFrName = isMobile ? "lableTellFrEndLevelMob.png" : "lableTellFrInvited.png";
		let wLableTellFr = isMobile ? 162 : 196;
		let hLableTellFr = isMobile ?  25 :  17;
		
 		let lableTellFr = Handler.showImgRect(this.mainGroup, lableTellFrName, xCheckBox + wLableTellFr/2 + 15, yCheckBox + 4,wLableTellFr,hLableTellFr);
		let checkBox    = Handler.showImgRect(this.mainGroup, "checkBoxDailyBonus.png", xCheckBox,    yCheckBox,  19,19);
		this.checkMark  = Handler.showImgRect(this.mainGroup, "markerDailyBonus.png",   xCheckBox+2,  yCheckBox,  29,23);
		
		let onCheckBox = function( evt ) {
			if ( self.checkMark.isVisible ) {
				self.checkMark.isVisible = false;
			} else {
				self.checkMark.isVisible = true;
			};
		};
		checkBox.onEL( "pointertap", onCheckBox );
		return self.mainGroup;
	};
	
	CWindFrInvited.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( this.checkMark.isVisible ) {
				let txt = "Мне подарили монеты за друзей! Заходи и тебе подарят!";
				let imgUrl = Config.BASE_URL + "wall492x364.jpg";
				SocialClient.MediaTopicPost( txt, imgUrl );
			}
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
    };