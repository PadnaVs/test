
	let Winds = null;
	try {
		
		Winds = CWinds.newObject();
		
        const onAuthCallback = function( response ) {
			try {
				if ( Winds.getTopWindName() == Winds.WIND_LOADER ) {
					Winds.shutdownTopWind(1);
				}
				User.init( response );//User must inited before Winds.WIND_MENU_LEVELS
				Winds.show( Winds.WIND_MENU_LEVELS );
				//Winds.show( Winds.WIND_STEPS_LEFT );
				//Winds.show( Winds.WIND_ACTION0 );
				//Winds.show( Winds.WIND_ACTION1 );
				//Winds.show( Winds.WIND_FR_INVITED );
				//Winds.show( Winds.WIND_ACT_INVITE );
				//Winds.show( Winds.WIND_DAILY_BONUS, { num_day: 1 } );
				//Winds.show( Winds.WIND_END_LEVEL );
				//Winds.show( Winds.WIND_PUZZLE );
				//Winds.show( Winds.WIND_MSG, { text: Langs.TRANSITION_TO_LOCATION } );
				//Winds.show( Winds.WIND_ACT_5_STEPS );
				Head.init( response );
				//BotomPanel.show();
				BottomPanel.show();
 
				if ( parseInt(response.db) > 0 ) {
					Winds.show( Winds.WIND_DAILY_BONUS, { num_day: parseInt(response.db) } );
				}
                if ( parseInt(response['a3b']) == 1 ) {
			    	let txt3 = 'Вам подарок! ' +
			    		'\nБонус большой взрыв!' +
			    		'\nБонус малый взрыв!' +
			    		'\nБонус молоток!';
			    
			    	Winds.show( Winds.WIND_MSG, { text:txt3 } );
			    }
 
                if ( parseInt( response['ci'] ) > 0 ) {
					Winds.show( Winds.WIND_FR_INVITED, { coins: parseInt( response['ci'] )*100 } );
				} else {
					Winds.show( Winds.WIND_ACT_INVITE );
				}
				
			} catch (ex) {
				Log.onErrorCatched(ex);
			}
		};
        const onSocialClientInited = function( _response ) {
	    	try {
	            User.viewer_id = SocialClient.viewer_id || Consts.viewer_id;
	    
	            let authKey = SocialClient.sig || "502f67320e1e22f7d8291f5905bcb144";
                
	            BackClient.init( { auth_key: authKey } );     
				Handler.canvas    = Handler.newGroup();
				Handler.head      = Handler.newGroup();
				Handler.gWinds    = Handler.newGroup();
				Handler.gLoading  = Handler.newGroup();
				
                BackClient.ask( BackClient.AUTH, onAuthCallback );  
	    	} catch ( err ) {
	    	    Log.onErrorCatched( err );
	    	}
        };
		
		let onAssetsLoaded = function() {
			try {
		        if ( Config.NETWORK == Consts.NETWORK_DV ) {
		        	onSocialClientInited();
		        } else {
		            SocialClient.init( onSocialClientInited );
                }
			} catch ( err ) {
	    	    Log.onErrorCatched( err );
	    	}
			try {
				/*let authKey = "";
				User._viewer_id = "550923363671";
				BackClient.init( { auth_key: authKey } );
				Handler.canvas    = Handler.newGroup();
				Handler.head      = Handler.newGroup();
				Handler.gWinds    = Handler.newGroup();
				Handler.gLoading  = Handler.newGroup();
				
				if ( isMobile != null && isMobile ) {
					const graphics = new PIXI.Graphics();
					graphics.lineStyle(2, 0x0000ff, 1);
					graphics.beginFill(0xDE3249,0);
					graphics.drawRect( ( pixiAppWidth - visibleWidth0 ) / 2, ( pixiAppHeight - visibleHeight0 ) / 2, visibleWidth0, visibleHeight0 );
					graphics.endFill();
					console.log('pixiApp.stage.',pixiApp.stage.x,pixiApp.stage.y);
					console.log('shScreenX',shScreenX*1+(1-pixiAppScaleMobile));
					pixiApp.stage.addChild(graphics);
				}*/
				
				
				//BackClient.ask( BackClient.AUTH, onAuthCallback );
			} catch (ex) {
		        Log.onErrorCatched(ex);
	        }
		}
		Winds.show( Winds.WIND_LOADER, { onAssetsLoaded: onAssetsLoaded } );
	} catch (ex) {
		Log.onErrorCatched(ex);
	}


	
	