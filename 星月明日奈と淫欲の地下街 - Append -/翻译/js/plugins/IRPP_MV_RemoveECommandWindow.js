//=============================================================================
// IRPP_MV_RemoveECommandWindow.js
//=============================================================================

/*:
 * @plugindesc (※最上部)装備画面から最強装備や全て外すのコマンドを除去します。
 * @author イロスマRPG制作委員会
 *
 * @help このプラグインはIRPP_MV_EquipCommandEXとの併用はできません。
 * また、装備画面のレイアウトを変更する他のプラグインとの併用はできません。
 * デフォルトで表示されている「最強装備」等のコマンドを除去し、
 * 装備画面を最適化します。
 * これにより、無駄な動作がなくなります。
 */

var Imported = Imported || {};
Imported.IRPP_MV_RemoveECommandWindow = true;
(function() {
Scene_Equip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createStatusWindow();
    this.createCommandWindow();
    this.createSlotWindow();
    this.createItemWindow();
    this.refreshActor();
    this._commandWindow.deselect();
    this._slotWindow.activate();
    this._slotWindow.select(0);
};

Scene_Equip.prototype.createCommandWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    this._commandWindow = new Window_EquipCommand(wx, wy, ww);
};

Scene_Equip.prototype.createSlotWindow = function() {
    var wx = this._statusWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - this._statusWindow.width;
    var wh = this._statusWindow.height;
    this._slotWindow = new Window_EquipSlot(wx, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setStatusWindow(this._statusWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.addWindow(this._slotWindow);
};

Scene_Equip.prototype.onSlotCancel = function() {
    this._slotWindow.deselect();
    this.popScene();
};

Scene_Equip.prototype.onActorChange = function() {
    this.refreshActor();
    this._slotWindow.activate();
    this._slotWindow.select(0);
};
})();