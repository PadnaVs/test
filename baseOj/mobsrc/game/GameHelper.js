		
	"use strict";
	
	let GameHelper = {};
	
	GameHelper._timerHelpTick = function ( evt = null ) {
		if ( Handler.jlines._animation2 ) return;
		try {
			this.rndBoxColForHelpTimer = Math.floor(Math.random()*5);
			this.rndBoxColForHelpTimer = (this.rndBoxColForHelpTimer > 4 || this.rndBoxColForHelpTimer < 0)? 4: this.rndBoxColForHelpTimer;
			
			let finded = false;
			
			this.pole = []; 
			let cb1, cb2, cb3;
			for ( let i=0; i<Handler.jlines.cx; i++) {
				if ( this.pole[i] == null) this.pole[i] = [];
				for ( let j=0; j<Handler.jlines.cy; j++) {
					let cbox = Handler.jlines.getBox( i, j );
					this.pole[i][j] = (cbox != null) ? cbox.color : 0; 
				};
			};
			//perviy kvadrat //[0,4] - [7,10]
			let cbox3 = false;
			for ( let i=0; i<=4; i++ ) {
				for ( let j=7; j<Handler.jlines.cy; j++) {
					if ( this.checkTripl( this.pole, i, j ) > 0 ) {
						cbox3 = true;
						i=5; j=Handler.jlines.cy;//break from cicles
					};
				};
			};
			if ( !cbox3 ) {//nujno dobavit triline
			    finded = false; 
				if ( Math.random() > 0.5 ) {
					for ( let i=4; i>=0; i-- ) {
						finded = this.cicleJ(i);
						if ( finded ) break;
					};//endfori
				} else {
					for ( let i=0; i<=4; i++) {
						finded = this.cicleJ(i);
						if (finded) break;
					};//endfori
				};
				let starti = (finded)? 5: 0;
				for ( let i=starti; i<=4; i++ ) {
					for ( let j=Handler.jlines.cy-1; j<=7; j-- ) {
						let res2 = this.checkTriplWithoutHided( i, j ); 
						if ( res2 == 2 ) {//vertikal
							this.tweenHideShowCBox( i, j+0 );
							this.tweenHideShowCBox( i, j+1 );
							this.tweenHideShowCBox( i, j+2 );
							i = 5; j = 6; //break from cicles
						};
					};//endforj
				};//endfori
			};//endif
			cbox3 = false;
			//vtoroy kvadrat // [5,7] - [8,10]
			for ( let i=5; i<Handler.jlines.cx; i++ ) {
				for ( let j=7; j<Handler.jlines.cy; j++) {
					if ( this.checkTripl( this.pole, i, j ) > 0 ) {
						cbox3 = true;
						i=Handler.jlines.cx; j=Handler.jlines.cy;//break from cicles
					};
				};
			};
			if ( !cbox3 ) {//nujno dobavit triline
				finded = false;
				if ( Math.random() > 0.5 ) {
					for ( let i=Handler.jlines.cx-1; i>=5; i-- ) {
						finded = this.cicleJ(i).f;
						if (finded) break;
					};//endfori
				} else {
					for ( let i=5; i<Handler.jlines.cx; i++) {
						finded = this.cicleJ(i).f;
						if (finded) break;
					};//endfori						
				};
				let finishi = (finded) ? Handler.jlines.cx : 5;
				for ( let i=Handler.jlines.cx-1; i>=finishi; i-- ) {
					for ( let j=Handler.jlines.cy-1; j>=7; j-- ) {
						let res4 = this.checkTriplWithoutHided( i, j ); 							
						if ( res4 == 2 ) {//vertikal
							this.tweenHideShowCBox( i, j+0 );
							this.tweenHideShowCBox( i, j+1 );
							this.tweenHideShowCBox( i, j+2 );
							i = finishi-1; j = 6; //break from cicles
						};
					};//endforj
				};//endfori
			};//endif
		} catch (ex) {
			Handler.onErrorCatched(ex);
		};/*???*/
	};
	
	GameHelper.tweenHideShowCBox = function ( fi, fj ) {
		let self = this;
		Handler.jlines._animation2 = true;
		let cb = Handler.jlines.getBox(fi,fj);
		if (cb == null) return;
		let nx = Math.floor(cb.x + cb.width / 2);
		let ny = Math.floor(cb.y + cb.height / 2);
		TweenMax.to( cb._sprite,0.5,{ x:nx, y:ny, scaleX:0.2, scaleY:0.2, onComplete: function() { self.tweenHSCBComp( cb, fi, fj ) } } );
	};
	
	GameHelper.tweenHSCBComp = function ( cb, fi, fj ) {
		try {
			let self = this;
			if ( cb == null ) return;
			cb.removeGem( false );
			Handler.jlines.addNewBox( fi, fj, this.rndBoxColForHelpTimer );
			Handler.jlines._animation2 = false;
		} catch ( ex ) {
			Handler.onErrorCatched(ex);
		};
	};
	
	GameHelper.checkTriplWithoutHided = function ( fi, fj ) {
		let isNotSimpleBox = function ( zi, zj ) {
			let tb = Handler.jlines.getBox(zi,zj);
			
			if ( tb == null ) return false;
			return  ( tb.color == Consts.STONE_COLOR || tb.color == Consts.COIN_COLOR || tb.boosterGhost == true );
			
			//return ( tb != null && tb.color == Consts.STONE_COLOR);
		}
		let res = 0, p = Handler.jlines.hidedGems;
		if ( fj+2 < Handler.jlines.cy ) {//vertikal
			if ( Math.max(p[fi][fj], p[fi][fj+1], p[fi][fj+2] ) == 0 ) {
				if ( !isNotSimpleBox(fi,fj) && !isNotSimpleBox(fi,fj+1) && !isNotSimpleBox(fi,fj+2) ) {
					res = 2;
				};
			};
		};
		if ( fi+2 < Handler.jlines.cx ) {//gorizontal
			if ( Math.max( p[fi][fj], p[fi+1][fj], p[fi+2][fj] ) == 0 ) {
				if ( !isNotSimpleBox(fi,fj) && !isNotSimpleBox(fi+1,fj) && !isNotSimpleBox(fi+2,fj) ) {
					res = 1;
				};
			};
		};
		return res;
	};
	
	GameHelper.checkTripl = function ( fpole, fi, fj ) {
		let check = function ( n1, n2, n3 ) {
			return ( Math.max(n1,n2,n3) == Math.min( n1, n2, n3 ) && n1 != Consts.STONE_COLOR ); 
		};
		let res = 0, p = fpole, hg = Handler.jlines.hidedGems;
		if ( fi+2 < Handler.jlines.cx ) {//gorizontal
			if ( check( p[fi][fj], p[fi+1][fj], p[fi+2][fj] ) ) {
				if ( !hg[fi][fj] && !hg[fi+1][fj] && !hg[fi+2][fj] ) res = 1;
			};
		};
		if ( fj+2 < Handler.jlines.cy ) {//vertikal
			if ( check( p[fi][fj], p[fi][fj+1], p[fi][fj+2] ) ) {
				if ( !hg[fi][fj] && !hg[fi][fj+1] && !hg[fi][fj+2] ) res = 2;
			};
		};
		if ( fi+1 < Handler.jlines.cx && fj+1 < Handler.jlines.cy ) {
			if ( check( p[fi][fj], p[fi][fj+1], p[fi+1][fj] ) ) {//ugol1
				if ( !hg[fi][fj] && !hg[fi][fj+1] && !hg[fi+1][fj] ) res = 3;
			};
			if ( check(p[fi][fj],p[fi+1][fj],p[fi+1][fj+1]) ) {//ugol2
				if ( !hg[fi][fj] && !hg[fi+1][fj] && !hg[fi+1][fj+1] ) res = 4;
			};
			if ( check(p[fi+1][fj],p[fi+1][fj+1],p[fi][fj+1]) ) {//ugol3
				if ( !hg[fi+1][fj] && !hg[fi+1][fj+1] && !hg[fi][fj+1] ) res = 5;
			};
			if ( check(p[fi][fj],p[fi][fj+1],p[fi+1][fj+1]) ) {//ugol4
				if ( !hg[fi][fj] && !hg[fi][fj+1] && !hg[fi+1][fj+1] ) res = 6;
			};			
		};
		return res;
	};
	
	GameHelper.cicleJ = function ( fi ) {
		let ffinder = false; 
		for ( let j =Handler.jlines.cy-1; j >= 7; j--) {
			if ( this.checkTriplWithoutHided( fi, j ) == 1 ) {//gorizontal
				this.tweenHideShowCBox( fi+0, j );
				this.tweenHideShowCBox( fi+1, j );
				this.tweenHideShowCBox( fi+2, j );
				ffinder = true;
				break;
			};
		};//endforj
		return ffinder;
	};
	
	GameHelper.init = function(){
		let self = this;
		//this.timer = setInterval( function( self ) { self._timerHelpTick(); }, 4000, self );
		return this;
	};
	
	GameHelper.stop = function(){
		clearTimeout(this.timer);
	};