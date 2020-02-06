    
    let Actions = {};     
    
	//Actions.WIND_ACTION0         = 1;
    //Actions.WIND_ACTION1         = 2;
    //Actions.WIND_AC_BOOSTER      = 3;
    //Actions.WIND_ACTION4         = 4;
    //Actions.WIND_AC_INV_TO_GAME  = 5;
    //Actions.WIND_ACT_FRIENDS     = 6;
    //Actions.WIND_ACT_INVITE      = 7;
    //Actions.WIND_SMALL_ACT_INV   = 8;
    //Actions.WIND_ACT_5_STEPS     = 9;
    //Actions.WIND_FR_INVITED      = 10;
	
	Actions.WIND_ACTION0               = 1;
    Actions.WIND_ACTION1               = 2;
    Actions.WIND_AC_BOOSTER            = 3;
    Actions.WIND_ACTION4               = 4;
    Actions.WIND_AC_INV_TO_GAME        = 5;
    Actions.WIND_ACT_FRIENDS           = 6;
    Actions.WIND_ACT_INVITE            = 7;
    Actions.WIND_ADD_STEPS_FOR_INVITE  = 8;
    Actions.WIND_ACT_5_STEPS           = 9;
    Actions.WIND_FR_INVITED            = 10;
	
    Actions.show = function( name, parent ) {
        this.wind = null;
		
        if      ( name == this.WIND_ACTION0        )        this.wind = CWindAction0           .newObject();
        else if ( name == this.WIND_ACTION1        )        this.wind = CWindAction1           .newObject();
        else if ( name == this.WIND_AC_BOOSTER     )        this.wind = CWindAcBooster         .newObject();
        else if ( name == this.WIND_ACTION4        )        this.wind = CWindAc4               .newObject();
        else if ( name == this.WIND_AC_INV_TO_GAME )        this.wind = CWindAcInvToGame       .newObject();
        else if ( name == this.WIND_ACT_FRIENDS    )        this.wind = CWindAcFriends         .newObject();
        else if ( name == this.WIND_ACT_INVITE     )        this.wind = CWindAcInvite          .newObject();
        else if ( name == this.WIND_ADD_STEPS_FOR_INVITE  ) this.wind = CWindAddStepsForInvite .newObject();
        else if ( name == this.WIND_ACT_5_STEPS    )        this.wind = CWindAc5Steps          .newObject();
        else if ( name == this.WIND_FR_INVITED     )        this.wind = CWindFrInvited         .newObject();

        this.wind.parent = parent;
        this.wind.name = name;

        let windGroup = this.wind.startup( parent );
        
        if ( windGroup != null ) {
			//Handler.loadingStart();
            this.wind.main_Group_Of_The_Window = windGroup;         
            let oldy = windGroup.y;         
            windGroup.y = Handler.contentHeight + 200;         
            windGroup.alpha = 0.3;
            Handler.transition_to( windGroup, { time: Consts.TIME_WINDOW_MOVE, y:oldy, alpha:1, onComplete: Handler.loadingStop } );  
        };
		return this.wind;
    }; 