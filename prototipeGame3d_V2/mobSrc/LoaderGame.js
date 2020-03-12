	
	
	"use strict";
	
	let LoaderGame = function( urlsMtl, urlsObj, callBack, scene ) {
		this.urslMtl = urlsMtl;
		this.urlsObj = urlsObj;
		this.materialsLoaded = [];
		this.objectsLoaded = [];
		this.callBack = callBack;
	};
	
	LoaderGame.prototype.startLoad = function(){
		this.startLoadMtl();
	};
	
	LoaderGame.prototype.startLoadMtl = function(  ) {
		let self = this;
		
		this.managerMtl = new THREE.LoadingManager();
		this.mtlLoader = new THREE.MTLLoader( this.managerMtl );
		
		for ( let i = 0; i < this.urslMtl.length; i++ ) {
			this.mtlLoader.load( this.urslMtl[i], function ( materials ) {
				materials.preload();
				self.materialsLoaded[i] = materials;
			});
		};
		
		this.managerMtl.onLoad = function() {
			self.startLoadObj();
			console.log(self.materialsLoaded);
		};
	};
	
	LoaderGame.prototype.startLoadObj = function(   ) {
		let self = this;
		this.managerObj = new THREE.LoadingManager();
		this.objLoader = new THREE.OBJLoader( this.managerObj );
		for ( let i = 0; i < this.urlsObj.length; i++ ) {
			//let nameObj = this.urslMtl[i].substr( 0, this.urslMtl[i].length-4 );
			this.objLoader.load( this.urlsObj[i], function ( obj ) {
				obj.children[0].material = self.materialsLoaded[i].materials.material;//.clone();
				self.objectsLoaded[i] = obj;
			});
		};
		this.managerObj.onLoad = function(){
			console.log( self.objectsLoaded, "Finish Load Obj" );
			self.callBack();
		};
	};