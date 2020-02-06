		
	"use strict";	
	
	let CWindLoader = {};
	
	CWindLoader.newObject = function() {
		this.wind = {};
		this._countLoad = null;
		return this;
	};
	
	Object.defineProperty( CWindLoader, "countLoad", {
	    get: function(   ) { return this._countLoad; },		 
	    set: function(val) { 
		    this._countLoad = val;

			let per = this._countLoad / 100;
			if ( per > 1 ) per = 1;
            this.scaled.mask.x = 1*Math.floor( 230 * per );
			if ( this._countLoad == 100 ) this.shutdown();
		}
	});
	
	CWindLoader.startup = function(params) {
		let self = this;
		this.mainGroup = Handler.newGroup();
		this.mainGroup.x = Handler.contentCenterX-12;
		this.mainGroup.y = Handler.contentCenterY;
	
		let showContent = function() {
			//let scale = Math.floor( pixiApp.screen.height / 610 );
			
		    let backgr = Handler.showImgRect(self.mainGroup, Consts.DIR_WIND_LOADER+"backgrWindGame.png",12,0,760,610);
			if ( isMobile ) {
				let bakcgrScaleMobile = visibleHeight / pixiAppHeight;
				backgr.scale.set(bakcgrScaleMobile);
			};
			
			self.scaled = Handler.showImgRect( self.mainGroup, Consts.DIR_WIND_LOADER+"lineLoad.png",18,59,230,15);
		    self.scaled.mask = Handler.showRect( self.mainGroup, -212,59,230,16 );
		    Handler.showImgRect(self.mainGroup, Consts.DIR_WIND_LOADER+"lineLoadRamk.png",18,59,237,23);

		    Handler.showRoundedRect( self.mainGroup, -170, 100, 368, 118, '0xFFFF99', 5, 1, '0xA5744E' );
		    Handler.showImgRect( self.mainGroup,Consts.DIR_WIND_LOADER+"lableLoad.png", 14, 159, 313,63);
		    self.countLoad = 0;
		    ImageLoader.loadGo(params.onAssetsLoaded);
		    pixiApp.loader.onProgress.add(function(e) { self.countLoad = pixiApp.loader.progress });
		};
		
		let listOfImages = [
				"winds/windLoader/lableLoad.png",
				"winds/windLoader/lineLoadRamk.png",
				"winds/windLoader/lineLoad.png",
				"winds/windLoader/backgrWindGame.png"
			];
		
		ImageLoader.loadAssets(showContent, listOfImages);

	};
/*	
	CWindLoader.onAssetsLoaded = function() {
		let authKey = "";
		User.viewer_id = "550923363671";
		BackClient.init( { auth_key: authKey } );

		let onAuthCallback = function( response ) {
			User.init( response );//User must inited before Winds.WIND_MENU_LEVELS
		    Winds.show( Winds.WIND_MENU_LEVELS );
			Head.init( response );
			Winds.show( Winds.WIND_ACTION0 );
			Winds.show( Winds.WIND_ACT_INVITE );
			Winds.show( Winds.WIND_FR_INVITED );
			//response.db = 1; response.num_day = 3; response.numBonus = 3;
			if (parseInt(response['db'])>0) Winds.show( Winds.WIND_DAILY_BONUS, { num_day: parseInt(response.num_day), numBonus: parseInt(response.numBonus) } );			
			//Winds.show( Winds.WIND_END_LEVEL, { coins: 1, points: 2000, stars: 3 } );
        };
		BackClient.ask( BackClient.AUTH, onAuthCallback );
	}
*/
	
	CWindLoader.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};