import $ from 'jquery';
import 'slick-carousel';
import './range';

function patching(func) {
  let prevSlide = [];

  return function() {
    // if (prevSlide.length === 0) {
    //   prevSlide[0] = arguments[2];
    //   prevSlide[1] = arguments[3];
    // }
    //
    // if(prevSlide[0] === arguments[2] && prevSlide[1] === arguments[3]){
    //   return false;
    // }
    //
    // prevSlide[0] = arguments[2];
    // prevSlide[1] = arguments[3];

    console.log(arguments);

    return func.apply(this, arguments);
  }
}

function changePortfolioBg(element, slide) {
  const page =  element.closest('.page'),
    bgElement = page.find('.portfolio-slider_item').eq(slide),
  data = bgElement.data('bgc');

  page.css({'background': `url(${data}) center no-repeat transparent`});
}

function changePortfolioText(element, slide) {
  const sl =  element.closest('.page').find('.portfolio-slider_item').eq(slide),
    text = sl.find('.text_header').text(),
    textElement = sl.find('.portfolio-slider_text');

  textElement.text(text);
}

$(document).ready(function () {
  const mediator = {
    banner: null,
    product: null,
    portfolio: null,
    range: null,
    duration: 500000,
    bannerObject: null,
    productObject: null,
    portfolioObject: null,
    setupBanner: function(){
      const _ = this;

      _.banner = $(".banner-slider").slick({
        dots: false,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 50000,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        pauseOnHover: false,
        centerPadding: 0,
      });

      _.product = $(".product-slider").slick({
        dots: false,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 50000,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        pauseOnHover: false,
        centerPadding: 0,
      });

      _.portfolio = $(".portfolio-slider").slick({
        dots: false,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 50000,
        arrows: false,
        slidesToShow: 1,
        centerMode: true,
        pauseOnHover: false,
        centerPadding: 0,
      });
    },

    setupRange: function(){
      const _ = this,
        width = $(window).width(),
      serviceRange = $('.range-slider--services'),
      industryRange = $('.range-slider--industry');

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
        initRange: function(){
          const elem = $(this.element),
            slide = this.currentSlide + 1;

          changePortfolioBg(elem, slide);
        },
        funcSlickNext: function() {
          const elem = $(this.element),
            slide = this.currentSlide + 1;

          changePortfolioBg(elem, slide);

          _.portfolio.slick('slickNext');
        },
        funcSlickPrev: function () {
          const elem = $(this.element),
            slide = this.currentSlide + 1;

          changePortfolioBg(elem, slide);

          _.portfolio.slick('slickPrev');
        }
      });

      width <= 750 && serviceRange.rangeSlick({
        allSlide: serviceRange.closest('.page').find('.tab-pane').length,
        duration: _.duration,
        isRange: true,
        funcSlickNext: function() {
          serviceRange.closest('.page').find('.tab').eq(this.currentSlide - 1).trigger('click');
        },
        funcSlickPrev: function () {
          serviceRange.closest('.page').find('.tab').eq(this.currentSlide - 1).trigger('click');
        }
      });

      width <= 750 && industryRange.rangeSlick({
        allSlide: industryRange.closest('.page').find('.tab-pane').length,
        duration: _.duration,
        isRange: true,
        funcSlickNext: function() {
          industryRange.closest('.page').find('.tab').eq(this.currentSlide - 1).trigger('click');
        },
        funcSlickPrev: function () {
          industryRange.closest('.page').find('.tab').eq(this.currentSlide - 1).trigger('click');
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
      const _ = this,
        banner = $('.range-slider--banner'),
        product = $('.range-slider--product'),
        portfolio = $('.range-slider--portfolio');

      _.banner.on('swipe', function(event, slick, direction){
        direction === 'left' ?
          banner.trigger('slick-next') :
          banner.trigger('slick-prev');
      });

      _.product.on('swipe', function(event, slick, direction){
        direction === 'left' ?
          product.trigger('slick-next') :
          product.trigger('slick-prev');
        }
      );

      _.portfolio.on('swipe', function(event, slick, direction){
        direction === 'left' ?
          portfolio.trigger('slick-next') :
          product.trigger('slick-prev');
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

