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
	
	Consts.POSITION_CEIL = [    //фигура 1
								[
									[ 1, 0 ],
									[ 0, 0 ]
								],
								//фигура 2
								[
									[ 1, 1 ],
									//[  ]
								],
								//фигура 3
								[
									[ 1,  ],
									[ 1,  ]
								],
								//фигура 4
								[
									[ 1, 1, 1 ],
									//[  ]
								],
								//фигура 5
								[
									[ 1,  ],
									[ 1,  ],
									[ 1,  ],
								],
								//фигура 6
								[
									[ 1, 1, 1, 1 ],
									//[  ]
								],
								//фигура 7
								[
									[ 1,  ],
									[ 1,  ],
									[ 1,  ],
									[ 1,  ],
								],
								//фигура 8
								[
									[ 1, 1, 1, 1, 1 ],
									//[  ]
								],
								//фигура 9
								[
									[ 1,  ],
									[ 1,  ],
									[ 1,  ],
									[ 1,  ],
									[ 1,  ],
								],
								//фигура 10
								[
									[ 1, 1 ],
									[ 1, 0 ],
								],
								//фигура 11
								[
									[ 0, 1 ],
									[ 1, 1 ],
								],
								//фигура 12
								[
									[ 1, 0 ],
									[ 1, 1 ],
								],
								//фигура 13
								[
									[ 1, 1 ],
									[ 0, 1 ],
								],
								//фигура 14
								[
									[ 1, 1 ],
									[ 1, 1 ],
								],
								//фигура 15
								[
									[ 1, 1, 1 ],
									[ 1, 1, 1 ],
									[ 1, 1, 1 ],
								],
								//фигура 16
								[
									[ 1, 1, 1 ],
									[ 0, 0, 1 ],
									[ 0, 0, 1 ],
								],
								//фигура 17
								[
									[ 1, 0, 0 ],
									[ 1, 0, 0 ],
									[ 1, 1, 1 ],
								],
								//фигура 18
								[
									[ 0, 0, 1 ],
									[ 0, 0, 1 ],
									[ 1, 1, 1 ],
								],
								//фигура 19
								[
									[ 1, 1, 1 ],
									[ 1, 0, 0 ],
									[ 1, 0, 0 ],
								],
						   ];


	