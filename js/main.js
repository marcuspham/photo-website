/*
 * Nam Pham Photography Website
 * Main JS file
 *
 * Handles sidebar collapse/animation
 */

// Collapse or reveal the sidebar when the hamburger is clicked.
$(document).ready(function(e) {   
  $('#hamburger').on('click', animateSidebar);
});

function animateSidebar() {
  // Disable hamburger while animating
  $(this).off('click');

  var sidebar = $('.sidebar');
  var showing = (sidebar.css('display') != 'none');
  var translateX = (showing) ? "-=275" : "+=275";
  var resizeWidth = (showing) ? "+=275" : "-=275";
  var dur = 400;

  // Animate elements

  resize($('#frame'), resizeWidth, translateX, dur);
  resize($('body'), resizeWidth, translateX, dur);
  resize($('#main-overlay'), resizeWidth, translateX, dur);
  slide($('#copyright'), translateX, dur);
  slide($('#title'), translateX, dur);
  slide($('.carousel-control.left'), translateX, dur);

  // Make sure there's room for sidebar animation before/after
  if (showing) {
    sidebar.velocity({ left: translateX }, {
      duration: dur,
      complete: function() {
        toggleClasses();
        $('#hamburger').on('click', animateSidebar);
      }
    });
  } else {
    sidebar.velocity({ left: translateX }, {
      duration: dur,
      begin: function() { toggleClasses(); },
      complete: function() {
        $('#hamburger').on('click', animateSidebar);
      }
    });
  }
}

// Resizes a jQuery Object with given d(width),
// d(x), and duration.
// The width automagically expands towards the left.
function resize(obj, dw, dx, dur) {
  obj.velocity({ 
    width: dw,
    left: dx
  }, dur);
}

// Slides a jQuery Object d(x)px to the left in given duration.
function slide(obj, dx, dur) {
  obj.velocity({ left: dx }, dur);
}

// Show/Hide elements on animation begin/complete
// so sidebar has room to move
function toggleClasses() {
    $('.sidebar').toggle();
    $('body').toggleClass('active');
    $('.carousel-control.left').toggleClass('active');
    $('#main-overlay').toggleClass('active');
    $('#frame').toggleClass('active');
    $('#hamburger').toggleClass('active');
}

// On window resize: 
// Hide sidebar for small window size, 
// Show sidebar for larger window size
$(window).resize(function() {
  if ($(window).width() < 650) {
    $('.sidebar').hide();
    $('body').addClass('active');
    $('.carousel-control.left').addClass('active');
    $('#main-overlay').addClass('active');
    $('#frame').addClass('active');
    $('#hamburger').addClass('active');
  } else {
    $('.sidebar').show();
    $('body').removeClass('active');
    $('.carousel-control.left').removeClass('active');
    $('#main-overlay').removeClass('active');
    $('#frame').removeClass('active');
    $('#hamburger').removeClass('active');
  }
});
