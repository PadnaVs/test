
	"use strict";

	let CWindMsg = {};
	CWindMsg.__index = CWindMsg;
	
	CWindMsg.newObject = function(){
		let self = this;
		self.winds = {};

		return self;
	};
	
	CWindMsg.startup = function( params ){
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		if ( isMobile ) {
			self.backgr = Handler.showImgRect(self.mainGroup, "mobBack.png",0,0,550,552);
		} else {
			self.backgr = Handler.showImgRect(self.mainGroup, "backgrWindMessage.png",0,0,612,495);
		};
		self.backgr.scale.set( visibleWidth0/self.backgr.width );
	
		//let could  = Handler.showImgRect(self.mainGroup, "couldWindMessage.png",0,-40,527,347);
		//could.scale.set( visibleWidth0/self.backgr.width );
		
		let onCross = function(evt){
			self.shutdown();
		};
		let xCross = isMobile ?  210 :  285;
		let yCross = isMobile ? -210 : -255;
		let cross = Handler.showImgRect( self.mainGroup, "cross.png", xCross, yCross, 36, 36);
		cross.onEL("pointertap", onCross);
		//let butClose = Handler.showImgRect( self.mainGroup, 'buttonClose.png', 0, 185, 157, 48);
		//butClose.onEL("pointertap", onCross);
		
//		let colorText = [255,234,198];
//		let colorShadow = [ 118,54, 7 ];
		
		if  ( params.text != null ) {
			//let paramsText = {
			//	align: 'center',
			//	fontFamily: 'Arial',
			//	fontSize:  30,
			//	fontWeight: 'bold',
			//	fill: '#FFFFFF',
			//	stroke: '#993300',
			//	strokeThickness: 4,
			//	width: 450
			//};
			let paramsText = {
				text: params.text,
				align: 'center',
				fontFamily: 'Arial',
				fontSize:  30,
				fontWeight: 'bold',
				fill: '#FFFFFF',
				stroke: '#993300',
				strokeThickness: 4,
				wordWrapWidth: 1000,
				wordWrap: true,
				y: -80,
				parent: self.mainGroup
			};
			//Handler.showText(self.mainGroup,  params.text, 0, -80 , paramsText);
			let text = Handler.newText( paramsText );
			text.anchor.set(0.5,0.5);
			text.scale.set( 0.40 );
		}
		
		if ( params.butName != null ) {
			let button = null;
			if ( params.butName == 'Пригласить' ) {
				button = Handler.showImgRect( self.mainGroup, Consts.DIR_WINDS+"butInvite.png", 0, 90, 176, 68 );
			} else {
                button = Handler.showImg( self.mainGroup, Consts.DIR_MSG + params.butName+".png", 0, 90 );
            }
            if ( params.showBoy != null ) {
                button.x = 50;
            };

            button.onEL( "pointerdown", function() {
			    if ( params.butCallback != null ) params.butCallback();
			    if ( Winds.getTopWindName() == Winds.WIND_MSG )self.shutdown();
			} );
        };
		return self.mainGroup;
	};
	
	CWindMsg.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};
