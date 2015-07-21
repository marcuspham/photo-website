"use strict";

var data;
var abelia = ['IMG_0006.JPG', 'IMG_6682.JPG', 'IMG_8041.JPG', 'IMG_8042.JPG', 'IMG_8565.JPG'];
var abeliophyllum = ['IMG_8401.JPG', 'IMG_9908.JPG', 'IMG_9911.JPG'];
var abelmoschus = ['IMG_2144.JPG', 'IMG_2147.JPG', 'IMG_7818.JPG', 'IMG_7830.JPG', 'IMG_7831.JPG'];

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
	for (var i = 0; i < abelia.length; i++) {
		$("#abelia-container").append('<img src="img/Abelia/' + abelia[i] + '" />');
	}
	for (var i = 0; i < abeliophyllum.length; i++) {
		$("#abeliophyllum-container").append('<img src="img/Abeliophyllum/' + abeliophyllum[i] + '" />');
	}
	for (var i = 0; i < abelmoschus.length; i++) {
		$("#abelmoschus-container").append('<img src="img/Abelmoschus/' + abelmoschus[i] + '" />');
	}
}

function animatePhotos() {

}
