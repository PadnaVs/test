
	"use strict";
	
	let Sector = function( _type, _countModels = 1 ) {
		let self = this;
		
		this.type = _type;
		this.r = -4;
		
		this.modelOnePart = gameLoader.objectsLoaded[ Consts.SECTOR_CIRCLE_MODEL ].clone();
		this.countModels = _countModels;
		this._rotation = 0;
		this._position = 0;
		
		this._x = 0;
		this._y = 0;
		this._z = 0;
		
		this.model = this.createSector();
	
		this.model.children[0].material =  this.model.children[0].material.clone();
		
		//this.color = _color;
		
		this.model.dangerous = null;
		
		Object.defineProperty( this, "rotation", {
	       get: function(   ) { return self._rotation; },
	       set: function( val ) { 
				self._rotation = val; 			
               self.model.rotation.y = self._rotation/(180/Math.PI);
	    	}
	    });
		
		Object.defineProperty( this, "position", {
	       get: function(   ) { return self._position; },
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
				
				if ( val.r == 0.1 && val.g == 0.1 && val.b == 0.1 ) {
					self.dangerous = true;
				} else {
					self.dangerous = false;
				}
                self.model.children[0].material.color = self._color;
	    	}
	    });
	};
	
	Sector.prototype.createSector = function() {
		let clone = this.modelOnePart.clone();
		return clone;
	};
	