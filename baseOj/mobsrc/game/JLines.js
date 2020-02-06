
	"use strict";

	let JLines = function( parent )  {
		let self = this;
		self.parent = parent;
		Handler.getBox = this.getBox;
		Handler.remGlass = this._remGlass;
		Handler.removeAroundStone = function(  fi, fj  ) { self._removeAroundStone(  fi, fj  ); };
		Handler.fillZeroAlreadyBreakedStone = function() { self._fillZeroAlreadyBreakedStone(); };

		this._animat = false;
		this.tweenTick = 0.2;

		this.gemsContainer = null;
		//this.gemsContainer.x = Consts.coordsShiftX;
		//this.gemsContainer.y = Consts.coordsShiftY;
		//console.log(this.gemsContainer);
		this._useMolot;

		this.cx = 0;
		this.cy = 0;

		this.hidedGems = [];
		this.bottomHiddedGems = [];

		//let openedGems:Array = [];

		this._gemBooms = [];

		this._countSteps;
		this._countPoints;
		this._tryStep;
		this.deltaSteps;
		this._maxPoints;

		this.gameFinished;

		this.pole  = [];
		this.boxes = [];
		this.box;
		this._coins = [];
		this._clicks = 0;
		this._goldCells = [];
		this._glassCells = [];
		this._clicked = false;
		this._alreadyBreaked = [];
		this._bestClickBox = null;
		this.timerHelpColor;

		this.rndBoxColForHelpTimer;

		////////////////////////countPoints
		Object.defineProperty( this, "countPoints", {
			get: function(   ) { return this._countPoints; },
			set: function(val) {
				this._countPoints = val;
				//let tFrame:uint = (uint(val*100/this._maxPoints) > 100)? 100 : Math.floor(val*100/this._maxPoints);
				//Handler.mcStarsLine.gotoAndStop(tFrame);


				//let selfWindGame:WindGame = Winds.getWind() as WindGame;
				//if (selfWindGame && selfWindGame.textSteps) selfWindGame.textSteps.text = this._countSteps+'';

			}
		});//countPoints
		////////////////////////countSteps
		Object.defineProperty( this, "countSteps", {
			get: function(   ) { return this._countSteps; },
			set: function(val) {
				this._countSteps = val;
				this.stepsPanel.showNumber(this._countSteps);
//				if ( val == 5 && Config.NETWORK == 'ok' ) {
//					Handler.showAct7Steps();
//				};
				//let selfWindGame:WindGame = Winds.getWind() as WindGame;
				//if (selfWindGame && selfWindGame.textSteps) selfWindGame.textSteps.text = this._countSteps+'';
				if ( Handler.textSteps != null ) Handler.textSteps.text = this._countSteps+'';
				if ( this._countSteps == 5 ) {
					if ( Handler.acAddStepsForInvite ) Handler.acAddStepsForInvite.shutdown();
					Actions.show( Actions.WIND_ACT_5_STEPS, self.parent );
				};
				/*if ( this._countSteps <= 0 && this.gameFinished != 1 ) {
					Winds.show( Winds.WIND_STEPS_LEFT );
				};*/
			}
		});//countSteps
	};

	JLines.prototype.onEL = function( evt, lisener ) {
		this.gemsContainer.onEL(evt, lisener);
	}

	JLines.prototype.reCreateTable = function( lev ){
		let lineWeight = [];
		for ( let i = 0; i < this.cx; i++ ) { 
			lineWeight[i] = 0; 
		}
		let countStone = 0;
		let countYaschik = 0;
		let levelWithYaschik = false;
		console.log(this.cx, this.cy);
		
		for ( let i=0; i < this.cx; i++ ) {
			for ( let j=0; j < this.cy; j++ ) {
				switch ( lev[i+5][j] ) {
					case Consts.COIN_COLOR        : lineWeight[i] = 100; break;
					case Consts.IRON_BOX          : lineWeight[i] += 3;  break;
					case Consts.STONE_COLOR: 
					    countStone ++;
					    if ( countStone % 3 != 0 || !levelWithYaschik ) lineWeight[i] += 3;
				    break;
					case Consts.GHOST_BOX        : lineWeight[i] += 3; break;
					case Consts.YASCHIK   : 
					    countYaschik ++;
					    if ( countYaschik % 3 != 0 ) lineWeight[i] += 1;
					    levelWithYaschik = true;
					break;
					case Consts.GLASS_BOX       : lineWeight[i] += 3; break;
					case Consts.GLASS_STONE_BOX : lineWeight[i] += 6; break;
				}

			}
		}
		
		for ( let i = 0; i <= this.cx-9; i++) {
			let numMinStroke = 0;
			let currentSize = 200;
			for( let i = 0; i < lineWeight.length; i++ ) {
				if ( currentSize > lineWeight[i] ) {
					currentSize = lineWeight[i];
					numMinStroke = i;
				}
			};
			this.cx -= 1;
			lev.splice( numMinStroke+5, 1 );
			lineWeight.splice( numMinStroke, 1 );
		};
		
		/*
		let countDelGlass = 0;
		let countDelGost = 0;
		let countDelStoun = 0;
		let countDelYaschiks = 0;
		
		for ( let i=0; i < this.cy; i++ ) {
			switch( lev[numMinStroke+5][i] ){
				case Consts.GLASS_BOX:       countDelGlass += 1;                     break;
				case Consts.GLASS_STONE_BOX: countDelStoun += 1; countDelGlass += 1; break;
				case Consts.STONE_COLOR:     countDelStoun += 1;                     break;
				case Consts.IRON_BOX:        countDelStoun += 1;                     break;
				case Consts.YASCHIK:         countDelYaschiks += 1;                  break;
				case Consts.GLASS_BOX:       countDelGlass += 1;                     break;
			}
		}
		console.log("Кол-во стекляшек: "   +countDelGlass+'\n',
					"Кол-во гостбоксов: "  +countDelGost+'\n',
					"Кол-во стоунбоксов: " +countDelStoun+'\n',
					"Кол-во ящиков: "     +countDelYaschiks+'\n'
					);
		*/
	};

	JLines.prototype.init = function ( lev ) {
		try {
			let self = this;
			EndLevelAnimator.animation = false;
			this.cx = lev[0];
			this.cy = lev[1];
			//console.log('lev',lev);
			if ( isMobile && this.cx >= 10 ) this.reCreateTable( lev );
			if ( this.cx > 9 ) {
				Handler.coordsShiftX = Handler.coordsWidth/2;
			} else {
				if ( this.cx < 9 ) {
					Handler.coordsShiftX = Handler.coordsWidth;
				} else {
					if (this.cx==9) {
						Handler.coordsShiftX = Handler.coordsWidth;
					};
				};
			};

			if ( this.cx>10 ) {
				Handler.coordsWidth  = 45;
				Handler.coordsHeight = 45;
			} else {
				Handler.coordsWidth  = 47;
				Handler.coordsHeight = 47;
			};
			Consts.w = Consts.coordsWidth;
			Consts.h = Consts.coordsHeight; //50
			//if (this.cy==9) 		Handler.coordsShiftY = Handler.coordsShiftY0 + Handler.coordsHeight/2;
			//else if (this.cy!=9) Handler.coordsShiftY = Handler.coordsShiftY0 + Handler.coordsHeight;

			this.countSteps 	= lev[2];
			this.countPoints	= lev[3];
			Handler.star1Points	= Math.floor(lev[3]);
			Handler.star2Points	= Math.floor(lev[3]*1.2);
			Handler.star3Points	= Math.floor(lev[3]*1.4);

			this.deltaSteps = (this.countSteps)? -1: 1;
			Handler.countEndTime = lev[4];

			this.gameFinished = 0;

			for ( let i=0; i<this.cx; i++) {
				if ( this.hidedGems[i]   == null ) this.hidedGems[i] = [];
				if ( this.bottomHiddedGems[i] == null ) this.bottomHiddedGems[i] = [];
				if ( this._goldCells[i]  == null ) this._goldCells[i] = [];
				if ( this._glassCells[i] == null ) this._glassCells[i] = [];
				//if (glassDBox[i] == null) glassDBox[i] = [];
				for ( let j=0; j<this.cy; j++ ) {
					this.hidedGems[i][j]  = lev[i+5][j] === 1 ?  1 : 0 ;
					this.bottomHiddedGems[i][j] = 0;
					this._goldCells[i][j] = this.hidedGems[i][j];
					this._glassCells[i][j] = 0;
					//glassDBox[i][j] = Math.floor(lev[i+5][j] == 4);
				};
				for (  let j=(this.cy-1); j>=0; j-- ) {
					if ( this.hidedGems[i][j] ) {
						this.bottomHiddedGems[i][j] = 1;
					} else {
						break;
					};
				};
			};
			let numLevel = parseInt( Head.levelName.substr(1) );//uint

	//		GameTypes.info[numLevel].g6 = 0;

			let withCoin = false;

			//lev[8][4] = CBox.GLASS_STONE_BOX;/**********************************/
			//lev[9][6] = CBox.GLASS_STONE_BOX;/**********************************/
			let countGhostBox = 0;
			let levelWithYaschik = false;
			let countYaschik = 0;
			let countStone = 0;
			if ( GameTypes.info[numLevel].g6 > 0 ) {
				GameTypes.info[numLevel].g6 = 0;
			}
			if ( GameTypes.info[numLevel].g7 > 0 ) {
				GameTypes.info[numLevel].g7 = 0;
			}
			if ( GameTypes.info[numLevel].g8 > 0 ) {
				GameTypes.info[numLevel].g8 = 0;
			}
			if ( GameTypes.info[numLevel].g9 > 0 ) {
				GameTypes.info[numLevel].g9 = 0;
			}
			for ( let i=0; i<this.cx; i++ ) {
				for ( let j=0; j<this.cy; j++ ) {
					if ( lev[i+5][j] == Consts.COIN_COLOR ) {
						this.addNewBox(i,j,Consts.COIN_COLOR);
						GameTypes.info[numLevel].g7 += 1;
						withCoin = true;
					} else {
						if ( lev[i+5][j] == Consts.IRON_BOX ) {
							this.addNewBox(i,j,Consts.IRON_BOX);
							GameTypes.info[numLevel].g8 += 1;
						} else {
							if ( lev[i+5][j] == Consts.STONE_COLOR ) {
								countStone ++;
							if ( countStone % 3 == 0 && levelWithYaschik ) {
								this.addNewBox(i,j);
							} else {
								this.addNewBox(i,j,Consts.STONE_COLOR);
								GameTypes.info[numLevel].g8 += 1;
							};

							} else {
								if ( lev[i+5][j] == Consts.GHOST_BOX ) {
									this.addNewBox(i,j);
							//		let gost = this.gemsContainer.getChildByName('cn'+this.cv(i)+this.cv(j));
									let gost = this.getBox(i,j);
									gost.boosterGhost = true;
									countGhostBox += 1;
								} else {
									if ( lev[i+5][j] == Consts.YASCHIK ) {
										countYaschik ++;
										if ( countYaschik % 3 == 0) {
											this.addNewBox(i,j);
										} else {
											this.addNewBox(i,j,Consts.YASCHIK);
										};
										levelWithYaschik = true;
										//(this.gemsContainer.getChildByName('cn'+cv(i)+cv(j)) as CBox).boosterFrz = true;
									} else {
										if ( lev[i+5][j] == Consts.GLASS_BOX ) {
											this._addGlassCell(i,j);
											this.addNewBox(i,j);
										}  else {
											if ( lev[i+5][j] == Consts.GLASS_STONE_BOX ) {
												this._addGlassCell(i,j);
												this.addNewBox(i,j,Consts.STONE_COLOR);
											} else {
												this.addNewBox(i,j);
											};
										};
									};
								};
							};
						};
					};
				};
			};

			if ( levelWithYaschik ) {
				this.countSteps += 10;
			} else {
				this.countSteps += 3;
			};

			if ( User.loseCount > 2 ) {
				//не прошли 3 раза уровень добавляем супер на поле
				this.countSteps += 15;
			};

			for ( let i=0;i<this.cx;i++) {
				for ( let j=0;j<this.cy;j++) {
					if ( this.hidedGems[i][j] && !this._upperHidedBox(i,j)) {
						this.getBox(i,j).alpha = 0;
					};
				};
			};

			if (Handler.levelNum == 1) {
				Tutorial.tutStep1Show();
			};
			if (Handler.levelNum == 2) {
				Tutorial.tutStep3Show();
			};
			if (Handler.levelNum == 3) {
				Tutorial.tutStep4Show();
			};
			if (Handler.levelNum == 4) {
				Tutorial.tutStep5Show();
			};
			//(this.gemsContainer.getChildByName('cn002003') as CBox).boosterIron = true;
			//(this.gemsContainer.getChildByName('cn002003') as CBox).boosterFrz = true;
			//(this.gemsContainer.getChildByName('cn002005') as CBox).boosterFrz = true;
			//(this.gemsContainer.getChildByName('cn002007') as CBox).boosterFrz = true;
			//(this.gemsContainer.getChildByName('cn004001') as CBox).boosterFrz = true;
			//(this.gemsContainer.getChildByName('cn004003') as CBox).boosterFrz = true;
			//(this.gemsContainer.getChildByName('cn004004') as CBox).boosterFrz = true;
			//(this.gemsContainer.getChildByName('cn004007') as CBox).boosterFrz = true;

			//(this.gemsContainer.getChildByName('cn001001') as CBox).boosterPLine = true;
			//(this.gemsContainer.getChildByName('cn001009') as CBox).boosterVLine = true;
			//(this.gemsContainer.getChildByName('cn005008') as CBox).boosterVLine = true;


			//_addGlassCell(6,7);
			//_addGlassCell(6,8);


			/*let sprites:Array = [];
			let noteTxt:String = 'Откройте все золотые клетки!';
			let tmpSprite1:Sprite = new Embeds.goldBox();
			tmpSprite1.x = 250; tmpSprite1.y = -130;
			tmpSprite1.filters = [new GlowFilter(0xffffff)];
			sprites[0] = tmpSprite1;
			if (withCoin) {
				noteTxt += '\n\n\n\nСпустите все монетки, ';
				noteTxt += '\nвниз игрового поля!';
				let tmpSprite2:Sprite = Embeds.getGemByNum(7);
				tmpSprite2.x = 200; tmpSprite2.y = 0;
				sprites[1] = tmpSprite2;
				tmpSprite2.filters = [new GlowFilter(0xffffff)];
			}*//*
			if (Head.instance.levelName == 'l251') {
				Winds.show(Winds.MSG,{m:	'\nНовинка - графитовый камень!' +
					'\nЕго нельзя двигать ' +
					'\nи на него не действуют молнии!' +
					'\n\nУберите соседние камни и он пропадёт!'})
			}
			if (Head.instance.levelName == 'l851') {
				let sprites2:Array = [];
				let tmpSprite3:Sprite = new Embeds.GlassDBox();
				tmpSprite3.x = 280; tmpSprite3.y = -130;
				tmpSprite3.filters = [new GlowFilter(0xffffff)];
				sprites2[0] = tmpSprite3;
				Winds.show(Winds.MSG,{m:	'\n\nНовинка - клетка двойного стекла!' +
					'\n\nСобери над ней камни и она' +
					'\nпревратится в стеклянную клетку!' +
					'\n\n', sprites:sprites2})
			}
			if (Head.instance.levelName == 'l1251') {
				let sprites3:Array = [];
				let tmpSprite4:Sprite = Embeds.getGemByNum(4);
				tmpSprite4.addChild(new Embeds.BoosterDualFrz());
				tmpSprite4.x = 280; tmpSprite4.y = -130;
				tmpSprite4.filters = [new GlowFilter(0xffffff)];
				sprites3[0] = tmpSprite4;
				Winds.show(Winds.MSG,{m:	'\n\nНовинка - ледяной камень!' +
					'\n\nЕго нельзя двигать' +
					'\nСобери над ним камни и он ' +
					'\nпревратится в замороженный камень!' +
					'\n\n', sprites:sprites3});
			}	*/
			//Winds.show(Winds.MSG_ZVER,{m:noteTxt, closeAfter5:true, sprites:sprites } );

			//_delFullLines(_afterDeleteGems);
	//		this.timerHelpColor = new Timer(3000,0);
	//		this.timerHelpColor.onEL( TimerEvent.TIMER, this._timerHelpTick );
	//		this.timerHelpColor.start();

			//refrash max count boosterGhost

			GameTypes.info[numLevel].g9 = countGhostBox;
			if (Handler.countGemsB[9] != null) {
				Handler.countGemsB[9].ctext.text = '0/'+Math.floor( GameTypes.info[numLevel]['g9'] ) ;
			};

	//		this.taskPanel.refrashGems(6,0);//init glass in task box

			Handler.windGameSprite.onEL( 'pointerup',   function( evt ) { self._onMouseUpGem(evt);   } );
			Handler.windGameSprite.onEL( 'pointerout',  function( evt ) { self._onMouseUpGem(evt);   } );
			self.gemsContainer    .onEL( "pointerdown", function( evt ) { self._onMouseDownGem(evt); } );
			self.gemsContainer    .onEL( "pointermove", function( evt ) { self._onMouseMoveGem(evt); } );

			this.timerHelpColor = GameHelper.init();
			this._fillZeroAlreadyBreakedStone();
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype.addNewBox = function ( fi, fj, fcolor = -1) {
		let tmpBox = new CBox();
		tmpBox.drawRect( fi, fj, this.gemsContainer, fcolor );//
		//tmpBox.onEL(MouseEvent.CLICK,_onClickBox);
//		tmpBox.onEL( 'pointerdown',	function(evt){console.lot('asd');} );
		let self = this;
//		tmpBox.onEL( 'pointerdown',	this._onMouseDownGem );
//		tmpBox.onEL( 'pointermove',	this._onMouseMoveGem );
//		tmpBox.onEL( 'pointerup',	this._onMouseUpGem);

		//tmpBox.buttonMode = true;
		return tmpBox;
	};

	Object.defineProperty( this, "_animation2", {
	    get: function(   ) { return this._animat; },
	    set: function(val) {
            Handler.txtNotes = this._animat+'_';
			this._animat = val;
		}
	});

	JLines.prototype._onMouseDownGem = function ( evt ) {
		try {
			let self = this;
			if (this._countSteps <= 0) return;
			if (this._animation2) return;
//			console.log("evt",evt.data.global.x,evt.data.global.y);
//			console.log("shScreenY",shScreenY);
//			console.log("gemsContainer x,y",this.gemsContainer.x,this.gemsContainer.y);
			let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			//let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			let gy = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
			//let gy = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
//			console.log(pixiApp.stage.scale.x);
			let tx = gx - Handler.gemsContainerGlobalX - Math.floor(Consts.coordsWidth/2);
			let ty = gy - Handler.gemsContainerGlobalY - Math.floor(Consts.coordsHeight/2);
			
			
	//		let kittenSize = 60*Handler.scaleOfGemsContainer;
			let fi = Math.ceil( tx / Consts.coordsWidth );//gorizontal number of cat on game field
			let fj = Math.ceil( ty / Consts.coordsHeight );//vertical   number of cat on game field
//			console.log( 'gx, gy ', gx, gy );
//			console.log( 'tx, ty ', tx, ty );
//			console.log( 'fi, fj ', fi, fj );

			let cbox = this.getBox(fi,fj);
			if ( cbox == null ) return;
			if ( cbox.color == Consts.STONE_COLOR ) return;
			if ( cbox.color == Consts.IRON_BOX ) return;
			if ( cbox.color == Consts.YASCHIK ) return;
			if ( Handler.selBooster == Consts.BPLINE ) {
				if ( cbox != null ) {
					Handler.decBooster( Handler.selBooster );
					Handler.selBooster = '';
					cbox.boosterPLine = true;
					cbox.countBombs = 5;
					this._afterDelBox();
				};
			} else {
				if ( Handler.selBooster == Consts.BVGLINE ) {
					if (cbox != null) {
						Handler.decBooster(Handler.selBooster);
						Handler.selBooster = '';
						cbox.boosterPLine = true;
						cbox.countBombs = 8;
						this._afterDelBox();
					};
				} else {
					if ( Handler.selBooster == Consts.BMOLOTOK ) {
						if (cbox != null) {
							Handler.decBooster(Handler.selBooster);
							Handler.selBooster = '';
							cbox.countBombs = 0;
							cbox.boosterPLine = false;
							cbox.removeGem();
							if (cbox.boosterGhost) this.taskPanel.refrashGems( 9 );//g9
							this.taskPanel.refrashGems( cbox.color + 1);
							setTimeout( function(){ self._afterDelBox(); }, 300);
	/*						setTimeout( function() {
														cbox.boosterPLine = false;
														cbox.removeGem();
														//
														self._afterDelBox();
													}, 500);*/
						//TweenMax.to(new Sprite(),0.5,{ onComplete:
						};
					} else {
						if( isMobile ) {
							if ( Tutorial.tutStepNum == 1  ) {
								Tutorial.animGr.isVisible = false;
							} else if( Tutorial.tutStepNum == 3  ) {
								Tutorial.animGr.isVisible = false;
							} else if( Tutorial.tutStepNum == 4  ) {
								Tutorial.animGr.isVisible = false;
							}
						}
						Handler.gemSel = true;
						Handler.gemObjectLine = [];
						Handler.gemLine = [];

						let i = Handler.coordsXToIndex(cbox.x);
						let j = Handler.coordsYToIndex(cbox.y);

						Handler.gemLine.push(this.cv(i)+'_'+this.cv(j));
						Handler.gemObjectLine.push(cbox);
	//					cbox.filters = [new GlowFilter(0xffffff)];
						cbox.selected = true;
						Sounds.playElectro();
					};
				};
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype._onMouseMoveGem = function ( evt ) {
		try {
			if ( this._countSteps <= 0 ) return;
			if ( !Handler.gemSel ) return;

			if (this._countSteps <= 0) return;
			if (this._animation2) return;
			//		if ( BonusMenu.isBonusAnimationPlay ) { return;	};
			let gx = Math.floor( evt.data.global.x / pixiApp.stage.scale.x );
			let gy = Math.floor( evt.data.global.y / pixiApp.stage.scale.y );
			let tx = gx - Handler.gemsContainerGlobalX - Math.floor(Consts.coordsWidth/2);
			let ty = gy - Handler.gemsContainerGlobalY - Math.floor(Consts.coordsHeight/2);
			//let kittenSize = 60*Handler.scaleOfGemsContainer;
			let fi = Math.ceil( tx / Consts.coordsWidth );//gorizontal number of cat on game field
			let fj = Math.ceil( ty / Consts.coordsHeight );//vertical   number of cat on game field
			
			if ( this.hidedGems[fi] == null || this.hidedGems[fi][fj] ) return;
			
			let cbox = this.getBox( fi, fj );
			if ( cbox == null ) return;
			
			let i = Handler.coordsXToIndex( cbox.x );
			let j = Handler.coordsYToIndex( cbox.y );
			if (cbox.color != Handler.gemObjectLine[0].color) 	return;//only same color
			if ( Handler.gemLine.indexOf( this.cv(i)+'_'+this.cv(j) ) < 0 ) {
				if ( this._isNeighborBox(i,j) ) {//only neighbor gem
					Handler.gemLine.push( this.cv(i)+'_'+this.cv(j) );
					Handler.gemObjectLine.push(cbox);
//					cbox.filters = [new GlowFilter(0xffffff)];
					cbox.selected = true;
				} else {
					let recursiveLine = null;
					let recPath = [];
					let lastSelCBox = Handler.gemObjectLine[Handler.gemObjectLine.length-1];
					// under mouse cbox
					// last selected Handler.gemObjectLine[Handler.gemObjectLine.length-1]
					// Handler.getBox(fi,fj).color


					let reci = Handler.coordsXToIndex(lastSelCBox.x);
					let recj = Handler.coordsYToIndex(lastSelCBox.y);
					//let recjs:String = '[]';
					let checkedPoint = [];
					for (let kki=0;kki<Handler.gemObjectLine.length-1;kki++) {
						let fkki = Handler.gemLine[kki].substr(0,3);
						let fkkj = Handler.gemLine[kki].substr(4,3);
						checkedPoint['_'+fkki+'_'+fkkj] = 1;
					};
					let self = this;
					let recursiveSearch = function (fi, fj, fcolor, fjpoints, fcheckedPoint ) {
						try {
							let fCBox =  self.getBox(fi,fj);
							if ( fCBox == null) return;
							if ( fCBox.color != fcolor ) return;
							if ( recursiveLine != null ) return;

							if ( fcheckedPoint['_'+self.cv(fi)+'_'+self.cv(fj)] != null ) return;

							fcheckedPoint['_'+self.cv(fi)+'_'+self.cv(fj)] = 1;
							let jpoints = fjpoints;//.slice(0);
							jpoints.push( [fi,fj] );
							if ( fi == i && fj == j ) {//searched
								recursiveLine = jpoints;
								//Winds.show( Winds.MSG,{m:AJSON.encode(jpoints)} );
								for ( let zz = 1; zz < recursiveLine.length; zz++ ) {
									let zzi = recursiveLine[zz][0];
									let zzj = recursiveLine[zz][1];
									let zzcbox = self.getBox( zzi, zzj );
									Handler.gemLine.push( self.cv(zzi)+'_'+self.cv(zzj) );
									Handler.gemObjectLine.push( zzcbox );
			//						zzcbox.filters = [new GlowFilter(0xffffff)];

									zzcbox.selected = true;
								};
								return;
							};
							recursiveSearch( fi-0, fj-1, fcolor, jpoints.slice(0), fcheckedPoint );
							//recursiveSearch( fi+1, fj-1, fcolor, jpoints.slice(0), fcheckedPoint );
							recursiveSearch( fi+1, fj+0, fcolor, jpoints.slice(0), fcheckedPoint );
							//recursiveSearch( fi+1, fj+1, fcolor, jpoints.slice(0), fcheckedPoint );
							recursiveSearch( fi+0, fj+1, fcolor, jpoints.slice(0), fcheckedPoint );
							//recursiveSearch( fi-1, fj+1, fcolor, jpoints.slice(0), fcheckedPoint );
							recursiveSearch( fi-1, fj+0, fcolor, jpoints.slice(0), fcheckedPoint );
							//recursiveSearch( fi-1, fj-1, fcolor, jpoints.slice(0), fcheckedPoint );
						} catch (err){};
					};//recursiveSearch
					recursiveSearch( reci, recj, lastSelCBox.color, [], checkedPoint );
				};
			} else {//return to selected gem
				let numi = Handler.gemLine.indexOf(this.cv(i)+'_'+this.cv(j));
				for ( let k = numi + 1; k < Handler.gemLine.length; k++ ) {
					cbox = Handler.gemObjectLine[k];
					cbox.filters = [];
					cbox.selected = false;
					//
					Handler.gemLine.splice( k, 1 );
					Handler.gemObjectLine.splice( k, 1 );
					
				};
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype._onMouseUpGem = function ( evt = null ) {
		try {
			let self = this;
			Sounds.stopElectro();
			if ( !Handler.gemSel ) return;
			Handler.gemSel = false;
			this._fillZeroAlreadyBreakedStone();
			if( isMobile ) {
				if ( Tutorial.tutStepNum == 1  ) {
					Tutorial.animGr.isVisible = true;
				} else if( Tutorial.tutStepNum == 3  ) {
					Tutorial.animGr.isVisible = true;
				} else if( Tutorial.tutStepNum == 4  ) {
					Tutorial.animGr.isVisible = true;
				}
			}
			//ACTION
			for ( let i =0; i<Handler.gemObjectLine.length; i++) {
				let cbox = Handler.gemObjectLine[i];
				cbox.filters = [];
				cbox.selected = false;
				if (Handler.gemLine.length > 4) {
					if ( Handler.levelNum == 3 && Tutorial.tutStepNum == 4 && Handler.gemLine.length == 5) {
						cbox.filters = [];
						cbox.selected = false;
					} else {
						if ( Handler.levelNum == 2 && Tutorial.tutStepNum == 3 ) {
							Tutorial.removeTuts();
						};
						if ( Handler.levelNum == 3 && Tutorial.tutStepNum == 4 ) {
							Tutorial.removeTuts();
						};
						this._clicked = true;
						if ( i < ( Handler.gemObjectLine.length-1 ) ) {
							cbox.removeGem();
							//_remGlass(cbox);
							if ( cbox.boosterGhost ) this.taskPanel.refrashGems( 9 );//g9
							this.taskPanel.refrashGems( cbox.color+1 );
						} else {
							cbox.boosterPLine = true;
							cbox.countBombs = Handler.gemLine.length;
						};
					};
				} else {
					if (Handler.gemLine.length > 2) {
						if ( Handler.levelNum == 1 && Tutorial.tutStepNum == 1 ) {
							Tutorial.removeTuts();
							Tutorial.tutStep2Show();
						}
						if ( Handler.levelNum == 2 && Tutorial.tutStepNum == 3 ||
							Handler.levelNum == 3 && Tutorial.tutStepNum == 4 ) {
							cbox.filters = [];
							cbox.selected = false;
						} else {
							this._clicked = true;
							cbox.removeGem();
							//_remGlass(cbox);
							if (cbox.boosterGhost) this.taskPanel.refrashGems( 9 );//g9
							this.taskPanel.refrashGems( cbox.color+1 );
						};
					};
				};
			};
			/*if (Handler.gemLine.length > 4) {
				let cbi:int = Handler.coordsXToIndex(cbox.x);
				let cbj:int = Handler.coordsYToIndex(cbox.y);
				Detonations.detonate5( cbi, cbj, _afterDelBox );
			} else*/ if (Handler.gemLine.length > 2) {
				setTimeout( function(){ self._afterDelBox(); } , 151);
	//			TweenMax.to(new Sprite(),0.1,{onComplete:_afterDelBox});
			};
			Handler.gemLine = [];
			Handler.gemObjectLine = [];
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype._getBombs = function () {
		let res = [];
		for ( let i=0; i< this.cx; i++ ) {
			for ( let j=0; j<this.cy; j++) {
				let  tmpBox = this.getBox( i, j );
				if ( tmpBox != null && tmpBox.boosterPLine ) res.push([ i, j, tmpBox ]);
			};
		};
		return res;
	};

	JLines.prototype._afterDelBox = function() {
		try {
		    this._animation2 = true;
		    this._fillPoleArray();
		    this._shiftOldBoxes();
		    this.addNewBoxes();
		    this._fillZeroAlreadyBreakedStone();
		    this._searchAndRemoveCoins();
		} catch ( ex ) {
			Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype._searchAndRemoveCoins = function() {
		let i, j, coinsSearched = false;
		let coinsForRemove = [];
		let self = this;
		for ( i=0; i<this.cx; i++ ) {
			for ( j=8; j<this.cy; j++ ) {
				let tBox = this.getBox( i, j );
				if ( tBox != null ) {
					if ( tBox.color == Consts.COIN_COLOR ) {
						coinsSearched = true;
						coinsForRemove.push( [ i, j, tBox ] );
					};
				};
			};
		};

		if ( coinsSearched ) {
			let searched = function () {
				try {
					//self.taskPanel.refrashGems( Consts.COIN_COLOR + 1, coinsForRemove.length );//g7
					Detonations.removeCoins(coinsForRemove, function() { self._afterDelBox(); });
				} catch ( ex ) {
					Handler.onErrorCatched(ex);
				};
			};
			setTimeout( searched, 800 );
//			TweenMax.to(new Sprite(),0.8,{onComplete:
		} else {
			self.checkBombs();
//			TweenMax.to(new Sprite(),0.8,{onComplete:this.checkBombs});
		};
	};

	JLines.prototype.checkBombs = function() {
		try {
			let bombs = this._getBombs();
			let self = this;
			if ( bombs.length > 0 ) {
				let delBomb = function() {
					for ( let i =0;i<bombs.length; i++ ) {
						Detonations.detonateBomb( bombs[i][0], bombs[i][1], bombs[i][2]  );
					}
					setTimeout( function(){ self._afterDelBox(); }, 1300 );
					//TweenMax.to(new Sprite(),1.3,{onComplete:this._afterDelBox});
				}
				setTimeout( delBomb, 1100 );
			} else {
				//_refrashField();
				this._animation2 = false;
				this.checkEndGame();
				if ( this.gameFinished == 0 ) {
					setTimeout( function(){ self._needMixing(); }, 1000 );
					//TweenMax.to(new Sprite(),1,{onComplete:this._needMixing});
					
					if ( this._countSteps <= 0 ) {
					    Winds.show( Winds.WIND_STEPS_LEFT );
				    };
				};
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype._isNeighborBox = function ( fi1, fj1 ) {
		let lBox = Handler.gemObjectLine[ Handler.gemObjectLine.length-1 ];
		let fi2 = Handler.coordsXToIndex( lBox.x );
		let fj2 = Handler.coordsYToIndex( lBox.y );
		let res = Math.abs(fi1-fi2) < 2 && fj1 == fj2;
		res = res || Math.abs(fj1-fj2) < 2 && fi1 == fi2;
		return res;
	};

	JLines.prototype._remGlass = function( i, j ) {
		if ( this._glassCells[i][j] == 0 ) return;

		let glassCell = Handler.level.getChildByName('gc'+this.cv(i)+'_'+this.cv(j));
//		Handler.level.removeChild( glassCell );
		this.taskPanel.refrashGems( 6 );//g6
		JTweenJL.to( glassCell );
		this._glassCells[i][j] = 0;
	};

	/*let function _onClickBox(evt):void {
		//Winds.show(Winds.MSG,{m:'click'}); return;
		if (_animation) return;
		//_showBestClick();
		boxes = [];
		this.box = e.target as CBox;
		if (!Tutorial.checkClickStep2PLine(this.box.boosterPLine)) {
			let sprites:Array = [];
			let noteTxt:String = '\n\Пожалуйста \n' +
				'кликните по бомбе! ';
			let cont:Sprite = new Sprite();
			let tmpBox:CBox = new CBox();
			tmpBox.drawRect(0,0,cont,3);
			tmpBox.boosterPLine = true;

			cont.x = 250; cont.y = -80;
			sprites[0] = cont;
			Winds.show(Winds.MSG_ZVER,{m:noteTxt, closeAfter5:true, sprites:sprites } );
			return;
		}

		if (this.box != null && this.box.color == CBox.STONE_COLOR) return;
		if (this.box != null && this.box.color == CBox.COIN_COLOR) return;
		if (this.box != null && this.box.boosterFrz && Handler.selBooster != Handler.BMOLOTOK) return;

		if ( Handler.selBooster == Handler.BVLINE) {
			if (this.box != null) this.box.boosterVLine = true;
			Handler.decBooster(Handler.selBooster);
			Handler.selBooster = 0;
		} else if ( Handler.selBooster == Handler.BGLINE) {
			if (this.box != null) this.box.boosterGLine = true;
			Handler.decBooster(Handler.selBooster);
			Handler.selBooster = 0;
		} else if ( Handler.selBooster == Handler.BPLINE) {
			if (this.box != null) this.box.boosterPLine = true;
			Handler.decBooster(Handler.selBooster);
			Handler.selBooster = 0;
		} else if ( Handler.selBooster == Handler.BVGLINE) {
			if (this.box != null) this.box.boosterVLine = true;
			if (this.box != null) this.box.boosterGLine = true;
			Handler.decBooster(Handler.selBooster);
			Handler.selBooster = 0;
		} else if ( Handler.selBooster == Handler.BMIX) {
			Handler.decBooster(Handler.selBooster);
			Handler.selBooster = 0;
			_mixingGems();
		} else {
			//this._clicks ++;
			if (Handler.selBooster != Handler.BMOLOTOK) this._clicked = true;
			_animation = true;
			_fillPoleArray();
			if ( this.box != null && (this.box.boosterGLine || this.box.boosterVLine || this.box.boosterPLine) ) {
				if (this.box.boosterGLine && this.box.boosterVLine) removeVGLine( Math.floor(this.box.name.substr(2,3)),Math.floor(this.box.name.substr(5,3)) );
				else if (this.box.boosterGLine) removeGLine( Math.floor(this.box.name.substr(5,3)) );
				else if (this.box.boosterVLine) removeVLine( Math.floor(this.box.name.substr(2,3)) );
				else if (this.box.boosterPLine) removePLine( Math.floor(this.box.name.substr(2,3)),Math.floor(this.box.name.substr(5,3)) );

				this.box.removeGem();
				_shiftOldBoxes();
				addNewBoxes();
			} else {
				_addBoxes( Math.floor(this.box.name.substr(2,3)), Math.floor(this.box.name.substr(5,3)), this.box.color, hideBoxes);
			}
		}
	}*/

	JLines.prototype._addBoxes = function( i, j, gcol, callback=null ) {
		let eq1 = this.pole[i] != null && this.pole[i][j] != null && this.pole[i][j] == gcol;
		if ( eq1 ) {
			let eq2 = [ Consts.YASCHIK,Consts.COIN_COLOR,Consts.STONE_COLOR ].indexOf(this.pole[i][j]) < 0;
			if ( eq2 && !this.hidedOrGhost( i, j ) ) {
				if ( this.boxes.indexOf( this.cv(i)+'_'+this.cv(j) ) == -1 ) {
					this.boxes.push( this.cv(i)+'_'+this.cv(j) );
					this._addBoxes(i+0,j-1,gcol);
					this._addBoxes(i+1,j+0,gcol);
					this._addBoxes(i+0,j+1,gcol);
					this._addBoxes(i-1,j+0,gcol);
				};
			};
		};
		if (callback != null) callback();
	};

	JLines.prototype.hideBoxes = function() {
		//Tutorial.removeTuts();
		if ( this.boxes.length < 3 && Handler.selBooster != Handler.BMOLOTOK ) {
			Sounds.playGemBack();
			return;
		};
		Sounds.playClick();
		if ( Handler.selBooster == Handler.BMOLOTOK ) {
			this.boxes = [this.boxes[0]];
			Handler.decBooster(Handler.selBooster);
			Handler.selBooster = 0;
		};
		this._fillZeroAlreadyBreakedStone();
		for (let i=0; i<this.boxes.length; i++ ) {
			let fi = Math.floor( this.boxes[i].substr(0,3) );
			let fj = Math.floor(this.boxes[i].substr(4,3));
			let tb = this.getBox(fi,fj );
			if ( tb ) {
				if ( !tb.boosterFrz ) this._addGoldCell( fi, fj );
				if ( tb.boosterGLine && tb.boosterVLine ) {
					this.removeVGLine( Math.floor(tb.name.substr(2,3)),Math.floor(tb.name.substr(5,3)) );
				} else {
					if (tb.boosterGLine) {
						this.removeGLine( Math.floor(tb.name.substr(5,3)) );
					} else {
						if (tb.boosterVLine) {
							removeVLine( Math.floor(tb.name.substr(2,3)) );
						}else {
							if (tb.boosterPLine) {
								this.removePLine( Math.floor(tb.name.substr(2,3)),Math.floor(tb.name.substr(5,3)) );
							};
						};
					};
				};
				if ( tb.removeGem() ) this.pole[fi][fj] = -2;
				if ( tb.color != Consts.STONE_COLOR && tb.color != Consts.YASCHIK ) this._removeAroundStone(fi,fj);
			};
			//this.pole[fi][fj] = -2;
		};
		this.addLighting();
		this._shiftOldBoxes();
		this.addNewBoxes();
	};

	JLines.prototype.removeVGLine = function( fi, fj ) {
		this._fillZeroAlreadyBreakedStone();
		let vLights = [];
		Detonations.vLineDetonate(fi);
		for ( let ri=0; ri<this.cx; ri++) {
			let tmpBox = this.getBox(ri,fj);
			if ( tmpBox != null && tmpBox.color == Consts.STONE_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.COIN_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.YASCHIK ) continue;
			if ( tmpBox != null && tmpBox.boosterVLine ) vLights.push( ri );//removeVLine(ri);
			if ( tmpBox != null && tmpBox.removeGem() ) {
				this.pole[ri][fj] = -1;
				this._addGoldCell(ri,fj);
				this._removeAroundStone(ri,fj);
			};
		};
		for ( let ti =0; ti<vLights.length; ti++ ) {
			removeVLine(vLights[ti]);
		};
		let gLights = [];
		Detonations.gLineDetonate(fj);
		for (let rj =0; rj<this.cy; rj++) {
			tmpBox = this.getBox(fi,rj);
			if ( tmpBox != null && tmpBox.color == Consts.STONE_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.COIN_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.YASCHIK ) continue;
			if ( tmpBox != null && tmpBox.boosterGLine ) gLights.push( rj );//removeGLine(rj);
			if ( tmpBox != null && tmpBox.removeGem() ) {
				this.pole[fi][rj] = -1;
				this._addGoldCell(fi,rj);
				this._removeAroundStone(fi,rj);
			};
		};
		for ( ti=0; ti<gLights.length; ti++) {
			this.removeGLine(gLights[ti]);
		};
	};

	JLines.prototype.removeGLine = function ( fj ) {
		let vLights = []; let pLights = [];
		Detonations.gLineDetonate(fj);
		this._fillZeroAlreadyBreakedStone();
		for ( let ri=0; ri< this.cx; ri++ ) {
			let tmpBox = this.getBox(ri,fj);
			if ( tmpBox != null && tmpBox.color == Consts.STONE_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.COIN_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.YASCHIK ) continue;
			if ( tmpBox != null && tmpBox.boosterPLine ) pLights.push( [ri,fj] );
			if ( tmpBox != null && tmpBox.boosterVLine ) vLights.push( ri );//removeVLine(ri);
			if ( tmpBox != null && tmpBox.removeGem() ) {
				this.pole[ri][fj] = -1;
				this._addGoldCell(ri,fj);
				this._removeAroundStone(ri,fj);
			};
		};
		for ( let ti=0; ti<vLights.length; ti++ ) {
			removeVLine(vLights[ti]);
		};
		for ( ti=0; ti<pLights.length; ti++ ) {
			this.removePLine( pLights[ti][0], pLights[ti][1] );
		};
		//if (_tutStep1Num == 41) TweenMax.to(new Sprite(),0.5,{onComplete:_tutStep5Show});
	};

	JLines.prototype.removeVLine = function ( fi ) {
		let gLights = []; let pLights = [];
		Detonations.vLineDetonate(fi);
		this._fillZeroAlreadyBreakedStone();
		for ( let rj=0; rj<this.cy; rj++ ) {
			let tmpBox = this.getBox(fi,rj);
			if ( tmpBox != null && tmpBox.color == Consts.STONE_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.COIN_COLOR ) continue;
			if ( tmpBox != null && tmpBox.color == Consts.YASCHIK ) continue;
			if ( tmpBox != null && tmpBox.boosterPLine ) pLights.push( [ fi, rj ] );
			if ( tmpBox != null && tmpBox.boosterGLine ) gLights.push( rj );//removeGLine(rj);
			if ( tmpBox != null && tmpBox.removeGem() ) {
				this.pole[fi][rj] = -1;
				this._addGoldCell( fi, rj );
				this._removeAroundStone( fi, rj );
			};
		};
		for ( let ti=0; ti<gLights.length; ti++ ) {
			this.removeGLine(gLights[ti]);
		};
		for ( ti=0; ti<pLights.length; ti++ ) {
			this.removePLine(pLights[ti][0],pLights[ti][1]);
		};
	};

	JLines.prototype.removePLine = function ( fi, fj ) {
		let tmpBox = this.getBox( fi, fj );
//		if ( tmpBox != null ) tmpBox.boosterPLine = false;
		let gLights = []; let vLights = []; let pLights = [];
		Detonations.pLineDetonate(fi,fj);
		this._fillZeroAlreadyBreakedStone();
		let step = function ( ri, rj ) {
			if ( this._alreadyBreaked[ri] && this._alreadyBreaked[ri][rj] == 0 ) {
				let tmpBox = this.getBox(ri,rj);
				if ( tmpBox != null && tmpBox.color == Consts.COIN_COLOR ) return;
				if ( tmpBox != null && tmpBox.boosterGLine ) gLights.push( rj );
				if ( tmpBox != null && tmpBox.boosterVLine ) vLights.push( rj );
				if ( tmpBox != null && tmpBox.boosterPLine ) pLights.push( [ ri, rj ] );
				this._alreadyBreaked[ri][rj] = 1;
				if ( tmpBox != null && tmpBox.removeGem() ) {
					this.pole[ri][rj] = -1;
					this._addGoldCell(ri,rj);
					this._removeAroundStone(ri,rj);
				};
			};
		};
		step( fi+1,fj-1 );
		step( fi+1,fj+0 );
		step( fi+1,fj+1 );
		step( fi-1,fj+0 );
		step( fi-1,fj+1 );
		step( fi+0,fj-1 );
		step( fi-1,fj-1 );
		step( fi+0,fj+1 );
		step( fi+0,fj+0 );

		for ( let ti=0; ti<gLights.length; ti++) {
			this.removeGLine( gLights[ti] );
		};
		for ( ti=0; ti<vLights.length; ti++ ) {
			removeVLine(vLights[ti]);
		};
		for ( ti=0; ti<pLights.length; ti++) {
			this.removePLine( pLights[ti][0], pLights[ti][1] );
		};
		//Tutorial.checkShowStep3();
	};

	JLines.prototype.addLighting = function () {
		let count = 0; let bgl = false;
		let i; let j;
		for ( i=0; i<this.cx; i++ ) {//gline
			count = 0;
			for ( j=0; j<this.cy; j++ ) {
				if ( this.pole[i][j] == -2 ) {
					count++;
				} else {
					count = 0;
				};
				if ( count > 4 ) bgl = true;
				if ( bgl ) break;
			};
			if ( bgl ) break;
		};
		count = 0; let bvl = false;
		for ( i=0; i<this.cy; i++ ) {//vline
			count = 0;
			for ( j=0; j<this.cx; j++ ) {
				if ( this.pole[j][i] == -2 ) count++;	else count = 0;
				if ( count > 4 ) bvl = true;
				if ( bvl ) break;
			};
			if ( bvl ) break;
		};

		let fi = parseInt(this.box.name.substr(2,3));//uint
		let fj = parseInt(this.box.name.substr(5,3));//uint
		if ( bgl ) {
			let tmpBox1 = this.addNewBox( fi, fj, this.box.color );
			tmpBox1.boosterGLine = true;
			this.pole[fi][fj] = tmpBox1.color;
		};
		if (bvl) {
			let tmpBox2 = (bgl) ? this.getBox(fi,fj) : this.addNewBox( fi, fj, this.box.color );
			tmpBox2.boosterVLine = true;
			this.pole[fi][fj] = tmpBox2.color;
		};
		if ( !bvl && !bgl ) {
			count = 0; let bpl = false;
			for ( i=0; i<this.cy; i++ ) {//vline
				for ( j=0;j<this.cx; j++) {
					if ( this.pole[j][i] == -2 ) count++;
					if ( count > 6 ) bpl = true;
					if ( bpl ) break;
				};
				if ( bpl ) break;
			};
			if ( bpl ) {
				let tmpBox3 = this.addNewBox( fi, fj, this.box.color );
				tmpBox3.boosterPLine = true;
				this.pole[fi][fj] = tmpBox3.color;
			};
		};
	};

	//JLines.prototype._countHidedUnderBoxOldBox = function ( fi, sj, fj ) {
	//	let countHided = 0;
	//	sj = ( sj<0 ) ? -1 : sj;
	//	for ( let j=sj+1; j<=fj; j++ ) {
	//		if ( this.hidedOrGhost( fi, j) ) countHided++;
	//	};
	//	if ( countHided>0 ) {
	//		let np = fj+( fj-sj )+countHided-1;
	//		//for (j=fj+1;j<=np;j++) {//!!!
	//		for ( let j=fj+1;j<np;j++ ) {
	//			if ( this.hidedOrGhost(fi,j) && !this.bottomHiddedGems[fi][j] ) countHided++;
	//		};
	//	};
	//	return countHided;
	//};

	JLines.prototype._countHidedUnderBox= function ( fi, sj, fj ) {
		let countHided = 0;
		sj = (sj<0) ? -1 : sj;
		for (let j=sj+1;j<=fj;j++) {
			if ( this.hidedOrGhost(fi,j) ) countHided++;
		};
		/*let np:int = fj+(fj-sj)+countHided;
		for (let j:int=fj+1;j<=np;j++) {
			if (this.hidedGems[fi][j])	countHided++;
		}*/
		/*if (countHided>0) {
			let np:int = fj+(fj-sj)+countHided-1;
			for (j=fj+1;j<=np;j++) {
				if (this.hidedGems[fi][j] && !this.bottomHiddedGems[fi][j]) countHided++;
			}
		}*/
		return countHided;
	};

	JLines.prototype._upperHidedBox = function ( fi, fj ) {
		let res = true;
		for ( let j =0; j<=fj; j++ ) {
			if ( !this.hidedOrGhost( fi, j ) )	res = false;
		};
		return res;
	};
	
	
	JLines.prototype._shiftOldBoxes = function () { 
		for (let i = 0; i < this.cx; i ++) { 
			let jCoordsOfEmptyCells = []; 
			for (let j = (this.cy-1); j >= 0; j--) { 
				if (this.pole [i] [j] <0) { 
					jCoordsOfEmptyCells.push (j); 
				} else if (jCoordsOfEmptyCells.length> 0) { 
					if (! this.hidedOrGhost (i, j)) { 
						let box = this.getBox (i, j); 
						if (box != null) { 
							jCoordsOfEmptyCells.push (j); 
							box.moveDown (jCoordsOfEmptyCells [0]); 
							
							jCoordsOfEmptyCells.shift (); 
						} 
					} 
				} 
			} 
		} 
		return true; // _removeCoins (); 
	};
	

	//JLines.prototype._shiftOldBoxes = function() {//df df df df
	//	for ( let i=0; i<this.cx; i++ ) {
	//		let sh = 0;
	//		for (let j = (this.cy-1); j>=0; j--) {
	//			if ( this.pole[i][j] < 0 ) {
	//				sh += 1;
	//			} else {
	//				if ( this.pole[i][j] >= 0 ) {
	//					if ( !this.hidedOrGhost( i, j ) ) {
	//						let tmpBox2 = this.getBox( i, j );
	//						let ch = this._countHidedUnderBoxOldBox( i, j, j+sh );//0;
	//						while (this.hidedOrGhost( i, j+sh+ch ) ) ch++;
	//						if ( tmpBox2 ) tmpBox2.moveDown( j+sh+ch );
	//					};
	//				};
	//			};
	//		};
	//	};
	//	return true;//_removeCoins();
	//};

	JLines.prototype.hidedOrGhost = function ( fi, fj ) {
		if ( this.hidedGems[fi][fj] ) return true;
		let tmpBox2 = this.getBox( fi, fj );
		if ( tmpBox2 != null ) {
			if (tmpBox2.boosterGhost) return true;
		};
		return false;
	};

	JLines.prototype.addNewBoxes = function () {
		if ( this._clicked ) {
			this._clicked = false;
			this.countSteps -= 1;/*метка*/
		};

		let tj; let sh = 0; let ch = 0;
		for ( let ti=0; ti<this.cx; ti++) {
			sh = 0; ch = 0;
			for ( let j =this.cy-1; j>=0; j--) {
				let tmpBox = this.getBox( ti, j );
				if ( tmpBox == null  && !this.hidedOrGhost( ti, j ) ) {
					sh ++;
				} else {
					if (  this.hidedOrGhost(ti,j) ) {//tmpGem.gColor == 9) {
						ch += 1;
					};
				};
			};
			if ( sh>0 ) {
				for ( let k=0; k<sh; k++ ) {
					let shiftHided = 0;
					for ( let j=this.cy-1; j>=0; j-- ) {
						if ( this.getBox( ti, j ) == null && this.hidedOrGhost( ti, j ) != 1 ) {
							shiftHided = j;
							break
						};
					};
					let tmpBox3 = this.addNewBox( ti, (-1*k-1) );
					if ( tmpBox3 != null ) {
						tmpBox3.moveDown( shiftHided ); //fg fg fg fg
					};
				};
			};
			////
			/*
			for (tj=0;tj<this.cy;tj++) {
				if (this.pole[ti][tj] < 0) sh += 1;
			}
			for (tj=0;tj<sh;tj++) {
				let tmpBox3:CBox = addNewBox(ti,-1*(sh - tj));
				let ch:int = this._countHidedUnderBox(ti,-1*(sh - tj),tj);//0;
				while (this.hidedGems[ti][tj+ch]) ch++;
				if (tmpBox3 != null) {
					tmpBox3.moveDown(tj+ch); //fg fg fg fg
				}
			}*/
		}
		/*
		let tj:int; let sh:uint = 0;
		for (let ti:uint=0;ti<this.cx;ti++) {
			sh = 0;
			//for (tj=(this._cy-1);tj>=0;tj--) {
			for (tj=0;tj<this.cy;tj++) {
				if (this.pole[ti][tj] < 0) sh += 1;
			}
			for (tj=0;tj<sh;tj++) {
				let tmpBox3:CBox = addNewBox(ti,-1*(sh - tj));
				let ch:int = this._countHidedUnderBox(ti,-1*(sh - tj),tj);//0;
				while (this.hidedGems[ti][tj+ch]) ch++;
				if (tmpBox3 != null) {
					tmpBox3.moveDown(tj+ch); //fg fg fg fg
				}
			}
		}*/

//		TweenMax.to(new Sprite(), 0.2, {onComplete: Sounds.playGemDown} );
	/*	if (_removeCoins()) {
			TweenMax.to(new Sprite(),0.5,{onComplete:this._afterSearchCoin});
		} else {
			checkEndGame();
			if (this.gameFinished == 0) {
				TweenMax.to(new Sprite(),1,{onComplete:_needMixing});
			}
		}*/
	};

	JLines.prototype._removeCoins = function () {
		let bottomCoords = [];
		let i;
		for ( i=0; i<this.cx; i++ ) {
			let sh = 0;
			//while (this.hidedGems[i][this.cy-1-sh]) sh++;
			while ( this.hidedOrGhost(i,this.cy-1-sh) ) sh++;
			bottomCoords[i] = this.cy-1-sh;
		};
		let res = false; this._coins =[];
		for ( i=0; i<this.cx; i++ ) {
			let tmpBox = this.getBox( i, bottomCoords[i] );//cy-1);
			if ( tmpBox && tmpBox.color == Consts.COIN_COLOR ) {
				res = true;
				//tmpBox.removeGem();
				//_fillPoleArray();
				//this.pole[i][this.cy-1] = -1;
				this._coins.push(i);
			};
		};
		return res;
	};

	JLines.prototype._needMixing = function () {
		try {
			let res = true;
			this._fillPoleArray();
			for ( let i=0; i<this.cx; i++ ) {
				for ( let j =0; j<this.cy; j++ ) {
					//if (!this.hidedGems[i][j]) {
					if ( !this.hidedOrGhost( i, j ) ) {
						this.boxes = [];
						this._addBoxes(i,j,this.pole[i][j]);
						if ( this.boxes.length > 2 ) res = false;
						if ( !res ) break;
					};
				};
				if ( !res ) break;
			};
			if ( res ) {  
				this._mixingGems() 
			} else { 
				this.timerHelpColor._timerHelpTick();
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};

	JLines.prototype._getCountNotGold = function ( farr ) {
		let res = 0;
		for ( let i=0; i<farr.length; i++ ) {
			let fi = parseInt(farr[i].substr(0,3));//uint
			let fj = parseInt(farr[i].substr(4,3));//uint
			if ( !this._goldCells[fi][fj] ) res ++;
		};
		return res;
	};

	/*let function _bestClick():Array {
		let res:Array = [];
		let mg:int = 0;
		_fillPoleArray();
		for (let i:int=0;i<this.cx;i++) {
			for (let j:int=0;j<this.cy;j++) {
				if (!this.hidedGems[i][j]) {
					this.boxes = [];
					_addBoxes(i,j,this.pole[i][j]);
					if (this.boxes.length > 2) {
						let countNotGold:int = this._getCountNotGold(this.boxes);
						if (countNotGold > mg) {
							mg = countNotGold;
							res = [i,j];
						}
					}
				}
			}
		}
		return res;
	}		*/
	/*let function _showBestClick():void {
		let res:Array = _bestClick();
		if (_bestClickBox) _bestClickBox.filters = [];
		_bestClickBox = getBox(res[0],res[1]);
		if (_bestClickBox) _bestClickBox.filters = [new GlowFilter(0xdddddd,1,10,10,5)];
	}*/

	JLines.prototype._mixingGems = function ( fcallback=null ) {
		let self = this;
		if (fcallback == null) fcallback = function() { self._animation2 = false; };
		//_backGem1 = null;
		//_backGem2 = null;
		let gems = [];
		let emptyPlaces = [];
		let tg, eq;
		for ( let i=0; i<this.cx; i++ ) {
			if ( emptyPlaces[i] == null ) emptyPlaces[i] = [];
			for ( let j=0; j<this.cy; j++ ) {
				tg = this.getBox( i, j );
				emptyPlaces[i][j] = 0;
				if ( tg != null ) {
					eq = [Consts.COIN_COLOR,Consts.STONE_COLOR,Consts.YASCHIK].indexOf( tg.color ) < 0;
					if ( tg != null && eq && !this.hidedGems[i][j] ) {
						tg.name = 'cntmp'+this.cv(i)+''+this.cv(j);
						emptyPlaces[i][j] = 1;
						gems.splice( Math.floor(Math.random()*gems.length),0,tg);
					};
				};

			};//for
		};//for
		for ( let i=0;i<this.cx;i++) {
			for ( let j=0;j<this.cy;j++) {
				if (emptyPlaces[i][j] == 1) {
					tg = gems.pop();
					eq = [Consts.COIN_COLOR,Consts.STONE_COLOR,Consts.YASCHIK].indexOf( tg.color ) < 0;
					if (tg != null && eq && !this.hidedGems[i][j]) {
						tg.name = 'cn'+this.cv(i)+''+this.cv(j);
						TweenMax.to(tg, 2*this.tweenTick , { x: i*(Consts.coordsWidth), y: j*(Consts.coordsHeight) });
					};
				};
			};//for
		};//for
		setTimeout( function() { try { fcallback(); } catch ( ex ) { Handler.onErrorCatched(ex); } }, 3*this.tweenTick*100);
//		TweenMax.to( new Sprite(), 3*this.tweenTick, { x: 5, onComplete:fcallback } );
	};

	JLines.prototype._afterSearchCoin = function() {
		this._fillPoleArray();
		let bottomCoords = [];
		let i;
		for ( i=0; i<this.cx; i++ ) {
			let sh = 0;
			//while (this.hidedGems[i][cy-1-sh]) sh++;
			while (this.hidedOrGhost(i,this.cy-1-sh)) sh++;
			bottomCoords[i] = this.cy-1-sh;
		};
		for ( let i=0; i<this._coins.length; i++ ) {
			let tmpBox = this.getBox( this._coins[i], bottomCoords[ this._coins[i] ] );//cy-1);
			if (tmpBox && tmpBox.color == Consts.COIN_COLOR) {
				tmpBox.removeGem();
				//pole[this._coins[i]][this.cy-1] = -1;
				this.pole[ this._coins[i] ][ bottomCoords[ this._coins[i] ] ] = -1;
			};
		};
		this._shiftOldBoxes();
		this.addNewBoxes();
	};

	JLines.prototype._fillZeroAlreadyBreakedStone = function () {
		for ( let i =0; i<this.cx; i++ ) {
			if ( this._alreadyBreaked[i]==null ) this._alreadyBreaked[i] = [];
			for ( let j =0; j<this.cy; j++ ) this._alreadyBreaked[i][j] = 0;
		};
	};

	JLines.prototype._removeAroundStone = function ( fi, fj ) {
		let countRemovedStones = 0;
		let self = this;
		let step = function( ri, rj, topBottom ) {
			if ( self._alreadyBreaked[ri] && self._alreadyBreaked[ri][rj] == 0 ) {
				let tmpBox = self.getBox(ri,rj);
				if ( tmpBox != null && tmpBox.color == Consts.STONE_COLOR ) {
					if ( tmpBox.boosterIron && topBottom == false ) return;
					self._alreadyBreaked[ri][rj] = 1;
					if ( tmpBox.removeGem() ) {
						self.pole[ri][rj] = -1;
						countRemovedStones +=1;
					};
				} else {
					if ( tmpBox != null && tmpBox.color == Consts.YASCHIK ) {
						self._alreadyBreaked[ri][rj] = 1;
						if ( tmpBox.removeGem() ) {
							if(self.pole[ri]!=null) if(self.pole[ri][rj]!=null) self.pole[ri][rj] = -1;
						};
					};
				};
			};
		};// end step func
		step( fi+1, fj+0, false );
		step( fi-1, fj+0, false );
		step( fi+0, fj-1, true);
		step( fi+0, fj+1, true);

		setTimeout( function(){ self.taskPanel.refrashGems( Consts.STONE_COLOR + 3, countRemovedStones );} , 500);
		//TweenMax.to(new Sprite(),0.5,{onComplete:function (){Handler.refrashGems( CBox.STONE_COLOR + 3, countRemovedStones );} });
	};

	JLines.prototype.checkEndGame = function () {
		if (this._animation2) return;
		//_animation2 = false;
		let numLevel = Math.floor( Head.levelName.substr(1) );
		let glassBoxNeedRemove = GameTypes.info[numLevel].g6 > 0;
		let stoneBoxNeedRemove = GameTypes.info[numLevel].g8 > 0;
		let ghostBoxNeedRemove = GameTypes.info[numLevel].g9 > 0;


		let gem1NeedRemove = isMobile ? Handler.mobileTask[1] > 0 : GameTypes.info[numLevel].g1 > 0;
		let gem2NeedRemove = isMobile ? Handler.mobileTask[2] > 0 : GameTypes.info[numLevel].g2 > 0;
		let gem3NeedRemove = isMobile ? Handler.mobileTask[3] > 0 : GameTypes.info[numLevel].g3 > 0;
		let gem4NeedRemove = isMobile ? Handler.mobileTask[4] > 0 : GameTypes.info[numLevel].g4 > 0;
		let gem5NeedRemove = isMobile ? Handler.mobileTask[5] > 0 : GameTypes.info[numLevel].g5 > 0;

		this.gameFinished = 1;

		if ( gem1NeedRemove && !this.taskPanel.groupsTasks[1].galka.visible ) this.gameFinished = 0;
		if ( gem2NeedRemove && !this.taskPanel.groupsTasks[2].galka.visible ) this.gameFinished = 0;
		if ( gem3NeedRemove && !this.taskPanel.groupsTasks[3].galka.visible ) this.gameFinished = 0;
		if ( gem4NeedRemove && !this.taskPanel.groupsTasks[4].galka.visible ) this.gameFinished = 0;
		if ( gem5NeedRemove && !this.taskPanel.groupsTasks[5].galka.visible ) this.gameFinished = 0;

		if ( this.gameFinished == 1 ) {
			for (let i=0; i<this.cx; i++) {
				for ( let j=0; j<this.cy; j++) {
					if ( glassBoxNeedRemove && this._glassCells[i][j] ) this.gameFinished = 0;

					if ( this.getBox( i, j ) != null && this.getBox( i, j ).color == Consts.STONE_COLOR && stoneBoxNeedRemove ) 	this.gameFinished = 0;
					if ( this.getBox( i, j ) != null && this.getBox( i, j ).boosterGhost && ghostBoxNeedRemove ) this.gameFinished = 0;

					//if (this._goldCells[i][j] != 1) 		this.gameFinished = 0;
					if (this.getBox( i, j ) != null && this.getBox( i, j ).color == Consts.COIN_COLOR ) 	this.gameFinished = 0;
				};
			};
		};
		if ( this.gameFinished == 1 ) {
			if ( Winds.getTopWindName() == Winds.WINDS_STEPS_LEFT) {
	//			Winds.getWind().shutdown(0);
	            Winds.shutdownTopWind(1);
    		}
//			this.timerHelpColor.stop();
			this.timerHelpColor.stop();
			Handler.onEndLevel();
		} else {
			if ( this._countSteps <= 0 ) {
				//this.countSteps = 0;
				if ( User.loseLevel != Head.levelName ) {
					User.loseLevel = Head.levelName;
					User.loseCount = 1;
				} else {
					User.loseCount += 1;
				};
				if ( User.loseCount > 4 ) {
					BackClient.ask(BackClient.LOG_ADD,function (r) {}, {l:User.loseLevel,c:User.loseCount} );
				};
//				clearTimeout(this.timerHelpColor);
				this.timerHelpColor.stop();
//				Winds.show( Winds.WIND_STEPS_LEFT );
			};
		};
	};

	JLines.prototype._addGoldCell =  function ( i, j ) {
		if ( this._glassCells[i][j] ) {
			let glassCell = Handler.level.getChildByName('gc'+this.cv(i)+'_'+this.cv(j));
			Handler.level.removeChild(glassCell);
			this._glassCells[i][j] = 0;
		} else {
			if (this._goldCells[i][j] == 0) {
				Handler.countScore += 60;
				this._goldCells[i][j] = 1;
				let w = Handler.coordsWidth, h = Handler.coordsHeight;
				let goldCell = new Embeds.goldBox();
				goldCell.width  = w;//w+3*Consts.sh;
				goldCell.height = h;//h+3*CBox.sh;
				goldCell.x = Math.floor(Handler.coordsShiftX + i*(w));//i*(w+CBox.sh)-CBox.sh; CBox.sh/2 === uint
				goldCell.y = Math.floor(Handler.coordsShiftY + j*(h));//j*(h+CBox.sh)-CBox.sh;

				Handler.level.addChild(goldCell);
			};
		};

	};

	JLines.prototype._addGlassCell = function ( i, j ) {
		let w = Consts.coordsWidth;
		let h = Consts.coordsHeight;
		let glassCell = Embeds.glassBox();

		glassCell.name = 'gc'+this.cv(i)+'_'+this.cv(j);
		glassCell.width  = w;//w+3*CBox.sh;
		glassCell.height = h;//h+3*CBox.sh;
		//glassCell.parent =
		Handler.level.addChild(glassCell);

		this._glassCells[i][j] = 1;

		let numLevel = parseInt(Head.levelName.substr(1));//uint
		GameTypes.info[numLevel].g6 += 1;

		glassCell.x = Math.floor( Consts.coordsShiftX + i*w );//i*(w+CBox.sh)-CBox.sh; CBox.sh/2 === uint
		glassCell.y = Math.floor( Consts.coordsShiftY + j*h );//j*(h+CBox.sh)-CBox.sh;
	};

	JLines.prototype.getBox = function( i, j ) {
		let sprite = this.gemsContainer.getChildByName('cn'+this.cv(i)+''+this.cv(j));
		return sprite == null ? null : sprite.self;
	};

	JLines.prototype._fillPoleArray = function () {
		this.pole = [];
		for ( let i=0; i<this.cx; i++ ) {
			if ( this.pole[i] == null ) this.pole[i] = [];
			for ( let j=0; j<this.cy; j++ ) {
				this.pole[i][j] = (this.getBox(i,j) != null && this.getBox(i,j).visible) ? this.getBox(i,j).color : -1;
			};
		};
	};

	JLines.prototype.cv = function( val ) {
		if ( val < -9 ) return ''+val;
		if (  val <  0 ) return val+'.';
		return (val>9) ? '0'+val : '00'+val;
	};

