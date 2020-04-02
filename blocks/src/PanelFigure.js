
	let PanelFigure = function( _parent, _x, _y ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		
		Object.defineProperty( this, "x", {
	       get: function(   ) { return self.group.x; },
	       set: function( val ) {	
                self.group.x = val;
	    	}
	    });
		
		Object.defineProperty( this, "y", {
	       get: function(   ) { return self.group.y; },
	       set: function( val ) {	
                self.group.position.y = val;
	    	}
	    });
		
		this.x = _x;
		this.y = _y;
		
		this.figure = null;
		
		this.width = 226-3;
	};
	
	PanelFigure.prototype.show = function() {
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.width, 0x9E3E0E, 1, 15 );
		this.showFigure();
	};
	
	PanelFigure.prototype.showFigure = function() {
		this.figure = this.generationFigore();
		this.figure.show();
		this.figure.transition( this.width/2 - this.figure.group.width/2, this.width/2 - this.figure.group.height/2 );
	};
	
	PanelFigure.prototype.generationFigore = function() {
		let rnd = Math.floor( Math.random() * ( 18 - 0 ) + 0 );
		
		let res = new Figure( this.group, rnd );
		
		return res;
	};
	
	PanelFigure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};
	