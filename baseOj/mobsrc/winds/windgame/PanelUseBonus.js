
	let PanelUseBonus = {};
	
	PanelUseBonus.show = function( params ){
		let self = this;
		this.group = Handler.newGroup( params.parent );
		Handler.showImg( this.group, "panelHelpUseBonMob.png", 0, 0, 457, 79 );
		let touchCross = function(){
			self.destroy();
		};
		this.cross = Handler.showImg( this.group, "crossBonMob.png", 202, -15, 37, 34 );
		this.cross.onEL('pointertap', touchCross);
		
		Handler.showImg( this.group, params.nameBon + ".png", -192, 4, 457, 79 );
		this.group.y = 320;
		
		return this;
	};
	
	PanelUseBonus.destroy = function() {
		if ( Handler.selBooster != 0 ) {
			Handler.selBooster = 0;
		};
		this.group.removeSelf();
	}