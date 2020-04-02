
	let GameFild = function( _parent, _arr, _x, _y ) {
		this.pole = _arr;
		
		this.group = Handler.newGroup( _parent );
		
		this.x = _x; 
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.cells = [];
	};
	
	GameFild.prototype.show = function() {
		this.background = Handler.showRect( this.group, 0, 0, 680, 680, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		Handler.cellW = Math.floor( this.background.width/10 - 4 );
		
		let startX = 6;
		let startY = 6;
		for( let i = 0; i < 10; i++ ) {
			this.cells[i] = [];
			for( let j = 0; j < 10; j++  ) {
				let newX = startX+i*(Handler.cellW+3);
				let newY = startY+j*(Handler.cellW+3);
				if ( i == 9 && j == 9 ) {
					let w = newX + 64 + 3;
				};
				
				let cell = Handler.showRect( this.group, newX, newY, Handler.cellW, Handler.cellW, 0x9E3E0E, 1, 15 );
				this.cells[i][j] = cell;
			}
		}
	};