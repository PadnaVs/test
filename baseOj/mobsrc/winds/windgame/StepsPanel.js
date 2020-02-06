	"use strict";
	
    let StepsPanel = {};
   
    StepsPanel.init = function( parentGroup, countSteps ) {
		Handler.destroy( this.group );

	    this.group = Handler.newGroup( parentGroup );
		this.countSteps = countSteps;
 		
		if ( isMobile ) {
			this.back = Handler.showImgRect( this.group, "panelStepsWindGameMob.png", 0, 0, 163, 49 ); 
		} else {
			this.back = Handler.showImgRect( this.group, "panelStepsWindGame.png", 0, 0, 116, 52 ); 
		};
		this.group.x = isMobile ? -138 : -316;
		this.group.y = isMobile ?  328 + ( visibleHeight - visibleHeight0 ) * 0.25 : -110;

        this.showNumber();
		
		this.group.onEL("pointertap", function() { Handler.jlines._mixingGems() } );
		
		return this;
    };    
	
    StepsPanel.showNumber = function( countSteps ) {
	    this.countSteps = countSteps || this.countSteps;
		if ( countSteps == 0 ) this.countSteps = 0;
		Handler.destroy( this.gNumSteps );
		let xSteps = isMobile ? 55 : 30;
		let ySteps = isMobile ?  0 : 3;
        this.gNumSteps = Handler.newGroup( this.group );         
        Handler.showNumber( "o", xSteps, ySteps, this.countSteps, 17, 23, this.gNumSteps, '', 2 );
		this.gNumSteps.x = -Math.floor( this.gNumSteps.width/2 );
		
		return this;
	};