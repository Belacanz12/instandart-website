import $ from 'jquery';

function addClassForRange(){
  console.log('hello world');

  const horizontal = {
      480: [
        'range-slider--product',
        'range-slider--industry',
        'range-slider--portfolio',
        'range-slider--services'
      ],
      600: [
        'range-slider--product',
      ],
      1280: []
    },
    className = 'range-slider--horizontal',
    rangeClassName = '.range-slider',
    width = $(window).width();

  let i = 0;

  if(width < 600) {
    i = 480;
  } else if(600 <= width && width < 750) {
    i = 600;
  } else {
    i = 1280;
  }

  $(rangeClassName).each(function(){
    let _class = $(this);
    // удаляем у всех класс
    _class.removeClass(className);

    // но если есть те которые входят в список добавляем класс
    horizontal[i].forEach(function(str){
      if(_class.hasClass(str)) _class.addClass(className);
    });
  });
}

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

    if(windowWidth >= 1300){
      elem.each(function(){
        $(this).css('right', width + getKoef(windowWidth))
      })
    }else if(windowWidth >= 1280) {
      elem.each(function(){
        $(this).css('right', 20)
      })
    }
  }

  $(window).on('resize', function(){
    const width33 = $('#width33-header');
    const offset = width33.offset();
    const widthElem = width33.width();

    // позиционирование range
    setRangeSliderPosition(rangeSliders, headerOffset.left);

    // добавочный коеффициент для page left
    setPageLeftWidth($('.page_left'), offset.left + widthElem);

    // добавление/удаление класса range-slider--horizontal
    addClassForRange()
  });

  setRangeSliderPosition(rangeSliders, headerOffset.left);
  setPageLeftWidth($('.page_left'), offset.left + widthElem);
  addClassForRange();
});
