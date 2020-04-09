	
	let Figure = function( _parent, _num ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		this.num = _num;
		this.positionCell = [];
		
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
	//	console.log( "this.group.width", this.group.width  );
	};
	
	Figure.prototype.createFigure = function() {
		this.positionCell = Consts.POSITION_CEIL[ this.num ];
		
		for( let i = 0; i < this.positionCell.length; i++ ) {
			for( let j = 0; j < this.positionCell[i].length; j++ ) {
				if( this.positionCell[i][j] == 0 ) continue;
				this.points++;
				Handler.showRect( this.group, j*Handler.cellW+j*3, i*Handler.cellW+i*3, Handler.cellW, Handler.cellW, 0x57069E, 1, 5 );
			};
		}
		//Handler.showRect( this.group, 0, 0, this.group.width, this.group.height, 0xff0000, 0.3 );
		this.scale();
 	};  
	
	Figure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};
	
	Figure.prototype.moveStartPos = function() {
		this.group.x = this.startX;
		this.group.y = this.startY;
		this.scale();
	}
	
	Figure.prototype.remove = function() {
		this.group.removeSelf();
	}