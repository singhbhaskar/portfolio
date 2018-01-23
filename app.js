$(document).ready(function() {
  // $('.list').on('click','li', function() {
  //   $('.list li.active').removeClass('active');
  //   console.log(this);
  //   $(this).addClass('active');
  // });
  //

  function parallax(){
    let wScroll = $(window).scrollTop();
    $('.top-section').css('background-position', 'center '+wScroll+'px');
  }

  $(window).scroll(function() {
    parallax();
  });

  let scrollLink = $('.scroll');


  scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });

  $(window).scroll(function() {
    let scrollbarLocation = $(this).scrollTop();

    scrollLink.each(function() {
      let sectionOffset = $(this.hash).offset().top;

      if(sectionOffset <= scrollbarLocation){
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
      }
    });
  });



});
