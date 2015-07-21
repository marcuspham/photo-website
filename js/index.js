"use strict";

window.onload = function() {
	$('#logo-bg').click(function() { reveal() });
};

function reveal() {
	$('#logo-bg').velocity("fadeOut", 500);
}