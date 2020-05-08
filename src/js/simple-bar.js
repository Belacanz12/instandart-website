import $ from 'jquery';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.min.css'

$(document).ready(function(){
  new SimpleBar($('.technology')[0]);
});
