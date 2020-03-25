     
	 alert( "Version 0.241" );
	 
	 Handler = Handler;
     Consts = Consts;
     let levelTypes = LevelTypes;
     
     Handler.gameScene = new GameScene( true );
     Handler.gameScene.create();
     
     let urlsObj =   [ "models/sector90.obj", 
                       "models/sector60.obj", 
                       "models/sector45.obj", 
                       "models/sector40.obj", 
     				   "models/player.obj"
     				];
     				
     let urlsMtl =   [  "models/sector90.mtl",
						"models/sector60.mtl", 
                        "models/sector45.mtl", 
                        "models/sector40.mtl", 
     				    "models/player.mtl"
     				];   
	 
     let finishLoad = function() {
     	showGame();
     }
     
     let gameLoader = new LoaderGame( urlsMtl, urlsObj, finishLoad );
     gameLoader.startLoad();
     
     let showGame = function() {
		let levelType = levelTypes.level[2];
		let countPlatform = levelType.platforms.length;
		
     	let geometry = new THREE.CylinderGeometry( 2, 2, countPlatform*0.8, 36 );
     	let material = new THREE.MeshLambertMaterial( {color: 0x203f9a } );
     	let cylinder = new THREE.Mesh( geometry, material );
     	cylinder.position.y += countPlatform*0.8/2;
     	
     	let geometry2 = new THREE.CylinderGeometry( 5, 5, 0.5, 36 );
     	let material2 = new THREE.MeshLambertMaterial( {color: 0x203f9a } );
     	let cylinder2 = new THREE.Mesh( geometry2, material2 );
     	cylinder2.position.y -= 0.25;
     	
     	let cylinderS = new THREE.Group();
     	
     	cylinderS.add(cylinder);
     	cylinderS.add(cylinder2);
     	
     	Handler.spire = new Spire( cylinderS, levelType );
     	Handler.gameScene.spire = Handler.spire;
     	
     	console.log( Handler.spire );
     	//4.3*sin(30/(180/3.14))
     	//Create Player // радиус = 4.3
		
		//left 2.5;
		//down 3.5;
		
     	Handler.player = new Player( gameLoader.objectsLoaded[ Consts.PLAYER_MODEL ] );
     	Handler.player.x = -2.5;
     	Handler.player.z = 3.5;
     	Handler.player.y = Handler.spire.countPlatform * 0.8 + 0.5;
     	
     	Handler.player.maxDownY  = Handler.player.y;
     	Handler.player.maxUpY    = Handler.player.y + 2;
     	Handler.player.shY       = 0.8;//0,5 + 0,3
     	
     	Handler.gameScene.pointOfSightY = Handler.player.y + 2;
     	Handler.gameScene.camera.position.y = Handler.player.y + 2;
     	Handler.gameScene.cameraLookToThePoint( 0, Handler.gameScene.camera.position.y-0.8, 0 );
     	
     	Handler.player.createAnimBounce();
     	
     	
     	//Handler.player.move(  );
     	//Handler.player.moves = true;
     	Handler.gameScene.player = Handler.player;
     	
     };