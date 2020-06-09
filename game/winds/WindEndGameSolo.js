
	let WindEndGameSolo = function(  ) {
		
		this.points = 0;
	};
	
	WindEndGameSolo.prototype.show = function( _points ) {
		let self = this;
		Sounds.openWind();
		this.group = Handler.newGroup(wg);
		
		this.background = null;
		this.setBackgr( Main.numShowBackgr );
		
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
			Sounds.click();
			self.group.removeSelf();
			Main.windStartGame.show();
		};
		Handler.addImg( this.group, "./images/windEndGameSolo/butContinue.png", 160, 780, tapContinue );
	};
	
	WindEndGameSolo.prototype.setBackgr = function( num ) {
		let self = this;
		if( this.background ) this.background.removeSelf();
		Handler.addImg( this.group, "./images/backgrounds/back"+ num +".jpg", 360, 640, null, function(img){ 
			self.background = img;
			img.toBack();
			img.anchor.set(0.5,0.5);
			img.tint = 0xA55B30;			
		} );
	};