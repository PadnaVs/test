		
		"use strict";
		
		let CWindAcFriends = {};
		
		CWindAcFriends.newObject = function(){
			this.wind = {};
			return this;
		};
		
		CWindAcFriends.startup = function( params ){
			let self = this;
			self.mainGroup = Handler.newGroup();
			self.mainGroup.x = Handler.contentCenterX;
			self.mainGroup.y = Handler.contentCenterY;
			let showContent = function() {
				self.backgr = Handler.showWindBackround( -294, -159, 588, 318, Consts.DIR_AC_FRIEDS + "angleWAcFriends.png", Consts.DIR_AC_FRIEDS + "sideWAcFriends.png", 0xf0ecb6 );
				self.mainGroup.addChild(self.backgr);
				let cross = Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "crossAcFriends.png",260,-135,33,27 );
				let onCross = function(evt) {
					self.shutdown();
				};
				cross.onEL( "pointertap", onCross );
				let xStar = [-220,-190,-220,-100,80 ];
				let yStar = [ -75,   0,  70, -70,-70 ];
				for ( let i = 0; i <= xStar.length-1; i++ ) {
					Handler.showImgRect( self.mainGroup, "star.png",xStar[i],yStar[i],40,38 );
				};
				Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "lableAcFriends.png",0,-100,458,74 );
				let numFr = 22;
				//let imgNumFr = new CImgTextField(self.mainGroup, numFr,"ow", -58, -34,  1.5);
				let imgNumFr = Handler.showNumber("ow", -70, -34, numFr, 23, 28, self.mainGroup,'',5);
				//imgNumFr.showText();
				Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "lableFriends.png", -158, -30, 108, 42 );
				Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "fraction30.png", -58+imgNumFr.width, -34, 53, 34 );
				let butGetBon = Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "butGetBonAcFriends.png", -80, 30, 202, 49 );
				let butInvF   = Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "butInvF.png", -80, 100, 279, 67 );
				butInvF.onEL("pointerdown", function(){ SocialClient.invite(); });
				Handler.showImgRect( self.mainGroup, Consts.DIR_AC_FRIEDS + "backgrAnimAcFriends.png", 185, 38, 163, 203 );
				let luch1  = Handler.showImgRect(self.mainGroup, "luch.png", 185, 38, 200, 200);
				luch1.alpha = 0.35;
				let luch2  = Handler.showImgRect(self.mainGroup, "luch.png", 185, 38, 200, 200);
				luch2.alpha = 0.35;
				TweenMax.to( luch1, 10, { angle: 360, repeat: -1 , ease: Power0.easeNone} );
				TweenMax.to( luch2, 10, { angle: -360, repeat: -1 , ease: Power0.easeNone} );
				let xBons = [185,138,240,155, 220 ];
				let yBons = [ -15, 28, 28, 85,  85 ];
				for ( let i = 0; i <= 4; i++ ) {
					let bon = Handler.showImg( self.mainGroup,Consts.DIR_AC_FRIEDS + "bon"+( i + 1) +"AcFriends.png",xBons[i],yBons[i] );
					if ( !isMobile ) {
						bon.width  /= 2;
						bon.height /= 2;
					};
				};
				
			};
			if ( Handler.windsWithLoadedImages[ Winds.WIND_ACT_FRIENDS ] == null ) {
				Handler.windsWithLoadedImages[ Winds.WIND_ACT_FRIENDS ] = 1;
				let listOfImages = [
					"winds/acFriends/angleWAcFriends.png",
					"winds/acFriends/sideWAcFriends.png",
					"winds/acFriends/crossAcFriends.png",
					"winds/acFriends/lableAcFriends.png",
					"winds/acFriends/lableFriends.png",
					"winds/acFriends/fraction30.png",
					"winds/acFriends/butGetBonAcFriends.png",
					"winds/acFriends/butInvF.png",
					"winds/acFriends/backgrAnimAcFriends.png",
					"winds/acFriends/bon1AcFriends.png",
					"winds/acFriends/bon2AcFriends.png",
					"winds/acFriends/bon3AcFriends.png",
					"winds/acFriends/bon4AcFriends.png",
					"winds/acFriends/bon5AcFriends.png",
				];
				ImageLoader.loadAssets(showContent, listOfImages);
			} else {
				showContent();
			};
			return self.mainGroup;
		};
		
	CWindAcFriends.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };
