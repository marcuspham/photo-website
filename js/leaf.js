"use strict";

window.onload = function() {
	reveal();
};

function reveal() {
	var leaf = $('#leaf2');

	$('.leaf')
		.velocity("transition.slideRightBigOut", {
			stagger: 100,
			drag: true,
			backwards: true,
			complete: function() {
				window.location.replace('landing.html');
			}
		})
		.delay(1000);

}