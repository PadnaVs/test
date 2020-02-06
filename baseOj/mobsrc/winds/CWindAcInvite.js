	
	"use strict";
	
	let CWindAcInvite = {};
	
	CWindAcInvite.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindAcInvite.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		let nameBackgr = isMobile ? "backgrAcInviteMob.png": "backgrAcInvite.png";
		let wBackgr = isMobile ? 457 : 662;
		let hBackgr = isMobile ? 524 : 521;
		Handler.showImgRect(self.mainGroup, nameBackgr, 0,0,wBackgr,hBackgr);
		
		let xCross = isMobile ?  210 :  310;
		let cross = Handler.showImgRect(self.mainGroup, "cross.png", xCross, -236,36,36);
		let onCross = function(evt){
			self.shutdown();
		};
		cross.onEL("pointertap",onCross);
		
		let nameLableInviteFr = isMobile ? "lableInviteFrAcInviteMob.png" : "lableInviteFrAcInvite.png";
		let wLableInviteFr = isMobile ?  339 :  524;
		let hLableInviteFr = isMobile ?  100 :   53;
		let yLableInviteFr = isMobile ? -190 : -200;
		Handler.showImgRect(self.mainGroup, nameLableInviteFr, 0, yLableInviteFr,wLableInviteFr,hLableInviteFr);
		
		let nameBackgrLable = isMobile ? "backgrAcLableMob.png" : "backgrAcLable.png";
		let wBackgrLable = isMobile ? 408 : 602;
		let hBackgrLable = isMobile ? 308 : 386;
		let yBackgrLable = isMobile ?  15 :  40;
		Handler.showImgRect(self.mainGroup, nameBackgrLable,0,yBackgrLable,wBackgrLable,hBackgrLable);
		
		let nameLableGame = isMobile ? "lableGameAllAcInviteMob.png" : "lableGameAllAcInvite.png";
		let hLableGame = isMobile ?   32 :   29;
		let xLableGame = isMobile ?    0 :  -98;
		let yLableGame = isMobile ? -120 : -127;
		Handler.showImgRect(self.mainGroup, nameLableGame, xLableGame, yLableGame,334,hLableGame);
		
		let xBon = isMobile ?   0 : -30;
		let yBon = isMobile ? -45 : -20;
		Handler.showImgRect(self.mainGroup, "bonAcInvite.png", xBon, yBon,301,100);
		
		let nameLableBon = isMobile ? "lableBonAcInviteMob.png" : "lableBonAcInvite.png";
		let wLableBon = isMobile ? 332 : 554;
		let hLableBon = isMobile ? 125 :  66;
		let yLableBon = isMobile ?  80 :  90;
		Handler.showImgRect(self.mainGroup, nameLableBon, 0, yLableBon,wLableBon,hLableBon);
		
		let nameBackgrBut = isMobile ? "backgrButAcInviteMob.png" : "backgrButAcInvite.png";
		let wBackgrBut = isMobile ? 285 : 291;
		let yBackgrBut = isMobile ? 208 : 180;
		Handler.showImgRect(self.mainGroup, nameBackgrBut,0,yBackgrBut,wBackgrBut,60);
		
		let pointerDownButInv = function( evt ) {
			let but = evt.target;
			but.y += 4;
			setTimeout(  function() { but.y -=  4;  },  500 );
		};
		let pointerUpButInv = function( evt ) {
			SocialClient.invite(); 
			self.shutdown();
		};
		
		let yBut = isMobile ? 202 : 173;
		let butInvite = Handler.showImgRect(self.mainGroup, "butInviteAcInviteMob.png",0,yBut,284,62);

		butInvite.onEL( 'pointerdown',pointerDownButInv);
		butInvite.onEL( 'pointerup',pointerUpButInv);
		self.mainGroup.interactive = true;
		return self.mainGroup;
	};
	
	CWindAcInvite.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAcInvite;