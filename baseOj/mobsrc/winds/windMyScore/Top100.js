	
	"use strict";
	
	let Top100 = {};
	
	Top100.usersTop100 = [];
	
	/*Top100.setCallBack = function( callback ) {
		this.callback = callback;
		//this.callback( this.usersTop100 );
	}*/
	
	Top100.showTop100Rating = function( callback ) {
		let self = this;
		this.callback = callback;
		
		if ( this.usersTop100.length > 0 ) {
			this.callback( this.usersTop100, Consts.TOP_ALL );
		  /* this.users = this.usersTop100;         
		    this.shiftUsers = 0;
			this.showCards();*/
		} else {
			if ( Handler.isDV() ) {//Handler.isDV()
		        this.onGetTop( this.resp4 );
	        } else {
			    BackClient.ask( BackClient.USER_GET_TOP, function(r){ self.onGetTop(r); } );
			}
		}
		
	};	
	Top100.onGetTop = function( data ) {
		this.top = [];
		if ( data == null ) {
			data = [];
			this.showCards();
			return;
		}
		
		let uids = [];
		for ( let usr of data ) {
			this.top[ usr.oid ] = { uid: usr.oid, exp: parseInt(usr.exp) };
			uids.push( usr.oid );
		}
		let self = this;
		if ( uids.length > 0 ) {
			if ( Handler.isDV() ) {//Handler.isDV()
		        this.onGetTopProfiles( this.resp5 );
	        } else {
			    SocialClient.userGetProfiles( function(r){ self.onGetTopProfiles(r); }, uids );
			}
		}
	};
	
    Top100.onGetTopProfiles = function( data ) {
		if ( data == null ) {
			let _error = 2;
			this.showCards();
			return; 
		}
 
		for ( let usr of data ) {
			for ( let key in usr ) {
				//this.top[ parseInt(usr.uid) ][key] = usr[key];
				this.top[ usr.uid ][key] = usr[key];
			}
		}
		//if (_callbackTop != null) _callbackTop();
		
		for ( let uid in this.top ) {
			let usr = this.top[uid];
		    this.usersTop100.push({ url    : usr.photo || usr.pic_2, 
			                        uid    : uid, 
								    name   : usr.first_name, 
								    points : usr.exp         } );
		}

		this.usersTop100.sort( function(a, b) { return b.points - a.points; } );
		this.callback( this.usersTop100, Consts.TOP_ALL );
		/*
		this.users = this.usersTop100;         
		this.shiftUsers = 0;
        this.showCards();*/
		
	};
	
	Top100.resp4 = [
		{//0 (@445bf146ee1)	
			exp:	"246147219",	
			oid:	"568218754009",	
		},{//1 (@445bf4550d1)	
			exp:	"244808327",	
			oid:	"543631781877",	
		},{//2 (@445bf81dca1)	
			exp:	"231429663",	
			oid:	"532808276588",	
		},{//3 (@445bf6948e1)	
			exp:	"221311853",	
			oid:	"562054855143",	
		},{//4 (@445bf843eb1)	
			exp:	"219747240",	
			oid:	"559433115365",	
		},{//5 (@445bfc6f0d1)	
			exp:	"219697608",	
			oid:	"434670006660",	
		},{//6 (@445bfc6f3a1)	
			exp:	"219533615",	
			oid:	"491855362191",	
		},{//7 (@445bfc6f671)	
			exp:	"218757831",	
			oid:	"571901269048",	
		},{//8 (@445bfc6f941)	
			exp:	"218671395",	
			oid:	"348845327060",	
		},{//9 (@445bfc6fc11)	
			exp:	"218605110",	
			oid:	"351559394942",	
		},{//10 (@445bfc6fee1)	
			exp:	"218579269",	
			oid:	"558096442258",	
		},{//11 (@445bfc70221)	
			exp:	"217650072",	
			oid:	"547238655558",	
		},{//12 (@445bfc704f1)	
			exp:	"217563681",	
			oid:	"564076908463",	
		},{//13 (@445bfc707c1)	
			exp:	"217552705",	
			oid:	"249026708544",	
		},{//14 (@445bfc70a91)	
			exp:	"217282931",	
			oid:	"564520002951",	
		},{//15 (@445bfc70d61)	
			exp:	"216790440",	
			oid:	"530813507360",	
		},{//16 (@445bf9530a1)	
			exp:	"215234841",	
			oid:	"550772189175",	
		},{//17 (@445bf455821)	
			exp:	"215101201",	
			oid:	"500061283450",	
		},{//18 (@445bf455071)	
			exp:	"214369542",	
			oid:	"515559261812",	
		},{//19 (@445bf81ddc1)	
			exp:	"213993747",	
			oid:	"36928128721",	
		},{//20 (@445bf6947f1)	
			exp:	"213709704",	
			oid:	"563551399269",	
		},{//21 (@445c0babbb1)	
			exp:	"213453893",	
			oid:	"206492346026",	
		},{//22 (@445bfc6f161)	
			exp:	"213453007",	
			oid:	"562625539529",	
		},{//23 (@445bfc6f491)	
			exp:	"212995937",	
			oid:	"559033633024",	
		},{//24 (@445bfc6f7c1)	
			exp:	"212859275",	
			oid:	"453081661",	
		},{//25 (@445bfc6fa61)	
			exp:	"212721562",	
			oid:	"336147341386",	
		},{//26 (@445bfc6fd91)	
			exp:	"212178944",	
			oid:	"233323908340",	
		},{//27 (@445bfc70131)	
			exp:	"212105844",	
			oid:	"568956653110",	
		},{//28 (@445bfc703d1)	
			exp:	"212061192",	
			oid:	"536839338073",	
		},{//29 (@445bfc70701)	
			exp:	"210922014",	
			oid:	"331277425448",	
		},{//30 (@445bfc70a01)	
			exp:	"209073141",	
			oid:	"456476048430",	
		},{//31 (@445bfc70d01)	
			exp:	"208706510",	
			oid:	"548175546199",	
		},{//32 (@445bf9530d1)	
			exp:	"208620011",	
			oid:	"98497622022",	
		},{//33 (@445bf9533d1)	
			exp:	"207828946",	
			oid:	"562628585157",	
		},{//34 (@445bf9536a1)	
			exp:	"207340944",	
			oid:	"506917574223",	
		},{//35 (@445bf953971)	
			exp:	"207181269",	
			oid:	"355379406651",	
		},{//36 (@445bf953c41)	
			exp:	"207180816",	
			oid:	"560070340545",	
		},{//37 (@445bf953f11)	
			exp:	"206678421",	
			oid:	"574242526484",	
		},{//38 (@445bf954251)	
			exp:	"206157349",	
			oid:	"117077382875",	
		},{//39 (@445bf954521)	
			exp:	"206007288",	
			oid:	"41970065468",	
		},{//40 (@445bf9547f1)	
			exp:	"205862877",	
			oid:	"565765363897",	
		},{//41 (@445bf954ac1)	
			exp:	"205583401",	
			oid:	"558186735321",	
		},{//42 (@445bf954d91)	
			exp:	"205360388",	
			oid:	"574902433055",	
		},{//43 (@445bfdd80d1)	
			exp:	"204737672",	
			oid:	"557182305874",	
		},{//44 (@445bfdd83a1)	
			exp:	"204651778",	
			oid:	"527001351062",	
		},{//45 (@445bfdd8671)	
			exp:	"204609353",	
			oid:	"199607735558",	
		},{//46 (@445bfdd8941)	
			exp:	"204123016",	
			oid:	"518098714752",	
		},{//47 (@445bfdd8c11)	
			exp:	"204120233",	
			oid:	"68875695702",	
		},{//48 (@445bfdd8ee1)	
			exp:	"203998370",	
			oid:	"543796964580",	
		},{//49 (@445bfdd9221)	
			exp:	"203900783",	
			oid:	"561124801320",	
		},{//50 (@445bfdd94f1)	
			exp:	"203706539",	
			oid:	"552491550841",	
		},{//51 (@445bfdd97c1)	
			exp:	"203295215",	
			oid:	"354581676701",	
		},{//52 (@445bff71ca1)	
			exp:	"203253867",	
			oid:	"359770171766",	
		},{//53 (@445bf455131)	
			exp:	"202941067",	
			oid:	"535875654675",	
		},{//54 (@445bf81da91)	
			exp:	"201443749",	
			oid:	"559749873759",	
		},{//55 (@445bf694401)	
			exp:	"201417365",	
			oid:	"338234525101",	
		},{//56 (@445c0bab611)	
			exp:	"201294628",	
			oid:	"568324648512",	
		},{//57 (@445bfc6f2b1)	
			exp:	"200784431",	
			oid:	"427007348745",	
		},{//58 (@445bfc6f5e1)	
			exp:	"198266017",	
			oid:	"134432838525",	
		},{//59 (@445bfc6f8b1)	
			exp:	"198112759",	
			oid:	"356261336667",	
		},{//60 (@445bfc6fbe1)	
			exp:	"197980605",	
			oid:	"529252714325",	
		},{//61 (@445bfc6ff71)	
			exp:	"197340982",	
			oid:	"348306122473",	
		},{//62 (@445bfc702b1)	
			exp:	"196618097",	
			oid:	"144081197021",	
		},{//63 (@445bfc70611)	
			exp:	"195842562",	
			oid:	"507128885188",	
		},{//64 (@445bfc709a1)	
			exp:	"194893399",	
			oid:	"342544813122",	
		},{//65 (@445bfc70ca1)	
			exp:	"194822093",	
			oid:	"160369648096",	
		},{//66 (@445bf953071)	
			exp:	"194569001",	
			oid:	"559493454434",	
		},{//67 (@445bf9533a1)	
			exp:	"194546045",	
			oid:	"228798747596",	
		},{//68 (@445bf953701)	
			exp:	"194225034",	
			oid:	"121658211723",	
		},{//69 (@445bf953a31)	
			exp:	"193746756",	
			oid:	"113968724420",	
		},{//70 (@445bf953cd1)	
			exp:	"193622116",	
			oid:	"552246022744",	
		},{//71 (@445bf954071)	
			exp:	"193001594",	
			oid:	"449364688742",	
		},{//72 (@445bf9543a1)	
			exp:	"192643565",	
			oid:	"557037725184",	
		},{//73 (@445bf954641)	
			exp:	"191319772",	
			oid:	"442632111803",	
		},{//74 (@445bf954971)	
			exp:	"190808643",	
			oid:	"481857325733",	
		},{//75 (@445bf954ca1)	
			exp:	"190421584",	
			oid:	"502396207012",	
		},{//76 (@445bf954f41)	
			exp:	"190285353",	
			oid:	"553765541200",	
		},{//77 (@445bfdd82e1)	
			exp:	"189292606",	
			oid:	"524046004083",	
		},{//78 (@445bfdd85e1)	
			exp:	"189052741",	
			oid:	"515136830128",	
		},{//79 (@445bfdd88e1)	
			exp:	"188348763",	
			oid:	"542066442468",	
		},{//80 (@445bfdd8c41)	
			exp:	"188136221",	
			oid:	"452993422977",	
		},{//81 (@445bfdd8eb1)	
			exp:	"186637221",	
			oid:	"538699983348",	
		},{//82 (@445bfdd9281)	
			exp:	"184611853",	
			oid:	"547837904301",	
		},{//83 (@445bfdd95b1)	
			exp:	"184475120",	
			oid:	"118103598325",	
		},{//84 (@445bfdd9911)	
			exp:	"183822692",	
			oid:	"512332792532",	
		},{//85 (@445bfdd9c11)	
			exp:	"183606698",	
			oid:	"509480867817",	
		},{//86 (@445bfdd9ee1)	
			exp:	"183203025",	
			oid:	"538226375932",	
		},{//87 (@445bf455731)	
			exp:	"182322468",	
			oid:	"561076271595",	
		},{//88 (@445bf455101)	
			exp:	"181581349",	
			oid:	"560437229219",	
		},{//89 (@445bf81daf1)	
			exp:	"180388263",	
			oid:	"528164044035",	
		},{//90 (@445bf6943a1)	
			exp:	"180158460",	
			oid:	"546697624411",	
		},{//91 (@445c0bab3d1)	
			exp:	"180127260",	
			oid:	"348736365999",	
		},{//92 (@445bfc6f341)	
			exp:	"179549064",	
			oid:	"93850866664",	
		},{//93 (@445bfc6f701)	
			exp:	"179375451",	
			oid:	"114947304102",	
		},{//94 (@445bfc6fa31)	
			exp:	"179033513",	
			oid:	"342415447442",	
		},{//95 (@445bfc6fdc1)	
			exp:	"178600105",	
			oid:	"537289067198",	
		},{//96 (@445bfc70251)	
			exp:	"177718818",	
			oid:	"528239363349",	
		},{//97 (@445bfc704c1)	
			exp:	"177417233",	
			oid:	"341253513990",	
		},{//98 (@445bfc708b1)	
			exp:	"176745723",	
			oid:	"572571570970",	
		},{//99 (@445bfc70bb1)	
			exp:	"175787522",	
			oid:	"355835260012"
		}
	];
	
	Top100.resp5 = [
		{//0	Object (@445bfc6fbb1)	
			first_name:	"ТАТЬЯНА",	
			gender:	"female",	
			last_name:	"РИЧКОВА(КОВАЛЕВА)",	
			photo:	"https://i.mycdn.me/image?id=884225314651&t=2&plc=API&ts=00&aid=177033216&tkn=*6qS4ZEYb0Xj9uGfHPaLlWU92_ys",	
			pic_2:	"https://i.mycdn.me/image?id=884225314651&t=2&plc=API&ts=00&aid=177033216&tkn=*6qS4ZEYb0Xj9uGfHPaLlWU92_ys",	
			uid:	"546697624411",	
			url_profile:	"https://ok.ru/profile/546697624411",	
		},{//1	Object (@445bfc705e1)	
			first_name:	"Виктор",	
			gender:	"male",	
			last_name:	"Исаев",	
			photo:	"https://i.mycdn.me/image?id=541091680594&t=2&plc=API&aid=177033216&tkn=*6cyrJKGCiE1A_DGEPK9qKDokngk",	
			pic_2:	"https://i.mycdn.me/image?id=541091680594&t=2&plc=API&aid=177033216&tkn=*6cyrJKGCiE1A_DGEPK9qKDokngk",	
			uid:	"557182305874",	
			url_profile:	"https://ok.ru/profile/557182305874",	
		},{//2	Object (@445bfc70fd1)	
			first_name:	"Валентина",	
			gender:	"female",	
			last_name:	"Брагина",	
			photo:	"https://i.mycdn.me/image?id=863806492248&t=2&plc=API&ts=00&aid=177033216&tkn=*0cJpzksnGSeNp8PRMzD7SiVEGHA",	
			pic_2:	"https://i.mycdn.me/image?id=863806492248&t=2&plc=API&ts=00&aid=177033216&tkn=*0cJpzksnGSeNp8PRMzD7SiVEGHA",	
			uid:	"552246022744",	
			url_profile:	"https://ok.ru/profile/552246022744",	
		},{//3	Object (@445bf953911)	
			first_name:	"Тамара",	
			gender:	"female",	
			last_name:	"Бахаревская (Белова)",	
			photo:	"https://i.mycdn.me/image?id=448038448213&t=2&plc=API&ts=00&aid=177033216&tkn=*GPTYqgnGfOLwrWW0tgPus66q8Rg",	
			pic_2:	"https://i.mycdn.me/image?id=448038448213&t=2&plc=API&ts=00&aid=177033216&tkn=*GPTYqgnGfOLwrWW0tgPus66q8Rg",	
			uid:	"529252714325",	
			url_profile:	"https://ok.ru/profile/529252714325",	
		},{//4	Object (@445bf9541f1)	
			first_name:	"(((VALENTINA)))",	
			gender:	"female",	
			last_name:	"VALENTINKA",	
			photo:	"https://i.mycdn.me/image?id=874387119447&t=2&plc=API&ts=00&aid=177033216&tkn=*YsEXoshrjNgmyJdqiuP6bZdLNFA",	
			pic_2:	"https://i.mycdn.me/image?id=874387119447&t=2&plc=API&ts=00&aid=177033216&tkn=*YsEXoshrjNgmyJdqiuP6bZdLNFA",	
			uid:	"548175546199",	
			url_profile:	"https://ok.ru/profile/548175546199",	
		},{//5	Object (@445bf954a61)	
			first_name:	"Елена",	
			gender:	"female",	
			last_name:	"Васильева",	
			photo:	"https://i.mycdn.me/image?id=71752779350&t=2&plc=API&ts=00&aid=177033216&tkn=*7mS6Eb2_4vlBiWXbxrna5-gLFPs",	
			pic_2:	"https://i.mycdn.me/image?id=71752779350&t=2&plc=API&ts=00&aid=177033216&tkn=*7mS6Eb2_4vlBiWXbxrna5-gLFPs",	
			uid:	"68875695702",	
			url_profile:	"https://ok.ru/profile/68875695702",	
		},{//6	Object (@445bfdd8341)	
			first_name:	"Татьяна",	
			gender:	"female",	
			last_name:	"Майстренко",	
			photo:	"https://i.mycdn.me/image?id=476959570777&t=2&plc=API&ts=00&aid=177033216&tkn=*msEAFiHwJnSSWCiEwJREzODhuq8",	
			pic_2:	"https://i.mycdn.me/image?id=476959570777&t=2&plc=API&ts=00&aid=177033216&tkn=*msEAFiHwJnSSWCiEwJREzODhuq8",	
			uid:	"536839338073",	
			url_profile:	"https://ok.ru/profile/536839338073",	
		},{//7	Object (@445bfdd8b81)	
			first_name:	"кислый",	
			gender:	"female",	
			last_name:	"лимон",	
			photo:	"https://i.mycdn.me/image?id=871261073247&t=2&plc=API&ts=00&aid=177033216&tkn=*8iyP8wun6fFJ1OJFrsMwh350Fgc",	
			pic_2:	"https://i.mycdn.me/image?id=871261073247&t=2&plc=API&ts=00&aid=177033216&tkn=*8iyP8wun6fFJ1OJFrsMwh350Fgc",	
			uid:	"559749873759",	
			url_profile:	"https://ok.ru/profile/559749873759",	
		},{//8	Object (@445bfdd9431)	
			first_name:	"Наталья",	
			gender:	"female",	
			last_name:	"Суворова",	
			photo:	"https://i.mycdn.me/image?id=875224313179&t=2&plc=API&ts=00&aid=177033216&tkn=*tTF86lc-bXcARSh3zuq2jbXON0U",	
			pic_2:	"https://i.mycdn.me/image?id=875224313179&t=2&plc=API&ts=00&aid=177033216&tkn=*tTF86lc-bXcARSh3zuq2jbXON0U",	
			uid:	"356261336667",	
			url_profile:	"https://ok.ru/profile/356261336667",	
		},{//9	Object (@445bfdd9d31)	
			first_name:	"Татьяна",	
			gender:	"female",	
			last_name:	"Литвинова",	
			photo:	"https://i.mycdn.me/res/stub_128x96.gif",	
			pic_2:	"https://i.mycdn.me/res/stub_128x96.gif",	
			uid:	"553765541200",	
			url_profile:	"https://ok.ru/profile/553765541200",	
		},{//10	Object (@445bfbf6641)	
			first_name:	"Валентина",	
			gender:	"female",	
			last_name:	"Назаренко",	
			photo:	"https://i.mycdn.me/image?id=835889039622&t=2&plc=API&ts=00&aid=177033216&tkn=*cgSHcwRkq-j_2rhG-JOA5Uv_2Bg",	
			pic_2:	"https://i.mycdn.me/image?id=835889039622&t=2&plc=API&ts=00&aid=177033216&tkn=*cgSHcwRkq-j_2rhG-JOA5Uv_2Bg",	
			uid:	"341253513990",	
			url_profile:	"https://ok.ru/profile/341253513990",	
		},{//11	Object (@445bfbf6d91)	
			first_name:	"Anatolie",	
			gender:	"male",	
			last_name:	"Goroh",	
			photo:	"https://i.mycdn.me/image?id=666059311104&t=2&plc=API&ts=00&aid=177033216&tkn=*Zfo1oOwIh3ghb2dGm5BcerdQaFs",	
			pic_2:	"https://i.mycdn.me/image?id=666059311104&t=2&plc=API&ts=00&aid=177033216&tkn=*Zfo1oOwIh3ghb2dGm5BcerdQaFs",	
			uid:	"559033633024",	
			url_profile:	"https://ok.ru/profile/559033633024",	
		},{//12	Object (@445bff95551)	
			first_name:	"елена",	
			gender:	"female",	
			last_name:	"***",	
			photo:	"https://i.mycdn.me/image?id=188093154310&t=2&plc=API&aid=177033216&tkn=*2UKGoiVJJgMU3sDQYXw7GvP6pFA",	
			pic_2:	"https://i.mycdn.me/image?id=188093154310&t=2&plc=API&aid=177033216&tkn=*2UKGoiVJJgMU3sDQYXw7GvP6pFA",	
			uid:	"199607735558",	
			url_profile:	"https://ok.ru/profile/199607735558",	
		},{//13	Object (@445bfc6fdf1)	
			first_name:	"Сергей",	
			gender:	"male",	
			last_name:	"Бобков",	
			photo:	"https://i.mycdn.me/image?id=871691076361&t=2&plc=API&ts=00&aid=177033216&tkn=*f47_6wyESmBQ43Z3YldbiHOsv10",	
			pic_2:	"https://i.mycdn.me/image?id=871691076361&t=2&plc=API&ts=00&aid=177033216&tkn=*f47_6wyESmBQ43Z3YldbiHOsv10",	
			uid:	"427007348745",	
			url_profile:	"https://ok.ru/profile/427007348745",	
		},{//14	Object (@445bfc70791)	
			first_name:	"Гена",	
			gender:	"male",	
			last_name:	"Иванов",	
			photo:	"https://i.mycdn.me/image?id=920292630272&t=2&plc=API&ts=00&aid=177033216&tkn=*7e98WsYXsVOi7JxwcYQaAqmmM9k",	
			pic_2:	"https://i.mycdn.me/image?id=920292630272&t=2&plc=API&ts=00&aid=177033216&tkn=*7e98WsYXsVOi7JxwcYQaAqmmM9k",	
			uid:	"557037725184",	
			url_profile:	"https://ok.ru/profile/557037725184",	
		},{//15	Object (@445bf953221)	
			first_name:	"Екатерина",	
			gender:	"female",	
			last_name:	"Янкович ( Коваленко )",	
			photo:	"https://i.mycdn.me/image?id=884250185222&t=2&plc=API&ts=00010001&aid=177033216&tkn=*xNs3JSc5NmuttSefepGmPc8XH6s",	
			pic_2:	"https://i.mycdn.me/image?id=884250185222&t=2&plc=API&ts=00010001&aid=177033216&tkn=*xNs3JSc5NmuttSefepGmPc8XH6s",	
			uid:	"98497622022",	
			url_profile:	"https://ok.ru/profile/98497622022",	
		},{//16	Object (@445bf953b51)	
			first_name:	"Шамиль",	
			gender:	"male",	
			last_name:	"Салахов",	
			photo:	"https://i.mycdn.me/image?id=856416498179&t=2&plc=API&ts=000201001a00&aid=177033216&tkn=*f2KLcf9Z1Zj5ae4s4Dh3MazFfaw",	
			pic_2:	"https://i.mycdn.me/image?id=856416498179&t=2&plc=API&ts=000201001a00&aid=177033216&tkn=*f2KLcf9Z1Zj5ae4s4Dh3MazFfaw",	
			uid:	"528164044035",	
			url_profile:	"https://ok.ru/profile/528164044035",	
		},{//17	Object (@445bf954401)	
			first_name:	"Клавдия",	
			gender:	"female",	
			last_name:	"Крайнова",	
			photo:	"https://i.mycdn.me/image?id=526383365819&t=2&plc=API&aid=177033216&tkn=*hRg3sZAtjIgCAQRbfUJmEQvYl7c",	
			pic_2:	"https://i.mycdn.me/image?id=526383365819&t=2&plc=API&aid=177033216&tkn=*hRg3sZAtjIgCAQRbfUJmEQvYl7c",	
			uid:	"442632111803",	
			url_profile:	"https://ok.ru/profile/442632111803",	
		},{//18	Object (@445bf954cd1)	
			first_name:	"ГАЛИНА",	
			gender:	"female",	
			last_name:	"ШУВАЛОВА",	
			photo:	"https://i.mycdn.me/image?id=849942882992&t=2&plc=API&ts=00&aid=177033216&tkn=*O5wgbWBYRoc5dESn2VOXwENpboQ",	
			pic_2:	"https://i.mycdn.me/image?id=849942882992&t=2&plc=API&ts=00&aid=177033216&tkn=*O5wgbWBYRoc5dESn2VOXwENpboQ",	
			uid:	"515136830128",	
			url_profile:	"https://ok.ru/profile/515136830128",	
		},{//19	Object (@445bfdd85b1)	
			first_name:	"Andreas",	
			gender:	"male",	
			last_name:	"Selenin",	
			photo:	"https://i.mycdn.me/image?id=567267525817&t=2&plc=API&aid=177033216&tkn=*P04wIhs_n9mOE1DF_cy9W9kZypk",	
			pic_2:	"https://i.mycdn.me/image?id=567267525817&t=2&plc=API&aid=177033216&tkn=*P04wIhs_n9mOE1DF_cy9W9kZypk",	
			uid:	"565765363897",	
			url_profile:	"https://ok.ru/profile/565765363897",	
		},{//20	Object (@445bfdd8e21)	
			first_name:	"Светлана",	
			gender:	"female",	
			last_name:	"Меркулова",	
			photo:	"https://i.mycdn.me/image?id=443549181886&t=2&plc=API&ts=00&aid=177033216&tkn=*WM7VPpGvmDJmyWb6dvleST0RdN0",	
			pic_2:	"https://i.mycdn.me/image?id=443549181886&t=2&plc=API&ts=00&aid=177033216&tkn=*WM7VPpGvmDJmyWb6dvleST0RdN0",	
			uid:	"537289067198",	
			url_profile:	"https://ok.ru/profile/537289067198",	
		},{//21	Object (@445bfdd9731)	
			first_name:	"Люба",	
			gender:	"female",	
			last_name:	"Дубнова (Филенкова)",	
			photo:	"https://i.mycdn.me/image?id=529765779858&t=2&plc=API&ts=00&aid=177033216&tkn=*F3i2VqxrZIv7btt0GZKFd-O4xtQ",	
			pic_2:	"https://i.mycdn.me/image?id=529765779858&t=2&plc=API&ts=00&aid=177033216&tkn=*F3i2VqxrZIv7btt0GZKFd-O4xtQ",	
			uid:	"558096442258",	
			url_profile:	"https://ok.ru/profile/558096442258",	
		},{//22	Object (@445bfbf61f1)	
			first_name:	"Павел",	
			gender:	"male",	
			last_name:	"Кузьмин",	
			photo:	"https://i.mycdn.me/image?id=189974128786&t=2&plc=API&aid=177033216&tkn=*UIJaqBM6IFjfSb0YTYqm-edHOHo",	
			pic_2:	"https://i.mycdn.me/image?id=189974128786&t=2&plc=API&aid=177033216&tkn=*UIJaqBM6IFjfSb0YTYqm-edHOHo",	
			uid:	"342415447442",	
			url_profile:	"https://ok.ru/profile/342415447442",	
		},{//23	Object (@445bfbf6911)	
			first_name:	"Евгений",	
			gender:	"male",	
			last_name:	"Майдиков",	
			photo:	"https://i.mycdn.me/image?id=482515046813&t=2&plc=API&ts=00&aid=177033216&tkn=*HDbsd3B_nfsBCOgFGdTnRGQqL_Y",	
			pic_2:	"https://i.mycdn.me/image?id=482515046813&t=2&plc=API&ts=00&aid=177033216&tkn=*HDbsd3B_nfsBCOgFGdTnRGQqL_Y",	
			uid:	"354581676701",	
			url_profile:	"https://ok.ru/profile/354581676701",	
		},{//24	Object (@445bff95131)	
			first_name:	"Ася",	
			gender:	"female",	
			last_name:	"Климова",	
			photo:	"https://i.mycdn.me/image?id=834476688534&t=2&plc=API&ts=00&aid=177033216&tkn=*whthLmzZfMB0a85AHeEMWO34LMQ",	
			pic_2:	"https://i.mycdn.me/image?id=834476688534&t=2&plc=API&ts=00&aid=177033216&tkn=*whthLmzZfMB0a85AHeEMWO34LMQ",	
			uid:	"527001351062",	
			url_profile:	"https://ok.ru/profile/527001351062",	
		},{//25	Object (@445bff95911)	
			first_name:	"любовь",	
			gender:	"female",	
			last_name:	"тремко(Коледа)",	
			photo:	"https://i.mycdn.me/image?id=837765005301&t=2&plc=API&ts=00&aid=177033216&tkn=*QWSgvK3KWKAI55U155PdDQHr19M",	
			pic_2:	"https://i.mycdn.me/image?id=837765005301&t=2&plc=API&ts=00&aid=177033216&tkn=*QWSgvK3KWKAI55U155PdDQHr19M",	
			uid:	"543631781877",	
			url_profile:	"https://ok.ru/profile/543631781877",	
		},{//26	Object (@445bfc6fe51)	
			first_name:	"Юрий",	
			gender:	"male",	
			last_name:	"Грищенко",	
			photo:	"https://i.mycdn.me/image?id=851552978164&t=2&plc=API&ts=00&aid=177033216&tkn=*zysM4I1oJpUiQuCQ2Kycs28Z6Fk",	
			pic_2:	"https://i.mycdn.me/image?id=851552978164&t=2&plc=API&ts=00&aid=177033216&tkn=*zysM4I1oJpUiQuCQ2Kycs28Z6Fk",	
			uid:	"233323908340",	
			url_profile:	"https://ok.ru/profile/233323908340",	
		},{//27	Object (@445bfc70911)	
			first_name:	"Дима",	
			gender:	"male",	
			last_name:	"Крылов",	
			photo:	"https://i.mycdn.me/image?id=427837687804&t=2&plc=API&aid=177033216&tkn=*aVqqmEAdWxa0wBvLR9WBmZ27vMo",	
			pic_2:	"https://i.mycdn.me/image?id=427837687804&t=2&plc=API&aid=177033216&tkn=*aVqqmEAdWxa0wBvLR9WBmZ27vMo",	
			uid:	"538226375932",	
			url_profile:	"https://ok.ru/profile/538226375932",	
		},{//28	Object (@445bf9532b1)	
			first_name:	"Сергей",	
			gender:	"male",	
			last_name:	"Коваленко",	
			photo:	"https://i.mycdn.me/image?id=836121603317&t=2&plc=API&ts=00&aid=177033216&tkn=*gYr8mqV7RFez6DtoZ--OmlowuNg",	
			pic_2:	"https://i.mycdn.me/image?id=836121603317&t=2&plc=API&ts=00&aid=177033216&tkn=*gYr8mqV7RFez6DtoZ--OmlowuNg",	
			uid:	"118103598325",	
			url_profile:	"https://ok.ru/profile/118103598325",	
		},{//29	Object (@445bf953c71)	
			first_name:	"Светлана Сергей",	
			gender:	"female",	
			last_name:	"Енины (Полякова)",	
			photo:	"https://i.mycdn.me/res/stub_128x96.gif",	
			pic_2:	"https://i.mycdn.me/res/stub_128x96.gif",	
			uid:	"550772189175",	
			url_profile:	"https://ok.ru/profile/550772189175",	
		},{//30	Object (@445bf9545e1)	
			first_name:	"Дина",	
			gender:	"female",	
			last_name:	"Бадретдинова (Каюмова)",	
			photo:	"https://i.mycdn.me/image?id=883012998900&t=2&plc=API&ts=00&aid=177033216&tkn=*uqYuxqF8vFj-eGMOff1UAIzOZ00",	
			pic_2:	"https://i.mycdn.me/image?id=883012998900&t=2&plc=API&ts=00&aid=177033216&tkn=*uqYuxqF8vFj-eGMOff1UAIzOZ00",	
			uid:	"538699983348",	
			url_profile:	"https://ok.ru/profile/538699983348",	
		},{//31	Object (@445bf954e51)	
			first_name:	"Айгуль",	
			gender:	"female",	
			last_name:	"Джалдинова",	
			photo:	"https://i.mycdn.me/image?id=854622535778&t=2&plc=API&aid=177033216&tkn=*h9VbfmcfyejBCF0Wz6E6YImBxzo",	
			pic_2:	"https://i.mycdn.me/image?id=854622535778&t=2&plc=API&aid=177033216&tkn=*h9VbfmcfyejBCF0Wz6E6YImBxzo",	
			uid:	"559493454434",	
			url_profile:	"https://ok.ru/profile/559493454434",	
		},{//32	Object (@445bfdd87c1)	
			first_name:	"Людмила",	
			gender:	"female",	
			last_name:	"Мамонова",	
			photo:	"https://i.mycdn.me/image?id=872381630572&t=2&plc=API&ts=00&aid=177033216&tkn=*Ba9Q7LdJPbMpb0W7i2eVUg-w2iA",	
			pic_2:	"https://i.mycdn.me/image?id=872381630572&t=2&plc=API&ts=00&aid=177033216&tkn=*Ba9Q7LdJPbMpb0W7i2eVUg-w2iA",	
			uid:	"355835260012",	
			url_profile:	"https://ok.ru/profile/355835260012",	
		},{//33	Object (@445bfdd9131)	
			first_name:	"Вера",	
			gender:	"female",	
			last_name:	"Андреева (Филинкова)",	
			photo:	"https://i.mycdn.me/image?id=856417888613&t=2&plc=API&ts=00&aid=177033216&tkn=*2i7VqZkK7TockTIBkYeJPudL2-E",	
			pic_2:	"https://i.mycdn.me/image?id=856417888613&t=2&plc=API&ts=00&aid=177033216&tkn=*2i7VqZkK7TockTIBkYeJPudL2-E",	
			uid:	"563551399269",	
			url_profile:	"https://ok.ru/profile/563551399269",	
		},{//34	Object (@445bfdd9a31)	
			first_name:	"Марина",	
			gender:	"female",	
			last_name:	"Ревякина",	
			photo:	"https://i.mycdn.me/image?id=592898217068&t=2&plc=API&ts=00&aid=177033216&tkn=*z_fURrzlH2gmoKsvzuDSsX0JX7Q",	
			pic_2:	"https://i.mycdn.me/image?id=592898217068&t=2&plc=API&ts=00&aid=177033216&tkn=*z_fURrzlH2gmoKsvzuDSsX0JX7Q",	
			uid:	"532808276588",	
			url_profile:	"https://ok.ru/profile/532808276588",	
		},{//35	Object (@445bfbf63d1)	
			first_name:	"Татьяна",	
			gender:	"female",	
			last_name:	"Гвоздева",	
			photo:	"https://i.mycdn.me/image?id=483916400230&t=2&plc=API&ts=00&aid=177033216&tkn=*kcBcod5ByXPMvKeUlc1zGj2PstQ",	
			pic_2:	"https://i.mycdn.me/image?id=483916400230&t=2&plc=API&ts=00&aid=177033216&tkn=*kcBcod5ByXPMvKeUlc1zGj2PstQ",	
			uid:	"449364688742",	
			url_profile:	"https://ok.ru/profile/449364688742",	
		},{//36	Object (@445bfbf6bb1)	
			first_name:	"Игорь",	
			gender:	"male",	
			last_name:	"Артени",	
			photo:	"https://i.mycdn.me/image?id=513301122497&t=2&plc=API&ts=00&aid=177033216&tkn=*db8jbJDF3nvtmvpSYoTpYL8djd0",	
			pic_2:	"https://i.mycdn.me/image?id=513301122497&t=2&plc=API&ts=00&aid=177033216&tkn=*db8jbJDF3nvtmvpSYoTpYL8djd0",	
			uid:	"560070340545",	
			url_profile:	"https://ok.ru/profile/560070340545",	
		},{//37	Object (@445bff95371)	
			first_name:	"arsenti",	
			gender:	"male",	
			last_name:	"kowgar",	
			photo:	"https://i.mycdn.me/image?id=552108702405&t=2&plc=API&aid=177033216&tkn=*DdHkFCk7B9k4gF7XJCmQJuJciQE",	
			pic_2:	"https://i.mycdn.me/image?id=552108702405&t=2&plc=API&aid=177033216&tkn=*DdHkFCk7B9k4gF7XJCmQJuJciQE",	
			uid:	"562628585157",	
			url_profile:	"https://ok.ru/profile/562628585157",	
		},{//38	Object (@445bff95c71)	
			first_name:	"Валентина",	
			gender:	"female",	
			last_name:	"Петрова",	
			photo:	"https://i.mycdn.me/image?id=869624882633&t=2&plc=API&ts=00&aid=177033216&tkn=*tqwm-6813nfXsTaGN1PSn0KKKjE",	
			pic_2:	"https://i.mycdn.me/image?id=869624882633&t=2&plc=API&ts=00&aid=177033216&tkn=*tqwm-6813nfXsTaGN1PSn0KKKjE",	
			uid:	"562625539529",	
			url_profile:	"https://ok.ru/profile/562625539529",	
		},{//39	Object (@445bfc6fe81)	
			first_name:	"Hasmik",	
			gender:	"female",	
			last_name:	"Galstyan",	
			photo:	"https://i.mycdn.me/image?id=879839859140&t=2&plc=API&ts=00&aid=177033216&tkn=*TOM3IW4yIUiZhN69OumSXHv_HqU",	
			pic_2:	"https://i.mycdn.me/image?id=879839859140&t=2&plc=API&ts=00&aid=177033216&tkn=*TOM3IW4yIUiZhN69OumSXHv_HqU",	
			uid:	"507128885188",	
			url_profile:	"https://ok.ru/profile/507128885188",	
		},{//40	Object (@445bfc70941)	
			first_name:	"Narine",	
			gender:	"female",	
			last_name:	"Mkrtchyan",	
			photo:	"https://i.mycdn.me/image?id=891036569292&t=2&plc=API&ts=00&aid=177033216&tkn=*rZHzoQlmhX-pB20IoFeDIThTz-o",	
			pic_2:	"https://i.mycdn.me/image?id=891036569292&t=2&plc=API&ts=00&aid=177033216&tkn=*rZHzoQlmhX-pB20IoFeDIThTz-o",	
			uid:	"228798747596",	
			url_profile:	"https://ok.ru/profile/228798747596",	
		},{//41	Object (@445bf953431)	
			first_name:	"Ольга",	
			gender:	"female",	
			last_name:	"Григораш",	
			photo:	"https://i.mycdn.me/image?id=881519201732&t=2&plc=API&ts=00&aid=177033216&tkn=*N79VTn0HS8zEboaN2-z0B1XuGNg",	
			pic_2:	"https://i.mycdn.me/image?id=881519201732&t=2&plc=API&ts=00&aid=177033216&tkn=*N79VTn0HS8zEboaN2-z0B1XuGNg",	
			uid:	"113968724420",	
			url_profile:	"https://ok.ru/profile/113968724420",	
		},{//42	Object (@445bf953d91)	
			first_name:	"Лариса",	
			gender:	"female",	
			last_name:	"Власова",	
			photo:	"https://i.mycdn.me/image?id=854822791855&t=2&plc=API&aid=177033216&tkn=*C-S2MoEYzbd3kRxsibH3G-V7vhQ",	
			pic_2:	"https://i.mycdn.me/image?id=854822791855&t=2&plc=API&aid=177033216&tkn=*C-S2MoEYzbd3kRxsibH3G-V7vhQ",	
			uid:	"348736365999",	
			url_profile:	"https://ok.ru/profile/348736365999",	
		},{//43	Object (@445bf954671)	
			first_name:	"Александр",	
			gender:	"male",	
			last_name:	"Носов",	
			photo:	"https://i.mycdn.me/image?id=395671009188&t=2&plc=API&ts=00&aid=177033216&tkn=*Su1HKwEsCqZBB9k3C66w2tF2R4I",	
			pic_2:	"https://i.mycdn.me/image?id=395671009188&t=2&plc=API&ts=00&aid=177033216&tkn=*Su1HKwEsCqZBB9k3C66w2tF2R4I",	
			uid:	"502396207012",	
			url_profile:	"https://ok.ru/profile/502396207012",	
		},{//44	Object (@445bf954fa1)	
			first_name:	"Іра",	
			gender:	"female",	
			last_name:	"Мошкова (Гірак)",	
			photo:	"https://i.mycdn.me/image?id=770953629615&t=2&plc=API&aid=177033216&tkn=*S1HEkLoWi8brgnDiMpXRdDVW32o",	
			pic_2:	"https://i.mycdn.me/image?id=770953629615&t=2&plc=API&aid=177033216&tkn=*S1HEkLoWi8brgnDiMpXRdDVW32o",	
			uid:	"564076908463",	
			url_profile:	"https://ok.ru/profile/564076908463",	
		},{//45	Object (@445bfdd8911)	
			first_name:	"Іванна",	
			gender:	"female",	
			last_name:	"Хохла",	
			photo:	"https://i.mycdn.me/image?id=512386913699&t=2&plc=API&aid=177033216&tkn=*dq-bpqiv26LxvpuJJs8-Q9YOh38",	
			pic_2:	"https://i.mycdn.me/image?id=512386913699&t=2&plc=API&aid=177033216&tkn=*dq-bpqiv26LxvpuJJs8-Q9YOh38",	
			uid:	"560437229219",	
			url_profile:	"https://ok.ru/profile/560437229219",	
		},{//46	Object (@445bfdd91f1)	
			first_name:	"Маргарита",	
			gender:	"female",	
			last_name:	"Ортнер",	
			photo:	"https://i.mycdn.me/image?id=816673987494&t=2&plc=API&aid=177033216&tkn=*EBCpLKrzz1dy2mH0mb_BLehdt-I",	
			pic_2:	"https://i.mycdn.me/image?id=816673987494&t=2&plc=API&aid=177033216&tkn=*EBCpLKrzz1dy2mH0mb_BLehdt-I",	
			uid:	"114947304102",	
			url_profile:	"https://ok.ru/profile/114947304102",	
		},{//47	Object (@445bfdd9c41)	
			first_name:	"Валерий",	
			gender:	"male",	
			last_name:	"Побережский",	
			photo:	"https://i.mycdn.me/image?id=849674799525&t=2&plc=API&ts=00&aid=177033216&tkn=*l_80XOFG-Lxb18tADMiHkHU6iLI",	
			pic_2:	"https://i.mycdn.me/image?id=849674799525&t=2&plc=API&ts=00&aid=177033216&tkn=*l_80XOFG-Lxb18tADMiHkHU6iLI",	
			uid:	"481857325733",	
			url_profile:	"https://ok.ru/profile/481857325733",	
		},{//48	Object (@445bfbf65b1)	
			first_name:	"Галина",	
			gender:	"female",	
			last_name:	"Панова",	
			photo:	"https://i.mycdn.me/image?id=771961535149&t=2&plc=API&ts=00&aid=177033216&tkn=*0pRpggPP4PfARIXEw4FF8gDEd5c",	
			pic_2:	"https://i.mycdn.me/image?id=771961535149&t=2&plc=API&ts=00&aid=177033216&tkn=*0pRpggPP4PfARIXEw4FF8gDEd5c",	
			uid:	"338234525101",	
			url_profile:	"https://ok.ru/profile/338234525101",	
		},{//49	Object (@445bfbf6df1)	
			first_name:	"Елена",	
			gender:	"female",	
			last_name:	"Николаева",	
			photo:	"https://i.mycdn.me/image?id=864582201258&t=2&plc=API&ts=00&aid=177033216&tkn=*PgX5aUZWiAY31jN0SQlrGUwZl7o",	
			pic_2:	"https://i.mycdn.me/image?id=864582201258&t=2&plc=API&ts=00&aid=177033216&tkn=*PgX5aUZWiAY31jN0SQlrGUwZl7o",	
			uid:	"206492346026",	
			url_profile:	"https://ok.ru/profile/206492346026",	
		},{//50	Object (@445bff95641)	
			first_name:	"ольга",	
			gender:	"female",	
			last_name:	"воробина",	
			photo:	"https://i.mycdn.me/image?id=443447300781&t=2&plc=API&aid=177033216&tkn=*Pyfc1Arc7hgNH_QJFhvee8B0Puc",	
			pic_2:	"https://i.mycdn.me/image?id=443447300781&t=2&plc=API&aid=177033216&tkn=*Pyfc1Arc7hgNH_QJFhvee8B0Puc",	
			uid:	"547837904301",	
			url_profile:	"https://ok.ru/profile/547837904301",	
		},{//51	Object (@445bff95fd1)	
			first_name:	"Тамара",	
			gender:	"female",	
			last_name:	"Нидзельская-Шароварченко",	
			photo:	"https://i.mycdn.me/image?id=888000969760&t=2&plc=API&ts=00&aid=177033216&tkn=*Kbt3fMF0r_MeS8OgJ-0SUg_cVpQ",	
			pic_2:	"https://i.mycdn.me/image?id=888000969760&t=2&plc=API&ts=00&aid=177033216&tkn=*Kbt3fMF0r_MeS8OgJ-0SUg_cVpQ",	
			uid:	"530813507360",	
			url_profile:	"https://ok.ru/profile/530813507360",	
		},{//52	Object (@445bfc6fd31)	
			first_name:	"Леся",	
			gender:	"female",	
			last_name:	"Сердюк",	
			photo:	"https://i.mycdn.me/image?id=192372235816&t=2&plc=API&aid=177033216&tkn=*NGqazL-GpoLKC31qdbvEJt1qnaI",	
			pic_2:	"https://i.mycdn.me/image?id=192372235816&t=2&plc=API&aid=177033216&tkn=*NGqazL-GpoLKC31qdbvEJt1qnaI",	
			uid:	"331277425448",	
			url_profile:	"https://ok.ru/profile/331277425448",	
		},{//53	Object (@445bfc70ac1)	
			first_name:	"Олег",	
			gender:	"male",	
			last_name:	"Юлов",	
			photo:	"https://i.mycdn.me/image?id=245011032110&t=2&plc=API&aid=177033216&tkn=*zJmBOiceI8mMYZLpwicKvsMuZps",	
			pic_2:	"https://i.mycdn.me/image?id=245011032110&t=2&plc=API&aid=177033216&tkn=*zJmBOiceI8mMYZLpwicKvsMuZps",	
			uid:	"456476048430",	
			url_profile:	"https://ok.ru/profile/456476048430",	
		},{//54	Object (@445bf9535b1)	
			first_name:	"Татьяна",	
			gender:	"female",	
			last_name:	"Мазур (Дятел)",	
			photo:	"https://i.mycdn.me/image?id=666360870952&t=2&plc=API&ts=00&aid=177033216&tkn=*PysYENpkDjmho1dODy2WNXdOoCg",	
			pic_2:	"https://i.mycdn.me/image?id=666360870952&t=2&plc=API&ts=00&aid=177033216&tkn=*PysYENpkDjmho1dODy2WNXdOoCg",	
			uid:	"561124801320",	
			url_profile:	"https://ok.ru/profile/561124801320",	
		},{//55	Object (@445bf953e21)	
			first_name:	"И",	
			gender:	"male",	
			last_name:	"Радионов",	
			photo:	"https://i.mycdn.me/image?id=852461618557&t=2&plc=API&ts=00&aid=177033216&tkn=*qKrP_dLx5con8k00yWtRr45dSvU",	
			pic_2:	"https://i.mycdn.me/image?id=852461618557&t=2&plc=API&ts=00&aid=177033216&tkn=*qKrP_dLx5con8k00yWtRr45dSvU",	
			uid:	"134432838525",	
			url_profile:	"https://ok.ru/profile/134432838525",	
		},{//56	Object (@445bf9547c1)	
			first_name:	"Светлана",	
			gender:	"female",	
			last_name:	"Тимакова (Замышляева)",	
			photo:	"https://i.mycdn.me/image?id=470270029172&t=2&plc=API&ts=00&aid=177033216&tkn=*YssfhfcmWXOfbQ2QQPHVLeMU8Mo",	
			pic_2:	"https://i.mycdn.me/image?id=470270029172&t=2&plc=API&ts=00&aid=177033216&tkn=*YssfhfcmWXOfbQ2QQPHVLeMU8Mo",	
			uid:	"515559261812",	
			url_profile:	"https://ok.ru/profile/515559261812",	
		},{//57	Object (@445bfdd81f1)	
			first_name:	"Алла",	
			gender:	"female",	
			last_name:	"Тульская",	
			photo:	"https://i.mycdn.me/image?id=836841031802&t=2&plc=API&ts=00&aid=177033216&tkn=*MR84uwzNgPktF8pxJ4j-B7aT6jY",	
			pic_2:	"https://i.mycdn.me/image?id=836841031802&t=2&plc=API&ts=00&aid=177033216&tkn=*MR84uwzNgPktF8pxJ4j-B7aT6jY",	
			uid:	"500061283450",	
			url_profile:	"https://ok.ru/profile/500061283450",	
		},{//58	Object (@445bfdd8a61)	
			first_name:	"Людмила",	
			gender:	"female",	
			last_name:	"Брейкина  Старосветская",	
			photo:	"https://i.mycdn.me/image?id=486863546745&t=2&plc=API&aid=177033216&tkn=*Sgq1FA-H1f8ewwrXiyj8gfvW75E",	
			pic_2:	"https://i.mycdn.me/image?id=486863546745&t=2&plc=API&aid=177033216&tkn=*Sgq1FA-H1f8ewwrXiyj8gfvW75E",	
			uid:	"552491550841",	
			url_profile:	"https://ok.ru/profile/552491550841",	
		},{//59	Object (@445bfdd9461)	
			first_name:	"Роман",	
			gender:	"male",	
			last_name:	"Стегней",	
			photo:	"https://i.mycdn.me/image?id=815751293555&t=2&plc=API&ts=00&aid=177033216&tkn=*weSIibSCBjZzEB8SQYA9ImWtGU4",	
			pic_2:	"https://i.mycdn.me/image?id=815751293555&t=2&plc=API&ts=00&aid=177033216&tkn=*weSIibSCBjZzEB8SQYA9ImWtGU4",	
			uid:	"524046004083",	
			url_profile:	"https://ok.ru/profile/524046004083",	
		},{//60	Object (@445bfdd9f11)	
			first_name:	"Людмила",	
			gender:	"female",	
			last_name:	"Надеева (Лесик)",	
			photo:	"https://i.mycdn.me/image?id=861975711350&t=2&plc=API&ts=000201001f00&aid=177033216&tkn=*TNTLVsJpcXTEM19dpFuho0iHINo",	
			pic_2:	"https://i.mycdn.me/image?id=861975711350&t=2&plc=API&ts=000201001f00&aid=177033216&tkn=*TNTLVsJpcXTEM19dpFuho0iHINo",	
			uid:	"359770171766",	
			url_profile:	"https://ok.ru/profile/359770171766",	
		},{//61	Object (@445bfbf6761)	
			first_name:	"Сергей",	
			gender:	"male",	
			last_name:	"Яньшин",	
			photo:	"https://i.mycdn.me/image?id=872329856894&t=2&plc=API&ts=000201004800&aid=177033216&tkn=*VP92XycdrjArCLTDvJeXbw8vUdI",	
			pic_2:	"https://i.mycdn.me/image?id=872329856894&t=2&plc=API&ts=000201004800&aid=177033216&tkn=*VP92XycdrjArCLTDvJeXbw8vUdI",	
			uid:	"351559394942",	
			url_profile:	"https://ok.ru/profile/351559394942",	
		},{//62	Object (@445bfbf6fd1)	
			first_name:	"Елена",	
			gender:	"female",	
			last_name:	"Мусияченко (Афанасенко)",	
			photo:	"https://i.mycdn.me/image?id=858657310429&t=2&plc=API&ts=00&aid=177033216&tkn=*QhgAUl8LOOqLvQ4tIXQdkZztLls",	
			pic_2:	"https://i.mycdn.me/image?id=858657310429&t=2&plc=API&ts=00&aid=177033216&tkn=*QhgAUl8LOOqLvQ4tIXQdkZztLls",	
			uid:	"144081197021",	
			url_profile:	"https://ok.ru/profile/144081197021",	
		},{//63	Object (@445bff95a01)	
			first_name:	"Петр",	
			gender:	"male",	
			last_name:	"Нидзельский",	
			photo:	"https://i.mycdn.me/image?id=816063429337&t=2&plc=API&ts=00&aid=177033216&tkn=*8WbRWryljcwt5k0CrUkEG3O1DqU",	
			pic_2:	"https://i.mycdn.me/image?id=816063429337&t=2&plc=API&ts=00&aid=177033216&tkn=*8WbRWryljcwt5k0CrUkEG3O1DqU",	
			uid:	"568218754009",	
			url_profile:	"https://ok.ru/profile/568218754009",	
		},{//64	Object (@445bff96431)	
			first_name:	"Роза",	
			gender:	"female",	
			last_name:	"Абрамовская(Бывалина)",	
			photo:	"https://i.mycdn.me/image?id=862198416084&t=2&plc=API&ts=00&aid=177033216&tkn=*gjwWIHHHVALOcwNTaV3B5oz0QXk",	
			pic_2:	"https://i.mycdn.me/image?id=862198416084&t=2&plc=API&ts=00&aid=177033216&tkn=*gjwWIHHHVALOcwNTaV3B5oz0QXk",	
			uid:	"348845327060",	
			url_profile:	"https://ok.ru/profile/348845327060",	
		},{//65	Object (@445bfc6ffd1)	
			first_name:	"Игорь",	
			gender:	"male",	
			last_name:	"Розов",	
			photo:	"https://i.mycdn.me/image?id=577206782676&t=2&plc=API&ts=00&aid=177033216&tkn=*EnvWN6ViVR6AHWCnMLYYCO7ELPs",	
			pic_2:	"https://i.mycdn.me/image?id=577206782676&t=2&plc=API&ts=00&aid=177033216&tkn=*EnvWN6ViVR6AHWCnMLYYCO7ELPs",	
			uid:	"512332792532",	
			url_profile:	"https://ok.ru/profile/512332792532",	
		},{//66	Object (@445bfc70b51)	
			first_name:	"Раиса",	
			gender:	"female",	
			last_name:	"Байкова (Павлова)",	
			photo:	"https://i.mycdn.me/image?id=873594929115&t=2&plc=API&ts=00&aid=177033216&tkn=*DBQx8yqn2RsD0vv198reKfMm3sc",	
			pic_2:	"https://i.mycdn.me/image?id=873594929115&t=2&plc=API&ts=00&aid=177033216&tkn=*DBQx8yqn2RsD0vv198reKfMm3sc",	
			uid:	"117077382875",	
			url_profile:	"https://ok.ru/profile/117077382875",	
		},{//67	Object (@445bf953581)	
			first_name:	"Нина",	
			gender:	"female",	
			last_name:	"Краснова",	
			photo:	"https://i.mycdn.me/image?id=857908611801&t=2&plc=API&ts=00&aid=177033216&tkn=*guShYcEBhbh_jV8bKUnAOcHYUnU",	
			pic_2:	"https://i.mycdn.me/image?id=857908611801&t=2&plc=API&ts=00&aid=177033216&tkn=*guShYcEBhbh_jV8bKUnAOcHYUnU",	
			uid:	"558186735321",	
			url_profile:	"https://ok.ru/profile/558186735321",	
		},{//68	Object (@445bf953f71)	
			first_name:	"Алексей",	
			gender:	"male",	
			last_name:	"Никоненко",	
			photo:	"https://i.mycdn.me/image?id=855856157649&t=2&plc=API&aid=177033216&tkn=*QFoha-WnKVu8F0F_SL92NbdJhSs",	
			pic_2:	"https://i.mycdn.me/image?id=855856157649&t=2&plc=API&aid=177033216&tkn=*QFoha-WnKVu8F0F_SL92NbdJhSs",	
			uid:	"36928128721",	
			url_profile:	"https://ok.ru/profile/36928128721",	
		},{//69	Object (@445bf9549d1)	
			first_name:	"Светлана",	
			gender:	"female",	
			last_name:	"Верминская(Якорева)",	
			photo:	"https://i.mycdn.me/image?id=545861729823&t=2&plc=API&ts=00&aid=177033216&tkn=*xeGugm8NI1ZtaOHIGIDBunofSBU",	
			pic_2:	"https://i.mycdn.me/image?id=545861729823&t=2&plc=API&ts=00&aid=177033216&tkn=*xeGugm8NI1ZtaOHIGIDBunofSBU",	
			uid:	"574902433055",	
			url_profile:	"https://ok.ru/profile/574902433055",	
		},{//70	Object (@445bfdd83d1)	
			first_name:	"Наталья",	
			gender:	"female",	
			last_name:	"Орлова(Казачухина)",	
			photo:	"https://i.mycdn.me/image?id=861795898899&t=2&plc=API&ts=000201001f00&aid=177033216&tkn=*vn99sT5iAT-2YRynlZXf4edNg0w",	
			pic_2:	"https://i.mycdn.me/image?id=861795898899&t=2&plc=API&ts=000201001f00&aid=177033216&tkn=*vn99sT5iAT-2YRynlZXf4edNg0w",	
			uid:	"535875654675",	
			url_profile:	"https://ok.ru/profile/535875654675",	
		},{//71	Object (@445bfdd8d31)	
			first_name:	"Светлана",	
			gender:	"female",	
			last_name:	"Пономаренко(Влах)",	
			photo:	"https://i.mycdn.me/image?id=855851448085&t=2&plc=API&ts=00&aid=177033216&tkn=*XQnukWoaaSsSUbBo0WPqJ6QM_vA",	
			pic_2:	"https://i.mycdn.me/image?id=855851448085&t=2&plc=API&ts=00&aid=177033216&tkn=*XQnukWoaaSsSUbBo0WPqJ6QM_vA",	
			uid:	"528239363349",	
			url_profile:	"https://ok.ru/profile/528239363349",	
		},{//72	Object (@445bfdd9671)	
			first_name:	"раиса",	
			gender:	"female",	
			last_name:	"решетняк",	
			photo:	"https://i.mycdn.me/image?id=857897219866&t=2&plc=API&ts=000201001a00&aid=177033216&tkn=*1w6mcfgC93myCaWq5v3U3Vj1Wok",	
			pic_2:	"https://i.mycdn.me/image?id=857897219866&t=2&plc=API&ts=000201001a00&aid=177033216&tkn=*1w6mcfgC93myCaWq5v3U3Vj1Wok",	
			uid:	"572571570970",	
			url_profile:	"https://ok.ru/profile/572571570970",	
		},{//73	Object (@445bfbf6251)	
			first_name:	"Ирина",	
			gender:	"female",	
			last_name:	"Буянова (Новикова)",	
			photo:	"https://i.mycdn.me/image?id=887942696468&t=2&plc=API&ts=00&aid=177033216&tkn=*id2Pv2hLqlktNWx3x_x-6alfq3c",	
			pic_2:	"https://i.mycdn.me/image?id=887942696468&t=2&plc=API&ts=00&aid=177033216&tkn=*id2Pv2hLqlktNWx3x_x-6alfq3c",	
			uid:	"574242526484",	
			url_profile:	"https://ok.ru/profile/574242526484",	
		},{//74	Object (@445bfbf6a91)	
			first_name:	"Надежда",	
			gender:	"female",	
			last_name:	"Морозова(Вахрушева)",	
			photo:	"https://i.mycdn.me/image?id=884948515983&t=2&plc=API&ts=00&aid=177033216&tkn=*Iv72bxznGiycBA_Ctz_wjld-aME",	
			pic_2:	"https://i.mycdn.me/image?id=884948515983&t=2&plc=API&ts=00&aid=177033216&tkn=*Iv72bxznGiycBA_Ctz_wjld-aME",	
			uid:	"491855362191",	
			url_profile:	"https://ok.ru/profile/491855362191",	
		},{//75	Object (@445bff95341)	
			first_name:	"Александр",	
			gender:	"male",	
			last_name:	"Зинченко",	
			photo:	"https://i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",	
			pic_2:	"https://i.mycdn.me/image?id=437654688644&t=2&plc=API&ts=00&aid=177033216&tkn=*KpzqNpQA5rCWU_X9GWn0EvNPwIg",	
			uid:	"434670006660",	
			url_profile:	"https://ok.ru/profile/434670006660",	
		},{//76	Object (@445bff95d61)	
			first_name:	"Галина",	
			gender:	"female",	
			last_name:	"Залогина",	
			photo:	"https://i.mycdn.me/image?id=870282543489&t=2&plc=API&ts=00&aid=177033216&tkn=*xiyhuxyWnD8VGYOYwtb3-Ii0_hY",	
			pic_2:	"https://i.mycdn.me/image?id=870282543489&t=2&plc=API&ts=00&aid=177033216&tkn=*xiyhuxyWnD8VGYOYwtb3-Ii0_hY",	
			uid:	"452993422977",	
			url_profile:	"https://ok.ru/profile/452993422977",	
		},{//77	Object (@445bff967c1)	
			first_name:	"♥ღ♥Наталья♥ღ♥",	
			gender:	"female",	
			last_name:	"Балицкая♥ღ♥",	
			photo:	"https://i.mycdn.me/image?id=883786291083&t=2&plc=API&ts=00&aid=177033216&tkn=*LGcgwCfg7bcPIvRWu0n7IraTqEA",	
			pic_2:	"https://i.mycdn.me/image?id=883786291083&t=2&plc=API&ts=00&aid=177033216&tkn=*LGcgwCfg7bcPIvRWu0n7IraTqEA",	
			uid:	"121658211723",	
			url_profile:	"https://ok.ru/profile/121658211723",	
		},{//78	Object (@445bfc700a1)	
			first_name:	"леонид",	
			gender:	"male",	
			last_name:	"диноченко",	
			photo:	"https://i.mycdn.me/image?id=804085467783&t=2&plc=API&ts=00&aid=177033216&tkn=*-WqjFU893ufV5tlREi08NUY8H8A",	
			pic_2:	"https://i.mycdn.me/image?id=804085467783&t=2&plc=API&ts=00&aid=177033216&tkn=*-WqjFU893ufV5tlREi08NUY8H8A",	
			uid:	"564520002951",	
			url_profile:	"https://ok.ru/profile/564520002951",	
		},{//79	Object (@445bfc70c71)	
			first_name:	"besarion",	
			gender:	"female",	
			last_name:	"Sasha",	
			photo:	"https://i.mycdn.me/image?id=835863482240&t=2&plc=API&ts=00&aid=177033216&tkn=*R3segosASNrY2Dr18qdTeMVK_Cw",	
			pic_2:	"https://i.mycdn.me/image?id=835863482240&t=2&plc=API&ts=00&aid=177033216&tkn=*R3segosASNrY2Dr18qdTeMVK_Cw",	
			uid:	"518098714752",	
			url_profile:	"https://ok.ru/profile/518098714752",	
		},{//80	Object (@445bf953641)	
			first_name:	"Татьяна",	
			gender:	"female",	
			last_name:	"Песоцкая (Дыхова)",	
			photo:	"https://i.mycdn.me/image?id=173027313980&t=2&plc=API&aid=177033216&tkn=*j3vt1Ot_ojJajf8yoyqrgwHIE6w",	
			pic_2:	"https://i.mycdn.me/image?id=173027313980&t=2&plc=API&aid=177033216&tkn=*j3vt1Ot_ojJajf8yoyqrgwHIE6w",	
			uid:	"41970065468",	
			url_profile:	"https://ok.ru/profile/41970065468",	
		},{//81	Object (@445bf953fa1)	
			first_name:	"Ольга",	
			gender:	"female",	
			last_name:	"Мухина(Пестова)",	
			photo:	"https://i.mycdn.me/image?id=561513572667&t=2&plc=API&ts=00&aid=177033216&tkn=*7st-wn98EC07Fv9Yi2LcKo_QLUk",	
			pic_2:	"https://i.mycdn.me/image?id=561513572667&t=2&plc=API&ts=00&aid=177033216&tkn=*7st-wn98EC07Fv9Yi2LcKo_QLUk",	
			uid:	"355379406651",	
			url_profile:	"https://ok.ru/profile/355379406651",	
		},{//82	Object (@445bf954b51)	
			first_name:	"Василий",	
			gender:	"male",	
			last_name:	"Каширский",	
			photo:	"https://i.mycdn.me/image?id=861554471485&t=2&plc=API&ts=00&aid=177033216&tkn=*dp-UWaIYxdYqfecoDqqAGEPdD6M",	
			pic_2:	"https://i.mycdn.me/image?id=861554471485&t=2&plc=API&ts=00&aid=177033216&tkn=*dp-UWaIYxdYqfecoDqqAGEPdD6M",	
			uid:	"453081661",	
			url_profile:	"https://ok.ru/profile/453081661",	
		},{//83	Object (@445bfdd84c1)	
			first_name:	"Девятнадцатый",	
			gender:	"male",	
			last_name:	"Год",	
			photo:	"https://i.mycdn.me/image?id=877724689976&t=2&plc=API&ts=00&aid=177033216&tkn=*3TOkEtSMCuVmNHMBPYTWWBTPeLM",	
			pic_2:	"https://i.mycdn.me/image?id=877724689976&t=2&plc=API&ts=00&aid=177033216&tkn=*3TOkEtSMCuVmNHMBPYTWWBTPeLM",	
			uid:	"571901269048",	
			url_profile:	"https://ok.ru/profile/571901269048",	
		},{//84	Object (@445bfdd8e81)	
			first_name:	"waldemar",	
			gender:	"male",	
			last_name:	"michel",	
			photo:	"https://i.mycdn.me/image?id=498271750454&t=2&plc=API&aid=177033216&tkn=*FTNLLyec-BZLgF_B61ZLcdtV14s",	
			pic_2:	"https://i.mycdn.me/image?id=498271750454&t=2&plc=API&aid=177033216&tkn=*FTNLLyec-BZLgF_B61ZLcdtV14s",	
			uid:	"568956653110",	
			url_profile:	"https://ok.ru/profile/568956653110",	
		},{//85	Object (@445bfdd9971)	
			first_name:	"Вера",	
			gender:	"female",	
			last_name:	"Субботкина",	
			photo:	"https://i.mycdn.me/image?id=884194246633&t=2&plc=API&ts=00&aid=177033216&tkn=*7k_ypoYtMZ7EeGuumRPQBFOKey8",	
			pic_2:	"https://i.mycdn.me/image?id=884194246633&t=2&plc=API&ts=00&aid=177033216&tkn=*7k_ypoYtMZ7EeGuumRPQBFOKey8",	
			uid:	"348306122473",	
			url_profile:	"https://ok.ru/profile/348306122473",	
		},{//86	Object (@445bfbf6431)	
			first_name:	"Abbas",	
			gender:	"male",	
			last_name:	"Abbasov",	
			photo:	"https://i.mycdn.me/image?id=549208700647&t=2&plc=API&aid=177033216&tkn=*FvvNs_fIC4Sx-whfEfAQmmNkPtI",	
			pic_2:	"https://i.mycdn.me/image?id=549208700647&t=2&plc=API&aid=177033216&tkn=*FvvNs_fIC4Sx-whfEfAQmmNkPtI",	
			uid:	"562054855143",	
			url_profile:	"https://ok.ru/profile/562054855143",	
		},{//87	Object (@445bfbf6ca1)	
			first_name:	"Сергей",	
			gender:	"male",	
			last_name:	"Четвериков",	
			photo:	"https://i.mycdn.me/image?id=427280302313&t=2&plc=API&aid=177033216&tkn=*nIeG-zS169HfhyAtk9ZdGMm5t3Y",	
			pic_2:	"https://i.mycdn.me/image?id=427280302313&t=2&plc=API&aid=177033216&tkn=*nIeG-zS169HfhyAtk9ZdGMm5t3Y",	
			uid:	"509480867817",	
			url_profile:	"https://ok.ru/profile/509480867817",	
		},{//88	Object (@445bff955b1)	
			first_name:	"Александр",	
			gender:	"male",	
			last_name:	"Митрофанов",	
			photo:	"https://i.mycdn.me/image?id=879798706400&t=2&plc=API&ts=00&aid=177033216&tkn=*WgAt5JF_9kgZua8Xb9SZCUyeOq4",	
			pic_2:	"https://i.mycdn.me/image?id=879798706400&t=2&plc=API&ts=00&aid=177033216&tkn=*WgAt5JF_9kgZua8Xb9SZCUyeOq4",	
			uid:	"160369648096",	
			url_profile:	"https://ok.ru/profile/160369648096",	
		},{//89	Object (@445bff960d1)	
			first_name:	"Irina",	
			gender:	"female",	
			last_name:	"Lang (Lorenz)",	
			photo:	"https://i.mycdn.me/image?id=884904681444&t=2&plc=API&ts=00&aid=177033216&tkn=*lZtQse4-eLbNmYbNZcjfU5_Gs8Y",	
			pic_2:	"https://i.mycdn.me/image?id=884904681444&t=2&plc=API&ts=00&aid=177033216&tkn=*lZtQse4-eLbNmYbNZcjfU5_Gs8Y",	
			uid:	"542066442468",	
			url_profile:	"https://ok.ru/profile/542066442468",	
		},{//90	Object (@445bff96af1)	
			first_name:	"Ирина",	
			gender:	"female",	
			last_name:	"Орлова",	
			photo:	"https://i.mycdn.me/image?id=876330204901&t=2&plc=API&ts=00&aid=177033216&tkn=*JNd9KKv0ZiNON7cb9iEBxVGelDA",	
			pic_2:	"https://i.mycdn.me/image?id=876330204901&t=2&plc=API&ts=00&aid=177033216&tkn=*JNd9KKv0ZiNON7cb9iEBxVGelDA",	
			uid:	"559433115365",	
			url_profile:	"https://ok.ru/profile/559433115365",	
		},{//91	Object (@445bfc6ff41)	
			first_name:	"Валера",	
			gender:	"male",	
			last_name:	"Куцка",	
			photo:	"https://i.mycdn.me/image?id=885598961380&t=2&plc=API&ts=00&aid=177033216&tkn=*xbU1diaSmmtU3h2OnpHWs-rmz2Q",	
			pic_2:	"https://i.mycdn.me/image?id=885598961380&t=2&plc=API&ts=00&aid=177033216&tkn=*xbU1diaSmmtU3h2OnpHWs-rmz2Q",	
			uid:	"543796964580",	
			url_profile:	"https://ok.ru/profile/543796964580",	
		},{//92	Object (@445bfc70be1)	
			first_name:	"Людмила",	
			gender:	"female",	
			last_name:	"Писаник (Емельянова)",	
			photo:	"https://i.mycdn.me/image?id=817038713835&t=2&plc=API&aid=177033216&tkn=*DOx2D6_2zhKt-ywpFnu78alTkvI",	
			pic_2:	"https://i.mycdn.me/image?id=817038713835&t=2&plc=API&aid=177033216&tkn=*DOx2D6_2zhKt-ywpFnu78alTkvI",	
			uid:	"561076271595",	
			url_profile:	"https://ok.ru/profile/561076271595",	
		},{//93	Object (@445bf953761)	
			first_name:	"елена",	
			gender:	"female",	
			last_name:	"урванцева ( Ксенофонтова )",	
			photo:	"https://i.mycdn.me/image?id=862712364776&t=2&plc=API&ts=000201002500&aid=177033216&tkn=*G0fspTdy2f5JQ89-E9CoLkZQyw0",	
			pic_2:	"https://i.mycdn.me/image?id=862712364776&t=2&plc=API&ts=000201002500&aid=177033216&tkn=*G0fspTdy2f5JQ89-E9CoLkZQyw0",	
			uid:	"93850866664",	
			url_profile:	"https://ok.ru/profile/93850866664",	
		},{//94	Object (@445bf954161)	
			first_name:	"Людмила",	
			gender:	"female",	
			last_name:	"Сивкова",	
			photo:	"https://i.mycdn.me/image?id=812441654336&t=2&plc=API&ts=00010003&aid=177033216&tkn=*c1JlzgqaOrVQhWwEvL7b7d2MifM",	
			pic_2:	"https://i.mycdn.me/image?id=812441654336&t=2&plc=API&ts=00010003&aid=177033216&tkn=*c1JlzgqaOrVQhWwEvL7b7d2MifM",	
			uid:	"568324648512",	
			url_profile:	"https://ok.ru/profile/568324648512",	
		},{//95	Object (@445bf954b81)	
			first_name:	"Nazeli",	
			gender:	"female",	
			last_name:	"Hovhannisyan",	
			photo:	"https://i.mycdn.me/image?id=867035813199&t=2&plc=API&ts=00&aid=177033216&tkn=*ouE3XhoIsFboxuhTzod16NLpxus",	
			pic_2:	"https://i.mycdn.me/image?id=867035813199&t=2&plc=API&ts=00&aid=177033216&tkn=*ouE3XhoIsFboxuhTzod16NLpxus",	
			uid:	"506917574223",	
			url_profile:	"https://ok.ru/profile/506917574223",	
		},{//96	Object (@445bfdd8521)	
			first_name:	"Родика",	
			gender:	"female",	
			last_name:	"Робу",	
			photo:	"https://i.mycdn.me/image?id=836068173386&t=2&plc=API&ts=00&aid=177033216&tkn=*yifDKOYMQ8JapFxF9EXhF3N1WCc",	
			pic_2:	"https://i.mycdn.me/image?id=836068173386&t=2&plc=API&ts=00&aid=177033216&tkn=*yifDKOYMQ8JapFxF9EXhF3N1WCc",	
			uid:	"336147341386",	
			url_profile:	"https://ok.ru/profile/336147341386",	
		},{//97	Object (@445bfdd8f71)	
			first_name:	"Олег",	
			gender:	"male",	
			last_name:	"Пахмелкин",	
			photo:	"https://i.mycdn.me/image?id=877122386242&t=2&plc=API&ts=00&aid=177033216&tkn=*dPHRN1d4NtYNZELrwOIpf7T0QUw",	
			pic_2:	"https://i.mycdn.me/image?id=877122386242&t=2&plc=API&ts=00&aid=177033216&tkn=*dPHRN1d4NtYNZELrwOIpf7T0QUw",	
			uid:	"342544813122",	
			url_profile:	"https://ok.ru/profile/342544813122",	
		},{//98	Object (@445bfdd9ac1)	
			first_name:	"Nina",	
			gender:	"female",	
			last_name:	"Bulygina",	
			photo:	"https://i.mycdn.me/image?id=859446467910&t=2&plc=API&ts=000201001f00&aid=177033216&tkn=*RGI_YI5VJAfHigSaTPqsyY3YcBk",	
			pic_2:	"https://i.mycdn.me/image?id=859446467910&t=2&plc=API&ts=000201001f00&aid=177033216&tkn=*RGI_YI5VJAfHigSaTPqsyY3YcBk",	
			uid:	"547238655558",	
			url_profile:	"https://ok.ru/profile/547238655558",	
		},{//99	Object (@445bfbf65e1)	
			first_name:	"Наталья",	
			gender:	"female",	
			last_name:	"Коваленко",	
			photo:	"https://i.mycdn.me/image?id=837636106304&t=2&plc=API&ts=00&aid=177033216&tkn=*mjfoma3X0eK6sbcGTRigL5iDn3o",	
			pic_2:	"https://i.mycdn.me/image?id=837636106304&t=2&plc=API&ts=00&aid=177033216&tkn=*mjfoma3X0eK6sbcGTRigL5iDn3o",	
			uid:	"249026708544",	
			url_profile:	"https://ok.ru/profile/249026708544",	
		}
	];