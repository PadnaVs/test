
	
	const pixiApp = new PIXI.Application({
		width  : 2000,//  * pixiAppScale,
		height : 2000,// * pixiAppScale,
		backgroundColor : 0x1FFFFF,
		autoResize: true,
		//resolution : window.devicePixelRatio || 1,
		resolution : 1,
	});
	
	document.body.appendChild(pixiApp.view);
	
	const graphics = new PIXI.Graphics();

	// Rectangle
	graphics.beginFill(0xDE3249);
	graphics.drawRect(50, 50, 100, 100);
	graphics.endFill();
	
	pixiApp.stage.addChild(graphics);
	
	let moveBox = function( e ){
		graphics.x += 5;
	}
	
	pixiApp.stage.interactive = true;
	pixiApp.stage.on("pointertap", moveBox);
	
	alert("gg");
