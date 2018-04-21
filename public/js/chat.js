    var username = 'user201';
    $('<audio id="chatAudio"><source src="audio/notify.ogg" type="audio/ogg"><source src="audio/notify.mp3" type="audio/mpeg"><source src="audio/notify.wav" type="audio/wav"></audio>').appendTo('body');
	var socket = io.connect();
	var RetypingTimer;                //timer identifier
    var RedoneTypingInterval = 3500;  

	$(document).ready(function(){
	
		var $nickForm = $('#setNick');
		var $nickError = $('#nickError');
		var $nickBox = $('#nickname');
		var $users = $('#myList');
		var $messageForm = $('#send-message');
		var $messageBox = $('#message');
		var $chat = $('#chat');
	
		

		$nickForm.submit(function(e){
			e.preventDefault();
			//username = $nickBox.val();
			username  = "usr"+Date.now();
			$('#namelocal').html(username);
			socket.emit('new user',username,function(data){
				if(data){
					$('#nickWrap').hide();
					$('#contentWrap').show();
				}else{
					$nickError.html('That username is already taken! Try again.');
				}
			});
			$nickBox.val('');
		});

		var toObject = function(arr) { 
			var rv = {};
			for (var i = 0; i < arr.length; ++i)
			  rv[arr[i]] = arr[i];
			return rv;
		};

		// Cambia estatus usuarios
		var statusChat = function(elementos,data) { 
			var offline = " (Offline)";
			for (var i = 0; i < elementos.length; i++) {
				var TextInner = elementos[i].innerText;
               if(!(TextInner in toObject(data))  && TextInner.indexOf(offline) == -1){
				   elementos[i].innerText = TextInner +offline;
				   var statusClass = $('#chatp').children('#'+TextInner).children('header');
				   statusClass.children('.status').addClass('statusOff');
				   statusClass.children('.statusOff').removeClass('status')
			   }
			 }
		};



		
		socket.on('usernames',function(data){
			var html = '';
			var elemento = $('#chatp').find('.header-text');

			if(elemento.length > 0 )
			{
				statusChat(elemento,data); // Cambia estatus usuarios
			}

			$.each(data, function( key, value ) {
			    html +=  '<li id="openchat" onclick="openChat(\'' +value+ '\')" >'+ value+ '</li>';
			})
			$users.html(html);
		});

		$messageForm.submit(function(e){
			e.preventDefault();
			socket.emit('send message',$messageBox.val(),function(data){
				$chat.append('<span class="error">'+ data+"</span><br/>");
			});
			$messageBox.val('');
		});

		socket.on('load old msgs',function(docs){
			for(var i=0;i<docs.length;i++){
				displayMsg(docs[i]);
			}
			SendMessage();
		});

		socket.on('new message',function(data){
			displayMsg(data);
			SendMessage();
		});

		socket.on('whisper',function(data){
			$chat.append('<span class="whisper"><b>['+data.nick+ ']: </b>'+ data.msg+"</span><br/>");
			SendMessage();
		});
		socket.on('mywhisper',function(data){
			$chat.append('<span class="whisper"><b>['+data.nick+ ']: </b>'+ data.msg+"</span><br/>");
			SendMessage();
		});

		socket.on('typing',function(data){
			//DoTyping(data);
			//debugger;
			clearTimeout(RetypingTimer);
			$('#'+data.de).children('#typing').show();
			 typingTimer = setTimeout(function(){  $('#'+data.de).children('#typing').hide(); } , RedoneTypingInterval);
		
		});


		socket.on('private sender',function(data){
			if(checkChat(data.nick)){
				$('#chatp').append(chatHtml(data.nick));
				$("#"+data.nick).draggable();
				$("#"+data.nick).resizable();
			}
			//$('#chatp').find('#'+data.nick).children('.message-area').append(data.nick+':'+data.msg+'</br>');
			$('#chatp').find('#'+data.nick).children('.message-area').append('<div class="message-box-holder"><div class="message-box">'+data.msg+'</div></div>');
			$('#'+data.nick).children('#typing').hide();
			Scrollpv(data.nick);
			$('#chatAudio')[0].play();
		});

		function displayMsg(data){
				$chat.append('<span class="msg"><b>['+data.nick+ ']: </b>'+ data.msg+"</span><br/>");
		}





	});


	
	// scroll function

	const messages = document.getElementById('chat');


	function SendMessage(){
		shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
		if (!shouldScroll) {
	         scrollToBottom();
	    }
	}
	function scrollToBottom() {
	  messages.scrollTop = messages.scrollHeight;
	}

	function Scrollpv(data){
		var area = $('#'+data).children('.message-area')
		area.scrollTop(area.prop("scrollHeight"));
	}

	function openChat(data){
	   // e.preventDefault();
	    var targetUser = data;

	    	if(checkChat(data) ){
	    		$(document).data('chat.targetUser', targetUser);
				$('#chatp').append(chatHtml(targetUser));
				$("#"+targetUser).draggable();
				$("#"+targetUser).resizable();
		    }

	}

	function DoTyping(data){
      //console.log('te');
	}


	function checkChat(data){
		return ($("#chatp").find("#"+data.replace(/\s/g, '') ).length == 0)? true:false;
	}
	function chatHtml(data){
		return '<div class="user open" id="' + data + '"><header><div class="status"></div><div class="header-text gAzul">' + data + '</div><div data-id="' + data + '"  class="close">&times;</div></header><div class="message-area"></div><div id="typing" class="parpadea">Escribiendo...</div><div class="input-area"><input type="text" id="input" /></div></div>';
	}


	/** privado chat **/


