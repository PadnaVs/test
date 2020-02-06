	
	"use strict";
	
	let TaskPanel = {};
	
	TaskPanel.init = function( parentGroup ){
		try {
			let self = this;
			this.numLevel
			this.parent = parentGroup;
			this.group = Handler.newGroup( this.parent );
			this.numLevel = Math.floor( Head.levelName.substr(1) );
			this.gt = GameTypes.info[this.numLevel];
			this.countTasks = [];
			this.countVisibleTask = 0;
			this.currentCountTask = [null,0,0,0,0,0,0,0,0,0];
			//заполнение массива заданий.
			for( let i = 9; i >= 1; --i ){
				if ( isMobile && i <= 5 && i >= 1 ){
					if ( Handler.mobileTask[i] ) {
						this.countTasks[i] = Handler.mobileTask[i];
						this.countVisibleTask++;
					}  else {
						this.countTasks[i] = 0;
					};
				} else if ( this.gt['g'+i] ) {
					this.countTasks[i] = this.gt['g'+i];
					this.countVisibleTask++;
				} else {
					this.countTasks[i] = 0;
				};
			};
			
			console.log('this.countTasks',this.countTasks);
			let xBackgrTasks = isMobile ?      0 : -322;
			let yBackgrTasks = isMobile ?   -312 :  -75;
			
			let nameBackgr = isMobile ? "taskPanelMobOj.png" : "panelTasks"+this.countVisibleTask+"WindGame.png";
			this.backgrTasks = Handler.showImg( this.group, nameBackgr, xBackgrTasks, yBackgrTasks );
			if ( !isMobile ) {
				this.backgrTasks.width = this.backgrTasks.width/2;
				this.backgrTasks.height = this.backgrTasks.height/2;
				this.backgrTasks.anchor.set ( 0.5, 0 );
			};
			//if (isMobile) { this.backgrTasks.angle = 90; this.backgrTasks.anchor.set ( 0, 1 ) };
			
			this.groupsTasks = [];
			let shYGrTask = -47;
			let xObjTask = isMobile ? 17 : 28;
			let xGalka = isMobile ? -10 : -7;
			if ( this.countVisibleTask > 5 ) shYGrTask = -50;
			for( let i = 1; i < this.countTasks.length; i++ ){
				if( this.countTasks[i] != 0 ) {
					this.groupsTasks[i] = Handler.newGroup( this.group );
					Handler.showImgRect( this.groupsTasks[i], "taskBackgrWindGame.png", 0, 0,65,36);
					let k = i == 9 ? 5 : 0;
					let imgObjTask = Handler.showImg(this.groupsTasks[i], "objTask"+ (i-k) +".png", xObjTask, -1);
					if ( i == 9 ){
						TweenMax.to( imgObjTask, 0.7, { alpha: 0.5, yoyo: true, repeat: -1, ease: Power0.easeNone });
					};
					if ( !isMobile ) {
						imgObjTask.width = imgObjTask.width/2;
						imgObjTask.height = imgObjTask.height/2;
					}
					//кол-во заданий
					if (isMobile){
						this.showNumberMobile( i, this.countTasks[i] );
					} else {
						this.groupsTasks[i].sl = Handler.showImgRect( this.groupsTasks[i], 'bySl.png', -11, -2, 8, 16 );
						this.groupsTasks[i].taskNum = Handler.showNumber( "by", this.groupsTasks[i].sl.x+7, -2, this.countTasks[i], 13, 16, this.groupsTasks[i], '', 5 );
						this.showNumber( i, 0 );
					}
					this.groupsTasks[i].galka = Handler.showImgRect( this.groupsTasks[i], 'markerWindGame.png', xGalka, -2, 39, 31 );
					this.groupsTasks[i].galka.isVisible = false; 
	
					this.groupsTasks[i].x = -325;
					this.groupsTasks[i].y =  shYGrTask;
					shYGrTask += this.groupsTasks[i].height+3; 
				} else {
					this.groupsTasks[i] = null;
				};            
			};
			if ( isMobile ) {
				//let xMobileTask = [ -156,-156, -81, -81, -6, -6, 120];
				//let yMobileTask = [ -337,-296,-337,-296,-337,-296,-337];
				let k = 0;
				for ( let i = 0; i <= 9; i++ ) {
					if (this.groupsTasks[i] != null) {
						let xMobileTask = 150 + 70*k;
						self.groupsTasks[i].x += xMobileTask;
						self.groupsTasks[i].y = -326;
						k++;
					}
				}
				self.group.y -= ( visibleHeight - visibleHeight0 ) * 0.48 + 12;
				//self.group.x += 1;
			}
			return this;
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};
	
	TaskPanel.showNumber = function( numTask, count ) {
		this.currentCountTask[numTask] = count;
		if ( this.groupsTasks[numTask].currentCountTask ) {
			this.groupsTasks[numTask].currentCountTask.destroy();
		};
		this.groupsTasks[numTask].currentCountTask = Handler.showNumber( "by", 0,0, this.currentCountTask[numTask], 13, 16, this.groupsTasks[numTask], '', 5 );
		let img = this.groupsTasks[numTask].currentCountTask;
		img.translate( this.groupsTasks[numTask].sl.x - img.width + 6, this.groupsTasks[numTask].sl.y );
		return this;
	};
	
	TaskPanel.showNumberMobile = function( numTask, count ) {
		if ( this.groupsTasks[numTask].currentCountTask ) {
			this.groupsTasks[numTask].currentCountTask.text = count;
		} else {
			let style = { parent: this.groupsTasks[numTask], 
						  x:-15, 
						  y:-15, 
						  text: count };
			style.fontSize = 22;
			style.color = 0x5c2101;
			style.stroke = 0xeffeab;
			style.strokeThickness = 4;
			this.groupsTasks[numTask].currentCountTask = Handler.newText(style);  //JSJump????
			this.groupsTasks[numTask].currentCountTask.anchor.set(0.5,0);
		};
		return this;
	};
	
	TaskPanel.refrashGems = function( num, count=1 ) {
		try {
			if ( this.groupsTasks[num] ) {
				if ( !num && num < 0 || num > 9 ) return;
				if ( parseInt(this.gt['g'+num]) == 0 ) return;		
				//1
				if ( isMobile ) {
					if ( this.countTasks[num] > 0 ) {
						this.countTasks[num] -= count;
						this.showNumberMobile( num, this.countTasks[num] );
						if ( this.countTasks[num] == 0 ) {
							this.groupsTasks[num].currentCountTask.visible = false;
							this.groupsTasks[num].galka.isVisible = true;
						}
					};
				} else {
					this.currentCountTask[num] += count;
					if ( this.countTasks[num] != 0) {
							this.showNumber( num, this.currentCountTask[num] );
						if ( this.currentCountTask[num] >= this.countTasks[num] ) {
							this.groupsTasks[ num ].sl.isVisible = false;
							this.groupsTasks[num].currentCountTask.isVisible = false;
							this.groupsTasks[num].taskNum.isVisible = false;
							this.groupsTasks[num].galka.isVisible = true;
						};
					};
				};
			};
		} catch ( ex ) {
			 Handler.onErrorCatched(ex);
		};
	};