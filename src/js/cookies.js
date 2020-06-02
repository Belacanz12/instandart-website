import $ from 'jquery';

$(document).ready(function(){

  setTimeout(function(){
    // $('.cookies').css('display', 'flex');
  }, 8000)

  $('.cookies_button').on('click', function(){
    $('.cookies').remove();
  });

  $('.cookies_close').on('click', function(){
    $('.cookies').remove();
  });
});
