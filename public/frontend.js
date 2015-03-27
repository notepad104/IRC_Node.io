//frontend js

$(document).ready(function() {	
	// body...
	var array = [];	//to store all messages
	var socket = io.connect('http://localhost:8000');
	var text = document.getElementById("text");
	var button = document.getElementById("send");
	var content = document.getElementById("content");
	var name = '';
	name = prompt("Enter your name: ", name);
	socket.on('message', function(data){
		console.log(data.message);
		if(data.message){
			array.push(data);
			var str = '';
			for(var i = 0; i < array.length; i++){
				str += '<b>' + (array[i].username ? array[i].username : 'Server') + ': </b>';
				str += array[i].message + '<br />';
			}
			content.innerHTML = str;
		}
		else
			console.log("Error!!");	
	});
	button.onclick = sendMessage = function (){
			var msg = text.value;
			socket.emit('send', { message: msg, username: name });
			text.value = '';
	};

		//name = prompt("Enter your name: ", name);
		$("#text").keyup(function(e) {
			if(e.keyCode == 13) {	
				sendMessage();
			}
		});
});
