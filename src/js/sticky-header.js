import $ from 'jquery';

$(document).ready(function () {
  $(window).on("scroll", function() {
    let offset = $('html').scrollTop();
    let header = $('header');

    offset > 200 ? header.css({position: 'fixed'}) : header.css({position: 'relative'});
  });
});
