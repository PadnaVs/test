
	let WindContinueGame = function (  ) {
		//this.group = Handler.newGroup(wg);
	};
	
	WindContinueGame.prototype.show = function() {
		Sounds.openWind();
		this.group = Handler.newGroup(wg);
		let self = this;
		
		this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		let tapButClose = function() {
			Sounds.click();
			Main.windGame.group.removeSelf();
			self.group.removeSelf();
			Main.windEndGameSolo.show( Handler.game.panelScore.score );
		};
		
		Handler.addImg( this.group, "./images/butClose.png", 600,0, tapButClose );
		
		let paramsText = {
			fontWeight: 'bold',
			parent: this.group,
			text: "Нельзя установить доступные фигуры!",
			color: 0x9E3E0E,
			x: 360,
			y: 380,
			fontSize: 34,
			anchor: 0.5
		};
		Handler.newText( paramsText );
		
		let paramsText2 = paramsText;
		paramsText2.text = "Продолжить с новыми \nфигурами за 50 монет?";
		paramsText2.x = 360;
		paramsText2.y = 480;
		Handler.newText( paramsText2 );
		
		let tapButContinue = function() {
			Sounds.click();
			let res = PanelCoins.countCoins - Consts.COINT_REDUCT_CONTINUE_GAME;
			if ( res < 0 ) {
				Main.wbc = new WindBuyCoins( wg );
			} else {
				Handler.game.recreateFForContinueG();
				Handler.game.setNActiveButCancelMove();
				PanelCoins.countCoins -= Consts.COINT_REDUCT_CONTINUE_GAME;
				self.group.removeSelf();
			}
		};
		
		Handler.addImg( this.group, "./images/windContinueGame/butContinue.png", 140, 580, tapButContinue );
		
		Handler.addImg( this.group, "./images/windContinueGame/butCancel.png", 140, 800, tapButClose );
	};