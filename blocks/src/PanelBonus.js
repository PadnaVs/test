
	let PanelBonus = function( _parent, _x, _y, _width, _height ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		
		this.numBonus = null;
		
		this.x = _x;
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.width = _width;
		this.height = _height;
		
		this._visible = true;
		
		this.bonuses = [];
		
		Object.defineProperty( this, "visible", {
	       get: function(   ) { return self._visible; },
	       set: function( val ) {
				self._visible = val;			   
				self.group.visible = self._visible;
	    	}
	    });
	};
	
	PanelBonus.prototype.show = function() {
		let self = this;
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
	
		this.cross = Handler.showRect( this.group, this.width-80, 20, 60, 60, 0xFF0000 );
		this.cross.onEL( "pointertap", function(){ self.visible = false; } );
		let wBB = 130;
		let hBB = 130;
		
		for( let i = 0; i < 4; i++) { 
			this.bonuses[i] = Handler.showRect( this.group, 52+i*wBB+i*20, 90, wBB, hBB, 0x00FF00 );
			this.bonuses[i].name = "but"+i;
			this.bonuses[i].onEL( "pointertap", function( evt ) { self.touchBonus( evt ) } );
		}
	};
	
	PanelBonus.prototype.touchBonus = function( evt ) {
		let self = this;
		this.numBonus = parseInt(evt.target.name[3]);
		
		Handler.game.selectBonus = this.numBonus;
		
		switch( this.numBonus ) {
			case 2:
				Handler.game.bonusRecreateFigures();
			break;
				
			case 3: 
		
			break;
		}
	};
	
	