$(document).ready(function(e) {   
  $('#hamburger').click(function() {
    $('.sidebar').toggle();
    $('body').toggleClass('active');
    $('.carousel-control.left').toggleClass('active');
    $('#main-overlay').toggleClass('active');
    $('#hamburger').toggleClass('active');
  });
});

$(window).resize(function() {
  if ($(window).width() < 650) {
    $('.sidebar').hide();
    $('body').addClass('active');
    $('.carousel-control.left').addClass('active');
    $('#main-overlay').addClass('active');
    $('#hamburger').addClass('active');
  } else {
    $('.sidebar').show();
    $('body').removeClass('active');
    $('.carousel-control.left').removeClass('active');
    $('#main-overlay').removeClass('active');
    $('#hamburger').removeClass('active');
  }
});