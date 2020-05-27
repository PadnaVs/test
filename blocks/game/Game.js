
	let Game = function() {
		let self = this;
		
		this.stringForGeneration = "0123456789ABSDEFGHI";
		
		this.gameStarted = false;
		this.selectFigure = null;
		
		this.gameField        = Main.windGame.gameField;
		this.panelsFigures    = Main.windGame.panelsFigures;
		this.touchBlock       = Main.windGame.touchBlock;
		this.panelScore       = Main.windGame.panelScore;
		this.panelPlayer2     = Main.windGame.panelPlayer2;
		this.gameFieldPlayer2 = Main.windGame.gameFieldPlayer2;
		
		this.abilityTakeSteps      = true;
		this.abilityTakeStepsEnemy = true;
		
		this.lastSeletPanelF = null;
		
		this.lastScore = 0;//последние набронные очки
		
		if( Handler.cooperative ) {
			//window.addEventListener( "load", function() {
			//	console.log("Завершение загрузки");
				
				self.netControl = new NetControl(); 
			//});
		};
		
		this.selectBonus = null;
		
		let touchDown = function( evt ) { 
			if ( Handler.cooperative && !self.gameStarted ) return;
			for( let i = 0; i < 3; i++ ) {
				if ( self.panelsFigures[i].panelRotation != null ) return;
			}
			
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			Handler.pointerStartX = Handler.pointerX;
			Handler.pointerStartY = Handler.pointerY;
			
			for( let i = 0; i < 3; i++ ) {
				if( self.panelsFigures[i].figure == null ) continue;
 				let wF = self.panelsFigures[i].width;
				let hF = self.panelsFigures[i].height;
				
				let posPX = self.panelsFigures[i].x;
				let posPY = self.panelsFigures[i].y;
				
				self.panelsFigures[i].butAddF.interactive = false;
				
				if ( Handler.pointerX >= posPX && Handler.pointerX <= posPX + wF ){
					if ( Handler.pointerY >= posPY && Handler.pointerY <= posPY + hF ) {
						self.panelsFigures[i].figure.scale( 0.57 );
						self.selectFigure = self.panelsFigures[i].figure;
						self.selectFigure.group.toFront();
						self.selectPanel = self.panelsFigures[i];
						self.selectPanel.setNActiveButPanelRot();
						self.selectPanel.group.toFront();
						
						let shUp = 140;
						self.selectFigure.group.y = Handler.pointerY - self.selectFigure.group.height - shUp - self.selectPanel.y;
					}
				}
			}
		};
		
		let touchMove = function( evt ) {
			if ( Handler.cooperative && !self.gameStarted ) return;
			if ( self.selectFigure == null ) return;
			
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			if ( Handler.pointerX > 720 || Handler.pointerX < 0 ||  Handler.pointerY > 1280 ||  Handler.pointerY < 0 ) {
				self.selectFigure.moveStartPos();
				if( self.selectFigure.type != Consts.TYPE_BLOCK ) {
					self.selectPanel.setActiveButPanelRot();
				};
				self.selectPanel = null;
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
			if ( Handler.cooperative && !self.gameStarted ) return;
			
			if ( self.selectBonus != null && self.selectFigure == null ) {
				switch( self.selectBonus ) {
					case 0:
						self.delLineBon( Handler.pointerX, Handler.pointerY );
					break;
						
					case 1: 
						self.delColBon( Handler.pointerX, Handler.pointerY );
					break;
				}
				self.setNActiveButCancelMove();
		
				return;
			};
			
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
					let startJ = Math.abs( Math.ceil( ( xgameField+6 -  posFX - Handler.cellW / 2 ) / (Handler.cellW+3) ) );
					let startI = Math.abs( Math.ceil( ( ygameField+6 - posFY - Handler.cellW / 2 ) / (Handler.cellW+3) ) );
					
					if ( self.checkInsertFigure( self.gameField.field, self.selectFigure, startI, startJ ) ) {
						self.lastScore = 0;
						self.gameField.insertFigure( self.selectFigure.num, startI, startJ );
						self.lastSeletPanelF = self.selectPanel;
						self.selectPanel.removeFigure();
						//self.selectPanel.setNActiveButPanelRot();
						self.setActiveButCancelMove();
						self.selectPanel.butAddF.interactive = true;
						
						self.panelScore.score += self.selectFigure.points;
						self.lastScore += self.selectFigure.points; 
						
						if ( self.panelsFigures[0].figure == null && self.panelsFigures[1].figure == null && self.panelsFigures[2].figure == null ) {
							for( let i = 0; i<3; i++ ){
								self.panelsFigures[i].showFigure();
							}
						}
						
						let numLinesDel = self.checkLinesDel( self.gameField.field );
						
						self.gameField.delLines( numLinesDel[0], numLinesDel[1] );

						self.panelScore.score += numLinesDel[0].length*10;
						self.panelScore.score += numLinesDel[1].length*10;
						
						self.lastScore += numLinesDel[0].length*10 + numLinesDel[1].length*10;
						
						let fieldFigure = [ self.panelsFigures[0].figure, self.panelsFigures[1].figure, self.panelsFigures[2].figure ];	
						//Обработка нет возможности ходить
						if ( self.checkEndSteps( self.gameField.field, fieldFigure ) ) {
							if( Handler.cooperative ) {
								Main.windGame.group.removeSelf();
								self.netControl.sendMsg( { typeAct: Consts.TYPE_ACT_YOU_LOST } );
								self.abilityTakeSteps = false;
								self.checkWinner();
							}
							Main.windContinueGame.show();
						}
					} else {
						if( self.selectFigure.type != Consts.TYPE_BLOCK ) {
							self.selectPanel.setActiveButPanelRot();
						};
						self.selectFigure.moveStartPos();
					}
				} else {
					if( self.selectFigure.type != Consts.TYPE_BLOCK ) {
						self.selectPanel.setActiveButPanelRot();
					};
					self.selectFigure.moveStartPos();
				}
			} else {
				if( self.selectFigure.type != Consts.TYPE_BLOCK ) {
					self.selectPanel.setActiveButPanelRot();
				};
				self.selectFigure.moveStartPos();
			}
			self.selectPanel = null;
			self.selectFigure = null;
		};
		
		this.touchBlock.onEL( "pointerdown", function( evt ){ touchDown( evt ) } );
		this.touchBlock.onEL( "pointermove", function( evt ){ touchMove( evt ) } );
		this.touchBlock.onEL( "pointerup", function( evt ){ touchUp( evt ) } );
	};
	
	Game.prototype.fillPanelsWithF = function(){
		for( let i = 0; i < 3; i++ ) {
			if( this.panelsFigures[i] != null ) this.panelsFigures[i].removeFigure();
			this.panelsFigures[i].numSibolInStringСooperative = this.panelsFigures[i].num;
			this.panelsFigures[i].showFigure();
		};
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
				if ( figure.positionCell[i][j] == Consts.FILL_CELLS && field5x5[i][j] != 0 ) {
					resCheck = false;
				}
			}
		}
		return resCheck;
	};
	
	Game.prototype.checkThisLineDel = function( line ) {
		let self = this;
		for( let i = 0; i < 10; i++ ) {
			if( line[i] == Consts.INACCES_CELLS ) continue;
			if( line[i] != Consts.FILL_CELLS ) {
				return false;
			};
		};
		return true;
	};
	
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
	
		return [ numsLineDel, numsColumnsDel ];
	};
	
	Game.prototype.delLastInsertFigure = function() {
		this.gameField.delLastInsertFigure();
			
		this.panelScore.score -= this.lastScore;
		PanelCoins.countCoins -= Consts.COINT_REDUCT_CANCEL_M;
		
		let numLastFigure = this.gameField.lastInsertFigure.num;
		
		if ( this.panelsFigures[0].figure && this.panelsFigures[1].figure && this.panelsFigures[2].figure ) {
			for( let i = 0; i<3; i++ ) {
				if( this.panelsFigures[i] == this.lastSeletPanelF ) continue;
				this.panelsFigures[i].setNActiveButPanelRot();
				this.panelsFigures[i].removeFigure();
			}
		}
		
		let figure = new Figure( this.lastSeletPanelF.group, this.lastSeletPanelF.group.width/2, this.lastSeletPanelF.group.height/2, numLastFigure );
		if( this.lastSeletPanelF.figure ) this.lastSeletPanelF.removeFigure();
		this.lastSeletPanelF.figure = figure;
		this.lastSeletPanelF.showFigure( false );
	
		this.gameField.lastInsertFigure = null;
		this.lastSeletPanelF = null;
		this.setNActiveButCancelMove();
	};
	
	Game.prototype.checkEndSteps = function( fieldGame, fieldsFigures ) {
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
		
		for( let i = 0; i < 10; i++ ) {
			if( self.gameField.field[j][i] == Consts.FILL_CELLS ) {
				
				PanelCoins.countCoins -= Consts.COINT_REDUCT_BON1;
				
				self.gameField.delLines( [ j ], [] );
				self.selectBonus = null;
				
				break;
			};
		};
	};

	Game.prototype.delColBon = function() {
		let self = this;
		let xgameField = self.gameField.x;
		let ygameField = self.gameField.y;
		
		let i = Math.abs( Math.ceil( ( xgameField+6 - Handler.pointerX ) / (Handler.cellW+3) ) );
		//let j = Math.abs( Math.ceil( ( ygameField+6 - Handler.pointerY ) / (Handler.cellW+3) ) );
		
		for( let j = 0; j < 10; j++ ) {
			if( self.gameField.field[j][i] == Consts.FILL_CELLS ) {
				
				PanelCoins.countCoins -= Consts.COINT_REDUCT_BON1;
				
				self.gameField.delLines( [], [i] );
				self.selectBonus = null;
				
				break;
			};
		};
		
		self.selectBonus = null;
	};
	
	Game.prototype.recreateFForContinueG = function() {
		let numsF = [ 0,1,3,4,11,12,13,14 ];
		
		this.gameField.delLines( [5,6], [] );
		
		for( let i = 0; i<3; i++ ) {
			if( this.panelsFigures[i].figure != null ) this.panelsFigures[i].removeFigure();
			
			let rndNumF = Math.floor( Math.random() * ( numsF.length - 0 ) + 0 );
			
			let xF = this.panelsFigures[i].group.width/2;
			let yF = this.panelsFigures[i].group.height/2;
			
			this.panelsFigures[i].figure = new Figure( this.panelsFigures[i].group, xF, yF, numsF[rndNumF] );
			this.panelsFigures[i].showFigure( false );
		}
	};
	
	Game.prototype.bonusRecreateFigures = function() {
		let self = this;
		
		for( let i = 0; i < 3; i++ ) {//по полям фигур
			if ( self.panelsFigures[i].figure != null ) self.panelsFigures[i].removeFigure();
			
			let posF = [];
			
			for( let pc = 0; pc < 19; pc++ ) {
				posF[pc] = pc;
			}
			let insF = false;
			do {
				let rndNumF =  Math.floor( Math.random() * ( posF.length - 0 ) + 0 );
				
				let xF = self.panelsFigures[i].group.width/2;
				let yF = self.panelsFigures[i].group.height/2;
				let f = new Figure( self.panelsFigures[i].group, xF, yF, posF[rndNumF] )
				
				for( let j = 0; j < 10; j++ ) {//по полю
					for( let k = 0; k < 10; k++ ) {
						insF = this.checkInsertFigure( this.gameField.field, f, j, k );
						if( insF ) break;
					}
					if( insF ) break;
				}
				
				if( insF ) {
					self.panelsFigures[i].figure = f;
					self.panelsFigures[i].showFigure( false );
				} else {
					posF.splice( rndNumF, 1 );
				}
			} while( insF != true && posF.length>0 );
		};
		self.selectBonus = null;
	};
	
	Game.prototype.checkActiveButRotF = function(){
		let self = this;
		
		for( let i = 0; i < 3; i++ ) {
			if( self.panelsFigures[i].figure == null ) continue;
			if ( self.panelsFigures[i].figure.type == Consts.TYPE_BLOCK ) {
				self.panelsFigures[i].setNActiveButPanelRot();
				continue;
			}
			self.panelsFigures[i].setActiveButPanelRot();
		}
	};
	
	Game.prototype.generateStringsFiguresOfChar = function() {
		let str = "";
		for( let i = 0; i < 250; i++ ) {
			let rndCh = Math.floor(Math.random() * (19 - 0) + 0);
			str += this.translationNumToChar( rndCh );
		}
		return str;
	};
	
	Game.prototype.translationNumToChar = function( _num ) {
		let res = this.stringForGeneration.substr( _num, 1 );
		return res;
	};
	
	Game.prototype.generateStringFiguresOfNum = function( _strChars ) {
		let str = "";
		for( let i = 0; i < 250; i++ ) {
			let ch = _strChars[i];
			str += this.translationCharToNum( ch ) + " ";
		}
		return str;
	};
	
	Game.prototype.selectAct = function( obj ) {
		let self = this;
		if ( obj.typeAct == Consts.TYPE_ACT_INSERT_F ) {
			this.gameFieldPlayer2.insertFigure( obj.numF, obj.i, obj.j );
		} 
		else if ( obj.typeAct == Consts.TYPE_ACT_START_GAME ) {
			this.startGame();
		}
		else if ( obj.typeAct == Consts.TYPE_ACT_ENEMY_LOST ) {
			this.abilityTakeStepsEnemy = false;
			alert( "Потивник не может ходить!" );
			self.checkWinner();
		}
		else if ( obj.typeAct == Consts.TYPE_ACT_DISCONNECT ) {
			alert( "Противник вышел из игры! Наберите очков больше чем противник для победы!" );
			this.abilityTakeStepsEnemy = false;
			self.checkWinner();
		} else if( obj.typeAct == Consts.TYPE_ACT_START_GAME_WITH_BOT ) {
			Handler.strPlayCooperative = this.generateStringsFiguresOfChar( this.stringForGeneration );
			this.fillPanelsWithF();
			
			this.startGame();
			Handler.bot.startGame();
		}
	};
	
	Game.prototype.checkWinner = function() {
		let self = this;
		let yourSc  = this.panelScore.score;
		let enemySc = this.panelPlayer2.score;
		
		if( !self.abilityTakeStepsEnemy && yourSc > enemySc ) {
			clearInterval(self.timerGame);
			alert( "Вы победили!" );
		}
		
		if ( !self.abilityTakeSteps && !self.abilityTakeStepsEnemy || self.secToTheEnd == 0 ) {
			let resW = null;
			if( yourSc > enemySc ) {
				resW = Consts.YOU_WIN;
				//windEndGameOnline = new WindEndGameOnline( Consts.YOU_WIN, yourSc, enemySc );
				//alert( "Вы победили!" );
			} else if ( yourSc < enemySc ) {
				resW = Consts.ENEMY_WIN;
				//windEndGameOnline = new WindEndGameOnline( Consts.ENEMY_WIN, yourSc, enemySc );
				//alert( "Вы проиграли!" );
			} else if( yourSc == enemySc ) {
				resW = Consts.DEAD_HEAT;
				//windEndGameOnline = new WindEndGameOnline( Consts.DEAD_HEAT, yourSc, enemySc );
				//alert( "Ничья!" );
			}
			Maim.windGame.group.removeSelf();
			windEndGameOnline.show( resW, yourSc, enemySc );
		}
	};
	
	Game.prototype.startGame = function() {
		let self = this;
		
		this.gameStarted = true;
		
		this.secToTheEnd = 180;
		let checkStopGame = function() {
			console.log( "second", self.secToTheEnd );
			self.secToTheEnd--;
			if( self.secToTheEnd == 0 ) {
				clearInterval( self.timerGame );
				self.checkWinner();
			}
		};
		this.timerGame = setInterval( checkStopGame, 1000);
	};
	
	Game.prototype.stPlayerExpectation = function() {
		let self = this;
		
		this.countMsgSearchEnemi = 1;
		
		this.secToTheNextR = 15; //секунд до конца поиска в текущем рейтинге
		let checkStartGame = function() {
			self.secToTheNextR--;
			console.log( "second", self.secToTheNextR );
			
			if( self.gameStarted == false && self.secToTheNextR == 0 ) {
				self.countMsgSearchEnemi--;
				if( self.countMsgSearchEnemi == 0 ) {
					self.netControl.sendMsg( { typeAct: Consts.TYPE_ACT_START_GAME_WITH_BOT } );
					clearInterval( self.tmPlayerExpectation );
					return;
				};
				self.secToTheNextR = 15;
				self.netControl.sendMsg( { typeAct: Consts.TYPE_ACT_SEARCH_NEXT_RATING } );
			};
			
			if ( self.gameStarted == true ) {
				clearInterval( self.tmPlayerExpectation );
				return;
			}; 
		};
		this.tmPlayerExpectation = setInterval( checkStartGame, 1000);
	};
	
	Game.prototype.setActiveButCancelMove = function() {
		if( Main.windGame.butCancelMove ) {
			Main.windGame.butCancelMove.filters = [  ];
			Main.windGame.butCancelMove.interactive = true;
		}
	};
	
	Game.prototype.setNActiveButCancelMove = function() {
		if( Main.windGame.butCancelMove ) {
			Main.windGame.butCancelMove.filters = [ Handler.bwf ];
			Main.windGame.butCancelMove.interactive = false;
		}
	};