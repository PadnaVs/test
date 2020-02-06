	
	let CWinds = {};
	
    CWinds.WIND_MENU_LEVELS            =  1;
    CWinds.WIND_GAME                   =  2;
    CWinds.WIND_BUY_COINS              =  3;
    CWinds.WIND_BUY_LIVES              =  4;
    CWinds.WIND_MY_SCORE               =  5;
							           
    CWinds.WIND_RULETTE                =  6;
    CWinds.WIND_BEFORE_LEVEL           =  7;
    CWinds.WIND_FIN_LEVEL              =  8;
    CWinds.WIND_FREE_MIX               =  9;
    CWinds.WIND_VIP_SCORE              = 10;
    CWinds.WIND_MSG                    = 11;
    CWinds.MSG                         = 11;
							           
    CWinds.WIND_END_LEVEL              = 12;
    CWinds.WIND_STEPS_LEFT             = 13;
    CWinds.WIND_BUY_BOOSTER            = 14;
    CWinds.WIND_PUZZLE                 = 15;

    CWinds.WIND_ACTION0                = 16;
    CWinds.WIND_ACTION1                = 17;
    CWinds.WIND_AC_BOOSTER             = 18;
    CWinds.WIND_ACTION4                = 19;
    CWinds.WIND_AC_INV_TO_GAME         = 20;
    CWinds.WIND_ACT_FRIENDS            = 21;
    CWinds.WIND_ACT_INVITE             = 22;
    CWinds.WIND_ADD_STEPS_FOR_INVITE   = 23;
    CWinds.WIND_ACT_5_STEPS            = 24;
    CWinds.WIND_FR_INVITED             = 25;

    CWinds.WIND_DAILY_BONUS            = 26;
	
    CWinds.WIND_FULL_SCREEN            = 27;
    CWinds.WIND_LOADER                 = 28;
    CWinds.WIND_LOADING                = 29;
    CWinds.WIND_M                      = 30;
	

