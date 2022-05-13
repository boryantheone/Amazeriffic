var main = function(UsersObjects) {
    "use strict";
    var $input = $("<input>").addClass("username"),
        $butRegister = $("<button>").text("Создать аккаунт"),
        // $butLogin = $("<button>").text("Войти в аккаунт"),
        $butEdit = $("<button>").text(" Изменить имя пользователя"),
        $butDestroy = $("<button>").text("Удалить пользователя");

    $butRegister.on("click", function() {
        var username = $input.val();
        if (username !== null && username.trim() !== "") {
            var newUser = { "username": username };
            $.post("users", newUser, function(result) {
                console.log(result);
                // отправляем на клиент
                UsersObjects.push(newUser);
            }).done(function(responde) {
                console.log(responde);
                alert('Аккаунт успешно создан!\nНажмите "Войти", чтобы продолжить')
                location.reload();
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                if (jqXHR.status === 501) {
                    alert("Такой пользователь уже существует!\nИзмените логин и повторите " +
                        "попытку");
                } else {
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                }
            });
        }
    });

    // $butLogin.on("click", function() {
    //     var username = $input.val();
    //     if (username !== null && username.trim() !== "") {
    //         var loginUser = { "username": username };
    //         $.ajax({
    //             'url': '/users/' + username,
    //             'type': 'GET'
    //         }).done(function(responde) {
    //             window.location.replace('users/' + username + '/');
    //         }).fail(function(jqXHR, textStatus, error) {
    //             console.log(error);
    //             alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
    //         });
    //     }
    // });

    $butEdit.on("click", function() {
        if ($input.val() !== "") {
            if ($input.val() !== null && $input.val().trim() !== "") {
                var username = $input.val();
                var newUsername = prompt("Введите новое имя пользователя", $input.val());
                if (newUsername !== null && newUsername.trim() !== "") {
                    $.ajax({
                        'url': '/users/' + username,
                        'type': 'PUT',
                        'data': { 'username': newUsername }
                    }).done(function(responde) {
                        console.log(responde);
                        $input.val(newUsername);
                        alert('Имя пользователя успешно изменено');

                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                    location.reload();
                }
            }
        }
        
    });

    $butDestroy.on("click", function() {
        if ($input.val() !== "") {
            if ($input.val() !== null && $input.val().trim() !== "") {
                var username = $input.val();
                if (confirm("Вы уверены, что хотете удалить пользователя " + username + "?")) {
                    $.ajax({
                        'url': '/users/' + username,
                        'type': 'DELETE',
                    }).done(function(responde) {
                        console.log(responde);
                        $input.val("");
                        alert('Пользователь успешно удален');
                        location.reload();
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                }
            }
        }
    });


    $("main .authorization").append($input);
    $("main .authorization").append($butDestroy);
    $("main .authorization").append($butEdit);
    // $("main .authorization").append($butLogin);
    $("main .authorization").append($butRegister);
    // $("main .list_user").append($list);

}

var show_user = function(UsersObjects){
    let users_catalog = [];
	console.log(UsersObjects.length);
	if (UsersObjects.length > 0){
	for (var i = UsersObjects.length-1; i >= 0; i--){
			users_catalog.push(UsersObjects[i]);
	}
	console.log(users_catalog);
	for (var i = users_catalog.length-1; i >= 0; i--){
		html = "";
		var html = $('<li>'+ users_catalog[i].username + '</li>');
			$('.list_user').append(html);
			html = "";
		}
		} else {
			var html = $('<li>'+ "Еще нет пользователей" +'</li>');
			$('.list_users').append(html);
		}
}

$(document).ready(function() {
    $.getJSON("users", function(UsersObjects) {
        main(UsersObjects);
        show_user(UsersObjects);
        console.log(UsersObjects);
    });

});