$(window).load(function() {

	// инициализация приложения
	firebase.initializeApp(firebaseConfig);
	var messaging = firebase.messaging();
	// const messaging = firebase.messaging();
	
	messaging.usePublicVapidKey(firebaseVapidKey);
	
	// проверяем возможность разрешения подписки и если еще не подписан, то сразу автоматом подписываем
	messaging.requestPermission().then(function () {
	    // запрашиваем токен устройства из farebase
	    messaging.getToken()
	        .then(function (currentToken) {
	            //console.log('currentToken - ' + currentToken);
	            // проверяем есть ли такой токен в нашей базе,если нет - пишем к нам в бд
	            checkToken(currentToken);
	        })
	        .catch(function (err) {
	            //console.log('get Token' + err);
	            //TODO выводить сообщение об ошибке пользователю
	        })
	}).catch(function (err) {
	    //console.log('error request permission ' + err);
	    //TODO выводить сообщение об ошибке пользователю
	});
	
	//отображаем сообщение, если не в фоновом режиме
	messaging.onMessage(function (payload) {
	    //console.log(payload);
	    // готовим данные уведомления
	    var options = {
	        body: payload.data.body,
	        icon: '/images/firebase-logo.png',
	    };
	    // инициализируем и отображаем уведомление
	    var n = new Notification(payload.data.title, options);
	    // обрабатываем клик по уведомлению
	    n.onclick =function(event) {
	        event.preventDefault(); // prevent the browser from focusing the Notification's tab
	        window.open( payload.data.click_action , '_blank');
	    };
	});

});
	
// при загрузке страницы сверяем полученный токен устройства для уведомлений на наличие в нашей бд
function checkToken(currentToken){
    var url = "/ru/?ajax";
    var data = {
        typeData: 'FBNotificationDeviceToken',
        token: currentToken,
        type: 'check'
    };
    $.ajax({
        url: url,
        type: 'POST',
        data: {data: data},
        dataType: 'json',
        success: function(res){
            //console.log( 'результат проверки токена у нас в бд ' + res.message);
            if(res) {
                if (res.message === 'do not exists') {
                    //console.log('еще не подписывался или обновился токен');
		    // сохраняем токен устройства
		    sendTokenToServer(currentToken);
                } else {
                    //console.log('уже подписался');
                }
            }
        },

        error: function(jqXHR, textStatus){
            //console.log('Сообщение об ошибке от сервера: '+textStatus); // вывод JSON в консоль
		
        }
    });
}


// отсылаем токен устройства подписавшегося пользователя к нам в бд
function sendTokenToServer(currentToken) {
    var url = "/ru/?ajax";
    var data = {
        typeData: 'FBNotificationDeviceToken',
        token: currentToken,
        type: 'save-new'
    };

    $.ajax({
        url: url,
        type: 'POST',
        data: {data: data},
        dataType: 'json',
        success: function(json){
            if(json) {
                if (json.message === 'success') {
                    //console.log('токен сохранен успешно');
                } else {
                    //console.log(json.message);
                }
            }
        },
        error: function(jqXHR, textStatus){
            //console.log('Сообщение об ошибке от сервера: '+textStatus); // вывод JSON в консоль
        }
    });
}

// отправка уведомления по клику на кнопке "Отправить уведомление" на странице для отправки уведомлений
// запрос в php class DesignAPI/classes/FirebaseApi/Firebase
function pushSend(){
	// собираем поля формы уведомления
	var title = document.querySelector('#title').value;
	var message = document.querySelector('#message').value;
	var link = document.querySelector('#link').value;
	
	// будующий расширенный вариант
	//var button1 = document.querySelector('#button1').value;
	//var button2 = document.querySelector('#button2').value;
	
	// готовим данные для отправки уведомления через ajax
	var url = "/ru/?ajax";
	var data = {
		typeData: 'FBNotificationDeviceToken',
		title: title,
		message: message,
		link: link,
		type: 'send-push'

		//button1: button1,
		//button1: button2,
		
	};

	// отправляем данные классу отправки уведомлений
	$.ajax({
		url: url,
		type: 'POST',
		data: {data: data},
		dataType: 'json',
		success: function(json){
			//console.log(json);
			if(json) {
				if (json.save === 'success') {
					//console.log('сообщение отправлено успешно');
				} else {
					//console.log('ошибка - ' + json.save);
				}
				if (json.send === 'success') {
					//console.log('сообщение сохранено успешно');
				} else {
					//console.log('ошибка - ' + json.send);
				}
			}
		},

		error: function(jqXHR, textStatus){
			//console.log('Сообщение об ошибке от сервера: '+textStatus); // вывод JSON в консоль
		}
	});
}

//не используем
/*
function unSubscribe() {
    messaging.getToken()
        .then(function (currentToken) {
            messaging.deleteToken(currentToken)
                .then(function () {
                    localStorage.setItem('subscribe', 'out');
                    subscribeButton.disabled = false;
                    //console.log('Token deleted.');


                    // убиваем ключ в бд  пока не задействовано
                    //sendTokenToServer('-', 'delete');
                })
                .catch(function (err) {
                    //console.log('Unable to delete token. ', err);
                    subscribeButton.disabled = false;
                });
        })
        .catch(function (err) {
            //console.log(err);
        });
}
*/




