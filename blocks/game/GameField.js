
	let GameField = function( _parent, _x, _y, _field ) {
		this.field = _field;
		
		this.lastChangeFieled = [];
		
		this.group = Handler.newGroup( _parent );
		
		this.x = _x; 
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.cells       = [];
		this.cellsFilled = [];
		this.countS = 0;
		
		this.onSoundDelL = false;
	};
	
	GameField.prototype.show = function() {
		let self = this;
		//this.background = Handler.showRect( this.group, 0, 0, 680, 680, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		//Handler.addImg( this.group, "./images/windGame/backgrGameField.png", 0,0,null, function(img){ img.toBack(); } );
		
		Handler.cellW = 70;//Math.floor( this.background.width/10 - 4 );

		for( let i = 0; i < 10; i++ ) {
			this.cellsFilled[i] = [];
			for( let j = 0; j < 10; j++  ) {
				this.cellsFilled[i][j] = this.field[i][j];
				if( this.field[i][j] != 0 ) continue;

				//let newX = Math.floor( j*(Handler.cellW+4) );
				
				let newX = j*(Handler.cellW+2);
				
				let newY = i*(Handler.cellW+2);
				
				console.log("newX",newX);
				console.log("newY",newY);
				
				Handler.addImg( this.group, "./images/windGame/block70.png",newX, newY );
			}
		}
	};
	
	GameField.prototype.reWritefield = function( fieldFigure, iStart, jStart ) {
		 for( let i = 0; i < 5; i++ ) {
			 for( let j = 0; j < 5; j++ ) {
				let ri = iStart+i;
				let rj = jStart+j;
				if ( ri < 10 && rj < 10 ) {
					if ( fieldFigure[i][j] == Consts.FILL_CELLS ) this.field[ri][rj] = Consts.FILL_CELLS;
					if ( fieldFigure[i][j] == Consts.DEL_CELLS )  this.field[ri][rj] = Consts.OPEN_CELLS;
				}
			 }
		 }
		// console.log("gamefield", this.field);
	};
	
	GameField.prototype.insertFigure = function( num, iStart, jStart ) {
		let self = this;
		let fieldFigure = Consts.POSITION_CEIL[num];
		
		this.lastInsertFigure = {
			num: num,
			field: fieldFigure,
			iIn: iStart,
			jIn: jStart,
		};
		
		for( let i = 0; i < 10; i++ ) {
			this.lastChangeFieled[i] = [];
			for( let j = 0; j < 10; j++ ) {
				if( this.field[i][j] == Consts.FILL_CELLS ) this.lastChangeFieled[i][j] = Consts.FILL_CELLS;
				if( this.field[i][j] == Consts.OPEN_CELLS ) this.lastChangeFieled[i][j] = Consts.OPEN_CELLS;
			}
		}
		
		this.reWritefield( fieldFigure, iStart, jStart );
		
		for( let i = 0; i < 5; i++ ) {
			 for( let j = 0; j < 5; j++ ) {
				let ri = iStart+i;
			    let rj = jStart+j;			
				if ( ri < 10 && rj < 10 ) {
					if( this.field[ri][rj] == Consts.FILL_CELLS ) {
						let newX = rj*(Handler.cellW+4);
						let newY = ri*(Handler.cellW+4);
						if( this.cellsFilled[ri][rj] == Consts.OPEN_CELLS ) {		
							
							let onLoad = function( _img, _i, _j ) {
								self.cellsFilled[_i][_j] = _img;
							}
							Handler.addImg( this.group, "./images/windGame/fillCell.png",newX, newY, null,function(img){ let _ri = ri; let _rj = rj; onLoad(img, _ri, _rj) } );
							//this.cellsFilled[ri][rj] = Handler.showRect( this.group, newX, newY, Handler.cellW, Handler.cellW, 0x00ffff, 1, 15 );
						};
					};
				}
			 }
		 }
		 if( Handler.cooperative ) Handler.game.netControl.sendMsg(  { typeAct: Consts.TYPE_ACT_INSERT_F, numF: num, i: iStart, j: jStart }  );
	};
	
	GameField.prototype.delLastInsertFigure = function() {
		let self = this;
		if( !this.lastInsertFigure ) return;
		
		for( let i = 0; i < 10; i++ ) {
			for( let j = 0; j < 10; j++ ) {
				if( this.lastChangeFieled[i][j] == Consts.FILL_CELLS ) {
					if( this.field[i][j] == Consts.OPEN_CELLS ) {
						let newX = 6+j*(Handler.cellW+3);
						let newY = 6+i*(Handler.cellW+3);
						let onLoad = function( _img, _i, _j ) {
							self.cellsFilled[_i][_j] = _img;
						}
						Handler.addImg( this.group, "./images/windGame/fillCell.png",newX, newY, null,function(img){ let _ri = i; let _rj = j; onLoad(img, _ri, _rj) } );
						this.field[i][j] = Consts.FILL_CELLS;
					}
				}
				if( this.lastChangeFieled[i][j] == Consts.OPEN_CELLS ) {
					this.field[i][j] = Consts.OPEN_CELLS;
					if( this.cellsFilled[i][j] != Consts.OPEN_CELLS ) {
						this.cellsFilled[i][j].removeSelf();
						this.cellsFilled[i][j] = Consts.OPEN_CELLS;
					}
				}
			}
		}
	};
	
	GameField.prototype.startSoundDelLine = function() {
		let self = this;
		if( this.onSoundDelL == false ) {
			this.onSoundDelL = true;
			Sounds.removeLine();
			setTimeout( function() { self.onSoundDelL = false; }, 100 );
		}
	};
	
	GameField.prototype.delLines = function( numsLine, numsCol ) {
		//console.log( this.cellsFilled );
		let self = this;
		let numDelCel = 0;
		if( numsLine.length != 0 ) {
			for( let i = 0; i < numsLine.length; i++ ) {
				let numLine = numsLine[i];
				setTimeout( function() { self.startSoundDelLine() }, i*700 )
				for( let j = 0; j < 10; j++ ) {
					if( this.cellsFilled[numLine][j] == 0 ) continue;
					if( this.cellsFilled[numLine][j] == 1 ) continue;
					//this.cellsFilled[numLine][j].removeSelf();//animka
					
					let img = self.cellsFilled[numLine][j];
					setTimeout( self.animDelCell, 70*numDelCel, img );
					numDelCel++;
					
					this.cellsFilled[numLine][j] = 0;
					this.field[numLine][j] = 0;
				};
			};
		} 
		
		numDelCel = 0;
		if( numsCol.length != 0 ) {
			for( let i = 0; i < numsCol.length; i++ ) {
				let numCol = numsCol[i];
				setTimeout( function() { self.startSoundDelLine() }, i*700 )
				for( let j = 0; j < 10; j++ ) {
					if( this.cellsFilled[j][numCol] == 0 ) continue;
					if( this.cellsFilled[j][numCol] == 1 ) continue;					
					//this.cellsFilled[j][numCol].removeSelf();
					Sounds.removeLine();
					
					let img = self.cellsFilled[j][numCol];
					setTimeout( self.animDelCell, 70*numDelCel, img );
					numDelCel++;
					
					this.cellsFilled[j][numCol] = 0;
					this.field[j][numCol] = 0;
				};
			};
		}
	};
	
	GameField.prototype.animDelCell = function( img ) {
		let newX = img.x + 10;
		let newY = img.y + 10;
		
		let remImgOnC = function( img ) {
			img.removeSelf();
		}
		gsap.to(img,{ duration: 0.3, x: newX, y: newY, alpha: 0, onComplete: remImgOnC, onCompleteParams: [img] });
	};