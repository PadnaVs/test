	
	console.log( "version 0.1" );
	
	
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
	
	let wg = Handler.newGroup( pixiApp.stage );
	wg.scale.set( 0.5 );

	let gMap = Handler.newGroup( wg );
	Map.group = gMap;
    gMap.alpha = 1;
    gMap.scale.set( 2 );
    gMap.interactive = true;
	
	let timerInerc = null;
	let timerForScrol = null;
	let tStart = 0;
	let tLast  = 0;
	let moved = false;
	
    let sx = 0;
    let sy = 0;
    let mx0 = 0;
    let my0 = 0;
    Map.xMin = 0;
    Map.yMin = 0;
    let onDown = false;
    gMap.on( "pointerdown", (evt)=>{
        sx = evt.data.global.x;
        sy = evt.data.global.y;
        mx0 = gMap.x;
        my0 = gMap.y;
        onDown = true;
		tLast = 0;
		clearInterval(timerInerc);
    } ); 
	
    gMap.on( "pointerup", (evt)=>{ 
		onDown = false; 
		moved = false;
		
		clearInterval( timerForScrol );
		
		let disX =  Math.abs(mx0 - gMap.x);
		let directionX = 0;
		if( disX != 0 ) {
			directionX = ( disX/( mx0 - gMap.x ) );
		}
		
		let disY =  Math.abs(my0 - gMap.y);
		let directionY = 0;
		if( disY != 0 ) {
			directionY = ( disY/( my0 - gMap.y ) );
		}
		
		let speedX = disX/tLast;
		let speedY = disY/tLast;
		
		let impX = 755*speedX;
		let impY = 755*speedY;
		
		let kDelImpY = impY*0.001;
		let kDelImpX = impX*0.001;
		
		let impStopY = impY*0.96;
		let impStopX = impX*0.96;
		
		let internalMove = function() {
			gMap.x -= impX*directionX;
			gMap.y -= impY*directionY;
			
			impX -= kDelImpX;
			impY -= kDelImpY;
			
			if( impX <= impStopX && impY <= impStopY ) {
				clearInterval( timerInerc );
				tLast = 0;
			}
		}
		timerInerc = setInterval(internalMove,16);
	} );
	
    gMap.on( "pointermove", (evt)=>{
		if( !moved ) {
			let setLastT = function() {
				tLast += 16;
			};
			timerForScrol = setInterval(setLastT,16);
		}
		if ( !onDown ) return;
        setTimeout( ()=>{
            gMap.x = Math.floor( mx0 + (evt.data.global.x - sx)*2 );
            gMap.x = Math.floor( gMap.x / 2 ) * 2;
            if ( gMap.x > 0    ) gMap.x = 0;
            if ( gMap.x < Map.xMin ) gMap.x = Map.xMin;
            
            gMap.y = Math.floor( my0 + (evt.data.global.y - sy)*2 );
            gMap.y = Math.floor( gMap.y / 2 ) * 2;
            if ( gMap.y > 0    ) gMap.y = 0;
            if ( gMap.y < Map.yMin ) gMap.y = Map.yMin;
        }, 100 );
    } );

	Handler.addImg( gMap, "./backgr.png", 0, 0, null, im => {
        Map.xMin = visibleWidth*2  - gMap.width;
        Map.yMin = visibleHeight*2 - gMap.height;
    } );//2240x1280
	
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