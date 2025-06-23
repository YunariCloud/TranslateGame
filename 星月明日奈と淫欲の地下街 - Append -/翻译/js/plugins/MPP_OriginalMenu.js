//=============================================================================
// MPP_OriginalMenu.js
//=============================================================================
// Copyright (c) 2019 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.2.3】コモンイベントによるオリジナルのサブメニュー画面が作成できます。
 * @author 木星ペンギン
 * @help []内は表記しなくても動作します。
 * プラグインコマンド:
 *   AddMenuCommand name c1[ c2]      # メニューコマンド name を追加
 *   RemoveMenuCommand name           # メニューコマンド name を削除
 *   SetMenuCommandEnabled name bool  # メニューコマンド name の有効/無効化
 *   
 *   AddMenuCommandId c1[ c2]         # コモンイベントをメニューコマンドに追加
 *   RemoveMenuCommandId c1           # メインコモンイベントID c1 を削除
 *   SetMenuCommandIdEnabled c1 bool  # メインコモンイベントID c1 の有効/無効化
 * 
 *   CreateMiniMap        # ミニマップを表示(ミニマッププラグインと併用時のみ)
 *   EraceMiniMap         # ミニマップを非表示(ミニマッププラグインと併用時のみ)
 *
 * ================================================================
 * ▼ プラグインコマンド 詳細
 * --------------------------------
 *  〇 AddMenuCommand name c1[ c2]
 *       name : メニューコマンド名
 *       c1   : メインコモンイベントID
 *       c2   : サブコモンイベントID
 *   
 *   メニューコマンドを追加します。
 * 
 * --------------------------------
 *  〇 SetMenuCommandEnabled name bool
 *       name : メニューコマンド名
 *       bool : trueで有効、falseで無効
 *   
 *   メニューコマンド name の有効/無効化を変更します。
 *   
 *   無効化するとメニューコマンドが半透明で表示され、選択してもブザー音が鳴り、
 *   選択できなくなります。
 * 
 * --------------------------------
 *  〇 AddMenuCommandId c1[ c2]
 *       c1 : メインコモンイベントID
 *       c2 : サブコモンイベントID
 *   
 *   メニューコマンドを追加します。
 *   コマンド名はメインコモンイベントの名前となります。
 * 
 * ================================================================
 * ▼ その他
 * --------------------------------
 *  〇 コマンドは【並び替え】の下に追加されます。
 * 
 *  〇 サブメニューの処理はイベントコマンドで実行されます。
 *   ・メインのコモンイベントの処理が終了した時点で、前の画面に戻ります。
 *   ・サブのコモンイベントは処理が終了しても最初から繰り返しません。
 * 
 *  〇 『イベントの移動』などを実行した場合、新しくメニュー画面用のイベントが
 *    生成されます。
 *   ・座標 X:0 Y:0 にグラフィックを設定していない状態で生成されます。
 * 
 *  〇 『スクリプトコマンド』で SceneManager.goto(Scene_Map) と実行することで
 *    マップ画面まで戻ることが出来ます。
 *   ・サブメニューで実行中のイベントは中断されます。
 * 
 *  〇 『場所移動』を実行した場合、強制的にマップ画面まで戻されます。
 *   ・サブメニューで実行中のイベントは中断されます。
 *   
 *  〇 メニューコマンドは後から追加できます。
 *   ・追加するコマンドは、プラグインパラメータに設定しておく必要はありません。
 *   ・ただし、同じ名前または同じメインコモンイベントIDのコマンドは追加できません。
 *   
 * ================================
 * ●ミニマッププラグイン[MPP_MiniMap]との併用について
 *  ・ミニマップはキャラクターより上、ピクチャより下に表示されます。
 *  ・ミニマップの表示位置や可視状態の設定は、マップ画面と共用です。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Commands
 * @type struct<Command>[]
 * @desc メインメニューで表示されるコマンドの配列
 * @default []
 *
 */

