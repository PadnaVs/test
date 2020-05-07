
	let WindStartGame = function() {
		this.group = Handler.newGroup( wOtherG );
	};
	
	WindStartGame.prototype.show = function() {
		let self = this;
		this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		this.butPlaySolo = Handler.showRect( this.group, 160, 160, 400, 200, 0xFF0000 );
		
		this.butPlayMultiplayer = Handler.showRect( this.group, 160, 560, 400, 200, 0x00FF00 );
		
		this.butPlaySolo.onEL( "pointertap", function() {
			self.group.visible = false;
			Handler.cooperative = false;
			windGame.show();
		} );
		
		this.butPlayMultiplayer.onEL( "pointertap", function() {
			self.group.visible = false;
			Handler.cooperative = true;
			windGame.show();
		} );
	};