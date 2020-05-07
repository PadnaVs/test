    const Handler = {};         
 
	Handler.pointerX = null;
	Handler.pointerY = null;
	
	Handler.cooperative = false;
	
	Handler.stringForGeneration = "0123456789ABSDEFGHI";
	
    Handler.isMobile = function() {
        return isMobile != null && isMobile;
    };    
    Handler.isHalfSize = function() {
        return isMobile != null && isMobile && appHalfSize != null && appHalfSize;
    };
    
    Object.defineProperty( Handler, "isOK", {
        get: function(   ) { return Config.NETWORK == Consts.NETWORK_OK; },         
        set: function(val) { }
    });    
    Handler.isDV = function() {
        return Config.NETWORK == Consts.NETWORK_DV;
    };
    Handler.showBank = function() {
        Winds.show( Winds.WIND_BUY_COINS );
    };
    Handler.getUserDataFromServer = function( countAddSteps=0 ) {
        BackClient.ask( BackClient.GET_USER_DATA, Handler.getUserDataAsked );
 
    };
    Handler.getUserDataAsked = function(resp) {
        Head.energy = resp.energy_v;
        Head.bonus  = resp.energy_u;
        Head.coins  = resp.coins;
 
    };
 
    Handler.getCoEnFromServer = function() {
        BackClient.ask( BackClient.GET_COINS_AND_ENERGY, Handler.getCoEnAsked );
    };
    Handler.getCoEnAsked = function( r ) {
        Head.energy = r.energy_v;
        Head.bonus  = r.energy_u;
        Head.coins  = r.coins;
    };
 

    Handler.setStartScreenSize = function( pageInfo ) { 
        pageInfo = pageInfo || SocialClient.pageInfo;
        if ( pageInfo == null ) return;
        
        let cw = parseInt( pageInfo.innerWidth  );
        let ch = parseInt( pageInfo.innerHeight );
        
        let ew = Math.floor( 10*cw / pixiAppWidth );
        let scalew = Math.floor( ew / 2 ) * 0.2;
        let eh = Math.floor( 10*ch / pixiAppHeight );
        let scaleh = Math.floor( eh / 2 ) * 0.2;
        let scale = Math.min( scalew, scaleh, 3 );
        
        pixiAppScale  = Math.max( 1.0, scale );
        pixiAppScale  = Math.min( 3.0, pixiAppScale );
        
        
        let checkAndResizeApp = function() {
 
                
                Handler.setTagWidth( document.querySelector('#container') );
                Handler.setTagWidth( document.querySelector('#tab3'     ) );
                Handler.setTagWidth( document.querySelector('#app'      ) );
            
                pixiApp.renderer.resize( pixiAppWidth  * pixiAppScale, pixiAppHeight * pixiAppScale );
                pixiApp.stage.scale.x = pixiAppScale;
                pixiApp.stage.scale.y = pixiApp.stage.scale.x;
 
        }
        
        let cHeight = Math.floor( pixiAppHeight * pixiAppScale + 280 );
        if ( cHeight >= 800 && cHeight <= 4000 ) {
            //in full screen width ignoring
            let appMain_Div = document.querySelector( '#appMain_Div' );
            if ( appMain_Div != null ) appMain_Div.style.height = cHeight+"px";
            FAPI.UI.setWindowSize( 1260, cHeight );//почему то этот метод работает не у всех
            
            //проверяем через 1 секунду, поменялся ли экран
            setTimeout( checkAndResizeApp, 1000 )
            
            //FAPI.UI.setWindowSize( 760, pixiAppWidth  * pixiApp.stage.scale.y + 280 );
        }
    };
    Handler.setTagWidth = function( tag ) {
        if ( tag != null && pixiAppWidth != null && pixiAppScale != null ) {
            //tag.width  = pixiAppWidth  * pixiApp.stage.scale.x;//pixiApp.stage.width;
            //tag.height = pixiAppHeight * pixiApp.stage.scale.y;//pixiApp.stage.height;
            //tag.style.width  = ( pixiAppWidth  * pixiApp.stage.scale.x ) + "px";
            //tag.style.height = ( pixiAppHeight * pixiApp.stage.scale.y ) + "px";
            tag.style.width  = ( pixiAppWidth  * pixiAppScale ) + "px";
            tag.style.height = ( pixiAppHeight * pixiAppScale ) + "px";
        }
    };
    Handler.removeImage = function( img ) {
        if ( img != null ) {
            Handler.destroy( img );
            //img.removeChildren();
            //let remimg = function() {  img . removeSelf(); };         
            //JSJump.pcall( remimg );         
            //img = null;         
        };         
    };     
    Handler.destroy = function( obj ) {
        if ( obj != null ) {
            //console.log('Handler.destroy: obj name is '+obj.name);
            if ( obj.parent != null ) obj.parent.removeChild( obj );
            
            let destroyAfterSecond = function() {
                if ( obj != null ) {
                    if ( obj.removeChildren != null ) {
                        obj.removeChildren();
                    }
                    //obj.destroy();
                    obj = null; 
                }
            }
            obj.visible = false; 
            setTimeout( destroyAfterSecond, 5000 );
            
        }
    };         

    Handler.removeWindAfterTransition = function( img ) {
        if ( img != null ) {
            let newy = pixiApp.screen.height;         
            let removeImg = function() {
                img.removeSelf();      
                img = null;         
            };         
            Handler.transition_to( img, { time:Consts.TIME_WINDOW_MOVE, y:newy, alpha:0.2, onComplete:removeImg } );         
            Sounds.closewind();
        };         
    };
    Handler.timersPaused = {};
    Handler.timer_cancel = function( idInt ) {
        Handler.timersPaused[ 'tid'+idInt ] = null;
        clearInterval( idInt );
    };    
    Handler.timer_pause = function( idInt ) {
        Handler.timersPaused[ 'tid'+idInt ] = true;
    };    
    Handler.timer_resume = function( idInt ) {
        Handler.timersPaused[ 'tid'+idInt ] = null;
    };
    Handler.timer_performWithDelay = function( delay, func, iter=1 ) {
        let count = 0;
        let ticker = function() {
            if ( Handler.timersPaused[ 'tid'+idInt ] == null ) {
                func();
                count++;
                if ( count == iter && iter != 0 && iter != -1 ) {
                    clearInterval( idInt );
                }
            }
        };
        let idInt = setInterval(ticker, delay);
        return idInt;
    };
    Handler.transition_to = function( obj, params ) {
        if ( obj         == null ) return;
        if ( params      == null ) return;
        if ( params.time == null ) return;
        
        const time = params.time / 1000;
        params.delay = params.delay != null ? params.delay / 1000 : 0;
        delete params.time;
        if ( params.ease == null ) params.ease = "none";

        if ( obj == null ) return;
        TweenMax.to( obj, time, params );
    };    
    Handler.cv = function(val) {
        return val > 9 ? ''+val : '0'+val;
    }
    Handler.addChild = function( parent, child ) {
        if ( parent == Consts.WITHOUT_PARENT ) return;
        if ( parent != null ) {
            parent.addChild( child );
        } else {
            pixiApp.stage.addChild( child );
        }
    }
    Handler.newGroup = function( iparent ) {
        let cont = new PIXI.Container();
        Handler.addChild( iparent, cont );
        cont.insert = cont.addChild;
        //pixiApp.stage.scale.x = pixiAppScale;
        //pixiApp.stage.scale.y = pixiAppScale;
        Handler.addExtraMethods( cont );
        
        return cont;
        
        //const sprite = new PIXI.Sprite(texture);
        //sprite.interactive = true;
        //sprite.on('tap', (event) => {
           //handle event
        //});
    };
    Handler.addExtraMethods = function(obj) {
        obj.translate   = function( nx, ny ) { this.x = nx; this.y = ny; };
        obj.onEL        = function( evt, listener ) { this.buttonMode = true; this.interactive = true; this.on( evt, listener ); };
        obj.rotate      = function( degrees ) { this.angle = degrees; };
        obj.removeSelf  = function( ) { Handler.destroy( this ); };
        obj.scaleXY     = function(sx,sy) { this.scale.x = sx; this.scale.y = sy; };
        Object.defineProperty( obj, "isVisible", {
            get: function(   ) { return this.visible; },         
            set: function(val) { this.visible = val; }
        });
        Object.defineProperty( obj, "scaleX", {
            get: function(  ) { return this.scale.x; },         
            set: function(nx) { this.scale.x = nx;   }
        });
        Object.defineProperty( obj, "scaleY", {
            get: function(  ) { return this.scale.y; },         
            set: function(ny) { this.scale.y = ny;   }
        });
        obj.toBack  = function() {
            this.parent.sortableChildren = true;
            let minZIndex = 100;
            this.parent.children.map( function(n){ minZIndex = Math.min(n.zIndex,minZIndex); } );
            this.zIndex = minZIndex - 1; 
        };
        obj.toFront = function() {
            this.parent.sortableChildren = true;
            let maxZIndex = 0;
            this.parent.children.map( function(n){ maxZIndex = Math.max(n.zIndex,maxZIndex); } );
            this.zIndex = maxZIndex + 1; 
        };
    }
    Handler.addImg = function( iparent, ipath, ix, iy ) {
	    const texture = PIXI.Texture.from( ipath );

        if ( texture.baseTexture.hasLoaded ) {
	        const img = new PIXI.Sprite( texture );
            img.x = ix;    img.y = iy;
            iparent.addChild(img);
		} else {
		    texture.baseTexture.on( "loaded", (evt)=>{
	            const img = new PIXI.Sprite( texture );
                img.x = ix;    img.y = iy;
                iparent.addChild(img);
		    } );
		}
		//return img;
	}
		
    Handler.showImg = function( iparent, ipath, ix, iy, withAnchor=true  ) {
        const texture = PIXI.Texture.from( ipath );
        let img = PIXI.Sprite.from( texture );
        
        Handler.addChild( iparent, img );
        
        if ( withAnchor ) img.anchor.set( 0.5 );
        img.x = ix + ( img.width  % 2 )*0.5*withAnchor;
        img.y = iy + ( img.height % 2 )*0.5*withAnchor;
        
        Handler.addExtraMethods(img);
        return img;
    };         

    Handler.showImgRect = function( iparent, ipath, ix, iy, iw, ih, withAnchor=true ) {
        const texture = PIXI.Texture.from( ipath );
        let img = PIXI.Sprite.from( texture );
        
        Handler.addChild( iparent, img );
        
        img.width  = iw || img.width;
        img.height = ih || img.height;
 
        if ( withAnchor ) img.anchor.set(0.5);
        img.x = ix;// + (iw % 2)*0.5*withAnchor;
        img.y = iy;// + (iw % 2)*0.5*withAnchor;
 
        Handler.addExtraMethods(img);
        //img.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; 
        return img;
    }; 
    Handler.showAnimSprite = function( iparent, idata, ix, iy, iw, ih, speed, withAnchor=true ) {
        //let idata = ["image_sequence_01.png","image_sequence_02.png","image_sequence_03.png","image_sequence_04.png"];
        let textureArray = [];
        if ( idata.points ) {//create from texture atlas
            let atlas = new PIXI.BaseTexture.from( idata.path );

            for ( let i=0; i<idata.points.length; i++ ) {
                let t = null;
                if ( idata.orientation == Consts.GORIZONT_ANIM ) {
                    t = new PIXI.Texture( atlas, new PIXI.Rectangle( idata.points[i]*i, 0, idata.points[i], atlas.height ) );                    
                } else {
                    t = new PIXI.Texture( atlas, new PIXI.Rectangle( 0, idata.points[i]*i, atlas.width, idata.points[i]  ) );        
                }
                let texture = { texture: t, time: speed };//820 anim speed for gemSuper
                textureArray.push( texture );
            }; 
        } else {
            for ( let i=0; i < idata.length; i++ ) {
                //let texture = { texture: PIXI.Texture.from( idata[i] ), time: speed };//820 for gemSuper
                //textureArray.push( texture );
                
                let texture = PIXI.Texture.from( idata[i] );
                textureArray.push( texture );
                //pixiApp.renderer.bindTexture(texture)
            };
        }
        let anim = new PIXI.AnimatedSprite( textureArray );
                
        Handler.addChild( iparent, anim );
        
        anim.width  = iw || anim.width;
        anim.height = ih || anim.height;
        
        if ( withAnchor ) anim.anchor.set(0.5);
        anim.x = ix + (iw % 2)*0.5*withAnchor;
        anim.y = iy + (iw % 2)*0.5*withAnchor;
        
        Handler.addExtraMethods( anim );
        if ( idata.points == null ) anim.animationSpeed = speed || anim.animationSpeed;
            
        return anim;
    };         
    Handler.showImgDir = function( iparent, ipath, ix, iy, dir ) { 
        let img = iparent != null ? Handler.newImage( iparent, ipath, dir ) : Handler.newImage( ipath, dir );         
        img.x = ix;    img.y = iy;         
        return img;         
    };
    Handler.showImgRectDir = function( iparent, ipath, ix, iy, iw, ih, dir ) { 
        let img = null;
        if ( iw == null || ih == null ) {
            img = iparent != null ? Handler.newImage( iparent, ipath, dir ) : Handler.newImage( ipath, dir );         
        } else {
            img = iparent != null ? JSJump.newImageRect( iparent, ipath, dir, iw, ih ) : JSJump.newImageRect( ipath, dir, iw, ih );         
        };         
        img.x = ix;    img.y = iy;         
        return img;         
    };         

    //Handler.contentCenterX  = Math.floor( pixiAppWidth  * pixiAppScale / 2 );
    //Handler.contentCenterY  = Math.floor( pixiAppHeight * pixiAppScale / 2 );
    //Handler.contentCenterX  = Math.floor( pixiAppWidth / 2 );
    //Handler.contentCenterY  = Math.floor( pixiAppHeight / 2 );
    
    Object.defineProperty( Handler, "contentCenterX", {
        get: function() { return Math.floor( pixiAppWidth  / 2 ); }
    });     
    Object.defineProperty( Handler, "contentCenterY", {
        get: function() { return Math.floor( pixiAppHeight / 2 ); }
    }); 
    //Handler.contentWidth  = pixiAppWidth*pixiAppScale;
    //Handler.contentHeight = pixiAppHeight*pixiAppScale;
    Object.defineProperty( Handler, "contentWidth", {
        get: function() { return Math.floor( pixiAppWidth*pixiAppScale ); }
    });     
    Object.defineProperty( Handler, "contentHeight", {
        get: function() { return Math.floor( pixiAppHeight*pixiAppScale ); }
    }); 
    
    Handler.newRect = function( rgroup, rx, ry, rwidth, rheight, rcolor=[1,1,1], ralpha=1, rrad=0 ) {
        return Handler.showRect( rgroup, rx, ry, rwidth, rheight, rcolor, ralpha, rrad );
    } 
    Handler.showRect = function( rgroup, rx, ry, rwidth, rheight, rcolor=[1,1,1], ralpha=1, rrad=0, widthLine=0, colorLine=[1,1,1] ) {
        if ( typeof rgroup == "number" ) {
            rheight = rwidth;
            rwidth = ry;
            ry = rx;
            rx = rgroup;
        }
        let resColor = typeof rcolor == "object" ? Handler.colorLuaToHex( rcolor ) : rcolor;

        const graphics = new PIXI.Graphics();
		graphics.lineStyle( widthLine, colorLine ); // = styleLine;
        graphics.beginFill( resColor, ralpha );
        graphics.drawRoundedRect ( 0, 0, rwidth, rheight, rrad );//graphics.drawRect( rx, ry, rwidth, rheight );
        graphics.endFill();
		graphics.x = rx;  
		graphics.y = ry;
		
        if ( typeof rgroup != "number" ) {
            Handler.addChild( rgroup, graphics );
        }
        Handler.addExtraMethods( graphics ); 
		graphics.zIndex = Handler.zIndex++;			
        return graphics;
    };         
    Handler.showRoundedRect = function ( iparent, ix, iy, iw, ih, color, angle, widthLine, colorLine ){
        const graphics = new PIXI.Graphics();
        graphics.lineStyle(  widthLine, colorLine );
        graphics.beginFill(color);
        graphics.drawRoundedRect(ix, iy, iw, ih, angle);
        if( iparent != null ){
            iparent.addChild(graphics);
        }
        graphics.endFill();
        Handler.addExtraMethods(graphics);
        return graphics;
    }
    Handler.loadedPhotos = {};         
    Handler.loadAndDrawRemoteImage = function( rgroup, url, file_name, ix, iy, iw, ih, fcallback ) {
        const loader = new PIXI.Loader();
        loader.add( file_name, url, { crossOrigin: false, loadType: 2 } );
        //loader.add( file_name, url, { crossOrigin:false, loadType: Resource.LOAD_TYPE.IMAGE } );
        const onImageLoaded = function() {
            let img = null;
            if ( iw == null || ih == null ) {
                fcallback = iw || fcallback;
                img = Handler.showImg( rgroup, file_name, ix, iy );
            } else {
                img = Handler.showImgRect( rgroup, file_name, ix, iy, iw, ih );
            };        
            if ( fcallback != null ) {
                img.myFN = file_name;
                fcallback(img);         
            }; 
        };
        loader.load( onImageLoaded );
    };         

    Handler.showNumber = function( fname, cx, cy, num, nw, nh, gParent, dir, shift=0 ) {
        let gNumber = Handler.newGroup( gParent );
        gNumber.translate( cx, cy );

        let str = num+'';

        for ( let i = 0; i<str.length; i++ ) {
            let ch = str.substr(i,1);
            let newX = nw*i-shift*i;
            Handler.showImgRect( gNumber, dir+fname+ch+".png", newX,0, nw, nh );
        };
        return gNumber;
    };
    Handler.removeGroupChilds = function( fgroup ) {
        fgroup.removeChildren();                
    };         

    Handler.setMaskOnPhoto = function(maskName,myImage,photoWidth,photoHeight) {
        let self = this;
        if ( maskName != null ) {
            let mask = graphics.newMask( maskName );//photoMask         
            myImage.setMask( mask );         
        };         
        let pwidth  = photoWidth  != null ? photoWidth  : 80;         
        let pheight = photoHeight != null ? photoHeight : 80;         
         
        let shifty = 0;         
        if ( myImage.width < myImage.height ) {
            let sc = pwidth / myImage.width;         
            myImage.width = pwidth;         
            myImage.height = myImage.height * sc;         
            shifty = ( myImage.height - pheight ) / 2;         
        } else {
            let sc = pheight / myImage.height;         
            myImage.height = pheight;         
            myImage.width = myImage.width * sc;         
        };         
    };        


    Handler.cv = function( num ) {
        return num > 9 ? ''+num : '0'+num;
    }
    Handler.colorLuaToHex = function( col, with255=true ) {
        const mul = with255 ? 255 : 1;
        let res = '0x';
        for ( const c of col ) {
            if ( c*mul > 9 ) res += (Math.floor(c*mul)).toString(16)
            else             res += '0'+(Math.floor(c*mul)).toString(16)
        }
        return res;
    };
    Handler.newText = function( params ) {
        let mobscale = 1;
        //let mobscale = Handler.isHalfSize() ? 1 : 2;
        //mobscale = 2;
            //self.mainGroup.scale.set(0.98);
        
        params = params || {};
        params.align      = params.align      || 'left';
        params.fontFamily = params.fontFamily || 'Arial';
        params.fontSize   = params.fontSize   || 22;
        params.lineJoin   = params.lineJoin   || 'round';
        params.fontWeight = params.fontWeight || 'bolder';
        params.fill       = params.color      || '#000000';
        params.parent     = params.parent     || pixiApp.stage;
        params.anchor	  = params.anchor	  || 0;
        params.fontSize   = params.fontSize * mobscale;
        params.strokeThickness = params.strokeThickness || 0;
        params.strokeThickness *= mobscale;
        params.dropShadowBlur *= mobscale;
        
        const style = new PIXI.TextStyle( params );
        const richText = new PIXI.Text( params.text || '', style );
        richText.scale.set(1/mobscale);
        richText.x = params.x || 0;
        richText.y = params.y || 0;

        //richText.roundPixels = true;
        richText.anchor.set(params.anchor, params.anchor);
        
        params.parent.addChild(richText);

        return richText;
    };

    Handler.toNumber = function( val ) {
        let tmpVal = ''+val;
        return Number( tmpVal.replace(',', '.') );
    };
    Handler.isValidFloat = function( val ) {
        return !Number.isNaN( Handler.toNumber( val ) );
    };
    Handler.isValidInteger = function( val ) {
       return Number.isInteger( Handler.toNumber( val ) );
    };
	
	Handler.createStrForCooperative = function( num ) {
		this.strPlayCooperative = Consts['STR'+num];
		//switch( num ) {
		//	case 0:
		//		this.strPlayCooperative = Consts.STR0;
		//	break;
		//	case 1:
		//		this.strPlayCooperative = Consts.STR1;
		//	break;
		//	case 2:
		//		this.strPlayCooperative = Consts.STR2;
		//	break;
		//	case 3:
		//		this.strPlayCooperative = Consts.STR3;
		//	break;
		//	case 4:
		//		this.strPlayCooperative = Consts.STR4;
		//	break;
		//	case 5:
		//		this.strPlayCooperative = Consts.STR5;
		//	break;
		//	case 6:
		//		this.strPlayCooperative = Consts.STR6;
		//	break;
		//	case 7:
		//		this.strPlayCooperative = Consts.STR7;
		//	break;
		//	case 8:
		//		this.strPlayCooperative = Consts.STR8;
		//	break;
		//	case 9:
		//		this.strPlayCooperative = Consts.STR9;
		//	break;
		//}
	};
	
	Handler.translationCharToNum = function( _symbol ) {
		let res = this.stringForGeneration.indexOf( _symbol );
		return res;
	};
    