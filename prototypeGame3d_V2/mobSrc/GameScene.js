
	"use strict";
	
	let GameScene =  function( _axesShow ) {
		let self = this;
		
		this.scene;
		this.camera;
		this.render;
		this.ligth;
		this.axesShow = _axesShow;
		this.axes;
		this.renderer;
		this._player = null;
		this._spire = null;
		
		this.room = null;
		
		Object.defineProperty( this, "player", {
	       get: function(   ) { return self._player; },
	       set: function( val ) {
				if( self._player != null ) self._player.delete();
				self._player = val;
				self.scene.add( self._player.model );
	    	}
	    });
		
		Object.defineProperty( this, "spire", {
	       get: function(   ) { return self._spire; },
	       set: function( val ) {
				if( self._spire != null ) self._spire.delete();
				self._spire = val;
				self.scene.add( self._spire.model );
	    	}
	    });
	};
	
	GameScene.prototype.create = function() {
		let self = this;
		
		this.scene = new THREE.Scene();
		
		//let lightProbe = new THREE.LightProbe();
		//lightProbe.intensity = 1;
		//lightProbe.position.set(0,0,0);
		//this.scene.add( lightProbe );
		
		let hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 1 );
		hemiLight.position.x = -15;
		hemiLight.position.y = 10;
		hemiLight.position.z = 15;
		this.scene.add( hemiLight );
		
		//this.ligth = new THREE.DirectionalLight( 0xffffff, 1 );
		//this.ligth.position.set( 0, 12, 12 );
		//this.ligth.castShadow = true;
		//
		//this.scene.add( this.ligth );
		
		//this.ligth2 = new THREE.DirectionalLight( 0xffffff, 0.3 );
		//this.ligth2.position.set( 0, -1, 0 );
		//this.ligth2.castShadow = true;
		//
		//this.scene.add( this.ligth2 );
		
		
		//this.ligth2 = new THREE.SpotLight( 0xffffff, 1 );
		//this.ligth2.position.set( 0, 30, 0 );
		//this.ligth2.castShadow = true;
		//this.scene.add( this.ligth2 );
		
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 3000 );
		this.camera.position.x = 0;
		this.camera.position.y = 18;
		this.camera.position.z = 40;
		this.camera.lookAt( this.scene.position );
		
		if( this.axesShow == true ) { 
			this.axes = new THREE.AxisHelper( 20 );
			this.scene.add( this.axes );
		}
		
		let planeGeometry = new THREE.PlaneGeometry(200,1000);
		let planeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
		let plane = new THREE.Mesh( planeGeometry, planeMaterial );
		plane.position.y = 0;
		plane.position.z = -40;
		plane.receiveShadow = true;
		this.scene.add( plane );
		//
		//let planeGeometry2 = new THREE.PlaneGeometry(10,10);
		//let planeMaterial2 = new THREE.MeshLambertMaterial({color: 0x00ff00});
		//let plane2 = new THREE.Mesh(planeGeometry2,planeMaterial2);
		//plane2.receiveShadow = true;
		//plane2.position.set(3.5,0,-5);
		////plane2.rotation.x = -90/(180/3.14);
		////plane2.rotation.z = -45/(180/3.14);
		//plane2.rotation.y = -45/(180/3.14);
		//this.scene.add( plane2 );
		//
		//let planeGeometry3 = new THREE.PlaneGeometry(10,10);
		//let planeMaterial3 = new THREE.MeshLambertMaterial({color: 0x0000ff});
		//let plane3 = new THREE.Mesh(planeGeometry3,planeMaterial3);
		//plane3.receiveShadow = true;
		//plane3.position.set(-3.5,0,-5);
		////plane.rotation.x = -90/(180/3.14);
		//plane3.rotation.y = 45/(180/3.14);
		//this.scene.add( plane3 );
		//let cubeGeometry = new THREE.CubeGeometry(12,40,30);
		//let cubeMaterial = new THREE.MeshPhongMaterial();
		//this.room = new THREE.Mesh( cubeGeometry, cubeMaterial );
		//this.room.castShadow = true;
		//this.scene.add( this.room );
		
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.shadowMapEnabled = true;
		this.renderer.render( this.scene, this.camera );
		
		let touchStart = function(){
			alert("touchStart");
		}
		
		let touchEnd = function(){
			alert("touchEnd");
		}
		
		document.body.appendChild( this.renderer.domElement );
		
		Handler.touchControl = new TouchControl( this.renderer.domElement );
		
		let movePlayer = function() {
			if ( self.player == null ) return;
			self.player.move( 14.5, 13.5 );
		}
		
		let rotationSpire = function() {
			if ( self.spire == null ) return;
			self.spire.rot();
		}
		
		//let controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
		//controls.target.set( 0, 2, 0 );
		//controls.update();
		//console.log( self.player );
		let animate = function () {
        	requestAnimationFrame( animate );
			self.renderer.render( self.scene, self.camera );
        	//collitionCheck();
        	//setTimeout( movePlayer, 1000 );
			movePlayer();
			//self.player.move();
        	rotationSpire();
			//console.log(  );
        };
        animate();
	};