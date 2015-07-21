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