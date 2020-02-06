	
	"use strict";
	
	let CWindSmallRating = {};
	
	CWindSmallRating.showWindRating = function( params ) {
		let self = this;
		let loader = new PIXI.Loader();
		Handler.visibleRt = true;
		self.windRGroup = Handler.newGroup();
		self.windRGroup.interactive = true;
		self.windRGroup.sortableChildren = true;
		Handler.showImgRect(self.windRGroup,"backgrWindR.png",0,0,300,578);
		if ( isMobile ) {
			let touchCross = function() {
				self.windRGroup.removeSelf();
				Handler.visibleRt = false;
			}
			let cross = Handler.showImgRect(self.windRGroup,"cross.png",32,-285,36,36);
			cross.onEL('pointertap',touchCross);
		}
		/*
		let arrowUp   = Handler.showImgRect( self.windRGroup, "arrowUp.png",   -35,-278, 44,26 );
		let arrowDown = Handler.showImgRect( self.windRGroup, "arrowDown.png", -35, 208, 44,26 );
		
		if ( isMobile ) {
			arrowUp.x   =   0;
			arrowUp.y   = 208;
			arrowDown.x = -70;
		}
		self.gRate = Handler.newGroup( self.group );  
		self.shiftUsers = 0;
		let onDownArr = function(evt){
			if ( self.shiftUsers < self.ressn2.length-3 ) {
				self.shiftUsers	+= 1;
				self.showMyRating();
			};
		}
		arrowDown.onEL("pointerdown", onDownArr);
		
		let onUpArr = function(evt){
			if ( self.shiftUsers != 0 ) {
				self.shiftUsers	-= 1;
				self.showMyRating();
			};
		}
		arrowUp.onEL("pointerdown", onUpArr);
*/
		let butInviteFr = Handler.showImgRect(self.windRGroup,"butInviteFr.png",-35,245,149,46);
		butInviteFr.onEL("pointerdown", function(){ SocialClient.invite(); } );
 
//this.showMyRating();
		
		let levNum = parseInt( params.levelNumber );
        let friendInAppIDOID = self.getFriendsAppIDOID( levNum );//array of { oid & id }
		console.log('friendInAppIDOID');
		console.log(friendInAppIDOID);
		
		if ( friendInAppIDOID.length > 0 ) {
            if ( Handler.isDV() ) {
                //self.onGetFrLevScore( self.res1 );//self.res1 is not defined
            } else {
				let bcparams = { oids: JSON.stringify( friendInAppIDOID ), lev: levNum, mob: 1  };
                BackClient.ask( BackClient.GET_FRIENDS_LEVEL_SCORE, function(r){ self.onGetFrLevScore(r); }, bcparams );
            }
        }
		
		return self.windRGroup;
	};
//---------------------------------------
    CWindSmallRating.onGetFrLevScore = function( res ) {
        let self = this;

        //res['scores'] //Array of Object -> score -> outer_id -> oid
        let imgSize = 94;
        let onImageLoaded = function( loadedImage ) {
            //Handler.setMaskOnPhoto( Consts.DIR_END_LEVEL_REAR+"photoMask.jpg",limage,60,60 );
            let iScale = loadedImage.width < loadedImage.height ? imgSize / loadedImage.width : imgSize / loadedImage.height;
            loadedImage.scale.x = iScale;
            loadedImage.scale.y = iScale;
            let imask = Handler.showRect( loadedImage.parent, loadedImage.x-imgSize/2, loadedImage.y-imgSize/2, imgSize, imgSize, [1,1,1], 1, 4 ); 
            //imask.filters = [new PIXI.filters.BlurFilter(32)];
            loadedImage.mask = imask;
        };
        
		self.userCards = Handler.newGroup( self.windRGroup );
        let maxPlaces = 3;
		for ( let i = 0; i < maxPlaces; i++ ) {
			if ( res['scores'][i] != null ) {
                let uid = res['scores'][i]['outer_id'];
                let exp = res['scores'][i]['score'];
				
				let pic = null;
                let name = "Игрок";
                let user = BottomPanel.friendsProfiles[ parseInt(uid) ];
				if ( user != null ) {
					pic  = user.photo || user.pic_2;
					name = user.first_name;
				}
                if ( pic == null ) pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
                if ( pic.indexOf('.gif') >= 0 ) pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
 
                //https://api.ok.ru/img/stub/user/female/128.png //cross origin
                //https://api.ok.ru/img/stub/user/female/128.png //cross origin
                if ( pic.indexOf('api.ok.ru/img/stub/user/male/') >= 0 )   
                    pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
                if ( pic.indexOf('api.ok.ru/img/stub/user/female/') >= 0 ) 
                    pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
                if ( pic.indexOf('/male/128.png') >= 0 )   
                    pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
                if ( pic.indexOf('/female/128.png') >= 0 ) 
                    pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
                if ( pic == '' || pic == null )
                    pic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
				
                self.showUserCard( self.userCards, -6, -190+i*155, uid, pic, i+1, exp, name );
			}
		}  
		
        /*for ( let i = 4; i>=1; i-- ) {
            let userCardG = Handler.newGroup( self.rateGroup );
			if ( Handler.isMobile() ) {
                userCardG.translate( 292, -146+94*(i-1) );
			} else {
                userCardG.translate( 292, -134+88*(i-1) );
			}
            let userCardBack = Handler.showImgRect( userCardG, Consts.DIR_END_LEVEL_REAR+"userCardBack.png", 0, 0, 129,106 );         
            userCardBack.tint = 0xD37B34;//userCardBack.tint = 0xD16600;
			
            let pointPers = null;         
            if ( res['scores'][i-1] != null ) {
                let oid = res['scores'][i-1]['outer_id'];
                pointPers = res['scores'][i-1]['score'];
                
                let user = BottomPanel.friendsProfiles[ parseInt(oid) ];
                let photoUrl = user ? user.photo : Consts.DIR_WINDS + 'photoModel.jpg';
                if ( photoUrl.indexOf('.gif') >= 0 ) photoUrl = Consts.DIR_WINDS+'photoModel.jpg';
 
                //https://api.ok.ru/img/stub/user/female/128.png //cross origin
                //https://api.ok.ru/img/stub/user/female/128.png //cross origin
                if ( photoUrl.indexOf('api.ok.ru/img/stub/user/male/') >= 0 )   
                    photoUrl = Consts.DIR_WINDS+'photoModel.jpg';
                if ( photoUrl.indexOf('api.ok.ru/img/stub/user/female/') >= 0 ) 
                    photoUrl = Consts.DIR_WINDS+'female128.png';
                if ( photoUrl.indexOf('/male/128.png') >= 0 )   
                    photoUrl = Consts.DIR_WINDS+'photoModel.jpg';
                if ( photoUrl.indexOf('/female/128.png') >= 0 ) 
                    photoUrl = Consts.DIR_WINDS+'female128.png';
                if ( photoUrl == '' || photoUrl == null )
                    photoUrl = Consts.DIR_WINDS+'photoModel.jpg';

                let userPhotoG = Handler.newGroup( userCardG );
                Handler.loadAndDrawRemoteImage( userPhotoG, photoUrl, oid+".jpg",-2,-2,null,null, onImageLoaded );
            } else {
                let vegetabl = Handler.showImg( userCardG, Consts.DIR_END_LEVEL_REAR+"v"+i+".png",0,0);         
                if ( !Handler.isHalfSize() ) {
			        vegetabl.width  = Math.floor( vegetabl.width  / 2 );         
                    vegetabl.height = Math.floor( vegetabl.height / 2 );    
				}
                pointPers = 1000-i*120;         
            };        
            Handler.showNumber("rd",-40,-28,i,         16,22, userCardG, Consts.DIR_END_LEVEL_NUMBERS );
            Handler.showNumber("rd", 14, 34,pointPers, 16,22, userCardG, Consts.DIR_END_LEVEL_NUMBERS, 2 );   
            //Handler.showNumber( fname, cx, cy, num, nw, nh, numberGroup, dir, shift=0 )
        };     */

    };	

    CWindSmallRating.getFriendsAppIDOID = function( flev ) {
        let _friends = BottomPanel.friendsProfiles;
        if ( _friends.length < 1 ) return [ { oid: User.viewer_id, id: User.id } ];
        let uids = [];
        for ( let uid in _friends ) {
            if ( parseInt( _friends[uid]['ml'] ) >= flev || uid == User.viewer_id ) {
                uids.push( { oid: uid, id: _friends[uid]['id'] } );
            }
        }
        return uids;
    };
