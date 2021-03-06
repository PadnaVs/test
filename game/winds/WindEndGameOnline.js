
	let WindEndGameOnline = function(   ) {
		this.points = 0;
		this.pointsEnemy = 0;
		this.youWin = null;
	};
	
	WindEndGameOnline.prototype.show = function( _win, _points, _pointsEnemy ) {
		this.group = Handler.newGroup(wg);
		Sounds.openWind();
		
		this.background = null;
		this.setBackgr( Main.numShowBackgr );
		
		this.points = _points;
		this.pointsEnemy = _pointsEnemy;
		this.youWin = _win;
		
		let paramsText = {
			fontWeight: 'bold',
			parent: this.group,
			color: 0x9E3E0E,
			x: 360,
			y: 280,
			fontSize: 44,
			anchor: 0.5
		};
		
		if( this.youWin == Consts.YOU_WIN ) {
			paramsText.text = "Вы победили!";
		} else if( this.youWin == Consts.ENEMY_WIN ) {
			paramsText.text = "Вы проиграли!";
		} else if ( this.youWin == Consts.DEAD_HEAT ) {
			paramsText.text = "Ничья!";
		}
		
		
		Handler.newText( paramsText );
		
		
		let paramsText2 = {
			fontWeight: 'bold',
			parent: this.group,
			text: "Ваш результат: " + this.points + " очков",
			color: 0x9E3E0E,
			x: 360,
			y: 480,
			fontSize: 44,
			anchor: 0.5
		};
		Handler.newText( paramsText2 );
		
		let paramsText3 = {
			fontWeight: 'bold',
			parent: this.group,
			text: "Результат противника: " + this.pointsEnemy + " очков",
			color: 0x9E3E0E,
			x: 360,
			y: 600,
			fontSize: 44,
			anchor: 0.5
		};
		Handler.newText( paramsText3 );
		
		let tapContinue = function(){
			Sounds.click();
		};
		Handler.addImg( this.group, "./images/windEndGameOnline/butContinue.png", 160, 780, tapContinue );
	};
	
	WindEndGameOnline.prototype.setBackgr = function( num ) {
		let self = this;
		if( this.background ) this.background.removeSelf();
		Handler.addImg( this.group, "./images/backgrounds/back"+ num +".jpg", 360, 640, null, function(img){ 
			self.background = img;
			img.toBack();
			img.anchor.set(0.5,0.5);
			img.tint = 0xA55B30;			
		} );
	};