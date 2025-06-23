//==================================================
// ShowPortrait.js
//==================================================

/*:
 * @plugindesc 変数、能力値、装備に依存して変化する立ち絵を表示します。
 * @auther 優輝
 * 
 * @param portraitLayers
 * @desc 立ち絵を何枚の画像で構成するか指定します(初期値:5)
 * @default 5
 * 
 * @param firstLayerNum
 * @desc 立ち絵の最下層となるピクチャの番号を1～100で指定します(初期値:96)
 * @default 96
 * 
 * @param xCoordinate
 * @desc 中央を原点とした立ち絵のX座標を指定します(初期値:408)
 * @default 408
 * 
 * @param yCoordinate
 * @desc 中央を原点とした立ち絵のY座標を指定します(初期値:312)
 * @default 312
 * 
 * @param xExpansionRate
 * @desc 立ち絵の横拡大率を指定します(初期値:100)
 * @default 100
 * 
 * @param yExpansionRate
 * @desc 立ち絵の縦拡大率を指定します(初期値:100)
 * @default 100
 * 
 * @param showBattlePortrait
 * @desc 1にした場合、戦闘開始時に自動で立ち絵が表示されるようになります(無効:-1)
 * @default -1
 * 
 * @param battleXCoordinate
 * @desc 中央を原点とした戦闘中の立ち絵のX座標を指定します(初期値:マップ立ち絵と同じ)
 * 
 * @param battleYCoordinate
 * @desc 中央を原点とした戦闘中の立ち絵のY座標を指定します(初期値:マップ立ち絵と同じ)
 * 
 * @param battleXExpansionRate
 * @desc 戦闘中の立ち絵の横拡大率を指定します(初期値:マップ立ち絵と同じ)
 * 
 * @param battleYExpansionRate
 * @desc 戦闘中の立ち絵の縦拡大率を指定します(初期値:マップ立ち絵と同じ)
 * 
 * @param --------------------
 * @desc 使用しません
 * 
 * @param filename1
 * @desc 1層目(最下層)の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename2
 * @desc 2層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename3
 * @desc 3層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename4
 * @desc 4層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename5
 * @desc 5層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename6
 * @desc 6層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename7
 * @desc 7層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename8
 * @desc 8層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename9
 * @desc 9層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename10
 * @desc 10層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename11
 * @desc 11層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename12
 * @desc 12層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename13
 * @desc 13層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename14
 * @desc 14層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename15
 * @desc 15層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename16
 * @desc 16層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename17
 * @desc 17層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename18
 * @desc 18層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename19
 * @desc 19層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename20
 * @desc 20層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename21
 * @desc 21層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename22
 * @desc 22層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename23
 * @desc 23層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename24
 * @desc 24層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename25
 * @desc 25層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename26
 * @desc 26層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename27
 * @desc 27層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename28
 * @desc 28層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename29
 * @desc 29層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename30
 * @desc 30層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename31
 * @desc 31層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename32
 * @desc 32層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename33
 * @desc 33層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename34
 * @desc 34層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename35
 * @desc 35層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename36
 * @desc 36層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename37
 * @desc 37層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename38
 * @desc 38層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename39
 * @desc 39層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename40
 * @desc 40層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename41
 * @desc 41層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename42
 * @desc 42層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename43
 * @desc 43層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename44
 * @desc 44層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename45
 * @desc 45層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename46
 * @desc 46層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename47
 * @desc 47層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename48
 * @desc 48層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename49
 * @desc 49層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename50
 * @desc 50層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename51
 * @desc 51層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename52
 * @desc 52層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename53
 * @desc 53層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename54
 * @desc 54層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename55
 * @desc 55層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename56
 * @desc 56層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename57
 * @desc 57層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename58
 * @desc 58層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename59
 * @desc 59層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename60
 * @desc 60層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename61
 * @desc 61層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename62
 * @desc 62層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename63
 * @desc 63層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename64
 * @desc 64層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename65
 * @desc 65層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename66
 * @desc 66層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename67
 * @desc 67層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename68
 * @desc 68層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename69
 * @desc 69層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename70
 * @desc 70層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename71
 * @desc 71層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename72
 * @desc 72層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename73
 * @desc 73層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename74
 * @desc 74層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename75
 * @desc 75層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename76
 * @desc 76層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename77
 * @desc 77層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename78
 * @desc 78層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename79
 * @desc 79層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename80
 * @desc 80層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename81
 * @desc 81層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename82
 * @desc 82層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename83
 * @desc 83層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename84
 * @desc 84層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename85
 * @desc 85層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename86
 * @desc 86層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename87
 * @desc 87層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename88
 * @desc 88層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename89
 * @desc 89層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename90
 * @desc 90層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename91
 * @desc 91層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename92
 * @desc 92層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename93
 * @desc 93層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename94
 * @desc 94層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename95
 * @desc 95層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename96
 * @desc 96層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename97
 * @desc 97層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename98
 * @desc 98層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename99
 * @desc 99層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @param filename100
 * @desc 100層目の画像ファイルの命名規則を指定します(書式はヘルプ記載)
 * 
 * @help
 * マップイベントに利用可能な立ち絵を表示します。
 * 変数、能力値、装備等が変化した場合には、対応する画像へと自動的に変更します。
 * 
 * 利用方法：
 * プラグインコマンド「ShowPortrait」で立ち絵が表示されます。
 * 消去する際はプラグインコマンド「ErasePortrait」を実行してください。
 * 
 * ファイルの命名規則：
 * 命名規則に利用できるものは、
 * ・変数の値(VARX)(X：変数番号)
 * 及び、
 * パーティの先頭アクターの
 * ・アクターID(AID)
 * ・レベル(LEV)
 * ・HP、MP、TPの現在値(CHP、CMP、CTP)
 * ・HP、MP、TPの現在値の、最大値に対する割合(RHP、RMP、RTP)
 * ・最大HP(MHP)、最大MP(MMP)、ATK、DEF、MAT、MDF、AGI、LUC
 * ・装備ID(EQUX)(X：装備タイプ)
 * の18種です。
 * 
 * 対応するプラグインパラメータに「(パーツ名)_(命名規則1)_(命名規則2)_(命名規則3)_etc...」と入力してください。
 * (例：Body_HP_VAR1_EQU4)
 * 
 * プラグインコマンド「ShowPortrait」実行時、(命名規則X)の値に対応するファイル名の画像が読み込まれます。
 * (上記の例の場合、
 *   HPが50%、変数1の値が2、装備タイプ4(デフォルトで身体)に服(ID3)を装備していた場合、
 * 「Body_50_2_3.png」を最下層に表示します)
 * 
 * 注意：このプラグインは対応する画像ファイルが存在しない場合をサポートしていません。
 *       「条件によって一部のパーツを表示しない」必要がある場合は、次の1.または2.の手段を取ってください。
 *       1.「透明背景のみ」の何も表示されない画像ファイルを作成する
 *       2.読み込みエラーを無視するプラグインを導入する(推奨)
 * 
 * 注意：パーティにアクターが1人もいない場合、変数以外の(命名規則X)の値は0になります。
 * 
 * オプション：
 * ・戦闘時自動立ち絵表示
 *     "showBattlePortrait"を1にした場合、戦闘開始時、自動で立ち絵が表示されるようになります。
 *     この設定は、プラグインコマンド「EnableBattlePortrait」／「DisableBattlePortrait」によって切り替える事も可能です。
 *     戦闘中に実行した場合、プラグインコマンド「ShowPortrait」／「ErasePortrait」と同様に立ち絵を表示／消去します。
 * 
 * ・段階切り替え表示
 *     filenameに「(命名規則X)=(段階1),(段階2),(段階3),etc...」と記述する事で、その値以上で最も近い(段階X)の画像を表示します。
 *     全ての(段階X)より大きい値の場合、「Over」が(命名規則X)に対応します。
 *     「Body_LVS=10_VAR2=0,50_EQU2」等、命名規則それぞれに段階を設定可能です。
 *     (例1：「Body_HP=0,50」と指定した場合、HPが0%以下の時「Body_0.png」、50%以下の時「Body_50.png」、それより大きい時「Body_Over.png」を読み込みます)
 * 
 * このプラグインはRPGツクールMV作品に限り、商用・非商用、全年齢・アダルト等の制限なく利用可能です。
 * 再配布に制限は設けませんが、改変を行う場合、改変箇所を明示してください。
 * クレジット表示は義務ではありませんが、していただけると幸いです。
 * 
 * このプラグインの利用及びそれに関連して生じたあらゆる損害等について、一切の責任を負わないものとします。
 */

