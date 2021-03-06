
	let PanelBonus = function( _parent, _x, _y, _width, _height ) {
		let self = this;
		this.group = Handler.newGroup( _parent );
		
		this.numBonus = null;
		
		this.x = _x;
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.width = _width;
		this.height = _height;
		
		this._visible = true;
		
		this.bonuses = [];
		
		this.panelSelectFigure = null;
		
		Object.defineProperty( this, "visible", {
	       get: function(   ) { return self._visible; },
	       set: function( val ) {
				self._visible = val;			   
				self.group.visible = self._visible;
	    	}
	    });
	};
	
	PanelBonus.prototype.show = function() {
		let self = this;
		//this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		Handler.addImg( this.group, "./images/windGame/panelBonuses/background.png", 0,0,null, function(img){ img.toBack(); } );
		
		let tapButClose = function() {
			Sounds.click();
			if( self.panelSelectFigure )self.panelSelectFigure.destroy();
			Handler.game.selectBonus = null;			
			self.visible = false; 
		};
		//this.cross = 
		Handler.addImg( this.group, "./images/butClose.png", this.width-80, 20, tapButClose );

		let wBB = 130;
		//let hBB = 130;
		
		for( let i = 0; i < 4; i++) {
			let onLoadedBut = function( img ) {
				img.num = i;
			}
			//кнопки бонусов
			Handler.addImg( this.group, "./images/windGame/panelBonuses/butBon"+i+".png", 52+i*wBB+i*20, 90, function( evt ) { self.touchBonus( evt ); }, onLoadedBut );
		}
	};
	
	PanelBonus.prototype.touchBonus = function( evt ) {
		let self = this;
		Sounds.click();
		this.numBonus = evt.target.num;
		this.group.toFront();
		Handler.game.selectBonus = this.numBonus;
		
		if( this.numBonus == 0 || this.numBonus == 1 ) {
			let res = PanelCoins.countCoins - Consts.COINT_REDUCT_BON1;
			if( res < 0 ) {
				Main.wbc = new WindBuyCoins( wg );
				Handler.game.selectBonus = null;
			}
		}
		
		if( this.numBonus == 2 ) {
			let res = PanelCoins.countCoins - Consts.COINT_REDUCT_BON3;
			if( res < 0 ) {
				Main.wbc = new WindBuyCoins( wg );
				Handler.game.selectBonus = null;
			} else {
				Handler.game.bonusRecreateFigures();
				PanelCoins.countCoins -= Consts.COINT_REDUCT_BON3;
			}
		}
		
		if( this.numBonus == 3 ) {
			let res = PanelCoins.countCoins - Consts.COINT_REDUCT_BON4;
			if( res < 0 ) {
				Main.wbc = new WindBuyCoins( wg );
				Handler.game.selectBonus = null;
			} else {
				self.panelSelectFigure = new PanelSelectFigure( self, -this.x, 280, 720, 980 );
				self.panelSelectFigure.show();
			}   
		}
		Handler.game.setNActiveButCancelMove();
	};
	
	