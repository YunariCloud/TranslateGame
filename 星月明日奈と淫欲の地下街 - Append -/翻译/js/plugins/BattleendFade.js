//=============================================================================
// BattleendFade.js
//=============================================================================

/*:ja
 * @plugindesc ver1.00 八百長不可避
 * @author まっつＵＰ
 * 
 * @param switchId
 * @desc このIDのスイッチがオンの時
 * 戦闘終了時にマップbgm等の再開を行いません。
 * @type switch
 * @default 10
 * 
 * @param switchId2
 * @desc このIDのスイッチがオンの時
 * 戦闘終了時にフェードインしません。
 * @type switch
 * @default 10
 *
 * @help
 * 
 * RPGで笑顔を・・・
 * 
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 * 
 * パラメータswitchIdのスイッチにより
 * 戦闘終了時も戦闘bgmが垂れ流しになります。
 * この場合でも
 * スイッチをオフにした後にスクリプトで
 * BattleManager.replayBgmAndBgs();
 * を処理すれば戦闘前のbgmやbgsを流すことができます。
 * 
 * パラメータswitchId2のスイッチにより
 * バトルシーン終了時とマップシーン再開時に起こる
 * フェードインを無効にすることができます。
 * この機能によってフェードインを無効にした時は
 * イベントコマンド「画面のフェードイン」を使ってください。
 * 
 * このプラグインを利用する場合は
 * readmeなどに「まっつＵＰ」の名を入れてください。
 * また、素材のみの販売はダメです。
 * 上記以外の規約等はございません。
 * もちろんツクールMVで使用する前提です。
 * 何か不具合ありましたら気軽にどうぞ。
 *  
 * 免責事項：
 * このプラグインを利用したことによるいかなる損害も制作者は一切の責任を負いません。
 * 
 */

(function() {

var parameters = PluginManager.parameters('BattleendFade');
var BFswitchId = Number(parameters['switchId'] || 10);
var BFswitchId2 = Number(parameters['switchId2'] || 10);

var _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
BattleManager.replayBgmAndBgs = function() {
    if($gameSwitches.value(BFswitchId)) return;
    _BattleManager_replayBgmAndBgs.call(this);
};

var _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
    if($gameSwitches.value(BFswitchId2)) $gameScreen.startFadeOut(24);
    _BattleManager_updateBattleEnd.call(this);
};
 
})();
