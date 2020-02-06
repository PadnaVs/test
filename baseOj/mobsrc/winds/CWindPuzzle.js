	
	"use strict";
	
	let CWindPuzzle = {};
	//CWindPuzzle.__index = CWindPuzzle;
	
	CWindPuzzle.newObject = function(){
		let self = this;
		return self;
	}
	
	CWindPuzzle.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let showContent = function(){
			
			self.countOpened = ( User.puzzlenum - 1 ) % 81 + 1;
			self.numPuzzle = Math.floor( ( User.puzzlenum - 1 ) / 81 ) + 1;
			
			self.windGr = Handler.newGroup( self.mainGroup );
			self.windGr.x = -Handler.contentCenterX;
			self.windGr.y = -Handler.contentCenterY;
			
			if ( isMobile ) { 
				let backgrWindM = Handler.showImgRect( self.mainGroup, "mobBackHight.png", 0, 0, 450, 714 );
				backgrWindM.toBack();
			} else {
				////backgr
				let backgrW = isMobile ? visibleWidth0  : 760;
				let backgrH = isMobile ? visibleHeight0 : 482;
				let backgrX = isMobile ? 155 : 0;
				let backgrY = isMobile ? -55 : 0;
				let backgr = Handler.showWindBackround(backgrX, backgrY, backgrW, backgrH, Consts.DIR_PUZZLE + 'mWindPuzzleAngle.png', Consts.DIR_PUZZLE + 'mWindPuzzleSide.png',0xf3d8ac);
				self.windGr.addChild(backgr);
				//подложка изображения загадки
				if ( !isMobile) { 
					let backgrImg = Handler.showWindBackround(10, 20, 440, 440, Consts.DIR_PUZZLE + 'windImgPuzzleAngle.png', Consts.DIR_PUZZLE + 'windImgPuzzleSide.png',0xf4cb9a);
					self.windGr.addChild(backgrImg);
				};
				
			};
			
			//изображение загадки
			let puzImgX = isMobile ? 160 : 10;
			let puzImgY = isMobile ?   0 : 20;
			self.puzzleImageGroup = Handler.showPuzzleImageAndFront( self.windGr, self.numPuzzle, self.countOpened );
			self.puzzleImageGroup.translate( puzImgX, puzImgY );
			//cross
			let xCross = isMobile ? 594 : 730;
			let yCross = isMobile ? -40 :  30;
			//let cross = Handler.showImgRect(self.windGr, Consts.DIR_PUZZLE + "crossWindPuzzle.png", xCross, yCross,29,25);
			let cross = Handler.showImgRect(self.windGr, "cross.png", xCross, yCross,36,36);
			cross.onEL( 'pointerdown', function() { self.shutdown() }  );
			//title
			if ( isMobile ) {
				Handler.showImgRect(self.windGr, Consts.DIR_PUZZLE + "title_puzl_mob1.png", 385, -32, 180, 34);
			}
			let nameTitle = isMobile ? "title_puzl_mob2.png" : "title_puzl.png";
			let xTitle = isMobile ? 385 : 600;
			let yTitle = isMobile ? -5 :  90;
			let wTitle = isMobile ? 400 : 260;
			let hTitle = isMobile ?  34 : 117;
			Handler.showImgRect(self.windGr, Consts.DIR_PUZZLE + nameTitle, xTitle, yTitle, wTitle, hTitle);
			//инициализация слова
			self.word = Handler.WORDS[ self.numPuzzle ];//загаданное слово
			if ( self.word != null ) {
				self.arrayWord = [];
				for ( let i = 0; i<self.word.length; i++ ) {
					let symbol = self.word.substring( i, i+1 );
					if ( Handler.table_indexOf( Consts.ALF, symbol ) != null ) {
						self.arrayWord.push( symbol );         
					};
				};
				let charsOnScreen = isMobile ? 21 : 20 ;
				let l = charsOnScreen - self.arrayWord.length;
				for ( let k = 0; k<l; k++ ) {
					let randSymbol = Consts.ALF[ Math.floor( Math.random() * Consts.ALF.length ) ];
					self.arrayWord.push( randSymbol );         
				};         
				
				for ( let i = 0; i<Handler.count( self.arrayWord ); i++ ) {
					let a = Math.floor( Math.random() * Handler.count( self.arrayWord ) );         
					let g = self.arrayWord[i];         
					self.arrayWord[i] = self.arrayWord[a];         
					self.arrayWord[a] = g;         
				};         
				
				self.strPob  = "";
				self.arrayBox = [];
				self.selectedChars  = [];
				self.charOldX = [];
				self.charOldY = [];
				self.countSelChars = 0;
				
				self.charImgW = 50;         
				self.charImgH = 50;         
				let imgChar = [];         
				let xShChar = isMobile ? 164 : 448;
				let yShChar = isMobile ? 468 : 190;
				
				for ( let i = 0; i<Handler.count(self.arrayWord); i++ ) {
					
					let px = isMobile ?  i % 7 + 1           : i % 5 + 1;
					let py = isMobile ?  Math.floor( i / 7 ) : Math.floor( i / 5 );
					
					let charX = xShChar + px * ( self.charImgW + 4 );         
					let charY = yShChar + py * ( self.charImgH + 4 );         
				
					let charname = "c"+(Handler.table_indexOf( Consts.ALF, self.arrayWord[i] ));         
					 
					imgChar[i] = Handler.showImgRect( self.windGr, Consts.DIR_PUZZLE+"char/"+charname+".png", charX, charY, self.charImgW, self.charImgH );         
					imgChar[i].name = charname;         
					imgChar[i].selected = false;         
					imgChar[i].num = i;         
				
					imgChar[i].onEL( "pointerdown", function(evt){ self.onCharClick(evt); } );
				};
				
				let xShCharBoxes = isMobile ? 264 : 470;
				let yCharBoxes   = isMobile ? 630 : 400;
				for ( let i = 0; i<self.word.length; i++ ) {
					self.arrayBox[i] = Handler.showImgRect( self.windGr, Consts.DIR_PUZZLE+"char_box.png", xShCharBoxes+i*35, yCharBoxes, 30, 30 );         
					self.arrayBox[i].name = "b"+(i+1);         
				};
				
				let xBoxCancel = isMobile ? 215 : 470;
				let yBoxCancel = isMobile ? 630 : 440;
				let boxCancel = Handler.showImgRect(self.windGr, Consts.DIR_PUZZLE + "cross_box.png",xBoxCancel,yBoxCancel,30,30);
				boxCancel.interactive = true;
				boxCancel.buttonMode = true;
				boxCancel.on("pointerdown",function(){ self.deselectChars(); });
				
				if ( isMobile ) { 
					self.windGr.scale.set( 0.98 );
					self.windGr.x += 6;
					self.windGr.y += 10;
				};
			};
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_PUZZLE ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_PUZZLE] = 1;
				let listOfImages = [
					"winds/puzzle/mWindPuzzleAngle.png",
					"winds/puzzle/mWindPuzzleSide.png",
					"winds/puzzle/windImgPuzzleAngle.png",
					"winds/puzzle/windImgPuzzleSide.png",
					"winds/puzzle/crossWindPuzzle.png",
					"winds/puzzle/char_box.png",
					"winds/puzzle/angle1.png",
					"winds/puzzle/angle2.png",
					"winds/puzzle/angle3.png",
					"winds/puzzle/angle4.png",
					"winds/puzzle/centre.png",
					"winds/puzzle/side1.png",
					"winds/puzzle/side2.png",
					"winds/puzzle/side3.png",
					"winds/puzzle/side4.png"
				];
				for ( let i = 0; i <= 32; i++){
					listOfImages.push("winds/puzzle/char/c"+i+'.png');
				};
				let nameTitle = isMobile ? "winds/puzzle/title_puzl_mob2.png"  : "winds/puzzle/title_puzl.png";
				if ( isMobile ) listOfImages.push("winds/puzzle/title_puzl_mob1.png");
				listOfImages.push(nameTitle);
				ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		return self.mainGroup;
	};
	
	CWindPuzzle.deselectChars = function() {
		let self = this;
        for ( let i=0; i<self.selectedChars.length; i++ ) {
			if ( self.selectedChars[i] == null ) continue;
            Handler.transition_to( self.selectedChars[i], { time:100, x:self.charOldX[i], y:self.charOldY[i], width : self.charImgW, height : self.charImgH } );
			self.selectedChars[i].selected = false;
        };

		self.selectedChars = [];
        self.countSelChars = 0;         
        self.strPob = "";     
    };
	
    CWindPuzzle.onCharClick = function(evt) {
		let self = this;
		if ( self.countOpened < 60 ) {
		    Winds.show( Winds.WIND_MSG, { text: Langs.NEED60_PUZ + self.countOpened } );
			return;
		}
		//txt  = '\n\nСначала нужно собрать 60 элементов пазла!';
		//txt += '\nВы собрали: '+(User.instance.puzzlenum % 81);
		
		const selChar = evt.target;
        if ( !selChar.selected && self.countSelChars != Handler.count(self.arrayBox) ) {
            selChar.selected = true;

            if ( self.countSelChars < self.word.length ) {
                self.selectedChars[ self.countSelChars ] = selChar;         
                self.charOldX[ self.countSelChars ] = selChar.x;         
                self.charOldY[ self.countSelChars ] = selChar.y;         

                let fx = self.arrayBox[ self.countSelChars ].x;         
                let fy = self.arrayBox[ self.countSelChars ].y;         

                selChar.toFront();         

                //Handler.transition_to( selChar, { time:250, x:fx, y:fy, width:30, height:30 } );    
                //Handler.transition_to( selChar, { time:250, x:fx, y:fy, width:40, height:40 } );    
                Handler.transition_to( selChar, { time:250, x:fx, y:fy } );    
				
                self.strPob = self.strPob + self.arrayWord[ selChar.num ];         
				self.countSelChars = self.countSelChars + 1;
            };         

            if ( self.countSelChars == self.word.length ) {
                if ( self.strPob == self.word ) {
                    self.shutdown();

				    const asked = function( res ) {
		            	//Head.instance.coins 	= res['coins'];
		            	Head.exp       = res['exp'];
		            	Head.energy    = res['energy_v'];
		            	Head.bonus 	   = res['energy_u'];
		            	User.puzzleprz = res['puzzleprz'];
		            	User.puzzlenum = res['puzzlenum'];
		            	
						const showMsgGoodWord = function() {
					        Winds.show( Winds.WIND_MSG, { text : Langs.WORD_IS_COLLECTED, butName : "butClose" } ); 
					    }; 
                        Handler.timer_performWithDelay( 250, showMsgGoodWord, 1 );
		            	//+25 ENERGY 
		            }
					BackClient.ask( BackClient.GET_PUZ_PRZ, asked );
                } else {
                    const showMsgBadWord = function() {
                        Winds.show( Winds.WIND_MSG, { text : Langs.WRONG_WORD, butName : "butClose" });
                        self.deselectChars();
                    };
                    Handler.timer_performWithDelay( 250, showMsgBadWord, 1 );
                };
            };
        };
    };
	
	CWindPuzzle.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindPuzzle;