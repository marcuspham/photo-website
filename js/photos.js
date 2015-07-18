"use strict";

var data;

window.onload(function() {
	getImages();
});

function getImages() {
	$.get(url).success(function(response) {
		var img = response.$("img").attr("src");
		data.push(img);
	});
}
function displayPhotos() {
	for (var i = 0; i < data.length; i++) {
		$("#photo-container").append('<img src="' + data[i] + '" />');
	}
}

function animatePhotos() {

}