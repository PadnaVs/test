
	"use strict";
	
	let MenuLevelPoint = function( params ) {
		let self = this;
		
		self.group = Handler.newGroup( params.parent );
		self.group.name = 'l'+Handler.cv( params.numLevel );
		
		self.xLevel = params.x;
		self.yLevel = params.y;
		
		self.xHillock1 = params.xHillock1;
		self.yHillock1 = params.yHillock1;
		
		self.xHillock2 = params.xHillock2;
		self.yHillock2 = params.yHillock2;
		
		self.numLevel = params.numLevel;
		self.group.numLevel = params.numLevel;
		self.opened = params.opened ? params.opened : false;
		self.countStar = params.stars == null ? 0 : params.stars.s;
		self.arrow = params.arrow;
		
		return self;	
	};
   
	MenuLevelPoint.prototype.show = function() {
		let self = this;
	
		Handler.showImgRect( self.group, "stand.png", 0,0, 41,29);
		
		if ( self.arrow ) {
			let imgArrow = Handler.showImgRect( self.group,"arrowLastYourLevel.png",0,-55,45,42 );
			TweenMax.to( imgArrow, 0.7, { y: -40, ease: Power0.easeNone, repeat: -1, yoyo: true });
		} else { 
			Handler.showImgRect(self.group,"cup.png",0,-9,32,23);
			let xStar = -15;
			for ( let i = 1; i <= 3; i++ ) {
				if( self.countStar != null && self.countStar >= i ) {
					Handler.showImgRect( self.group,"winStarLevel.png", xStar,-26,13,13 );
				} else {
					Handler.showImgRect( self.group,"backgrStarLevel.png", xStar,-26,13,13 );
				};
				xStar = xStar + 15;
			};

		};               
		//self.group.onEL('pointerup', function() { self.touchLevel() });	
		self.group.onEL('pointertap',  Handler.onStartLevelClick );
		
		
		let numLevelImg = Handler.showNumber( "swb", 4, 14, self.numLevel, 9, 13, self.group, '', 1 );
		numLevelImg.x -= Math.floor( numLevelImg.width/2 );
		
		self.group.x = self.xLevel + 26;
		self.group.y = self.yLevel + 40;
				
		return self;
	};
	//return menuLevelPoint;