
	let NetControl = function() {
		let self = this;
		this.websoc = new WebSocket("ws://localhost:8080");
		
		console.log( "Открытие соединения" );
		this.websoc.onopen = function( e ) {
			//если очков 0 - то в js парсанется в undefined
			console.log( "Соединился с сервером" );
			let playerStats = { typeAct: Consts.TYPE_ACT_FIRST_CONNECT, points: 600 };
			self.sendMsg( playerStats );
			
			Handler.game.stPlayerExpectation();
		};
		
		this.websoc.onmessage = ({data}) => {
			let objAct = JSON.parse( data );
			Handler.game.selectAct( objAct );
		}
		
		//setTimeout( function() { self.connectionClose( "EndGame" ) }, 1000 );
	};
	
	NetControl.prototype.sendMsg = function( _obj ) {
		let jsonStr = JSON.stringify( _obj );
		console.log("send",jsonStr);
		this.websoc.send( jsonStr );/*this.websoc.onopen = () =>*/
	};
	
	NetControl.prototype.connectionClose = function( msgClose ) {
		this.websoc.close( 1000, msgClose );
	};
	