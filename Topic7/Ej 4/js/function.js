function createWebSocket(connection_string){
	connection = new WebSocket(connection_string);	
	connection.onclose = onCloseWS;
	connection.onopen = onOpenWS;
	connection.onerror = onErrorWS;
	connection.onmessage = recieveMessage;
	return connection;
}

function onCloseWS(){
	console.log('Close connection!');
};

function onOpenWS(){
	console.log('Open connection!');
}

function onErrorWS(error) {
  console.log('WebSocket Error ' + error);
};

function recieveMessage(evt){
	msg = evt.data;
	console.log('Message received: '+msg);
}

function desconectarSocket(){
	connection.close();
}

function sendMessage(msg){
	if(connection.readyState == 1){
		connection.send(msg);
		console.log('Message sent:'+msg);
	}
}