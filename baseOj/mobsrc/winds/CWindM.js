
    let CWindM = {};

    CWindM.newObject = function() {
        this.winds = {};
        return this;
    };

    CWindM.startup = function( params ) {
        let showContent = function() {
			let self = this;
			
			let skFont = 0;
			let fontSize = (pixiApp.stage.scale.x - 1)/0.2*4+22; 

	
			
			
			self.mainGroup = Handler.newGroup( Handler.gWinds );
			self.mainGroup.x = Handler.contentCenterX;
			self.mainGroup.y = Handler.contentCenterY;
			self.backr = Handler.showWindBackround( -288, -146, 577, 292,Consts.DIR_M+"angle.png",Consts.DIR_M+"side.png",Handler.colorLuaToHex([240/255,236/255,170/255] ));
			self.mainGroup.addChild( self.backr );
	 
			let cross = Handler.showImgRect(self.mainGroup,Consts.DIR_M+"cross.png",self.mainGroup.width/2-30,-self.mainGroup.height/2+30,31,26);
			cross.onEL( "pointerdown", function(){ self.shutdown() } );
	 
		  /*  if ( params.showBoy != null ) {
				Handler.showImgRect( self.mainGroup, Consts.DIR_TUTORIAL+"manTiny.png",-235,-35,300,316 );
				let cloud = Handler.showImgRect(self.mainGroup,Consts.DIR_MSG+"cloud.png",25,-15,431,245);
				cloud.alpha = 0.1;
			};*/
			
			if ( params.sprites != null ) {
				for ( let i=0; i<params.sprites.length; i++ ) {
					self.mainGroup.addChild( params.sprites[i] );
				}
			}
	/*		
	PIXI.Text.prototype._onTextureUpdate = function() { // centred text with odd width is blurred bug fix
		if((this.style.align === 'center') && (this.texture.width & 1)) {
			this.x = Math.floor(this.x) + 0.5;
		} else {
			this.x = Math.floor(this.x);
		}
		PIXI.Text.__proto__.prototype._onTextureUpdate.call(this);
	}
	*/
			if ( params.m != null ) params.text = params.m;
			
			if ( params != null ) {
				let paramsText = {};         
				paramsText.parent = self.mainGroup;         
				paramsText.text = params.text;         
				paramsText.x = 0;         
				paramsText.y = -90;         
				//paramsText.width = 536 26 0.847;         
				//paramsText.width = 454 22;         
				//paramsText.width = 619 30 0,73344;         
				//paramsText.width = 701 34 0,64764;         
				//paramsText.width = 784 38 0,57908;      
				//paramsText.width = 866 42 0,52424;         
				//paramsText.width = 0,0858;         
				//paramsText.width = 0,06856;         
				//paramsText.width = 0,05484;         
				//paramsText.font = true;         
				paramsText.fontSize = 88;         
				//paramsText.align = "center";   
				//paramsText.stroke = "rgba(0,0,0,0.5)";   
				//paramsText.strokeThickness = 8;   
				paramsText.color = Handler.colorLuaToHex( [103/255,67/255,20/255] );

				if ( params.showBoy != null ) {
					paramsText.x = 60;         
				};         
			   // if ( params.loss != null ) {
			   //     paramsText.width = params.loss ? 200 : 400;         
			   //     paramsText.y = -60;  
			   // };        
				if ( params.locClose != null ) {
					paramsText.y = -120;         
				};     
		 
				let msg = Handler.newText( paramsText );    
				msg.scale.set(1/4);
				msg.x = Math.floor( msg.x - msg.width / 2 );
				console.log('width',msg.width);
				//msg.setFillColor(103/255,67/255,2/255);         
			};        
			 
			/*if ( params.butName != null ) {
				let button = null;
				if ( params.butName == 'Пригласить' ) {
					button = Handler.showImgRect( self.mainGroup, Consts.DIR_WINDS + "butInvite.png", 0, 90, 176, 68 );
				} else {
					button = Handler.showImgRect( self.mainGroup, Consts.DIR_MSG + params.butName+".png", 0, 90, 116, 48 );         
				}
				if ( params.showBoy != null ) {
					button.x = 50;         
				};         

				button.onEL( "pointerdown", function() {
					if ( params.butCallback != null ) params.butCallback();
					self.shutdown(); 
				} );      
			}; */ 
		};
		if ( Handler.windsWithLoadedImages[ Winds.WIND_M ] == null ) {
			Handler.windsWithLoadedImages[ Winds.WIND_M ] = 1;
			let listOfImages = [
				"m/angle.png",
				"m/side.png",
				"m/cross.png",
			];
			ImageLoader.loadAssets(showContent, listOfImages);
		} else {
			showContent();
		};
		
        return self.mainGroup;		
    };         

    CWindM.shutdown = function() {
        let self = this;
        if ( Winds.shutdown( self.windIndex ) ) {
			self.BACK_RECT_NO_INTERACTIVE.isVisible = false;			
            Handler.removeWindAfterTransition( self.mainGroup );         
            //window.Handler.removeImage( self.mainGroup );         
        };         
    };         

 //   export default CWindMsg;