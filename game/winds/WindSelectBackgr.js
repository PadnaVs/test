
	let WindSelectBackgr = function() {
		
	};
	
	WindSelectBackgr.prototype.show = function() {
		let self = this;
		this.group = Handler.newGroup( wg );
		Sounds.openWind();
		
		this.background = null;
		this.setBackgr( Main.numShowBackgr );
		
		let onButClose = function() {
			self.group.removeSelf();
		};
		
		Handler.addImg( this.group, "./images/butClose.png", 604, 6, onButClose );
		
		let markers = [];
		let numSelBack = -1;
		
		let tapBakcgr = function(evt) {
			Main.numShowBackgr = evt.target.numBackgr;	
			for( let i = 0; i < markers.length; i++ ) {
				if( markers[i].num == Main.numShowBackgr ) {
					markers[i].visible = true;
				} else {
					markers[i].visible = false;
				}
			}
			self.setBackgr( Main.numShowBackgr );
			
			Main.windGame.setBackgr( Main.numShowBackgr );
		};
		
		let backgrOnLoad = function( img, num ) {
			img.scale.set(0.25);
			img.numBackgr = num;
		};
		
		for( let i = 0; i < Consts.DIR_BACKGROUNDS.length; i++ ) {
			Handler.addImg( this.group, "./images/marker.png", 30 + (230)*(i%3), 300 + (400)*(i%2), null,function(img){ 
				markers.push(img); img.toFront(); img.visible = false; img.num = i; }  
			);
			
			Handler.addImg( this.group, Consts.DIR_BACKGROUNDS[i], 30 + (230)*(i%3), 300 + (400)*(i%2), tapBakcgr, function(img){ backgrOnLoad(img, i) }  );
		}
	};
	
	WindSelectBackgr.prototype.setBackgr = function( num ) {
		let self = this;
		if( this.background ) this.background.removeSelf();
		Handler.addImg( this.group, "./images/backgrounds/back"+ num +".jpg", 360, 640, null, function(img){ 
			self.background = img;
			img.toBack();
			img.anchor.set(0.5,0.5);
			img.tint = 0xA55B30;			
		} );
	};