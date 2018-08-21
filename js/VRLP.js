var start_box = document.querySelector('#start_box');
// スターウォーズのテキスト
var star_text = document.querySelector('#star_text');
var x_angle = -45; // xの回転角度
var base_z = -6; // 基準のzポジション
var cur_y = 0.0; // 現在のy
var cur_z = 0.0; // 現在のz
var clicked_box = 0; // boxが押されたかどうか

window.onload = function(){
  // ページ読み込み時に実行したい処理
  star_text.setAttribute('position', '0 0 '+cur_z+'');
  star_text.setAttribute('rotation', ''+x_angle+' 0 0');
}

// 文字を動かすための関数
function move_text(){
  cur_z -= 0.01; // zをどんどん奥に
  cur_y = (base_z - cur_z) * Math.tan((90 + x_angle) * (Math.PI / 180)); // 現在のy位置の計算
  star_text.setAttribute('position', '0 '+cur_y+' '+cur_z+''); // 位置をテキストに対応させる
}

start_box.addEventListener('click', function () {
  // 箱を押した時
  if(clicked_box == 0) {
    var text_in= setInterval( function() {
      move_text();

      if(cur_y >= 6.0) {
        // yが8より上になったらインターバルを止める
        clearInterval(text_in);
        star_text.parentNode.removeChild(star_text); // 削除する
      }
    }, 10);
    clicked_box = 1;
  }
});

// VR CAMPのタイトルテキスト
var vc = document.querySelector('#VC');

// "さあ、飛び出そうのテキスト"
var lets = document.querySelector('#jump_text');

// 透明度は1からスタート
var opacity = 1.0;
// 変化の具合
var duration = 0.01;
// 一回しかクリック出来ない様にする変数
var clicked = 0;

// 透明化する関数
function rarefaction() {
  opacity -= duration;
  vc.setAttribute('opacity', opacity);
  lets.setAttribute('opacity', opacity);
}

// 可視化する関数
function visualization() {
  opacity += duration;
  vc.setAttribute('opacity', opacity);
  lets.setAttribute('opacity', opacity);
}

// VR CAMPのplaneをクリックした時のイベント
// 両方のテキストを透明にする
vc.addEventListener('click', function () {
  if(clicked == 0) {
    // rarefactionを0.1秒に一回呼び出し
    var ra_in = setInterval( function() {
      clicked = 1;
      rarefaction();

      // インターバル止めて、可視化する
      if(opacity <= 0.0) {
        // console.info('stop!'); 確認済み
        clearInterval(ra_in);

        var vi_in = setInterval( function() {
          visualization();

          if(opacity >= 1.0) {
            clearInterval(vi_in);
            clicked = 0;
          }

        }, 10);

      }}, 10);
  }
});

var startTime;
var endTime;

// 左下にある平面1
var plane1 = document.querySelector('#plane1');
// カーソル計測の為のインターバル
var el_in;

// カーソルがぶつかったら
plane1.addEventListener('mouseenter', function(){

  plane1.emit('fade2');

  startTime = new Date(); // 開始時間測定

  // 経過時間を測る関数を0.1秒毎に回す
  el_in = setInterval( function(){
    // 3秒以上経過した時の処理
    if(elapsed_time(startTime) >= 3.0) {
      clearInterval(el_in); // インターバル止める
      plane1.emit('fade1');
    }
  });
});

// カーソルが外れたら
plane1.addEventListener('mouseleave', function(){
  clearInterval(el_in); // インターバル止める
  startTime = NaN; // startTime空にする
});

// 開始時刻(start)を渡すと、現在時刻までの経過秒を返す関数
function elapsed_time(start){
  endTime = new Date();

  var ms = endTime.getTime() - start.getTime();
  var s = ms / 1000;

  return s;
}
