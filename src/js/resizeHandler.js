import $ from 'jquery';

$(document).ready(function(){
  const width33 = $('#width33-header'),
  rangeSliders = $('.range-slider--portfolio, .range-slider--product'),
  offset = width33.offset(),
  headerOffset = $('header .container').offset(),
  widthElem = width33.width();

  function getKoef(windowWidth) {
    const widthStart = 1280;
    return Math.tan(140/1250) * (windowWidth - widthStart) - 2
  }

  function setPageLeftWidth(elem, width){
    const windowWidth = $(window).width();

    windowWidth >= 1280 && elem.each(function(){
      $(this).css('width', width + getKoef(windowWidth));
    });
  }

  function setRangeSliderPosition(elem, width) {
    const windowWidth = $(window).width();

    windowWidth >= 1280 && elem.each(function(){
      $(this).css('right', width + getKoef(windowWidth));
    });
  }

  $(window).on('resize', function(){
    const width33 = $('#width33-header');
    const offset = width33.offset();
    const widthElem = width33.width();

    setRangeSliderPosition(rangeSliders, headerOffset.left);
    setPageLeftWidth($('.page_left'), offset.left + widthElem);
  });

  setRangeSliderPosition(rangeSliders, headerOffset.left);
  setPageLeftWidth($('.page_left'), offset.left + widthElem);
});
