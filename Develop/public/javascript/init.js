(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

//Allows the carousel to work as a slider
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});