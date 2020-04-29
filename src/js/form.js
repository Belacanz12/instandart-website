import $ from 'jquery';
import 'materialize-css/dist/js/materialize.min';

function validate(){
  var valid=true;

  $('.input-field').each(function (item, index) {
    if(!$(this).hasClass('valid')){
      valid = false;
    }
  })

  return valid;
}

function reset() {
  $('.form').trigger('reset');
}

$(document).ready(function(){
  // M.textareaAutoResize($('#message'));

  $('.form_reset').on('click', function(){
    reset();
  })

  $('.form_submit').on('click', function(){
    var k = validate();

    k ? $('.form').submit() : $('.form_helper-text').css({opacity: 1});
  })
})
