
	"use strict";
	
	let Platform = function( _countSectors, _type ) {
		let self = this;
		
		this.type = _type;
		
		this.sectors = [];
		this.countSectors = _countSectors;
		
		this.angle = 360/this.countSectors;
		
		this.countParts = 90;
		
		this.speed = 6;
		this.step = 0;
		this.upPoint = 0.5;
		this._rotation = 0;
		this._y = 0;
		
		this.model = this.createPlatform();
		
		Object.defineProperty( this, "rotation", {
	       get: function(   ) { return self._rotation; },
	       set: function( val ) { 
			   self._rotation = val; 			
			   self.angle = self._rotation; 			
               self.model.rotation.y = self._rotation/(180/Math.PI);
	    	}
	    });
		
		this.angle = self._rotation;
		
		Object.defineProperty( this, "y", {
	       get: function(   ) { return self._y; },
	       set: function( val ) { 
			   self._y = val; 		
			   self.upPoint += val;
               self.model.position.y = self._y;
	    	}
	    });
	};
	
	Platform.prototype.createPlatform = function() {
		let self = this;
		let platformModel = new THREE.Group();
		for( let i = 0; i < this.countSectors; i++ ) {
			let sector = new Sector( 0, Consts.SQUARE_TYPE );
			
			sector.minAngle = this.angle*i;
			sector.maxAngle = this.angle*i+this.angle;
			
			sector.rotation = this.angle*i;
			sector.position = {
					x: sector.r*Math.sin((i*this.angle)/(180/Math.PI)), 
					y: 0, 
					z: sector.r*Math.cos((i*this.angle)/(180/Math.PI))
			};
			if ( i%2 == 0 ) {
				sector.color = { r: 1, g: 1, b: 0 };//let corSh = 0;
			} else {//
				sector.color = { r: 0.1, g: 0.1, b: 0.1 };//
			}
			
			this.sectors.push( sector );
			platformModel.add( sector.model );
		}
		return platformModel;
	};
	