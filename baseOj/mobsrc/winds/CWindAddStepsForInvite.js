	
	"use strict";
	
	let CWindAddStepsForInvite = {};
	
	CWindAddStepsForInvite.newObject = function(){
		this.wind = {};
		return this;
	};
	
	CWindAddStepsForInvite.startup = function( parent ) {
		let self = this;
		self.mainGroup = Handler.newGroup( parent );
		
		if ( isMobile ) {
			self.mainGroup.x = 335;
			self.mainGroup.y = 97;
		} else {
			self.mainGroup.x = 335;
			self.mainGroup.y = 180;
		};
		let showContent = function() {
			Handler.showImgRect(self.mainGroup, Consts.DIR_WIND_ADD_STEPS_FOR_INVITE + "backgrAcInv.png",0,0,88,245);
			Handler.showImgRect(self.mainGroup, Consts.DIR_WIND_ADD_STEPS_FOR_INVITE + "lableAcInv.png",0,-45,83,131);
			Handler.showImgRect(self.mainGroup, Consts.DIR_WIND_ADD_STEPS_FOR_INVITE + "bonAcInv.png",0,48,58,56);
			let butInv = Handler.showImgRect(self.mainGroup, Consts.DIR_WIND_ADD_STEPS_FOR_INVITE + "butInvite.png",-55,100,201,49);
			let cross = Handler.showImgRect(self.mainGroup, "cross.png",35,-115,22,22);
			let onCross = function(evt) {
				self.shutdown();
			};
			cross.onEL("pointertap", onCross);

			butInv.on( "pointertap", function(){ SocialClient.invite(); } );
			self.mainGroup.interactive = true;
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_ADD_STEPS_FOR_INVITE ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_ADD_STEPS_FOR_INVITE ] = 1;
				let listOfImages = [
					"winds/acAddStepsForInvite/backgrAcInv.png",
					"winds/acAddStepsForInvite/lableAcInv.png",
					"winds/acAddStepsForInvite/bonAcInv.png",
					"winds/acAddStepsForInvite/butInvite.png",
				];
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	}
	
	CWindAddStepsForInvite.shutdown = function(){
		if ( this.windIndex != null ) {
		    Winds.shutdown( this.windIndex )
		}
        Handler.removeWindAfterTransition( this.mainGroup );
    };

	//return CWindAddStepsForInvite;