$( document ).ready(function() {

	createWebSocket("ws://echo.websocket.org")
	$('.sendMsj').click(function(){
		var data = $('.mesagge').val();
		sendMessage(data);
		$('#messages-list').append('<li>Send: '+data+'</li>');
	});


});