$('#chatp').on('keydown', '#input', function(event) {
    if (event.keyCode == 13) {
    	//debugger;
        //var targetUser = $(document).data('chat.targetUser');
        var targetUser = $(this).parent().parent().attr('id');
        var txt = $(this).val();

       // $(this).parent().prev(".message-area").append(username + ': ' + txt + '<br/>');
       $(this).parent().parent().children('.message-area').append("" + '<div class="message-box-holder"> <div class="message-box message-partner">' + txt + '</div></div>');

        

        socket.emit('private msg',{user:targetUser, msg:txt ,send:username},function(data){
        	console.log(data);
			//	$chat.append('<span class="error">'+ data+"</span><br/>");
		});
		Scrollpv(targetUser);
        $(this).val('');
    }
});


function timeoutFunction() {
    typing = false;
    socketout.emit("typing", false);
  }


var typingTimer;                //timer identifier
var doneTypingInterval = 300;  

$('#chatp').on('keyup', '#input',function(){
     clearTimeout(typingTimer);
     var targetUser = $(this).parent().parent().attr('id');

    if ($(this).val()) {
        typingTimer = setTimeout(doneTyping.bind(null,targetUser), doneTypingInterval);
    }
});


function doneTyping (data) {
	console.log('escribe para:'+data);
    socket.emit('typing', {para:data , de:username});
}



$(document).on('click', '.close', function () {
  var id = $(this).data('id');
   $('div.user#' + id).remove();
});


	// function list


			$('.rolldown-list li').each(function () {
			  var delay = ($(this).index() / 4) + 's';
			  $(this).css({
			    webkitAnimationDelay: delay,
			    mozAnimationDelay: delay,
			    animationDelay: delay
			  });
			});


	/** fin privado char **/

/*
$('#openchat').on('click', function(e)  {
    e.preventDefault();
    var targetUser = ($(this).html());
    $(document).data('chat.targetUser', targetUser);
    var user = '<div class="user open" id="' + targetUser + '"><header><div class="status"></div><div class="header-text">' + targetUser + '</div><div data-id="' + targetUser + '"  class="close">&times;</div></header><div class="message-area"></div><div class="input-area"><input type="text" id="input" /></div></div>';
    $('#chatp').append(user);
});
*/

