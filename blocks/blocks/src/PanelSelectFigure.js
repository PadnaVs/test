
	let PanelSelectFigure = function( _parent, _x, _y, _width, _height ) {
		
		this.parent = _parent;
		this.group = Handler.newGroup( this.parent.group );
		this.group.toFront();
		this.x = _x;
		this.y = _y;
		
		this.width = _width;
		this.height = _height;
		
		this.group.x = this.x; 
		this.group.y = this.y; 
		
		this.selectFigures = [];
	};
	
	PanelSelectFigure.prototype.show = function() {
		let self = this;
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		let paramsText = {
			fontWeight: 'bold',
			parent: this.group,
			text: "4ый Бонус",
			color: 0x9E3E0E,
			x: 360,
			y: 150,
			fontSize: 44,
			anchor: 0.5
		};
		Handler.newText( paramsText );
		
		let yF = 275;
		for( let i = 0; i < 15; i++ ) {
			let xF = 12+(165+12)*(i%4);
			
			this.createPoleFigure( xF, yF, Consts.NUMS_FIGURES_FOR_BON[i] );
			
			if ( i%4 == 3 ) {
				yF += 165+12;
			}
		};
		
		this.butOK = Handler.showRect( this.group, 543, 808, 165, 75, 0x00ff00, 1, 5 );
		this.butOK.onEL( "pointertap", function(){ self.touchOK(); } );
		
		this.butCancel = Handler.showRect( this.group, 543, 895, 165, 75, 0xff0000, 1, 5 );
		this.butCancel.onEL( "pointertap", function(){ self.destroy(); } );
	};
	
	PanelSelectFigure.prototype.createPoleFigure = function( x, y, num ) {
		let self = this;
		
		this.groupF = Handler.newGroup( this.group );
		this.groupF.onEL( "pointertap", function( evt ) { self.selectFigure( evt ); } );
		
		this.groupF.num = num;
		
		this.groupF.x = x;
		this.groupF.y = y;
		
		this.backgrF = Handler.showRect( this.groupF, 0, 0, 165, 165, 0x9E3E0E, 1, 5 );
		
		this.selIndec = Handler.showRect( this.groupF, 0, 0, 165, 165, 0x00ff00, 0.5, 5 );
		this.selIndec.visible = false;
		
		let figure = new Figure( this.groupF, 0, 0, num );
		figure.show();
		
		let newXF = 165/2 - figure.group.width/2;
		let newYF = 165/2 - figure.group.height/2;
		figure.transition( newXF, newYF );
		
	};
	
	PanelSelectFigure.prototype.selectFigure = function( evt ) {
		if ( evt.target.children[1].visible == true ) {
			evt.target.children[1].visible = false;
			//удаление выбранной фигуры
			for( let i = 0; i < 3; i++ ) {
				if( evt.target.num == this.selectFigures[i] ) this.selectFigures.splice( i , 1 );
			};
			console.log( this.selectFigures );
			return;
		}
		
		if ( this.selectFigures.length == 3 ) {
			return;
		}
		//добавление выбранной фигуры
		evt.target.children[1].visible = true;
		this.selectFigures.push( evt.target.num );
		console.log( this.selectFigures );
	};
	
	PanelSelectFigure.prototype.touchOK = function() {
		for( let i = 0; i < 3; i++ ) {
			if( this.selectFigures.length < 3 ) { 
				alert("вы не 3 выбрали фигуры");
				return;
			}
			if ( Handler.game.panelsFigure[i].figure != null ) Handler.game.panelsFigure[i].removeFigure();
			Handler.game.panelsFigure[i].figure = new Figure( Handler.game.panelsFigure[i].group, 0, 0, this.selectFigures[i] );
			Handler.game.panelsFigure[i].showFigure( false );
		}
		this.destroy();
	};
	
	PanelSelectFigure.prototype.destroy = function() {
		Handler.game.selectBonus = null;
		this.group.removeSelf();
		this.parent.panelSelectFigure = null;
		this.parent.visible = false;
	};