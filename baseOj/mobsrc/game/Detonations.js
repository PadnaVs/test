	
	"use strict";
	
	let Detonations = {};
	Detonations._mcPLighting;
	Detonations._mcVLighting;
	Detonations._mcGLighting;
	/*
	[Embed(source = 'embeds/gems.swf', symbol = 'vlighting')]
	let static let VLighting:Class;
	[Embed(source = 'embeds/gems.swf', symbol = 'glighting')]
	let static let GLighting:Class;		
	[Embed(source = 'embeds/gems.swf', symbol = 'plighting')]
	let static let PLighting:Class;	*/

	Detonations.pLineDetonate =  function ( fi, fj ) {
		Sounds.playLight4();
		if (this._mcPLighting== null) {
			this._mcPLighting = Embed.PLighting();
			this._mcPLighting.addFrameScript(2,this._delPLighting); 
		};
		
		this._mcPLighting.x = (CBox.h+CBox.sh)*fi-CBox.w/3;//Handler.indexXToCoords(fi)+20;
		this._mcPLighting.y = (CBox.w+CBox.sh)*fj-CBox.h/3;//Handler.indexYToCoords(0);
		
		//this._mcPLighting.height = (CBox.h+CBox.sh)*test.cy;
		Handler.lights.addChild(this._mcPLighting);
		this._mcPLighting.play();	
	};
	Detonations._delPLighting = function () {
		this._mcPLighting.stop();
		if (this._mcPLighting.parent != null) {
			this._mcPLighting.parent.removeChild(this._mcPLighting);	
		};
	};
	Detonations.vLineDetonate =  function ( fi ) {
		Sounds.playLight4();
		if (this._mcVLighting== null) {
			this._mcVLighting = Embed.VLighting();
			this._mcVLighting.addFrameScript(2,this._delVLighting);
		};
		//TweenLite.to(new Sprite(),0.2,{onComplete:this._delVLighting});
		
		this._mcVLighting.x = (CBox.h+CBox.sh)*fi+2*CBox.w/3;//Handler.indexXToCoords(fi)+20;
		this._mcVLighting.y = 0;//Handler.indexYToCoords(0);
		
		this._mcVLighting.height = (CBox.h+CBox.sh)*Handler.cy;
		Handler.lights.addChild(this._mcVLighting);
		this._mcVLighting.play();
		
		//_getBox(fi,fj).boosterVLine = false;
		
		//remGemWithVline(fi);
	};		
	Detonations._delVLighting = function () {
//		this._mcVLighting.stop();
//		if (this._mcVLighting.parent != null) {
//			this._mcVLighting.parent.removeChild(this._mcVLighting);	
//		};
	};/*
	let function remGemWithVline(fi:int):void {
	for (let j:int=0;j<test.cy;j++) {
	let tmpGem:CBox = _getBox(fi,j);
	if  (tmpGem != null) tmpGem.removeGem();
	}
	}
	let function _getBox(fi,fj):CBox {
	return test.Instance.getBox(fi,fj);
	}*/
	Detonations.gLineDetonate = function ( fj ) {
		Sounds.playLight4();
		if (this._mcGLighting == null) {
			this._mcGLighting = Embed.GLighting();
			this._mcGLighting.addFrameScript(2,this._delGLighting);
		};
		//TweenLite.to(new Sprite(),0.2,{onComplete:this._delGLighting});
		
		this._mcGLighting.x = 0;//Handler.indexXToCoords(0);
		this._mcGLighting.y = (CBox.w+CBox.sh)*fj-5*CBox.h/3;//Handler.indexYToCoords(fj)-90; 
		
		this._mcGLighting.width = (CBox.w+CBox.sh)*Handler.cx;//Handler.coordsWidth*Main.Instance.jewels.w;
		Handler.lights.addChild(this._mcGLighting);
		this._mcGLighting.play();
		
		//_getGem(fi,fj).boosterGLine = false;
		
		//remGemWithGline(fj);
	};
	Detonations._delGLighting = function () {
		this._mcGLighting.stop();
		if (this._mcGLighting.parent != null) {
			this._mcGLighting.parent.removeChild(this._mcGLighting);	
		};
	};
	Detonations.detonateBomb = function ( fi, fj, fcb ) {
		if (fcb.countBombs >= 10) {
			this.detonate10(fi,fj);
		} else {
			if (fcb.countBombs >= 9) {
				this.detonate9(fi,fj);
			} else {
				if (fcb.countBombs >= 8) {
					this.detonate8(fi,fj);
				} else {
					if (fcb.countBombs >= 7) {
						this.detonate7(fi,fj);
					} else {
						if (fcb.countBombs >= 6) {
							this.detonate6(fi,fj);
						} else {
							if (fcb.countBombs >= 5) {
								this.detonate5(fi,fj);
							};
						};
					};
				};
			};
		};
	};
	Detonations.detonate5 = function ( fi, fj ) {
		let indexes = [[fi,fj],[fi,fj-1],[fi+1,fj-1],
			[fi+1,fj],[fi+1,fj+1],[fi,fj+1],[fi-1,fj+1],[fi-1,fj],[fi-1,fj-1]];
		this.detonateGems(indexes);
	};
	Detonations.detonate6 = function ( fi, fj ) {
		let indexes = [[fi,fj],[fi,fj-1],[fi+1,fj-1],[fi+1,fj],[fi+1,fj+1],[fi,fj+1],
			[fi-1,fj+1],[fi-1,fj],[fi-1,fj-1],[fi,fj-2],[fi,fj+2],[fi-2,fj],[fi+2,fj]];
		this.detonateGems(indexes);
	};
	Detonations.detonate7 = function ( fi, fj ) {
		let indexes = [[fi,fj],[fi,fj-1],[fi+1,fj-1],[fi+1,fj],[fi+1,fj+1],[fi,fj+1],
			[fi-1,fj+1],[fi-1,fj],[fi-1,fj-1],[fi,fj-2],[fi,fj+2],[fi-2,fj],[fi+2,fj],
			[fi-2,fj-2],[fi+2,fj+2],[fi-2,fj+2],[fi+2,fj-2]];
		this.detonateGems(indexes);
	};
	Detonations.detonate8 = function ( fi, fj ) {
		let indexes = [[fi,fj],[fi,fj-1],[fi+1,fj-1],[fi+1,fj],[fi+1,fj+1],[fi,fj+1],
			[fi-1,fj+1],[fi-1,fj],[fi-1,fj-1],[fi,fj-2],[fi,fj+2],[fi-2,fj],[fi+2,fj],
			[fi-2,fj-2],[fi+2,fj+2],[fi-2,fj+2],[fi+2,fj-2],
			[fi-1,fj-2],[fi+1,fj-2],[fi-1,fj+2],[fi+1,fj+2],
			[fi+2,fj-1],[fi+2,fj+1],[fi-2,fj+1],[fi-2,fj-1],];
		this.detonateGems(indexes);
	};	
	Detonations.detonate9 = function ( fi, fj ) {
		let indexes = [[fi,fj],
			[fi+0,fj-1],[fi+1,fj-1],[fi+1,fj],[fi+1,fj+1],[fi,fj+1],[fi-1,fj+1],[fi-1,fj],[fi-1,fj-1],//kvadrat
			[fi,fj-2],[fi,fj+2],[fi-2,fj],[fi+2,fj],//romb
			[fi-2,fj-2],[fi+2,fj+2],[fi-2,fj+2],[fi+2,fj-2],//snejinka
			
			[fi-1,fj-2],[fi+1,fj-2],[fi-1,fj+2],[fi+1,fj+2],
			[fi+2,fj-1],[fi+2,fj+1],[fi-2,fj+1],[fi-2,fj-1],//bolshoy kvadrat
			
			[fi,fj-3],[fi,fj+3],[fi-3,fj],[fi+3,fj],
			[fi-1,fj-3],[fi-1,fj+3],[fi+1,fj-3],[fi+1,fj+3],
			[fi-3,fj-1],[fi+3,fj-1],[fi-3,fj+1],[fi+3,fj+1]//bolshoy  romb
		];
		this.detonateGems(indexes);
	};
	Detonations.detonate10 = function ( fi, fj ) {
		let indexes = [[fi,fj],
			[fi+0,fj-1],[fi+1,fj-1],[fi+1,fj],[fi+1,fj+1],[fi,fj+1],[fi-1,fj+1],[fi-1,fj],[fi-1,fj-1],//kvadrat
			[fi,fj-2],[fi,fj+2],[fi-2,fj],[fi+2,fj],//romb
			[fi-2,fj-2],[fi+2,fj+2],[fi-2,fj+2],[fi+2,fj-2],//snejinka
			
			[fi-1,fj-2],[fi+1,fj-2],[fi-1,fj+2],[fi+1,fj+2],
			[fi+2,fj-1],[fi+2,fj+1],[fi-2,fj+1],[fi-2,fj-1],//bolshoy kvadrat
			
			[fi,fj-3],[fi,fj+3],[fi-3,fj],[fi+3,fj],
			[fi-1,fj-3],[fi-1,fj+3],[fi+1,fj-3],[fi+1,fj+3],
			[fi-3,fj-1],[fi+3,fj-1],[fi-3,fj+1],[fi+3,fj+1],//bolshoy  romb
			
			[fi-2,fj-3],[fi-2,fj+3],[fi+2,fj-3],[fi+2,fj+3],
			[fi-3,fj-2],[fi+3,fj-2],[fi-3,fj+2],[fi+3,fj+2]					
		];
		this.detonateGems(indexes);
	};
	Detonations.detonateGems = function ( findexes ) {
		Sounds.playElectro(); //let countDeletedGems:int = 0;
		for (let k =0; k<findexes.length; k++) {
			let tmpCB = Handler.jlines.getBox( findexes[k][0],findexes[k][1] );
			
			if ( tmpCB != null ) {
				if ( !Handler.jlines.hidedGems[findexes[k][0]][findexes[k][1]] ) {
					if ( [ Consts.COIN_COLOR, Consts.STONE_COLOR, Consts.YASCHIK ].indexOf(tmpCB.color) == -1 ) {
						
						Handler.jlines.taskPanel.refrashGems( tmpCB.color + 1 );
						tmpCB.selected = true;
						JTweenJL.to(tmpCB);//fly
						//countDeletedGems++;
					};
				} else {
					tmpCB.boosterPLine = false;
				};
			};
		};
		//Handler.flyPointsStart(findexes[0][0]+1,findexes[0][1]+1,countDeletedGems*8);
	};
	Detonations.removeCoins = function ( coins, fcallback ) {
		if ( coins == null ) return;
		//removing coins - array "coins"
		let fi, fj, z, tBox;
		for ( z=0; z<coins.length; z++) {
			fi = coins[z][0];
			fj = coins[z][1];
			tBox = coins[z][2];
			Handler.jlines.taskPanel.refrashGems( Consts.COIN_COLOR + 1, coins.length );
			if ( tBox != null ) tBox.removeGem(false);
			//animation 0.8 sec
		};
		if ( fcallback != null ) {
			setTimeout( function() { try {  fcallback(); } catch ( ex ) { Handler.onErrorCatched(ex); } }, 700  );
//			TweenLite.to(new Sprite(),0.8,{ onComplete:fcallback });
			//fcallback();
		};
	};//this.removeCoins

