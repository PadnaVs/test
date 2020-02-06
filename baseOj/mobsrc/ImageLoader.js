	
	ImageLoader = {};
	ImageLoader.urlTiny = "imagesTiny";
	ImageLoader.urlTinyHalf = "imagesTinyHalf";
	ImageLoader.baseUrl = isMobile ? ImageLoader.urlTinyHalf : ImageLoader.urlTiny;
	
	ImageLoader.loadAssets = function( onAssetsLoaded, listOfImages ) {
        let self = this;
		
		listOfImages.forEach( (iu)=>{ pixiApp.loader.add( this.baseUrl+'/'+iu, this.baseUrl+'/'+iu ); });

		pixiApp.loader.load( onAssetsLoaded );
    };
	
	ImageLoader.loadGo = function(onAssetsLoaded) {
		
		let onProgress = function(e) {
			console.log(e)
		};
		pixiApp.loader.on('onLoad', onProgress);
		//load all fonts;
		for ( let i = 0; i <= 9; i++ ){
			pixiApp.loader.add('wb'  +i+'.png',   ImageLoader.baseUrl+'/fonts/wb'+i+'.png');
			pixiApp.loader.add('w'   +i+'.png',   ImageLoader.baseUrl+'/fonts/w'+i+'.png');
			pixiApp.loader.add('ry'  +i+'.png',   ImageLoader.baseUrl+'/fonts/ry'+i+'.png');
			pixiApp.loader.add('by'  +i+'.png',   ImageLoader.baseUrl+'/fonts/by'+i+'.png');
			pixiApp.loader.add('wr'  +i+'.png',   ImageLoader.baseUrl+'/fonts/wr'+i+'.png');
			pixiApp.loader.add('wg'  +i+'.png',   ImageLoader.baseUrl+'/fonts/wg'+i+'.png');
			pixiApp.loader.add('swb' +i+'.png',   ImageLoader.baseUrl+'/fonts/swb'+i+'.png');
			pixiApp.loader.add('yb'  +i+'.png',   ImageLoader.baseUrl+'/fonts/yb'+i+'.png');
			pixiApp.loader.add('bby' +i+'.png',   ImageLoader.baseUrl+'/fonts/bby'+i+'.png');
			pixiApp.loader.add('ow'  +i+'.png',   ImageLoader.baseUrl+'/fonts/ow'+i+'.png');
			pixiApp.loader.add('o'   +i+'.png',   ImageLoader.baseUrl+'/fonts/o'+i+'.png');
			pixiApp.loader.add('owf' +i+'.png',   ImageLoader.baseUrl+'/fonts/owf'+i+'.png');//везде 2ной размер
		};
		pixiApp.loader.add('bySl.png',  ImageLoader.baseUrl+'/fonts/bySl.png');
		pixiApp.loader.add('owfX.png',  ImageLoader.baseUrl+'/fonts/owfX.png');
		pixiApp.loader.add('cross.png', ImageLoader.baseUrl+'/cross.png');
		pixiApp.loader.add('luch.png',  ImageLoader.baseUrl+'/luch.png');
		pixiApp.loader.add('star.png',  ImageLoader.baseUrl+'/star.png');
		if ( isMobile ) {
			pixiApp.loader.add('mobBack.png',     ImageLoader.baseUrl+'/mobBack.png');
			pixiApp.loader.add('mobBackBig.png',  ImageLoader.baseUrl+'/mobBackBig.png');
			pixiApp.loader.add('mobBackThin.png', ImageLoader.baseUrl+'/mobBackThin.png');
			pixiApp.loader.add('mobBackHight.png', ImageLoader.baseUrl+'/mobBackHight.png');
			pixiApp.loader.add('headMobBack.png',  ImageLoader.baseUrl+'/headMobBack.png');
		};
		//-----------CWindLoading------------------
		
		//----------------------------------------------------
		//-----------CWindBuyCoins----------------------------
		//----------------------------------------------------
//		let urlWindBuyCoins = ImageLoader.baseUrl+"/winds/buyCoins";
//	    pixiApp.loader.add('backgrBuyCoins.png', urlWindBuyCoins+'/backgrBuyCoins.png');
// pixiApp.loader.add('butBuy.png',         urlWindBuyCoins+'/butBuy.png');
//	    
//	    pixiApp.loader.add('lableBuyIgnots.png', urlWindBuyCoins+'/lableBuyIgnots.png');
//	    for ( let i = 1; i <= 6; i++){
//			pixiApp.loader.add('line'+i+'.png',  urlWindBuyCoins+'/line'+i+'.png');
//		};
		//----------------------------------------------------
		//-----------CWindBuyBooster----------------------------
		//----------------------------------------------------
//	    let urlWindBuyBooster = ImageLoader.baseUrl+"/winds/buyBooster";
//	    pixiApp.loader.add('crossWindBuyBooster.png',    urlWindBuyBooster+'/crossWindBuyBooster.png');
//	    pixiApp.loader.add('but.png',                    urlWindBuyBooster+'/but.png');
//	    pixiApp.loader.add('bMT.png',                    urlWindBuyBooster+'/bMT.png');
//	    pixiApp.loader.add('bMX.png',                    urlWindBuyBooster+'/bMX.png');
//	    pixiApp.loader.add('bPL.png',                    urlWindBuyBooster+'/bPL.png');
//	    pixiApp.loader.add('star.png',                   urlWindBuyBooster+'/star.png');
//	    pixiApp.loader.add('price1.png',                 urlWindBuyBooster+'/price1.png');
//	    pixiApp.loader.add('price2.png',                 urlWindBuyBooster+'/price2.png');
//	    pixiApp.loader.add('price3.png',                 urlWindBuyBooster+'/price3.png');
//	    pixiApp.loader.add('angleWindBuyBooster.png',    urlWindBuyBooster+'/angleWindBuyBooster.png');
//	    pixiApp.loader.add('animBackgr.png',             urlWindBuyBooster+'/animBackgr.png');
//	    pixiApp.loader.add('sideWindBuyBooster.png',     urlWindBuyBooster+'/sideWindBuyBooster.png');
		
		
		//----------------------------------------------------
		//-----------CWindPuzzle------------------------------
		//----------------------------------------------------
		//let urlWindPuzzle = ImageLoader.baseUrl+"/winds/puzzle";
		//pixiApp.loader.add('angle1.png',   urlWindPuzzle+'/angle1.png');
		//pixiApp.loader.add('angle2.png',   urlWindPuzzle+'/angle2.png');
		//pixiApp.loader.add('angle3.png',   urlWindPuzzle+'/angle3.png');
		//pixiApp.loader.add('angle4.png',   urlWindPuzzle+'/angle4.png');
		//pixiApp.loader.add('centre.png',   urlWindPuzzle+'/centre.png');
		//pixiApp.loader.add('side1.png',    urlWindPuzzle+'/side1.png');
		//pixiApp.loader.add('side2.png',    urlWindPuzzle+'/side2.png');
		//pixiApp.loader.add('side3.png',    urlWindPuzzle+'/side3.png');
		//pixiApp.loader.add('side4.png',    urlWindPuzzle+'/side4.png');
		
//		pixiApp.loader.add('mWindPuzzleAngle.png',   urlWindPuzzle+'/mWindPuzzleAngle.png');
//		pixiApp.loader.add('mWindPuzzleSide.png',    urlWindPuzzle+'/mWindPuzzleSide.png');
//		pixiApp.loader.add('windImgPuzzleAngle.png', urlWindPuzzle+'/windImgPuzzleAngle.png');
//		pixiApp.loader.add('windImgPuzzleSide.png',  urlWindPuzzle+'/windImgPuzzleSide.png');
//		pixiApp.loader.add('char_box.png',           urlWindPuzzle+'/char_box.png');
//		pixiApp.loader.add('crossWindPuzzle.png',    urlWindPuzzle+'/crossWindPuzzle.png');
//		pixiApp.loader.add('but_ask_fr.png',         urlWindPuzzle+'/but_ask_fr.png');
//		pixiApp.loader.add('cross_box.png',          urlWindPuzzle+'/cross_box.png');
//		pixiApp.loader.add('title_puzl.png',         urlWindPuzzle+'/title_puzl.png');
//		for ( let i = 0; i <= 32; i++){
//			pixiApp.loader.add('c'+i+'.png',         urlWindPuzzle+'/char/c'+i+'.png');
//		};		
		//----------------------------------------------------
		//-----------CWindBeforeLevel-------------------------
		//----------------------------------------------------
		let urlWindBeforeLevel = ImageLoader.baseUrl+"/winds/beforeLevel/";
		pixiApp.loader.add('arrowDown.png',            urlWindBeforeLevel+'arrowDown.png');
		pixiApp.loader.add('arrowUp.png',              urlWindBeforeLevel+'arrowUp.png');		
		pixiApp.loader.add('backgrButPlay.png',        urlWindBeforeLevel+'backgrButPlay.png');
		pixiApp.loader.add('backgrObjTask.png',        urlWindBeforeLevel+'backgrObjTask.png');
		pixiApp.loader.add('backgrUserCard.png',       urlWindBeforeLevel+'backgrUserCard.png');
		pixiApp.loader.add('backgrUsers.png',          urlWindBeforeLevel+'backgrUsers.png');
		pixiApp.loader.add('backgrWindR.png',          urlWindBeforeLevel+'backgrWindR.png');		
		pixiApp.loader.add('butGivGift.png',           urlWindBeforeLevel+'butGivGift.png');
		pixiApp.loader.add('butInviteFr.png',          urlWindBeforeLevel+'butInviteFr.png');
		pixiApp.loader.add('lableBuyBons.png',         urlWindBeforeLevel+'lableBuyBons.png');
		pixiApp.loader.add('lableLevel.png',           urlWindBeforeLevel+'lableLevel.png');
		pixiApp.loader.add('lableTask1.png',           urlWindBeforeLevel+'lableTask1.png');
		pixiApp.loader.add('lableTask2.png',           urlWindBeforeLevel+'lableTask2.png');
		pixiApp.loader.add('lableTask3.png',           urlWindBeforeLevel+'lableTask3.png');
		pixiApp.loader.add('lableTask4.png',           urlWindBeforeLevel+'lableTask4.png');
		pixiApp.loader.add('lableTasks.png',           urlWindBeforeLevel+'lableTasks.png');
		pixiApp.loader.add('markerTask.png',           urlWindBeforeLevel+'markerTask.png');
		pixiApp.loader.add('mask.png',                 urlWindBeforeLevel+'mask.png');
		pixiApp.loader.add('objTask1.png',             urlWindBeforeLevel+'objTask1.png');
		pixiApp.loader.add('objTask2.png',             urlWindBeforeLevel+'objTask2.png');
		pixiApp.loader.add('objTask3.png',             urlWindBeforeLevel+'objTask3.png');
		pixiApp.loader.add('objTask4.png',             urlWindBeforeLevel+'objTask4.png');
		pixiApp.loader.add('objTask5.png',             urlWindBeforeLevel+'objTask5.png');
		pixiApp.loader.add('objTask6.png',             urlWindBeforeLevel+'objTask6.png');
		pixiApp.loader.add('objTask7.png',             urlWindBeforeLevel+'objTask7.png');
		pixiApp.loader.add('objTask8.png',             urlWindBeforeLevel+'objTask8.png');
		pixiApp.loader.add('plusBon.png',              urlWindBeforeLevel+'plusBon.png');
		pixiApp.loader.add('starPoints.png',           urlWindBeforeLevel+'starPoints.png');
		if ( isMobile ) {
			pixiApp.loader.add('butPlayMob.png',         urlWindBeforeLevel+'butPlayMob.png');
			pixiApp.loader.add('backgrTasksMob.png',     urlWindBeforeLevel+'backgrTasksMob.png');
			pixiApp.loader.add('backgrBonsMob.png',      urlWindBeforeLevel+'backgrBonsMob.png');
			pixiApp.loader.add('butRtBeforeLevel.png',   urlWindBeforeLevel+'butRtBeforeLevel.png');
			pixiApp.loader.add('lable5Lives.png',        urlWindBeforeLevel+'lable5Lives.png');
			pixiApp.loader.add('lableLivesEndedMob.png', urlWindBeforeLevel+'lableLivesEndedMob.png');
			pixiApp.loader.add('butContinueMob.png',     urlWindBeforeLevel+'butContinueMob.png');
		} else {
			pixiApp.loader.add('butPlay.png',           urlWindBeforeLevel+'butPlay.png');
			pixiApp.loader.add('backgrTasks.png',       urlWindBeforeLevel+'backgrTasks.png');
			pixiApp.loader.add('backgrBons.png',        urlWindBeforeLevel+'backgrBons.png');
			pixiApp.loader.add('backgrButContinue.png', urlWindBeforeLevel+'backgrButContinue.png');
			pixiApp.loader.add('butContinue.png',       urlWindBeforeLevel+'butContinue.png');
			pixiApp.loader.add('disbon0.png',              urlWindBeforeLevel+'disbon0.png');
			pixiApp.loader.add('disbon1.png',              urlWindBeforeLevel+'disbon1.png');
			pixiApp.loader.add('disbon5.png',              urlWindBeforeLevel+'disbon5.png');
			pixiApp.loader.add('backgrWindM.png',          urlWindBeforeLevel+'backgrWindM.png');
		};
		//----------------------------------------------------
		//---------------CWindEndLevel------------------------
		//----------------------------------------------------
		let urlWindEndLevel = ImageLoader.baseUrl+"/winds/endLevel/";
		
		pixiApp.loader.add('starRt1.png',                   urlWindEndLevel+'starRt1.png');	
		pixiApp.loader.add('starRt2.png',                   urlWindEndLevel+'starRt2.png');						
		pixiApp.loader.add('marker.png',                    urlWindEndLevel+'marker.png');				
		pixiApp.loader.add('lableWindEndLevel.png',         urlWindEndLevel+'lableWindEndLevel.png');				
		pixiApp.loader.add('lableWinEndLevel.png',          urlWindEndLevel+'lableWinEndLevel.png');	
		pixiApp.loader.add('fieldPoint.png',                urlWindEndLevel+'fieldPoint.png');	
		pixiApp.loader.add('fieldIgnots.png',               urlWindEndLevel+'fieldIgnots.png');		
		pixiApp.loader.add('checkBox.png',                  urlWindEndLevel+'checkBox.png');		
		pixiApp.loader.add('backgrStarRt2.png',             urlWindEndLevel+'backgrStarRt2.png');
		pixiApp.loader.add('backgrStarRt1.png',             urlWindEndLevel+'backgrStarRt1.png');
		pixiApp.loader.add('backgrPuzzleElem.png',          urlWindEndLevel+'backgrPuzzleElem.png');
		pixiApp.loader.add('butContinueEndLevelMob.png',    urlWindEndLevel+'butContinueEndLevelMob.png');
		if ( isMobile ) {
			pixiApp.loader.add('lableTellFrEndLevelMob.png',    urlWindEndLevel+'lableTellFrEndLevelMob.png');	
			pixiApp.loader.add('butShowRatingEndLevelMob.png',  urlWindEndLevel+'butShowRatingEndLevelMob.png');
			pixiApp.loader.add('butShowPuzzleMob.png',          urlWindEndLevel+'butShowPuzzleMob.png');
			pixiApp.loader.add('lablePuzzleNewElemMob.png',     urlWindEndLevel+'lablePuzzleNewElemMob.png');
			pixiApp.loader.add('lableGetPrizeMob.png',          urlWindEndLevel+'lableGetPrizeMob.png');			
		} else {
			pixiApp.loader.add('backgrEndLevelWindP.png',       urlWindEndLevel+'backgrEndLevelWindP.png');
			pixiApp.loader.add('lableIgnots.png',               urlWindEndLevel+'lableIgnots.png');	
			pixiApp.loader.add('lablePointsEndLevel.png',       urlWindEndLevel+'lablePointsEndLevel.png');	
			pixiApp.loader.add('backgrButContinueEndLevel.png', urlWindEndLevel+'backgrButContinueEndLevel.png');	
			pixiApp.loader.add('backgrEndLevelWindM.png',       urlWindEndLevel+'backgrEndLevelWindM.png');
			pixiApp.loader.add('lableTellFrEndLevel.png',       urlWindEndLevel+'lableTellFrEndLevel.png');
			pixiApp.loader.add('lablePuzzleNewElem.png',        urlWindEndLevel+'lablePuzzleNewElem.png');
			pixiApp.loader.add('lableGetPrize.png',             urlWindEndLevel+'lableGetPrize.png');
			pixiApp.loader.add('butShowPuzzle.png',             urlWindEndLevel+'butShowPuzzle.png');	
			pixiApp.loader.add('butContinueEndLevel.png',       urlWindEndLevel+'butContinueEndLevel.png');
		};
		//----------------------------------------------------
		//---------------CWindBuyLives------------------------
		//----------------------------------------------------
//		let urlWindBuyLives = ImageLoader.baseUrl+"/winds/buyLives/";
//		pixiApp.loader.add('backgrBuyLives.png',  urlWindBuyLives+'backgrBuyLives.png');
//		pixiApp.loader.add('butBuyWindLives.png', urlWindBuyLives+'butBuyWindLives.png');
//		pixiApp.loader.add('lableBuyLives.png',   urlWindBuyLives+'lableBuyLives.png');
//		pixiApp.loader.add('line1BuyLives.png',   urlWindBuyLives+'line1BuyLives.png');
//		pixiApp.loader.add('line2BuyLives.png',   urlWindBuyLives+'line2BuyLives.png');
//		pixiApp.loader.add('line3BuyLives.png',   urlWindBuyLives+'line3BuyLives.png');
//		pixiApp.loader.add('line4BuyLives.png',   urlWindBuyLives+'line4BuyLives.png');
//		pixiApp.loader.add('line5BuyLives.png',   urlWindBuyLives+'line5BuyLives.png');
//		pixiApp.loader.add('line6BuyLives.png',   urlWindBuyLives+'line6BuyLives.png');
		//----------------------------------------------------
		//---------------Head----------------------
		//----------------------------------------------------
		let urlHead = ImageLoader.baseUrl+"/head/";
		pixiApp.loader.add('boxId.png',                   urlHead+'boxId.png');
		pixiApp.loader.add('butFullScrin.png',            urlHead+'butFullScrin.png');
		pixiApp.loader.add('butMute.png',                 urlHead+'butMute.png');
		pixiApp.loader.add('butMute2.png',                urlHead+'butMute2.png');
		pixiApp.loader.add('butMyScore.png',              urlHead+'butMyScore.png');
		pixiApp.loader.add('butPlayWindMenuLevels.png',   urlHead+'butPlayWindMenuLevels.png');
		pixiApp.loader.add('backgrTimer.png',             urlHead+'backgrTimer.png');
		pixiApp.loader.add('panelMoney.png',              urlHead+'panelMoney.png');
		pixiApp.loader.add('panelLives.png',              urlHead+'panelLives.png');
		//----------------------------------------------------
		//---------------CWindMenuLevels----------------------
		//----------------------------------------------------
		let urlWindMenuLevels = ImageLoader.baseUrl+"/winds/menuLevels/";
		pixiApp.loader.add('arrowLastYourLevel.png',      urlWindMenuLevels+'arrowLastYourLevel.png');
		pixiApp.loader.add('butNextLoc.png',              urlWindMenuLevels+'butNextLoc.png');
		pixiApp.loader.add('butPreviousLoc.png',          urlWindMenuLevels+'butPreviousLoc.png');
		pixiApp.loader.add('backgrStarLevel.png',         urlWindMenuLevels+'backgrStarLevel.png');
		pixiApp.loader.add('cup.png',                     urlWindMenuLevels+'cup.png');
		pixiApp.loader.add('stand.png',                   urlWindMenuLevels+'stand.png');
		pixiApp.loader.add('pointNextLevel.png',          urlWindMenuLevels+'pointNextLevel.png');
		pixiApp.loader.add('winStarLevel.png',            urlWindMenuLevels+'winStarLevel.png');
		pixiApp.loader.add('backgroundLoading.png',       urlWindMenuLevels+'backgroundLoading.png');
		/*for( let i = 1; i <= 32; i++){
			pixiApp.loader.add('mBackgr'+i+'.png',        urlWindMenuLevels+'backgrounds/mBackgr'+i+'.png');
		}*/
		//------------------------------------------------------------
		//-----------------CBottomPanel-----------------------
		//------------------------------------------------------------
		if ( !isMobile ) {
			let urlBottomPanel = ImageLoader.baseUrl+"/bottomPanel/";
			pixiApp.loader.add('buttDoubleLeft.png',       urlBottomPanel+'buttDoubleLeft.png');
			pixiApp.loader.add('buttDoubleRight.png',      urlBottomPanel+'buttDoubleRight.png');
			pixiApp.loader.add('buttLeftBottomPanel.png',  urlBottomPanel+'buttLeftBottomPanel.png');
			pixiApp.loader.add('buttRightBottomPanel.png', urlBottomPanel+'buttRightBottomPanel.png');
			pixiApp.loader.add('fonInviteUser.png',        urlBottomPanel+'fonInviteUser.png');
			pixiApp.loader.add('fonUsersBottomPanel.png',  urlBottomPanel+'fonUsersBottomPanel.png');
			pixiApp.loader.add('mask1.jpg',                urlBottomPanel+'mask1.jpg');
			pixiApp.loader.add('tabFriend.png',            urlBottomPanel+'tabFriend.png');
			pixiApp.loader.add('tabRating.png',            urlBottomPanel+'tabRating.png');
			pixiApp.loader.add('tabRatingMoney.png',       urlBottomPanel+'tabRatingMoney.png');
		};
		//------------------------------------------------------------
		//-----------------CWindMyScore----------------------
		//------------------------------------------------------------
//		let urlMyScore = ImageLoader.baseUrl+"/winds/myScore/";
//		pixiApp.loader.add('backgrMyScore.png',       urlMyScore+'backgrMyScore.png');
//		pixiApp.loader.add('backgrUserWindMyScore.png',       urlMyScore+'backgrUserWindMyScore.png');
//		pixiApp.loader.add('backgrUserImgWindMyScore.png',       urlMyScore+'backgrUserImgWindMyScore.png');
//		pixiApp.loader.add('lableAllRt.png',       urlMyScore+'lableAllRt.png');
//		pixiApp.loader.add('lableVipRt.png',       urlMyScore+'lableVipRt.png');
//		pixiApp.loader.add('soon.png',       urlMyScore+'soon.png');	
//		pixiApp.loader.add('photoModel.jpg',       urlMyScore+'photoModel.jpg');	
		//------------------------------------------------------------
		//-----------------CWindAcBooster-------------------
		//------------------------------------------------------------
//		let urlACBooster = ImageLoader.baseUrl+"/winds/acBooster/";
//		pixiApp.loader.add('backgrAcBooster.png',       urlACBooster+'backgrAcBooster.png');	
//		pixiApp.loader.add('bon1AcBooster.png',           urlACBooster+'bon1AcBooster.png');	
//		pixiApp.loader.add('bon2AcBooster.png',       urlACBooster+'bon2AcBooster.png');	
//		pixiApp.loader.add('bon3AcBooster.png',       urlACBooster+'bon3AcBooster.png');	
//		pixiApp.loader.add('lable3BonAcBooster.png',       urlACBooster+'lable3BonAcBooster.png');	
//		pixiApp.loader.add('lableAcBooster.png',       urlACBooster+'lableAcBooster.png');	
//		pixiApp.loader.add('lableRushAcBooster.png',       urlACBooster+'lableRushAcBooster.png');	
//		pixiApp.loader.add('butBuyAcBooster.png',       urlACBooster+'butBuyAcBooster.png');	
		//------------------------------------------------------------
		//-----------------CWindAc4-------------------
		//------------------------------------------------------------
//		let urlAC4 = ImageLoader.baseUrl+"/winds/ac4/";
//		pixiApp.loader.add('backgrAc4.png',       urlAC4+'backgrAc4.png');	
//		pixiApp.loader.add('bon1Ac4.png',           urlAC4+'bon1Ac4.png');	
//		pixiApp.loader.add('bon2Ac4.png',       urlAC4+'bon2Ac4.png');	
//		pixiApp.loader.add('butBuyAc4.png',       urlAC4+'butBuyAc4.png');		
//		pixiApp.loader.add('lable3Hammer.png',       urlAC4+'lable3Hammer.png');	
//		pixiApp.loader.add('lable5Lives.png',       urlAC4+'lable5Lives.png');	
//		pixiApp.loader.add('lableAc4.png',       urlAC4+'lableAc4.png');	
//		pixiApp.loader.add('lableRuchAc4.png',       urlAC4+'lableRuchAc4.png');
		//------------------------------------------------------------
		//-----------------CWindAc5Steps-------------------
		//------------------------------------------------------------
//		let urlAc7Steps = ImageLoader.baseUrl+"/winds/ac5Steps/";
//		pixiApp.loader.add( 'backgrAc5Steps.png',       urlAc7Steps+'backgrAc5Steps.png' );	
//		pixiApp.loader.add( 'butBuyAc5Steps.png',           urlAc7Steps+'butBuyAc5Steps.png' );	
//		pixiApp.loader.add( 'lableSteps.png',       urlAc7Steps+'lableSteps.png' );
		//------------------------------------------------------------
		//-----------------CWindFrInvited-------------------
		//------------------------------------------------------------
		let urlAcFrInvited = ImageLoader.baseUrl+"/winds/frInvited/";
		if ( isMobile ) {
			pixiApp.loader.add( 'backgrSmollMob.png',         urlAcFrInvited+'backgrSmollMob.png'   );
			pixiApp.loader.add( 'bon100IgnotsMob.png',        urlAcFrInvited+'bon100IgnotsMob.png'  );
			pixiApp.loader.add( 'lableMidlineMob.png',        urlAcFrInvited+'lableMidlineMob.png'  );
			pixiApp.loader.add( 'lableTitleMob.png',          urlAcFrInvited+'lableTitleMob.png'    );
			pixiApp.loader.add( 'lableTopMob.png',            urlAcFrInvited+'lableTopMob.png'      );
		} else {
			pixiApp.loader.add( 'lableMidline.png',           urlAcFrInvited+'lableMidline.png'           );
			pixiApp.loader.add( 'lableTitle.png',             urlAcFrInvited+'lableTitle.png'             );
			//pixiApp.loader.add( 'lableTellFrInvited.png',     urlAcFrInvited+'lableTellFrInvited.png'     );
			pixiApp.loader.add( 'backgrSmoll.png',            urlAcFrInvited+'backgrSmoll.png'            );
			pixiApp.loader.add( 'butGold.png',                urlAcFrInvited+'butGold.png'                );
			pixiApp.loader.add( 'butInviteWindFrInvited.png', urlAcFrInvited+'butInviteWindFrInvited.png' );
		};
		//------------------------------------------------------------
		//-----------------CWindAcFriends-------------------
		//------------------------------------------------------------
//		let urlAcFriends = ImageLoader.baseUrl+"/winds/acFriends/";
//		pixiApp.loader.add( 'angleWAcFriends.png',       urlAcFriends+'angleWAcFriends.png' );	
//		pixiApp.loader.add( 'backgrAnimAcFriends.png',           urlAcFriends+'backgrAnimAcFriends.png' );	
//		pixiApp.loader.add( 'bon1AcFriends.png',       urlAcFriends+'bon1AcFriends.png' );
//		pixiApp.loader.add( 'bon2AcFriends.png',       urlAcFriends+'bon2AcFriends.png' );
//		pixiApp.loader.add( 'bon3AcFriends.png',       urlAcFriends+'bon3AcFriends.png' );
//		pixiApp.loader.add( 'bon4AcFriends.png',       urlAcFriends+'bon4AcFriends.png' );
//		pixiApp.loader.add( 'bon5AcFriends.png',       urlAcFriends+'bon5AcFriends.png' );
//		pixiApp.loader.add( 'butGetBonAcFriends.png',       urlAcFriends+'butGetBonAcFriends.png' );
//		pixiApp.loader.add( 'butInvF.png',       urlAcFriends+'butInvF.png' );
//		pixiApp.loader.add( 'crossAcFriends.png',       urlAcFriends+'crossAcFriends.png' );
//		pixiApp.loader.add( 'fraction30.png',       urlAcFriends+'fraction30.png' );
//		pixiApp.loader.add( 'lableAcFriends.png',       urlAcFriends+'lableAcFriends.png' );
//		pixiApp.loader.add( 'lableFriends.png',       urlAcFriends+'lableFriends.png' );
//		pixiApp.loader.add( 'sideWAcFriends.png',       urlAcFriends+'sideWAcFriends.png' );
		//------------------------------------------------------------
		//-----------------CWindAcInvInGame-------------------
		//------------------------------------------------------------
//		let urlAcInvInGame = ImageLoader.baseUrl+"/winds/acInvInGame/";
//		pixiApp.loader.add( 'backgrAcInv.png',       urlAcInvInGame+'backgrAcInv.png' );
//		pixiApp.loader.add( 'bonAcInv.png',       urlAcInvInGame+'bonAcInv.png' );
//		pixiApp.loader.add( 'butInvite.png',       urlAcInvInGame+'butInvite.png' );	
//		pixiApp.loader.add( 'lableAcInv.png',       urlAcInvInGame+'lableAcInv.png' );
		//------------------------------------------------------------
		//-----------------CWindAcInvToGame-------------------
		//------------------------------------------------------------
//		let urlAcInvToGame = ImageLoader.baseUrl+"/winds/acInvToGame/";
//		pixiApp.loader.add( 'backgrAcInvToGame.png',       urlAcInvToGame+'backgrAcInvToGame.png' );
//		pixiApp.loader.add( 'buyPlayAcInvToGame.png',       urlAcInvToGame+'buyPlayAcInvToGame.png' );
//		pixiApp.loader.add( 'gameGems.png',       urlAcInvToGame+'gameGems.png' );
//		pixiApp.loader.add( 'lablePlayTheGame.png',       urlAcInvToGame+'lablePlayTheGame.png' );
		//------------------------------------------------------------
		//--------------------CWindAcSale-------------------
		//------------------------------------------------------------
//		let urlAcSale = ImageLoader.baseUrl+"/winds/acSale/";
//		//pixiApp.loader.add( '',       urlAcFriends+'' );
//		pixiApp.loader.add( 'backgrAcSale.png',       urlAcSale+'backgrAcSale.png' );
//		pixiApp.loader.add( 'backgrBonAcSale.png',       urlAcSale+'backgrBonAcSale.png' );
//		pixiApp.loader.add( 'bon1AcSale.png',       urlAcSale+'bon1AcSale.png' );
//		pixiApp.loader.add( 'bon2AcSale.png',       urlAcSale+'bon2AcSale.png' );
//		pixiApp.loader.add( 'bon3AcSale.png',       urlAcSale+'bon3AcSale.png' );
//		pixiApp.loader.add( 'bon4AcSale.png',       urlAcSale+'bon4AcSale.png' );
//		pixiApp.loader.add( 'butBuyAcSale.png',       urlAcSale+'butBuyAcSale.png' );
//		pixiApp.loader.add( 'lable9bonAcSale.png',       urlAcSale+'lable9bonAcSale.png' );
//		pixiApp.loader.add( 'lableBonAcSale.png',       urlAcSale+'lableBonAcSale.png' );
//		pixiApp.loader.add( 'lableBuyAcSale.png',       urlAcSale+'lableBuyAcSale.png' );
//		//------------------------------------------------------------
//		//--------------------CWindAcSale1-------------------
		//------------------------------------------------------------
//		let urlAcSale1 = ImageLoader.baseUrl+"/winds/acSale1/";
//		//pixiApp.loader.add( '',       urlAcFriends+'' );
//		pixiApp.loader.add( 'backgrAcSale1.png',       urlAcSale1+'backgrAcSale1.png' );
//		pixiApp.loader.add( 'backgrAnimAcSale1.png',       urlAcSale1+'backgrAnimAcSale1.png' );
//		pixiApp.loader.add( 'bon1AcSale1.png',       urlAcSale1+'bon1AcSale1.png' );
//		pixiApp.loader.add( 'bon2AcSale1.png',       urlAcSale1+'bon2AcSale1.png' );
//		pixiApp.loader.add( 'bon3AcSale1.png',       urlAcSale1+'bon3AcSale1.png' );
//		pixiApp.loader.add( 'butBuyAcSale1.png',       urlAcSale1+'butBuyAcSale1.png' );
//		pixiApp.loader.add( 'lableBonAcSale1.png',       urlAcSale1+'lableBonAcSale1.png' );
//		pixiApp.loader.add( 'lableAcSale1.png',       urlAcSale1+'lableAcSale1.png' );
		//------------------------------------------------------------
		//--------------------CWindDailyBonus-------------------
		//------------------------------------------------------------
		let urlDailyBonus = ImageLoader.baseUrl+"/winds/dailyBonus/";
		pixiApp.loader.add( 'checkBoxDailyBonus.png',       urlDailyBonus+'checkBoxDailyBonus.png' );
		pixiApp.loader.add( 'markerDailyBonus.png',       urlDailyBonus+'markerDailyBonus.png' );
		if ( isMobile ) { 
			pixiApp.loader.add( 'lableTellFrDailyBonusMob.png',       urlDailyBonus+'lableTellFrDailyBonusMob.png' );
			pixiApp.loader.add( 'lableDay3DailyBonusMob.png',       urlDailyBonus+'lableDay3DailyBonusMob.png' );
			pixiApp.loader.add( 'lableDay2DailyBonusMob.png',       urlDailyBonus+'lableDay2DailyBonusMob.png' );
			pixiApp.loader.add( 'lableDay1DailyBonusMob.png',       urlDailyBonus+'lableDay1DailyBonusMob.png' );
			pixiApp.loader.add( 'lableDailyBonusMob.png',       urlDailyBonus+'lableDailyBonusMob.png' );	
			pixiApp.loader.add( 'lableComeInEvrDay.png',       urlDailyBonus+'lableComeInEvrDay.png' );	
			pixiApp.loader.add( 'lableBon3MobDailyBonus.png',       urlDailyBonus+'lableBon3MobDailyBonus.png' );	
			pixiApp.loader.add( 'lableBon2MobDailyBonus.png',       urlDailyBonus+'lableBon2MobDailyBonus.png' );	
			pixiApp.loader.add( 'lableBon1MobDailyBonus.png',       urlDailyBonus+'lableBon1MobDailyBonus.png' );	
			pixiApp.loader.add( 'enBon3DailyBonusMob.png',       urlDailyBonus+'enBon3DailyBonusMob.png' );	
			pixiApp.loader.add( 'enBon2DailyBonusMob.png',       urlDailyBonus+'enBon2DailyBonusMob.png' );	
			pixiApp.loader.add( 'enBon1DailyBonusMob.png',       urlDailyBonus+'enBon1DailyBonusMob.png' );			
			pixiApp.loader.add( 'backgrDailyBonusMob.png',       urlDailyBonus+'backgrDailyBonusMob.png' );
			pixiApp.loader.add( 'backgrBonDailyBonusMob.png',       urlDailyBonus+'backgrBonDailyBonusMob.png' );
		} else {
			pixiApp.loader.add( 'backgrBonDailyBonus.png',       urlDailyBonus+'backgrBonDailyBonus.png' );
			pixiApp.loader.add( 'backgrDailyBonus.png',       urlDailyBonus+'backgrDailyBonus.png' );
			pixiApp.loader.add( 'disBon1DailyBonus.png',       urlDailyBonus+'disBon1DailyBonus.png' );
			pixiApp.loader.add( 'disBon2DailyBonus.png',       urlDailyBonus+'disBon2DailyBonus.png' );
			pixiApp.loader.add( 'disBon3DailyBonus.png',       urlDailyBonus+'disBon3DailyBonus.png' );	
			pixiApp.loader.add( 'enBon1DailyBonus.png',       urlDailyBonus+'enBon1DailyBonus.png' );	
			pixiApp.loader.add( 'enBon2DailyBonus.png',       urlDailyBonus+'enBon2DailyBonus.png' );	
			pixiApp.loader.add( 'enBon3DailyBonus.png',       urlDailyBonus+'enBon3DailyBonus.png' );	
			pixiApp.loader.add( 'lableDailyBonus.png',       urlDailyBonus+'lableDailyBonus.png' );	
			pixiApp.loader.add( 'lableDay1DailyBonus.png',       urlDailyBonus+'lableDay1DailyBonus.png' );	
			pixiApp.loader.add( 'lableDay2DailyBonus.png',       urlDailyBonus+'lableDay2DailyBonus.png' );	
			pixiApp.loader.add( 'lableDay3DailyBonus.png',       urlDailyBonus+'lableDay3DailyBonus.png' );	
			pixiApp.loader.add( 'lableTellFrDailyBonus.png',       urlDailyBonus+'lableTellFrDailyBonus.png' );		
		};			
		//------------------------------------------------------------
		//--------------------CWindStepsLeft-------------------
		//------------------------------------------------------------
		let urlStepsLeft = ImageLoader.baseUrl+"/winds/stepsLeft/";
		
		pixiApp.loader.add( 'bonFStepsLeft.png',         urlStepsLeft+'bonFStepsLeft.png' );
		
		if ( isMobile ) {
			pixiApp.loader.add( 'lableStepsLeftMob.png',  urlStepsLeft+'lableStepsLeftMob.png' );
			pixiApp.loader.add( 'butBuyStepsLeftMob.png', urlStepsLeft+'butBuyStepsLeftMob.png' );
		} else {
			pixiApp.loader.add( 'butBuyStepsLeft.png',    urlStepsLeft+'butBuyStepsLeft.png' );
			pixiApp.loader.add( 'lableStepsLeft.png',     urlStepsLeft+'lableStepsLeft.png' );
			pixiApp.loader.add( 'crossStepsLeft.png',     urlStepsLeft+'crossStepsLeft.png' );
			pixiApp.loader.add( 'sideStepsLeft.png',      urlStepsLeft+'sideStepsLeft.png' );
			pixiApp.loader.add( 'angleStepsLeft.png',     urlStepsLeft+'angleStepsLeft.png' );
		};
		//------------------------------------------------------------
		//--------------------CWindAcInvite-------------------
		//------------------------------------------------------------
		let urlAcInvite = ImageLoader.baseUrl+"/winds/acInvite/";
		pixiApp.loader.add( 'bonAcInvite.png',            urlAcInvite+'bonAcInvite.png' );
		pixiApp.loader.add( 'butInviteAcInviteMob.png',      urlAcInvite+'butInviteAcInviteMob.png' );
		if ( isMobile ) {
			pixiApp.loader.add( 'backgrAcInviteMob.png',         urlAcInvite+'backgrAcInviteMob.png' );
			pixiApp.loader.add( 'backgrAcLableMob.png',          urlAcInvite+'backgrAcLableMob.png' );
			pixiApp.loader.add( 'backgrButAcInviteMob.png',      urlAcInvite+'backgrButAcInviteMob.png' );
			pixiApp.loader.add( 'lableInviteFrAcInviteMob.png',  urlAcInvite+'lableInviteFrAcInviteMob.png' );
			pixiApp.loader.add( 'lableGameAllAcInviteMob.png',   urlAcInvite+'lableGameAllAcInviteMob.png' );
			pixiApp.loader.add( 'lableBonAcInviteMob.png',       urlAcInvite+'lableBonAcInviteMob.png' );
			
		} else {
			pixiApp.loader.add( 'backgrAcInvite.png',         urlAcInvite+'backgrAcInvite.png' );
			pixiApp.loader.add( 'backgrAcLable.png',          urlAcInvite+'backgrAcLable.png' );
			pixiApp.loader.add( 'backgrButAcInvite.png',      urlAcInvite+'backgrButAcInvite.png' );
			pixiApp.loader.add( 'lableInviteFrAcInvite.png',  urlAcInvite+'lableInviteFrAcInvite.png' );
			pixiApp.loader.add( 'lableGameAllAcInvite.png',   urlAcInvite+'lableGameAllAcInvite.png' );
			pixiApp.loader.add( 'lableBonAcInvite.png',       urlAcInvite+'lableBonAcInvite.png' );
			pixiApp.loader.add( 'butInviteAcInvite.png',      urlAcInvite+'butInviteAcInvite.png' );
		}
		//------------------------------------------------------------
		//--------------------CWindGame-------------------
		//------------------------------------------------------------
		let urlWindGame = ImageLoader.baseUrl+"/winds/game/";		
		pixiApp.loader.add( 'taskBackgrWindGame.png',              urlWindGame+'taskBackgrWindGame.png' );
		pixiApp.loader.add( 'bonus/plus.png',                      urlWindGame+'bonus/plus.png' );
		pixiApp.loader.add( 'bMT.png',                             urlWindGame+'bonus/bMT.png' );
		pixiApp.loader.add( 'bMX.png',                             urlWindGame+'bonus/bMX.png' );
		pixiApp.loader.add( 'bPL.png',                             urlWindGame+'bonus/bPL.png' );
		pixiApp.loader.add( 'markerWindGame.png',              urlWindGame+'markerWindGame.png' );
		if ( isMobile ) {
			pixiApp.loader.add( 'taskPanelMobOj.png',              urlWindGame+'taskPanelMobOj.png' );
			pixiApp.loader.add( 'starPointEnWindGameMob.png',      urlWindGame+'starPointEnWindGameMob.png' );
			pixiApp.loader.add( 'starPointDisWindGameMob.png',     urlWindGame+'starPointDisWindGameMob.png' );
			pixiApp.loader.add( 'linePointWindGameMob.png',        urlWindGame+'linePointWindGameMob.png' );
			pixiApp.loader.add( 'linePointWindGameScaleMob.png',   urlWindGame+'linePointWindGameScaleMob.png' );
			pixiApp.loader.add( 'panelStepsWindGameMob.png',       urlWindGame+'panelStepsWindGameMob.png' );
			pixiApp.loader.add( 'crossWindGameMob.png',            urlWindGame+'crossWindGameMob.png' );
			pixiApp.loader.add( 'butMuteDisWindGameMob.png',       urlWindGame+'butMuteDisWindGameMob.png' );
			pixiApp.loader.add( 'butMuteEnWindGameMob.png',        urlWindGame+'butMuteEnWindGameMob.png' );
			pixiApp.loader.add( 'butSetings.png',                  urlWindGame+'butSetings.png' );
			pixiApp.loader.add( 'setingsPanel.png',                urlWindGame+'setingsPanel.png' );
			pixiApp.loader.add( 'crossBonMob.png',                 urlWindGame+'bonus/'+'crossBonMob.png' );
			pixiApp.loader.add( 'panelHelpUseBonMob.png',          urlWindGame+'bonus/'+'panelHelpUseBonMob.png' );
		} else {
			pixiApp.loader.add( 'linePointWindGame.png',           urlWindGame+'linePointWindGame.png' );
			pixiApp.loader.add( 'panelLevelWindGame.png',          urlWindGame+'panelLevelWindGame.png' );
			pixiApp.loader.add( 'panelStepsWindGame.png',          urlWindGame+'panelStepsWindGame.png' );
			pixiApp.loader.add( 'crossWindGame.png',               urlWindGame+'crossWindGame.png' );
			pixiApp.loader.add( 'starPointWindGame.png',           urlWindGame+'starPointWindGame.png' );
			pixiApp.loader.add( 'panelPointWindGame.png',          urlWindGame+'panelPointWindGame.png' );
			pixiApp.loader.add( 'curBMT.png',                      urlWindGame+'bonus/curBMT.png');
			pixiApp.loader.add( 'curBMX.png',                      urlWindGame+'bonus/curBMX.png');
			pixiApp.loader.add( 'curBPL.png',                      urlWindGame+'bonus/curBPL.png');
			for (let i = 1; i <= 7; i++) {
				pixiApp.loader.add( 'panelTasks'+i+'WindGame.png', urlWindGame+ 'panelTasks'+i+'WindGame.png' );
			};
		};
		
		//------------------------------------------------------------
		//--------------------CWindMsg-------------------
		//------------------------------------------------------------
		let urlWindMsg = ImageLoader.baseUrl+"/winds/message/";
		pixiApp.loader.add( 'couldWindMessage.png',       urlWindMsg+'couldWindMessage.png' );
		if ( !isMobile ) pixiApp.loader.add( 'backgrWindMessage.png',       urlWindMsg+'backgrWindMessage.png' );//------------------------------------------------------------
		pixiApp.loader.add( 'buttonClose.png',       urlWindMsg+'buttonClose.png' );//------------------------------------------------------------
		//--------------------CWindFullScreen-------------------
		//------------------------------------------------------------
//		let urlFullScreen = ImageLoader.baseUrl+"/winds/fullScreen/";
//		pixiApp.loader.add( 'labelBack.png',       urlFullScreen+'labelBack.png' );
//		pixiApp.loader.add( 'titleFullScreen.png',       urlFullScreen+'titleFullScreen.png' );
//		pixiApp.loader.add( 'labelFullScreen.png', urlFullScreen+'labelFullScreen.png' );
//		pixiApp.loader.add( 'butSizeDec.png',      urlFullScreen+'butSizeDec.png' );
//		pixiApp.loader.add( 'butSizeAdd.png',      urlFullScreen+'butSizeAdd.png' );
//		pixiApp.loader.add( 'backgrFullScreen.png',      urlFullScreen+'backgrFullScreen.png' );
		//------------------------------------------------------------
		//--------------------Embeds-------------------
		//------------------------------------------------------------
		let urlEnbeds = ImageLoader.baseUrl + "/embeds/";
		let urlGems = isMobile ? '/gemsAnimMobile/' : '/gemsAnim/';
		for( let i = 1; i <= 5; i++ ) {
			for (let j = 1; j<=16;j++) {
				pixiApp.loader.add( 'gem'+i+'_a'+j+'.png', ImageLoader.baseUrl + urlGems+'gem'+i+'_a'+j+'.png' );
			};
		};
		pixiApp.loader.add( 'gem1.png',       ImageLoader.baseUrl + urlGems+'gem1.png' );
		pixiApp.loader.add( 'gem2.png',       ImageLoader.baseUrl + urlGems+'gem2.png' );
		pixiApp.loader.add( 'gem3.png',       ImageLoader.baseUrl + urlGems+'gem3.png' );
		pixiApp.loader.add( 'gem4.png',       ImageLoader.baseUrl + urlGems+'gem4.png' );
		pixiApp.loader.add( 'gem5.png',       ImageLoader.baseUrl + urlGems+'gem5.png' );
		pixiApp.loader.add( 'glassBox.png',   urlEnbeds+'glassBox.png' );
		pixiApp.loader.add( 'stone0.png',     urlEnbeds+'stone0.png' );
		pixiApp.loader.add( 'stone1.png',     urlEnbeds+'stone1.png' );
		pixiApp.loader.add( 'stone2.png',     urlEnbeds+'stone2.png' );
		pixiApp.loader.add( 'iron.png',       urlEnbeds+'iron.png' );
		pixiApp.loader.add( 'coin.png',       urlEnbeds+'coin.png' );
		pixiApp.loader.add( 'yashik.png',     urlEnbeds+'yashik.png' );
		pixiApp.loader.add( 'ya1Part1.png',   urlEnbeds+'ya1Part1.png' );
		pixiApp.loader.add( 'ya1Part2.png',   urlEnbeds+'ya1Part2.png' );
		pixiApp.loader.add( 'ya1Part3.png',   urlEnbeds+'ya1Part3.png' );
		pixiApp.loader.add( 'ya1Part4.png',   urlEnbeds+'ya1Part4.png' );
		pixiApp.loader.add( 'ya1Part5.png',   urlEnbeds+'ya1Part5.png' );
		pixiApp.loader.add( 'ya1Part6.png',   urlEnbeds+'ya1Part6.png' );
		pixiApp.loader.add( 'boosterFrz1.png', urlEnbeds+'boosterFrz1.png' );
		pixiApp.loader.add( 'boosterFrz2.png', urlEnbeds+'boosterFrz2.png' );
		pixiApp.loader.add( 'boosterFrz3.png', urlEnbeds+'boosterFrz3.png' );
		pixiApp.loader.add( 'boosterFrz4.png', urlEnbeds+'boosterFrz4.png' );
		pixiApp.loader.add( 'boosterFrz5.png', urlEnbeds+'boosterFrz5.png' );
		pixiApp.loader.add( 'lightGemBon.png', urlEnbeds+'lightGemBon.png' );
		//------------------------------------------------------------
		//------------------------Tutorial-------------------
		//------------------------------------------------------------
		let urlTutorial = ImageLoader.baseUrl + "/tutorial/";
		pixiApp.loader.add( 'arrow.png',                  urlTutorial+'arrow.png' );
		pixiApp.loader.add( 'arrowStepMouse.png',         urlTutorial+'arrowStepMouse.png' );
//		pixiApp.loader.add( 'lableTutorialStep1.png',     urlTutorial+'lableTutorialStep1.png' );
//		pixiApp.loader.add( 'lableTutorialStep2.png',     urlTutorial+'lableTutorialStep2.png' );
//		pixiApp.loader.add( 'lableTutorialStep3.png',     urlTutorial+'lableTutorialStep3.png' );
//		pixiApp.loader.add( 'lableTutorialStep4.png',     urlTutorial+'lableTutorialStep4.png' );
//		pixiApp.loader.add( 'lableTutorialStep32.png',    urlTutorial+'lableTutorialStep32.png' );
//		pixiApp.loader.add( 'lableTutorialStep42.png',    urlTutorial+'lableTutorialStep42.png' );
//		pixiApp.loader.add( 'lableTopTutorialStep5.png',  urlTutorial+'lableTopTutorialStep5.png' );
//		pixiApp.loader.add( 'lableDownTutorialStep5.png', urlTutorial+'lableDownTutorialStep5.png' );
		pixiApp.loader.add( 'butNext.png',                urlTutorial+'butNext.png' );
		pixiApp.loader.add( 'pointerTasksTutorial.png',   urlTutorial+'pointerTasksTutorial.png' );
		
		pixiApp.loader.load(onAssetsLoaded);
	};