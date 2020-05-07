
	let FigureB = function(  _numF ) {
		this.num = _numF;
		this.positionCell = Consts.POSITION_CEIL[ this.num ];
	
		this.bestCoords = [];
		this.maxCountDelLine = [[],[]];
		this.maxLengltI = 0;
		this.maxLengltJ = 0;
		
		this.rating = 0;
	};

	let Bot = function() {
		this.figures = [];
		
		this.dataInF = {
			
		};
		
		this.field =  [ 
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
					]
		this.fieldForChecks = [ 
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
						[0,0,0,0,0,0,0,0,0,0],
					]
					
	};
	
	Bot.prototype.startGame = function() {
		let self = this;
		
		for( let i = 0; i < 3; i++ ) {
			this.figures[i] = this.getFieldFigure(i);
		}
		
		let numStepInStr = 0;
		let step = 3;
	
		this.numInpF = 0;
		
		this.maxLengltI = 0;
		this.maxLengltJ = 0;
		
		this.maxCountDelLine = [[],[]];
		this.notSuccessfulF = [];
		
		
		let insertF = function() {
			if( self.numInpF >= 3 ) {
				self.numInpF = 0;
				numStepInStr += step;
				for( let i = 0; i < 3; i++ ) {
					if ( self.figures[i] != null ) continue;
					let numNextF = i + numStepInStr;
					self.figures[i] = self.getFieldFigure(numNextF);
				}
			}
			let numPosF = self.numInpF;

			for( let fi = 0; fi < 3; fi++ ) {
				let abilityInsertF = false;
				if( self.figures[fi] == null ) continue;
				self.figures[fi].bestCoords = [];
				self.figures[fi].maxCountDelLine = [[],[]];
				self.figures[fi].maxLengltI = 0;
				self.figures[fi].maxLengltJ = 0;
				for( let i = 0; i < 10; i++ ) {
					for( let j = 0; j < 10; j++ ) {
						if( Handler.game.checkInsertFigure( self.field, self.figures[fi], i, j) ) {
							abilityInsertF = true;
							self.checkBestCoords( self.figures[fi], i, j );
							self.setFieldCheckLikeCurField();
						}
					}
				}
				if( !abilityInsertF ) {
					self.notSuccessfulF[ fi ] = self.figures[fi];
				}
			}
			
			let numFMaxR = 0;
			for( let j = 0; j < 3; j++ ) {
				if( self.figures[j] != null ) numFMaxR = j;
			}
			for( let i = 0; i < 3; i++ ) {
				if( self.figures[i] == null ) continue;
				
				if( self.figures[i].rating >= self.figures[numFMaxR].rating ) numFMaxR = i;
				if( self.figures[i].rating == 0 ) {
					
				};
			};
			
			if( self.notSuccessfulF[numFMaxR] == self.figures[numFMaxR] ) {
				self.notSuccessfulF.splice(numFMaxR,1);
			}
			
			let iF = self.figures[numFMaxR].bestCoords[0];
			let jF = self.figures[numFMaxR].bestCoords[1];
			
			self.reWritefield( self.field, self.figures[numFMaxR].positionCell, iF, jF );
			self.setFieldCheckLikeCurField();
			Handler.game.gameFieldPlayer2.insertFigure( self.figures[numFMaxR].num, iF, jF );
			
			let coutnDelH = self.figures[numFMaxR].maxCountDelLine[0].length;
			let coutnDelV = self.figures[numFMaxR].maxCountDelLine[1].length;
			
			if( coutnDelH != 0 || coutnDelV != 0 ) {
				self.delLine(self.figures[numFMaxR].maxCountDelLine);
				self.setFieldCheckLikeCurField();
			}
			
			self.figures[numFMaxR] = null;
			//} else if(!opportunityToPut) {
			//	self.notSuccessfulF.push( self.figures[numPosF] );
			if( self.notSuccessfulF.length == 3 ) {
				clearInterval( self.timerInF )
				alert("Бот проиграл");
			}
			//};			
			self.numInpF++;
		};
		this.timerInF = setInterval( insertF, 500 );
	};
	
	Bot.prototype.delLine = function( numLine ) {
		if( numLine[0].length != 0 || numLine[1].length != 0 ) {
			for( let i = 0; i < 2; i++ ) {
				for( let j = 0; j < numLine[i].length; j++ ) {
					for( let k = 0; k<10; k++ ) {
						if( i == 0 ) {
							this.field[numLine[i][j]][k] = Consts.OPEN_CELLS;//удаление строк 
						} else if( i == 1) {
							this.field[k][numLine[i][j]] = Consts.OPEN_CELLS;//удаление столбцов
						}
					}
				}
			}
		} 
	};
	
	Bot.prototype.getLengthLine = function( line ) {
		let len = 0;
		for( let i = 0; i<10; i++ ) {
			if( line[i] == Consts.FILL_CELLS ) len++;
		}
		return len;
	};
	
	
	Bot.prototype.checkBestCoords = function( figure, si, sj ) {
		this.setFieldCheckLikeCurField();
		this.reWritefield( this.fieldForChecks, figure.positionCell, si, sj );
		
		let linesDel = Handler.game.checkLinesDel( this.fieldForChecks );
		
		let countFillCells = 0;
		for( let i = 0; i < 10; i++ ) {
			for( let j = 0; j < 10; j++ ) {
				if(this.fieldForChecks[i][j] == Consts.FILL_CELLS ) countFillCells++;
			}
		}
		
		if( linesDel[0].length == 0 && linesDel[1].length == 0 && figure.maxCountDelLine[0].length == 0 && figure.maxCountDelLine[1].length == 0 ) {
			//длинна строки
			
			let maxL = 0;
			//let bestI = 0;
			let curLH = null;
			let curLV = null;
			for( let i = 0; i < 10; i++ ) {
				curLH = this.getLengthLine( this.fieldForChecks[i] );
				if( figure.maxLengltI <= curLH ) { 
					figure.maxLengltI = curLH;
				}
				
				let st = [];//столбец
			    for( let j = 0; j < 10; j++ ) {
			    	st[j] = this.fieldForChecks[j][i];
			    }
				curLV = this.getLengthLine( st );
				if( figure.maxLengltJ <= curLV ) { 
					figure.maxLengltJ = curLV;
					//maxL = figure.maxLengltJ;
				}
			}
			
			if( figure.maxLengltI <= figure.maxLengltJ ) {
				maxL = figure.maxLengltJ;
				figure.bestCoords[0] = si;
				figure.bestCoords[1] = sj;
			} else {
				maxL = figure.maxLengltI;
				figure.bestCoords[0] = si;
				figure.bestCoords[1] = sj;
			}
			
			figure.rating = maxL;
			if( figure.rating == 0 ) {
				console.log();
			}
		} else {
			let countDelL = linesDel[0].length + linesDel[1].length;
			let maxCountDelL = figure.maxCountDelLine[0].length + figure.maxCountDelLine[1].length;
			if( countDelL >= maxCountDelL) { 
				figure.maxCountDelLine[0] = linesDel[0];
				figure.maxCountDelLine[1] = linesDel[1];
				figure.bestCoords[0] = si;
				figure.bestCoords[1] = sj;
				figure.rating = (figure.maxCountDelLine[0].length + figure.maxCountDelLine[1].length)*10;
			}
			if( figure.rating == 0 ) {
				console.log();
			}
		}
	};
	
	Bot.prototype.setFieldCheckLikeCurField = function() {
		for( let i = 0; i < 10; i++ ) {
			for( let j = 0; j < 10; j++ ) {
				if( this.field[i][j] == Consts.FILL_CELLS ) this.fieldForChecks[i][j] = Consts.FILL_CELLS;
				if( this.field[i][j] == Consts.OPEN_CELLS ) this.fieldForChecks[i][j] = Consts.OPEN_CELLS;
			}
		}
	};
	
	
	Bot.prototype.getFieldFigure = function( numPos ) {
		let ch = Handler.strPlayCooperative.substr( numPos, 1 );
		numF = Handler.translationCharToNum( ch );
		
		let figure = new FigureB( numF );
		return figure;
	};
	
	Bot.prototype.reWritefield = function( pField, fieldFigure, iStart, jStart ) {
		 for( let i = 0; i < 5; i++ ) {
			 for( let j = 0; j < 5; j++ ) {
				let ri = iStart+i;
				let rj = jStart+j;
				if ( ri < 10 && rj < 10 ) {
					if ( fieldFigure[i][j] == Consts.FILL_CELLS ) pField[ri][rj] = Consts.FILL_CELLS;
				}
			 }
		 }
	};