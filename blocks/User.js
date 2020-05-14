    const User = {
        _friends    : [],
        readyForUse : false,
        td          : 0,
        init: function( params ) {
            this.params = params;
            //попробовать скопировать объект params.user перечислением свойств
            //self._data = params.user;
            this.td = params.ts - Math.floor( Date.now()/1000 );
    		
            this.readyForUse = true;
        }
    };
    
    Object.defineProperty( User, "viewer_id", {
    	get: function(   ) {
    		if ( this._viewer_id == null ) {
    			//GET viewer_id FROM ODKL FRAME LOCATION GET PARAMS
    	        let args = location.href.split("?");
    	        let vars = args[1].split("&");
    	        let parms = {};
    	        
    	        for ( let i = 0; i < vars.length; i++) {
    	        	let entry = vars[i].split("=");
    	        	parms[entry[0]] = entry[1];
    	        }
				if ( Config.NETWORK == Consts.NETWORK_VK ) {
					this._viewer_id = parms.viewer_id;
				} else {
    			    this._viewer_id = parms.logged_user_id;
				}
    		}
    	    return this._viewer_id; 
    	},		 
    	set: function(val) { this._viewer_id =  val; }
    }); 
    
    Object.defineProperty( User, "_data", {
        get: function() { return this.params.user; },		 
        set: function() {  }
    });	
    Object.defineProperty( User, "id", {
    	get: function() { return this._data['id']; },		
    	set: function() {  }
    });    
	Object.defineProperty( User, "ts", {
    	get: function() { return Math.floor( Date.now()/1000 ) + User.td; },		 
    	set: function() {  }
    });
    Object.defineProperty( User, "countPayments", {
		get: function(   ) { return parseInt( this.params['countPayments'] ); },		 
    	set: function(val) { this.params['countPayments'] = val; }
    });
    Object.defineProperty( User, "ml", {
    	get: function(   ) { return parseInt(this._data['ml']); },		 
    	set: function(val) { this._data['ml'] =  val; }
    });
    Object.defineProperty( User, "coins", {
    	get: function(   ) { return parseInt(this._data['coins']); },		 
    	set: function(val) { this._data['coins'] =  val; }
    });
    Object.defineProperty( User, "exp", {
    	get: function(   ) { return parseInt(this._data['exp']); },		 
    	set: function(val) { this._data['exp'] =  val; }
    });
    Object.defineProperty( User, "isNew", {
    	get: function(   ) { return this._data['isNew']; },		 
    	set: function(val) {  }
    });
