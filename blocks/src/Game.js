
	let Game = function( params ) {
		let self = this;
		
		this.gameField = params.gameField;
		this.panelsFigure = params.panelsFigures;
		this.selectFigure = null;
		this.touchBlock = params.touchBlock;
		this.panelScore = params.panelScore;
		
		let checkInsertFigure = function( field, figure, startI, startJ ) { 
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
		
		let checkThisLineDel = function( line ) {
			for( let i = 0; i < 10; i++ ) {
				if( line[i] == 1 ) continue;
				if( line[i] != 2 ) {
					return false;
				};
			};
			return true;
		}
		
		let checkLinesDel = function( field ) {
			let numsLineDel = [];
			let numsColumnsDel = [];
			
			for( let i = 0; i < 10; i++ ){
				if( checkThisLineDel( field[i] ) ) {
					numsLineDel.push(i);
				}
				
				let column = [];
				for( let j = 0; j < 10; j++ ) {
				    column.push(field[j][i]);
				}
				if( checkThisLineDel( column ) ) {
					numsColumnsDel.push(i);
				}
			}
		
			self.gameField.delLines( numsLineDel, numsColumnsDel );
			
			self.panelScore.score += numsLineDel.length*10;
			self.panelScore.score += numsColumnsDel.length*10;
		};
		
		let checkEndGame = function( fieldGame, fieldsFigures ) {
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
						ressChecks[i] = checkInsertFigure( fieldGame, fieldsFigures[i], j, k );
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
		
		let touchDown = function( evt ) { 
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			Handler.pointerStartX = Handler.pointerX;
			Handler.pointerStartY = Handler.pointerY;
			
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
						self.selectFigure.position = {
							x: self.selectFigure.position.x,
							y: self.selectFigure.position.y - 240
						};
						self.selectPandel = self.panelsFigure[i];
					}
				}
			}
		};
		
		let touchMove = function( evt ) {
			if ( self.selectFigure == null ) return; 
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
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
			
			let posFX = self.selectPandel.x + self.selectFigure.position.x;
			let posFY = self.selectPandel.y + self.selectFigure.position.y;
			
			if ( posFX >= xgameField && posFX <= xgameField + wgameField ){
				if ( posFY >= ygameField && posFY <= ygameField + hgameField ) {
					let startJ = Math.abs( Math.ceil( ( xgameField+6 -  posFX - Handler.cellW / 2 ) / (Handler.cellW+3) ) );
					let startI = Math.abs( Math.ceil( ( ygameField+6 - posFY - Handler.cellW / 2 ) / (Handler.cellW+3) ) );
					
					if ( checkInsertFigure( self.gameField.field, self.selectFigure, startI, startJ ) ) {
						self.gameField.insertFigure( self.selectFigure.positionCell, startI, startJ );
						self.selectPandel.removeFigure();
						
						self.panelScore.score += self.selectFigure.points;
						
						if ( self.panelsFigure[0].figure == null && self.panelsFigure[1].figure == null && self.panelsFigure[2].figure == null ) {
							self.panelsFigure[0].showFigure();
							self.panelsFigure[1].showFigure();
							self.panelsFigure[2].showFigure();
						}
						
						checkLinesDel( self.gameField.field );
						
						let fieldFigure = [ self.panelsFigure[0].figure, self.panelsFigure[1].figure, self.panelsFigure[2].figure ];	
						if ( checkEndGame( self.gameField.field, fieldFigure ) ) {
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
		
		console.log( "self.gameField", self.gameField );
		
		this.touchBlock.onEL( "pointerdown", function( evt ){ touchDown( evt ) } );
		this.touchBlock.onEL( "pointermove", function( evt ){ touchMove( evt ) } );
		this.touchBlock.onEL( "pointerup", function( evt ){ touchUp( evt ) } );
	};
	
	
		
		