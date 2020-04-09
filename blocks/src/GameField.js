
	let GameField = function( _parent, _arr, _x, _y ) {
		this.field = _arr;
		
		this.group = Handler.newGroup( _parent );
		
		this.x = _x; 
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.cells       = [];
		this.cellsFilled = [];
		this.countS = 0;
	};
	
	GameField.prototype.show = function() {
		this.background = Handler.showRect( this.group, 0, 0, 680, 680, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		Handler.cellW = Math.floor( this.background.width/10 - 4 );
		
	
		for( let i = 0; i < 10; i++ ) {
			this.cells[i] = [];
			this.cellsFilled[i] = [];
			for( let j = 0; j < 10; j++  ) {
				this.cellsFilled[i][j] = this.field[i][j];
				if( this.field[i][j] != 0 ) continue;

				let newX = 6+j*(Handler.cellW+3);
				let newY = 6+i*(Handler.cellW+3);
				
				let cell = Handler.showRect( this.group, newX, newY, Handler.cellW, Handler.cellW, 0x9E3E0E, 1, 15 );
				this.cells[i][j] = cell;
			}
		}
	};
	
	GameField.prototype.reWritefield = function( fieldFigure, iStart, jStart ) {
		 for( let i = 0; i < fieldFigure.length; i++ ) {
			 for( let j = 0; j < fieldFigure[0].length; j++ ) {
				let ri = iStart+i;
				let rj = jStart+j;
				if ( ri < 10 && rj < 10 ) {
					if ( fieldFigure[i][j] == 1 ) this.field[ri][rj] = Consts.ID_FIGURE;
				}
			 }
		 }
		// console.log("gamefield", this.field);
	};
	
	GameField.prototype.insertFigure = function( fieldFigure, iStart, jStart ) {
		this.reWritefield( fieldFigure, iStart, jStart );
		for( let i = 0; i < 5; i++ ) {
			 for( let j = 0; j < 5; j++ ) {
				let ri = iStart+i;
			    let rj = jStart+j;			
				if ( ri < 10 && rj < 10 ) {
					if( this.field[ri][rj] == 2 ) {
						let newX = 6+rj*(Handler.cellW+3);
						let newY = 6+ri*(Handler.cellW+3);
						if( this.cellsFilled[ri][rj] == 0 ) {
							this.cellsFilled[ri][rj] = Handler.showRect( this.group, newX, newY, Handler.cellW, Handler.cellW, 0x00ffff, 1, 15 );
						};
					};
				}
			 }
		 }
	};
	
	GameField.prototype.delLines = function( numsLine, numsCol ) {
		console.log( this.cellsFilled );

		if( numsLine.length != 0 ) {
			for( let i = 0; i < numsLine.length; i++ ) {
				let numLine = numsLine[i];
				for( let j = 0; j < 10; j++ ) {
					if( this.cellsFilled[numLine][j] === 1 ) continue;
					this.cellsFilled[numLine][j].removeSelf();
					this.cellsFilled[numLine][j] = 0;
					this.field[numLine][j] = 0;
				};
			};
		} 
		
		if( numsCol.length != 0 ) {
			for( let i = 0; i < numsCol.length; i++ ) {
				let numCol = numsCol[i];
				for( let j = 0; j < 10; j++ ) {
					if( this.cellsFilled[j][numCol] == 0 ) return;
					if( this.cellsFilled[j][numCol] == 1 ) continue;					
					this.cellsFilled[j][numCol].removeSelf();
					this.cellsFilled[j][numCol] = 0;
					this.field[j][numCol] = 0;
				};
			};
		}
	};