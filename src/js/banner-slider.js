import $ from 'jquery';
import './range';

$(document).ready(function () {
  const mediator = {
    banner: null,
    range: null,
    bannerObject: null,
    setupBanner: function(){
      const _ = this;

      _.banner = $(".banner-slider").slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        pauseOnHover: false,
        centerPadding: 0,
      });
    },

    setupRange: function(){
      const _ = this;

      if(!_.banner) return false;

      $('.range-slider').rangeSlick({
        allSlide: _.bannerObject.slideCount,
        duration: _.bannerObject.options.autoplaySpeed,
        funcSlickNext: function() {
          _.banner.slick('slickNext');
        },
        funcSlickPrev: function () {
          _.banner.slick('slickPrev');
        }
      });
    },
    setupPreEvents: function(){
      const _ = this;

      $(".banner-slider").on('init', function(event, slick){
        _.bannerObject = slick;
      });
    },
    setupEvents: function(){
      const _ = this;

      _.banner.on('beforeChange', function(){
        $('.range-slider').trigger('slick-next');
      })
    },
    setup:function () {
      this.setupPreEvents();
      this.setupBanner();
      this.setupRange();
      this.setupEvents();
    },
  };

  mediator.setup();
})

