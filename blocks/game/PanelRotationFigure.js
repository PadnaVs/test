
	let PanelRotationFigure = function( _parent, _x, _y, _width, _height ) {
		let self = this;
		
		this.parent = _parent;
		
		this.group = Handler.newGroup( this.parent.group );
		
		this.fRotated = false;
		
		this.x = _x;
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.width = _width;
		this.height = _height;
		
		this.startNum = this.parent.startNumFigure;
		
		this.currentNum = this.startNum;
		if ( this.parent.figure.num >= 11 && this.parent.figure.num <= 14 ) this.lastNumFigure = 14;
		if (this. parent.figure.num >= 15 && this.parent.figure.num <= 18 ) this.lastNumFigure = 18;
	};
	
	PanelRotationFigure.prototype.show = function() {
		let self = this;
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0xFF8300, 1, 5 );
		
		//this.butOk
		Handler.addImg( this.group, "./images/windGame/panelFigure/butApplyRot.png", 20, 20, function() { Sounds.click(); self.destroy() } );
		//this.butRotF
		Handler.addImg( this.group, "./images/windGame/panelFigure/butRotF.png", 240, 20, function() { Sounds.click(); self.rotFigure() } );
		//this.butCancel
		Handler.addImg( this.group, "./images/windGame/panelFigure/butCancelRot.png", 460, 20, function() { Sounds.click(); self.creatStartFigure() } );
		
	}
	
	PanelRotationFigure.prototype.destroy = function() {
		this.group.removeSelf();
		this.parent.panelRotation = null;
		Handler.game.checkActiveButRotF();
		if( this.fRotated ) PanelCoins.countCoins -= Consts.COINT_REDUCT_ROT_F;
	};
	
	PanelRotationFigure.prototype.rotFigure = function() {
		this.fRotated = true;		
		if ( this.parent.figure.type == Consts.TYPE_LINE ) {
			if( this.parent.figure.positionLine == Consts.GORIZONTAL_LINE ) this.currentNum++;
			if( this.parent.figure.positionLine == Consts.VERTICAL_LINE ) this.currentNum--;
		};
		
		if ( this.parent.figure.type == Consts.TYPE_ANGLE ) {
			this.currentNum++;
			if ( this.currentNum > this.lastNumFigure ) {
				this.currentNum = this.lastNumFigure-3;
			}
		};
		
		if( this.startNum == this.currentNum ) {
			this.fRotated = false;
		}
		
		this.parent.removeFigure();
		this.parent.figure = new Figure( this.parent.group, this.parent.width/2, this.parent.height/2, this.currentNum );
		this.parent.showFigure( false );
	};
	
	PanelRotationFigure.prototype.creatStartFigure = function() {
		this.fRotated = false;
		this.parent.removeFigure();
		this.parent.figure = new Figure( this.parent.group, this.parent.width/2, this.parent.height/2, this.startNum );
		this.parent.showFigure( false );
		this.destroy();
	};