import $ from 'jquery';

$(document).ready(function(){
  $('#scroll-to-top').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, 600 );
    return false;
  });

  $(window).on('scroll', function(){
    const scrollTop = $('html').scrollTop();

    if(scrollTop > 300){
      $('#scroll-to-top').fadeIn();
    }else{
      $('#scroll-to-top').fadeOut()
    }
  });
});
