import $ from 'jquery';
import 'slick-carousel';
// import { WOW } from 'wowjs';
// import Popper from 'popper.js';

// gsap
// import { gsap } from 'gsap';

import './form';
import './nav-bar';

$(document).ready(function(){
  const elementTarget =
    [{
      class: '.link',
      width: 50,
      height: 50
    },{
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