(function() {
    'use strict';
    var parameters = PluginManager.parameters('ShowPortrait');
    var portraitLayers = Number(parameters['portraitLayers'])||5;
    var firstLayerNum = Number(parameters['firstLayerNum'])||96;
    if ((portraitLayers + firstLayerNum) > 101) {
        portraitLayers = 101 - firstLayerNum;
    }
    var xCoordinate = Number(parameters['xCoordinate'])||408;
    var yCoordinate = Number(parameters['yCoordinate'])||312;
    var xExpansionRate = Number(parameters['xExpansionRate'])||100;
    var yExpansionRate = Number(parameters['yExpansionRate'])||100;
    var showBattlePortrait = Number(parameters['showBattlePortrait'])||-1;
    var battleXCoordinate = Number(parameters['battleXCoordinate'])||xCoordinate;
    var battleYCoordinate = Number(parameters['battleYCoordinate'])||yCoordinate;
    var battleXExpansionRate = Number(parameters['battleXExpansionRate'])||xExpansionRate;
    var battleYExpansionRate = Number(parameters['battleYExpansionRate'])||yExpansionRate;

    var portraitNamingRule = [];
    var portraitFileName = [];
    for (var i=0;i<portraitLayers;i++) {
        portraitNamingRule[i] = parameters['filename'+ (i + 1)].split('_');
    }

    var showPortraitFlag = false;
    var showBattlePortraitFlag = false;

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command.toUpperCase() == "SHOWPORTRAIT"){
            if (SceneManager._scene.constructor === Scene_Map) {
                showPortraitFlag = true;
                GSShowPortrait.call(this, xCoordinate, yCoordinate, xExpansionRate, yExpansionRate);
            }
            else if (SceneManager._scene.constructor === Scene_Battle) {
                showBattlePortraitFlag = true;
                GSShowPortrait.call(this, battleXCoordinate, battleYCoordinate, battleXExpansionRate, battleYExpansionRate);
            }
        }
        else if (command.toUpperCase() == "ERASEPORTRAIT"){
            if (SceneManager._scene.constructor === Scene_Map) {
                //showPortraitFlag = false;
            }
            else if (SceneManager._scene.constructor === Scene_Battle) {
                showBattlePortraitFlag = false;
            }
            GSErasePortrait.call(this);
        }
        else if (command.toUpperCase() == "ENABLEBATTLEPORTRAIT"){
            showBattlePortrait = 1;
            if (SceneManager._scene.constructor === Scene_Battle) {
                showBattlePortraitFlag = true;
                GSShowPortrait.call(this, battleXCoordinate, battleYCoordinate, battleXExpansionRate, battleYExpansionRate);
            }
        }
        else if (command.toUpperCase() == "DISABLEBATTLEPORTRAIT"){
            showBattlePortrait = -1;
            if (SceneManager._scene.constructor === Scene_Battle) {
                showBattlePortraitFlag = false;
                GSErasePortrait.call(this);
            }
        }
    };

    var _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        showPortraitFlag = false;
        showBattlePortrait = Number(parameters['showBattlePortrait'])||-1;
    };

    var _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        _Game_Variables_setValue.call(this, variableId, value);
        GSShowPortraitWithScene.call(this);
    };

    var _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);
        GSShowPortraitWithScene.call(this);
    };

    var _Game_Actor_levelDown = Game_Actor.prototype.levelDown;
    Game_Actor.prototype.levelDown = function() {
        _Game_Actor_levelDown.call(this);
        GSShowPortraitWithScene.call(this);
    };

    var _Game_BattlerBase_addParam = Game_BattlerBase.prototype.addParam;
    Game_BattlerBase.prototype.addParam = function(paramId, value) {
        _Game_BattlerBase_addParam.call(this, paramId, value);
        GSShowPortraitWithScene.call(this);
    };

    var _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function(slotId, item) {
        _Game_Actor_changeEquip.call(this, slotId, item);
        GSShowPortraitWithScene.call(this);
    };

    var _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
        _Game_Actor_forceChangeEquip.call(this, slotId, item);
        GSShowPortraitWithScene.call(this);
    };

    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        GSShowPortraitWithScene.call(this);
    };

    var actorTmp = [0,0,0,0];
    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if ($gameParty.members()[0] !== undefined) {
            if (actorTmp[0] !== $gameParty.members()[0].actorId() || actorTmp[1] !== $gameParty.members()[0].hp || actorTmp[2] !== $gameParty.members()[0].mp || actorTmp[3] !== $gameParty.members()[0].tp) {
                actorTmp[0] = $gameParty.members()[0].actorId();
                actorTmp[1] = $gameParty.members()[0].hp;
                actorTmp[2] = $gameParty.members()[0].mp;
                actorTmp[3] = $gameParty.members()[0].tp;
                GSShowPortraitWithScene.call(this);
            }
        }
    };

    //var _Scene_Map_terminate = Scene_Map.prototype.terminate;
   // Scene_Map.prototype.terminate = function() {
	//GSErasePortrait.call(this);
   //     _Scene_Map_terminate.call(this);
   // };

    var _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        showBattlePortraitFlag = (showBattlePortrait === 1) ? true : false;
        GSShowPortraitWithScene.call(this);
    };

    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        if ($gameParty.members()[0] !== undefined) {
            if (actorTmp[0] !== $gameParty.members()[0].actorId() || actorTmp[1] !== $gameParty.members()[0].hp || actorTmp[2] !== $gameParty.members()[0].mp || actorTmp[3] !== $gameParty.members()[0].tp) {
                actorTmp[0] = $gameParty.members()[0].actorId();
                actorTmp[1] = $gameParty.members()[0].hp;
                actorTmp[2] = $gameParty.members()[0].mp;
                actorTmp[3] = $gameParty.members()[0].tp;
                GSShowPortraitWithScene.call(this);
            }
        }
    };

    var _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
	GSErasePortrait.call(this);
        _Scene_Battle_terminate.call(this);
    };

    var GSRenewFileName = function() {
        for (var i=0;i<portraitLayers;i++) {
            portraitFileName[i] = portraitNamingRule[i][0];
            var namingRuleMax = portraitNamingRule[i].length;
            for (var j=1;j<namingRuleMax;j++) {
                var target = portraitNamingRule[i][j];
                var stage = [];
                var index = target.indexOf('=');
                if (index != -1) {
                    stage = target.slice(index + 1).split(',');
                    target = target.substring(0, index);
                }
                var tarNum = Number(target.slice(3))||0;
                target = target.substr(0,3).toUpperCase();
                var curVal = '';
                switch (target) {
                    case 'VAR':
                        if (tarNum>0) {
                            curVal = $gameVariables.value(tarNum);
                        }
                        break;
                    case 'AID':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].actorId();
                        break;
                    case 'LEV':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].level;
                        break;
                    case 'CHP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].hp;
                        break;
                    case 'CMP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].mp;
                        break;
                    case 'CTP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].tp;
                        break;
                    case 'RHP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : Math.ceil($gameParty.members()[0].hpRate() * 100);
                        break;
                    case 'RMP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : Math.ceil($gameParty.members()[0].mpRate() * 100);
                        break;
                    case 'RTP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : Math.ceil($gameParty.members()[0].tpRate() * 100);
                        break;
                    case 'MHP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].mhp;
                        break;
                    case 'MMP':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].mmp;
                        break;
                    case 'ATK':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].atk;
                        break;
                    case 'DEF':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].def;
                        break;
                    case 'MAT':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].mat;
                        break;
                    case 'MDF':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].mdf;
                        break;
                    case 'AGI':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].agi;
                        break;
                    case 'LUC':
                        curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0].luk;
                        break;
                    case 'EQU':
                        if (tarNum>0) {
                            curVal = $gameParty.members()[0] === undefined ? 0 : $gameParty.members()[0]._equips[tarNum-1]._itemId;
                        }
                        break;
                }
                if (curVal !== '') {
                    if (index != -1) {
                        var stageMax = stage.length;
                        var k;
                        for (k=0;k<stageMax;k++) {
                            var curStage = parseInt(stage[k],10);
                            if (!isNaN(curStage) && curVal <= curStage) {
                                break;
                            }
                        }
                        if (k<stageMax) {
                            portraitFileName[i] += '_' + curStage;
                        } 
                        else {
                            portraitFileName[i] += '_Over';
                        }
                    }
                    else {
                        portraitFileName[i] += '_' + curVal;
                    }
                }
            }
        }
    };

    var GSShowPortraitWithScene = function() {
        if ((SceneManager._scene.constructor === Scene_Map) && showPortraitFlag) {
            GSShowPortrait.call(this, xCoordinate, yCoordinate, xExpansionRate, yExpansionRate);
        }
        else if ((SceneManager._scene.constructor === Scene_Battle) && showBattlePortraitFlag) {
            GSShowPortrait.call(this, battleXCoordinate, battleYCoordinate, battleXExpansionRate, battleYExpansionRate);
        }
    };

    var GSShowPortrait = function(xCo, yCo, xEx, yEx) {
        GSRenewFileName.call(this);
        for (var i=0;i<portraitLayers;i++) {
            $gameScreen.showPicture(i + firstLayerNum, portraitFileName[i], 1, xCo, yCo, xEx, yEx, 255, 0);
        }
    };

    var GSErasePortrait = function() {
        for (var i=0;i<portraitLayers;i++) {
            $gameScreen.erasePicture(i + firstLayerNum);
        }
    };
})();