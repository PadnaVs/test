
    let BackClient = {};         

 	BackClient.AUTH 				    = 'auth';
	BackClient.FRIENDS 		 			= "friends";
	BackClient.GAME_OVER 				= 'gameOver';
	BackClient.GAME_Start 				= 'gameStart';

	BackClient.BUY_CONTINUE 			= "buyContinue";
	BackClient.LOG_STREAM_PUBLISH_OK 	= "logStreamPublishOK";
	BackClient.DEC_BOOSTER 				= "decBooster";
	
	BackClient.USER_GET_TOP 			= 'userGetTop';
	BackClient.USER_GET_TOP_WEEK 	  	= 'userGetTopWeek';
	BackClient.USER_GET_TOP_DAY 		= 'userGetTopDay';
	BackClient.USER_GET_TOP_COINS 	 	= 'userGetTopCoins';
	
	BackClient.GET_TUT_PRIZE 	 	    = 'getTutPrize';
	BackClient.GET_ACT_FRIENDS 	 		= 'getActFriends';
	BackClient.PRESENT_SEND 	      	= 'present.send';		
	
	BackClient.GET_ACT_INV 	      		= 'getActInvite';	
	
	BackClient.GET_ACT_INV_BG2 	     	= 'getActInviteBG2';	
	BackClient.GET_ACT_INV_BG3 	     	= 'getActInviteBG3';	
	
	BackClient.GET_FRIENDS_LEVEL_SCORE 	= 'getFriendsLevelScore';

	BackClient.USER_PAY  			    = "user.pay";
	BackClient.USER_BALANCE  		    = "user.balance";
	BackClient.USER_BOOSTERS  			= "userBoosters";
	BackClient.USER_FRIENDS_UPDATE 		= 'user.friendsUpdate';
	BackClient.USER_CHANGE_VOTES 	    = 'user.changeVotes';
 
	BackClient.QUEUE 		 			= "queue";

	BackClient.LEVEL_FINISH 			= "levelFinish";
	BackClient.LEVEL_GET 				= "levelGet";	
	BackClient.LEVEL_STARTED 			= "levelStarted";	
	BackClient.GET_USER_DATA  			= "getUserData";
	BackClient.ERASE_STEPS  			= "eraseSteps";
	BackClient.BUY_LEV_FIN 				= "buyLevFin";	
	
	BackClient.GET_BONUS 		        = 'getBonus';
	BackClient.COINS_TO_ENERGY 			= 'coinsToEnergy';
	BackClient.GET_COINS_AND_ENERGY	    = "getCoinsAndEnergy";
	
	BackClient.CHANGE_COL 				= "change.col";
	BackClient.BUY_ITEM_COL 			= "buy.item.col";

	BackClient.GET_MY_SCORE 			= "getMyScore";
	BackClient.GET_PUZ_PRZ 				= 'getPuzPrz';
	BackClient.LOG_ADD 					= "logAdd";
	

    BackClient.sid = "";
	
	BackClient._config = {};
		
	BackClient._ask_method			= '';
	BackClient._ask_callback		= null;
	BackClient._ask_options			= null;
    BackClient._ask_errorCallback	= null;
    BackClient._ask_timer           = null;//= new Timer(300);
		
    BackClient.init = function( config ) {
        this.config = config;         

        if ( Config.NETWORK == Consts.NETWORK_OK ) {
            //this.config.session_key = Consts.session_key;         
            //this.config.auth_key    = Consts.auth_key;
		
        } else if ( Config.NETWORK == Consts.NETWORK_VK ) {
            //this.config.session_key = Consts.session_key;         
            //this.config.auth_key    = Consts.auth_key;
		
        } else if ( Config.NETWORK == Consts.NETWORK_DV ) {
            //this.config.session_key = Consts.auth_key;         
            //this.config.auth_key    = Consts.auth_key;
			
        } else {
			throw Handler.catchError = "ERROR. Unknown network!";
            console.log("ERROR. Unknown network!");         
        };         

        return this;         
    };
	BackClient.send = function( method, options ) {
        this.request( method, null, options );         
    };

    BackClient.ask = function( method, callback, options, errorCallback ) {
        this.request( method, callback, options, errorCallback );         
    };         

    BackClient.request = function( method, callback, options, errorCallback ) {
        let self = this;
        
		options = options || {};
		let _method = method;
        let _errorCallback = errorCallback || function(){};         
        options.version = Consts.VERSION;
        let callbackBackendClient = null;
        if ( callback != null ) {
            callbackBackendClient = function( evt ) {
                if ( evt.isError ) {
                    console.log( "Network error. " + evt.response );         
                    _errorCallback( evt.response );         
                } else {
                    console.log( "RESPONSE. " + evt.response );  
		    
		            let res = evt.response;
		            if ( Config.crypt ) {
		    		    let resdc = ''+Crypt.decrypt( res );
		    			res = resdc.split("\\\"").join('"');//replaceAll
		    		}
                    let response = JSON.parse( res );
                    callback( response.response );         
                };
            };
        }
        let query = "m="+_method+"&network="+Config.NETWORK+"&viewer_id="+User.viewer_id+"&auth_key="+self.config.auth_key;     

        for ( let key in options ) {
           let val = options[ key ]; 
            query = query+"&"+key+"="+val;         
        };         

		if ( Config.crypt ) query = "k="+encodeURIComponent( Crypt.encrypt( query ) );
		
		let xhr = new XMLHttpRequest();
		xhr.open( "POST", Config.BACKEND_API_URL, true );
		xhr.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
		xhr.onreadystatechange = function() {
			if ( xhr.readyState ===  XMLHttpRequest.DONE ) {
				if ( xhr.status != 200 ) { // обработать ошибку
                    alert( "Ошибка передачи данных: " + xhr.status + ': ' + xhr.statusText + " метод " + _method );
                    console.log( "Ошибка передачи данных: " + xhr.status + ': ' + xhr.statusText + " метод " + _method );
				} else if ( callback != null ) {
					//callbackBackendClient( JSON.parse( xhr.responseText ) );
					callbackBackendClient( { response:  xhr.responseText } );
					//if (isFunc(callback)) { callback("ok", xhr.responseText, null); }
				}
			}
		};
		xhr.send( query );
    };//request                  
