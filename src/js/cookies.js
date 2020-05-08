import $ from 'jquery';

$(document).ready(function(){
  $('.cookies_button').on('click', function(){
    $('.cookies').remove();
  });

  $('.cookies_close').on('click', function(){
    $('.cookies').remove();
  });
});
