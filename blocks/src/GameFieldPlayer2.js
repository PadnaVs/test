
	let GameFieldPlayer2 = function( _parent, _x, _y, _width, _height, _field ) {
		this.parent = _parent;
		
		this.field = _field;
		
		this.x = _x;
		this.y = _y;
		
		this.width  = _width;
		this.height = _height;
		
		this.group = Handler.newGroup( this.parent );
		this.group.x = this.x;
		this.group.y = this.y;
		this.cells = [];
		this.cellsFilled = [];
	};
	
	GameFieldPlayer2.prototype.show = function() {
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		this.cellW = Math.floor( this.background.width/10 - 4 );
		for( let i = 0; i < 10; i++ ) {
			this.cells[i] = [];
			this.cellsFilled[i] = [];
			for( let j = 0; j < 10; j++  ) {
				this.cellsFilled[i][j] = this.field[i][j];
				if( this.field[i][j] != 0 ) continue;

				let newX = 6+j*(this.cellW+3);
				let newY = 6+i*(this.cellW+3);
				
				let cell = Handler.showRect( this.group, newX, newY, this.cellW, this.cellW, 0x9E3E0E, 1, 5 );
				this.cells[i][j] = cell;
			}
		}
	};
	
	GameFieldPlayer2.prototype.reWritefield = function( fieldFigure, iStart, jStart ) {
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
	
	GameFieldPlayer2.prototype.insertFigure = function( num, iStart, jStart ) {
		let fieldFigure = Consts.POSITION_CEIL[num];
		this.reWritefield( fieldFigure, iStart, jStart );
		for( let i = 0; i < 5; i++ ) {
			 for( let j = 0; j < 5; j++ ) {
				let ri = iStart+i;
			    let rj = jStart+j;			
				if ( ri < 10 && rj < 10 ) {
					if( this.field[ri][rj] == 2 ) {
						let newX = 6+rj*(this.cellW+3);
						let newY = 6+ri*(this.cellW+3);
						if( this.cellsFilled[ri][rj] == 0 ) {
							this.cellsFilled[ri][rj] = Handler.showRect( this.group, newX, newY, this.cellW, this.cellW, 0x0000ff, 1, 5 );
							 Handler.game.panelPlayer2.score += 1;
						};
					};
				}
			 }
		 }
		let numLinesDel = Handler.game.checkLinesDel( this.field );
		this.delLines( numLinesDel[0], numLinesDel[1] );
		
		Handler.game.panelPlayer2.score += numLinesDel[0].length*10 + numLinesDel[1].length*10;
	};
	
	GameFieldPlayer2.prototype.delLines = function( numsLine, numsCol ) {
		console.log( this.cellsFilled );

		if( numsLine.length != 0 ) {
			for( let i = 0; i < numsLine.length; i++ ) {
				let numLine = numsLine[i];
				for( let j = 0; j < 10; j++ ) {
					if( this.cellsFilled[numLine][j] == 0 ) continue;
					if( this.cellsFilled[numLine][j] == 1 ) continue;
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
					if( this.cellsFilled[j][numCol] == 0 ) continue;
					if( this.cellsFilled[j][numCol] == 1 ) continue;					
					this.cellsFilled[j][numCol].removeSelf();
					this.cellsFilled[j][numCol] = 0;
					this.field[j][numCol] = 0;
				};
			};
		}
	};
	
	
	