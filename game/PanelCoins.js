
    const PanelCoins = {};         
    window. PanelCoins = PanelCoins;
	
	PanelCoins.initialized = false;
    PanelCoins.init = function( parent, shx=0 ) {
		let self = this;
		this.parent = parent;
		if ( this.group == null ) {
		    let group = Handler.newGroup(parent);
			this.group = group;
			this.group.x += shx;
			
            let onCoinPLus = function() { Main.wbc = new WindBuyCoins( self.parent ); };
            Handler.addImg( group, "./images/coinsBack.png",  478, 20 );
            Handler.addImg( group, "./images/coin.png",       460, 14 );
            Handler.addImg( group, "./images/coinPlus.png",   644, 26, onCoinPLus );
            
            let countCoins = User.coins;
            let countCoinsArr = (countCoins+"").split("");
            let countCoinsX = 588-countCoinsArr.length*12;
			
			this._countCoins = null;
            Object.defineProperty( this, "countCoins", {
                get: function() { return this._countCoins; },		 
                set: function(val) {
		    	    if ( val != this._countCoins ) {
						this._countCoins = val;
						if ( this.coinsGroup != null ) Handler.destroy( this.coinsGroup );
						this.coinsGroup = Handler.newGroup(this.group);
                        let countCoinsArr = (this._countCoins+"").split("");
                        let countCoinsX = 588-countCoinsArr.length*12;
                        countCoinsArr.forEach( function(a) {
                            Handler.addImg( self.coinsGroup, "./images/fonts/f40"+a+".png", countCoinsX, 30 );
                            countCoinsX += 24;
                        } );
		    		}
		    	}
            });	
			this.countCoins = User.coins;
           /* countCoinsArr.forEach( function(a) {
                Handler.addImg( self.coinsGroup, "./images/fonts/f40"+a+".png", countCoinsX, 30 );
                countCoinsX += 24;
            } );
			*/
		} else {
			Handler.addChild( parent, this.group );
			this.group.toFront();
		}
		this.group.x += shx;
	};


  
