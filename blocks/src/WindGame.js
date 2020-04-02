
	let WindGame = function ( _level ) {
		this.group = wg;
		this.level = _level;
		
		this.panelsFigure = [];
	};
	
	WindGame.prototype.show = function() {
		let self = this;
		
		this.background = Handler.showRect( this.group, 0, 0, 720, 1280, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		let pole =  [ 
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0],
				]
			
		this.gameFild = new GameFild( this.group, pole, 20, 230 );
		this.gameFild.show();
		
		for( let i = 0; i < 3; i++ ) {
			this.panelsFigure[i] = new PanelFigure( this.group, 20, 1000 );
			this.panelsFigure[i].show();
			
			let newX = 20+this.panelsFigure[i].width*i+6*i;
			
			this.panelsFigure[i].transition( newX );
		};
		
		this.touchBlock = Handler.showRect( this.group, 0, 0, 720, 1280, 0x00000, 0.01 );
		
		self.selectFigure = null;
		
		let touchDown = function( evt ) { 
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			Handler.pointerStartX = Handler.pointerX;
			Handler.pointerStartY = Handler.pointerY;
			
			for( let i = 0; i < 3; i++ ) {
				let wF = self.panelsFigure[i].figure.group.width;
				let hF = self.panelsFigure[i].figure.group.height;
				
				let posFX = self.panelsFigure[i].x + self.panelsFigure[i].figure.position.x;
				let posFY = self.panelsFigure[i].y + self.panelsFigure[i].figure.position.y;
				
				if ( Handler.pointerX >= posFX && Handler.pointerX <= posFX + wF ){
					if ( Handler.pointerY >= posFY && Handler.pointerY <= posFY + hF ) {
						self.panelsFigure[i].figure.scale();
						self.selectFigure = self.panelsFigure[i].figure;
						self.selectPandel = self.panelsFigure[i];
					}
				}
			}
		};
		
		let touchMove = function( evt ) { 
			Handler.pointerX = (evt.data.global.x/pixiAppScaleMobile)*2;
			Handler.pointerY = (evt.data.global.y/pixiAppScaleMobile)*2;
			
			let speed = 1;
			let shX = (Handler.pointerX - Handler.pointerStartX)*speed;
			let shY = (Handler.pointerY - Handler.pointerStartY)*speed;
			
			self.selectFigure.transition( self.selectFigure.position.x + shX, self.selectFigure.position.y + shY );
			
			Handler.pointerStartX = Handler.pointerX;
			Handler.pointerStartY = Handler.pointerY;
		};
		
		let checkInsertFigure = function( gameFildCells, x, y ) { 
			//for( let i = 0; i < 10; i++ ) {
			//	for( let j = 0; j < 10; j++ ) {
			//		let xC = gameFildCells[i][j].x;
			//		let yC = gameFildCells[i][j].y;
			//		if ( x >= xC && x <= xC + gameFildCells[i][j].width ) {
			//			if ( y >= yC && y <= yC + gameFildCells[i][j].height ) {
			//				console.log("вставилась");
			//			}
			//		}
			//	}
			//}
			
			
			let i = Math.floor( ( 20 - x)/(Handler.cellW+6) ) + 1;
			let j = Math.floor( ( 230 - y)/(Handler.cellW+6) ) + 1;
		}
		
		let touchUp = function( evt ) { 
			if ( self.selectFigure == null ) return;
			
			let wGameFild = 686;
			let hGameFild = 686;
			
			//let xGameFild = self.gameFild.background.position.scope.worldTransform.tx;
			let xGameFild = 20;
			//let yGameFild = self.gameFild.background.position.scope.worldTransform.ty;
			let yGameFild = 230;
			
			let posFX = self.selectPandel.x + self.selectFigure.position.x;
			let posFY = self.selectPandel.y + self.selectFigure.position.y;
			
			if ( posFX >= xGameFild && posFX <= xGameFild + wGameFild ){
				if ( posFY >= yGameFild && posFY <= yGameFild + hGameFild ) {
					checkInsertFigure( self.gameFild.cells, posFX, posFY );
				}
			}
			self.selectFigure = null;
		};
		
		console.log( "self.gameFild", self.gameFild );
		
		this.touchBlock.onEL( "pointerdown", function( evt ){ touchDown( evt ) } );
		this.touchBlock.onEL( "pointermove", function( evt ){ touchMove( evt ) } );
		this.touchBlock.onEL( "pointerup", function( evt ){ touchUp( evt ) } );
	};