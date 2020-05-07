
	let PanelBestScore = function( _parent, _x, _y, _width, _height ) {
		let self = this;
		
		this.group = Handler.newGroup( _parent );
		
		this._score = 0;
		this.lableNumScore = null;
		
		Object.defineProperty( this, "score", {
	       get: function(   ) { return self._score; },
	       set: function( val ) {	
                self._score = val;
				let paramsText = {
					fontWeight: 'bold',
					parent: self.group,
					text: self._score+"",
					color: 0x9E3E0E,
					x: 240,
					y: 28,
					fontSize: 44,
					//align: "center"
				};
				if( self.lableNumScore != null ) self.lableNumScore.destroy();
				self.lableNumScore = Handler.newText( paramsText );
	    	}
	    });
		
		this.x = _x;
		this.y = _y;
		
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.width  = _width;
		this.height = _height;
	};
	
	PanelBestScore.prototype.show = function() {
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0xFFB38C, 1, 1, 6, 0x9E3E0E );
		
		let paramsText = {
			fontWeight: 'bold',
			parent: this.group,
			text: "Best:",
			color: 0x9E3E0E,
			x: 10,
			y: 28,
			fontSize: 44
		};
		
		let lableScore = Handler.newText( paramsText );
		this.score = 0;
	};