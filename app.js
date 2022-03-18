var main = function () {
	"use strict";
	var toDos = [
		"Закончить писать эту книгу",
		"Вывести Грейси на прогулку в парк",
		"Ответить на электронные письма",
		"Подготовиться к лекции в понедельник",
		"Обновить несколько новых задач",
		"Купить продукты"
	];
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
				$content = $('<div class="add-task"><input type="text" size="40"><button>+</button></div>');
				$("main .content").append($content);
				$("main .add-task button").click(function () {
					var $input = $("main .add-task input");
					toDos.push($input.val());
				})

			}
		});

	});
	$(".tabs a:nth-child(2) span").trigger("click");
}
$(document).ready(main);
