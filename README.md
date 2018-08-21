# 概要

VR-LP開発中レポジトリ

2018/08/11 : 学習開始

# 仕様書

- ボタンを押すと、スターウォーズが始まる

- スターウォーズ後は4つのボタンが並び、カーソルオンすると詳細がフォンって出てくる

# gh-pagesとGitLFS

- gh-pagesはGitLFSにあるファイルをロードしません。
  https://github.com/git-lfs/git-lfs/issues/791

- 100MB超のファイルをpushしようとするとGitHubはエラーになります。

- GitLFSを使わず、100MB内で作らないとgh-pagesは使えません。

# 重要そうなやつ

```JavaScript
document.querySelector('#id');
```
index.html内のidエンティティを取得できる

```JavaScript
element.setAttribute(name,value);
star_text.setAttribute('position', ' 0 0 '+z+' ');
vc.setAttribute('opacity', opacity);
```
指定の要素に存在する属性の値を変更する

文字列内で変数を使う時は、プラスとクオーテーションで囲んであげる

```JavaScript
entityEl.parentNode.removeChild(entityEl);
```
これでentityEl(DOM)を削除出来る

fuseとは、一定時間対象にカーソルを乗せるとクリックが発生する機能です。

デフォルトでは使えませんが、a-cursorのfuseプロパティをonにすることで有効にできます。

# アニメーション

```html
<a-animation attribute="material.opacity" begin="trigger_name" to="0"></a-animation>
```
```JavaScript
el.emit('trigger_name');
```

これでアニメーションのトリガーを付けられる、便利

同名トリガーを付ければ複数アニメを置ける

# A-Frameで音を流す

[A-Frame公式 sound](https://aframe.io/docs/0.8.0/components/sound.html#sidebar)

**iOSで流すには色々やる必要がありそう**

# 学習記録メモ

[360度画像ページ](https://aframe.io/docs/0.8.0/guides/building-a-360-image-gallery.html)の、**event-set**以降

- event-setするとページが白紙になってしまう

## font変更
```
      <a-text value="VR CAMP" font="V-GERB(bold)-msdf.json" negate="false" scale="5 5 1" position="0 3.5 -6" align="center"></a-text>
```

これで行けた、[ここ](https://msdf-bmfont.donmccurdy.com/)でjson変換

## Asset Management System

アセット機能が使えなかったのは、ローカルで実行してたから。

gh-pagesで試してみると使えるので、前のwebVR実装と同様にgh-pagesで開発していく。

## 重力の実装

Don McCurdy’s aframe-physics-system をアタッチすれば実装可。 [リンク](https://aframe.io/docs/0.8.0/introduction/html-and-primitives.html#attaching-components-to-primitives)

```
<script src="https://unpkg.com/aframe-physics-system@1.4.0/dist/aframe-physics-system.min.js"></script>
<a-scene physics>
</a-scene>
```

## environmentの変更

```
<a-scene>
  <a-assets>
    <img id="boxTexture" src="https://i.imgur.com/mYmmbrp.jpg">
    <img id="skyTexture"
      src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg">
  </a-assets>

  <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>

  <a-sky src="#skyTexture"></a-sky>
</a-scene>
```

360度画像をskyに指定すると出来る

<a-assets>を使うと上手く出来ないので、普通にsrcで指定するべき

## カメラ

```
<a-camera>
  <a-cursor></a-cursor>
</a-camera>
```

カーソルをカメラの子にすることで固定できる。

### VRインタラクティブ

```
<a-box color="red" position="-10 2 -5" rotation="0 0 45" scale="2 2 2">
  <a-animation attribute="position" to="0 2.2 -5" direction="alternate" dur="2000"
    repeat="indefinite"></a-animation>
  <!-- These animations will start when the box is looked at. -->
  <a-animation attribute="scale" begin="mouseenter" dur="300" to="3 3 3"></a-animation>
  <a-animation attribute="scale" begin="mouseleave" dur="300" to="2 2 2"></a-animation>
  <a-animation attribute="rotation" begin="click" dur="2000" to="360 405 45"></a-animation>
</a-box>
```

**mouseenter** : カーソルがオブジェクトに当たった時

**mouseleave** : カーソルがオブジェクトから外れた時

**click** : カーソルがオブジェクト上にある かつ クリックされた時

これでインタラクティブなオブジェクトを作ることが出来る

### Text

```
<a-text value="Hello, A-Frame!" color="#BBB"
        position="-0.9 0.2 -3" scale="1.5 1.5 1.5"></a-text>
```

他のやり方もあるらしい

- [Text Geometry](https://github.com/ngokevin/kframe/tree/master/components/text-geometry/) by Kevin Ngo - 3D text. More expensive to draw.

- [HTML Shader](https://github.com/mayognaise/aframe-html-shader/) by Mayo Tobita - Render HTML as a texture. Easy to style, but can be slow to compute.

### Templateコンポーネント

同じ構文をテンプレート化して、コードを簡潔にすることが出来る

```
<script src="https://unpkg.com/aframe-template-component@3.x.x/dist/aframe-template-component.min.js"></script>
```

```
<a-assets>
  <!-- ... -->
  <script id="plane" type="text/html">
    <a-entity class="link"
      geometry="primitive: plane; height: 1; width: 1"
      material="shader: flat; src: ${thumb}"
      sound="on: click; src: #click-sound"></a-entity>
  </script>
</a-assets>

<!-- ... -->

<!-- Pass image sources to the template. -->
<a-entity template="src: #plane" data-thumb="#city-thumb"></a-entity>
<a-entity template="src: #plane" data-thumb="#cubes-thumb"></a-entity>
<a-entity template="src: #plane" data-thumb="#sechelt-thumb"></a-entity>
```

`${thumb}`でデータを渡すことが出来る。
