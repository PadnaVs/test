
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
		
		this.numSibolInStringСooperative = 0;
	};
	
	PanelFigure.prototype.show = function() {
		let self = this;
		
		//this.background
		Handler.addImg( this.group, "./images/windGame/panelFigure/background.png",0,0,null,function(img){ img.toBack(); } );
		
		let onLoadButR = function(img) {
			self.butShowPanel = img; 
			if( self.figure.type == Consts.TYPE_BLOCK ) {
				self.butShowPanel.interactive = false;
				self.setNActiveButPanelRot();
			} else {
				self.setActiveButPanelRot();
			};
		};
		
		let tapButRotF = function() {
			let res = PanelCoins.countCoins - Consts.COINT_REDUCT_ROT_F;
			if( res <= 0 ) {
				Main.wbc = new WindBuyCoins( wg );
			} else {
				self.showPanelRotation();
			}
		}
		Handler.addImg( this.group, "./images/windGame/panelFigure/butShowPRotF.png", 10, 10, tapButRotF, onLoadButR );
		
		let onLoadButAddF = function( img ) {
			self.butAddF = img;
			self.butAddF.toBack();
		}
		
		let tapButAddF = function() {
			let res = PanelCoins.countCoins - Consts.COINT_REDUCT_ADD_F;
			if( res <= 0 ) {
				Main.wbc = new WindBuyCoins( wg );
			} else {
				self.showFigure();
				PanelCoins.countCoins -= Consts.COINT_REDUCT_ADD_F;
			}
		}
		Handler.addImg( this.group, "./images/windGame/panelFigure/butAddF.png", 10, 10, tapButAddF, onLoadButAddF );
		
		
		
		this.blockRect = Handler.showRect( this.group, 10, 10, 42, 42, 0xFF0000, 0.7 );
		//this.blockRect.interactive = true;
		
		this.showFigure();
	};
	
	PanelFigure.prototype.showFigure = function( needGeneratF = true ) {
		if ( needGeneratF ) this.figure = this.generationFigure();
		this.figure.show();
		if(this.butAddF) this.butAddF.toBack();
		//this.figure.transition(this.width/2,this.height/2);
		//this.figure.transition( this.width/2 - this.figure.group.width/2, this.height/2 - this.figure.group.height/2 );
		//this.figure.startX = this.figure.position.x;
		//this.figure.startY = this.figure.position.y;
		
		this.startNumFigure = this.figure.num;
		if( this.figure.type == Consts.TYPE_BLOCK ) { 
			this.setNActiveButPanelRot();
		} else {
			this.setActiveButPanelRot();
		};
	};
	
	PanelFigure.prototype.generationFigure = function() {
		let numF = null;
		
		if ( Handler.cooperative == false ) {
			numF = Math.floor( Math.random() * ( 19 - 0 ) + 0 );
		} else {
			if( this.numSibolInStringСooperative == 0 ) {
				this.numSibolInStringСooperative += this.num;
			}
				
			let ch = Handler.strPlayCooperative.substr( this.numSibolInStringСooperative, 1 );
			numF = Handler.translationCharToNum( ch );
			this.numSibolInStringСooperative += 3;
			
			if ( this.numSibolInStringСooperative > 249 ) {
				this.numSibolInStringСooperative = 0;
			}
		}
		
		
		let res = new Figure( this.group, Math.floor(this.width/2), Math.floor(this.height/2), numF );
		return res;
	};
	
	PanelFigure.prototype.transition = function( _x=0, _y=0 ) {
		this.group.x = _x == 0 ? this.group.x : _x;
		this.group.y = _y == 0 ? this.group.y : _y;
	};
	
	PanelFigure.prototype.removeFigure = function() {
		this.figure.remove();
		this.figure = null;
		if(this.butAddF) this.butAddF.toFront();
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
		if(this.butShowPanel)this.butShowPanel.interactive = true;
		//this.blockRect.visible = false;
		this.blockRect.toBack();
	};
	
	PanelFigure.prototype.setNActiveButPanelRot = function() {
		if(this.butShowPanel)this.butShowPanel.interactive = false;
		//this.blockRect.visible = true;
		this.blockRect.toFront();
	};

	