
	let PanelRotationFigure = function( _parent, _x, _y, _width, _height ) {
		let self = this;
		
		this.parent = _parent;
		
		this.group = Handler.newGroup( this.parent.group );
		
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
		
		this.butOk = Handler.showRect( this.group, 20, 20, 200, 60, 0x00FF00, 1, 5 );
		this.butOk.onEL( "pointertap", function() { self.destroy() } );
		
		this.butRotF = Handler.showRect( this.group, 240, 20, 200,60, 0xffff00, 1, 5 );
		this.butRotF.onEL( "pointertap", function() { self.rotFigure() } );
		
		this.butCancel = Handler.showRect( this.group, 460, 20, 200, 60, 0xff0000, 1, 5 );
		this.butCancel.onEL( "pointertap", function() { self.creatStartFigure() } );
	}
	
	PanelRotationFigure.prototype.destroy = function() {
		this.group.removeSelf();
		this.parent.panelRotation = null;
		Handler.game.checkActiveButRotF();
	};
	
	PanelRotationFigure.prototype.rotFigure = function() {	
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
		
		this.parent.removeFigure();
		this.parent.figure = new Figure( this.parent.group, 0, 0, this.currentNum );
		this.parent.showFigure( false );
	};
	
	PanelRotationFigure.prototype.creatStartFigure = function() {
		this.parent.removeFigure();
		this.parent.figure = new Figure( this.parent.group, 0, 0, this.startNum );
		this.parent.showFigure( false );
		this.destroy();
	};