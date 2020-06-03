	
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
	
	
	Figure.prototype.scale = function( persent = 1 ) {
		if( this.group.scale.x != 1 ) {
			this.group.scale.set(1);
		} else {
			this.group.scale.set(persent);
		}
		//let newW = Math.floor( this.group.width*persent );
		//let newH = Math.floor( this.group.height*persent );
		//
		//if( persent != 1 ) {
		//	this.group.width  = newW;
		//	this.group.height = newH;
		//} else {
		//	this.group.width  = this.stWidthG;
		//	this.group.height = this.stHeightG;
		//};
	};
	
	Figure.prototype.onLoadCell = function( numF, imgsData) {
		let self = this;
		
		this.loadCellCount++;
		
		if( this.loadCellCount == imgsData.length) {
			self.stWidthG = self.group.width;
			self.stHeightG = self.group.height;
			self.scale(0.56);
			
			self.group.x = Math.floor(self.x - self.group.width/2);
			self.group.y = Math.floor(self.y - self.group.height/2);
			
			self.startX = self.group.x;
			self.startY = self.group.y;
			
			self.group.cacheAsBitmap = true;
		}
	};
	
	Figure.prototype.createFigure = function() {
		let self = this;
		this.group.removeChild();
		
		this.loadCellCount = 0;
		
		this.imgsData = [];
		
		for( let i = 0; i < this.positionCell.length; i++ ) {
			for( let j = 0; j < this.positionCell[i].length; j++ ) {
				if( this.positionCell[i][j] == Consts.OPEN_CELLS ) continue;
				this.points++;
				
				let rndNumImg = Math.floor(Math.random() * (22 - 1) + 1);
				
				let data = {
					i: i,
					j: j,
					numImg: rndNumImg
				}
				this.imgsData.push( data );
			}
		}
			
		//let onLoadF = function( img ) {
		//	self.scale(0.6);
		//	self.group.x = Math.floor(self.x - self.group.width/2);
		//	self.group.y = Math.floor(self.y - self.group.height/2);
		//	
		//	self.startX = self.group.x;
		//	self.startY = self.group.y;
		//}
		//
		//Handler.addImg( this.group, "./images/windGame/figures/f"+ this.num +".png", 0, 0, null, function(img){ onLoadF(img); });

		for( let i = 0; i < this.imgsData.length; i++ ) {
			let yf = this.imgsData[i].i * Handler.cellW + this.imgsData[i].i*4;
			let xf = this.imgsData[i].j * Handler.cellW + this.imgsData[i].j*4;
			Handler.addImg( this.group, "./images/windGame/blocks/block_l"+this.imgsData[i].numImg+".png", xf, yf, null, function(img){ self.onLoadCell( i, self.imgsData ); });
			//console.log( "xf",xf );
			//console.log( "yf",yf );
		}
 	};  
	
	Figure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};
	
	Figure.prototype.moveStartPos = function() {
		this.group.x = this.startX;
		this.group.y = this.startY;
		this.scale( 0.56 );
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