//////////////////////////////////-
    CWinds.newObject = function() {
		this.winds = [];
        return this;
    };
	
    CWinds.show = function( name, params ) {
		try {
			let self = this;
			this.wind = null;
			if ( name == this.WIND_MENU_LEVELS ) {
				this.wind = CWindMenuLevels.newObject();
			} else if ( name == this.WIND_GAME ) {
				this.wind = CWindGame.newObject();
			} else if ( name == this.WIND_BUY_COINS ) {
				this.wind = CWindBuyCoins.newObject();
			} else if ( name == this.WIND_BUY_LIVES ) {
				this.wind = CWindBuyLives.newObject();
			} else if ( name == this.WIND_MY_SCORE ) {
				this.wind = CWindMyScore.newObject();
			} else if ( name == this.WIND_ACTION1 ) {
				this.wind = CWindAction1.newObject();
			} else if ( name == this.WIND_RULETTE ) {
				this.wind = CWindRoulette.newObject();
			} else if ( name == this.WIND_BEFORE_LEVEL ) {
				this.wind = CWindBeforeLevel.newObject();
			} else if ( name == this.WIND_FIN_LEVEL ) {
				this.wind = CWindFinLevel.newObject();
			} else if ( name == this.WIND_FREE_MIX ) {
				this.wind = CWindFreeMix.newObject();
			} else if ( name == this.WIND_VIP_SCORE ) {
				this.wind = CWindVipScore.newObject();
			} else if ( name == this.WIND_MSG ) {
				this.wind = CWindMsg.newObject();
			} else if ( name == this.WIND_AC_BOOSTER ) {
				this.wind = CWindAcBooster.newObject();
			} else if ( name == this.WIND_ACTION0 ) {
				this.wind = CWindAction0.newObject();
			} else if ( name == this.WIND_END_LEVEL ) {
				this.wind = CWindEndLevel.newObject();
			} else if ( name == this.WIND_STEPS_LEFT ) {
				this.wind = CWindStepsLeft.newObject();
			} else if ( name == this.WIND_BUY_BOOSTER ) {
				this.wind = CWindBuyBooster.newObject();
			} else if ( name == this.WIND_PUZZLE ) {
				this.wind = CWindPuzzle.newObject();
			} else if ( name == this.WIND_ACTION4 ) {
				this.wind = CWindAc4.newObject();
			} else if ( name == this.WIND_AC_INV_TO_GAME ) {
				this.wind = CWindAcInvToGame.newObject();
			} else if ( name == this.WIND_ACT_FRIENDS ) {
				this.wind = CWindAcFriends.newObject();
			} else if ( name == this.WIND_DAILY_BONUS ) {
				this.wind = CWindDailyBonus.newObject();
			} else if ( name == this.WIND_ACT_INVITE ) {
				this.wind = CWindAcInvite.newObject();
			} else if ( name == this.WIND_ADD_STEPS_FOR_INVITE ) {
				this.wind = CWindSmallAcInv.newObject();
			} else if ( name == this.WIND_ACT_5_STEPS ) {
				this.wind = CWindAc5Steps.newObject();
			} else if ( name == this.WIND_FULL_SCREEN ) {
				this.wind = CWindFullScreen.newObject();
			} else if ( name == this.WIND_FR_INVITED ) {
				this.wind = CWindFrInvited.newObject();
			} else if ( name == this.WIND_LOADER ) {
				this.wind = CWindLoader.newObject();
			} else if ( name == this.WIND_LOADING ) {
				this.wind = CWindLoading.newObject();
			} else if ( name == this.WIND_M ) {
				this.wind = CWindM.newObject();
			};

			params = params || {};
			this.wind.params = params;
			this.wind.name = name;
			this.winds.push( this.wind );

			this.wind.windIndex = this.winds.length;
			let windGroup = this.wind.startup( params );

			if ( windGroup != null ) {
	//			Handler.loadingStart();
//				if ( isMobile ) windGroup.y -= 45;
				const rx = windGroup.x;
				const ry = windGroup.y;
				self.wind.BACK_RECT_NO_INTERACTIVE = Handler.showRect( windGroup, rx-Handler.contentWidth/2, ry-Handler.contentHeight, Handler.contentWidth*2, Handler.contentHeight*2, '0x6E3232' );
				self.wind.BACK_RECT_NO_INTERACTIVE.alpha = 0.1;
				if ( self.wind.shXMainGrIsMobile == null ) self.wind.shXMainGrIsMobile = 0;
				self.wind.BACK_RECT_NO_INTERACTIVE.x -= self.wind.shXMainGrIsMobile;
				self.wind.BACK_RECT_NO_INTERACTIVE.interactive = true;
				self.wind.BACK_RECT_NO_INTERACTIVE.toBack();
				if ( isMobile ) {
					//self.wind.BACK_RECT_NO_INTERACTIVE.x += Math.floor( Handler.contentWidth/2 );
					self.wind.BACK_RECT_NO_INTERACTIVE.y = Math.floor( Handler.contentHeight/2 );
					//console.log("self.wind.BACK_RECT_NO_INTERACTIVE.x,self.wind.BACK_RECT_NO_INTERACTIVE.y",self.wind.BACK_RECT_NO_INTERACTIVE.x,self.wind.BACK_RECT_NO_INTERACTIVE.y);
				};
				//Handler.setWindScale( windGroup );
				self.wind.main_Group_Of_The_Window = windGroup;
				if ( windGroup.noTween == null ) {
				    let oldy = windGroup.y;
				    windGroup.y = Handler.contentHeight + 200;
				    windGroup.alpha = 0.3;
				    Handler.transition_to( windGroup, { time: Consts.TIME_WINDOW_MOVE, y:oldy, alpha:1, onComplete: Handler.loadingStop } );
			    }
			};
		} catch ( ex ) {
			Handler.onErrorCatched(ex);
		};
    };

    CWinds.shutdownTopWind = function( fastShutdown ) {
		try {
			this.wind = this.winds[ this.winds.length-1 ];
			if ( this.wind != null ) {
				this.wind.shutdown( fastShutdown );
			//	this.wind = this.winds.pop();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
    };

    CWinds.getTopWindName = function() {
        this.wind = this.winds[ this.winds.length-1 ];
        if ( this.wind != null ) {
            return this.wind.name;
        };
        return "";
    };
    CWinds.getWind = function() {
        this.wind = this.winds[ this.winds.length-1 ];
        if ( this.wind != null ) {
            return this.wind;
        };
        return "";
    };

    CWinds.shutdown = function( windIndex ) {
        if ( windIndex < this.winds.length ) {
		    return false; //do ! close bottom windows
		};
        this.winds.pop();
        return true;
    };