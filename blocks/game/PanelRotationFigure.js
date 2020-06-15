
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
		this.numTouch = 0;
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
		
		this.startFigure = this.parent.figure;
		
		for( let i = 0; i < 3; i++ ) {
			if( Handler.game.panelsFigures[i].figure ) Handler.game.panelsFigures[i].setNActiveButPanelRot();
		}
	};
	
	PanelRotationFigure.prototype.destroy = function() {
		this.group.removeSelf();
		Handler.game.openPanelRotFigure = false;
		this.parent.panelRotation = null;
		Handler.game.checkActiveButRotF();
		if( this.fRotated ) PanelCoins.countCoins -= Consts.COINT_REDUCT_ROT_F;
		for( let i = 0; i < 3; i++ ) {
			if( Handler.game.panelsFigures[i].figure != null && Handler.game.panelsFigures[i].figure != Consts.TYPE_BLOCK )
			Handler.game.panelsFigures[i].setActiveButPanelRot();
		}
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
		
		let numImgsCell = [];
		let positionCell = Consts.POSITION_CEIL[this.currentNum];
		let numImgCell = 0;
		for( let i = 0; i < 5; i++ ) {
			for( let j = 0; j < 5; j++ ) {
				if(positionCell[i][j] == Consts.OPEN_CELLS ) continue;
				let data = {
					i: i,
					j: j,
					numImg: this.startFigure.imgsData[numImgCell].numImg,
				}
				numImgsCell.push( data );
				numImgCell++;
			}
		}
		
		let xf = Math.floor(this.parent.width/2);
		let yf = Math.floor(this.parent.height/2);
		
		this.parent.removeFigure();
		this.parent.figure = new Figure( this.parent.group, xf, yf, this.currentNum, numImgsCell );
		this.parent.showFigure( false );
	};
	
	PanelRotationFigure.prototype.creatStartFigure = function() { 
		this.fRotated = false;
		if( this.parent.figure ) {
			this.parent.removeFigure();
			let xf = this.startFigure.x;
			let yf = this.startFigure.y;
			this.parent.figure = new Figure( this.parent.group, xf, yf, this.startNum, this.startFigure.imgsData );
			this.parent.showFigure( false );
		};
		this.destroy();
	};