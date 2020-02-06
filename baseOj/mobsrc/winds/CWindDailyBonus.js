	
	"use strict";
	
	let CWindDailyBonus = {};
	
	CWindDailyBonus.newObject = function() {
		this.wind = {};
		return this;
	};
	
	CWindDailyBonus.startup = function( params ) {
		let self = this;
		self.mainGroup = Handler.newGroup();
		self.mainGroup.x = Handler.contentCenterX;
		self.mainGroup.y = Handler.contentCenterY;
		let day = params.num_day;
		//backgroud
		let nameBackgr = isMobile ? "backgrDailyBonusMob.png" : "backgrDailyBonus.png";
		let wBackrgr = isMobile ? 456 : 662;
		let hBackrgr = isMobile ? 709 : 518;
		let backgr = Handler.showImgRect(self.mainGroup, nameBackgr,0,0,wBackrgr,hBackrgr);
		//cross
		let xCross = isMobile ?  210 : 310;
		let yCross = isMobile ? -330 : -238;
		let cross = Handler.showImgRect(self.mainGroup, "cross.png",xCross, yCross,36,36);
		let touchCross = function(evt) {
			self.shutdown();
		};
		cross.onEL("pointertap",touchCross);
		//stars
		if ( !isMobile ) {
			let starArray = [];
			let starKor_X = [ -240,-98, 80, 285,-190];
			let starKor_Y = [ -130,-80,-90,-115,210];

			for (let i = 0;  i  <= starKor_X.length-1; i++) {
				let star = Handler.showImgRect( self.mainGroup, "star.png", starKor_X[i], starKor_Y[i], 40, 39);
				TweenMax.to( star, Consts.TIME_ROT_START/1000, { angle: 90 , repeat: -1, ease: Power0.easeNone, yoyo: true } );
			};
		};
		//title
		let titleName = isMobile ? "lableDailyBonusMob.png" : "lableDailyBonus.png";
		let wTitle  = isMobile  ?  415 :  532;
		let hTitle  = isMobile  ?   46 :  107;
		let yTitile = isMobile  ? -300 : -150;
		Handler.showImgRect(self.mainGroup,titleName,0,yTitile,wTitle,hTitle);
		//bonus
		
		if ( isMobile ) { 
			let xBonCard = 0;
			let yBonCard = -195;
			for ( let i = 1; i <= 3; i++ ) {
				//создание карточки бонуса
				let grCard = Handler.newGroup( self.mainGroup );
				grCard.x = xBonCard;
				let shYCard = 175;
				grCard.y = yBonCard+((i-1)*shYCard);
				if ( day != i  ) {
					grCard.alpha = 0.5;
                    let filterBlackAndWhite = new PIXI.filters.ColorMatrixFilter();
                    filterBlackAndWhite.blackAndWhite( true );
                    grCard.filters = [filterBlackAndWhite];
				}
				//backgr
				Handler.showImgRect( grCard,"backgrBonDailyBonusMob.png",0,0,384,164 );
				
				//1 бонус
				if ( i == 1 ) {
					let grImgBon1 = Handler.newGroup( grCard );
					//относительно grCard
					let xImgIgnots = [ 130, 18, -96];
					let yImgIgnots = [ -40,  0,  40];
					for( let j = 0; j <= 3; j++ ) {
						if ( day == i  ) {
							let luch1 = Handler.showImgRect( grImgBon1,"luch.png",xImgIgnots[j],yImgIgnots[j],160,160);
							luch1.alpha = 0.1;
							let luch2 = Handler.showImgRect( grImgBon1,"luch.png",xImgIgnots[j],yImgIgnots[j],160,160);
							luch2.alpha = 0.1;
							TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
							TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
						};
						
						Handler.showImgRect( grImgBon1,"enBon1DailyBonusMob.png",xImgIgnots[j],yImgIgnots[j],110,63 );
					}
				} else {
					if ( day == i  ) {
						let luch1 = Handler.showImgRect( grCard,"luch.png", 100,0,180,180);
						luch1.alpha = 0.1;
						let luch2 = Handler.showImgRect( grCard,"luch.png", 100,0,180,180);
						luch2.alpha = 0.1;
						TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
						TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
					};
					Handler.showImg( grCard,"enBon"+ i +"DailyBonusMob.png", 100, 0 );
				};
				
				//lableBon1MobDailyBonus
				let xLableBon = [ null, 95, -70, -70 ];
				Handler.showImgRect( grCard,"lableBon"+i+"MobDailyBonus.png",xLableBon[i],35, 180, 85 );
				//labelDay
				let yLableDay = -245;
				Handler.showImgRect( self.mainGroup,'lableDay'+i+'DailyBonusMob.png', -110, yLableDay+((i-1)*shYCard), 141, 39 );
				//не добавил потому, что не должен менять альфу
			}	
		} else {
			let xBon = -200;
			let yBon =   50;
			for ( let i = 1; i <= 3; i++ ) {
				let hBackgrBon = isMobile ? 185 : 231;
				Handler.showImgRect(self.mainGroup,"backgrBonDailyBonus.png",xBon,yBon,186,hBackgrBon);
				let luch1 = Handler.showImgRect(self.mainGroup,"luch.png",xBon,yBon,229,229);
				luch1.alpha = 0.35;
				let luch2 = Handler.showImgRect(self.mainGroup,"luch.png",xBon,yBon,229,229);
				luch2.alpha = 0.35;
				TweenMax.to( luch1 , 10 ,{ angle: 360 , repeat: -1, ease: Power0.easeNone } );	
				TweenMax.to( luch2 , 10 ,{ angle: -360 , repeat: -1, ease: Power0.easeNone });
				let vkl = "disBon";
				let bon3 = null;
				if ( day == i  ) vkl = "enBon";
		
				let bon = Handler.showImg(self.mainGroup,vkl+i+"DailyBonus.png",xBon,yBon);
				if ( !isMobile ) {
					bon.width /= 2;
					bon.height /= 2;
				};
				xBon += 200;
			};
		};
		
		
		//lableComeInEvrDay
		if ( isMobile ) {
			Handler.showImgRect(self.mainGroup, "lableComeInEvrDay.png", 0, 275,413, 56,);
		}
 		//TellFr
		let xCheckBox = isMobile ?  -95 :  95;
		let yCheckBox = isMobile ?  320	: 215;
		let xMark     = isMobile ?  -90 : 100;
		let yMark     = isMobile ?  317 : 213;
		
		let checkBox = Handler.showImgRect(self.mainGroup, "checkBoxDailyBonus.png", xCheckBox, yCheckBox, 19,19);
		
		this.checkMark = Handler.showImgRect(self.mainGroup, "markerDailyBonus.png", xMark, yMark, 29,23);
		this.checkMark.isVisible = false;
		let onCheckBox = function(evt) {
			if ( self.checkMark.isVisible ) {
				self.checkMark.isVisible = false;
			} else {
				self.checkMark.isVisible = true;
			};
		};
		checkBox.onEL("pointertap", onCheckBox);
		
		let nameLableTellFr = isMobile ? "lableTellFrDailyBonusMob.png" : "lableTellFrDailyBonus.png";
		let wLableTellFr    = isMobile ? 284 : 196;
		let hLableTellFr    = isMobile ?  25 :  17;
		let xLableTellFr    = isMobile ?  64 : 210;
		let yLableTellFr    = isMobile ? 320 : 218;
		Handler.showImgRect( self.mainGroup, nameLableTellFr, xLableTellFr, yLableTellFr, wLableTellFr, hLableTellFr );
		
		self.mainGroup.interactive = true;
		return self.mainGroup;
	};
	
	CWindDailyBonus.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( this.checkMark.isVisible ) {
				let txt = "Заходите каждый день в игру и получайте бонусы!";
				let imgUrl = Config.BASE_URL + "wall492x364.jpg";
				SocialClient.MediaTopicPost( txt, imgUrl );
			}
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup );
			};
  		};
	};

	//return CWindDailyBonus;