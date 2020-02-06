	"use strict";
	
    let PointsPanel = {};
    PointsPanel._countPoints = 0;
	PointsPanel.countStars = 0;
	
	Object.defineProperty( PointsPanel, "countPoints", {
	    get: function(   ) { return this._countPoints; },		 
	    set: function(val) { 
		    this._countPoints = val;
			this.showNumber();

			let arStars = isMobile ? this.starArrEnMob : this.starArr;
	
			arStars[0].isVisible = this.countPoints >= this.pointsFor1Star;
				if ( arStars[0].isVisible ) this.countStars = 1;
			arStars[1].isVisible = this.countPoints >= Math.floor(this.pointsFor1Star*1.2);
				if ( arStars[1].isVisible ) this.countStars = 2;
			arStars[2].isVisible = this.countPoints >= Math.floor(this.pointsFor1Star*1.4);
				if ( arStars[2].isVisible ) this.countStars = 3;
	
			let per = this._countPoints / this.maxPoints;
			
			if ( per > 1 ) per = 1;
			if ( isMobile )  {
				this.scaled.mask.x = 1*Math.floor( 280 * per );    
			} else {
				this.scaled.mask.y = -1*Math.floor( 112 * per );    
			};
		}
	});
   
    PointsPanel.init = function( parentGroup, pointsFor1Star ) {
		Handler.destroy( this.group );
		
		this.pointsFor1Star = pointsFor1Star;
		this.maxPoints	    = Math.floor( pointsFor1Star*1.4 );
		
	    this.group = Handler.newGroup( parentGroup );
		this.group.x = isMobile ?   75 : -320;
		this.group.y = isMobile ? -297 - ( visibleHeight - visibleHeight0 ) * 0.48 : -205;
 		
		if ( isMobile ) { 
			Handler.showImgRect( this.group, "linePointWindGameMob.png", 0, 0, 285, 21 );
		} else {
			this.back = Handler.showImgRect( this.group, "panelPointWindGame.png", 0, 0, 103, 123 );
		};
		
		if ( isMobile ) { 
			this.scaled = Handler.showImgRect( this.group, "linePointWindGameScaleMob.png", 0, 0, 280, 15 ); 
			this.scaled.mask = Handler.showRect( this.group, 0, 0, 280, 15 );
		} else {
			this.scaled = Handler.showImgRect( this.group, "linePointWindGame.png", -37, 0, 19, 112 ); 
			this.scaled.mask = Handler.showRect( this.group, -37, 112, 21, 112 );
		};
		
		this.starArr = [];
		this.starArrEnMob = [];
		let nameStar = isMobile ? "starPointDisWindGameMob.png" : "starPointWindGame.png";
		let wStar = isMobile ? 36 : 23;
		let xStar = [];
		let yStar = [];
		if ( isMobile ) {
			xStar = [ 45, 85, 125 ];
			yStar = [ -2, -2,  -2 ];
		} else {
			xStar = [ -15, -15, -15 ];
			yStar = [  -6, -27, -46 ];
		};  
		for( let i = 0; i < 3; i++ ) {
			this.starArr[i] = Handler.showImgRect( this.group, nameStar, xStar[i], yStar[i], wStar, wStar );
			this.starArrEnMob[i] = Handler.showImgRect( this.group, nameStar, xStar[i], yStar[i], wStar, wStar );
			this.starArrEnMob[i].isVisible = false;
			if ( isMobile ) this.starArr[i].alpha = 0.5;
		}
		if ( !isMobile ) {
			let textnumPointStarParams1 = {
				fontWeight: 'bold',
				fontSize: 14,
				parent: this.group,
				text : "- "+Math.floor(pointsFor1Star*1.4),
				x : 0,
				y : -55
			};
			let textnumPointStarParams2 = {
				fontWeight: 'bold',
				fontSize: 14,
				parent: this.group,
				text : "- "+Math.floor(pointsFor1Star*1.2),
				x : 0,
				y : -36
			};
			let textnumPointStarParams3 = {
				fontWeight: 'bold',
				fontSize: 14,
				parent: this.group,
				text : "- "+pointsFor1Star,
				x : 0,
				y : -15
			};

			Handler.newText( textnumPointStarParams1 );
			Handler.newText( textnumPointStarParams2 );
			Handler.newText( textnumPointStarParams3 );
		};
		
		this.countPoints = 0;
		
		return this;
    };  
	
    PointsPanel.showNumber = function(  ) {
		if ( this.gNumPoints ) Handler.destroy( this.gNumPoints );

        this.gNumPoints = Handler.newGroup( this.group );
		let xPoints = isMobile ? -168 : this.back.x+20; 
		let yPoints = isMobile ?   -2 : this.back.y+40;
        Handler.showNumber( "o", xPoints, yPoints, this.countPoints, 17, 23, this.gNumPoints, '', 2 );
        this.gNumPoints.x = -Math.floor( this.gNumPoints.width/2 );
		
		return this;
	};
