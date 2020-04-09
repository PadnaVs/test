
	let WindGame = function ( _level ) {
		this.group = wg;
		this.level = _level;
		
		this.panelsFigure = [];
	};
	
	WindGame.prototype.show = function() {
		let self = this;
		
		this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
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
			
		this.gameField = new GameField( this.group, field, 20, 300 );
		this.gameField.show();
		
		for( let i = 0; i < 3; i++ ) {
			this.panelsFigure[i] = new PanelFigure( this.group, 20, 1000 );
			this.panelsFigure[i].show();
			
			let newX = 20+this.panelsFigure[i].width*i+6*i;
			
			this.panelsFigure[i].transition( newX );
		};
		
		this.panelScore = new PanelScore( this.group, 20, 170, 450, 90 );
		this.panelScore.show();
		
		this.panelBestScore = new PanelBestScore( this.group, 20, 40, 450, 90 );
		this.panelBestScore.show();
		
		this.touchBlock = Handler.showRect( this.group, 0, 0, 720, 1280, 0x00000, 0.01 );
		
		let panels = {
			gameField: this.gameField,
			panelsFigures: this.panelsFigure,
			touchBlock: this.touchBlock,
			panelScore: this.panelScore,
		};
		Handler.game = new Game( panels );
		
		this.butSound = Handler.showRect( this.group, 498, 40, 90, 90, 0xfff00f, 1 );
		
		this.butMenu  = Handler.showRect( this.group, 608, 40, 90, 90, 0xff0000, 1 );
		
		this.butBonuses  = Handler.showRect( this.group, 498, 170, 200, 90, 0x00ff00, 1 );
		
		this.panelBonus = new PanelBonus( this.group, 20, 20, 680, 270 );
		this.panelBonus.show();
		this.panelBonus.visible = false;
		
		this.butBonuses.onEL( "pointerdown", function( evt ) { self.panelBonus.visible = true } );
		
		
		
		
		

	};