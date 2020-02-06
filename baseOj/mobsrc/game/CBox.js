	
	"use strict";
	
	let CBox = function() {
		this.TIME_SINGLE_MOVE = 0.10; //Consts.
		
		this.color   = 0;
		this._sprite = null;
		this._sprite = Handler.newGroup();
		
		this.countBombs = 0;
		
		this._colors = [0x339933,0x993333,0x333399,0x999933,0x933339];
		this._boosterGLine = false;
		this._boosterVLine = false;
		this._boosterPLine = false;
		this._selected 	  = false;
		this._boosterFrz   = false;
		this._boosterGhost = false;
		this._boosterIron  = true;
//		this._mcGemLight = Embeds.GemLight;

//////////////////selected
	    Object.defineProperty( this, "selected", {
	        get: function(   ) { return this._selected; },
	        set: function(val) {    
                if ( [5,6,7].indexOf( this.color ) >= 0 ) return;
	    		
	    	    if ( this._selected != val ) {
	    	    	let gemBody = this._sprite.getChildByName('gemBody');//as Sprite;
						if ( val ) {
							gemBody.isVisible = false;
							if ( this.animSprite != null ) Handler.destroy(this.animSprite);
							this.animSprite = Embeds['gem0'+(this.color+1)+'Anim']();
							this.animSprite.name = 'anim';
							this._sprite.addChild(this.animSprite);
							this.animSprite.play();
							if (this.boosterPLine) {
								let bPLBody = Embeds.lineP();
								bPLBody.name = 'bPLBody';
								bPLBody.interactive  = false;
								bPLBody.interactiveChildren = false;
								this.animSprite.addChild(bPLBody);
							}
						} else{
							gemBody.isVisible = true;
							Handler.destroy(this.animSprite);
						}
					//gemBody.scaleX = val ? 0.6 : 0.5;
	    	    	//gemBody.scaleY = val ? 0.6 : 0.5;
	    			/*
	    			if ( this._selected ) {
	    	    		let mlBody1 = gemBody.getChildByName('molniya');// as Sprite;
	    	    		if ( mlBody1 ) gemBody.removeChild( mlBody1 );
	    	    	} else {
	    	    		let str = 'molniya' + Math.floor(this.color+1);
	    	    		let mlBody = Embeds[str]();
	    	    		mlBody.x = -6;
	    	    		mlBody.y = -5;
	    	    		mlBody.name = 'molniya';
	    	    		mlBody.interactive  = false;
	    	    		mlBody.interactiveChildren = false;
	    	    		gemBody.addChild( mlBody );
	    	    	};*/
	    	    	this._selected = val;
				}
	    	}
	    });//selected
//////////////////boosterPLine
	    Object.defineProperty( this, "boosterPLine", {
	        get: function(   ) { return this._boosterPLine; },
	        set: function(val) {    
                if ( this._boosterPLine != val ) {
	    			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
	    			if ( this._boosterPLine ) {
	    				let bPLBody1 = gemBody.getChildByName('bPLBody');// as Sprite;
	    				if ( bPLBody1 ) gemBody.removeChild( bPLBody1 );
						this.selected = val;
	    			} else {
	    				let bPLBody = Embeds.lineP();
	    				bPLBody.name = 'bPLBody';
	    				bPLBody.interactive  = false;
	    				bPLBody.interactiveChildren = false;
						
	    				gemBody.addChild( bPLBody );
	    			};
	    			this._boosterPLine = val;
	    		};
	    	}
	    });//boosterPLine
//////////////////boosterFrz		
	    Object.defineProperty( this, "boosterFrz", {
	        get: function(   ) { return this._boosterFrz; },
	        set: function(val) {    
                if ( this._boosterFrz != val) {
	    			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
	    			if ( this._boosterFrz ) {
	    				let bFZBody1 = gemBody.getChildByName('bFzBody');// as Sprite;
	    				if ( bFZBody1 ) gemBody.removeChild( bFZBody1 );
	    			} else {
	    				let bFZBody = Embed.CBoosterFrz();
	    				bFZBody.name = 'bFzBody';
						this.selected = false;
	    				//bFZBody.interactive  = false;
	    				//bFZBody.interactiveChildren = false;
	    				gemBody.addChild( bFZBody );
	    			};
	    			this._boosterFrz = val;
	    		};
	    	}
	    });//boosterFrz
//////////////////boosterGhost		
	    Object.defineProperty( this, "boosterGhost", {
	        get: function(   ) { return this._boosterGhost; },
	        set: function(val) {    
                if ( this._boosterGhost != val ) {
	    			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
	    			if ( this._boosterGhost ) {
	    				let bGHBody1 = gemBody.getChildByName('bGhBody');// as Sprite;
	    				if ( bGHBody1 ) gemBody.removeChild( bGHBody1 );
	    				this._boosterGhost = val;
	    			} else {
	    				//let bFZBody = Embeds.boosterFrz( this.color+1 );
//	    				this._sprite.addChild(bFZBody);
//						bFZBody.name = 'bGhBody';
//	    				bFZBody.interactive  = false;
//	    				bFZBody.interactiveChildren = false;
//						this._sprite.interactive = false;
//						this._sprite.interactiveChildren = false;
//						this.selected = false;
	    				//gemBody.addChild( bFZBody );
	    				this._boosterGhost = val;
	    				this.ghostAnimation();
	    			};
	    		};
	    	}
	    });//boosterGhost
	    
	    
//////////////////boosterGLine			
	    Object.defineProperty( this, "boosterGLine", {
	        get: function(   ) { return this._boosterGLine; },
	        set: function(val) {    
                if ( this._boosterGLine != val ) {
	    			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
	    			if ( this._boosterGLine ) {
	    				let bGLBody1 = gemBody.getChildByName('bGLBody');// as Sprite;
	    				if ( bGLBody1 ) gemBody.removeChild( bGLBody1 );
	    			} else {
	    				let bGLBody = Embed.CBoosterGLine();
	    				bGLBody.name = 'bVLBody';
	    				bGLBody.interactive  = false;
	    				bGLBody.interactiveChildren = false;
	    				gemBody.addChild( bGLBody );
	    			};
	    			this._boosterGLine = val;
	    		};
	    	}
	    });//boosterGLine	
//////////////////boosterVLine
	    Object.defineProperty( this, "boosterVLine", {
	        get: function(   ) { return this._boosterVLine; },
	        set: function(val) {    
                if ( this._boosterVLine != val ) {
	    			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
	    			if ( this._boosterVLine ) {
	    				let bVLBody1 = gemBody.getChildByName('bVLBody');// as MovieClip;
	    				if ( bVLBody1 ) gemBody.removeChild( bVLBody1 );
	    			} else {
	    				let bVLBody = Embed.CBoosterVLine();
	    				bVLBody.name = 'bVLBody';
	    				bVLBody.interactive  = false;
	    				bVLBody.interactiveChildren = false;
	    				gemBody.addChild( bVLBody );
	    			};
	    			this._boosterVLine = val;
	    		};
	    	}
	    });//boosterVLine
//////////////////boosterIron		
	    Object.defineProperty( this, "boosterIron", {
	        get: function(   ) { return this._boosterIron; },
	        set: function(val) {    
               if ( this._boosterIron != val ) {
	    			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
	    			let iron = gemBody.getChildByName('iron');// as Sprite;
	    
	    			iron.visible = val;
	    		
	    			this._boosterIron = val;
	    		};
	    	}
	    });//boosterIron
        //////////////////alpha	
	    Object.defineProperty( this, "alpha", {
	        get: function(   ) { return this._sprite.alpha; },
	        set: function(val) { this._sprite.alpha = val; }
	    });//alpha     
	    //////////////////name	
	    Object.defineProperty( this, "name", {
	        get: function(   ) { return this._sprite.name; },
	        set: function(val) { this._sprite.name = val; }
	    });//name    
	    //////////////////x		
	    Object.defineProperty( this, "x", {
	        get: function(   ) { return this._sprite.x; },
	        set: function(val) { this._sprite.x = val; }
	    });//x
	    //////////////////////y	
	    Object.defineProperty( this, "y", {
	        get: function(   ) { return this._sprite.y; },
	        set: function(val) { this._sprite.y = val; }
	    });//y
	    //////////////////////parent		
	    Object.defineProperty( this, "parent", {
	        get: function(   ) { return this._sprite.parent; },
	        set: function(val) { this._sprite.parent = val; }
	    });//parent
		Object.defineProperty( this, "visible", {
	        get: function(   ) { return this._sprite.isVisible; },
	        set: function(val) { this._sprite.isVisible = val; }
	    });//visible
	};
	
	CBox.prototype.onEL = function( evt, listener ) {
	   this._sprite.onEL( evt, listener );
	};
	CBox.prototype.drawRect = function ( i, j, fparent, fcolor = -1) {
		this.color = (fcolor == -1) ? Math.floor( Math.random()*this._colors.length ) : fcolor;
		this._sprite.self = this;
		this.name = 'cn'+this.cv(i)+''+this.cv(j);
		if ( this.color != Consts.STONE_COLOR && this.color != Consts.IRON_BOX ) {
			this.addChild( this.getGem( this.color ) );
		} else {
			let mcTmp = Embeds.Stone( null );
			mcTmp.gotoAndStop(0);
			mcTmp.width  = Consts.coordsWidth;
			mcTmp.height = Consts.coordsHeight;
			mcTmp.name = 'gemBody';
			this._sprite.addChild( mcTmp );
			this.boosterIron = false;
			if ( this.color == Consts.IRON_BOX ) {
				 this.color = Consts.STONE_COLOR;
				 this.boosterIron = true;
			};
		};
		this._sprite.x = i*(Consts.coordsWidth); 
		this._sprite.y = j*(Consts.coordsHeight);
		//this._sprite.width = fparent.width;
		//this._sprite.height = fparent.height;
		fparent.addChild(this._sprite);
		//Handler.jlines._animation2 = false;
	};
	
	CBox.prototype.ghostAnimation = function () {
		try {
			let self = this;
			let gemBody = this._sprite.getChildByName('gemBody');// as Sprite;
			if ( !this.boosterGhost ) {
				gemBody.alpha = 1;
				return;
			};
			
			/*let gf = new GlowFilter(0xffffff,1,6,6,2);
			if ( gemBody.filters[0] != null ) {
				gf = gemBody.filters[0];
			} else {
				gemBody.filters = [gf];
			};*/
			
			if ( gemBody.alpha < 1 ) {
				TweenMax.to(gemBody,1,{alpha:1.0, onComplete:function(){ self.ghostAnimation() } } );
			} else {
				TweenMax.to(gemBody,1,{alpha:0.5, onComplete:function(){ self.ghostAnimation() } } );
			};
		} catch ( ex ) {
			Handler.onErrorCatched(ex);
		};
	};
	
	CBox.prototype.getGem = function( color ) {
		let res; // type Sprite
		switch ( color ) {
			case 0: res = Embeds.gem01(); break;
			case 1: res = Embeds.gem02(); break;
			case 2: res = Embeds.gem03(); break;
			case 3: res = Embeds.gem04(); break;
			case 4: res = Embeds.gem05(); break;
			case Consts.COIN_COLOR:  res = Embeds.Coin();  break;
			case Consts.STONE_COLOR: res = Embeds.Stone(); break;
			case Consts.YASCHIK:     res = Embeds.yas4ik(); break;
		};
		if (res != null) {
			/*if ( color != this.YASCHIK ) {
				res.width  = Math.floor(Consts.w*0.9);
				res.height = Math.floor(Consts.h*0.9);
				res.x = Math.floor(Consts.h*0.05 + Math.floor(res.width/2));
				res.y = Math.floor(Consts.w*0.05 + Math.floor(res.height/2));
			} else {
				res.width  = Math.floor(Consts.w*1.75);
				res.height = Math.floor(Consts.h*1.55);
			};*/
			res.name = 'gemBody';
		};
		return res;
	};

	
	CBox.prototype.addChild = function ( fchild ) {
		this._sprite.addChild( fchild );
	};
	
	CBox.prototype.moveDown = function ( fj ) {
		let fi = Math.floor(this.name.substr(2,3));
		let delta = Math.abs( fj - (this.name.substr( 5, 3 ) ) );
		if (delta != 0) { 
			let krabrt = 1;
		};
		this.name = 'cn'+this.cv(fi)+''+this.cv(fj);
		TweenMax.to(this,this.TIME_SINGLE_MOVE*delta, {y: fj*(Consts.coordsHeight)} );
	};		
	
	CBox.prototype.cv = function ( val ) {
		if (val < -9) return ''+val;
		if (val <  0) return val+'.';
		return (val>9)? '0'+val: '00'+val;
	};
	
	CBox.prototype.removeGem = function ( withPoints = true ) {
		let self = this;
		let fi = Math.floor( this.name.substr(2,3) );
		let fj = Math.floor( this.name.substr(5,3) );
		if (Handler.jlines.hidedGems[fi][fj]) return false;
			
		this.boosterGLine = false;
		this.boosterVLine = false;
		let res = true;
		
		if ( this.color == Consts.YASCHIK ) {
			let mcYas4ik = Embeds.yas4ik1Parts(); 
			mcYas4ik.width  = Consts.coordsWidth;//w*1.75;
			mcYas4ik.height = Consts.coordsHeight;//h*1.55;
			mcYas4ik.x = this.x; mcYas4ik.y = this.y; 
			//Main.Instance.jewels.level.addChild( mcYas4ik );
			//Handler.lights.addChild( mcYas4ik );
			this.parent.addChild( mcYas4ik );
			JTweenJL.to( mcYas4ik.getChildByName('ya1Part1') );
			JTweenJL.to( mcYas4ik.getChildByName('ya1Part2') );
			JTweenJL.to( mcYas4ik.getChildByName('ya1Part3') );
			JTweenJL.to( mcYas4ik.getChildByName('ya1Part4') );
			JTweenJL.to( mcYas4ik.getChildByName('ya1Part5') );
			JTweenJL.to( mcYas4ik.getChildByName('ya1Part6') );
			self._delGemLight(this.x, this.y);
			if ( this.parent != null ) {
				this.parent.removeChild( this );	
			};
		} else { 
			if ( this.color == Consts.STONE_COLOR ) {
				let gemBodyMC = this._sprite.getChildByName('gemBody');
				if (gemBodyMC.currentFrame == 2) {
					let xc1 = Math.floor(gemBodyMC.width/2  + gemBodyMC.x);
					let yc1 = Math.floor(gemBodyMC.height/2 + gemBodyMC.y);
					TweenMax.to(gemBodyMC,0.05,{scaleX:0,scaleY:0,x:xc1,y:yc1, onComplete: function(){ self._delGemLight(xc1,yc1); }});
//					Handler.jlines.taskPanel.refrashGems( 8 );//g8
//					this._mcGemLight.addFrameScript(6,this._delGemLight);
//					this._mcGemLight.x = 20; this._mcGemLight.y = 20;				
//					this.addChild( this._mcGemLight );
//					Handler.lights.addChild(this);
//					this._mcGemLight.play();
				} else {
					gemBodyMC.gotoAndStop(gemBodyMC.currentFrame+1);
					res = false;
				}
			} else { 
				if ( this.boosterFrz ) {
					 this.boosterFrz = false; 
					 res = false;
				} else {
					//if (tmpBox.color != CBox.STONE_COLOR) _removeAroundStone(fi,fj);
					if (withPoints) Handler.jlines._removeAroundStone(fi,fj);
					if (withPoints) Handler.jlines._remGlass(fi,fj);
					let gemBody = this._sprite.getChildByName('gemBody');

//					let xc2 = Math.floor(gemBody.width/2  + gemBody.x);
//					let yc2 = Math.floor(gemBody.height/2 + gemBody.y);
//					TweenMax.to(gemBody,0.2,{scaleX:0,scaleY:0,x:xc2,y:yc2});
					TweenMax.to( gemBody,0.05,{ scaleX:0, scaleY:0, onComplete: function(){ self._delGemLight(fi,fj); } } );
			
//					this._mcGemLight.addFrameScript(6,this._delGemLight);
//					this._mcGemLight.x = 20; this._mcGemLight.y = 20;				
//					this.addChild( this._mcGemLight );
//					Handler.lights.addChild(this);
//					this._mcGemLight.play();
				};
			};
		};
		if ( res && !EndLevelAnimator.animation && withPoints ) {
			Handler.countScore += 8;//10;
			let fp = FlyPoints.init(fi+1,fj+1,8);
		};
		//Handler.jlines.timerHelpColor.plat
		return res;
	};
	
	/*let function normGem():void {
		let gemBody:Sprite = this.getChildByName('gemBody') as Sprite;
		gemBody.x = gemBody.y = 0;
		gemBody.scaleX = gemBody.scaleY = 1;
	}*/
	
	CBox.prototype._delGemLight = function ( fi, fj ) {
		try {
			if ( this._mcGemLight != null ) {
				this._mcGemLight.gotoAndStop(0);
			}
	//		if ( this._mcGemLight.parent != null ) {
	//			this._mcGemLight.parent.removeChild( this._mcGemLight );	
	//		};
			if (this.parent != null) {
				this.parent.removeChild(this._sprite);
			};
		} catch ( ex ) {
			Handler.onErrorCatched(ex);
		};
	};