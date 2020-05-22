	
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
		if( this.group.scale.x != 1 ) {
			this.group.scale.set(1);
		} else {
			this.group.scale.set(persent);
		}
	};
	
	Figure.prototype.createFigure = function() {
		let self = this;
		this.scale( 0.56 );
		for( let i = 0; i < this.positionCell.length; i++ ) {
			for( let j = 0; j < this.positionCell[i].length; j++ ) {
				if( this.positionCell[i][j] == Consts.OPEN_CELLS ) continue;
				this.points++;
				//Handler.showRect( this.group, j*Handler.cellW+j*3, i*Handler.cellW+i*3, Handler.cellW, Handler.cellW, 0x57069E, 1, 5 );
				let onLoad = function(img){
					self.group.x = self.x - self.group.width/2;
					self.group.y = self.y - self.group.height/2;
					self.startX = self.group.x;
					self.startY = self.group.y;
				};
				Handler.addImg( this.group, "./images/windGame/fillCell.png", Math.floor(j*Handler.cellW+j*3), Math.floor(i*Handler.cellW+i*3), null, function(img){ onLoad(img); });
			};
		}
		//Handler.showRect( this.group, 0, 0, this.group.width, this.group.height, 0xff0000, 0.3 );
		
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