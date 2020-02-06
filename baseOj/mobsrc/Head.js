    let Head = {};

	Head.init = function( fparams ) {
		let self = this;
		this.params = fparams;

		//Handler.head = Handler.newGroup(  );
		this._timerString = '';
		this.maxEnergy = 6;
		this.energyTimerCount    = 1200;
		this.energyTimerMaxCount = 1200;
		this.levelName = '0'+(User.ml+1);
        //this.levelName = '10251';
        this.cLevelsML = 50;
//		this.countColls = this.params['countColls'];
//		this.maxLevels  = this.params['countLevels'];
		this.maxLevels  = parseInt( this.params['maxLevels'] );
		GameTypes.initGameTypes();
		
		this.numLevMax  = this.maxLevels - (this.maxLevels - 1) % this.cLevelsML - 1;
		this.countMenuLevels = Math.floor( (this.maxLevels - 1) / this.cLevelsML ) + 1;

		//(_sprite.getChildByName('hidedBut') as Sprite).addEventListener( MouseEvent.CLICK, _showUID );
        this.group = Handler.head;//Handler.newGroup();
        this.group.translate(Handler.contentCenterX, Handler.contentCenterY); 
        
//   как пример     this.timerBack = Handler.showImgRect( this.group, Consts.DIR_HEAD+"fonTimer.png", 4,96,123,38 );         
        let xTimer =isMobile ? -135 : -285;
        let yTimer =isMobile ? -visibleHeight/2 + 50 : -260;
		this.timerBack = Handler.showImgRect( this.group, "backgrTimer.png", xTimer, yTimer, 100, 33 );         
        this.timerBack.isVisible = true;
		
		let xTp = isMobile ? -170 : -320;
		let yTp = isMobile ? Math.floor( yTimer-4 ) : -264;
        let tp = { parent: this.group, text:"", color:0xFFFFFF, fontSize:14, width:100, x: xTp, y: yTp };         
        this.timerText = Handler.newText(tp);
        this.timerText.visible = true;
    
		if ( !isMobile ) {
			let idImg =  Handler.showImgRect( this.group, "boxId.png", -363, -290,31,31 );   
			idImg.onEL( 'pointerdown', function() { Winds.show( Winds.WIND_MSG, { text: Langs.NUMBER_USER + User.viewer_id } ) } );
		};
// 		this.fonPoints = Handler.showImgRect( this.group, "fonPoint.png", -81,-22,162,42, false );  панели очков нет       
        
		let xFonCoins   = isMobile ?    32 : -110;
		let xFonEnergy  = isMobile ? -140 : -290;
		let yFonCoins  = isMobile ? -visibleHeight/2 + 30 : -280;//19 height/2
		this.fonCoins  = Handler.showImgRect( this.group, "panelMoney.png", xFonCoins, yFonCoins,165,34 );         
        this.fonEnergy = Handler.showImgRect( this.group, "panelLives.png", xFonEnergy, yFonCoins,166,43 );         
		
		/*const graphics1 = new PIXI.Graphics();
        graphics1.beginFill(0x0000AA);
        graphics1.drawRect(120, -visibleHeight/2 + 25, 100, 100);
        graphics1.endFill();
		this.group.addChild(graphics1);*/
	
	    this.fonCoins .onEL( "pointerdown", function(){ Winds.show( Winds.WIND_BUY_COINS  ) } );         
        this.fonEnergy.onEL( "pointerdown", function(){ Winds.show( Winds.WIND_BUY_LIVES ) } );   
		
		let wButMyScore = isMobile ? 100 : 159;
		let xButMyScore = isMobile ? 172 : 60;
		let yButMyScore = isMobile ? yFonCoins : -278;
		
		let butMyScore = Handler.showImgRect( this.group, "butMyScore.png", xButMyScore, yButMyScore, wButMyScore, 47 );
		let touchButMyScore = function( evt ) {
			Winds.show( Winds.WIND_MY_SCORE );
		//	Winds.show( Winds.WIND_M, { text: 'Пусть закончаться камни бесконечности!' } );
		};
		butMyScore.onEL( "pointerdown",touchButMyScore );
		
		
		let butPlay = Handler.showImgRect( this.group, "butPlayWindMenuLevels.png",220,-275,149,46);
		butPlay.name = 'buttonFastStart';
		let touchButPlay = function( evt ) {
			//Winds.show( Winds.WIND_BEFORE_LEVEL );
		};
	//		butPlay.onEL("pointerdown",touchButPlay);
		butPlay.onEL("pointerdown", Handler.onStartLevelClick);
		if( isMobile ) butPlay.isVisible = false;
	
		let xButMute = isMobile ? 205 :  318;
		let yButMute = isMobile ? visibleHeight/2 - 20 : -285;
		self.butEnSound = Handler.showImgRect( this.group, "butMute.png",  xButMute, yButMute, 33,33);
		if ( isMobile ) self.butEnSound.scale.set(-1);
		self.butDisSound = Handler.showImgRect( this.group, "butMute2.png", xButMute, yButMute, 33,33);
		if ( isMobile ) self.butDisSound.scale.set(-1);
		self.butDisSound.isVisible = false;
		
		if ( Sounds.msOn == false ){
			self.butEnSound.isVisible = false;
			self.butDisSound.isVisible = true;
		}
		
		let touchButMute = function( evt ) {
			if ( Sounds.msOn ) {
				Sounds.Stop();
//				this._butMelody.gotoAndStop(2);
				Sounds.msOn = false;
				self.butEnSound.isVisible = false;
				self.butDisSound.isVisible = true;
			} else {
				Sounds.Play();
//				this._butMelody.gotoAndStop(1);
				self.butEnSound.isVisible = true;
				self.butDisSound.isVisible = false;
				Sounds.msOn = true;
			};
		};
		self.butEnSound.onEL("pointerdown",touchButMute);
		self.butDisSound.onEL("pointerdown",touchButMute);
		
		let butFullScrin = Handler.showImgRect( this.group, "butFullScrin.png",355,-285,31,31);
		butFullScrin.onEL('pointerdown',function() {
			if ( document.fullscreenEnabled ) {
				Handler.toggleFullscreen();
			} else {
				Winds.show( Winds.WIND_FULL_SCREEN );
			}
		});
	
		if ( isMobile ) butFullScrin.isVisible = false;
		
		//this.groupNumPoints = Handler.newGroup( this.group );         
        this.groupNumCoins  = Handler.newGroup( this.group );         
        this.enGroup        = Handler.newGroup( this.group );

		this.coins	= parseInt( this.params.user.coins    );
		this.energy	= parseInt( this.params.user.energy_v );
		this.exp    = parseInt( this.params.user.exp      );
		this.bonus  = parseInt( this.params.user.energy_u );
	  //this.vip    = parseInt( this.params.user.vip      );
	
		//mcLoadBody = new Embeds.mcLoader();
		//this.addChild(mcLoadBody);
		//mcLoadBody.x = 30;
		//mcLoadBody.y = 50;
		//mcLoadBody.visible = false;
		
		//Head.initTmimer();
	}
	Object.defineProperty( Head, "coins", {
		get: function(   ) { return User.coins; },		 
		set: function(val) { 
		    User.coins =  val;
			Head.showCoins();
		}
	});
	Object.defineProperty( Head, "energy", {
		get: function(   ) { return User.energy; },
		set: function(val) { 
		    User.energy =  val; 
			Head.startBonusTimer();
			Head.showEnergy();
		}
	});
