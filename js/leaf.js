"use strict";

window.onload = function() {
	reveal();
};

function reveal() {
	var leaf1 = $('#leaf1');
	var leaf2 = $('#leaf2');

	leaf1.velocity({ left: -100 }, 1000);

	leaf2.velocity({ right: -100 }, 1000);

}