
	let WindStartGame = function() {
		
	};
	
	WindStartGame.prototype.show = function() {
		let self = this;
		this.group = Handler.newGroup( wg );
		
		this.background = null;
		this.setBackgr( Main.numShowBackgr );
		
		Sounds.openWind();
		
		let tapButPlaySolo = function() {
			Sounds.click();
			self.group.visible = false;
			Handler.cooperative = false;
			Main.windGame.show();
			self.group.removeSelf();
		};
		
		PanelCoins.init( this.group );
		
		//this.butPlaySolo = 
		Handler.addImg( this.group, "./images/butPlaySolo.png", 160, 160, tapButPlaySolo );
		
		let tapButPlayOnline = function() {
			Sounds.click();
			self.group.visible = false;
			Handler.cooperative = true;
			Main.windGame.show();
			self.group.removeSelf();
		};
		//this.butPlayMultiplayer = 
		Handler.addImg( this.group, "./images/butPlayOnline.png", 160, 560, tapButPlayOnline );
	};
	
	WindStartGame.prototype.setBackgr = function( num ) {
		let self = this;
		if( this.background ) this.background.removeSelf();
		Handler.addImg( this.group, "./images/backgrounds/back"+ num +".jpg", 360, 640, null, function(img){ 
			self.background = img;
			img.toBack();
			img.anchor.set(0.5,0.5);
			img.tint = 0xA55B30;			
		} );
	};