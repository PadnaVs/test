	const User = {};
	
	User.data = null;
	User.dataNeighbor = null;
	User._username = '';
	User._friends = [];
	User.readyForUse = false;
	User.levelKey = 0;
	User.loseLevel = '';
	User.loseCount = 0;
	User.td = 0;
		
	User.init = function( params ) {
		User.data = params.user;
		User.td = params.ts - Math.floor( Date.now()/1000 );
		//_score = new Score();
		if ( params.stars != null ) {
		    let stars = [];
		    for ( let s in params.stars ) {
		        stars[s] = params.stars[s];
		    }
		    User.data.stars = stars;
		}
		User.readyForUse = true;
		User._viewer_id = User.data.outer_id;
	}
	Object.defineProperty( User, "viewer_id", {
    	get: function(   ) {
    		if ( this._viewer_id == null ) {
    			//GET viewer_id FROM ODKL FRAME LOCATION GET PARAMS
    	        let args = location.href.split("?");
    	        let vars = args[1].split("&");
    	        let prms = {};
    	        
    	        for (i = 0; i < vars.length; i++) {
    	        	let entry = vars[i].split("=");
    	        	prms[entry[0]] = entry[1];
    	        }
    			this._viewer_id = prms.logged_user_id;
    		}
    	    return this._viewer_id; 
    	},		 
    	set: function(val) { this._viewer_id =  val; }
    }); 
	
	Object.defineProperty( User, "ts", {
		get: function() { return Math.floor( Date.now()/1000 ) + User.td; },		 
		set: function() {  }
	});
	User.die = function()	{ }

	// TODO: общение с сервером
	Object.defineProperty( User, "countPayments", {
		get: function(   ) { return parseInt(User.data['countPayments']); },		 
		set: function(val) { User.data['countPayments'] =  val; }
	});
	Object.defineProperty( User, "act1", {
		get: function(   ) { return parseInt(User.data['act1']); },		 
		set: function(val) { User.data['act1'] =  val; }
	});
	Object.defineProperty( User, "act20", {
		get: function(   ) { return parseInt(User.data['act20']); },		 
		set: function(val) { User.data['act20'] =  val; }
	});
	Object.defineProperty( User, "actJP", {
		get: function(   ) { return parseInt(User.data['actJP']); },		 
		set: function(val) { User.data['actJP'] =  val; }
	});
	Object.defineProperty( User, "actions", {//255 - 000 001 011 111 //samiy praviy simvol - vstupi v gruppu poluchi bombu
		get: function(   ) { return parseInt(User.data['actions']); },		 
		set: function(val) { User.data['actions'] =  val; }
	});
	Object.defineProperty( User, "rulette", {
		get: function(   ) { return parseInt(User.data['rulette']); },		 
		set: function(val) { User.data['rulette'] =  val; }
	});
	Object.defineProperty( User, "notices", {//1 - notice1 		//10,11 - notice2 		//100,101,110,111 - notice3
		get: function(   ) { return parseInt(User.data['notices']); },		 
		set: function(val) { User.data['notices'] =  val; }
	});
	Object.defineProperty( User, "actInv", {
		get: function(   ) { return parseInt(User.data['actInv']); },		 
		set: function(val) { User.data['actInv'] =  val; }
	});
	Object.defineProperty( User, "friendGift", {
		get: function(   ) { return parseInt(User.data['friendGift']); },		 
		set: function(val) { User.data['friendGift'] =  val; }
	});
	Object.defineProperty( User, "freeMixBoost", {
		get: function(   ) { return parseInt(User.data['freeMixBoost']); },		 
		set: function(val) { User.data['freeMixBoost'] =  val; }
	});
	Object.defineProperty( User, "freeMixHelp", {
		get: function(   ) { return parseInt(User.data['freeMixHelp']); },		 
		set: function(val) { User.data['freeMixHelp'] =  val; }
	});
	Object.defineProperty( User, "ml", {
		get: function(   ) { return parseInt(User.data['ml']); },
		set: function(val) { User.data['ml'] =  val; }
	});
	Object.defineProperty( User, "coins", {
		get: function(   ) { return parseInt(User.data['coins']); },		 
		set: function(val) { User.data['coins'] =  val; }
	});
	Object.defineProperty( User, "energy", {
		get: function(   ) { return parseInt(User.data['energy_v']); },		 
		set: function(val) { User.data['energy_v'] =  val; }
	});
	Object.defineProperty( User, "bonus", {
		get: function(   ) { return parseInt(User.data['energy_u']); },		 
		set: function(val) { User.data['energy_u'] =  val; }
	});
	Object.defineProperty( User, "exp", {
		get: function(   ) { return parseInt(User.data['exp']); },		 
		set: function(val) { User.data['exp'] =  val; }
	});
	Object.defineProperty( User, "puzzleprz", {
		get: function(   ) { return parseInt(User.data['puzzleprz']); },		 
		set: function(val) { User.data['puzzleprz'] =  val; }
	});
	Object.defineProperty( User, "puzzlenum", {
		get: function(   ) { return parseInt(User.data['puzzlenum']); },		 
		set: function(val) { User.data['puzzlenum'] =  val; }
	});
	Object.defineProperty( User, "puzprz", {
		get: function(   ) { return parseInt(User.data['puzprz']); },		 
		set: function(val) { User.data['puzprz'] =  val; }
	});
	Object.defineProperty( User, "bGL", {
		get: function(   ) { return parseInt(User.data['bGL']); },		 
		set: function(val) { User.data['bGL'] =  val; }
	});
	Object.defineProperty( User, "bVL", {
		get: function(   ) { return parseInt(User.data['bVL']); },		 
		set: function(val) { User.data['bVL'] =  val; }
	});
	Object.defineProperty( User, "bPL", {
		get: function(   ) { return parseInt(User.data['bPL']); },		 
		set: function(val) { User.data['bPL'] =  val; }
	});
	Object.defineProperty( User, "bMX", {
		get: function(   ) { return parseInt(User.data['bMX']); },		 
		set: function(val) { User.data['bMX'] =  val; }
	});
	Object.defineProperty( User, "bMT", {
		get: function(   ) { return parseInt(User.data['bMT']); },		 
		set: function(val) { User.data['bMT'] =  val; }
	});
	Object.defineProperty( User, "bCH", {
		get: function(   ) { return parseInt(User.data['bCH']); },		 
		set: function(val) { User.data['bCH'] =  val; }
	});
	Object.defineProperty( User, "flags", {
		get: function(   ) { return parseInt(User.data['flags']); },		 
		set: function(val) { User.data['flags'] =  val; }
	});
	Object.defineProperty( User, "flagstatus", {
		get: function(   ) { return parseInt(User.data['flagstatus']); },		 
		set: function(val) { User.data['flagstatus'] =  val; }
	});
	Object.defineProperty( User, "stars", {
		get: function(   ) { return User.data['stars'] || []; },		 
		set: function(val) {  }
	});

	User.collsBody = function( ffi, num ) {     //add colls in MenuLevel
		let fn = ffi % 10;
		let fcolls = User.data[ 'colls'+num ];
		let res = Math.floor( fcolls / Math.pow(10,fn-1) );
		//res -= 10 * Math.floor( res / 10 );
		res = res % 10;
		return res;
	}	
	User.setColls = function( num ,val ) {
		User.data['colls'+num] = val;
	}
	
	Object.defineProperty( User, "isNew", {
		get: function(   ) { return User.data['isNew']; },		 
		set: function(val) {  }
	});

	