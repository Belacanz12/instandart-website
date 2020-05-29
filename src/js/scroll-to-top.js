import $ from 'jquery';
import { getScrollHeight } from './utils';

$(document).ready(function(){
  const scrollHeight = $('.page--banner').height() +
    $('.page--company').height() + $('.page--services').height();

  $('#scroll-to-top').on('click', function(){
    $("html, body").animate({ scrollTop: 0 }, 600 );
    return false;
  });

  $(window).on('scroll', function(){
    const scrollTop = $('html').scrollTop();

    if(scrollTop > scrollHeight) {
      $('#scroll-to-top').fadeIn();
    } else {
      $('#scroll-to-top').fadeOut()
    }
  });
});
