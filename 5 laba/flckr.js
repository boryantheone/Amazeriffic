var main = function () {
	"use strict";
	// на самом деле это всего одна строка
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + "tags=cats&format=json&jsoncallback=?";
	$.getJSON(url, function (flickrResponse) {
		flickrResponse.items.forEach(function (photo) {
			// создаем новый элемент jQuery для хранения изображений, но пока скрываем его
			var $img = $("<img>").hide();
			// устанавливаем атрибут для URL, находящегося в ответе
			$img.attr("src", photo.media.m);
			// прикрепляем тег к функции main элемента photos, а затем отображаем его
			$("main .photos",).append($img);
			$img.fadeIn();
		});
	});
};
$(document).ready(main);