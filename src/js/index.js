// Main js file// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
import $ from "jquery"
import 'bootstrap';
import 'slick-carousel';
import 'jquery-validation';
import { WOW } from 'wowjs';
import Popper from 'popper.js';

// gsap
import { gsap } from 'gsap';

$(document).ready(function(){
  // gsap.to('.box', {duration: 2, x: 100})
  gsap.to('.box', {
    filter: 'invert(1)',
    y: function(index, target, targets) { //function-based value
      return index * 50;
    },
    duration: 1
  });

  const elementTarget =
    [{
      class: '.link',
      width: 50,
      height: 50
    }, {
      class: 'ul',
      width: 50,
      height: 50
    }, {
      class: 'ol',
      width: 50,
      height: 50
    }, {
      class: '.section-title_right',
      width: 25,
      height: 25
    }];

  elementTarget.forEach(function(item, index){
    $( item.class )
      .on('mousemove', function(e) {
        $('.cursor').css({
          opacity: 1,
          width: item.width,
          height: item.height,
          left: e.pageX,
          top: e.pageY
        })
      })
      .on('mouseleave', function(){
        $('.cursor').css({
          opacity: 0,
          width: 0,
          height: 0
        })
      })
  });
});
