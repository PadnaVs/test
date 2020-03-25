
	"use strict";
	
	let Sector = function( _type ) {
		let self = this;
		
		this.type = _type;
		this.r = -4;
		
		this.modelOnePart = gameLoader.objectsLoaded[ this.type.typeSector ].clone();
		
		this._rotation = { x: 0, y: 0, z: 0 };
		this._position = { x: 0, y: 0, z: 0 };
		
		this._x = 0;
		this._y = 0;
		this._z = 0;
		
		this.model = this.createSector();
	
		this.model.children[0].material =  this.model.children[0].material.clone();
		this.material = this.model.children[0].material;
		
		this._color = self.model.children[0].material.color; 
		this._opacity = self.model.children[0].material.opacity; 
		
		//this.color = _color;
		
		this.model.dangerous = null;
		
		Object.defineProperty( this, "rotation", {
	       get: function() { 
				let newRot = self.model.rotation;
				
				newRot.x = self._rotation.x;
				newRot.y = self._rotation.y;
				newRot.z = self._rotation.z;
			
				return newRot; 
			},
	       set: function( val ) { 
				self._rotation = val; 			
                self.model.rotation.x = self._rotation.x/(180/Math.PI);
                self.model.rotation.y = self._rotation.y/(180/Math.PI);
                self.model.rotation.z = self._rotation.z/(180/Math.PI);
	    	}
	    });
		
		Object.defineProperty( this, "position", {
	       get: function(   ) { return self.model.position; },
	       set: function( val ) { 
				self._position = val; 			
                self.model.position.x = self._position.x;
                self.model.position.y = self._position.y;
                self.model.position.z = self._position.z;
	    	}
	    });
		
		Object.defineProperty( this, "x", {
	       get: function(   ) { return self._x; },
	       set: function( val ) { 
				self._x = val; 			
               self.model.position.x = self._x;
	    	}
	    });
		
		Object.defineProperty( this, "y", {
	       get: function(   ) { return self._y; },
	       set: function( val ) { 
				self._y = val; 			
                self.model.position.y = self._y;
	    	}
	    });
		
		Object.defineProperty( this, "z", {
	       get: function(   ) { return self._z; },
	       set: function( val ) { 
				self._z = val; 			
                self.model.position.z = self._z;
	    	}
	    });
		
		Object.defineProperty( this, "color", {
	       get: function(   ) { return  self._color; },
	       set: function( val ) { 
				self._color = val;
				
				if ( val.r == 0.63 && val.g == 0.13 && val.b == 0.53 ) {
					self.dangerous = true;
				} else {
					self.dangerous = false;
				}
                self.model.children[0].material.color = self._color;
	    	}
	    });
		
		Object.defineProperty( this, "opacity", {
	       get: function(   ) { return  self._opacity; },
	       set: function( val ) { 
				self._opacity = val;
				
				self.model.children[0].material.transparent = val == 1 ? false : true;
				
                self.model.children[0].material.opacity = val;
	    	}
	    });
		
		console.log(this);
	};
	
	Sector.prototype.createSector = function() {
		let clone = this.modelOnePart.clone();
		return clone;
	};
	