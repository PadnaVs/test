
	let PanelFigure = function( _parent, _x, _y ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		
		Object.defineProperty( this, "x", {
	       get: function(   ) { return self.group.x; },
	       set: function( val ) {	
                self.group.x = val;
	    	}
	    });
		
		Object.defineProperty( this, "y", {
	       get: function(   ) { return self.group.y; },
	       set: function( val ) {	
                self.group.position.y = val;
	    	}
	    });
		
		this.x = _x;
		this.y = _y;
		
		this.figure = null;
		
		this.width  = 223;
		this.height = this.width;
		
		this.panelRotation = null;
		this.num = null;
	};
	
	PanelFigure.prototype.show = function() {
		let self = this;
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0x9E3E0E, 1, 15 );
		
		this.butShowPanel = Handler.showRect( this.group, 10, 10, 42, 42, 0xFF8300, 1, 5 );
		this.butShowPanel.onEL( "pointertap", function() { self.showPanelRotation() } );
		
		this.blockRect = Handler.showRect( this.group, 10, 10, 42, 42, 0xFF0000, 1, 5 );
		
		this.showFigure();
	};
	
	PanelFigure.prototype.showFigure = function( needGeneratF = true ) {
		if ( needGeneratF ) this.figure = this.generationFigure();
		this.figure.show();
		this.figure.transition( this.width/2 - this.figure.group.width/2, this.height/2 - this.figure.group.height/2 );
		this.figure.startX = this.figure.position.x;
		this.figure.startY = this.figure.position.y;
		
		this.startNumFigure = this.figure.num;
		if( this.figure.type == Consts.TYPE_BLOCK ) { 
			this.setNActiveButPanelRot();
		} else {
			this.setActiveButPanelRot();
		};
	};
	
	PanelFigure.prototype.generationFigure = function() {
		let rnd = Math.floor( Math.random() * ( 18 - 0 ) + 0 );
		
		let res = new Figure( this.group, rnd );
		
		return res;
	};
	
	PanelFigure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};
	
	PanelFigure.prototype.removeFigure = function() {
		this.figure.remove();
		this.figure = null;
	};
	
	PanelFigure.prototype.showPanelRotation = function() {
		if( this.panelRotation != null ) {
			return;
		}
		
		let self = this;
		
		let wP = 680;
		let hP = 100;
		
		let xP = 0;
		switch( this.num ) {
			case 1:
				xP =  - self.width - 6;
			break;
			
			case 2:
				xP =  (-self.width - 6)*2;
			break;
		}
		
		
		let yP = -hP-20;
	
		this.panelRotation = new PanelRotationFigure( this, xP, yP, wP, hP );
		this.panelRotation.show();
		this.panelRotation.group.toFront();
		
		Handler.game.checkActiveButRotF();
	};
	
	PanelFigure.prototype.setActiveButPanelRot = function() {
		this.butShowPanel.interactive = true;
		this.blockRect.visible = false;
	};
	
	PanelFigure.prototype.setNActiveButPanelRot = function() {
		this.butShowPanel.interactive = false;
		this.blockRect.visible = true;
	};

	