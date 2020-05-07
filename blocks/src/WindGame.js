
	let WindGame = function ( _level ) {
		this.group = wg;
		this.level = _level;
		
		this.panelsFigure = [];
	};
	
	WindGame.prototype.show = function() {
		let self = this;
		
		this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		//this.background.toBack();
		
		let field =  [ 
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
					
		let fieldS =  [ 
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
					
		if ( Handler.cooperative ) Handler.createStrForCooperative( 5 );
			
		this.gameField = new GameField( this.group, 20, 300, field );
		this.gameField.show();
		
		this.touchBlock = Handler.showRect( this.group, 0, 0, 720, 1280, 0x00000, 0.01 );
		
		for( let i = 0; i < 3; i++ ) {
			this.panelsFigure[i] = new PanelFigure( this.group, 20, 1000 );
			this.panelsFigure[i].num = i;
			
			this.panelsFigure[i].show();
			let newX = 20+this.panelsFigure[i].width*i+6*i;
			
			this.panelsFigure[i].transition( newX );
		};
		
		console.log( this.background.zIndex );
		console.log( this.gameField.group.zIndex );
		console.log( this.panelsFigure[0].group.zIndex );
		console.log( this.panelsFigure[1].group.zIndex );
		console.log( this.panelsFigure[2].group.zIndex );
		
		this.panelScore = null;
		this.panelBestScore = null;
		
		this.panelPlayer1 = null;
		this.panelPlayer2 = null;
		
		if( !Handler.cooperative ) { 
			this.panelScore = new PanelScore( this.group, 20, 170, 330, 90 );
			this.panelScore.show();
		
			this.panelBestScore = new PanelBestScore( this.group, 20, 40, 330, 90 );
			this.panelBestScore.show();
			
			this.butSound = Handler.showRect( this.group, 498, 40, 90, 90, 0xfff00f, 1 );
			
			this.butCancelMove = Handler.showRect( this.group, 380, 170, 90, 90, 0xff00ff, 1 );
			
			this.butMenu  = Handler.showRect( this.group, 608, 40, 90, 90, 0xff0000, 1 );
			
			this.butBonuses  = Handler.showRect( this.group, 498, 170, 200, 90, 0x00ff00, 1 );
			
			this.panelBonus = new PanelBonus( this.group, 20, 20, 680, 270 );
			this.panelBonus.show();
			this.panelBonus.visible = false;
			
			this.butBonuses.onEL( "pointerdown", function( evt ) { 
				self.panelBonus.visible = true;
				self.panelBonus.group.toFront();
			} );
		} else {
			
			let paramsPlayer1 = {
				parent: this.group,
				x: 20,
				y: 20,
				width: 170,
				height: 270,
				numPlayer: 1
			};
			this.panelScore = new PanelStatsPlayer( paramsPlayer1 );
			this.panelScore.show();
			
			let paramsPlayer2 = {
				parent: this.group,
				x: 530,
				y: 20,
				width: 170,
				height: 270,
				numPlayer: 2
			};
			this.panelPlayer2 = new PanelStatsPlayer( paramsPlayer2 );
			this.panelPlayer2.show();
			
			this.gameFieldPlayer2 = new GameFieldPlayer2( this.group, 225, 20, 270, 270, fieldS );
			this.gameFieldPlayer2.show();
		}
		
		let panels = {
			gameField: this.gameField,
			gameFieldPlayer2: this.gameFieldPlayer2,
			panelsFigures: this.panelsFigure,
			touchBlock: this.touchBlock,
			panelScore: this.panelScore,
			panelPlayer2: this.panelPlayer2,
		};
		Handler.game = new Game( panels );
		if( Handler.cooperative ) {
			self.bot = new Bot();
			self.bot.startGame();
		}
		
		if( this.butCancelMove ) this.butCancelMove.onEL( "pointerdown", function() { 
				Handler.game.delLastInsertFigure();
		} );
		//this.gameFieldPlayer2.insertFigure( 1, 0, 0 );
		//this.gameFieldPlayer2.insertFigure( 1, 2, 0 );
		//this.gameFieldPlayer2.insertFigure( 1, 4, 0 );
		//this.gameFieldPlayer2.insertFigure( 1, 6, 0 );
		//this.gameFieldPlayer2.insertFigure( 1, 8, 0 );
	};