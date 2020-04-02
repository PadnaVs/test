	
	let Figure = function( _parent, _num ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		this.num = _num;
		this.positionCeil = [];
		
		this._position = this.group.position;
		
		this.width = 0;
		this.height = 0;
		
		this.scales = true;
		
		Object.defineProperty( this, "position", {
	       get: function(   ) { return self.group.position; },
	       set: function( val ) { 
				self._position = val; 			
                self.group.position.x = self._position.x;
                self.group.position.y = self._position.y;
	    	}
	    });
	}
	
	Figure.prototype.show = function() {
		let self = this;
		this.createFigure();
	};
	
	
	Figure.prototype.scale = function() {
		if ( !this.scales ) {
			this.group.width  = this.group.width/0.57;
			this.group.height = this.group.height/0.57;
			
			this.width  = this.width/0.57;
			this.height = this.height/0.57;

			this.scales = true;
		} else {
			this.group.width  = this.group.width*0.57;
			this.group.height = this.group.height*0.57;
			
			this.width  = this.width*0.57;
			this.height = this.height*0.57;
			
			this.scales = false;
		}
		console.log( "this.group.width", this.group.width  );
	};
	
	Figure.prototype.createFigure = function() {
		this.positionCeil = Consts.POSITION_CEIL[ this.num ];
		
		for( let i = 0; i < this.positionCeil.length; i++ ) {
			for( let j = 0; j < this.positionCeil[i].length; j++ ) {
				if( this.positionCeil[i][j] == 0 ) continue;
				Handler.showRect( this.group, i*Handler.cellW+i*3, j*Handler.cellW+j*3, Handler.cellW, Handler.cellW, 0x57069E, 1, 5 );
			};
		}
		this.scale();
	};
	
	Figure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};