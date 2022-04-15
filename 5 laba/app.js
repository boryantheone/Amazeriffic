var organizeByTags = function (toDoObjects) {

	console.log("organizeByTags called");
	// создание пустого массива для тегов
	var tags = [];
	// перебираем все задачи toDos 
	toDoObjects.forEach(function (toDo) {
		// перебираем все теги для каждой задачи 
		toDo.tags.forEach(function (tag) {
			// убеждаемся, что этого тега еще нет в массиве
			if (tags.indexOf(tag) === -1) {
				tags.push(tag);
			}
		});
	});
	console.log(tags);

	var tagObjects = tags.map(function (tag) {
		// здесь мы находим все задачи,
		// содержащие этот тег
		var toDosWithTag = [];
		toDoObjects.forEach(function (toDo) {
			// проверка, что результат
			// indexOf is *не* равен -1
			if (toDo.tags.indexOf(tag) !== -1) {
				toDosWithTag.push(toDo.description);
			}
		});
		// мы связываем каждый тег с объектом, который // содержит название тега и массив
		return { "name": tag, "toDos": toDosWithTag };
	});
	console.log(tagObjects);
	return tagObjects;
};

var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание
		// этой задачи
		return toDo.description;
	});
	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			var $element = $(element), $content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = toDos.length - 1; i > -1; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				// ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ 
				console.log("Щелчок на вкладке Теги");
				// organizeByTag(toDoObjects);
				var organizedByTag = organizeByTags(toDoObjects);
				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
						$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				var $input = $("<input>").addClass("description"),
					$inputLabel = $("<p>").text("Новая задача: "),
					$tagInput = $("<input>").addClass("tags"),
					$tagLabel = $("<p>").text("Тэги: "),
					$button = $("<span>").text("+");
					$tagInput.keyup(function(e) {
						if(e.keyCode === 13) {
							$button.click();
						}
					});
					$button.on("click", function () {
					var description = $input.val(),
						// разделение в соответствии с запятыми
						tags = $tagInput.val().split(",");
					toDoObjects.push({ "description": description, "tags": tags });
					// обновление toDos
					toDos = toDoObjects.map(function (toDo) {
						return toDo.description;
					});
					$input.val("");
					$tagInput.val("");
				});
				$("main .content").append($inputLabel).append($input).append($tagLabel).append($tagInput).append($button);
			}
		})
		$(".tabs a:first-child span").trigger("click");
	})
};
$(document).ready(function () {
	$.getJSON("todos.json", function (toDoObjects) {
		// вызов функции main с аргументом в виде объекта toDoObjects
		main(toDoObjects);
	});
});