    const WindBuyCoins = function( parent ) {
		let self = this;
		this.fparent = parent;

		let group = Handler.newGroup( parent );
        this.group = group;
	
        let back = Handler.newRect( group, 0, 0, 720, 1280, 0x000000, 0.6 );
		back.interactive = true;
		
		let images = [];
		let _onLoad = function(img) {
			images.push( img );
			img.x += Math.floor( img.width  / 2 );
			img.y += Math.floor( img.height / 2 );
			img.anchor.set( 0.5 );
			img.scaleX = img.scaleY = 0;
			gsap.to( img, { duration: 0.2, scaleX: 1, scaleY: 1, ease: "none" });
		};
		
		let costs = [  59, 199, 399, 599, 1999 ];
		let coins = [ 550,1950,3950,6150,25250 ];
			
		let _onBut1 = ()=>{ _onButBase(0) };
		let _onBut2 = ()=>{ _onButBase(1) };
		let _onBut3 = ()=>{ _onButBase(2) };
		let _onBut4 = ()=>{ _onButBase(3) };
		let _onBut5 = ()=>{ _onButBase(4) };
		let _onButBase = function( num ) {
			//disable buttons on 800 milliseconds
			images.forEach( im=>{ Handler.disableButton(im,800); } );
			//buy handler
			alert('buy '+coins[num]+' for '+costs[num]+' oks');
		};
		
        Handler.addImg( group, "./images/WindBuyCoins/buy550.png",   364, 928, _onBut1, _onLoad );
        Handler.addImg( group, "./images/WindBuyCoins/buy1950.png",    6, 928, _onBut2, _onLoad );
        Handler.addImg( group, "./images/WindBuyCoins/buy3950.png",  364, 558, _onBut3, _onLoad );
        Handler.addImg( group, "./images/WindBuyCoins/buy6150.png",    6, 558, _onBut4, _onLoad );
        Handler.addImg( group, "./images/WindBuyCoins/buy25250.png", 100,   0, _onBut5, _onLoad );
		
		let _onButClose = function() {
			images.forEach( im=>{ gsap.to( im, { duration: 0.2, scaleX: 0, scaleY: 0, ease: "none" }) } );
			setTimeout( ()=>{ Handler.destroy( self.group ) }, 200 );
		};
		setTimeout( ()=>{ Handler.addImg( group, "./images/butClose.png", 604, 6, _onButClose, _onLoad ); }, 400 );
        
    };
	
    