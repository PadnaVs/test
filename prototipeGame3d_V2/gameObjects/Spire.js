
	"use strict";
	
	let Spire = function( _modelCylinder, _countPlatform ) {
		let self = this;
		
		
		this.platforms = [];
		this.countPlatform = _countPlatform;
		this._numCurrentPlatform = 0;
		
		this.modelCylinder = _modelCylinder;
		
		this._rotation = 0;
		this.step  = 0;
		this.speed = 0.2;
		
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
		this.startYPl = -4;
		for( let i = 0; i < this.countPlatform; i++ ) {
			/*let rnd = Math.random() * (4 - 1) + 1;*/
			let platform = new Platform( 6, Consts.SQUARE_TYPE );
			platform.rotation = 2*i;
			platform.name = "name"+i;
			platform.y = this.startYPl + Math.floor( 0.8*i*10 )/10;
			this.upPoint = platform.y + 0.5;
			this.platforms.push( platform );
			this._numCurrentPlatform = i;
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
		
		let platform = this.platforms[ this._numCurrentPlatform ];
		
		let numSector = null;
		let countRotSpire = Math.floor(this.rotation/360)
		let angleRot = Math.abs ( ( this.rotation - 180 + platform.rotation ) - 360*countRotSpire);
		
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
			this.model.remove( this.model.children[ 1 + this._numCurrentPlatform ] );//one child - cylinder
			this._numCurrentPlatform--;
			this.upPoint -= 0.5;
			return true;
		} else {
			return false;
		};
	};