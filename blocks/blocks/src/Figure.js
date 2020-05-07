	
	let Figure = function( _parent, _x, _y, _num ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		
		this.x = _x;
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.num = _num;
		
		//console.log( this.num );
		
		this.positionCell = Consts.POSITION_CEIL[ this.num ];
		
		this._position = this.group.position;
		
		this.width = 0;
		this.height = 0;
		
		this.startX = 0;
		this.startY = 0;
		
		this.scales = true;
		
		this.points = 0;
		
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
		this.setType();
	};
	
	
	Figure.prototype.scale = function( persent ) {
		if ( !this.scales ) {
			this.group.width  = this.group.width/persent;
			this.group.height = this.group.height/persent;
			
			this.width  = this.width/persent;
			this.height = this.height/persent;

			this.scales = true;
		} else {
			this.group.width  = this.group.width*persent;
			this.group.height = this.group.height*persent;
			
			this.width  = this.width*persent;
			this.height = this.height*persent;
			
			this.scales = false;
		}
	//	console.log( "this.group.width", this.group.width  );
	};
	
	Figure.prototype.createFigure = function() {
		for( let i = 0; i < this.positionCell.length; i++ ) {
			for( let j = 0; j < this.positionCell[i].length; j++ ) {
				if( this.positionCell[i][j] == Consts.OPEN_CELLS ) continue;
				this.points++;
				Handler.showRect( this.group, j*Handler.cellW+j*3, i*Handler.cellW+i*3, Handler.cellW, Handler.cellW, 0x57069E, 1, 5 );
			};
		}
		//Handler.showRect( this.group, 0, 0, this.group.width, this.group.height, 0xff0000, 0.3 );
		this.scale( 0.57 );
 	};  
	
	Figure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};
	
	Figure.prototype.moveStartPos = function() {
		this.group.x = this.startX;
		this.group.y = this.startY;
		this.scale( 0.57 );
	}
	
	Figure.prototype.remove = function() {
		this.group.removeSelf();
	}
	
	Figure.prototype.setType = function() {
		if( this.num >= 0 && this.num <= 2 ) {
			this.type = Consts.TYPE_BLOCK;
		} else if( this.num >= 3 && this.num <= 10 ) {
			this.type = Consts.TYPE_LINE;
			if( this.num % 2 ) {
				this.positionLine = Consts.GORIZONTAL_LINE;
			} else {
				this.positionLine = Consts.VERTICAL_LINE;
			}
		} else {
			this.type = Consts.TYPE_ANGLE;
		}
	};