
	let PanelStatsPlayer = function( params ) {
		let self = this;
		
		this.img = null;
		this.parent = params.parent;
		
		this.score = null;
		
		this.x = params.x;
		this.y = params.y;
		
		this.group = Handler.newGroup( this.parent );
		this.group.x = this.x;
		this.group.y = this.y;
		
		this.width = params.width;
		this.height = params.height;
		
		this._score = 0;
		
		Object.defineProperty( this, "score", {
	       get: function(   ) { return self._score; },
	       set: function( val ) {	
                self._score = val;
				let paramsText = {
					fontWeight: 'bold',
					parent: self.group,
					text: self._score+"",
					color: 0x0000ff,
					x: this.width/2,
					y: 240,
					fontSize: 44,
					anchor: 0.5
				};
				if( self.lableNumScore != null ) self.lableNumScore.destroy();
				self.lableNumScore = Handler.newText( paramsText );
	    	}
	    });

	}
	
	PanelStatsPlayer.prototype.show = function() {
		this.background = Handler.showRect( this.group, 0, 0, this.width, this.height, 0x9E3E0E, 1, 15 );
		
		let paramsText = {
			fontWeight: 'bold',
			parent: this.group,
			text: "NAME",
			color: 0x0000ff,
			x: this.width/2,
			y: 28,
			fontSize: 44,
			anchor: 0.5
		
		};
		
		Handler.newText( paramsText );
		
		this.backgrImg = Handler.showRect( this.group, 35, 55, 100, 100, 0x0000ff, 1, 15 );
		
		let paramsLableScore = paramsText;
		paramsLableScore.text = "Score";
		paramsLableScore.y = 190;
		
		Handler.newText( paramsLableScore );
		
		this.score = 0;
	};
	
	