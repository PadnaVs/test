	"use strict";
	
    let ButBonus = function( parent, fx, fy, name, type ) {
		let self = this;
		this.type = type;
		this.parent = parent;
		this.name = name;
		this._scale = 0;
		this._count = 0;
        Object.defineProperty( this, "count", {
	        get: function(   ) { return this._count; },		 
	        set: function(val) {
	    	    this._count = val;  
	    	    this.showNumber();
	    	}
	    });//count


		this.image = Handler.showImg( parent, name+".png", fx, fy );
		if ( !isMobile ) {
			this.image.width /= 2;
			this.image.height  /= 2;
		};

		Object.defineProperty( this, "scale", {
	        get: function(   ) { return this._scale; },		 
	        set: function(val) {
	    	    this._scale = val;  
	    	    this.image.scale.set(this._scale);
	    	}
	    });
		
		this.count = User[name];
		this.image.onEL( "pointerdown", function(evt){ self.onClick(evt); } );
		return this;
    }; 
    ButBonus.prototype.showNumber = function( ) {
		let self = this;
		if ( this.txtCount ) Handler.destroy( this.txtCount );
		if ( this.plus ) Handler.destroy( this.plus );
        if ( this.count > 0 ) {
            let style = { parent: self.image, x: isMobile ? -15 : 8, y: isMobile ? -15 : 7, text: self.count };
			style.fontSize = isMobile ? 26 : 34;
			style.color = 0xEB4800;
			style.stroke = 0xffffff;
			style.strokeThickness = isMobile ? 3 : 6;
            this.txtCount = Handler.newText(style);  //JSJump????
			this.image.addChild(this.txtCount);
            this.txtCount.x -= Math.floor( this.txtCount.width/2 - this.image.width/2);			
            this.txtCount.y -= Math.floor( this.txtCount.height/2 - this.image.height/2);			
		} else {
			let wPlus = isMobile ? 23 : 44;
			let hPlus = isMobile ? 23 : 44;
			let xPlus = isMobile ? 17 : self.image.width/2;
			let yPlus = isMobile ? 15 : self.image.height/2+4;
			this.plus = Handler.showImgRect( self.image, "bonus/plus.png", xPlus, yPlus, wPlus, hPlus );
			this.plus.name = 'plus';
		}
		return this;
	};
    ButBonus.prototype.onClick = function(evt) {
		if ( this.count > 0 && !this.type ) {
			if ( Consts.BONUSES_NAMES.indexOf( this.name ) < 0 ) return;
			this.hideCursor();
			
			if ( Handler.selBooster != 0 ) {
				Handler.selBooster = 0;
			} else {
				Handler.selBooster = this.name;
				this.initCursor(evt);
			}
		} else {
			Winds.show( Winds.WIND_BUY_BOOSTER,{ nameBon: this.name } );
		}
	};
    ButBonus.prototype.initCursor = function(evt) {
		if ( isMobile ) {
			Handler.panelBonus = PanelUseBonus.show( { parent: this.parent, nameBon: this.name } );
		} else {
			Handler.curB = Embeds["curB"+this.name.substr(1)]();
			Handler.curB.name = this.name;
			Handler.curB.anchor.set(0,0);
			Handler.curB.position.x = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			Handler.curB.position.y = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
			pixiApp.stage.addChild( Handler.curB );
		};
		pixiApp.stage.interactive = "true";
		pixiApp.stage.on( "pointermove", Handler.curMove );
	};    
	ButBonus.prototype.hideCursor = function() {
		if ( Handler.panelBonus ) {
			Handler.panelBonus.destroy();
		}
		if ( Handler.curB != null ) {
			Handler.curB.destroy();
			Handler.curB = null;
		}
		pixiApp.stage.interactive = false;
		pixiApp.stage.off( "pointermove", Handler.curMove );
	};
    ButBonus.prototype.destroy = function( ) {
		this.image.destroy;
	};
    