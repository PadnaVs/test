	
	"use strict";
	
	let CWindGame = {};
	CWindGame._sprite = null;
	CWindGame._panelLamps = null;
	CWindGame._panelScore = null;
	//let _textSteps:CText : null,
	//let _textTimer:CText : null,
	
	//let _airLamp:Sprite = new Embeds.fonar();
	CWindGame._boosterVL = null;
	CWindGame._boosterGL = null;
	CWindGame._boosterPL = null;
	CWindGame._boosterMX = null;
	CWindGame._boosterMT = null;
	CWindGame._boosterCH = null;
	CWindGame._butFinLevel = null;
	CWindGame._butFullScr = null;
	CWindGame._butMelody = null;
		
	CWindGame._txtLevel = null;
	
	CWindGame.newObject = function() {
        this.winds = {};
        return this;
    };
	
	CWindGame.startup = function( params ) {
		params = params || {};
		let self = this;
		self.mainGroup = Handler.newGroup( Handler.gWinds );
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		
		let bakcgrScaleMobile = visibleHeight / pixiAppHeight;
		let graphics = new PIXI.Graphics();
		graphics.beginFill(0xF8C245,0.3);
		graphics.drawRect( -380, -305, 760*bakcgrScaleMobile, 610*bakcgrScaleMobile );
		graphics.endFill();
		self.mainGroup.addChild(graphics);
		
		//let backgr = Handler.showImgRect(this.mainGroup, Consts.DIR_WIND_LOADER+"backgrWindGame.png",0,0,760,610);
		//;
		//backgr.scale.x = bakcgrScaleMobile;
		//backgr.scale.y = bakcgrScaleMobile;
		
		let numLevel = parseInt(Head.levelName.substr(1));
		Handler.levelNum = numLevel;
		if ( Handler.mobileTask == null ) {
			Handler.setMobiletask( numLevel );
		};
		//gameField
		self._sprite = Handler.newGroup();
		Handler.windGameSprite = self.mainGroup;
		Handler.lights = Handler.newGroup();
		Handler.level  = Handler.newGroup();		
		Handler.jlines = new JLines( self.mainGroup );
		Handler.jlines.gemsContainer = Handler.newGroup();
		
		Handler.fmask  = Handler.newGroup();
		Handler.lmask  = Handler.newGroup();
		
		Handler.jlines.stepsPanel  = StepsPanel.init( self.mainGroup, params.lev[2] ); 
	
		
		Handler.jlines.init(params.lev);//(1) eto vishe ftorogo
		Handler.jlines.taskPanel = TaskPanel.init( self.mainGroup );
		Handler.jlines.pointsPanel = PointsPanel.init( self.mainGroup, params.lev[3] );
		
		
		if ( isMobile ) {
			Handler.jlines.taskPanel.group.toFront();
			Handler.jlines.pointsPanel.group.toFront();
		}
		Handler.lights.x = Consts.coordsShiftX;
		Handler.lights.y = Consts.coordsShiftY;

		let cx = Consts.coordsShiftX;
		let cy = Consts.coordsShiftY;
		let cw = Consts.coordsWidth;
		let ch = Consts.coordsHeight;
		
		let w = Handler.jlines.cx;
		let h = Handler.jlines.cy;
		
		let graphLevel = new PIXI.Graphics();
		let grapWhite = new PIXI.Graphics();
		let graphOr = new PIXI.Graphics();
		graphOr.lineStyle(8,0xFEDC8C,0.95);
		graphLevel.lineStyle(1,0x1E3940,1);
		self._sprite.addChild(graphOr);
		self._sprite.addChild(grapWhite);
		self._sprite.addChild(graphLevel);
		
		let fmask = new PIXI.Graphics();
		let lmask = new PIXI.Graphics();
		fmask.beginFill(0xffffff);
		lmask.beginFill(0xffffff);
		Handler.fmask.addChild(fmask);
		Handler.lmask.addChild(lmask);
		
		for ( let i=0;i<w;i++ ) {
			for ( let j=0;j<h;j++ ) {
				if (Handler.jlines.hidedGems[i][j] == 0) {//pustie kletki
					/*if ( (i+j)%2==0 ) {
						Handler.level.graphics.beginFill(0x394F6C,1.0);
					} else {
						Handler.level.graphics.beginFill(0x41597A,1.0);
					};*/
					let rcolor = (i+j) % 2 ? 0x41597A : 0x394F6C;
//					Handler.showImg(Handler.level, 'bakc.png',cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2) );
//					Handler.showImg(Handler.fmask, 'bakc.png',cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2) );
//					Handler.showImg(Handler.lmask, 'bakc.png',cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2) );
					
					graphOr.beginFill(0xFEDC8C);
					graphOr.drawRoundedRect(cx+cw*i-Math.floor(cw*1.1/2),cy+ch*j-Math.floor(ch*1.1/2),cw*1.1,ch*1.1, 5);
					graphOr.endFill();
					
					grapWhite.beginFill(0xFFFFFF);
					grapWhite.drawRect(cx+cw*i-Math.floor(cw*1.1/2),cy+ch*j-Math.floor(ch*1.1/2),cw*1.1,ch*1.1);
					grapWhite.endFill();
					
					graphLevel.beginFill(rcolor);
					graphLevel.drawRect(cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2),cw,ch);
					graphLevel.endFill();
					
					fmask.drawRect(cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2),cw,ch);
					lmask.drawRect(cx+cw*i-Math.floor(cw/2),cy+ch*j-Math.floor(ch/2),cw,ch);
					
					
					//Handler.showRect(Handler.fmask,cx+cw*i,cy+ch*j,cw,ch,1,0x1E3940);
					//Handler.showRect(Handler.lmask,cx+cw*i,cy+ch*j,cw,ch,1,0x1E3940);

					//Handler.showRect(Handler.level,cx+cw*i-2,cy+ch*j-2,cw,ch,1,rcolor);
					//Handler.level.graphics.endFill();
				};
			};
		};
		fmask.endFill();
		lmask.endFill();
		
		Handler.lights.mask = lmask;//lightsMask;
		Handler.jlines.gemsContainer.mask = fmask;
			
		self._sprite.addChild( Handler.level );
		self._sprite.addChild( Handler.jlines.gemsContainer );

		self._sprite.addChild(Handler.fmask);
		self._sprite.addChild(Handler.lmask);
		self._sprite.addChild(Handler.lights);
		self.mainGroup.addChild( self._sprite );
		Handler.jlines.gemsContainer.x = Consts.coordsShiftX;
		Handler.jlines.gemsContainer.y = Consts.coordsShiftY;
		
		
		let shiftXgame = isMobile ? Math.floor( self._sprite.width/2 )  - 32  : Math.floor( self._sprite.width/2 )  - 58;
		let shiftYgame = isMobile ? Math.floor( self._sprite.height/2 ) - 40  : Math.floor( self._sprite.height/2 ) - 20;
		
		Handler.gemsContainerGlobalX = self.mainGroup.x - shiftXgame;
		Handler.gemsContainerGlobalY = self.mainGroup.y - shiftYgame;
		
		
		self._sprite.x =  -shiftXgame;
		self._sprite.y =  -shiftYgame;
		console.log("-shiftYgame",-shiftYgame);
		if ( isMobile ) {
		    let shiftOfScreen = Math.floor(( pixiAppWidth - visibleWidth ) / 2);
		    let shiftOfScreenY = shScreenY - 250;
            Handler.gemsContainerGlobalX = self.mainGroup.x + self._sprite.x + Handler.jlines.gemsContainer.x - shiftOfScreen;
            Handler.gemsContainerGlobalY = self.mainGroup.y + self._sprite.y + Math.floor(shScreenY / pixiAppScaleMobile);
        }

		//Bonuses
		if ( Handler.butBonuses )
            for( const b of Handler.butBonuses )
                b.destroy();
		let i = 0;
        Handler.butBonuses = [];
		
        for ( let i = 0; i<3; i++ ) {
			let xButBon = isMobile ? -20+i*74 : 342; 
			let yButBon = isMobile ?  327 + ( visibleHeight - visibleHeight0 ) * 0.25 : -172+i*72; 
			let bname = Consts.BONUSES_NAMES[i];
		    Handler.butBonuses[i] = new ButBonus(self.mainGroup, xButBon, yButBon, bname );
		};
		
		let showSmallAc = function() {
			Handler.acAddStepsForInvite = Actions.show( Actions.WIND_ADD_STEPS_FOR_INVITE, self.mainGroup );
		}
		if ( !isMobile ) {
			Handler.timerOpenAcInv = setTimeout( showSmallAc, 7000 );
		};
			
		let touchButMute = function( ) {
			if ( Sounds.msOn ) {
				Sounds.Stop();
				Sounds.msOn = false;
	
				self.butMuneEnWindGame.isVisible  = false;
				self.butMuneDisWindGame.isVisible = true;
				
				Head.butEnSound.isVisible  = false;
				Head.butDisSound.isVisible = true;
			} else {
				Sounds.Play();
				Sounds.msOn = true;
				
				self.butMuneEnWindGame.isVisible  = true;
				self.butMuneDisWindGame.isVisible = false;
				
				Head.butEnSound.isVisible  = true;
				Head.butDisSound.isVisible = false;
			};
		};
		
		self.openedPanelSettings = false;
		self.touchButSettings = function () {
			if ( !self.openedPanelSettings ) {
				self.openedPanelSettings = true;
				TweenMax.to( self.butsPanel, 0.35, { y: -54 } );
			} else {
				self.openedPanelSettings = false;
				TweenMax.to( self.butsPanel, 0.35, { y: 25 } );
			};
		};
		
		let windClose = function() {
			if ( Winds.getTopWindName() == Winds.WIND_MSG ) {
				Winds.getWind().shutdown( Winds.WIND_MSG );
				//Winds.shutdownTopWind(1);
			};
			if ( Winds.getTopWindName() == Winds.WIND_ADD_STEPS_FOR_INVITE ) {
				Winds.getWind().shutdown( Winds.WIND_ADD_STEPS_FOR_INVITE );
			};
			clearTimeout( Handler.timerOpenAcInv);
			self.shutdown(1);
		};
		
		if ( isMobile ) {
			self.settingsPanel = Handler.newGroup(self.mainGroup);
			//butSetings
			self.butSetings = Handler.showImgRect( self.settingsPanel, "butSetings.png", 0, 0, 46, 46 );
			self.butSetings.onEL( 'pointertap', self.touchButSettings );
			//butPanelSetings
			self.butsPanel = Handler.newGroup( self.settingsPanel );
			self.butPanelBackgr     = Handler.showImgRect( self.butsPanel, "setingsPanel.png",          0, 0, 42, 96 );
			//cross
			self.butCross = Handler.showImgRect( self.butsPanel, "crossWindGameMob.png",      0, -26, 30, 32 );
			let touchCross = function () {
				if( self.settingsPanel ) self.touchButSettings(); 
				Winds.show( Winds.WIND_MSG, { text: Langs.CLOSE_LEVEL, butName: "buttonClose", butCallback: windClose } );
			}
			self.butCross.onEL("pointerdown", touchCross );
			//butMute
			self.butMuneEnWindGame  = Handler.showImgRect( self.butsPanel, "butMuteEnWindGameMob.png",  0, 10, 30, 32 );
			self.butMuneDisWindGame = Handler.showImgRect( self.butsPanel, "butMuteDisWindGameMob.png", 0, 10, 30, 32 );
			self.butMuneEnWindGame .onEL("pointertap", touchButMute);
			self.butMuneDisWindGame.onEL("pointertap", touchButMute);
			self.butMuneDisWindGame.isVisible = false;
			
			self.butsPanel.y = 25;
			self.butsPanel.toBack();
			self.butsPanel.mask = Handler.showRect( self.settingsPanel, 0, -54, 42, 96 );
			
			self.settingsPanel.x = 194;
			self.settingsPanel.y = 327 + ( visibleHeight - visibleHeight0 ) * 0.25;
		} else {	
			self.cross = Handler.showImgRect(self.mainGroup, "crossWindGame.png",358,-285,33,28);
			self.cross.onEL("pointerdown",windClose);
			
			self.butMuneEnWindGame  = Handler.showImgRect( self.mainGroup, "butMute.png",  353, -213, 33, 33 );
			self.butMuneDisWindGame = Handler.showImgRect( self.mainGroup, "butMute2.png", 353, -213, 33, 33 );
			self.butMuneEnWindGame .onEL("pointertap", touchButMute);
			self.butMuneDisWindGame.onEL("pointertap", touchButMute);
			self.butMuneDisWindGame.isVisible = false;
			
			self.butFullScrin = Handler.showImgRect(self.mainGroup, "butFullScrin.png",352,-246,31,31);
			self.butFullScrin.onEL('pointerdown',function() {
			    if ( document.fullscreenEnabled ) {
					Handler.toggleFullscreen();
				} else {
					Winds.show( Winds.WIND_FULL_SCREEN );
				}
			});
			
			Handler.showImgRect(self.mainGroup, "panelLevelWindGame.png",-320,-288,103,23);
			let textNumLevelParams = {
				fontFamily: 'Arial',
				fontWeight: 'bold',
				fontSize: 16,
				fill: '#FFFFFF'
			};
			Handler.showText(self.mainGroup,numLevel,-300,-288,  textNumLevelParams);
		}
		
		if ( Sounds.msOn == false ){
			self.butMuneEnWindGame.isVisible = false;
			self.butMuneDisWindGame.isVisible = true;
		}
		
		self.mainGroup.interactive = true;
		Handler.winGameGr = self.mainGroup;
	};
	
	CWindGame.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindGame;