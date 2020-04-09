
	let Game = function( params ) {
		let self = this;
		
		this.gameField = params.gameField;
		this.panelsFigure = params.panelsFigures;
		this.selectFigure = null;
		this.touchBlock = params.touchBlock;
		this.panelScore = params.panelScore;
		
		this.selectBonus = null;
		
		let touchDown = function( evt ) { 
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			Handler.pointerStartX = Handler.pointerX;
			Handler.pointerStartY = Handler.pointerY;
			
			if ( self.selectBonus != null ) {
				
				switch( self.selectBonus ) {
					case 0:
						self.delLineBon( Handler.pointerX, Handler.pointerY );
					break;
						
					case 1: 
						self.delColBon( Handler.pointerX, Handler.pointerY );
					break;
				}
				return;
			};
			
			for( let i = 0; i < 3; i++ ) {
				if( self.panelsFigure[i].figure == null ) continue;
 				let wF = self.panelsFigure[i].width;
				let hF = self.panelsFigure[i].height;
				
				let posFX = self.panelsFigure[i].x;
				let posFY = self.panelsFigure[i].y;
				
				if ( Handler.pointerX >= posFX && Handler.pointerX <= posFX + wF ){
					if ( Handler.pointerY >= posFY && Handler.pointerY <= posFY + hF ) {
						self.panelsFigure[i].figure.scale();
						self.selectFigure = self.panelsFigure[i].figure;
						self.selectFigure.group.toFront();
						self.selectFigure.position = {
							x: self.selectFigure.position.x,
							y: self.selectFigure.position.y - 140
						};
						self.selectPanel = self.panelsFigure[i];
					}
				}
			}
		};
		
		let touchMove = function( evt ) {
			if ( self.selectFigure == null ) return;
			
			
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			if ( Handler.pointerX > 720 || Handler.pointerX < 0 ||  Handler.pointerY > 1280 ||  Handler.pointerY < 0 ) {
				self.selectFigure.moveStartPos();
				self.selectFigure = null;
				return;
			}
			
			//console.log(Handler.pointerX);
			
			let speed = 1;
			let shX = (Handler.pointerX - Handler.pointerStartX)*speed;
			let shY = (Handler.pointerY - Handler.pointerStartY)*speed;
			
			self.selectFigure.transition( self.selectFigure.position.x + shX, self.selectFigure.position.y + shY );
			
			Handler.pointerStartX = Handler.pointerX;
			Handler.pointerStartY = Handler.pointerY;
		};
		
		let touchUp = function( evt ) { 
			if ( self.selectFigure == null ) return;
			
			let wgameField = 686;
			let hgameField = 686;
			
			let xgameField = self.gameField.x;
			let ygameField = self.gameField.y;
			
			let posFX = self.selectPanel.x + self.selectFigure.position.x;
			let posFY = self.selectPanel.y + self.selectFigure.position.y;
			
			let maxShBeyondLimits = Handler.cellW / 2;
			
			if ( posFX >= xgameField - maxShBeyondLimits && posFX <= xgameField + wgameField + maxShBeyondLimits ){
				if ( posFY >= ygameField - maxShBeyondLimits && posFY <= ygameField + hgameField + maxShBeyondLimits ) {
					
					//console.log( xgameField - posFX );
					
					//if ( xgameField - posFX < 0 ) {
					//	posFX = posFX + maxShBeyondLimits;
					//}
					//if ( ygameField - posFY < 0 ) {
					//	posFY = posFY + maxShBeyondLimits;
					//}
					
					
					let startJ = Math.abs( Math.ceil( ( xgameField+6 -  posFX - Handler.cellW / 2 ) / (Handler.cellW+3) ) );
					let startI = Math.abs( Math.ceil( ( ygameField+6 - posFY - Handler.cellW / 2 ) / (Handler.cellW+3) ) );
					
					if ( self.checkInsertFigure( self.gameField.field, self.selectFigure, startI, startJ ) ) {
						self.gameField.insertFigure( self.selectFigure.positionCell, startI, startJ );
						self.selectPanel.removeFigure();
						
						self.panelScore.score += self.selectFigure.points;
						
						if ( self.panelsFigure[0].figure == null && self.panelsFigure[1].figure == null && self.panelsFigure[2].figure == null ) {
							self.panelsFigure[0].showFigure();
							self.panelsFigure[1].showFigure();
							self.panelsFigure[2].showFigure();
						}
						
						self.checkLinesDel( self.gameField.field );
						
						let fieldFigure = [ self.panelsFigure[0].figure, self.panelsFigure[1].figure, self.panelsFigure[2].figure ];	
						if ( self.checkEndGame( self.gameField.field, fieldFigure ) ) {
							alert("You loos");
						}
					} else {
						self.selectFigure.moveStartPos();
					}
				} else {
					self.selectFigure.moveStartPos();
				}
			} else {
				self.selectFigure.moveStartPos();
			}
			self.selectFigure = null;
		};
		
		this.touchBlock.onEL( "pointerdown", function( evt ){ touchDown( evt ) } );
		this.touchBlock.onEL( "pointermove", function( evt ){ touchMove( evt ) } );
		this.touchBlock.onEL( "pointerup", function( evt ){ touchUp( evt ) } );
	};
	
	
	Game.prototype.checkInsertFigure = function( field, figure, startI, startJ ) { 
		let self = this;
  /*width*/let cj = startJ;
  /*height*/let ci = startI;
		let field5x5 = [];
		
		for( let i = 0; i < 5; i++ ) {
			field5x5[i] = [];
			for( let j = 0; j < 5; j++ ) {
				let valOpen = 1;
				let ri = ci+i;
				let rj = cj+j;
				if ( ri < 10 && rj < 10 ) {
					valOpen = field[ri][rj];
				}
				field5x5[i][j] = valOpen;
			}
		}
		let resCheck = true;
		for( let i = 0; i < 5; i++ ) {
			for( let j = 0; j < 5; j++ ) {
				if ( figure.positionCell[i][j] == 1 && field5x5[i][j] != 0 ) {
					resCheck = false;
				}
			}
		}
		return resCheck;
	}
	
	Game.prototype.checkThisLineDel = function( line ) {
		let self = this;
		for( let i = 0; i < 10; i++ ) {
			if( line[i] == 1 ) continue;
			if( line[i] != 2 ) {
				return false;
			};
		};
		return true;
	}
	
	Game.prototype.checkLinesDel = function( field ) {
		let self = this;
		let numsLineDel = [];
		let numsColumnsDel = [];
		
		for( let i = 0; i < 10; i++ ){
			if( self.checkThisLineDel( field[i] ) ) {
				numsLineDel.push(i);
			}
			
			let column = [];
			for( let j = 0; j < 10; j++ ) {
			    column.push(field[j][i]);
			}
			if( self.checkThisLineDel( column ) ) {
				numsColumnsDel.push(i);
			}
		}
	
		self.gameField.delLines( numsLineDel, numsColumnsDel );
		
		self.panelScore.score += numsLineDel.length*10;
		self.panelScore.score += numsColumnsDel.length*10;
	};
	
	Game.prototype.checkEndGame = function( fieldGame, fieldsFigures ) {
		let self = this;
		let loosGame = false;
		
		let ressChecks = [];
	
		for( let i = 0; i < 3; i++ ) {
			if ( fieldsFigures[i] == null ) { 
				ressChecks[i] = false;
				continue;
			}
			for( let j = 0; j < 10; j++ ) {
				if( ressChecks[i] ) {
					break;
				};
				for( let k = 0; k < 10; k++ ) {
					ressChecks[i] = self.checkInsertFigure( fieldGame, fieldsFigures[i], j, k );
					if( ressChecks[i] ) {
						break;
					};
				}
			}
		}
		
		
		if ( ressChecks[0] == false && ressChecks[1] == false && ressChecks[2] == false ) {
			loosGame = true;
		}
		
		return loosGame;
	};
	
	Game.prototype.delLineBon = function() {
		let self = this;
		let xgameField = self.gameField.x;
		let ygameField = self.gameField.y;
		
		//let i = Math.abs( Math.ceil( ( xgameField+6 - Handler.pointerX ) / (Handler.cellW+3) ) );
		let j = Math.abs( Math.ceil( ( ygameField+6 - Handler.pointerY ) / (Handler.cellW+3) ) );
		self.gameField.delLines( [ j ], [] );
		self.selectBonus = null;
	};

	Game.prototype.delColBon = function() {
		let self = this;
		let xgameField = self.gameField.x;
		let ygameField = self.gameField.y;
		
		let i = Math.abs( Math.ceil( ( xgameField+6 - Handler.pointerX ) / (Handler.cellW+3) ) );
		//let j = Math.abs( Math.ceil( ( ygameField+6 - Handler.pointerY ) / (Handler.cellW+3) ) );
		self.gameField.delLines( [  ], [i] );
		self.selectBonus = null;
	};
	
	Game.prototype.bonusRecreateFigures = function() {
		let self = this;
		
		for( let i = 0; i < 3; i++ ) {
			self.panelsFigure[i].removeFigure();
			self.panelsFigure[i].showFigure();
		};
		self.selectBonus = null;
	};
		