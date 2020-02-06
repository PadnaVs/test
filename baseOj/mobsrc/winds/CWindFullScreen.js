	
	"use strict";
	
    let CWindFullScreen = {};         

    CWindFullScreen.newObject = function() { 
        let self = this;

        return self;         
    };         

    CWindFullScreen.startup = function( params ) {
        let self = this;
        self.mainGroup = Handler.newGroup( Handler.gWinds );
		self.mainGroup.x = Handler.contentCenterX;       
		self.mainGroup.y = Handler.contentCenterY;
		
		//self.backround = Handler.showWindBackround(0,0, 480, 470,"angleFullScreen.png","sideFullScreen.png","0xf0ecaa"); 
        //self.mainGroup.addChild(self.backround);         
        
		let showContent = function() {
			Handler.showImgRect( self.mainGroup, Consts.DIR_FULL_SCREEN + "backgrFullScreen.png",   0,  0, 662, 518 );
			
			let cross = Handler.showImgRect(self.mainGroup,"cross.png", 311, -237, 36, 36 );//cross         
			cross.onEL("pointerdown", function() { self.shutdown() } );
			
			Handler.showImgRect( self.mainGroup, Consts.DIR_FULL_SCREEN + "titleFullScreen.png",    0,  -209, 386, 40 );    
			Handler.showImgRect( self.mainGroup, Consts.DIR_FULL_SCREEN + "labelBack.png",          0, -69, 422,106 );     
			Handler.showImgRect( self.mainGroup, Consts.DIR_FULL_SCREEN + "labelFullScreen.png",    0, -69, 288, 78 );
			
			let butAdd = Handler.showImgRect( self.mainGroup, Consts.DIR_FULL_SCREEN + "butSizeAdd.png",5,41, 276, 52 );
			let butDec = Handler.showImgRect( self.mainGroup, Consts.DIR_FULL_SCREEN + "butSizeDec.png",5,141, 276, 52 );
			
			
			let onButAdd = function( evt ) {
				if ( pixiApp.stage.scale.x >= 3 ) return;
				
				pixiApp.stage.scale.x += 0.2;
				pixiApp.stage.scale.x = Math.min( 3, pixiApp.stage.scale.x );
				pixiApp.stage.scale.y = pixiApp.stage.scale.x;
				
				let canvas = document.querySelector('canvas');
				if ( canvas ) {
					canvas.width  = pixiAppWidth  * pixiApp.stage.scale.x;//pixiApp.stage.width;
					canvas.height = pixiAppHeight * pixiApp.stage.scale.y;//pixiApp.stage.height;
					canvas.style.width  = canvas.width  + "px";
					canvas.style.height = canvas.height + "px";
				}
			};
			butAdd.onEL("pointerdown", onButAdd );
			
			let onButDec = function( evt ) {
				if ( pixiApp.stage.scale.x <= 1 ) return;
				
				pixiApp.stage.scale.x -= 0.2;
				pixiApp.stage.scale.x = Math.max( 1, pixiApp.stage.scale.x );
				pixiApp.stage.scale.y = pixiApp.stage.scale.x;
				
				let canvas = document.querySelector('canvas');
				if ( canvas ) {
					canvas.width  = pixiAppWidth  * pixiApp.stage.scale.x;//pixiApp.stage.width;
					canvas.height = pixiAppHeight * pixiApp.stage.scale.y;//pixiApp.stage.height;
					canvas.style.width  = canvas.width  + "px";
					canvas.style.height = canvas.height + "px";
				}
			};
			butDec.onEL("pointerdown", onButDec );
			
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_FULL_SCREEN ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_FULL_SCREEN ] = 1;
			let listOfImages = [
				"winds/fullScreen/labelBack.png",
				"winds/fullScreen/titleFullScreen.png",
				"winds/fullScreen/labelFullScreen.png",
				"winds/fullScreen/butSizeDec.png",
				"winds/fullScreen/butSizeAdd.png",
				"winds/fullScreen/backgrFullScreen.png"
			];
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
        return self.mainGroup;         
    };        

    CWindFullScreen.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};
