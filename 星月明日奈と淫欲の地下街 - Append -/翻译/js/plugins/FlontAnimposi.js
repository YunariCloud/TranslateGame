//============================================================================
// FlontAnimposi.js
//============================================================================

/*:ja
 * @plugindesc ver1.00 フロントビューでのアニメ位置を調整
 * @author まっつＵＰ
 *
 * @param dummyX
 * @desc アニメ表示のx座標の基準（0未満可）
 * @type number
 * @min -1600
 * @max 1600
 * @default 408
 *
 * @param dummyY
 * @desc アニメ表示のy座標の基準（0未満可）
 * @type number
 * @min -1200
 * @max 1200
 * @default 312
 *
 * @param dummyX2
 * @desc アニメ表示のx座標の
 * アクターのindexによる補正（0未満可）
 * @type number
 * @min -1200
 * @max 1200
 * @default 0
 *
 * @param dummyY2
 * @desc アニメ表示のy座標の
 * アクターのindexによる補正（0未満可）
 * @type number
 * @min -1200
 * @max 1200
 * @default 0
 *
 * @help
 *
 * RPGで笑顔を・・・
 *
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 *
 * フロントビュー選択時、
 * サイドビューアクターの基本の位置を指定位置に変更し
 * その位置にアニメーションを表示させます。
 *
 * 利用規約(2019/9/7変更)：
 * この作品は マテリアル・コモンズ・ブルー・ライセンスの下に提供されています。
 * https://materialcommons.tk/mtcm-b-summary/
 * クレジット表示：まっつＵＰ
 *
 */

(function() {

var parameters = PluginManager.parameters('FlontAnimposi');
var FAdummyX = Number(parameters['dummyX']);
var FAdummyY = Number(parameters['dummyY']);
var FAdummyX2 = Number(parameters['dummyX2']);
var FAdummyY2 = Number(parameters['dummyY2']);

var _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if(!$gameSystem.isSideView()){
        this.setHome(FAdummyX + index * FAdummyX2, FAdummyY + index * FAdummyY2);
    }else{
        _Sprite_Actor_setActorHome.call(this, index);
    }
};

var _Sprite_Battler_setupAnimation = Sprite_Battler.prototype.setupAnimation;
Sprite_Battler.prototype.setupAnimation = function() {
    if(!$gameSystem.isSideView()){
        while (this._battler.isAnimationRequested()) {
            var data = this._battler.shiftAnimation();
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
        }
    }else{
        _Sprite_Battler_setupAnimation.call(this);
    }
};

})();
