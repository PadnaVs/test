
	let WindEndGameOnline = function( _win, _points, _pointsEnemy  ) {
		this.group = Handler.newGroup(wg);
		this.points = _points;
		this.pointsEnemy = _pointsEnemy;
		this.youWin = _win;
	};
	
	WindEndGameOnline.prototype.show = function() {
		Handler.addImg( this.group, "./images/windEndGameOnline/background.png", 0,0,null, function(img){ img.toBack(); img.interactive = true; } );
		
		
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
			
		};
		Handler.addImg( this.group, "./images/windEndGameOnline/butContinue.png", 160, 780, tapContinue );
	};