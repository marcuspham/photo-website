"use strict";

window.onload = function() {
	reveal();
};

function reveal() {
	var leaf1 = $('#leaf1');
	var leaf2 = $('#leaf2');

	for (var i = 0; i < 5; i++) {
		var leaf = $(document.createElement('img')).attr('src', 'http://pngimg.com/upload/green_leaves_PNG3678.png');
		leaf.addClass('leaf');
		leaf.css('top', 100 * i);

		leaf.appendTo('#container');
	}

	$('.leaf')
		.velocity("transition.slideRightBigOut", {
			stagger: 100,
			drag: true,
			backwards: true
		})

		.delay(1000);

}