/*~struct~Command:
 * @param Name
 * @desc コマンド名
 * (空の場合はコモンイベント名)
 * @default 
 *
 * @param Main Event ID
 * @type common_event
 * @desc メインで実行されるコモンイベントのID
 * @default 0
 * 
 * @param Sub Event ID
 * @type common_event
 * @desc サブで実行されるコモンイベントのID
 * @default 0
 * 
 */

(function() {

var MPPlugin = {};

(function() {
    
    var parameters = PluginManager.parameters('MPP_OriginalMenu');
    
    MPPlugin.contains = {};
    MPPlugin.contains['Minimap'] = $plugins.some(function(plugin) {
        return (plugin.name === 'MPP_MiniMap' && plugin.status);
    });
    
    function reviverEval(key, value) {
        try {
            return eval(value);
        } catch (e) {
            return value;
        }
    }
    
    var commands = JSON.parse(parameters['Commands'] || "[]");
    for (var i = 0; i < commands.length; i++) {
        commands[i] = JSON.parse(commands[i], reviverEval);
    }
    MPPlugin.commands = commands;

})();

var Alias = {};

var MenuData = {
    index: -1,
    events: [],
    mainInterpreter: null,
    subInterpreter: null,
    create: function() {
        if (!this.mainInterpreter) {
            this.events = [];
            this.mainInterpreter = new Game_Interpreter();
            this.subInterpreter = new Game_Interpreter();
            var command = $gameParty._mppMenuCommands[this.index];
            var event = $dataCommonEvents[command.mainId];
            if (event) this.mainInterpreter.setup(event.list);
            event = $dataCommonEvents[command.subId];
            if (event) this.subInterpreter.setup(event.list);
        }
    },
    update: function() {
        this.mainInterpreter.update();
        this.subInterpreter.update();
        this.events.forEach(function(event) {
            if (event) event.update();
        });
    },
    clear: function () {
        this.index = -1;
        this.events = [];
        this.mainInterpreter = null;
        this.subInterpreter = null;
    },
    reset: function () {
        var events = this.events;
        for (var i = 0; i < events.length; i++) {
            if (events[i]) events[i].requestSprite = true;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_SubMenu_Character

function Game_SubMenu_Character() {
    this.initialize.apply(this, arguments);
}

Game_SubMenu_Character.prototype = Object.create(Game_Character.prototype);
Game_SubMenu_Character.prototype.constructor = Game_SubMenu_Character;

Game_SubMenu_Character.prototype.initialize = function() {
    Game_Character.prototype.initialize.call(this);
    this.requestSprite = true;
};

Game_SubMenu_Character.prototype.canPass = function() {
    return true;
};

Game_SubMenu_Character.prototype.canPassDiagonally = function() {
    return true;
};

Game_SubMenu_Character.prototype.scrolledX = function() {
    return this._realX;
};

Game_SubMenu_Character.prototype.scrolledY = function() {
    return this._realY;
};

Game_SubMenu_Character.prototype.updateJump = function() {
    this._jumpCount--;
    this._realX = (this._realX * this._jumpCount + this._x) / (this._jumpCount + 1.0);
    this._realY = (this._realY * this._jumpCount + this._y) / (this._jumpCount + 1.0);
    this.refreshBushDepth();
    if (this._jumpCount === 0) {
        this._realX = this._x;
        this._realY = this._y;
    }
};

Game_SubMenu_Character.prototype.isOnLadder = function() {
    return false;
};

Game_SubMenu_Character.prototype.isOnBush = function() {
    return false;
};

Game_SubMenu_Character.prototype.terrainTag = function() {
    return 0;
};

Game_SubMenu_Character.prototype.regionId = function() {
    return 0;
};

Game_SubMenu_Character.prototype.moveStraight = function(d) {
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
        this.setDirection(d);
        this._x += d === 6 ? 1 : d === 4 ? -1 : 0;
        this._y += d === 2 ? 1 : d === 8 ? -1 : 0;
        this.increaseSteps();
    } else {
        this.setDirection(d);
    }
};

Game_SubMenu_Character.prototype.moveDiagonally = function(horz, vert) {
    this.setMovementSuccess(this.canPassDiagonally(this._x, this._y, horz, vert));
    if (this.isMovementSucceeded()) {
        this._x += horz === 6 ? 1 : horz === 4 ? -1 : 0;
        this._y += vert === 2 ? 1 : vert === 8 ? -1 : 0;
        this.increaseSteps();
    }
    if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
    }
};

Game_SubMenu_Character.prototype.deltaXFrom = function(x) {
    return this.x - x;
};

Game_SubMenu_Character.prototype.deltaYFrom = function(y) {
    return this.y - y;
};

//-----------------------------------------------------------------------------
// Game_Screen

//74
Alias.GaSc_realPictureId = Game_Screen.prototype.realPictureId;
Game_Screen.prototype.realPictureId = function(pictureId) {
    if (!$gameParty.inBattle() && MenuData.index >= 0) {
        return pictureId + this.maxPictures() * 2;
    } else {
        return Alias.GaSc_realPictureId.call(this, pictureId);
    }
};

//-----------------------------------------------------------------------------
// Game_Party

//21
Alias.GaPa_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Alias.GaPa_initialize.call(this);
    this._mppMenuCommands = [];
    var commands = MPPlugin.commands;
    for (var i = 0; i < commands.length; i++) {
        var name = commands.Name;
        var mainId = commands['Main Event ID'] || 0;
        var subId = commands['Sub Event ID'] || 0;
        this.addMenuCommand(name, mainId, subId);
    }
};

Game_Party.prototype.addMenuCommand = function(name, mainId, subID) {
    var commands = this._mppMenuCommands;
    for (var i = 0; i < commands.length; i++) {
        if (name && commands[i].name === name) return;
        if (!name && commands[i].mainId === mainId) return;
    }
    this._mppMenuCommands.push({
        name:name, mainId:mainId || 0, subID:subID || 0, enabled:true
    });
};

Game_Party.prototype.removeMenuCommand = function(name) {
    this._mppMenuCommands = this._mppMenuCommands.filter(function(cmd) {
        return cmd.name !== name;
    });
};

Game_Party.prototype.setMenuCommandEnabled = function(name, enabled) {
    var commands = this._mppMenuCommands;
    for (var i = 0; i < commands.length; i++) {
        if (commands[i].name === name) {
            commands[i].enabled = enabled;
            return;
        }
    }
};

Game_Party.prototype.removeMenuCommandId = function(id) {
    this._mppMenuCommands = this._mppMenuCommands.filter(function(cmd) {
        return cmd.mainId !== id;
    });
};

Game_Party.prototype.setMenuCommandIdEnabled = function(id, enabled) {
    var commands = this._mppMenuCommands;
    for (var i = 0; i < commands.length; i++) {
        if (commands[i].mainId === id) {
            commands[i].enabled = enabled;
            return;
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter

//266
Alias.GaIn_character = Game_Interpreter.prototype.character;
Game_Interpreter.prototype.character = function(param) {
    if (MenuData.index < 0) {
        return Alias.GaIn_character.call(this, param);
    } else if (param > 0) {
        if (!MenuData.events[param]) {
            MenuData.events[param] = new Game_SubMenu_Character();
        }
        return MenuData.events[param];
    } else {
        return null;
    }
};

//1722
Alias.GaIn_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Alias.GaIn_pluginCommand.call(this, command, args);
    switch (command) {
    case 'AddMenuCommand':
        $gameParty.addMenuCommand(args[0], Number(args[1]), Number(args[2]));
        break;
    case 'RemoveMenuCommand':
        $gameParty.removeMenuCommand(args[0]);
        break;
    case 'SetMenuCommandEnabled':
        $gameParty.setMenuCommandEnabled(args[0], !!eval(args[1]));
        break;
    case 'AddMenuCommandId':
        $gameParty.addMenuCommand(null, Number(args[0]), Number(args[1]));
        break;
    case 'RemoveMenuCommandId':
        $gameParty.removeMenuCommandId(args[0]);
        break;
    case 'SetMenuCommandIdEnabled':
        $gameParty.setMenuCommandIdEnabled(args[0], !!eval(args[1]));
        break;
    case 'CreateMiniMap':
        if (MPPlugin.contains['Minimap']) {
            var spriteset = SceneManager._scene._spriteset;
            if (spriteset) spriteset.createMinimap();
        }
        break;
    case 'EraceMiniMap':
        if (MPPlugin.contains['Minimap']) {
            var spriteset = SceneManager._scene._spriteset;
            if (spriteset) spriteset.eraseMinimap();
        }
        break;
    }
};

//-----------------------------------------------------------------------------
// Window_MenuCommand

//64
Alias.WiMeCo_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Alias.WiMeCo_addOriginalCommands.call(this);
    var commands = $gameParty._mppMenuCommands;
    for (var i = 0; i < commands.length; i++) {
        var name = commands[i].name;
        if (!name) {
            var event = $dataCommonEvents[commands[i].mainId];
            name = event ? event.name : '';
        }
        if (name) this.addCommand(name, 'mppCommand' + i, commands[i].enabled);
    }
};

//-----------------------------------------------------------------------------
// Spriteset_SubMenu

function Spriteset_SubMenu() {
    this.initialize.apply(this, arguments);
}

Spriteset_SubMenu.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_SubMenu.prototype.constructor = Spriteset_SubMenu;

Spriteset_SubMenu.prototype.initialize = function() {
    Spriteset_Base.prototype.initialize.call(this);
    this._blackScreen.opacity = 0;
};

Spriteset_SubMenu.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this._characterContainer = new Sprite();
    this.addChild(this._characterContainer);
};

Spriteset_SubMenu.prototype.createPictures = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var x = (Graphics.width - width) / 2;
    var y = (Graphics.height - height) / 2;
    this._pictureContainer = new Sprite();
    this._pictureContainer.setFrame(x, y, width, height);
    for (var i = 1; i <= $gameScreen.maxPictures(); i++) {
        this._pictureContainer.addChild(new Sprite_Picture(i));
    }
    this.addChild(this._pictureContainer);
};

Spriteset_SubMenu.prototype.createMinimap = function() {
    if (!this._minimap) {
        this._minimap = new Sprite_MiniMap();
        var index = this.children.indexOf(this._pictureContainer);
        this.addChildAt(this._minimap, index);
    }
};

Spriteset_SubMenu.prototype.eraseMinimap = function() {
    if (this._minimap) {
        this.removeChild(this._minimap);
        this._minimap = null;
    }
};

Spriteset_SubMenu.prototype.update = function() {
    Spriteset_Base.prototype.update.call(this);
    this.updateCharacters();
};

Spriteset_SubMenu.prototype.hideCharacters = function() {
    this._characterContainer.visible = false;
};

Spriteset_SubMenu.prototype.updateCharacters = function() {
    var events = MenuData.events;
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        if (event && event.requestSprite) {
            var sprite = new Sprite_Character(event);
            this._characterContainer.addChild(sprite);
            event.requestSprite = false;
        }
    }
    this._characterContainer.children.sort(this._compareChildOrder.bind(this));
};

