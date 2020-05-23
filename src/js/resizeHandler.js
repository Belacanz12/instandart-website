import $ from 'jquery';

function addClassForRange(){
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
  position = width33.position(),
  headerOffset = $('header .container').offset(),
  widthElem = width33.width();

  function getKoef(windowWidth) {
    const widthStart = 1280;
    return Math.tan(140/1250) * (windowWidth - widthStart) - 2
  }

  function setPageLeftWidth(elem, offset, position){
    const windowWidth = $(window).width(),
      widthLeft = Math.ceil(offset + 14),
      widthRight = windowWidth - widthLeft,
      widthInnerLeft = Math.ceil(position + 14),
      widthInnerRight = 1280 - widthInnerLeft;

    windowWidth >= 1280 && elem.each(function(){
      $(this).find('.page_left').css('width', widthLeft);
      $(this).find('.page_right').css('width', widthRight);
      $(this).find('.page_left_content').css('width', widthInnerLeft);
      $(this).find('.page_right_content').css('width', widthInnerRight);
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
    const width33 = $('#width33-header'),
    offset = width33.offset(),
    position = width33.position(),
    widthElem = width33.width();

    // добавочный коеффициент для page left
    setPageLeftWidth($('.page'), offset.left + widthElem, position.left + widthElem);

    //
    setRangeSliderPosition(rangeSliders, headerOffset.left - 26);

    // добавление/удаление класса range-slider--horizontal
    addClassForRange();
  });

  //
  setRangeSliderPosition(rangeSliders, headerOffset.left - 26);
  setPageLeftWidth($('.page'), offset.left + widthElem, position.left + widthElem);
  addClassForRange();
});
