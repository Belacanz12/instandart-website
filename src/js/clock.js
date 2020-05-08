import $ from 'jquery';

Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock() {
  var now = new Date();
  var min = now.getMinutes(),
    hou = now.getHours(),
    am_pm = hou > 12 ? 'PM' : 'AM';

  var tags = ["h", "m", "am"],
    corr = [hou.pad(2), min.pad(2), am_pm];

  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).innerText = corr[i];
}

function initClock() {
  updateClock();
  setInterval(updateClock, 1000*60);
}

$(document).ready(function(){
  initClock();
});