Spriteset_SubMenu.prototype._compareChildOrder = function(a, b) {
    if (a.z !== b.z) {
        return a.z - b.z;
    } else if (a.y !== b.y) {
        return a.y - b.y;
    } else {
        return a.spriteId - b.spriteId;
    }
};

//-----------------------------------------------------------------------------
// Scene_Menu

//29
Alias.ScMe_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Alias.ScMe_createCommandWindow.call(this);
    var commands = $gameParty._mppMenuCommands;
    for (var i = 0; i < commands.length; i++) {
        this._commandWindow.setHandler('mppCommand' + i, this.commandSubMenu.bind(this, i));
    }
};

Scene_Menu.prototype.commandSubMenu = function(index) {
    MenuData.index = index;
    SceneManager.push(Scene_MppSubMenu);
};

//-----------------------------------------------------------------------------
// Scene_MppSubMenu

function Scene_MppSubMenu() {
    this.initialize.apply(this, arguments);
}

Scene_MppSubMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MppSubMenu.prototype.constructor = Scene_MppSubMenu;

Scene_MppSubMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    this._encounterEffectDuration = 0;
};
Scene_Base.prototype.isOriMenu = function() {
    return false;
};
Scene_MppSubMenu.prototype.isOriMenu = function() {
    return true;
};

