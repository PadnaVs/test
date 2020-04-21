
	let NetControl = function( _callBack ) {
		this.callBack = _callBack;
		this.websoc = new WebSocket("ws://localhost:8080");
		this.websoc.onmessage = ({data}) => {
			let objAct = JSON.parse( data );

			Handler.game.selectAct( objAct );
		}
	};
	
	NetControl.prototype.sendMsg = function( _obj ) {
		let jsonStr = JSON.stringify( _obj );
		console.log("send",jsonStr);
		/*this.websoc.onopen = () =>*/ this.websoc.send( jsonStr );
	};
	
	