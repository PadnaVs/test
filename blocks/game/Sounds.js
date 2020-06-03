	
	let Sounds = {};
	Sounds.soundsCache = [];
	
	Sounds.msOn = false;
	
	Sounds.init = function() {
		let soundEnOrDis = function( evt ) {
			if ( document.hidden ) {
				Sounds.Stop();
				Sounds.msOn = false;
			} else {
				Sounds.Play();
				Sounds.msOn = true;
			};
		}
		//document.addEventListener("visibilitychange", soundEnOrDis );
		//if ( Sounds.msOn ) {
		//    setTimeout( function() { Sounds.Play(); }, 500 );
		//}
	};
	
	Sounds.playBody = function( key, fname, _speed=1, _volume=1, _loop=false ) {
        let self = this;
		try {
		    if ( this.soundsCache[key] ) {
		    	this.soundsCache[key].play();
				this.soundsCache[key].speed = _speed;
				this.soundsCache[key].volume = _volume;
				this.soundsCache[key].loop = _loop;
		    } else {
		    	PIXI.sound.Sound.from({
		    		url: './sounds/' + fname,
		    		autoPlay: false,
                    preload: true,
                    loaded: function(err, _sound) {
		    			if ( _sound ) {
	                	    self.soundsCache[key] = _sound;
                            _sound.play();
                            _sound.speed = _speed;
                            _sound.volume = _volume;
                            _sound.loop = _loop;
		    			}
                    }
		    	});
            
		    };
		} catch ( err ) {
			console.error(err);
		    Log.onErrorCatched( err );
	    }
	}

	Sounds.Play = function() {
		Sounds.msOn = true;
		this.playBody( 'background', 'Podington_Bear_-_Robins_Egg_Blue.mp3', 0.8, 0.7, true );
	};
	Sounds.Stop = function() {
		Sounds.msOn = false;
		if (this.soundsCache['background'] != null) {
			this.soundsCache['background'].stop();
		};
	};
	Sounds.openwind = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'openwind', 'openwind.mp3' );
	}	
	Sounds.closewind = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'openwind', 'openwind.mp3' );
	}		
    Sounds.playSingle = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'roundwin', 'roundwin.mp3' );
	}
    Sounds.playCharSel = function(num=1) {
		if ( !Sounds.msOn ) return;
		if ( num < 1 ) num = 1;
		if ( num > 7 ) num = 7;
		this.playBody( 'chsel'+num, 'chsel'+num+'.mp3', 1.2, 0.6 );
		//this.playBody( 'sel'+num, 'sel'+num+'.mp3' );
	}	    
	Sounds.wrongWord = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'wrongWord', 'wrongWord.mp3', 1, 2 );
	}		
	Sounds.correctWord = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'correctWord', 'correctWord.mp3', 1, 2 );
	}	
	Sounds.superBonus = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'superBonus', 'superBonus.mp3', 1, 1 );
	}			
	Sounds.bonus = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'bonus', 'bonus.mp3', 1.2, 1 );
	}		
	Sounds.levelComplete = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'levelComplete', 'levelComplete.mp3', 1, 8 );
	}	
	Sounds.openWind = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'openWind', 'openWind.mp3', 2, 0.6 );
	}		
	Sounds.mix = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'mix', 'mix.mp3', 1.4, 2 );
	}		
	Sounds.airplane = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'airplane', 'airplane.mp3', 1.4, 2 );
	}		
	Sounds.click = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'click', 'click.mp3', 1, 3 );
	}	
	Sounds.removeLine = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'removeLine', 'removeLine.mp3', 1, 3 );
	}
	Sounds.figureGetUp = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'figureGetUp', 'figureGetUp.mp3', 2.5, 3 );
	}
	Sounds.figureDown = function() {
		if ( !Sounds.msOn ) return;
		this.playBody( 'figureDown', 'figureDown.mp3', 1, 3 );
	}
	//https://www.freesoundeffects.com/searches/win/3/20/
	//https://www.zapsplat.com/music/game-sound-retro-digital-fanfare-level-complete-or-achievement-tone-5/
		