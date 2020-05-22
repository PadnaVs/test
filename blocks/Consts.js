    const Consts = {};
	
   
    Consts.initImagesUrls = function() {//Config not defined
        Consts.DIR_HEAD                = Config.IMAGE_LOADER_BASE_URL+"/head/";         
        Consts.DIR_WINDS               = Config.IMAGE_LOADER_BASE_URL+"/winds/";         
        Consts.DIR_GAME                = Config.IMAGE_LOADER_BASE_URL+"/winds/game/";         
        Consts.DIR_ACT7STEPS           = Config.IMAGE_LOADER_BASE_URL+"/winds/act7steps/";         
        Consts.DIR_AC0                 = Config.IMAGE_LOADER_BASE_URL+"/winds/action0/";         
        Consts.DIR_AC1                 = Config.IMAGE_LOADER_BASE_URL+"/winds/action1/";         
        Consts.DIR_AC2                 = Config.IMAGE_LOADER_BASE_URL+"/winds/action2/";         
        Consts.DIR_AC3                 = Config.IMAGE_LOADER_BASE_URL+"/winds/action3/";         
        Consts.DIR_AC4                 = Config.IMAGE_LOADER_BASE_URL+"/winds/action4/";         
        Consts.DIR_AC5                 = Config.IMAGE_LOADER_BASE_URL+"/winds/action5/";         
        Consts.DIR_MENU_LEVELS         = Config.IMAGE_LOADER_BASE_URL+"/winds/menuLevels/";         
        Consts.DIR_MENU_LEVELS_LOADING = Config.IMAGE_LOADER_BASE_URL+"/winds/menuLevels/loding/";         
        Consts.DIR_MENU_LEVELS_NUMBERS = Config.IMAGE_LOADER_BASE_URL+"/winds/menuLevels/numbers/";         
        Consts.DIR_IMG_BOT_PANEL       = Config.IMAGE_LOADER_BASE_URL+"/winds/bottomPanel/";         
        Consts.BEFORE_LEVEL_MAIN_WIND  = Config.IMAGE_LOADER_BASE_URL+"/winds/beforeLevel/mainWin/";         
        Consts.DIR_AC_BEFORE_LEVEL     = Config.IMAGE_LOADER_BASE_URL+"/winds/beforeLevel/ac/";         
        Consts.DIR_BUY_BOOSTER         = Config.IMAGE_LOADER_BASE_URL+"/winds/buyBooster/";         
        Consts.DIR_IMG_BUY_COINS       = Config.IMAGE_LOADER_BASE_URL+"/winds/buyCoins/";
        Consts.DIR_IMG_BUY_ENERGY      = Config.IMAGE_LOADER_BASE_URL+"/winds/buyEnergy/";
        Consts.DIR_END_LEVEL_MAIN      = Config.IMAGE_LOADER_BASE_URL+"/winds/endLevel/mainWin/";
        Consts.DIR_END_LEVEL_REAR      = Config.IMAGE_LOADER_BASE_URL+"/winds/endLevel/rearWin/";
        Consts.DIR_END_LEVEL_NUMBERS   = Config.IMAGE_LOADER_BASE_URL+"/winds/endLevel/numbers/";
        Consts.DIR_FIN_LEVEL           = Config.IMAGE_LOADER_BASE_URL+"/winds/finLevel/";
        Consts.DIR_FRIEND_INVITED      = Config.IMAGE_LOADER_BASE_URL+"/winds/friendInvited/";
        Consts.DIR_FREE_MIX            = Config.IMAGE_LOADER_BASE_URL+"/winds/freeMix/";
        Consts.DIR_FULL_SCREEN         = Config.IMAGE_LOADER_BASE_URL+"/winds/fullScreen/";
        Consts.DIR_FULL_SCREENTO       = Config.IMAGE_LOADER_BASE_URL+"/winds/fullScreenTo/";
        Consts.DIR_MSG                 = Config.IMAGE_LOADER_BASE_URL+"/winds/msg/";
        Consts.DIR_IMG_MYSC            = Config.IMAGE_LOADER_BASE_URL+"/winds/myScore/";
        Consts.DIR_PUZZLE              = Config.IMAGE_LOADER_BASE_URL+"/winds/puzzle/";
        Consts.DIR_RULETTE             = Config.IMAGE_LOADER_BASE_URL+"/winds/rulette/";
        Consts.DIR_STEPS_LEFT          = Config.IMAGE_LOADER_BASE_URL+"/winds/stepsLeft/";
        Consts.DIR_VIP_SCORE           = Config.IMAGE_LOADER_BASE_URL+"/winds/vipScore/";
        Consts.DIR_DAILY_BONUS         = Config.IMAGE_LOADER_BASE_URL+"/winds/dailyBonus/";
        Consts.DIR_TUTORIAL            = Config.IMAGE_LOADER_BASE_URL+"/tutorial/";   
        Consts.DIR_WIND_LOADER         = Config.IMAGE_LOADER_BASE_URL+"/winds/windLoader/";   
        
	    
        //Consts.URL_COLL        = "http://localhost/coll/";         
        //Consts.URL_COLL        = "http://localhost/gems_colls/lastimg/";         
        //Consts.URL_COLL        = "http://localhost/gems_colls/goodCols1_781/";    


    }

    Consts.ALF = ["А","Б","В","Г","Д","Е","Ё","Ж","З","И","Й","К","Л","М","Н","О","П","Р","С","Т","У","Ф","Х","Ц","Ч","Ш","Щ","Ъ","Ы","Ь","Э","Ю","Я"];         
      
  
	Consts.CRYPT_KEY = '335e096de9a7f799573df689a6757f69';

	Consts.VERSION	  	= "1.0130";
	Consts.MOBILE_OK 	= "mOK";
	Consts.MOBILE_VK 	= "mVK";
	Consts.NETWORK_DV 	= "DEV";
	Consts.NETWORK_OK 	= "ok";
	Consts.NETWORK_VK 	= "vk";

	//Consts.NETWORK  = Consts.NETWORK_OK; //Фосфоглив 
	//Consts.NETWORK  = Config.NETWORK; 
	
	Consts.viewer_id = "525314413";
	Consts.viewer_id = "514097834586";//ok outer_id
    Consts.viewer_id = "559775";//"559772"
 
	Consts.GORIZONT_ANIM = 0;   
	Consts.VERTICAL_ANIM = 1;   
	
	Consts.WITHOUT_PARENT = 0;   
	      
 

    Consts.TOP_FRENDS               = 1;         
    Consts.TOP_ALL                  = 2;         
    Consts.TOP_MONEYS               = 3;         
  
    
	Consts.TIME_WINDOW_MOVE         = 150;
    //Time//         
    Consts.TIME_ADD_ENERGY                      = 1200;//sek         
    Consts.TIME_ADD_NEXT_MIX                    = 18000;//sek         
    Consts.TIME_AC0_TIMER                       = 700;//sek         
    Consts.TIME_ROT_START_AC1                   = 9900;//sek         
    Consts.TIME_ROT_START_AC_BEFORE_LEVEL       = 9900;//sek         
    Consts.TIME_ROT_START_BUY_BOOSTER           = 7900;//sek         
    Consts.TIME_ROT_LUCH_AC1                    = 30000;//sek         
    Consts.TIME_ROT_LUCH_AC3                    = 6500;//sek         
    Consts.TIME_ROT_LUCH_BUY_BOOSTER            = 11000;//sek         
    Consts.TIME_TRANSITION_LEFT_AC              = 500;//sek             
    Consts.TIME_TRANSITION_LEFT_AC_BEFORE_LEVEL = 800;//sek             
    Consts.TIME_SHOW_SMAL_AC                    = 15000;//sek         
	
	
	
	/////////////////////////////////////////////////////////////////////
	
	Consts.COINT_REDUCT_BON1             = 40;
	//Consts.COINT_REDUCT_BON2             = 40;
	Consts.COINT_REDUCT_BON3             = 40;
	Consts.COINT_REDUCT_BON4             = 40;
								         
	Consts.COINT_REDUCT_ROT_F            = 40;
	Consts.COINT_REDUCT_CANCEL_M         = 40;
	Consts.COINT_REDUCT_ADD_F            = 40;
	
	Consts.COINT_REDUCT_CONTINUE_GAME    = 50;
	
	
	Consts.YOU_WIN   = 0;
	Consts.ENEMY_WIN = 1;
	Consts.DEAD_HEAT = 2;
	
	Consts.TYPE_ACT_INSERT_F            = 0;
	Consts.TYPE_ACT_DEL_F               = 1;
	Consts.TYPE_ACT_START_GAME          = 2;
	Consts.TYPE_ACT_ENEMY_LOST          = 3;
	Consts.TYPE_ACT_YOU_LOST            = 3;
	Consts.TYPE_ACT_FIRST_CONNECT       = 4;
	Consts.TYPE_ACT_DISCONNECT          = 5;
	Consts.TYPE_ACT_SEARCH_NEXT_RATING  = 6;
	Consts.TYPE_ACT_START_GAME_WITH_BOT = 7;
	
	
	Consts.TYPE_BLOCK = 0;
	Consts.TYPE_LINE  = 1;
	Consts.TYPE_ANGLE = 3;
	
	Consts.GORIZONTAL_LINE = 0;
	Consts.VERTICAL_LINE = 1;
	
	Consts.NUMS_FIGURES_FOR_BON = [ 0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19 ];
	
	Consts.OPEN_CELLS    = 0;
	Consts.INACCES_CELLS = 1;
	Consts.FILL_CELLS    = 2;
	Consts.DEL_CELLS     = 3;
		
	Consts.STR0 = "IIGH7309DB2FH7I4HIS5GF936FEFG91355FE3EE0HEBH7DGDG5I7A6I8SAI0B0B4HG19BA2B14083SH163H16A1SG0IB13IBA8H15HB26130960A7AI8H8FE92A6F1EE89F04EFIIE9E1B19178ISGSI5B334I4FS6SAF0IH2SF41F66364H6A3BD8F97EE7BBAHAH7AIB71S6E5BH89E685G3S9I323SD097F9798H4H9F016S8IE2SAB";
	Consts.STR1 = "830S1D9A131HIII71B5D24447DDFI1471DIIDFD0IB2G5875G1HS74272D0SBE6383I006F6GDD167GG4IS307F670212ABBS5H7IE028230HHGG7H295E3268S2SB4510F0FDBAA9BHE96B2E987D2S52F164203G528DSB0H1GD3FGB0I74I893A3ESE859AAAGFD57941H0AF8BSBDSB6A5547E16007EFSAH5DH3694I0F379GAEEB";
	Consts.STR2 = "B3AD00F213A133E8SBH132FI8G5DD1502IG6F0HBA710S87I14D1D9H74H0H0E28FD47S1DSEB9EDSA0BBA5D261AFGSHI0E36E96AE71092B0F0IH0D4A838ASEGFA10011450E86B820622BD90BA2SS74IH2264B193IG9285ID90SD4I8DGSD8I9IGHAFDA60S6EF4BSD13S293DG47SAG0DGHH3963862IS05147G3H24B273B7I1";
	Consts.STR3 = "I4FD18DI89DS3SIS745DD5IHGD6A65930819DAGH660BESH9G390HDI7E5502255IB265F48006564E2393G00DBD248G67F6A0G1I7E52DE9E95F6AB6EDEE01H9E34567DD406AH86B8B01IAG9918175802DDEE9411SAESA7688429D7HBS11G2SBBS5S41531BG9D4H7H5B3FAA2F04400F69G37D258EHAHDSI5SDDFI3HHGH11B";
	Consts.STR4 = "41339E4H5B0965HF2FH4F90H35FS742IAIAI8HS0I8GI9HSAI2G1716E000FI1HD93191H43FS3IDGGI7F0HI461IDH5945ASDE1069D529330F169184GIAH26F39H53G7S0HGI9BB0F0DF6BG1478G37HB7860FSFSFABAS620373A85BE5IIH23DEGD7DEDI64E922FA1EI6IIHB441ASBS5GS11HH8314A1I87498F7SDEE449H06H";
	Consts.STR5 = "H0DH5E6AI1007GD5AEHDB394D7116SIF611E7E184DH30DG8F1G790F94I6B9081I65D3D0364D2DIG960AGEFI196SE01F0IA4HB46339684G8E50FF3FHBD3H2G79308AF25ESFA24E85B12H15HF474D9099BE1G4D44S3139EB28S638D543475D0AA53063EI7771G5H99E9GBH2BD5AIDI8FFG8AE72ASE1FG6H4F3BID007FBE3";
	Consts.STR6 = "51AS6DH8DS5EEH9H8BA6EBD65448687ABB08E08E6H2GIA81HSD6099D1SGB87DH60D8FF79IFB1HIGG1G97D4H62DAHS7S66A43F45I596F9EAG83I5D149F7FA6E6FB16B2S520BA0G5F27S75D2ABG75FA5F53H8H5H4B235F954FH3EASBG9D2SAHB4I12FBA6SF4II39S4H8S58HA4SE3D5H257870906ES9H25EFG6SBDGG451EB";
	Consts.STR7 = "BD24F3F8B0D939197GHG39FDE3BSD5059H4E5E2H09FGF614S797I0E9FIIFH28I8HD6829EFFB53B213D97F5GG75AD18670SE1G6I6846HFDI61B2B6SDI7BD0811E4S8SI6ISHI76767570857459199B8GG25ADE32834A831I5B1DD6GADFD51FG5320D27AAGEI98GFA7F3A6E0I59894SIS4BBF2E8G5296G15AGF11DFGE36A3";
	Consts.STR8 = "3GD95I240EI5E4HFA0H45A659259F73B2H95GS7BEDD31I6I0D0IG66S89BI366395D4A01119053B480S0BIH6435HDIB9FFG01GA4B2I29752BS056S93F2S1GG20SDF6GSGH31707SEGEAS38DE4264S8BB24594IS2DSG8HE31373GD8H3FA124FE09S26IA59253385GB71D36SE3776IBS4I67A418FBH7GDD150GA754EFEAEG7";
	Consts.STR9 = "5E9DE64G257EH93BF08B4EGS1S6375735B91SSB90I1E70G6GGDFHBG35186150D0HBDD893B4D5IFG341D4I00SDA119GHI0GIEADAI50SB73BF4I9BGEG724H26D5EHD4G8FGSGE985S64IE385H4E12BDI8BG8HHS1769IEHIIH7HBBI6FHG443613IH57AD105S6G430G5I09HSB10D6B72EB65EAG70BD568EH769S6928F046164";
	
	Consts.POSITION_CEIL = [    //фигура 0
								[
									[ 2, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 1
								[
									[ 2, 2, 0, 0, 0 ],
									[ 2, 2, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 2
								[
									[ 2, 2, 2, 0, 0 ],
									[ 2, 2, 2, 0, 0 ],
									[ 2, 2, 2, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								], 
								//фигура 3
								[
									[ 2, 2, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									//[  ]
								],
								//фигура 4
								[
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 5
								[
									[ 2, 2, 2, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									//[  ]
								],
								//фигура 6
								[
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 7
								[
									[ 2, 2, 2, 2, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									//[  ]
								],
								//фигура 8
								[
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 9
								[
									[ 2, 2, 2, 2, 2 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									//[  ]
								],
								//фигура 10
								[
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
								],
								//фигура 11
								[
									[ 2, 2, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								
								//фигура 12
								[
									[ 2, 2, 0, 0, 0 ],
									[ 0, 2, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								
								//фигура 13
								[
									[ 0, 2, 0, 0, 0 ],
									[ 2, 2, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 14
								[
									[ 2, 0, 0, 0, 0 ],
									[ 2, 2, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],           
								//фигура 15          
								[
									[ 2, 2, 2, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 16
								[
									[ 2, 2, 2, 0, 0 ],
									[ 0, 0, 2, 0, 0 ],
									[ 0, 0, 2, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 17
								[
									[ 0, 0, 2, 0, 0 ],
									[ 0, 0, 2, 0, 0 ],
									[ 2, 2, 2, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
								//фигура 18
								[
									[ 2, 0, 0, 0, 0 ],
									[ 2, 0, 0, 0, 0 ],
									[ 2, 2, 2, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
									[ 0, 0, 0, 0, 0 ],
								],
						   ];


	