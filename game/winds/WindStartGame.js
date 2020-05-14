
	let WindStartGame = function() {
		this.group = Handler.newGroup( wg );
	};
	
	WindStartGame.prototype.show = function() {
		let self = this;
		this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		let tapButPlaySolo = function() {
			self.group.visible = false;
			Handler.cooperative = false;
			windGame.show();
		};
		
		PanelCoins.init( this.group );
		
		//this.butPlaySolo = 
		Handler.addImg( this.group, "./images/butPlaySolo.png", 160, 160, tapButPlaySolo );
		
		let tapButPlayOnline = function() {
			self.group.visible = false;
			Handler.cooperative = true;
			windGame.show();
		};
		//this.butPlayMultiplayer = 
		Handler.addImg( this.group, "./images/butPlayOnline.png", 160, 560, tapButPlayOnline );
	};