	
	"use strict";
	
	let CWindMenuLevels = {};
	//CWindMenuLevels.__index = CWindMenuLevels;
	
	CWindMenuLevels.newObject = function(){
		this.winds = {};
		this.imgBackgr = null;
		return this;
	};
	
	CWindMenuLevels.showLocation = function() {
		let self = this;
		
		this.showBakcgr();
		
		if ( self.groupLevels ) self.groupLevels.destroy();
		self.groupLevels = Handler.newGroup( self.mainGroup );
		self.groupLevels.x -= self.width/2;
		self.groupLevels.y -= self.height/2;
		
		self.maxLevel = ( self.numLocation * self.maxCoutnLevel ) - 1; 
		self.minNumLevel = self.maxLevel - (self.maxCoutnLevel - 1);

		let numL = ( self.numLocation - 1 ) % 4 + 1;
		
		let currLoc = Math.floor(self.currentLevel/100) == self.numLocation - 1;
		
		if ( self.currentLevel != self.minNumLevel ) {
			for( let i = 0; i < 200; i++ ) {
				if ( i == (self.currentLevel%100)*2 && currLoc ) {
					break;
				} else {
					Handler.showImgRect( self.groupLevels, 'pointNextLevel.png', Consts.mapHillockCoords[numL][i][0]-2, Consts.mapHillockCoords[numL][i][1], 12,10);
				};
			};
		};
		
    	let xCurrentLevel = 0;
    	let yCurrentLevel = 0;
		let k = currLoc ? self.currentLevel%100 : 99; // counter 100 to 1
		for( let i = currLoc ? self.currentLevel : self.maxLevel; i >= self.minNumLevel; i-- ){
			let withArrow = self.currentLevel == i;
			if ( withArrow ) {
				xCurrentLevel = Math.floor( Consts.mapLevelCoords[numL][k][0]*self.mainScale -  self.width/2*self.mainScale ) + 26;
				yCurrentLevel = Math.floor( Consts.mapLevelCoords[numL][k][1]*self.mainScale - self.height/2*self.mainScale ) + 40;
			};
			let paramsLevel = {
				parent : self.groupLevels,
				
				x : Math.floor( Consts.mapLevelCoords[numL][k][0] ),
				y : Math.floor( Consts.mapLevelCoords[numL][k][1] ),
				
				numLevel : i+1,
				stars : User.stars[i+1],
				arrow : withArrow
			};
			
			let levelPoint = new MenuLevelPoint( paramsLevel );
			levelPoint.show();
			k--;
		}
		
		let coorsButsСhangeLoc = [];
		coorsButsСhangeLoc[1] = [ //numLocation
								  [ 809.8, 1431.25 ] , //butPreviousLoc
								  [ 833.4,   68.95 ]   //butNextLoc
								];
		coorsButsСhangeLoc[2] = [ //numLocation
								  [ 856.35, 1282.3 ] , //butPreviousLoc
								  [ 821.5,   12.7 ]   //butNextLoc
								];
		coorsButsСhangeLoc[3] = [ //numLocation
								  [ 857.35, 1219.3 ] , //butPreviousLoc
								  [ 832.85,  178.7 ]   //butNextLoc
								]; 	
		coorsButsСhangeLoc[4] = [ //numLocation
								  [ 809.8, 1431.25 ] , //butPreviousLoc
								  [ 833.4,   68.95 ]   //butNextLoc
								]; 

		let onPreviousLoc = function( evt ) {
			if( self.numLocation > 1 ) {
				self.numLocation--;
				if ( self.imgBackgr ) Handler.removeImage( self.imgBackgr );
				self.groupLevels.destroy();
				self.showLocation();
			}
		};
		
		let butPreviousLoc = Handler.showImgRect( self.groupLevels, "butPreviousLoc.png", coorsButsСhangeLoc[numL][0][0], coorsButsСhangeLoc[numL][0][1], 44, 50 );
		butPreviousLoc.anchor.set(0);
		butPreviousLoc.onEL("pointertap", onPreviousLoc);
		
		let onNextLoc = function( evt ) {
			if( self.numLocation < Math.floor( self.currentLevel/100 )+1  ) {
				if( Math.floor( ) < numL*100 ) {
					if ( self.imgBackgr ) Handler.removeImage( self.imgBackgr );
					self.numLocation = 1;
				}
				self.numLocation++;
				self.groupLevels.destroy();
				self.showLocation();
			};
		};
		
		let butNextLoc = Handler.showImgRect( self.groupLevels, "butNextLoc.png", coorsButsСhangeLoc[numL][1][0]-2, coorsButsСhangeLoc[numL][1][1], 71, 57 );
		butNextLoc.anchor.set(0);
		butNextLoc.onEL("pointertap", onNextLoc);

		if ( isMobile ) {
			if ( self.mainGroup.x - xCurrentLevel <= self.maxRight && self.mainGroup.x - xCurrentLevel >= self.maxLeft ) {
				self.mainGroup.x -= xCurrentLevel;
			} else if ( self.mainGroup.x - xCurrentLevel <= self.maxRight ) {
				self.mainGroup.x = self.maxLeft;
			} else if ( self.mainGroup.x - xCurrentLevel >= self.maxLeft ) {
				self.mainGroup.x = self.maxRight;
			};
		};
		if ( self.mainGroup.y - yCurrentLevel <= self.maxTop && self.mainGroup.y - yCurrentLevel >= self.maxDown ) {
			self.mainGroup.y -= yCurrentLevel;
		} else if ( self.mainGroup.y - yCurrentLevel <= self.maxTop ) {
			self.mainGroup.y = self.maxDown;
		} else if ( self.mainGroup.y - yCurrentLevel >= self.maxDown ) {
			self.mainGroup.y = self.maxTop;
		};
	}   
	
	CWindMenuLevels.showBakcgr = function( ) {
		let self = this;
		this.numBackgr = ( self.numLocation-1 ) % 4 + 1;
	//	let yBackgr = isMobile ? -38 : 0;
		let nameBackgr = Consts.DIR_BACKGROUNDS + 'mBackgr'+this.numBackgr+'.png';
		let backToBack = function( img ) {
 
			self.backgr[self.numBackgr] = 1;
			self.imgBackgr = img;
			//Handler.toBack(img);
			img.toBack();
;		
		};

		if ( self.backgr[this.numBackgr] != 0 ) {
			self.imgBackgr = Handler.showImgRect( self.mainGroup,  nameBackgr, 0, 0, self.width, self.height );
			Handler.toBack(self.imgBackgr);
 		} else {
			Handler.loadAndDrawRemoteImage( self.mainGroup, null, nameBackgr, 0, 0, self.width, self.height, backToBack );
		}
	};
	
	CWindMenuLevels.initStats = function() {
		let self = this;
		self.currentLevel = User.ml-1;
		self.maxCoutnLevel = 100;
		self.numLocation = Math.floor( self.currentLevel / 100 ) + 1;
		console.log( "self.numLocation", self.numLocation );
		//if ( self.numLocation < 1 ) self.numLocation = 1;
		self.maxLevel = ( self.numLocation * self.maxCoutnLevel ) - 1; //arrays 0-49 before lua 1 - 50;
		self.minNumLevel = self.maxLevel - (self.maxCoutnLevel - 1);
	};
	
	CWindMenuLevels.startup = function( params ) {
		let self = this;
		
		Sounds.init();
		//Sounds.Play();
		
		self.mainGroup = Handler.newGroup( Handler.canvas );
		self.mainGroup.sortableChildren = true;
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		self.width  = 900;
		self.height = 1580;
		
		//self.numLocation = 1;
		this.initStats();
		this.backgr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];	

		self.pointTouchStartX = null;
		self.pointTouchStartY = null;
		let touchMenuLevel = function ( evt ) {
			let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			let gy = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
			self.pointTouchStartX = gx;
			self.pointTouchStartY = gy;
		};		
		let pupMenuLevel = function ( evt ) {
			self.pointTouchStartX = null;
			self.pointTouchStartY = null;
		};
		
		self.mainScale = isMobile ? 1.4 : 760/900 ;//visibleHeight / pixiAppHeight;
		self.scaleScreen = 1;//visibleHeight / pixiAppHeight;
		console.log("scaleScreen",self.scaleScreen);
		//self.maxRight  = Math.floor( Handler.contentCenterX*self.scaleScreen + (Handler.contentCenterX - visibleWidth/2) );//сдвиг поля
		//self.maxLeft   = Math.floor( Handler.contentCenterX/self.scaleScreen - (Handler.contentCenterX - visibleWidth/2) );
		 
		self.maxRight = Math.floor( Handler.contentCenterX*self.scaleScreen + ( self.width*self.mainScale - visibleWidth)/2 );//944
		self.maxLeft  = Math.floor( Handler.contentCenterX/self.scaleScreen - ( self.width*self.mainScale - visibleWidth)/2 );
		
		if ( isMobile ) {
			self.maxTop  = Math.floor( Handler.contentCenterY*self.scaleScreen + ( self.height*self.mainScale - visibleHeight)/2 );
			self.maxDown = Math.floor( Handler.contentCenterY/self.scaleScreen - ( self.height*self.mainScale - visibleHeight)/2 );
		} else {
			self.maxTop  = Math.floor( Handler.contentCenterY*self.scaleScreen + ( self.height*self.mainScale - pixiAppHeight)/2 );
			self.maxDown = Math.floor( Handler.contentCenterY/self.scaleScreen - ( self.height*self.mainScale - pixiAppHeight)/2 );
		};
		console.log("self.maxTop",  self.maxTop);
		console.log("self.maxDown", self.maxDown);
		
		let moveMenuLevel = function ( evt ) {
			if ( self.pointTouchStartX == null || self.pointTouchStartY == null ) return;
			//let w = Winds.getTopWindName(); 
			if ( Winds.getTopWindName() != Winds.WIND_MENU_LEVELS ) return;
			let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			let gy = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
			let newx = gx - self.pointTouchStartX;
			let newy = gy - self.pointTouchStartY;
			//if ( self.mainGroup.x + newx < self.maxRight          &&     self.mainGroup.x + newx > self.maxLeft ) {
			if ( isMobile && self.mainGroup.x + newx <= self.maxRight && self.mainGroup.x + newx >= self.maxLeft ) {
				self.mainGroup.x += newx;
			};
			
			if ( self.mainGroup.y + newy <= self.maxTop && self.mainGroup.y + newy >= self.maxDown ) {
				self.mainGroup.y += newy;
			};
			
			self.pointTouchStartX = gx;
			self.pointTouchStartY = gy;
		};
		
		this.showLocation();
		
		self.mainGroup.scale.x = self.mainScale;//self.scaleScreen;
		self.mainGroup.scale.y = self.mainScale;//self.scaleScreen;
		
		self.mainGroup.onEL( 'pointermove', moveMenuLevel  );
		self.mainGroup.onEL( 'pointerdown', touchMenuLevel );
		self.mainGroup.onEL( 'pointerup',   pupMenuLevel );

	}
	
	CWindMenuLevels.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindMenuLevels;