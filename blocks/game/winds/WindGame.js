
	let WindGame = function ( _level ) {
		this.level = _level;
		
		this.panelsFigures = [];
	};
	
	WindGame.prototype.show = function() {
		let self = this;
		this.group = Handler.newGroup(wg);
		Sounds.openWind();
		
		this.background = null;
		this.setBackgr( Main.numShowBackgr );
		
		//this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xA86441, 1, 1, 6, 0x9E3E0E );
		//this.background.toBack();
		//this.background = null;
		//Handler.addImg( this.group, "./images/backgrounds/back"+ Main.numShowBackgr +".jpg", 360, 640, null, function(img){ 
		//	self.background = img;
		//	img.toBack();
		//	img.anchor.set(0.5,0.5);
		//	img.tint = 0xA55B30;			
		//} );
		
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
		
		//Handler.addImg( this.group, "./images/windGame/bg.png", 0, 278, null, function(img){ /*img.toBack();*/ } );
			
		this.gameField = new GameField( this.group, 2, 280, field );
		this.gameField.show();
		
		
		this.touchBlock = Handler.showRect( this.group, 0, 0, 720, 1280, 0x00000, 0.01 );
		
		for( let i = 0; i < 3; i++ ) {
			this.panelsFigures[i] = new PanelFigure( this.group, 20, 1000 );
			this.panelsFigures[i].num = i;
			
			this.panelsFigures[i].show();
			let newX = 20+this.panelsFigures[i].width*i+6*i;
			
			this.panelsFigures[i].transition( newX );
		};
		
		this.panelScore = null;
		this.panelBestScore = null;
		
		this.panelPlayer1 = null;
		this.panelPlayer2 = null;
		
		if( !Handler.cooperative ) { 
			this.panelScore = new PanelScore( this.group, 20, 170, 330, 90 );
			this.panelScore.show();
		
			this.panelBestScore = new PanelBestScore( this.group, 20, 40, 330, 90 );
			this.panelBestScore.show();
/////////////////////////Звук///////////////////////////////			
			this.butSoundEn = null;
			this.butSoundDis = null;
			
			let tapButSoundEn = function( evt ) {
				if( !self.butSoundEn ) return;
				Sounds.Play();
				if( !evt.target.visible ) {
					evt.target.visible = true;
					self.butSoundEn.visible = false;
				} else {
					evt.target.visible = false;
					self.butSoundEn.visible = true;
				}
			};
			
			let tapButSoundDis = function( evt ) {
				if( !self.butSoundDis ) return;
				Sounds.Stop();
				if( !evt.target.visible ) {
					evt.target.visible = true;
					self.butSoundDis.visible = false;
				} else {
					evt.target.visible = false;
					self.butSoundDis.visible = true;
				}
			};
			//this.butSound = 
			let onLoadButSoundEn = function(img){
				self.butSoundEn = img;
			};
			let onLoadButSoundDis = function(img){
				self.butSoundDis = img;
			};
			Handler.addImg( this.group, "./images/windGame/butSoundDis.png", 498, 40, tapButSoundEn, onLoadButSoundDis );
			Handler.addImg( this.group, "./images/windGame/butSoundEn.png", 498, 40, tapButSoundDis, onLoadButSoundEn );
////////////////////////////////////////////////////////////			
			
			
			let tapButCancelMove = function() {
				Sounds.click();				
				if( Handler.game.lastSeletPanelF ) {
					let res = PanelCoins.countCoins - Consts.COINT_REDUCT_CANCEL_M;
					if( res < 0 ) {
						Main.wbc = new WindBuyCoins( wg );
					} else {
						Handler.game.delLastInsertFigure();
					}
				}
			};
			
			let onLoadButCancelMove = function(img) {
				self.butCancelMove = img;
				self.butCancelMove.filters = [ Handler.bwf ];
				self.butCancelMove.interactive = false;
			}
			Handler.addImg( this.group, "./images/windGame/butCancelMove.png", 380, 170, tapButCancelMove, onLoadButCancelMove );
			
			let tapButMenu = function(){
				Sounds.click();
				Main.WindSelectBackgr.show();
			};
			//this.butMenu
			Handler.addImg( this.group, "./images/windGame/butMenu.png", 608, 40, tapButMenu );
			
			let tapButBonuses = function(){
				Sounds.click();
				self.panelBonus.visible = true;
				self.panelBonus.group.toFront();
			};
			//this.butBonuses
			Handler.addImg( this.group, "./images/windGame/butBonuses.png", 498, 170, tapButBonuses );
			
			this.panelBonus = new PanelBonus( this.group, 20, 20, 680, 270 );
			this.panelBonus.show();
			this.panelBonus.visible = false;
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
		
		PanelCoins.init( this.group, -240 );
		PanelCoins.countCoins = 500;
		
		
		Handler.game = new Game();
		
		if( Handler.cooperative ) {
			Handler.bot = new Bot();
			//Handler.bot.startGame();
		}
	};
	
	WindGame.prototype.setBackgr = function( num ) {
		let self = this;
		if( this.background ) this.background.removeSelf();
		Handler.addImg( this.group, "./images/backgrounds/back"+ num +".jpg", 360, 640, null, function(img){ 
			self.background = img;
			img.toBack();
			img.anchor.set(0.5,0.5);
			img.tint = 0xA55B30;			
		} );
	};