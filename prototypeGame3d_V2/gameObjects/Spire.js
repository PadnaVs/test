
	"use strict";
	
	let Spire = function( _modelCylinder, _type ) {
		let self = this;
		
		this.type = _type;
		
		this.platforms = [];
		this.countPlatform = this.type.platforms.length;
		this.numCurrentPlatform = 0;
		
		this.modelCylinder = _modelCylinder;
		
		this._rotation = 0;
		this.step  = 0;
		this.speed = 0.26;
		
///////////////////////////////////////////////////////////////////////////
		this.model = this.createSipe();
		
		//this.upPoint = 0.5*_countPlatform + 0.3*_countPlatform - 4;
		Object.defineProperty( this, "rotation", {
	       get: function(   ) { return self._rotation; },
	       set: function( val ) { 
			   self._rotation = val; 			
               self.model.rotation.y = self._rotation/(180/Math.PI);
	    	}
	    });
	};
	
	Spire.prototype.createSipe = function() {
		let grSipe = new THREE.Group();
		grSipe.add( this.modelCylinder );
		this.startYPl = 0;
		for( let i = 0; i < this.countPlatform; i++ ) {
			/*let rnd = Math.random() * (4 - 1) + 1;*/
			let platform = new Platform( i, this.type.countSectors, this.type );
			platform.rotation = 2*i;
			platform.name = "name"+i;
			platform.y = this.startYPl + Math.floor( 0.8*i*10 )/10;
			this.upPoint = platform.y + 0.5;
			this.platforms.push( platform );
			this.numCurrentPlatform = i;
			grSipe.add( platform.model );
		}
 		
		return grSipe;
	};
	
	Spire.prototype.rot = function() {
		this.step += this.speed;
		this.rotation = 4*this.step;
	};
	
	Spire.prototype.checkSelectSector = function() {
		let self = this;
		
		let platform = this.platforms[ this.numCurrentPlatform ];
		
		let numSector = null;
		let countRotSpire = Math.floor((this.rotation + 180 + - Handler.player.angle )/360)
		let angleRot = Math.abs ( ( this.rotation - 180 + platform.rotation - Handler.player.angle )  - 360*countRotSpire) ;
		
		let angleOneSector = 360/platform.countSectors;// 360°с на количество секторов
		
		let comparisonAngles = function( rotA, minA, maxA ) {
			if ( minA < 0 && rotA > maxA ) { 
				rotA = 360 - rotA;
			}
			if ( rotA >= minA && rotA <= maxA ) return true;
			return false;
		};
		
		for( let i = 0; i < platform.sectors.length; i++ ) {
			let minAngle = platform.sectors[i].minAngle - angleOneSector/2;
			let maxAngle = platform.sectors[i].maxAngle - angleOneSector/2;
			
			if ( comparisonAngles( angleRot, minAngle, maxAngle ) ) {
				numSector = i;
				break;
			}
		}
		
		if ( numSector == null ) {
			console.log( numSector );
		};
		
		if ( !platform.sectors[numSector].dangerous ) {
			console.log( platform );
			console.log( numSector );
				
			this.platforms.splice( this.numCurrentPlatform, 1 );
			this.model.remove( this.model.children[ 1 + this.numCurrentPlatform ] );//one child - cylinder
			this.numCurrentPlatform--;
			this.upPoint -= 0.5;
			if ( this.numCurrentPlatform == -1 ) {
				Handler.gameWin = true;
			}
			return true;
		} else {
			return false;
		};
	};