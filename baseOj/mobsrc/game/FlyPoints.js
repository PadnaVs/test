	
	"use strict";
	
	let FlyPoints = {};
	
	FlyPoints.init = function ( fi, fj, fpoints ) {
		let self = this;
		this._initFlyPointsTable();
		if ( this.flyPointsTable == null ) this.flyPointsTable = [];
		if ( this.flyPointsTable[fi] == null ) this.flyPointsTable[fi] = [];
		if ( this.flyPointsTable[fi][fj] == null ) this.flyPointsTable[fi][fj] = 0;
			
		this.flyPointsTable[fi][fj] += fpoints;
		
		setTimeout( function(){ self._onFlyPointsTimerTick( fi, fj ) } , 151);

		//TweenLite.to(new Sprite(),0.3,{onComplete:,onCompleteParams:[fi,fj]});
	};
	
	FlyPoints._initFlyPointsTable = function() {
		if ( this.flyPointsTable == null ) {
			let w = Handler.jlines.cx;
			let h = Handler.jlines.cy;
			this.flyPointsTable = [];
			for (let i=0;i<w;i++) {
				if (this.flyPointsTable[i] == null) this.flyPointsTable[i]  = [];
				for (let j=0;j<h;j++) {
					this.flyPointsTable[i][j] = 0;
				};
			};
		};
	};
	
	FlyPoints._onFlyPointsTimerTick = function(fi,fj) {
		try {
			let middlex = 0; let middley = 0; let countPC = 0;
			let fpoints = 0;
			let w = Handler.jlines.cx;
			let h = Handler.jlines.cy;
			if (this.flyPointsTable == null) this.flyPointsTable = [];
			for ( let i=0; i<w; i++ ) {
				if ( this.flyPointsTable[i] == null ) this.flyPointsTable[i] = [];
				for ( let j=0; j<h; j++ ) {
					if ( this.flyPointsTable[i][j] == null ) this.flyPointsTable[i][j] = 0;
					if ( this.flyPointsTable[i][j] != 0 ) {
						countPC++;
						middlex += i;
						middley += j;
						fpoints += this.flyPointsTable[i][j];
						this.flyPointsTable[i][j] = 0;
					}
				}
			}
			//let fpoints:int = flyPointsTable[fi][fj];
			//flyPointsTable[fi][fj] = 0;
			if (fpoints != 0) {
				fpoints = Math.floor(fpoints);
				let px = Math.floor(Handler.indexXToCoords(middlex/countPC));//Handler.indexXToCoords(fi);
				let py = Math.floor(Handler.indexYToCoords(middley/countPC));//Handler.indexYToCoords(fj);
				let ps = Handler.jlines.gemsContainer.parent;
				let fp = this.initImg( fpoints, px-20,py, true, ps);
				Handler.jlines.pointsPanel.countPoints += fpoints;
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	
	FlyPoints.initImg = function( fpoint, fx, fy, doubleSize = false, fparent ) {
		this._sprite = null;
		this.y0 = 0;
		
		try {
			this.y0 = fy;
			this._sprite = Handler.newGroup(); //Embeds.fontBody()
//			if ( doubleSize ) this._sprite.scaleX = this._sprite.scaleY = 2;
			let txtPoint = '' + fpoint;
			for ( let i=0; i<txtPoint.length; i++ ) {
				let fp = parseInt( txtPoint.substr(i,1) );
				let fs = Embeds.getFontSprite(fp);
				//if ( isMobile ) fs.scale.set(2);
				fs.x = i*22-fs.width	;
				fs.y = -fs.height;
				this._sprite.addChild(fs);
			};
			
			this._sprite.x = fx; this._sprite.y = fy;
			
			if (fparent) fparent.addChild(this._sprite);
			
			
			let self = this;
			//TweenMax.to( self._sprite, 1.2, {  y : self.y0-_shiftY, alpha : 0.4, onComplete : function() { self._destroy(); } } );
			this.tween();
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	
	FlyPoints.tween = function() {
		let self = this;
		let fpSprite = this._sprite;
		let _shiftY = 30; 
		TweenMax.to(  fpSprite, 1.2, {  y : self.y0-_shiftY, alpha : 0.4, onComplete : function() { Handler.destroy(  fpSprite ); } } );
	}
	
	FlyPoints._destroy = function() {
		try {
			if (this._sprite != null && this._sprite.parent != null) {
				this._sprite.parent.removeChild(this._sprite);
				this._sprite = null;
			}
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	