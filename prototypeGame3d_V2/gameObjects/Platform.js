
	"use strict";
	
	let Platform = function( _num, _countSectors, _type ) {
		let self = this;
		
		this.type = _type;
		this.num = _num;
		
		this.sectors = [];
		this.countSectors = _countSectors;
		
		this.angle = 360/this.countSectors;
		
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
			let sector = new Sector( this.type );
			
			sector.minAngle = this.angle*i;
			sector.maxAngle = this.angle*i+this.angle;
			
			sector.rotation = this.angle*i;
			sector.position = {
					x: sector.r*Math.sin((i*this.angle)/(180/Math.PI)), 
					y: 0, 
					z: sector.r*Math.cos((i*this.angle)/(180/Math.PI))
			};
			
			
			if ( this.type.platforms[this.num][i] == 0 ) {
				sector.color = { r: 0.63, g: 0.13, b: 0.53 };
			} else {
				//console.log(i);
				sector.color = { r: 0.98, g: 0.95, b: 0.3 };
			}
			
			this.sectors.push( sector );
			platformModel.add( sector.model );
		}
		return platformModel;
	};
	
	
	Platform.prototype.destroy = function(  ) {
		let self = this;
		
		for( let i = 0; i < this.sectors.length; i++ ) {
			if( !this.sectors[i].dangerous ) { 
				self.sectors[i].opacity = 0;
				continue;
			};
			
			let angleSector = this.sectors[i].rotation;
			let newXPos = 6*Math.sin( angleSector/(180/Math.PI ) );
			let newZPos = 6*Math.cos( angleSector/(180/Math.PI ) );

			TweenMax.to( self.sectors[i].position, 0.3, { x: -newXPos, z: -newZPos, ease: Power0.easeNone } );
			TweenMax.to( self.sectors[i], 0.3, { opacity: 0, ease: Power0.easeNone } );
		}
		
		console.log(  );
		
		setTimeout( function(){ Handler.spire.model.remove( this.model ) }, 301  );
	};