	
	console.log( "version 0.67902" );
	      alert( "version 0.67902" );
	
	
	const visibleWidth0  = 360;
    const visibleHeight0 = 640;
	
	let visibleWidth  = 360;
    let visibleHeight = 640;
	
	const pixiAppWidth  = 360;
    const pixiAppHeight = 640;
    
    window .PIXI = PIXI;

    window .pixiApp = new PIXI.Application( {
        width  : pixiAppWidth,
        height : pixiAppHeight,
        backgroundColor : 0x000000, 
        //transparent: true,
        autoResize: true,
        resolution : 1,//window.devicePixelRatio || 1,
    } );
	
    let wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    wrapper.appendChild( pixiApp.view );
    document.body.appendChild( wrapper );  
	
	/*const graphics = new PIXI.Graphics();
	function drawPoint(px,py) {
        graphics.lineStyle(2, 0xff0000, 1);
        graphics.beginFill(0xffffff, 1);
        graphics.drawCircle( px, py, 3 );
        graphics.endFill();
	}
	
	drawPoint( 100, 100 );
	
	pixiApp.stage.addChild(graphics);*/
		
	const DataLoader = {};         
    window.DataLoader = DataLoader;
	
    DataLoader.load = function( ) {//called in WindGame
        //load Images
        Handler.addImg( null, "./images/windGame/blocks/block_l1.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l2.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l3.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l4.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l5.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l6.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l7.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l8.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l9.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l10.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l11.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l12.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l13.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l14.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l15.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l16.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l17.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l18.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l19.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l20.png",0,0,null,null,false );
        Handler.addImg( null, "./images/windGame/blocks/block_l21.png",0,0,null,null,false );
	};
	DataLoader.load();
	
	let wg = Handler.newGroup( pixiApp.stage );
	wg.scale.set( 0.5 );

	const Main = {};
	
	Main.createBig2Figure = false;
	Main.createBig2Block  = false;
	Main.createBig2Lines  = false;
	
	let ud = '{"isNew":false,"user":{"id":"1","outer_id":"514097834586","coins":"7410","exp":"0","ml":"6","day_bonus":"0","visit":"1589454561","noticePromise":"0"},"superGemHelp":0,"ts":1589463069,"ci":0,"openedWords":"100_000_000_0000_0000000","countPayments":0}';

	User.init( JSON.parse( ud ) );
	
	Main.numShowBackgr = 0;
	
	Main.windStartGame = new WindStartGame();
	Main.windStartGame.show();
	
	Main.windGame          = new WindGame();
	Main.windContinueGame  = new WindContinueGame();
	Main.windEndGameSolo   = new WindEndGameSolo();
	Main.windEndGameOnline = new WindEndGameOnline();
	Main.WindSelectBackgr  = new WindSelectBackgr();
	
	
	
	Sounds.init();
	Sounds.Play();
	
	/*const texture = PIXI.Texture.from( "./images/mainBack.jpg" );
	const mainBack = new PIXI.Sprite(texture);
    wg.addChild(mainBack);*/
	let backPlace = Handler.newGroup( wg );
	//Handler.addImg( backPlace, "./images/mainBack.jpg", 0, 0 );//mainBack


	//Handler.showRect( wg, -100, 6, 820, 692, 0x225504, 0.6 );//words back shadow
	//Handler.showRect( wg, -100, 0, 820, 692, 0x4CA71E, 1   );//words back
	//
	//Handler.showRect( wg, 0, 6, 720, 120, 0x225504, 0.6 );//top back shadow
	//Handler.showRect( wg, 0, 0, 720, 120, 0x43961B, 1   );//top back
	
    let pixiAppScaleMobile = 1;
	Handler.resizeApp = function() {
		//if ( Handler.isMobile() ) {
		    window .cw = $(window).width();
            window .ch = $(window).height();				
 			
		    pixiAppScaleMobile = Math.min( cw/visibleWidth0, ch/visibleHeight0 );
            if ( pixiAppScaleMobile*visibleHeight0 < ch ) {
		    	visibleHeight = ch / pixiAppScaleMobile;
		    	pixiAppScaleMobile = Math.min( cw/visibleWidth, ch/visibleHeight );
		    }
		    
		    pixiApp.renderer.resize( Math.floor(visibleWidth  * pixiAppScaleMobile), ch );
		    
		    pixiApp.stage.scale.x = pixiAppScaleMobile;
		    pixiApp.stage.scale.y = pixiAppScaleMobile;
		    pixiApp.renderer.render(pixiApp.stage);
		    
			let ew = Math.floor( 10*cw / pixiAppWidth  );
			let scalew = Math.floor( ew / 2 ) * 0.2;
			let eh = Math.floor( 10*ch / pixiAppHeight );
			let scaleh = Math.floor( eh / 2 ) * 0.2;
			let scale = Math.min( scalew,scaleh, 3 );

			window .pixiAppScale  = Math.max( 1.0, scale );

			Handler.resizeFlag = null;
	};
	
    Handler.resizeApp();
	window.addEventListener( "resize", function() {
	    if ( Handler.resizeFlag == null ) {
			Handler.resizeFlag = true;
	        setTimeout( Handler.resizeApp, 400 ); 
		}
	} );
			
	//gsap.to( graphics, { duration : 2, x: 50, repeat: 12, yoyo:true, ease:"none" } );