/*	Object.defineProperty( Head, "exp", {
		get: function(   ) { return User.exp; },		 
		set: function(val) { 
		    User.exp =  val; 
			Head.showPoints( );
		}
	});*/
	Object.defineProperty( Head, "bonus", {
		get: function(   ) { return User.bonus; },		 
		set: function(val) { 
		    User.bonus = val; 
			Head.startBonusTimer();
		}
	});
 /*   Head.showPoints = function() {
        Handler.removeGroupChilds( Head.groupNumPoints );         
        Handler.showNumber( "fg", 4, -2, User.exp, 11,17, Head.groupNumPoints, Consts.DIR_MENU_LEVELS_NUMBERS );
        Head.groupNumPoints.x = Math.floor( Head.groupNumPoints.width/2 );
    }; */        
    Head.showCoins = function() {
        Handler.removeGroupChilds( Head.groupNumCoins );
        Handler.showNumber( "wg", 0, this.fonCoins.y, User.coins, 13,18, Head.groupNumCoins, '',3 );         
        Head.groupNumCoins.x = ( this.fonCoins.x + 15 ) - Math.floor( Head.groupNumCoins.width/2 );         
    };
    Head.showEnergy = function() {
        Handler.removeGroupChilds( Head.enGroup );         
        Handler.showNumber( "wg", 0, this.fonEnergy.y, User.energy, 13,18, Head.enGroup, '',3 );         
        Head.enGroup.x = ( this.fonEnergy.x + 16 ) - Math.floor( Head.enGroup.width/2 );        
    };
	
	Object.defineProperty( Head, "timerString", {
		get: function(   ) { return Head._timerString; },		 
		set: function(val) {
			if ( Handler.isValidInteger( val ) ) {
				if ( val == 0 ) {
					Head.timerText.visible = false;
					Head.timerBack.visible   = false;
			    } else {
					let m = Math.floor( val / 60 );
			    	let s = val - m*60;
					Head._timerString = '+ 1 в '+Handler.cv(m) + ':' +  Handler.cv(s);
			    	Head.timerText.text = Head._timerString;
					Head.timerText.visible = true;
			    	Head.timerBack.visible = true;
			    }
            }
		}
	});
	
	Head.startBonusTimer = function () {
		if ( Head.energy >= Head.maxEnergy ) {
			Head.timerText.visible = false;
			Head.timerBack.visible = false;
			if ( Head.energyTimer != null ) clearInterval( Head.energyTimer );
		} else {
			Head.energyTimerCount = Head.energyTimerMaxCount - (User.ts - User.bonus);
			Head.timerString = Head.energyTimerCount+'';
			if ( Head.energyTimer == null ) {
			    Head.energyTimer = setInterval( Head.onBonusTimerTick, 1000 );
			}
		}
	}
	
	Head.onBonusTimerTick = function () {
		Head.energyTimerCount -= 1;
		if ( Head.energyTimerCount <= 0 ) {
			Head.energy += 1;
			if ( Head.energy < Head.maxEnergy ) {
				Head.bonus += Head.energyTimerMaxCount; 
				Head.energyTimerCount = Head.energyTimerMaxCount;// - (User.ts - User.bonus);
			} else {
				//Head.energyTimer.stop();
				clearInterval( Head.energyTimer );
			}
		}
		Head.timerString = Head.energyTimerCount+'';
	}