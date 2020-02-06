	let SocialClient =
	{
		appId:  Config.OK_API_ID,
		appKey: Config.OK_API_KEY,
		init: function( onSocialClientInited ) {
		    if ( onSocialClientInited ) onSocialClientInited();
		},
	    getCurrentUser: function( okHanler, errHandler ) {
	    },
	    errorHandler : function( error, errorMsg ) {
	        errorMsg = errorMsg || "Error FAPI init"
			try {
			    Winds.show( Winds.MSG, { m:errorMsg+" "+FAPI.Util.toString(error) } );
			} catch(err) {
				alert( errorMsg+" "+FAPI.Util.toString(error) );
			}
	        console.log(errorMsg);
	        console.log(error);
	    },
	    getFriendsOIDs: function( okHanler, errHandler ) {
	    },
		isMobile: function() {
			return location.href.indexOf( "mob=true" ) >= 0 || location.href.indexOf( "mob=1" ) >= 0 ;
		},
		MediaTopicPost: function( txt, imageUrl ) {
			alert( txt );
		},
		Payment: function( pcode, pname, pprice ) {
			alert( "pcode: "+ pcode + " pname: " + pname + " pprice " + pprice );
		},
		suggest: function( txt, targetSocNetId ) {
		},
		invite: function( txt ) {
			alert(txt);
		},
		getFriendsOIDs_oldversion: function() {
		},
		getFriendsAppOIDs: function( okHandler, errHandler ) {
		},
 		userGetProfiles: function( okHandler, fuids ) {
		}
	};