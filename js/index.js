<<<<<<< HEAD
$(document).ready(function(e) {   
  $('#hamburger').click(function() {
    $('.sidebar').toggle();
    $('body').toggleClass('active');
    $('.carousel-control.left').toggleClass('active');
    $('#hamburger').toggleClass('active');
  });
});

$(window).resize(function() {
  if ($(window).width() < 650) {
    $('.sidebar').hide();
    $('body').addClass('active');
    $('.carousel-control.left').addClass('active');
    $('#hamburger').addClass('active');
  } else {
    $('.sidebar').show();
    $('body').removeClass('active');
    $('.carousel-control.left').removeClass('active');
    $('#hamburger').removeClass('active');
  }
});
=======
"use strict";

window.onload = function() {
	$('#logo-bg').click(function() { reveal() });
};

function reveal() {
	$('#logo-bg').velocity("fadeOut", 500);
}
>>>>>>> 22c1f492d9f9dbc4406499d43cbf4f3d5e833517
