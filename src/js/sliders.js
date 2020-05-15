import $ from 'jquery';
import 'slick-carousel';
import './range';

$(document).ready(function () {
  const mediator = {
    banner: null,
    product: null,
    portfolio: null,
    range: null,
    bannerObject: null,
    productObject: null,
    portfolioObject: null,
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

      _.product = $(".product-slider").slick({
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

      _.portfolio = $(".portfolio-slider").slick({
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
      if(!_.product) return false;
      if(!_.portfolio) return false;

      $('.range-slider--banner').rangeSlick({
        allSlide: _.bannerObject.slideCount,
        duration: _.bannerObject.options.autoplaySpeed,
        funcSlickNext: function() {
          _.banner.slick('slickNext');
        },
        funcSlickPrev: function () {
          _.banner.slick('slickPrev');
        }
      });

      $('.range-slider--product').rangeSlick({
        allSlide: _.productObject.slideCount,
        duration: _.productObject.options.autoplaySpeed,
        funcSlickNext: function() {
          _.product.slick('slickNext');
        },
        funcSlickPrev: function () {
          _.product.slick('slickPrev');
        }
      });

      $('.range-slider--portfolio').rangeSlick({
        allSlide: _.portfolioObject.slideCount,
        duration: _.portfolioObject.options.autoplaySpeed,
        funcSlickNext: function() {
          _.portfolio.slick('slickNext');
        },
        funcSlickPrev: function () {
          _.portfolio.slick('slickPrev');
        }
      });

    },
    setupPreEvents: function(){
      const _ = this;

      $(".banner-slider").on('init', function(event, slick){
        _.bannerObject = slick;
      });

      $(".product-slider").on('init', function(event, slick){
        _.productObject = slick
      });

      $(".portfolio-slider").on('init', function(event, slick){
        _.portfolioObject = slick
      });
    },
    setupEvents: function(){
      const _ = this;

      _.banner.on('afterChange', function(){
        $('.range-slider--banner').trigger('slick-next');
      });

      _.product.on('afterChange', function(){
        $('.range-slider--product').trigger('slick-next');
      });

      _.portfolio.on('afterChange', function(){
        $('.range-slider--portfolio').trigger('slick-next');
      });
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

