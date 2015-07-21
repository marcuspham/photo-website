"use strict";

var data;
var genusArray;
var reader;
var textFile = ""
var abelia = ['IMG_0006.JPG', 'IMG_6682.JPG', 'IMG_8041.JPG', 'IMG_8042.JPG', 'IMG_8565.JPG'];
var abeliophyllum = ['IMG_8401.JPG', 'IMG_9908.JPG', 'IMG_9911.JPG'];
var abelmoschus = ['IMG_2144.JPG', 'IMG_2147.JPG', 'IMG_7818.JPG', 'IMG_7830.JPG', 'IMG_7831.JPG'];
var abroma = ['IMG_5560.JPG', 'IMG_8486.JPG'];

window.onload = function() {
	displayPhotos();
	// getImages();
	toggleGenus();
	// animatePhotos();
	checkFileAPI();
	readFile();
};

function getImages() {
	$.get(url).success(function(response) {
		data = response.photos;
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

	/*
	for (var i = 0; i < data.length; i++) {
		genusArray.push(data[i]);
		for (var j = 0; j < data[i].length; j++) {
			$("#photo-container").append('<div class="genus-container"</div>')
			.append('<img src="img/' + data[i] + '/' + data[i][j] + '" />');
		}
	}
	*/
}

function toggleGenus() {
	$(".genus-container").on("click", function() {
		if ($(this).children("img:last").css("display") == 'none') {
			$(this).children("img").css("display", "inline-block");
		} else {
			$(this).children("img").css("display", "none");
			$(this).children("img:first").css("display", "inline-block");
		}
	});
}

function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true; 
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

function readFile(file) {
	if (file.files && file.files[0]) {
		var output = "";
		reader.onload = function(e) {
			console.log(this.result);
			output = e.target.result;
			var lines = output.split("\n");
		};
		reader.readAsText(file.files[0]);
		console.log(output);
		console.log(lines);
	}
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                fileDisplayArea.innerText = allText 
            }
        }
    }
    rawFile.send(null);
}

function animatePhotos() {

}