Scene_MppSubMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    MenuData.create();
    this.createSpriteset();
    this.createMessageWindow();
    this.createScrollTextWindow();
};

Scene_MppSubMenu.prototype.createSpriteset = function() {
    this._spriteset = new Spriteset_SubMenu();
    var index = this.children.indexOf(this._backgroundSprite);
    this.addChildAt(this._spriteset, index + 1);
};

Scene_MppSubMenu.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Message();
    this.addWindow(this._messageWindow);
    this._messageWindow.subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};

Scene_MppSubMenu.prototype.createScrollTextWindow = function() {
    this._scrollTextWindow = new Window_ScrollText();
    this.addWindow(this._scrollTextWindow);
};

Scene_MppSubMenu.prototype.update = function() {
    if (this.isActive()) {
        this.updateMain();
    }
    if (this.isSceneChangeOk()) {
        this.updateScene();
    } else if (SceneManager.isNextScene(Scene_Battle)) {
        Scene_Map.prototype.updateEncounterEffect.call(this);
    }
    Scene_MenuBase.prototype.update.call(this);
};

Scene_MppSubMenu.prototype.updateMain = function() {
    MenuData.update();
    if (!MenuData.mainInterpreter.isRunning()) {
        this.popScene();
        return;
    }
    $gameScreen.update();
};

