	
	"use strict";
	
	let MyScore = {};
	
	MyScore.usersMyScore = [];
	
	/*MyScore.setCallBack = function( callback ) {
		this.callback = callback;
		//this.callback( this.usersMyScore, self.myScoreStarPlace );
	}*/
	
	MyScore.showMyRating = function( callback ) {
		let self = this;
		this.callback = callback;
		 
		//if ( self.myRateShowingStarted ) return;
		//self.myRateShowingStarted = true;
		if ( this.usersMyScore.length > 0 ) {
		    this.callback( this.usersMyScore, Consts.MY_SCORE, self.myScoreStarPlace );
			/*this.users = this.usersMyScore;         
		    this.shiftUsers = 0;
			this.showCards();*/
		} else if( Handler.isDV() ) { //Handler.isDV()
			self.initMyScore( self.respmyscore );
		} else {
		    BackClient.ask( BackClient.GET_MY_SCORE, function(r){self.initMyScore(r);}, {oid:User.viewer_id} );
		}
	};
	MyScore.initMyScore = function( resp ) {
		let self = this;
		self._topAll = resp['a'];
		let oids = [];
		for ( let s in self._topAll ) 
			oids.push( self._topAll[s]['oid'] );
		
		if ( Handler.isDV() ) {//Handler.isDV()
			self.onGetUsersProfilesForMy( self.ressnmyscore );
		} else {
		    SocialClient.userGetProfiles( function(r){self.onGetUsersProfilesForMy(r);}, oids);
		}
	};
	
	MyScore.onGetUsersProfilesForMy = function( ressn ) {
		this.onGetUsersProfiles( ressn, this._MY_RATE );
	};
	MyScore.onGetUsersProfiles = function( res, typeRate ) {
		let self = this;
		//Handler.loadingStart();
		//Handler.loadingStop();
		let resp = [];
		
		for ( let usr of res ) {
			resp[ usr.uid ] = { pic : usr.pic_2 || usr.pic_big };
			resp[ usr.uid ].name = usr.first_name+" "+usr.last_name;
		}
		
		let ftop = ( typeRate == self._MY_RATE ) ? self._topAll : self._topVip;
		let places = [];
		places = Object.keys(ftop);
		self.myScoreStarPlace = parseInt( places[0] );
		//let places = [];
		//for ( s in ftop ) {
		//	places.push(s);
		//}
		let maxPlaces = ( typeRate == self._MY_RATE ) ? 3 : 7;
		let x = -150; let y = - 148;
		for ( let i = 0; i <= 3; i++ ) {
            if ( places[i] == null ) continue;
			let place = 0; 
			let pic  = null, name = 'Игрок', exp = 0, uid = 0;
			
			if ( ftop[places[i]]['oid'] && resp[ftop[places[i]]['oid']] ) {
				pic  = resp[ftop[places[i]]['oid']].pic;
				name = resp[ftop[places[i]]['oid']].name;
				uid = ftop[places[i]]['oid'];
			}
			if ( ftop[places[i]] )
				exp = ftop[places[i]]['exp'];
			
			this.usersMyScore.push({ url    : pic || Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg', 
			                         uid    : uid, 
								     name   : name, 
								     points : exp         } );       
			/*
			place = parseInt( places[i] ) + 1;
			if ( typeRate == self._MY_RATE ) {
                self.showUserCard( self.userCards, x, y, uid, pic, place, exp, name );
				y += 105;
			} else {
//				self.showUserCard( self.mainGroup, 22+(i % 2)*205, -147+(Math.floor(i / 2))*105, uid, pic, place, exp, name );
			}
			*/
		} 
		this.callback( this.usersMyScore, Consts.MY_SCORE, self.myScoreStarPlace );
		/*
		this.users = this.usersMyScore; 
		this.shiftUsers = 0;
        this.showCards();*/
	};
	
	 MyScore.respmyscore = {
    	a:{
    		"264346" : { exp:"389468", oid:"129012946464" },
    		"264347" : { exp:"389462", oid:"555027185260" },
    		"264348" : { exp:"389456", oid:"579089224503" },
    		"264349" : { exp:"389453", oid:"514097834586" }
    	},
    	d:	null,
    	m:	null	
    };
	MyScore.ressnmyscore =	[
    	{
    		first_name	:"Алина",	
    		gender	:"female",	
    		last_name	:"Густав-Дальская",	
    		photo	:"https://i.mycdn.me/image?id=867913757472&t=2&plc=API&aid=177033216&tkn=*Z_OzkaGTB7SH9l8soCzV2xanyDQ",	
    		pic_2	:"https://i.mycdn.me/image?id=867913757472&t=2&plc=API&aid=177033216&tkn=*Z_OzkaGTB7SH9l8soCzV2xanyDQ",	
    		uid	:"129012946464",	
    		url_profile	:"https://ok.ru/profile/129012946464" 
        },		
    	{
    		first_name	:"Dind",	
    		gender	:"male",	
    		last_name	:"Games",	
    		photo	:"https://i.mycdn.me/res/stub_128x96.gif",	
    		pic_2	:"https://i.mycdn.me/res/stub_128x96.gif",	
    		uid	:"514097834586",	
    		url_profile	:"https://ok.ru/profile/514097834586"
    	},		
    	{
    		first_name	:"ღMiLeNa",	
    		gender	:"female",	
    		last_name	:"ღKaLaS",	
    		photo	:"https://i.mycdn.me/image?id=854589401399&t=2&plc=API&ts=00&aid=177033216&tkn=*CIWMkw7hb1q53dM4F8kOnhVfnxU",	
    		pic_2	:"https://i.mycdn.me/image?id=854589401399&t=2&plc=API&ts=00&aid=177033216&tkn=*CIWMkw7hb1q53dM4F8kOnhVfnxU",	
    		uid	:"579089224503",	
    		url_profile	:"https://ok.ru/profile/579089224503"
    	},		
    	{
    		first_name	:"Вера",	
    		gender	:"female",	
    		last_name	:"Вдовина (Капустина)",	
    		photo	:"https://i.mycdn.me/image?id=886325245548&t=2&plc=API&ts=00&aid=177033216&tkn=*J8t_ukyyRNfpN1RKjBabivesTu0",	
    		pic_2	:"https://i.mycdn.me/image?id=886325245548&t=2&plc=API&ts=00&aid=177033216&tkn=*J8t_ukyyRNfpN1RKjBabivesTu0",	
    		uid	:"555027185260",	
    		url_profile	:"https://ok.ru/profile/555027185260"
    	}
    ];
	