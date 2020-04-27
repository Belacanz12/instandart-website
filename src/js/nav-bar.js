import $ from 'jquery';
import 'materialize-css/dist/js/materialize.min';

$(document).ready(function(){
  let header = $('header');

  const instance = M.Sidenav.init($('.sidenav'), {
    onOpenStart: function(){
      header.css({position: 'static'})
    },
    onCloseStart: function(){
      header.css({position: 'relative'})
    }
  });
});
