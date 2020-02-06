	
	"use strict";
	
	let Embeds = {};         
    
    Embeds.body = function( inputPath, iw, ih ) {
		let ipath = inputPath+".png";
		let ix = 0, iy = 0;
		if ( iw == null || ih == null) {
			return Handler.showImg( Consts.WITHOUT_PARENT, ipath, ix, iy );
		} else {
			return Handler.showImgRect( Consts.WITHOUT_PARENT, ipath, ix, iy, iw, ih );
		};
	};
	
	Embeds.gem01     = function() { return Embeds.body("gem1", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.gem02     = function() { return Embeds.body("gem2", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.gem03     = function() { return Embeds.body("gem3", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.gem04     = function() { return Embeds.body("gem4", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.gem05     = function() { return Embeds.body("gem5", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.gem06     = function() { return Embeds.body("gem6", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.gem07     = function() { return Embeds.body("gem7", Consts.gemsWidth, Consts.gemsHeight); }
	Embeds.Coin      = function() { return Embeds.body( "coin", 50, 50); }
	
	Embeds.getGemByNum = function( num ) {
		let gem = null;//:Sprite;
		switch (num) {
			case 1  : gem = Embeds.gem01();    break;
			case 2  : gem = Embeds.gem02();    break;
			case 3  : gem = Embeds.gem03();    break;
			case 4  : gem = Embeds.gem04();    break;
			case 5  : gem = Embeds.gem05();    break;
//			case 6  : gem = Embeds.gemSuper(); break;
			case Consts.COIN_COLOR : gem = Embeds.Coin();     break;
//			case Consts.COL_GRAF : gem = Embeds.StoneBox(); break;
//			case Consts.COL_ONIX : gem = Embeds.OnixBox();  break;
		};
		return gem;
	};
	
	let sideLineP = isMobile ? 30 : 60;
	Embeds.lineP = function(){ return Embeds.body('lightGemBon', sideLineP, sideLineP); };
	
	Embeds.font0 = function(){ return Embeds.body('owf0'); };	
	Embeds.font1 = function(){ return Embeds.body('owf1'); };
	Embeds.font2 = function(){ return Embeds.body('owf2'); };
	Embeds.font3 = function(){ return Embeds.body('owf3'); };
	Embeds.font4 = function(){ return Embeds.body('owf4'); };
	Embeds.font5 = function(){ return Embeds.body('owf5'); };
	Embeds.font6 = function(){ return Embeds.body('owf6'); };
	Embeds.font7 = function(){ return Embeds.body('owf7'); };
	Embeds.font8 = function(){ return Embeds.body('owf8'); };
	Embeds.font9 = function(){ return Embeds.body('owf9'); };
	Embeds.font9 = function(){ return Embeds.body('owfX'); };
	
	Embeds.getFontSprite = function( num ) {
		switch ( num ) {
			case 0:  return  Embeds.font0(); break;
			case 1:  return  Embeds.font1(); break;
			case 2:  return  Embeds.font2(); break;
			case 3:  return  Embeds.font3(); break;
			case 4:  return  Embeds.font4(); break;
			case 5:  return  Embeds.font5(); break;
			case 6:  return  Embeds.font6(); break;
			case 7:  return  Embeds.font7(); break;
			case 8:  return  Embeds.font8(); break;
			case 9:  return  Embeds.font9(); break;
			case 10: return  Embeds.fontX(); break;
		};
		return null;
	};
	
	Embeds.tutorialStep1 = function(){ return Embeds.body('tutorialStep1', 460, 563) };
	
	Embeds.glassBox = function(){ return Embeds.body('glassBox', 100, 100 ) };
	
	Embeds.curBPL = function() { return Embeds.body('curBPL',31,33) };
	Embeds.curBMX = function() { return Embeds.body('curBMX',31,33) };
	Embeds.curBMT = function() { return Embeds.body('curBMT',31,33) };
	
	Embeds.Iron = function() { return Embeds.body('iron',57,56) };
	Embeds.Stone = function( parent ) {//gotoAndStop(frameNumber)  play()  gotoAndPlay(frameNumber)  
		
//		let bpath = Config.IMAGE_LOADER_BASE_URL + "/gems/gLighting"
		let ipaths = [ "stone0.png", "stone1.png", "stone2.png" ];
		//let ipaths = { points: [46,46,46,46], path: bpath+".png", orientation: Consts.VERTICAL_ANIM  };
		let ix = 0, iy = 0, iw = 57, ih = 56;
	    let anim = Handler.showAnimSprite( parent, ipaths, ix, iy, iw, ih, 0.1 );
		let iron = Embeds.Iron();
		iron.name = "iron";
		iron.scale.x = 1;
		iron.scale.y = 1;
		iron.visible = false;
		anim.addChild(iron);
	    return anim;
	};
	
	Embeds.gem01Anim = function() {
		let ipaths = [ ];				
		for ( let i=1; i<=16; i++ ) 
            ipaths.push('gem1_a'+i+'.png');
		let ix = 0, iy = 0, iw = 60, ih = 60;
		let anim = Handler.showAnimSprite( Consts.WITHOUT_PARENT, ipaths, ix, iy, iw, ih, 0.35 );
		return anim;
	};
	Embeds.gem02Anim = function() {
		let ipaths = [ ];				
		for ( let i=1; i<=16; i++ ) 
            ipaths.push('gem2_a'+i+'.png');
		let ix = 0, iy = 0, iw = 60, ih = 60;
		let anim = Handler.showAnimSprite( Consts.WITHOUT_PARENT, ipaths, ix, iy, iw, ih, 0.35 );
		return anim;
	};
	Embeds.gem03Anim = function() {
		let ipaths = [ ];				
		for ( let i=1; i<=16; i++ ) 
            ipaths.push('gem3_a'+i+'.png');
		let ix = 0, iy = 0, iw = 60, ih = 60;
		let anim = Handler.showAnimSprite( Consts.WITHOUT_PARENT, ipaths, ix, iy, iw, ih, 0.35 );
		return anim;
	};
	Embeds.gem04Anim = function() {
		let ipaths = [ ];				
		for ( let i=1; i<=16; i++ ) 
            ipaths.push('gem4_a'+i+'.png');
		let ix = 0, iy = 0, iw = 60, ih = 60;
		let anim = Handler.showAnimSprite( Consts.WITHOUT_PARENT, ipaths, ix, iy, iw, ih, 0.35 );
		return anim;
	};
	Embeds.gem05Anim = function() {
		let ipaths = [ ];				
		for ( let i=1; i<=16; i++ ) 
            ipaths.push('gem5_a'+i+'.png');
		let ix = 0, iy = 0, iw = 60, ih = 60;
		let anim = Handler.showAnimSprite( Consts.WITHOUT_PARENT, ipaths, ix, iy, iw, ih, 0.35 );
		return anim;
	};
	
	Embeds.yas4ik = function() { return Embeds.body('yashik', 45, 45) };
	Embeds.boosterFrz = function( color ) {
		switch ( color ) {
			case 1: return Embeds.body('boosterFrz1', 50, 50); break;
			case 2: return Embeds.body('boosterFrz2', 50, 50); break;
			case 3: return Embeds.body('boosterFrz3', 50, 50); break;
			case 4: return Embeds.body('boosterFrz4', 50, 50); break;
			case 5: return Embeds.body('boosterFrz5', 50, 50); break;
			//default : return Embeds.body('boosterFrz1', 50, 50); break;
		};
	};
	
	Embeds.yas4ik1Parts = function() {
		let grPart = Handler.newGroup();
		let ya1Part6 = Embeds.body('ya1Part6',23,23);
		ya1Part6.name = 'ya1Part6';
		ya1Part6.x = -11;
		ya1Part6.y = 11; 
		let ya1Part5 = Embeds.body('ya1Part5',39,23);
		ya1Part5.name = 'ya1Part5';
		ya1Part5.x = 3;
		ya1Part5.y = 11; 
		let ya1Part4 = Embeds.body('ya1Part4',23,33);
		ya1Part4.name = 'ya1Part4';
		ya1Part4.x = 11;
		ya1Part4.y = 3; 
		let ya1Part3 = Embeds.body('ya1Part3',23,23);
		ya1Part3.name = 'ya1Part3';
		ya1Part3.x = 11;
		ya1Part3.y = -11; 
		let ya1Part2 = Embeds.body('ya1Part2',25,23);
		ya1Part2.name = 'ya1Part2';
		ya1Part2.x =  -6;
		ya1Part2.y = -11; 
		let ya1Part1 = Embeds.body('ya1Part1',23,25);
		ya1Part1.name = 'ya1Part1';
		ya1Part1.x = -11;
		ya1Part1.y = -10; 
		
		
		
		grPart.addChild( ya1Part1 );
		grPart.addChild( ya1Part2 );
		grPart.addChild( ya1Part3 );
		grPart.addChild( ya1Part5 );
		grPart.addChild( ya1Part4 );
		grPart.addChild( ya1Part6 );
		return grPart;
	};