//---------------------------------------

	
	CWindSmallRating.showMyRating = function() {
		let self = this;
		if ( self.userCards ) self.userCards.removeSelf();
		//if ( self.myRateShowingStarted ) return;
		//self.myRateShowingStarted = true;
		
		if ( Handler.isDV() ) {
			self.initMyScore( self.resp2 );
		} else {
		    BackClient.ask( BackClient.GET_MY_SCORE, function(r){self.initMyScore(r);}, {oid:User.viewer_id} );
		}
	};
	
	CWindSmallRating.initMyScore = function( resp ) {
		let self = this;
		self._topAll = resp['a'];
		let oids = [];
		for ( let s in self._topAll ) 
			oids.push( self._topAll[s]['oid'] );
		
		if ( Handler.isDV() ) {
			self.onGetUsersProfilesForMy( self.ressn2 );
		} else {
		    SocialClient.userGetProfiles( function(r){self.onGetUsersProfilesForMy(r);}, oids);
		}
	};
	
	CWindSmallRating.onGetUsersProfilesForMy = function( ressn ) {
		this.onGetUsersProfiles( ressn, this._MY_RATE );
	};
	CWindSmallRating.onGetUsersProfiles = function( res, typeRate ) {
		let self = this;
		//Handler.loadingStart();
		//Handler.loadingStop();
		let resp = [];
		
		for ( let usr of res ) {
			if ( usr.pic_2 == null ) usr.pic_2 = usr.pic_big;

			resp[ usr.uid ] = { pic : usr.pic_2 };
			resp[ usr.uid ].name = usr.first_name+" "+usr.last_name;
		}
		
		let ftop = ( typeRate == self._MY_RATE ) ? self._topAll : self._topVip;

		let places = Object.keys(ftop);
		//let places = [];
		//for ( s in ftop ) {
		//	places.push(s);
		//}
		self.userCards = Handler.newGroup(self.windRGroup);
		let maxPlaces = 3;//( typeRate == self._MY_RATE ) ? 3 : 7;
		for ( let i = 0; i < maxPlaces; i++ ) {
            if ( places[i] == null ) continue;
			
			let pic  = '', name = '', exp = 0, uid = 0;
			if ( ftop[places[i + self.shiftUsers ]]['oid'] && resp[ftop[places[i + self.shiftUsers ]]['oid']] ) {
			    pic  = resp[ftop[places[i + self.shiftUsers]]['oid']].pic;
			    name = resp[ftop[places[i + self.shiftUsers]]['oid']].name;
				uid = ftop[places[i + self.shiftUsers ]]['oid'];
			}
			if ( ftop[places[i]] )
			    exp = ftop[places[i]]['exp'];
			
			let place = parseInt( places[i] ) + 1 + self.shiftUsers;
			
			if ( typeRate == self._MY_RATE ) {
                self.showUserCard( self.userCards, -6, -190+i*155, uid, pic, place, exp, name );
			} else {
//				self.showUserCard( self.mainGroup, 22+(i % 2)*205, -147+(Math.floor(i / 2))*105, uid, pic, place, exp, name );
			}
		}  
		
	};

    CWindSmallRating.showUserCard = function( fgroup, rx, ry, uid, userPic, userPlace, userScore, userName ) {
		let imgSize = 80;
        let backroundUser = Handler.showImgRect( fgroup,"backgrUserCard.png", rx, ry, 250, 152 );         
		let star = Handler.showImgRect( fgroup,"starPoints.png",rx + 15, ry -24, 64, 61);
		
	//  let colorBackgrUserImg = Handler.colorLuaToHex([212/255,126/255,68/255]);
    //  let backgroundImgUser = Handler.showRect( fgroup, rx,ry,imgSize+3,imgSize+3, colorBackgrUserImg, 1 );         
        let imgUserGroup = Handler.newGroup( fgroup );
		
        let onImageLoaded = function( loadedImage ) {
			let iScale = loadedImage.width < loadedImage.height ? imgSize / loadedImage.width : imgSize / loadedImage.height;
			loadedImage.scale.x = iScale;
			loadedImage.scale.y = iScale;
			let imask = Handler.showRect( loadedImage.parent, rx-65, ry-22, imgSize, imgSize, [1,1,1], 1 ); 
            loadedImage.mask = imask;
        };
		if ( userPic == '' )                      userPic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';
		if ( userPic.indexOf('api.ok.ru') >= 0 )  userPic = Config.BASE_URL+'imagesTinyHalf/winds/myScore/photoModel.jpg';

            
		Handler.loadAndDrawRemoteImage( imgUserGroup, userPic, uid+".jpg",rx-65,ry-22,null,null, onImageLoaded );         

	    
		let numberUserImg = Handler.showNumber('wr',rx-106,ry-60, userPlace, 19, 25, fgroup,'',0);
		
		let textParamsNumber = {
			fontFamily: 'Arial',
			fontSize: 24,
			fontWeight: 'bold',
			color: '#b04000',
			stroke: '#FFFFFF',
			lineJoin: 'round',
			strokeThickness: 3,
			parent: fgroup,
			text: userScore+"",
			x: star.x, 
			y: star.y+4,
			anchorCenter: true
		};
		Handler.newText( textParamsNumber );
		
		let textParamsName = {
			fontFamily: 'Arial',
			fontSize: 16,
			fontWeight: 'bold',
			color: '#b04000',
			stroke: '#FFFFFF',
			lineJoin: 'round',
			strokeThickness: 2,
			parent: fgroup,
			text: userName,
			x: rx - 110, 
			y: ry +  17,
			//anchorCenter: true
		};
		Handler.newText( textParamsName );
		let butGivGift = Handler.showImgRect(fgroup, "butGivGift.png", rx - 35, ry + 55,167,33);
		butGivGift.onEL("pointertap", function() { SocialClient.invite(); } );
    };
	
	CWindSmallRating.shutdown = function( fastShutdown ){
		if ( Winds.shutdown( this.windIndex ) ) {
			if ( fastShutdown ) {
				Handler.removeImage(this.mainGroup);
			} else {
				Handler.removeWindAfterTransition( this.mainGroup, true );
			};
  		};
	};
	
	CWindSmallRating.resp1 = {
	    v : [
	        { exp:"454", oid:"568770661682" },
		    { exp:"241", oid:"533000411357" },
		    { exp:"226", oid:"267921105336" },
		    { exp:"222", oid:"450494068481" },
		    { exp:"207", oid:"434670006660" },
		    { exp:"187", oid:"345583033142" },
		    { exp:"133", oid:"86876854435"  },
		    { exp:"108", oid:"547837904301" },
		    { exp:"107", oid:"524028834919" },
		    { exp:"100", oid:"338559858023" },
		    { exp: "99", oid:"568790259147" },
		    { exp: "99", oid:"554516194995" },
		    { exp: "93", oid:"330935998941" },
		    { exp: "90", oid:"348803808699" },
		    { exp: "90", oid:"531466177172" },
		    { exp: "90", oid:"558739619161" },
		    { exp: "86", oid:"478819783414" },
		    { exp: "72", oid:"566067095749" },
		    { exp: "72", oid:"574423570201" },
		    { exp: "72", oid:"141925223023" },
		    { exp: "69", oid:"358190970615" },
		    { exp: "60", oid:"536877433114" },
		    { exp: "57", oid:"449692791432" },
		    { exp: "54", oid:"550866581354" },
		    { exp: "54", oid:"562625539529" },
		    { exp: "54", oid:"557303067259" },
		    { exp: "54", oid:"552246022744" },
		    { exp: "52", oid:"572001579824" },
		    { exp: "51", oid:"36928128721"  },
		    { exp: "48", oid:"557972445595" },
		    { exp: "45", oid:"508538094193" },
		    { exp: "45", oid:"558794365386" },
		    { exp: "45", oid:"559800677952" },
		    { exp: "45", oid:"552151565842" },
		    { exp: "45", oid:"335785123309" },
		    { exp: "45", oid:"297257859160" },
		    { exp: "45", oid:"558725192863" },
		    { exp: "45", oid:"232279997230" },
		    { exp: "45", oid:"464830229879" },
		    { exp: "42", oid:"450278101638" },
		    { exp: "36", oid:"512881259106" },
		    { exp: "36", oid:"344079967587" },
		    { exp: "36", oid:"592448284972" },
		    { exp: "36", oid:"546697624411" },
		    { exp: "36", oid:"554681258089" },
		    { exp: "36", oid:"462624055950" },
		    { exp: "36", oid:"561125082615" },
		    { exp: "36", oid:"580268771354" },
		    { exp: "30", oid:"569394791684" },
		    { exp: "27", oid:"335919195738" },
		    { exp: "27", oid:"553580348759" },
		    { exp: "27", oid:"355379406651" },
		    { exp: "27", oid:"532620743315" },
		    { exp: "27", oid:"564013093582" },
		    { exp: "27", oid:"362572836391" },
		    { exp: "27", oid:"340441894554" },
		    { exp: "27", oid:"367739047894" },
		    { exp: "27", oid:"515767690724" },
		    { exp: "27", oid:"121658211723" },
		    { exp: "25", oid:"570087230495" },
		    { exp: "24", oid:"546328720635" },
		    { exp: "21", oid:"563144569836" },
		    { exp: "21", oid:"533842327204" },
		    { exp: "21", oid:"510031674197" },
		    { exp: "18", oid:"342544813122" },
		    { exp: "18", oid:"200904576481" },
		    { exp: "18", oid:"575533976586" },
		    { exp: "18", oid:"498934528446" },
		    { exp: "18", oid:"555517433679" },
		    { exp: "18", oid:"484525011275" },
		    { exp: "18", oid:"558184260456" },
		    { exp: "18", oid:"521855657045" },
		    { exp: "18", oid:"562645539513" },
		    { exp: "18", oid:"538699983348" },
		    { exp: "18", oid:"526445383331" },
		    { exp: "18", oid:"569975852546" },
		    { exp: "18", oid:"560326373968" },
		    { exp: "18", oid:"445172025037" },
		    { exp: "18", oid:"569537284835" },
		    { exp: "18", oid:"574461904585" },
		    { exp: "18", oid:"545956866763" },
		    { exp: "18", oid:"514222931656" },
		    { exp: "18", oid:"567034611987" },
		    { exp: "18", oid:"593327776284" },
		    { exp: "18", oid:"357889841962" },
		    { exp: "18", oid:"340313167"    },
		    { exp: "17", oid:"547145721029" },
		    { exp: "16", oid:"552683846259" },
		    { exp: "16", oid:"93850866664"  },
		    { exp:  "9", oid:"555041092504" },
		    { exp:  "9", oid:"514423025851" },
		    { exp:  "9", oid:"509335158087" },
		    { exp:  "9", oid:"560929160084" },
		    { exp:  "9", oid:"574902433055" },
		    { exp:  "9", oid:"560518553088" },
		    { exp:  "9", oid:"561124801320" },
		    { exp:  "9", oid:"386871869098" },
		    { exp:  "9", oid:"575553419555" },
		    { exp:  "9", oid:"513687646446" }
		]
    };
    CWindSmallRating.ressn1 = [
        {//[0]	Object (@21a93fe0821)	
        	first_name:	"Валя и Алексей",	
        	gender:	"female",	
        	last_name:	"Александровы (Брагина)",	
        	photo:	"https:i.mycdn.me/image?id=926828905728&t=2&plc=API&ts=00&aid=177033216&tkn=*c21DHAb0M79NQkggTbITqeqZA2E",	
        	pic_2:	"https:i.mycdn.me/image?id=926828905728&t=2&plc=API&ts=00&aid=177033216&tkn=*c21DHAb0M79NQkggTbITqeqZA2E",	
        	uid:	"560518553088",	
        	url_profile:	"https:ok.ru/profile/560518553088",	
        },{//[1]	Object (@21a93297461)	
        	first_name:	"Елена",	
        	gender:	"female",	
        	last_name:	"Синькова(Филимонова)",	
        	photo:	"https:i.mycdn.me/image?id=877496159233&t=2&plc=API&ts=000201008000&aid=177033216&tkn=*eaf9lE40uqHxuRjnyAnXVdqa4OA",	
        	pic_2:	"https:i.mycdn.me/image?id=877496159233&t=2&plc=API&ts=000201008000&aid=177033216&tkn=*eaf9lE40uqHxuRjnyAnXVdqa4OA",	
        	uid:	"450494068481",	
        	url_profile:	"https:ok.ru/profile/450494068481",	
        },{//[2]	Object (@21a93297d61)	
        	first_name:	"Анна",	
        	gender:	"female",	
        	last_name:	"Маркина (Григорьева)",	
        	photo:	"https:i.mycdn.me/image?id=804713457668&t=2&plc=API&ts=00010003&aid=177033216&tkn=*9XWdnoMZ4xCgpO4Bqh9XokH_8f0",	
        	pic_2:	"https:i.mycdn.me/image?id=804713457668&t=2&plc=API&ts=00010003&aid=177033216&tkn=*9XWdnoMZ4xCgpO4Bqh9XokH_8f0",	
        	uid:	"569394791684",	
        	url_profile:	"https:ok.ru/profile/569394791684",	
        },{//[3]	Object (@21a932986d1)	
        	first_name:	"Надежда",	
        	gender:	"female",	
        	last_name:	"Локтионова (Трифонова)",	
        	photo:	"https:i.mycdn.me/image?id=881437071362&t=2&plc=API&ts=00&aid=177033216&tkn=*mWGC2Gu-ttO3c1OZSRDOjhLHDa4",	
        	pic_2:	"https:i.mycdn.me/image?id=881437071362&t=2&plc=API&ts=00&aid=177033216&tkn=*mWGC2Gu-ttO3c1OZSRDOjhLHDa4",	
        	uid:	"569975852546",	
        	url_profile:	"https:ok.ru/profile/569975852546",	
        },{//[4]	Object (@21a93298f71)	
        	first_name:	"Катерина",	
        	gender:	"female",	
        	last_name:	")))",	
        	photo:	"https:i.mycdn.me/image?id=886056654858&t=2&plc=API&aid=177033216&tkn=*9QzxkoZQ1miqCyj2Abe3kdjl6ww",	
        	pic_2:	"https:i.mycdn.me/image?id=886056654858&t=2&plc=API&aid=177033216&tkn=*9QzxkoZQ1miqCyj2Abe3kdjl6ww",	
        	uid:	"575533976586",	
        	url_profile:	"https:ok.ru/profile/575533976586",	
        },{//[5]	Object (@21a93206881)	
        	first_name:	"Светлана",	
        	gender:	"female",	
        	last_name:	"Верминская(Якорева)",	
        	photo:	"https:i.mycdn.me/image?id=545861729823&t=2&plc=API&ts=00&aid=177033216&tkn=*xeGugm8NI1ZtaOHIGIDBunofSBU",	
        	pic_2:	"https:i.mycdn.me/image?id=545861729823&t=2&plc=API&ts=00&aid=177033216&tkn=*xeGugm8NI1ZtaOHIGIDBunofSBU",	
        	uid:	"574902433055",	
        	url_profile:	"https:ok.ru/profile/574902433055",	
        },{//[6]	Object (@21a93207221)	
        	first_name:	"Евгений",	
        	gender:	"male",	
        	last_name:	"Журавлёв",	
        	photo:	"https:i.mycdn.me/res/stub_128x96.gif",	
        	pic_2:	"https:i.mycdn.me/res/stub_128x96.gif",	
        	uid:	"593327776284",	
        	url_profile:	"https:ok.ru/profile/593327776284",	
        },{//[7]	Object (@21a93207b51)	
        	first_name:	"Сергей",	
        	gender:	"male",	
        	last_name:	"Котов",	
        	photo:	"https:i.mycdn.me/image?id=521911019795&t=2&plc=API&ts=00&aid=177033216&tkn=*VY9AGdYAzd5PxW7mBPvrQNR_5VM",	
        	pic_2:	"https:i.mycdn.me/image?id=521911019795&t=2&plc=API&ts=00&aid=177033216&tkn=*VY9AGdYAzd5PxW7mBPvrQNR_5VM",	
        	uid:	"567034611987",	
        	url_profile:	"https:ok.ru/profile/567034611987",	
        },{//[8]	Object (@21a93208491)	
        	first_name:	"Елена",	
        	gender:	"female",	
        	last_name:	"Кулыгина ( Летягина)",	
        	photo:	"https:i.mycdn.me/image?id=856750151967&t=2&plc=API&ts=00&aid=177033216&tkn=*KZmhzbNWdidLSM3_xuXuVBALk7c",	
        	pic_2:	"https:i.mycdn.me/image?id=856750151967&t=2&plc=API&ts=00&aid=177033216&tkn=*KZmhzbNWdidLSM3_xuXuVBALk7c",	
        	uid:	"570087230495",	
        	url_profile:	"https:ok.ru/profile/570087230495",	
        },{//[9]	Object (@21a93208e51)	
        	first_name:	"Людмила",	
        	gender:	"female",	
        	last_name:	"Кузнецова (Попеляева)",	
        	photo:	"https:i.mycdn.me/image?id=837695512602&t=2&plc=API&ts=00&aid=177033216&tkn=*5_z9E8E8wRDjSN2v43lP9vC4jr0",	
        	pic_2:	"https:i.mycdn.me/image?id=837695512602&t=2&plc=API&ts=00&aid=177033216&tkn=*5_z9E8E8wRDjSN2v43lP9vC4jr0",	
        	uid:	"536877433114",	
        	url_profile:	"https:ok.ru/profile/536877433114",	
        },{//[10]	Object (@21a93209761)	
        	first_name:	"Юлия",	
        	gender:	"female",	
        	last_name:	"Баранникова (Чекризова)",	
        	photo:	"https:i.mycdn.me/image?id=883005186330&t=2&plc=API&ts=00020100bd00&aid=177033216&tkn=*_qSTam3dUe47uYXUSsrfUlB2dOs",	
        	pic_2:	"https:i.mycdn.me/image?id=883005186330&t=2&plc=API&ts=00020100bd00&aid=177033216&tkn=*_qSTam3dUe47uYXUSsrfUlB2dOs",	
        	uid:	"580268771354",	
        	url_profile:	"https:ok.ru/profile/580268771354",	
        },{//[11]	Object (@21a93209fd1)	
        	first_name:	"Владимир",	
        	gender:	"male",	
        	last_name:	"Щербаков",	
        	photo:	"https:i.mycdn.me/image?id=871112460569&t=2&plc=API&ts=00&aid=177033216&tkn=*HjVbAKVEzKhAnJDVdMpBWCDhUzM",	
        	pic_2:	"https:i.mycdn.me/image?id=871112460569&t=2&plc=API&ts=00&aid=177033216&tkn=*HjVbAKVEzKhAnJDVdMpBWCDhUzM",	
        	uid:	"574423570201",	
        	url_profile:	"https:ok.ru/profile/574423570201",	
        },{//[12]	Object (@21a9320a8b1)	
        	first_name:	"Елена",	
        	gender:	"female",	
        	last_name:	"Скочилова",	
        	photo:	"https:i.mycdn.me/image?id=817054261266&t=2&plc=API&aid=177033216&tkn=*n8ETQk1WrJrHvrijmf9TQAaAKuU",	
        	pic_2:	"https:i.mycdn.me/image?id=817054261266&t=2&plc=API&aid=177033216&tkn=*n8ETQk1WrJrHvrijmf9TQAaAKuU",	
        	uid:	"552151565842",	
        	url_profile:	"https:ok.ru/profile/552151565842",	
        },{//[13]	Object (@21a93fe0a31)	
        	first_name:	"Любовь",	
        	gender:	"female",	
        	last_name:	"Комиссарова",	
        	photo:	"https:i.mycdn.me/image?id=412783379303&t=2&plc=API&aid=177033216&tkn=*UaPAEowM2MYiTDw7-bIkydHhcdE",	
        	pic_2:	"https:i.mycdn.me/image?id=412783379303&t=2&plc=API&aid=177033216&tkn=*UaPAEowM2MYiTDw7-bIkydHhcdE",	
        	uid:	"524028834919",	
        	url_profile:	"https:ok.ru/profile/524028834919",	
        },{//[14]	Object (@21a93297551)	
        	first_name:	"Рус",	
        	gender:	"male",	
        	last_name:	"К",	
        	photo:	"https:i.mycdn.me/image?id=882028345699&t=2&plc=API&ts=00&aid=177033216&tkn=*a9q4yeq16IxqkntRUIi1KQ15L4M",	
        	pic_2:	"https:i.mycdn.me/image?id=882028345699&t=2&plc=API&ts=00&aid=177033216&tkn=*a9q4yeq16IxqkntRUIi1KQ15L4M",	
        	uid:	"344079967587",	
        	url_profile:	"https:ok.ru/profile/344079967587",	
        },{//[15]	Object (@21a93297e51)	
        	first_name:	"Людмила",	
        	gender:	"female",	
        	last_name:	"Попова",	
        	photo:	"https:i.mycdn.me/image?id=815668806247&t=2&plc=API&ts=00&aid=177033216&tkn=*wZeYpbe6JXxVbWMwpfbQNsGXkGM",	
        	pic_2:	"https:i.mycdn.me/image?id=815668806247&t=2&plc=API&ts=00&aid=177033216&tkn=*wZeYpbe6JXxVbWMwpfbQNsGXkGM",	
        	uid:	"338559858023",	
        	url_profile:	"https:ok.ru/profile/338559858023",	
        },{//[16]	Object (@21a93298821)	
        	first_name:	"ольга",	
        	gender:	"female",	
        	last_name:	"ширяева  (кузнецова)",	
        	photo:	"https:i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",	
        	pic_2:	"https:i.mycdn.me/image?id=585248881512&t=2&plc=API&ts=00&aid=177033216&tkn=*wMkFxxgBXKcF96LmRiVF_tG0kSo",	
        	uid:	"558184260456",	
        	url_profile:	"https:ok.ru/profile/558184260456",	
        },{//[17]	Object (@21a93206281)	
        	first_name:	"Ирина",	
        	gender:	"female",	
        	last_name:	"Забродина",	
        	photo:	"https:i.mycdn.me/image?id=817034516335&t=2&plc=API&ts=00&aid=177033216&tkn=*9DXGxoC39X9g-VYZT7M6Xga44HA",	
        	pic_2:	"https:i.mycdn.me/image?id=817034516335&t=2&plc=API&ts=00&aid=177033216&tkn=*9DXGxoC39X9g-VYZT7M6Xga44HA",	
        	uid:	"141925223023",	
        	url_profile:	"https:ok.ru/profile/141925223023",	
        },{//[18]	Object (@21a93206b21)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Ефремова",	
        	photo:	"https:i.mycdn.me/image?id=854298762857&t=2&plc=API&ts=00&aid=177033216&tkn=*OBp8jAsC0k06sNf4WLcJnKNt6Vk",	
        	pic_2:	"https:i.mycdn.me/image?id=854298762857&t=2&plc=API&ts=00&aid=177033216&tkn=*OBp8jAsC0k06sNf4WLcJnKNt6Vk",	
        	uid:	"554681258089",	
        	url_profile:	"https:ok.ru/profile/554681258089",	
        },{//[19]	Object (@21a932074f1)	
        	first_name:	"Ольга",	
        	gender:	"female",	
        	last_name:	"Маркелова(Чиркова)",	
        	photo:	"https:i.mycdn.me/image?id=466620697706&t=2&plc=API&ts=00&aid=177033216&tkn=*1HiiVp6K2cQHydFTy6MFLo0N52g",	
        	pic_2:	"https:i.mycdn.me/image?id=466620697706&t=2&plc=API&ts=00&aid=177033216&tkn=*1HiiVp6K2cQHydFTy6MFLo0N52g",	
        	uid:	"550866581354",	
        	url_profile:	"https:ok.ru/profile/550866581354",	
        },{//[20]	Object (@21a93207eb1)	
        	first_name:	"Вера",	
        	gender:	"female",	
        	last_name:	"Ляшевская ( Бережная)",	
        	photo:	"https:i.mycdn.me/image?id=870227298146&t=2&plc=API&ts=00&aid=177033216&tkn=*4ZO2sKxN75TN9N9OzC8W4pmZfT8",	
        	pic_2:	"https:i.mycdn.me/image?id=870227298146&t=2&plc=API&ts=00&aid=177033216&tkn=*4ZO2sKxN75TN9N9OzC8W4pmZfT8",	
        	uid:	"512881259106",	
        	url_profile:	"https:ok.ru/profile/512881259106",	
        },{//[21]	Object (@21a93208851)	
        	first_name:	"Людмила",	
        	gender:	"female",	
        	last_name:	"Елисеева (ZM)",	
        	photo:	"https:i.mycdn.me/image?id=417830971126&t=2&plc=API&aid=177033216&tkn=*RRA75TWIA7074mGfTPKQQLuoVK0",	
        	pic_2:	"https:i.mycdn.me/image?id=417830971126&t=2&plc=API&aid=177033216&tkn=*RRA75TWIA7074mGfTPKQQLuoVK0",	
        	uid:	"478819783414",	
        	url_profile:	"https:ok.ru/profile/478819783414",	
        },{//[22]	Object (@21a932091c1)	
        	first_name:	"александр",	
        	gender:	"male",	
        	last_name:	"зиновьев",	
        	photo:	"https:i.mycdn.me/image?id=884451959799&t=2&plc=API&ts=00020100b000&aid=177033216&tkn=*ltyueKhcAokC6Sn8yvKEO9hT7tA",	
        	pic_2:	"https:i.mycdn.me/image?id=884451959799&t=2&plc=API&ts=00020100b000&aid=177033216&tkn=*ltyueKhcAokC6Sn8yvKEO9hT7tA",	
        	uid:	"358190970615",	
        	url_profile:	"https:ok.ru/profile/358190970615",	
        },{//[23]	Object (@21a93209af1)	
        	first_name:	"Дина",	
        	gender:	"female",	
        	last_name:	"Бадретдинова (Каюмова)",	
        	photo:	"https:i.mycdn.me/image?id=883012998900&t=2&plc=API&ts=00&aid=177033216&tkn=*uqYuxqF8vFj-eGMOff1UAIzOZ00",	
        	pic_2:	"https:i.mycdn.me/image?id=883012998900&t=2&plc=API&ts=00&aid=177033216&tkn=*uqYuxqF8vFj-eGMOff1UAIzOZ00",	
        	uid:	"538699983348",	
        	url_profile:	"https:ok.ru/profile/538699983348",	
        },{//[24]	Object (@21a9320a371)	
        	first_name:	"Надежда",	
        	gender:	"female",	
        	last_name:	"зайшлая",	
        	photo:	"https:i.mycdn.me/res/stub_128x96.gif",	
        	pic_2:	"https:i.mycdn.me/res/stub_128x96.gif",	
        	uid:	"561125082615",	
        	url_profile:	"https:ok.ru/profile/561125082615",	
        },{//[25]	Object (@21a9320ac41)	
        	first_name:	"Ольга",	
        	gender:	"female",	
        	last_name:	"Коваль (Евтушенко)",	
        	photo:	"https:i.mycdn.me/image?id=868520827131&t=2&plc=API&ts=000201003a00&aid=177033216&tkn=*NYyy1Axp1kQ2Uo9FmHVu3WPUXgw",	
        	pic_2:	"https:i.mycdn.me/image?id=868520827131&t=2&plc=API&ts=000201003a00&aid=177033216&tkn=*NYyy1Axp1kQ2Uo9FmHVu3WPUXgw",	
        	uid:	"546328720635",	
        	url_profile:	"https:ok.ru/profile/546328720635",	
        },{//[26]	Object (@21a93fe0b81)	
        	first_name:	"Александр",	
        	gender:	"male",	
        	last_name:	"Зинченко",	
        	photo:	"https:i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",	
        	pic_2:	"https:i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",	
        	uid:	"434670006660",	
        	url_profile:	"https:ok.ru/profile/434670006660",	
        },{//[27]	Object (@21a932975e1)	
        	first_name:	"♥ღ♥Наталья♥ღ♥",	
        	gender:	"female",	
        	last_name:	"Балицкая♥ღ♥",	
        	photo:	"https:i.mycdn.me/image?id=883786291083&t=2&plc=API&ts=00&aid=177033216&tkn=*LGcgwCfg7bcPIvRWu0n7IraTqEA",	
        	pic_2:	"https:i.mycdn.me/image?id=883786291083&t=2&plc=API&ts=00&aid=177033216&tkn=*LGcgwCfg7bcPIvRWu0n7IraTqEA",	
        	uid:	"121658211723",	
        	url_profile:	"https:ok.ru/profile/121658211723",	
        },{//[28]	Object (@21a93297fd1)	
        	first_name:	"Валентина",	
        	gender:	"female",	
        	last_name:	"Щиголихина-Полякова",	
        	photo:	"https:i.mycdn.me/image?id=412570634374&t=2&plc=API&aid=177033216&tkn=*tXT0-CMw0866kDRdSvwqc8lEeik",	
        	pic_2:	"https:i.mycdn.me/image?id=412570634374&t=2&plc=API&aid=177033216&tkn=*tXT0-CMw0866kDRdSvwqc8lEeik",	
        	uid:	"450278101638",	
        	url_profile:	"https:ok.ru/profile/450278101638",	
        },{//[29]	Object (@21a93298911)	
        	first_name:	"Ирина",	
        	gender:	"female",	
        	last_name:	"Ворожейкина (Чупика)",	
        	photo:	"https:i.mycdn.me/image?id=855963033992&t=2&plc=API&aid=177033216&tkn=*gxDpx_eQxpfirHxKVIfzjTpy068",	
        	pic_2:	"https:i.mycdn.me/image?id=855963033992&t=2&plc=API&aid=177033216&tkn=*gxDpx_eQxpfirHxKVIfzjTpy068",	
        	uid:	"449692791432",	
        	url_profile:	"https:ok.ru/profile/449692791432",	
        },{//[30]	Object (@21a932062e1)	
        	first_name:	"Нина",	
        	gender:	"female",	
        	last_name:	"Козлова",	
        	photo:	"https:i.mycdn.me/image?id=882408794766&t=2&plc=API&ts=00&aid=177033216&tkn=*kPfpSylEpEl_KRWAvxz5zAxQL3o",	
        	pic_2:	"https:i.mycdn.me/image?id=882408794766&t=2&plc=API&ts=00&aid=177033216&tkn=*kPfpSylEpEl_KRWAvxz5zAxQL3o",	
        	uid:	"462624055950",	
        	url_profile:	"https:ok.ru/profile/462624055950",	
        },{//[31]	Object (@21a93206d31)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Локтионова (Мальцева)",	
        	photo:	"https:i.mycdn.me/image?id=838274422254&t=2&plc=API&ts=00&aid=177033216&tkn=*tLAMmQjbC05i-BdMuOJ-UlHj1r4",	
        	pic_2:	"https:i.mycdn.me/image?id=838274422254&t=2&plc=API&ts=00&aid=177033216&tkn=*tLAMmQjbC05i-BdMuOJ-UlHj1r4",	
        	uid:	"513687646446",	
        	url_profile:	"https:ok.ru/profile/513687646446",	
        },{//[32]	Object (@21a93207611)	
        	first_name:	"Людмила",	
        	gender:	"female",	
        	last_name:	"Опенченко(Куянцева)",	
        	photo:	"https:i.mycdn.me/image?id=865587939043&t=2&plc=API&ts=000201000f00&aid=177033216&tkn=*n2h-4Q-Jorj8Ff_tQmXhOR1oo4o",	
        	pic_2:	"https:i.mycdn.me/image?id=865587939043&t=2&plc=API&ts=000201000f00&aid=177033216&tkn=*n2h-4Q-Jorj8Ff_tQmXhOR1oo4o",	
        	uid:	"569537284835",	
        	url_profile:	"https:ok.ru/profile/569537284835",	
        },{//[33]	Object (@21a93207f71)	
        	first_name:	"Ирина",	
        	gender:	"female",	
        	last_name:	"Артамонова (Якушина)",	
        	photo:	"https:i.mycdn.me/image?id=849397720033&t=2&plc=API&ts=00010003&aid=177033216&tkn=*wwFJv6x6ElY_ytA2IINHHxoFGaM",	
        	pic_2:	"https:i.mycdn.me/image?id=849397720033&t=2&plc=API&ts=00010003&aid=177033216&tkn=*wwFJv6x6ElY_ytA2IINHHxoFGaM",	
        	uid:	"200904576481",	
        	url_profile:	"https:ok.ru/profile/200904576481",	
        },{//[34]	Object (@21a93208a91)	
        	first_name:	"Виктор",	
        	gender:	"male",	
        	last_name:	"Белов",	
        	photo:	"https:i.mycdn.me/image?id=544447470316&t=2&plc=API&aid=177033216&tkn=*fyaV8qW7JEfs3oBqcHK-dQTB56Q",	
        	pic_2:	"https:i.mycdn.me/image?id=544447470316&t=2&plc=API&aid=177033216&tkn=*fyaV8qW7JEfs3oBqcHK-dQTB56Q",	
        	uid:	"563144569836",	
        	url_profile:	"https:ok.ru/profile/563144569836",	
        },{//[35]	Object (@21a93209371)	
        	first_name:	"Марина",	
        	gender:	"female",	
        	last_name:	"Коннова",	
        	photo:	"https:i.mycdn.me/image?id=564123351277&t=2&plc=API&ts=00&aid=177033216&tkn=*DynKup6QGU0awueJRVj5s5J-PvQ",	
        	pic_2:	"https:i.mycdn.me/image?id=564123351277&t=2&plc=API&ts=00&aid=177033216&tkn=*DynKup6QGU0awueJRVj5s5J-PvQ",	
        	uid:	"335785123309",	
        	url_profile:	"https:ok.ru/profile/335785123309",	
        },{//[36]	Object (@21a93209c71)	
        	first_name:	"Елена",	
        	gender:	"female",	
        	last_name:	"Бабич",	
        	photo:	"https:i.mycdn.me/image?id=885144750052&t=2&plc=API&ts=000201002100&aid=177033216&tkn=*AovRZCgti0JnIiuw-UyhIAB-Rrg",	
        	pic_2:	"https:i.mycdn.me/image?id=885144750052&t=2&plc=API&ts=000201002100&aid=177033216&tkn=*AovRZCgti0JnIiuw-UyhIAB-Rrg",	
        	uid:	"515767690724",	
        	url_profile:	"https:ok.ru/profile/515767690724",	
        },{//[37]	Object (@21a9320a641)	
        	first_name:	"елена",	
        	gender:	"female",	
        	last_name:	"урванцева ( Ксенофонтова )",	
        	photo:	"https:i.mycdn.me/image?id=862712364776&t=2&plc=API&ts=000201002500&aid=177033216&tkn=*G0fspTdy2f5JQ89-E9CoLkZQyw0",	
        	pic_2:	"https:i.mycdn.me/image?id=862712364776&t=2&plc=API&ts=000201002500&aid=177033216&tkn=*G0fspTdy2f5JQ89-E9CoLkZQyw0",	
        	uid:	"93850866664",	
        	url_profile:	"https:ok.ru/profile/93850866664",	
        },{//[38]	Object (@21a9320afd1)	
        	first_name:	"Наталья",	
        	gender:	"female",	
        	last_name:	"Сумина(Непомнящих)",	
        	photo:	"https:i.mycdn.me/image?id=875961805632&t=2&plc=API&ts=000201006300&aid=177033216&tkn=*2qBR33eyzvH_tE_68RtBXpQWYY8",	
        	pic_2:	"https:i.mycdn.me/image?id=875961805632&t=2&plc=API&ts=000201006300&aid=177033216&tkn=*2qBR33eyzvH_tE_68RtBXpQWYY8",	
        	uid:	"559800677952",	
        	url_profile:	"https:ok.ru/profile/559800677952",	
        },{//[39]	Object (@21a93fe0d31)	
        	first_name:	"Людмила",	
        	gender:	"female",	
        	last_name:	"Синькова Арестова",	
        	photo:	"https:i.mycdn.me/image?id=893247013195&t=2&plc=API&ts=00&aid=177033216&tkn=*cOz7gOnEt0PJaUDNb6aK0ruPq4g",	
        	pic_2:	"https:i.mycdn.me/image?id=893247013195&t=2&plc=API&ts=00&aid=177033216&tkn=*cOz7gOnEt0PJaUDNb6aK0ruPq4g",	
        	uid:	"484525011275",	
        	url_profile:	"https:ok.ru/profile/484525011275",	
        },{//[40]	Object (@21a932976d1)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Седун(Рагулина)",	
        	photo:	"https:i.mycdn.me/image?id=884937452359&t=2&plc=API&ts=00020100a800&aid=177033216&tkn=*A0drdkjrfAJVfPqYjiPF2PXNjno",	
        	pic_2:	"https:i.mycdn.me/image?id=884937452359&t=2&plc=API&ts=00020100a800&aid=177033216&tkn=*A0drdkjrfAJVfPqYjiPF2PXNjno",	
        	uid:	"509335158087",	
        	url_profile:	"https:ok.ru/profile/509335158087",	
        },{//[41]	Object (@21a93298101)	
        	first_name:	"Антонина",	
        	gender:	"female",	
        	last_name:	"Гуренкова (Федорова)",	
        	photo:	"https:i.mycdn.me/image?id=887824398159&t=2&plc=API&ts=000201002000&aid=177033216&tkn=*NVfMa4XknEqh_tt89p0XSGDcwgA",	
        	pic_2:	"https:i.mycdn.me/image?id=887824398159&t=2&plc=API&ts=000201002000&aid=177033216&tkn=*NVfMa4XknEqh_tt89p0XSGDcwgA",	
        	uid:	"555517433679",	
        	url_profile:	"https:ok.ru/profile/555517433679",	
        },{//[42]	Object (@21a93298a91)	
        	first_name:	"Олег",	
        	gender:	"male",	
        	last_name:	"Пахмелкин",	
        	photo:	"https:i.mycdn.me/image?id=877122386242&t=2&plc=API&ts=00&aid=177033216&tkn=*dPHRN1d4NtYNZELrwOIpf7T0QUw",	
        	pic_2:	"https:i.mycdn.me/image?id=877122386242&t=2&plc=API&ts=00&aid=177033216&tkn=*dPHRN1d4NtYNZELrwOIpf7T0QUw",	
        	uid:	"342544813122",	
        	url_profile:	"https:ok.ru/profile/342544813122",	
        },{//[43]	Object (@21a93206551)	
        	first_name:	"Людмила",	
        	gender:	"female",	
        	last_name:	"Троицкая",	
        	photo:	"https:i.mycdn.me/image?id=886965345103&t=2&plc=API&ts=00020100c200&aid=177033216&tkn=*GVku5TmPdfeZQ7m-RimlP5JRwTA",	
        	pic_2:	"https:i.mycdn.me/image?id=886965345103&t=2&plc=API&ts=00020100c200&aid=177033216&tkn=*GVku5TmPdfeZQ7m-RimlP5JRwTA",	
        	uid:	"340313167",	
        	url_profile:	"https:ok.ru/profile/340313167",	
        },{//[44]	Object (@21a93206e81)	
        	first_name:	"Galina",	
        	gender:	"female",	
        	last_name:	"Andreyeva",	
        	photo:	"https:i.mycdn.me/image?id=892398134647&t=2&plc=API&ts=00&aid=177033216&tkn=*brDEo6dQxQbKByYOYMhhMEhtz3k",	
        	pic_2:	"https:i.mycdn.me/image?id=892398134647&t=2&plc=API&ts=00&aid=177033216&tkn=*brDEo6dQxQbKByYOYMhhMEhtz3k",	
        	uid:	"464830229879",	
        	url_profile:	"https:ok.ru/profile/464830229879",	
        },{//[45]	Object (@21a932078e1)	
        	first_name:	"Алла",	
        	gender:	"female",	
        	last_name:	"Владимировна",	
        	photo:	"https:i.mycdn.me/image?id=864417199483&t=2&plc=API&ts=00&aid=177033216&tkn=*Q6blFU7AlqRxecOukNWiF03jLBI",	
        	pic_2:	"https:i.mycdn.me/image?id=864417199483&t=2&plc=API&ts=00&aid=177033216&tkn=*Q6blFU7AlqRxecOukNWiF03jLBI",	
        	uid:	"557303067259",	
        	url_profile:	"https:ok.ru/profile/557303067259",	
        },{//[46]	Object (@21a93208341)	
        	first_name:	"вера",	
        	gender:	"female",	
        	last_name:	"карасёва",	
        	photo:	"https:i.mycdn.me/image?id=849745327985&t=2&plc=API&aid=177033216&tkn=*24UWGM_QkcihyJYVxm2d4URcwqw",	
        	pic_2:	"https:i.mycdn.me/image?id=849745327985&t=2&plc=API&aid=177033216&tkn=*24UWGM_QkcihyJYVxm2d4URcwqw",	
        	uid:	"508538094193",	
        	url_profile:	"https:ok.ru/profile/508538094193",	
        },{//[47]	Object (@21a93208cd1)	
        	first_name:	"Ильгар",	
        	gender:	"male",	
        	last_name:	"Алиев",	
        	photo:	"https:i.mycdn.me/image?id=488631349363&t=2&plc=API&aid=177033216&tkn=*ZJxaJWGA0c6hfuXQTTrl-y3i7hQ",	
        	pic_2:	"https:i.mycdn.me/image?id=488631349363&t=2&plc=API&aid=177033216&tkn=*ZJxaJWGA0c6hfuXQTTrl-y3i7hQ",	
        	uid:	"552683846259",	
        	url_profile:	"https:ok.ru/profile/552683846259",	
        },{//[48]	Object (@21a93209701)	
        	first_name:	"Тамара",	
        	gender:	"female",	
        	last_name:	"Волошко",	
        	photo:	"https:i.mycdn.me/image?id=885950409258&t=2&plc=API&ts=00020100c200&aid=177033216&tkn=*q9Uj03iB5YNcFni3Ifkr7yh7zj4",	
        	pic_2:	"https:i.mycdn.me/image?id=885950409258&t=2&plc=API&ts=00020100c200&aid=177033216&tkn=*q9Uj03iB5YNcFni3Ifkr7yh7zj4",	
        	uid:	"357889841962",	
        	url_profile:	"https:ok.ru/profile/357889841962",	
        },{//[49]	Object (@21a9320a071)	
        	first_name:	"Любовь",	
        	gender:	"female",	
        	last_name:	"Попова (Фруль Огиенко)",	
        	photo:	"https:i.mycdn.me/image?id=545597401123&t=2&plc=API&aid=177033216&tkn=*f2yxJrRQ-04ZsRLjLdw684qBp5U",	
        	pic_2:	"https:i.mycdn.me/image?id=545597401123&t=2&plc=API&aid=177033216&tkn=*f2yxJrRQ-04ZsRLjLdw684qBp5U",	
        	uid:	"575553419555",	
        	url_profile:	"https:ok.ru/profile/575553419555",	
        },{//[50]	Object (@21a9320a971)	
        	first_name:	"Александра",	
        	gender:	"female",	
        	last_name:	"Сбитнева(Ермакова)",	
        	photo:	"https:i.mycdn.me/image?id=602996892455&t=2&plc=API&ts=00&aid=177033216&tkn=*ivtdqHUKbAuTwO14T3Wi3gq6JFA",	
        	pic_2:	"https:i.mycdn.me/image?id=602996892455&t=2&plc=API&ts=00&aid=177033216&tkn=*ivtdqHUKbAuTwO14T3Wi3gq6JFA",	
        	uid:	"362572836391",	
        	url_profile:	"https:ok.ru/profile/362572836391",	
        },{//[51]	Object (@21a931a8371)	
        	first_name:	"Татьяна",	
        	gender:	"male",	
        	last_name:	"Товянская",	
        	photo:	"https:i.mycdn.me/image?id=885364731180&t=2&plc=API&ts=00&aid=177033216&tkn=*gwVHwOIwbxhZM3bhRU6CPupReFA",	
        	pic_2:	"https:i.mycdn.me/image?id=885364731180&t=2&plc=API&ts=00&aid=177033216&tkn=*gwVHwOIwbxhZM3bhRU6CPupReFA",	
        	uid:	"592448284972",	
        	url_profile:	"https:ok.ru/profile/592448284972",	
        },{//[52]	Object (@21a93fe0c41)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Мазур (Дятел)",	
        	photo:	"https:i.mycdn.me/image?id=666360870952&t=2&plc=API&ts=00&aid=177033216&tkn=*PysYENpkDjmho1dODy2WNXdOoCg",	
        	pic_2:	"https:i.mycdn.me/image?id=666360870952&t=2&plc=API&ts=00&aid=177033216&tkn=*PysYENpkDjmho1dODy2WNXdOoCg",	
        	uid:	"561124801320",	
        	url_profile:	"https:ok.ru/profile/561124801320",	
        },{//[53]	Object (@21a93297791)	
        	first_name:	"Павел",	
        	gender:	"male",	
        	last_name:	"Серегин",	
        	photo:	"https:i.mycdn.me/image?id=177158263086&t=2&plc=API&aid=177033216&tkn=*iBMYhz2xjtKGaJKSeuuXYxHM_MQ",	
        	pic_2:	"https:i.mycdn.me/image?id=177158263086&t=2&plc=API&aid=177033216&tkn=*iBMYhz2xjtKGaJKSeuuXYxHM_MQ",	
        	uid:	"232279997230",	
        	url_profile:	"https:ok.ru/profile/232279997230",	
        },{//[54]	Object (@21a93298191)	
        	first_name:	"Сергей",	
        	gender:	"male",	
        	last_name:	"Мелюхин",	
        	photo:	"https:i.mycdn.me/image?id=771132173362&t=2&plc=API&ts=00&aid=177033216&tkn=*LOyM9FkdOG_E_YbsPXWx2DdBCFc",	
        	pic_2:	"https:i.mycdn.me/image?id=771132173362&t=2&plc=API&ts=00&aid=177033216&tkn=*LOyM9FkdOG_E_YbsPXWx2DdBCFc",	
        	uid:	"568770661682",	
        	url_profile:	"https:ok.ru/profile/568770661682",	
        },{//[55]	Object (@21a93298b81)	
        	first_name:	"Ольга",	
        	gender:	"female",	
        	last_name:	"Мухина(Пестова)",	
        	photo:	"https:i.mycdn.me/image?id=561513572667&t=2&plc=API&ts=00&aid=177033216&tkn=*7st-wn98EC07Fv9Yi2LcKo_QLUk",	
        	pic_2:	"https:i.mycdn.me/image?id=561513572667&t=2&plc=API&ts=00&aid=177033216&tkn=*7st-wn98EC07Fv9Yi2LcKo_QLUk",	
        	uid:	"355379406651",	
        	url_profile:	"https:ok.ru/profile/355379406651",	
        },{//[56]	Object (@21a932065b1)	
        	first_name:	"Алексей",	
        	gender:	"male",	
        	last_name:	"Беляков",	
        	photo:	"https:i.mycdn.me/image?id=872030071862&t=2&plc=API&ts=00&aid=177033216&tkn=*dCxKFVKZJdvUMh8hKyAOK0MVVdw",	
        	pic_2:	"https:i.mycdn.me/image?id=872030071862&t=2&plc=API&ts=00&aid=177033216&tkn=*dCxKFVKZJdvUMh8hKyAOK0MVVdw",	
        	uid:	"345583033142",	
        	url_profile:	"https:ok.ru/profile/345583033142",	
        },{//[57]	Object (@21a93206f11)	
        	first_name:	"светлана",	
        	gender:	"female",	
        	last_name:	"сахарова",	
        	photo:	"https:i.mycdn.me/image?id=850054029360&t=2&plc=API&ts=00&aid=177033216&tkn=*CYjOi_NOtcHDqGVzzjkKfxlMatg",	
        	pic_2:	"https:i.mycdn.me/image?id=850054029360&t=2&plc=API&ts=00&aid=177033216&tkn=*CYjOi_NOtcHDqGVzzjkKfxlMatg",	
        	uid:	"572001579824",	
        	url_profile:	"https:ok.ru/profile/572001579824",	
        },{//[58]	Object (@21a932079a1)	
        	first_name:	"юрий",	
        	gender:	"male",	
        	last_name:	"никитин",	
        	photo:	"https:i.mycdn.me/image?id=454845134011&t=2&plc=API&aid=177033216&tkn=*psLKKIsBFW-wupysduV238hM0_I",	
        	pic_2:	"https:i.mycdn.me/image?id=454845134011&t=2&plc=API&aid=177033216&tkn=*psLKKIsBFW-wupysduV238hM0_I",	
        	uid:	"348803808699",	
        	url_profile:	"https:ok.ru/profile/348803808699",	
        },{//[59]	Object (@21a932084f1)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Шумилова (Толмачева)",	
        	photo:	"https:i.mycdn.me/image?id=166147225784&t=2&plc=API&ts=00&aid=177033216&tkn=*no3Wnvu_xW3Saa95Upb1uuVxIcI",	
        	pic_2:	"https:i.mycdn.me/image?id=166147225784&t=2&plc=API&ts=00&aid=177033216&tkn=*no3Wnvu_xW3Saa95Upb1uuVxIcI",	
        	uid:	"267921105336",	
        	url_profile:	"https:ok.ru/profile/267921105336",	
        },{//[60]	Object (@21a93208f71)	
        	first_name:	"MARINE",	
        	gender:	"female",	
        	last_name:	"PORTOVA MARINE",	
        	photo:	"https:i.mycdn.me/image?id=884226426302&t=2&plc=API&ts=00&aid=177033216&tkn=*KvqkfUIeD_LB4u1eUpW4Plv4ydA",	
        	pic_2:	"https:i.mycdn.me/image?id=884226426302&t=2&plc=API&ts=00&aid=177033216&tkn=*KvqkfUIeD_LB4u1eUpW4Plv4ydA",	
        	uid:	"498934528446",	
        	url_profile:	"https:ok.ru/profile/498934528446",	
        },{//[61]	Object (@21a932098e1)	
        	first_name:	"MARIA",	
        	gender:	"female",	
        	last_name:	"VELESEVICH",	
        	photo:	"https:i.mycdn.me/image?id=879686661049&t=2&plc=API&ts=000201003b00&aid=177033216&tkn=*dTKI2iobjkWsI_tL_hcoGhcuGIU",	
        	pic_2:	"https:i.mycdn.me/image?id=879686661049&t=2&plc=API&ts=000201003b00&aid=177033216&tkn=*dTKI2iobjkWsI_tL_hcoGhcuGIU",	
        	uid:	"562645539513",	
        	url_profile:	"https:ok.ru/profile/562645539513",	
        },{//[62]	Object (@21a9320a2e1)	
        	first_name:	"Екатерина",	
        	gender:	"female",	
        	last_name:	"Кияшко (Иваненко)",	
        	photo:	"https:i.mycdn.me/image?id=537002440379&t=2&plc=API&ts=00&aid=177033216&tkn=*9SBNlyBp_YsTZX5SSd3Go5hV2Jk",	
        	pic_2:	"https:i.mycdn.me/image?id=537002440379&t=2&plc=API&ts=00&aid=177033216&tkn=*9SBNlyBp_YsTZX5SSd3Go5hV2Jk",	
        	uid:	"514423025851",	
        	url_profile:	"https:ok.ru/profile/514423025851",	
        },{//[63]	Object (@21a9320abb1)	
        	first_name:	"˙·•●๑ღ♥ Людмила",	
        	gender:	"female",	
        	last_name:	"♥ღ๑●•·˙",	
        	photo:	"https:i.mycdn.me/image?id=817419972787&t=2&plc=API&ts=00&aid=177033216&tkn=*AtuVR8V8lltfE-mFl4gwYEOvERI",	
        	pic_2:	"https:i.mycdn.me/image?id=817419972787&t=2&plc=API&ts=00&aid=177033216&tkn=*AtuVR8V8lltfE-mFl4gwYEOvERI",	
        	uid:	"554516194995",	
        	url_profile:	"https:ok.ru/profile/554516194995",	
        },{//[64]	Object (@21a931a8791)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Астапович",	
        	photo:	"https:i.mycdn.me/image?id=877646052046&t=2&plc=API&ts=000201002400&aid=177033216&tkn=*YeamyxntbB3_wbY8n7WJqQPuFP8",	
        	pic_2:	"https:i.mycdn.me/image?id=877646052046&t=2&plc=API&ts=000201002400&aid=177033216&tkn=*YeamyxntbB3_wbY8n7WJqQPuFP8",	
        	uid:	"564013093582",	
        	url_profile:	"https:ok.ru/profile/564013093582",	
        },{//[65]	Object (@21a93fe0d01)	
        	first_name:	"Валентина",	
        	gender:	"female",	
        	last_name:	"Петрова",	
        	photo:	"https:i.mycdn.me/image?id=869624882633&t=2&plc=API&ts=00&aid=177033216&tkn=*tqwm-6813nfXsTaGN1PSn0KKKjE",	
        	pic_2:	"https:i.mycdn.me/image?id=869624882633&t=2&plc=API&ts=00&aid=177033216&tkn=*tqwm-6813nfXsTaGN1PSn0KKKjE",	
        	uid:	"562625539529",	
        	url_profile:	"https:ok.ru/profile/562625539529",	
        },{//[66]	Object (@21a93297731)	
        	first_name:	"Надежда",	
        	gender:	"female",	
        	last_name:	"Осипова",	
        	photo:	"https:i.mycdn.me/image?id=855452194507&t=2&plc=API&aid=177033216&tkn=*J7d1fpr0zz2h-Y_ccylmh4_ceZk",	
        	pic_2:	"https:i.mycdn.me/image?id=855452194507&t=2&plc=API&aid=177033216&tkn=*J7d1fpr0zz2h-Y_ccylmh4_ceZk",	
        	uid:	"545956866763",	
        	url_profile:	"https:ok.ru/profile/545956866763",	
        },{//[67]	Object (@21a932982e1)	
        	first_name:	"Зоя",	
        	gender:	"female",	
        	last_name:	"Султанова(Золотова)",	
        	photo:	"https:i.mycdn.me/image?id=866958366923&t=2&plc=API&ts=00&aid=177033216&tkn=*zrNjEZZQq5gUPPC-Dxv3UxxP9ro",	
        	pic_2:	"https:i.mycdn.me/image?id=866958366923&t=2&plc=API&ts=00&aid=177033216&tkn=*zrNjEZZQq5gUPPC-Dxv3UxxP9ro",	
        	uid:	"568790259147",	
        	url_profile:	"https:ok.ru/profile/568790259147",	
        },{//[68]	Object (@21a93298c41)	
        	first_name:	"ТАТЬЯНА",	
        	gender:	"female",	
        	last_name:	"СУХОВА (РЕБДЕВА)",	
        	photo:	"https:i.mycdn.me/image?id=884392217033&t=2&plc=API&ts=00&aid=177033216&tkn=*CzRYrwGFyknjQ9Y5SEAiEDgKYPU",	
        	pic_2:	"https:i.mycdn.me/image?id=884392217033&t=2&plc=API&ts=00&aid=177033216&tkn=*CzRYrwGFyknjQ9Y5SEAiEDgKYPU",	
        	uid:	"574461904585",	
        	url_profile:	"https:ok.ru/profile/574461904585",	
        },{//[69]	Object (@21a93206791)	
        	first_name:	"василий",	
        	gender:	"male",	
        	last_name:	"кокурин",	
        	photo:	"https:i.mycdn.me/image?id=889608082378&t=2&plc=API&ts=00&aid=177033216&tkn=*vk-mv5oM7DRzUO9nD_tcYv9BMNs",	
        	pic_2:	"https:i.mycdn.me/image?id=889608082378&t=2&plc=API&ts=00&aid=177033216&tkn=*vk-mv5oM7DRzUO9nD_tcYv9BMNs",	
        	uid:	"558794365386",	
        	url_profile:	"https:ok.ru/profile/558794365386",	
        },{//[70]	Object (@21a93207161)	
        	first_name:	"Майсура",	
        	gender:	"female",	
        	last_name:	"Иксанова",	
        	photo:	"https:i.mycdn.me/image?id=814357096133&t=2&plc=API&aid=177033216&tkn=*b8CWJn6cSQOfVIA5i18vkBj8-EY",	
        	pic_2:	"https:i.mycdn.me/image?id=814357096133&t=2&plc=API&aid=177033216&tkn=*b8CWJn6cSQOfVIA5i18vkBj8-EY",	
        	uid:	"547145721029",	
        	url_profile:	"https:ok.ru/profile/547145721029",	
        },{//[71]	Object (@21a93207cd1)	
        	first_name:	"Светлана",	
        	gender:	"female",	
        	last_name:	"Королева",	
        	photo:	"https:i.mycdn.me/image?id=849384847821&t=2&plc=API&ts=00&aid=177033216&tkn=*viwNee5qZe4mVOFZVlLBUPdKNFs",	
        	pic_2:	"https:i.mycdn.me/image?id=849384847821&t=2&plc=API&ts=00&aid=177033216&tkn=*viwNee5qZe4mVOFZVlLBUPdKNFs",	
        	uid:	"445172025037",	
        	url_profile:	"https:ok.ru/profile/445172025037",	
        },{//[72]	Object (@21a93208701)	
        	first_name:	"Анатолий и Вера",	
        	gender:	"male",	
        	last_name:	"Пенясовы (Жиганова)",	
        	photo:	"https:i.mycdn.me/image?id=854420285381&t=2&plc=API&ts=00&aid=177033216&tkn=*7r6gER14JAp0Iec3MLOYAHTeniU",	
        	pic_2:	"https:i.mycdn.me/image?id=854420285381&t=2&plc=API&ts=00&aid=177033216&tkn=*7r6gER14JAp0Iec3MLOYAHTeniU",	
        	uid:	"566067095749",	
        	url_profile:	"https:ok.ru/profile/566067095749",	
        },{//[73]	Object (@21a932092b1)	
        	first_name:	"Ирина",	
        	gender:	"female",	
        	last_name:	"Шептицкая (Гребенщикова)",	
        	photo:	"https:i.mycdn.me/image?id=878667753160&t=2&plc=API&aid=177033216&tkn=*huvLKVZCUSf-aViKGY6jMX6RN2E",	
        	pic_2:	"https:i.mycdn.me/image?id=878667753160&t=2&plc=API&aid=177033216&tkn=*huvLKVZCUSf-aViKGY6jMX6RN2E",	
        	uid:	"514222931656",	
        	url_profile:	"https:ok.ru/profile/514222931656",	
        },{//[74]	Object (@21a93209c11)	
        	first_name:	"Лидия",	
        	gender:	"female",	
        	last_name:	"Ацапина",	
        	photo:	"https:i.mycdn.me/image?id=817275616932&t=2&plc=API&aid=177033216&tkn=*MzsVggQYXKDHaKMBm84niGmi0QY",	
        	pic_2:	"https:i.mycdn.me/image?id=817275616932&t=2&plc=API&aid=177033216&tkn=*MzsVggQYXKDHaKMBm84niGmi0QY",	
        	uid:	"533842327204",	
        	url_profile:	"https:ok.ru/profile/533842327204",	
        },{//[75]	Object (@21a9320a4f1)	
        	first_name:	"Жанна",	
        	gender:	"female",	
        	last_name:	"Ускоева",	
        	photo:	"https:i.mycdn.me/image?id=883076925098&t=2&plc=API&ts=00&aid=177033216&tkn=*yoVNM6IwI_TWJ-P2-8ExPd2BZhQ",	
        	pic_2:	"https:i.mycdn.me/image?id=883076925098&t=2&plc=API&ts=00&aid=177033216&tkn=*yoVNM6IwI_TWJ-P2-8ExPd2BZhQ",	
        	uid:	"386871869098",	
        	url_profile:	"https:ok.ru/profile/386871869098",	
        },{//[76]	Object (@21a931a8071)	
        	first_name:	"Вера",	
        	gender:	"female",	
        	last_name:	"Лысенко(Молодых)",	
        	photo:	"https:i.mycdn.me/image?id=880658364323&t=2&plc=API&ts=00020100bc00&aid=177033216&tkn=*YO2O9Pn6_t3_YOl1H1b0n1b_t3w",	
        	pic_2:	"https:i.mycdn.me/image?id=880658364323&t=2&plc=API&ts=00020100bc00&aid=177033216&tkn=*YO2O9Pn6_t3_YOl1H1b0n1b_t3w",	
        	uid:	"86876854435",	
        	url_profile:	"https:ok.ru/profile/86876854435",	
        },{//[77]	Object (@21a931a8ac1)	
        	first_name:	"ольга",	
        	gender:	"female",	
        	last_name:	"воробина",	
        	photo:	"https:i.mycdn.me/image?id=443447300781&t=2&plc=API&aid=177033216&tkn=*Pyfc1Arc7hgNH_QJFhvee8B0Puc",	
        	pic_2:	"https:i.mycdn.me/image?id=443447300781&t=2&plc=API&aid=177033216&tkn=*Pyfc1Arc7hgNH_QJFhvee8B0Puc",	
        	uid:	"547837904301",	
        	url_profile:	"https:ok.ru/profile/547837904301",	
        },{//[78]	Object (@21a93fe0c71)	
        	first_name:	"Любовь",	
        	gender:	"female",	
        	last_name:	"Россия",	
        	photo:	"https:i.mycdn.me/image?id=872148923811&t=2&plc=API&ts=000201006b00&aid=177033216&tkn=*Xe5zpVhJ4aP8-uL3tgpAlMEA2jA",	
        	pic_2:	"https:i.mycdn.me/image?id=872148923811&t=2&plc=API&ts=000201006b00&aid=177033216&tkn=*Xe5zpVhJ4aP8-uL3tgpAlMEA2jA",	
        	uid:	"526445383331",	
        	url_profile:	"https:ok.ru/profile/526445383331",	
        },{//[79]	Object (@21a93297851)	
        	first_name:	"Татьяна",	
        	gender:	"female",	
        	last_name:	"Андреева",	
        	photo:	"https:i.mycdn.me/image?id=508727550039&t=2&plc=API&aid=177033216&tkn=*xCnJhba7agjv7AeCcEt8WYqZhfc",	
        	pic_2:	"https:i.mycdn.me/image?id=508727550039&t=2&plc=API&aid=177033216&tkn=*xCnJhba7agjv7AeCcEt8WYqZhfc",	
        	uid:	"553580348759",	
        	url_profile:	"https:ok.ru/profile/553580348759",	
        },{//[80]	Object (@21a93298311)	
        	first_name:	"Наталия",	
        	gender:	"female",	
        	last_name:	"Родителева (Чапыгина)",	
        	photo:	"https:i.mycdn.me/image?id=880872966229&t=2&plc=API&ts=00&aid=177033216&tkn=*utya0XLQYWb46uDm5vFirsZU7nI",	
        	pic_2:	"https:i.mycdn.me/image?id=880872966229&t=2&plc=API&ts=00&aid=177033216&tkn=*utya0XLQYWb46uDm5vFirsZU7nI",	
        	uid:	"510031674197",	
        	url_profile:	"https:ok.ru/profile/510031674197",	
        },{//[81]	Object (@21a93298d61)	
        	first_name:	"Надежда",	
        	gender:	"female",	
        	last_name:	"Кудрявцева",	
        	photo:	"https:i.mycdn.me/image?id=881004467033&t=2&plc=API&ts=00&aid=177033216&tkn=*a-K1aQHZ2MckUb8W3jBB-P653zE",	
        	pic_2:	"https:i.mycdn.me/image?id=881004467033&t=2&plc=API&ts=00&aid=177033216&tkn=*a-K1aQHZ2MckUb8W3jBB-P653zE",	
        	uid:	"558739619161",	
        	url_profile:	"https:ok.ru/profile/558739619161",	
        },{//[82]	Object (@21a93206851)	
        	first_name:	"ТАТЬЯНА",	
        	gender:	"female",	
        	last_name:	"РИЧКОВА(КОВАЛЕВА)",	
        	photo:	"https:i.mycdn.me/image?id=884225314651&t=2&plc=API&ts=00&aid=177033216&tkn=*6qS4ZEYb0Xj9uGfHPaLlWU92_ys",	
        	pic_2:	"https:i.mycdn.me/image?id=884225314651&t=2&plc=API&ts=00&aid=177033216&tkn=*6qS4ZEYb0Xj9uGfHPaLlWU92_ys",	
        	uid:	"546697624411",	
        	url_profile:	"https:ok.ru/profile/546697624411",	
        },{//[83]	Object (@21a932073a1)	
        	first_name:	"Валентина",	
        	gender:	"female",	
        	last_name:	"Брагина",	
        	photo:	"https:i.mycdn.me/image?id=863806492248&t=2&plc=API&ts=00&aid=177033216&tkn=*0cJpzksnGSeNp8PRMzD7SiVEGHA",	
        	pic_2:	"https:i.mycdn.me/image?id=863806492248&t=2&plc=API&ts=00&aid=177033216&tkn=*0cJpzksnGSeNp8PRMzD7SiVEGHA",	
        	uid:	"552246022744",	
        	url_profile:	"https:ok.ru/profile/552246022744",	
        },{//[84]	Object (@21a93207e81)	
        	first_name:	"Елена",	
        	gender:	"female",	
        	last_name:	"Лямина Степанова",	
        	photo:	"https:i.mycdn.me/image?id=494328245589&t=2&plc=API&ts=00&aid=177033216&tkn=*3M5iBI6ROR7eBEv-OLl9KsGhZsE",	
        	pic_2:	"https:i.mycdn.me/image?id=494328245589&t=2&plc=API&ts=00&aid=177033216&tkn=*3M5iBI6ROR7eBEv-OLl9KsGhZsE",	
        	uid:	"521855657045",	
        	url_profile:	"https:ok.ru/profile/521855657045",	
        },{//[85]	Object (@21a932089a1)	
        	first_name:	"Николай",	
        	gender:	"male",	
        	last_name:	"Волошко",	
        	photo:	"https:i.mycdn.me/image?id=857912169562&t=2&plc=API&ts=00&aid=177033216&tkn=*j9J7HBMmksNFAIFcyRmhsgatThk",	
        	pic_2:	"https:i.mycdn.me/image?id=857912169562&t=2&plc=API&ts=00&aid=177033216&tkn=*j9J7HBMmksNFAIFcyRmhsgatThk",	
        	uid:	"335919195738",	
        	url_profile:	"https:ok.ru/profile/335919195738",	
        },{//[86]	Object (@21a93209461)	
        	first_name:	"Наталья",	
        	gender:	"female",	
        	last_name:	"Битинева",	
        	photo:	"https:i.mycdn.me/image?id=573460002384&t=2&plc=API&ts=00&aid=177033216&tkn=*yjAsKdPaGNAKheIFnUFixW2BfxM",	
        	pic_2:	"https:i.mycdn.me/image?id=573460002384&t=2&plc=API&ts=00&aid=177033216&tkn=*yjAsKdPaGNAKheIFnUFixW2BfxM",	
        	uid:	"560326373968",	
        	url_profile:	"https:ok.ru/profile/560326373968",	
        },{//[87]	Object (@21a93209d31)	
        	first_name:	"Нина",	
        	gender:	"female",	
        	last_name:	"Головко (леонова)",	
        	photo:	"https:i.mycdn.me/image?id=885545061720&t=2&plc=API&aid=177033216&tkn=*84pGmiwezYDhLBsKoic8Da6PYj4",	
        	pic_2:	"https:i.mycdn.me/image?id=885545061720&t=2&plc=API&aid=177033216&tkn=*84pGmiwezYDhLBsKoic8Da6PYj4",	
        	uid:	"297257859160",	
        	url_profile:	"https:ok.ru/profile/297257859160",	
        },{//[88]	Object (@21a9320a791)	
        	first_name:	"Марина",	
        	gender:	"female",	
        	last_name:	"Пенская",	
        	photo:	"https:i.mycdn.me/image?id=234057043165&t=2&plc=API&ts=00&aid=177033216&tkn=*3A_PW5Rm7PuzAXvUJON8Ne_0yCM",	
        	pic_2:	"https:i.mycdn.me/image?id=234057043165&t=2&plc=API&ts=00&aid=177033216&tkn=*3A_PW5Rm7PuzAXvUJON8Ne_0yCM",	
        	uid:	"330935998941",	
        	url_profile:	"https:ok.ru/profile/330935998941",	
        },{//[89]	Object (@21a931a8431)	
        	first_name:	"Маргарита",	
        	gender:	"female",	
        	last_name:	"Хаимов",	
        	photo:	"https:i.mycdn.me/image?id=816706473181&t=2&plc=API&ts=00&aid=177033216&tkn=*IwJHBteoNKkcB2lO-MepfDw3h1M",	
        	pic_2:	"https:i.mycdn.me/image?id=816706473181&t=2&plc=API&ts=00&aid=177033216&tkn=*IwJHBteoNKkcB2lO-MepfDw3h1M",	
        	uid:	"533000411357",	
        	url_profile:	"https:ok.ru/profile/533000411357",	
        },{//[90]	Object (@21a931a8e21)	
        	first_name:	"Елена",	
        	gender:	"female",	
        	last_name:	"Зюбина (Васильева)",	
        	photo:	"https:i.mycdn.me/image?id=875631322838&t=2&plc=API&ts=00&aid=177033216&tkn=*XzlqnNGyN-R-uKpwHqT0CDtY0cM",	
        	pic_2:	"https:i.mycdn.me/image?id=875631322838&t=2&plc=API&ts=00&aid=177033216&tkn=*XzlqnNGyN-R-uKpwHqT0CDtY0cM",	
        	uid:	"367739047894",	
        	url_profile:	"https:ok.ru/profile/367739047894",	
        },{//[91]	Object (@21a93fe0cd1)	
        	first_name:	"Алексей",	
        	gender:	"male",	
        	last_name:	"Никоненко",	
        	photo:	"https:i.mycdn.me/image?id=855856157649&t=2&plc=API&aid=177033216&tkn=*QFoha-WnKVu8F0F_SL92NbdJhSs",	
        	pic_2:	"https:i.mycdn.me/image?id=855856157649&t=2&plc=API&aid=177033216&tkn=*QFoha-WnKVu8F0F_SL92NbdJhSs",	
        	uid:	"36928128721",	
        	url_profile:	"https:ok.ru/profile/36928128721",	
        },{//[92]	Object (@21a93297971)	
        	first_name:	"людмила",	
        	gender:	"female",	
        	last_name:	"некрасова(нефёдова)",	
        	photo:	"https:i.mycdn.me/image?id=838888899487&t=2&plc=API&ts=00&aid=177033216&tkn=*Y1BCVwkPbtt75S-c15DKVKM6M5c",	
        	pic_2:	"https:i.mycdn.me/image?id=838888899487&t=2&plc=API&ts=00&aid=177033216&tkn=*Y1BCVwkPbtt75S-c15DKVKM6M5c",	
        	uid:	"558725192863",	
        	url_profile:	"https:ok.ru/profile/558725192863",	
        },{//[93]	Object (@21a932983a1)	
        	first_name:	"татьяна",	
        	gender:	"female",	
        	last_name:	"тарасенко",	
        	photo:	"https:i.mycdn.me/image?id=854915513235&t=2&plc=API&aid=177033216&tkn=*aoFCi4yuKwRdJfYzEMkw3gStvtE",	
        	pic_2:	"https:i.mycdn.me/image?id=854915513235&t=2&plc=API&aid=177033216&tkn=*aoFCi4yuKwRdJfYzEMkw3gStvtE",	
        	uid:	"532620743315",	
        	url_profile:	"https:ok.ru/profile/532620743315",	
        },{//[94]	Object (@21a93298eb1)	
        	first_name:	"НАТАЛЬЯ",	
        	gender:	"female",	
        	last_name:	"ТЕЛЕГАНОВА (КУПРИЯНОВА)",	
        	photo:	"https:i.mycdn.me/image?id=890863642260&t=2&plc=API&ts=00&aid=177033216&tkn=*LD6see7SB39S0nFHzxYUNBzXIBI",	
        	pic_2:	"https:i.mycdn.me/image?id=890863642260&t=2&plc=API&ts=00&aid=177033216&tkn=*LD6see7SB39S0nFHzxYUNBzXIBI",	
        	uid:	"531466177172",	
        	url_profile:	"https:ok.ru/profile/531466177172",	
        },{//[95]	Object (@21a93206941)	
        	first_name:	"Тамара",	
        	gender:	"female",	
        	last_name:	"Трубчанина (Щербакова)",	
        	photo:	"https:i.mycdn.me/image?id=859143129243&t=2&plc=API&ts=00&aid=177033216&tkn=*vLmdP5_R18dpz3M-bJ33J_FnajQ",	
        	pic_2:	"https:i.mycdn.me/image?id=859143129243&t=2&plc=API&ts=00&aid=177033216&tkn=*vLmdP5_R18dpz3M-bJ33J_FnajQ",	
        	uid:	"557972445595",	
        	url_profile:	"https:ok.ru/profile/557972445595",	
        },{//[96]	Object (@21a93207581)	
        	first_name:	"Любовь",	
        	gender:	"female",	
        	last_name:	"Парфенова(Сорокина)",	
        	photo:	"https:i.mycdn.me/image?id=888062208404&t=2&plc=API&ts=00020100bf00&aid=177033216&tkn=*nSrhTSn_fSbcIPcu3YWsxdPEaWk",	
        	pic_2:	"https:i.mycdn.me/image?id=888062208404&t=2&plc=API&ts=00020100bf00&aid=177033216&tkn=*nSrhTSn_fSbcIPcu3YWsxdPEaWk",	
        	uid:	"560929160084",	
        	url_profile:	"https:ok.ru/profile/560929160084",	
        },{//[97]	Object (@21a93207fd1)	
        	first_name:	"Евгений",	
        	gender:	"male",	
        	last_name:	"Лямин",	
        	photo:	"https:i.mycdn.me/image?id=770904122010&t=2&plc=API&ts=00&aid=177033216&tkn=*0cRgnZG2KQ3lz6l9LIvXrK8HEIc",	
        	pic_2:	"https:i.mycdn.me/image?id=770904122010&t=2&plc=API&ts=00&aid=177033216&tkn=*0cRgnZG2KQ3lz6l9LIvXrK8HEIc",	
        	uid:	"340441894554",	
        	url_profile:	"https:ok.ru/profile/340441894554",	
        },{//[98]	Object (@21a93208c71)	
        	first_name:	"ОЛЕГ",	
        	gender:	"male",	
        	last_name:	"ДЁШИН",	
        	photo:	"https:i.mycdn.me/image?id=867886626712&t=2&plc=API&ts=00&aid=177033216&tkn=*KsPyYHxYINkl2hJUQdLCoWsT8hQ",	
        	pic_2:	"https:i.mycdn.me/image?id=867886626712&t=2&plc=API&ts=00&aid=177033216&tkn=*KsPyYHxYINkl2hJUQdLCoWsT8hQ",	
        	uid:	"555041092504",	
        	url_profile:	"https:ok.ru/profile/555041092504",
        }
    ];
    CWindSmallRating.resp2 = {
    	a:{
    		"264346" : { exp:"389468", oid:"129012946464" },
    		"264347" : { exp:"389462", oid:"555027185260" },
    		"264348" : { exp:"389456", oid:"579089224503" },
    		"264349" : { exp:"389453", oid:"514097834586" }
    	},
    	d:	null,
    	m:	null	
    };
	CWindSmallRating.ressn2 =	[
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

	