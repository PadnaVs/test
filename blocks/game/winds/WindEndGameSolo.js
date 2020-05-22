
	let WindEndGameSolo = function(  ) {
		
		this.points = 0;
	};
	
	WindEndGameSolo.prototype.show = function( _points ) {
		let self = this;
		this.group = Handler.newGroup(wg);
		Handler.addImg( this.group, "./images/windEndGameSolo/background.png", 0,0,null, function(img){ img.toBack(); img.interactive = true; } );
		
		this.points = _points;
		
		let paramsText = {
			fontWeight: 'bold',
			parent: this.group,
			text: "Ваш результат: " + this.points + " очков",
			color: 0x9E3E0E,
			x: 360,
			y: 580,
			fontSize: 44,
			anchor: 0.5
		};
		Handler.newText( paramsText );
		
		let tapContinue = function(){
			self.group.removeSelf();
			Main.windStartGame.show();
		};
		Handler.addImg( this.group, "./images/windEndGameSolo/butContinue.png", 160, 780, tapContinue );
	};