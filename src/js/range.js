/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

}(function($) {
  'use strict';
  var RangeSlick = window.RangeSlick || {};

  RangeSlick = (function() {

    function RangeSlick(element, settings) {
      var _ = this,
      // elements
      arrowPrevElm = $(element).find('.range-slider_arrow-prev'),
      arrowNextElm = $(element).find('.range-slider_arrow-next'),
      currentSlideNumElm = $(element).find('.range-slider_current-slide-number'),
      allSlideNumElm = $(element).find('.range-slider_all-slide-number'),
      rangeAllElm = $(element).find('.range-slider_range-all'),
      rangeArrow = $(element).find('.range-slider_arrow'),
      rangeProgressElm = $(element).find('.range-slider_range-progress'),

      // parent params
      parentWidth = $(element).width(),
      parentHeight = $(element).height(),
      // progress params
      progressMax = parentHeight > parentWidth ? parentHeight : parentWidth,
      interval = null;

      _.foo = false;
      _.defaults = {
        currentSlide: 1,
        allSlide: 1,
        duration: 1000,
        isRange: false,
        funcSlickNext: function() {},
        funcSlickPrev: function () {}
      }

      _.initials = {
        parentWidth,
        parentHeight,
        progressMax
      }

      $.extend(_, _.initials, _.defaults, settings);

      _.quad = function (timeFraction) {
        return Math.pow(timeFraction, 2)
      }

      _.changeCurrentSlide = function(num){
        currentSlideNumElm.text(num < 10 ? '0'+num : num);
      }

      _.changeAllSlide = function(num){
        allSlideNumElm.text(num < 10 ? '0'+num : num);
      }

      _.onClickNextArrow = function(callback){
        // нажата стрелка
        if(typeof callback == 'function'){
          _.foo = true
        }

        // проверка на событие вызванное, повтороно, slick'ом
        if(typeof callback == 'string' && _.foo){
          _.foo = false
          return false;
        }

        if(_.currentSlide >= _.allSlide) {
          _.currentSlide = 1
          _.changeCurrentSlide(_.currentSlide);
        }else{
          _.currentSlide++;
          _.changeCurrentSlide(_.currentSlide);
        }


        // запускаем таймер
        _.runInterval();

        // передаем данные slick slider'y для изменения слайда
        typeof callback == 'function' ? callback() : null
      }

      _.onClickPrevArrow = function(callback, event){
        // нажата стрелка
        if(typeof callback == 'function'){
            _.foo = true
        }

        // проверка на событие вызванное, повтороно, slick'ом
        if(typeof callback == 'string' && _.foo){
          _.foo = false
          return false;
        }

        if(_.currentSlide <= 1) {
          _.currentSlide = _.allSlide;
          _.changeCurrentSlide(_.currentSlide);
        } else {
          _.currentSlide--;
          _.changeCurrentSlide(_.currentSlide);
        }

        // запускаем таймер
        _.runInterval();

        // передаем данные slick slider'y для изменения слайда
        typeof callback == 'function' ? callback() : null
      }

      _.initEvents = function() {
        arrowPrevElm.on('click', _.onClickPrevArrow.bind(this, _.funcSlickPrev.bind(this, _.currentSlide)));
        arrowNextElm.on('click', _.onClickNextArrow.bind(this, _.funcSlickNext.bind(this, _.currentSlide)));

        $(element).on('slick-prev', _.onClickPrevArrow.bind(this, 'trigger'));
        $(element).on('slick-next', _.onClickNextArrow.bind(this, 'trigger'));
      }

      _.runInterval = function(){
        clearInterval(_.interval);
        _.animateFunc({duration: _.duration, draw: _.draw, timing: _.quad});

        _.interval = setInterval(function(){
          _.onClickNextArrow(_.funcSlickNext.bind(_));
        }, _.duration);
      }

      _.init = function(){
        _.initEvents();
        _.changeAllSlide(_.allSlide);
        _.runInterval();
      }

      _.draw = function (progress) {
        rangeProgressElm.css({ height: progress*_.progressMax });
      }

      _.animateFunc = function ({duration, draw, timing}) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;

          let progress = timing(timeFraction)

          draw(progress);

          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }

        });
      }

      _.init();
    }

    return RangeSlick;
  })();

  $.fn.rangeSlick = function() {
    var _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;
    for (i = 0; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined')
        _[i].rangeSlick = new RangeSlick(_[i], opt);
      else
        ret = _[i].rangeSlick[opt].apply(_[i].rangeSlick, args);
      if (typeof ret != 'undefined') return ret;
    }
    return _;
  };
}));
