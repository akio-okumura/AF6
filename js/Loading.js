// ローディングをcssとjQueryで実装する
// 参考サイト[https://kigiroku.com/frontend/loder.html]

var sky = document.querySelector('#sky');

$(document).ready(function() {
  // ロード前まではskyの色を青に設定している
  $(sky).attr('color', '#0085C9');
});

$(window).on("load",function () {
  $(sky).attr('color', '#FFFFFF');
  $(sky).attr('src', '#skyTexture');
});
