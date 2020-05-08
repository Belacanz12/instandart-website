import $ from 'jquery';
import tabs from 'tabs';

$(document).ready(function () {
  const pageServices = $('.page--services');
  const pageIndustry = $('.page--industry');

  const bgcServices = pageServices.find('.page_right');
  const bgcIndustry = pageIndustry.find('.page_right');

  tabs(pageServices[0]);
  tabs(pageIndustry[0]);

  $('.tabs-element--services .tab_item').on('click', function(){
    let data = $(this).data('bgc');

    bgcServices.css({'background': `url(${data}) no-repeat center transparent`});
  })

  $('.tabs-element--industry .tab_item').on('click', function(){
    let data = $(this).data('bgc');

    bgcIndustry.css({'background': `url(${data}) no-repeat center transparent`});
  })
})
