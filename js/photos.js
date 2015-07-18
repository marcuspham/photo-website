"use strict";

var data;
var photoArray = ['IMG_0006.JPG', 'IMG_6682.JPG', 'IMG_8041.JPG', 'IMG_8042.JPG', 'IMG_8565.JPG'];

window.onload = function() {
	displayPhotos();
	// getImages();
};

function getImages() {
	$.get(url).success(function(response) {
		var img = response.$("img").attr("src");
		data.push(img);
	});
}

function displayPhotos() {
	for (var i = 0; i < photoArray.length; i++) {
		$("#photo-container").append('<img src="img/Abelia/' + photoArray[i] + '" />');
	}
}

function animatePhotos() {

}