Scene_MppSubMenu.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    if (this.needsSlowFadeOut()) {
        this.startFadeOut(this.slowFadeSpeed(), false);
    } else if (SceneManager.isNextScene(Scene_Map)) {
        this.fadeOutForTransfer();
    } else if (SceneManager.isNextScene(Scene_Battle)) {
        this.launchBattle.call(this);
    }
};

Scene_MppSubMenu.prototype.isBusy = function() {
    return ((this._messageWindow && this._messageWindow.isClosing()) ||
            this._encounterEffectDuration > 0 || Scene_MenuBase.prototype.isBusy.call(this));
};

Scene_MppSubMenu.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    if (SceneManager.isNextScene(Scene_Menu) || SceneManager.isNextScene(Scene_Map)) {
        MenuData.clear();
        $gameScreen.eraseBattlePictures();
    } else {
        MenuData.reset();
    }
    $gameScreen.clearZoom();
};

Scene_MppSubMenu.prototype.needsSlowFadeOut = function() {
    return (SceneManager.isNextScene(Scene_Title) ||
            SceneManager.isNextScene(Scene_Gameover));
};

Scene_MppSubMenu.prototype.launchBattle = function() {
    BattleManager.saveBgmAndBgs();
    Scene_Map.prototype.stopAudioOnBattleStart.call(this);
    SoundManager.playBattleStart();
    Scene_Map.prototype.startEncounterEffect.call(this);
};

Scene_MppSubMenu.prototype.isSceneChangeOk = function() {
    return this.isActive() && !$gameMessage.isBusy();
};

Scene_MppSubMenu.prototype.updateScene = function() {
    this.checkGameover();
    if (!SceneManager.isSceneChanging()) {
        this.updateTransferPlayer();
    }
};

Scene_MppSubMenu.prototype.updateTransferPlayer = 
        Scene_Map.prototype.updateTransferPlayer;

Scene_MppSubMenu.prototype.fadeOutForTransfer = 
        Scene_Map.prototype.fadeOutForTransfer;

Scene_MppSubMenu.prototype.snapForBattleBackground = function() {
};

Scene_MppSubMenu.prototype.startFlashForEncounter = 
        Scene_Map.prototype.startFlashForEncounter;

Scene_MppSubMenu.prototype.encounterEffectSpeed =
        Scene_Map.prototype.encounterEffectSpeed;



})();
