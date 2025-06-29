﻿// DarkPlasma_ShopStock
// Copyright (c) 2019 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2020/05/19 2.2.2 DarkPlasma_ShopBuyByCategory.js と併用するとエラーになる不具合を修正
 *            2.2.1 売り切れ商品が購入できる不具合を修正
 *                  ニューゲーム開始時に前回の在庫数を引き継ぐ不具合を修正
 * 2020/05/05 2.2.0 売り切れ商品を末尾に表示するか選択する設定を追加
 *                  商品の順番が環境によって元と変化してしまう不具合を修正
 * 2020/04/23 2.1.0 同一リスト内で同一アイテムIDに対して異なる在庫数を設定可能
 *                  アイテム売却時に在庫に追加する設定項目を追加
 * 2020/04/21 2.0.3 デフォルト在庫リストIDが有効でなかった不具合を修正
 *            2.0.2 add english help
 * 2020/04/13 2.0.1 セーブデータをロードした時にエラーになる不具合を修正
 * 2020/04/11 2.0.0 大規模リファクタ/機能追加。1.0.0からのセーブデータ互換性なし
 *                  戦闘回数や経過時間による在庫補充機能追加
 * 2019/09/23 1.0.0 公開
 */
/*:
 * @plugindesc Shop with stock plugin
 * @author DarkPlasma
 * @license MIT
 *
 * @param stockIdVariable
 * @desc use stock with ID setting by this variable.
 * @text Variable for stock ID
 * @type variable
 * @default 0
 *
 * @param stockNumberLabel
 * @desc label for stock count
 * @text stock count label
 * @type string
 * @default stock
 *
 * @param soldOutLabel
 * @desc label for sold out
 * @text sold out label
 * @type string
 * @default sold out
 *
 * @param shopStock
 * @desc shop stock setting
 * @text shop stock setting
 * @type struct<ShopStockEn>[]
 * @default []
 *
 * @param Supply Stock When Sell Item
 * @desc supply stock when sell the item
 * @text supply stock when sell
 * @type boolean
 * @default false
 *
 * @param Sold Out Item At Bottom
 * @desc Display sold item at bottom of shop
 * @text sold out item at bottom
 * @type boolean
 * @default true
 *
 * @help
 * You can set shop item stock.
 * Default stock ID is 1.
 * If you don't set stock count of item,
 * the item stock is infinite.
 *
 * With this plugin, RMMV savedata includes stock data.
 *
 * You can set different stock count between same item id in same stock setting.
 * e.g.) One potion is 30 stocked, another is 10.
 * If you set stock count in this order and set multi same items to shop goods,
 * shop display them in the same order.
 * (Stock count of potion displayed upper is 30, lower is 10.)
 * Please note that if you set "supply stock when sell" is true,
 * and sell item that is multi displayed in shop,
 * the only top item of the same id is supplied.
 *
 * If you set different price between same item id in the same shop,
 * please consider that you use DarkPlasma_AnotherPriceInSameShop.js.
 * Then, please add this plugin lower position than it.
 */
/*~struct~ShopStockEn:
 *
 * @param id
 * @desc stock ID
 * @text stock ID
 * @default 1
 * @type number
 *
 * @param stockItemList
 * @desc list of stock item
 * @text stock item list
 * @default []
 * @type struct<StockItemEn>[]
 *
 * @param stockWeaponList
 * @desc list of stock weapon
 * @text stock weapon list
 * @default []
 * @type struct<StockWeaponEn>[]
 *
 * @param stockArmorList
 * @desc list of stock armor
 * @text stock armor list
 * @default []
 * @type struct<StockArmorEn>[]
 *
 * @param defaultSupplyType
 * @desc default supply method
 * @text default supply type
 * @type select
 * @option no supplying
 * @value 0
 * @option battle count
 * @value 1
 * @option play time
 * @value 2
 * @default 0
 *
 * @param defaultSupplyCount
 * @desc default supply count by one time
 * @text default supply count
 * @type number
 * @default 1
 *
 * @param defaultSupplyFrequency
 * @desc default supply frequency(battle count or play time(seconds))
 * @text default supply frequency
 * @type number
 * @default 5
 */
/*~struct~StockItemEn:
 *
 * @param itemId
 * @desc item
 * @text item
 * @default 0
 * @type item
 *
 * @param stockNum
 * @desc default stock count
 * @text default stock count
 * @default 1
 * @type number
 *
 * @param useOwnSupplySetting
 * @desc use own supply setting
 * @text use own supply setting
 * @type boolean
 * @default false
 *
 * @param supplyType
 * @desc own supply type (enable when use own supply setting is true.)
 * @text own supply type
 * @type select
 * @option no supplying
 * @value 0
 * @option battle count
 * @value 1
 * @option play time
 * @value 2
 * @default 0
 *
 * @param supplyCount
 * @desc own supply count by one time (enable when use own supply setting is true.)
 * @text own supply count
 * @type number
 * @default 1
 *
 * @param supplyFrequency
 * @desc own supply frequency(battle count or play time(seconds)) (enable when use own supply setting is true.)
 * @text own supply frequency
 * @type number
 * @default 5
 */
/*~struct~StockWeaponEn:
 *
 * @param weaponId
 * @desc weapon
 * @text weapon
 * @default 0
 * @type weapon
 *
 * @param stockNum
 * @desc default stock count
 * @text default stock count
 * @default 1
 * @type number
 *
 * @param useOwnSupplySetting
 * @desc use own supply setting
 * @text use own supply setting
 * @type boolean
 * @default false
 *
 * @param supplyType
 * @desc own supply type (enable when use own supply setting is true.)
 * @text own supply type
 * @type select
 * @option no supplying
 * @value 0
 * @option battle count
 * @value 1
 * @option play time
 * @value 2
 * @default 0
 *
 * @param supplyCount
 * @desc own supply count by one time (enable when use own supply setting is true.)
 * @text own supply count
 * @type number
 * @default 1
 *
 * @param supplyFrequency
 * @desc own supply frequency(battle count or play time(seconds)) (enable when use own supply setting is true.)
 * @text own supply frequency
 * @type number
 * @default 5
 */
/*~struct~StockArmorEn:
 *
 * @param armorId
 * @desc armor
 * @text armor
 * @default 0
 * @type armor
 *
 * @param stockNum
 * @desc default stock count
 * @text default stock count
 * @default 1
 * @type number
 *
 * @param useOwnSupplySetting
 * @desc use own supply setting
 * @text use own supply setting
 * @type boolean
 * @default false
 *
 * @param supplyType
 * @desc own supply type (enable when use own supply setting is true.)
 * @text own supply type
 * @type select
 * @option no supplying
 * @value 0
 * @option battle count
 * @value 1
 * @option play time
 * @value 2
 * @default 0
 *
 * @param supplyCount
 * @desc own supply count by one time (enable when use own supply setting is true.)
 * @text own supply count
 * @type number
 * @default 1
 *
 * @param supplyFrequency
 * @desc own supply frequency(battle count or play time(seconds)) (enable when use own supply setting is true.)
 * @text own supply frequency
 * @type number
 * @default 5
 */
/*:ja
 * @plugindesc 在庫ありショッププラグイン
 * @author DarkPlasma
 * @license MIT
 *
 * @param stockIdVariable
 * @desc ここで指定された変数と一致する在庫リストIDを使用します
 * @text 在庫リストID指定用変数
 * @type variable
 * @default 0
 *
 * @param stockNumberLabel
 * @desc 在庫数の表記を設定します
 * @text 在庫数表記
 * @type string
 * @default 在庫数
 *
 * @param soldOutLabel
 * @desc 売り切れの表記を設定します
 * @text 売り切れ表記
 * @type string
 * @default 売り切れ
 *
 * @param shopStock
 * @desc ショップの初期在庫を設定します
 * @text ショップ在庫設定
 * @type struct<ShopStock>[]
 * @default []
 *
 * @param Supply Stock When Sell Item
 * @desc 売却時にそのアイテムの在庫を追加する
 * @text 売却時在庫補充
 * @type boolean
 * @default false
 *
 * @param Sold Out Item At Bottom
 * @desc 売り切れ商品をショップの一番下に表示する
 * @text 売り切れを後ろに
 * @type boolean
 * @default true
 *
 * @help
 * このプラグインはショップに初期在庫を設定できます。
 * 在庫リストID:1のリストをデフォルトの在庫リストとして扱います。
 * 在庫リストで指定されなかったアイテムの在庫は無限です。
 *
 * 在庫はセーブデータに記録されます。
 *
 * 同じ在庫リストの中で、同一アイテムに対して異なる在庫数を設定できます。
 * 例えば、片方のポーションは在庫30あるが、もう片方は10しかない、等。
 * 在庫リストの中で設定した順番が上記の通りである場合、
 * ショップ内の順番も同様です。
 * （上に設定したポーションの在庫が30、下に設定したポーションの在庫が10になります）
 * 売却時の補充は同一アイテムのうち、一番上のアイテムにしか効かないのでご注意ください。
 *
 * 同一ショップ内の同一アイテムに別価格を設定したい場合、
 * DarkPlasma_AnotherPriceInSameShop.js との併用をご検討ください。
 * その場合、 DarkPlasma_AnotherPriceInSameShop.js よりも
 * このプラグインを下に読み込んでください。
 */
/*~struct~ShopStock:
 *
 * @param id
 * @desc 在庫リストID
 * @text 在庫リストID
 * @default 1
 * @type number
 *
 * @param stockItemList
 * @desc 在庫アイテムリスト
 * @text 在庫アイテムリスト
 * @default []
 * @type struct<StockItem>[]
 * 
 * @param stockWeaponList
 * @desc 在庫武器リスト
 * @text 在庫武器リスト
 * @default []
 * @type struct<StockWeapon>[]
 *
 * @param stockArmorList
 * @desc 在庫防具リスト
 * @text 在庫防具リスト
 * @default []
 * @type struct<StockArmor>[]
 *
 * @param defaultSupplyType
 * @desc 在庫の補充形式
 * @text 在庫補充形式
 * @type select
 * @option 補充なし
 * @value 0
 * @option 戦闘回数
 * @value 1
 * @option 時間経過
 * @value 2
 * @default 0
 *
 * @param defaultSupplyCount
 * @desc 1度の補充ごとに補充される在庫数
 * @text 補充数
 * @type number
 * @default 1
 *
 * @param defaultSupplyFrequency
 * @desc 補充間隔（戦闘回数 or 経過時間（秒））
 * @text 補充間隔
 * @type number
 * @default 5
 */
/*~struct~StockItem:
 *
 * @param itemId
 * @desc アイテム
 * @text アイテム
 * @default 0
 * @type item
 *
 * @param stockNum
 * @desc 初期在庫数
 * @text 初期在庫数
 * @default 1
 * @type number
 *
 * @param useOwnSupplySetting
 * @desc アイテムごとの補充設定を利用するか
 * @text 独自補充設定
 * @type boolean
 * @default false
 *
 * @param supplyType
 * @desc 在庫の補充形式（独自補充設定がONの場合のみ有効）
 * @text 在庫補充形式
 * @type select
 * @option 補充なし
 * @value 0
 * @option 戦闘回数
 * @value 1
 * @option 時間経過
 * @value 2
 * @default 0
 *
 * @param supplyCount
 * @desc 1度の補充ごとに補充される在庫数（独自補充設定がONの場合のみ有効）
 * @text 補充数
 * @type number
 * @default 1
 *
 * @param supplyFrequency
 * @desc 補充間隔（戦闘回数 or 経過時間（秒））（独自補充設定がONの場合のみ有効）
 * @text 補充間隔
 * @type number
 * @default 5
 */
/*~struct~StockWeapon:
 *
 * @param weaponId
 * @desc 武器
 * @text 武器
 * @default 0
 * @type weapon
 *
 * @param stockNum
 * @desc 初期在庫数
 * @text 初期在庫数
 * @default 1
 * @type number
 *
 * @param useOwnSupplySetting
 * @desc アイテムごとの補充設定を利用するか
 * @text 独自補充設定
 * @type boolean
 * @default false
 *
 * @param supplyType
 * @desc 在庫の補充形式（独自補充設定がONの場合のみ有効）
 * @text 在庫補充形式
 * @type select
 * @option 補充なし
 * @value 0
 * @option 戦闘回数
 * @value 1
 * @option 時間経過
 * @value 2
 * @default 0
 *
 * @param supplyCount
 * @desc 1度の補充ごとに補充される在庫数（独自補充設定がONの場合のみ有効）
 * @text 補充数
 * @type number
 * @default 1
 *
 * @param supplyFrequency
 * @desc 補充間隔（戦闘回数 or 経過時間（秒））（独自補充設定がONの場合のみ有効）
 * @text 補充間隔
 * @type number
 * @default 5
 */
/*~struct~StockArmor:
 *
 * @param armorId
 * @desc 防具
 * @text 防具
 * @default 0
 * @type armor
 *
 * @param stockNum
 * @desc 初期在庫数
 * @text 初期在庫数
 * @default 1
 * @type number
 *
 * @param useOwnSupplySetting
 * @desc アイテムごとの補充設定を利用するか
 * @text 独自補充設定
 * @type boolean
 * @default false
 *
 * @param supplyType
 * @desc 在庫の補充形式（独自補充設定がONの場合のみ有効）
 * @text 在庫補充形式
 * @type select
 * @option 補充なし
 * @value 0
 * @option 戦闘回数
 * @value 1
 * @option 時間経過
 * @value 2
 * @default 0
 *
 * @param supplyCount
 * @desc 1度の補充ごとに補充される在庫数（独自補充設定がONの場合のみ有効）
 * @text 補充数
 * @type number
 * @default 1
 *
 * @param supplyFrequency
 * @desc 補充間隔（戦闘回数 or 経過時間（秒））（独自補充設定がONの場合のみ有効）
 * @text 補充間隔
 * @type number
 * @default 5
 */

(function () {
  'use strict';
  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });
  const pluginParameters = PluginManager.parameters(pluginName);

  const SUPPLY_TYPE = {
    NONE: 0,
    BATTLE_COUNT: 1,
    PLAY_TIME: 2
  };

  const ITEM_KIND = {
    ITEM: 1,
    WEAPON: 2,
    ARMOR: 3,
  };

  const DEFAULT_STOCK_ID = 1;

  const settings = {
    stockIdVariable: Number(pluginParameters['stockIdVariable'] || 0),
    stockNumberLabel: String(pluginParameters['stockNumberLabel'] || '在庫数'),
    soldOutLabel: String(pluginParameters['soldOutLabel'] || '売り切れ'),
    supplyWhenSell: String(pluginParameters['Supply Stock When Sell Item'] || 'false') === 'true',
    soldOutAtBottom: String(pluginParameters['Sold OUt Item At Bottom'] || 'true') === 'true',
    shopStock: JsonEx.parse(pluginParameters['shopStock'] || '[]').map(shopStock => {
      const parsed = JsonEx.parse(shopStock);
      return {
        id: Number(parsed['id'] || 0),
        stockItemList: JsonEx.parse(parsed['stockItemList'] || '[]').map(stockItemList => {
          const parsed = JsonEx.parse(stockItemList);
          return {
            id: Number(parsed['itemId'] || 0),
            stockNum: Number(parsed['stockNum'] || 1),
            useOwnSupplySetting: String(parsed['useOwnSupplySetting'] || 'false') === 'true',
            supplyType: Number(parsed['supplyType'] || 0),
            supplyCount: Number(parsed['supplyCount'] || 1),
            supplyFrequency: Number(parsed['supplyFrequency'] || 5)
          };
        }),
        stockWeaponList: JsonEx.parse(parsed['stockWeaponList'] || '[]').map(stockItemList => {
          const parsed = JsonEx.parse(stockItemList);
          return {
            id: Number(parsed['weaponId'] || 0),
            stockNum: Number(parsed['stockNum'] || 1),
            useOwnSupplySetting: String(parsed['useOwnSupplySetting'] || 'false') === 'true',
            supplyType: Number(parsed['supplyType'] || 0),
            supplyCount: Number(parsed['supplyCount'] || 1),
            supplyFrequency: Number(parsed['supplyFrequency'] || 5)
          };
        }),
        stockArmorList: JsonEx.parse(parsed['stockArmorList'] || '[]').map(stockItemList => {
          const parsed = JsonEx.parse(stockItemList);
          return {
            id: Number(parsed['armorId'] || 0),
            stockNum: Number(parsed['stockNum'] || 1),
            useOwnSupplySetting: String(parsed['useOwnSupplySetting'] || 'false') === 'true',
            supplyType: Number(parsed['supplyType'] || 0),
            supplyCount: Number(parsed['supplyCount'] || 1),
            supplyFrequency: Number(parsed['supplyFrequency'] || 5)
          };
        }),
        defaultSupplyType: Number(parsed['defaultSupplyType'] || 0),
        defaultSupplyCount: Number(parsed['defaultSupplyCount'] || 1),
        defaultSupplyFrequency: Number(parsed['defaultSupplyFrequency'] || 5),
      };
    })
  };

  class ShopStockManager {
    constructor() {
      this.initialize();
    }

    initialize() {
      /**
       * @type {ShopStock[]}
       */
      this._shopStock = settings.shopStock.map(stockSetting => ShopStock.fromSetting(stockSetting));
    }

    /**
     * 現在の在庫リストIDに記録されている在庫数を返す
     * 在庫リストIDが指定されていない、または在庫リストの中にアイテムが存在しない場合nullを返す
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @return {number|null} 現在の在庫数
     */
    stockCount(item, index) {
      const currentStock = this.currentShopStock();
      return currentStock ? currentStock.stockCount(item, index) : null;
    }

    /**
     * 指定したIDの在庫リストを返す
     * 存在しない場合はundefinedを返す
     * @param {number} stockId 在庫リストID
     * @return {ShopStock|undefined}
     */
    shopStock(stockId) {
      return this._shopStock.find(stock => stock.id === stockId);
    }

    /**
     * 現在の在庫リストを返す
     * 現在の在庫リストIDが指し示す在庫リストが存在しない場合、undefinedを返す
     * @return {ShopStock|undefined}
     */
    currentShopStock() {
      const currentStockId = $gameVariables.value(settings.stockIdVariable) || DEFAULT_STOCK_ID;
      return this._shopStock.find(stock => stock.id === currentStockId);
    }

    /**
     * 現在の在庫リストの在庫を補充する
     */
    supplyCurrentShopStock() {
      const shopStock = this.currentShopStock();
      if (shopStock) {
        shopStock.supply();
      }
    }

    /**
     * 現在の在庫リストにおいて、指定したアイテムの在庫数を増やす
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @param {number} count 在庫を増やす数
     */
    increaseCurrentStockCount(item, index, count) {
      const shopStock = this.currentShopStock();
      if (shopStock) {
        shopStock.increaseStockCount(item, index, count);
      }
    }

    /**
     * 現在の在庫リストにおいて、指定したアイテムの在庫数を減らす
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @param {number} count 在庫を減らす数
     */
    decreaseCurrentStockCount(item, index, count) {
      const shopStock = this.currentShopStock();
      if (shopStock) {
        shopStock.decreaseStockCount(item, index, count);
      }
    }

    /**
     * セーブデータから在庫数を更新する
     * @param {object[]} stockSaveData セーブデータ形式の在庫データ
     */
    updateCountBySaveData(stockSaveData) {
      stockSaveData.forEach(saveData => {
        const shopStock = this._shopStock.find(stock => saveData.id === stock.id);
        if (shopStock) {
          shopStock.updateCountBySaveData(saveData.stockItems);
        }
      });
    }

    /**
     * セーブデータ用の形式に変換して取得する
     * 以下のような形式
     * [
     *   {
     *     id: 在庫リストID,
     *     stockItems: [
     *       {
     *         id: アイテムID,
     *         kind: アイテム種別ID,
     *         count: 在庫数,
     *         supplyType: 補充形式,
     *         counterForSupply: 補充用カウンター
     *       },
     *       ....
     *     ]
     *   },
     *   ....
     * ]
     * @return {object[]} セーブデータ用の形式
     */
    toSaveData() {
      return this._shopStock.map(stock => stock.toSaveData());
    }
  }

  /**
   * 在庫リスト
   */
  class ShopStock {
    /**
     * @param {number} id 在庫リストID
     * @param {StockItem} stockItems 在庫アイテムリスト
     */
    constructor(id, stockItems) {
      this._id = id;
      this._stockItems = stockItems;
    }

    /**
     * @param {object} setting 設定
     * @return {ShopStock}
     */
    static fromSetting(setting) {
      return new ShopStock(
        setting.id,
        setting.stockItemList.map(stockItem => {
          return StockItem.fromSetting(
            stockItem,
            ITEM_KIND.ITEM,
            stockItem.useOwnSupplySetting ? stockItem.supplyType : setting.defaultSupplyType,
            stockItem.useOwnSupplySetting ? stockItem.supplyCount : setting.defaultSupplyCount,
            stockItem.useOwnSupplySetting ? stockItem.supplyFrequency : setting.defaultSupplyFrequency
          );
        }).concat(setting.stockWeaponList.map(stockWeapon => {
          return StockItem.fromSetting(
            stockWeapon,
            ITEM_KIND.WEAPON,
            stockWeapon.useOwnSupplySetting ? stockWeapon.supplyType : setting.defaultSupplyType,
            stockWeapon.useOwnSupplySetting ? stockWeapon.supplyCount : setting.defaultSupplyCount,
            stockWeapon.useOwnSupplySetting ? stockWeapon.supplyFrequency : setting.defaultSupplyFrequency
          );
        })).concat(setting.stockArmorList.map(stockArmor => {
          return StockItem.fromSetting(
            stockArmor,
            ITEM_KIND.ARMOR,
            stockArmor.useOwnSupplySetting ? stockArmor.supplyType : setting.defaultSupplyType,
            stockArmor.useOwnSupplySetting ? stockArmor.supplyCount : setting.defaultSupplyCount,
            stockArmor.useOwnSupplySetting ? stockArmor.supplyFrequency : setting.defaultSupplyFrequency
          );
        }))
      );
    }

    get id() {
      return this._id;
    }

    /**
     * @param {object} stockItemSaveData セーブデータから取得した在庫情報
     */
    updateCountBySaveData(stockItemSaveData) {
      let indexes = {};
      stockItemSaveData.forEach(object => {
        const items = this._stockItems.filter(item => item.kind === object.kind && item.id === object.id);
        if (!indexes[object.id]) {
          indexes[object.id] = 0;
        }
        const item = items[indexes[object.id]++];
        if (item) {
          item.setCount(object.count);
          if (item.supplyCount !== object.supplyType) { // 補充形式設定が変更されていたらリセットする
            item.resetSupplyCounter();
          } else {
            item.setSupplyCounter(object.counterForSupply);
          }
        }
      });
    }

    /**
     * 在庫を補充する
     */
    supply() {
      this._stockItems.forEach(stock => stock.supply());
    }

    /**
     * 指定したアイテムの在庫情報を取得する
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @return {StockItem}
     */
    getStockItem(item, index) {
      let result = [];
      if (DataManager.isItem(item)) {
        result = this._stockItems.filter(stockItem => stockItem.kind === ITEM_KIND.ITEM && stockItem.id === item.id);
      } else if (DataManager.isWeapon(item)) {
        result = this._stockItems.filter(stockItem => stockItem.kind === ITEM_KIND.WEAPON && stockItem.id === item.id);
      } else if (DataManager.isArmor(item)) {
        result = this._stockItems.filter(stockItem => stockItem.kind === ITEM_KIND.ARMOR && stockItem.id === item.id);
      }
      return result.length > index ? result[index] : null;
    }

    /**
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @return {number|null} 在庫数
     */
    stockCount(item, index) {
      const stockItem = this.getStockItem(item, index);
      return stockItem ? stockItem.count : null;
    }

    /**
     * 指定したアイテムの在庫数を増やす
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @param {number} count 在庫を増やす数
     */
    increaseStockCount(item, index, count) {
      const stockItem = this.getStockItem(item, index);
      if (stockItem) {
        stockItem.increaseCount(count);
      }
    }

    /**
     * 指定したアイテムの在庫数を減らす
     * @param {RPG.Item|RPG.Weapon|RPG.Armor} item アイテムデータ
     * @param {number} index リスト中のアイテム番号
     * @param {number} count 在庫を減らす数
     */
    decreaseStockCount(item, index, count) {
      const stockItem = this.getStockItem(item, index);
      if (stockItem) {
        stockItem.decreaseCount(count);
      }
    }

    /**
     * @return {object}
     */
    toSaveData() {
      return {
        id: this._id,
        stockItems: this._stockItems.map(stockItem => stockItem.toSaveData())
      };
    }
  }

  class StockItem {
    /**
     * @param {number} kind アイテム種別
     * @param {number} id アイテムIDを
     * @param {number} initialCount 初期在庫
     * @param {number} supplyType 補充形式
     * @param {number} supplyCount 補充数
     * @param {number} supplyFrequency 補充間隔
     */
    constructor(kind, id, initialCount, supplyType, supplyCount, supplyFrequency) {
      this._kind = kind;
      this._id = id;
      this._initialCount = initialCount;
      this._count = initialCount;
      this._supplyType = supplyType;
      this._supplyCount = supplyCount;
      this._supplyFrequency = supplyFrequency;
      this._counterForSupply = 0;
    }

    /**
     * @param {object} setting 設定
     * @param {number} kind 種別
     * @param {number} defaultSupplyType 補充形式
     * @param {number} defaultSupplyCount 補充数
     * @param {number} defaultSupplyFrequency 補充間隔
     * @return {StockItem}
     */
    static fromSetting(setting, kind, defaultSupplyType, defaultSupplyCount, defaultSupplyFrequency) {
      return new StockItem(
        kind,
        setting.id,
        setting.stockNum,
        defaultSupplyType,
        defaultSupplyCount,
        defaultSupplyFrequency
      );
    }

    /**
     * @return {object}
     */
    toSaveData() {
      return {
        kind: this._kind,
        id: this._id,
        count: this._count,
        supplyType: this._supplyType,
        counterForSupply: this._counterForSupply
      };
    }

    /**
     * @return {RPG.Item|RPG.Weapon|RPG.Armor|null}
     */
    get data() {
      switch (this._kind) {
        case ITEM_KIND.ITEM:
          return $dataItems[this._id];
        case ITEM_KIND.WEAPON:
          return $dataWeapons[this._id];
        case ITEM_KIND.ARMOR:
          return $dataArmors[this._id];
        default:
          return null;
      }
    }

    /**
     * @return {number}
     */
    get kind() {
      return this._kind;
    }

    /**
     * @return {number}
     */
    get id() {
      return this._id;
    }

    /**
     * @return {number}
     */
    get count() {
      return this._count;
    }

    /**
     * @return {number}
     */
    get supplyType() {
      return this._supplyType;
    }

    /**
     * 在庫を増やす
     * @param {number} count 在庫を増やす数
     */
    increaseCount(count) {
      this.setCount(this.count + count);
    }

    /**
     * 在庫を減らす
     * @param {number} count 在庫を減らす数
     */
    decreaseCount(count) {
      if (this.count === this.maxCount() && count > 0) {

      }
      this.setCount(this.count - count);
    }

    /**
     * 在庫数を設定する
     * @param {number} count 在庫数
     */
    setCount(count) {
      this._count = count;
      if (this._count > this.maxCount()) {
        this._count = this.maxCount();
      } else if (this._count < 0) {
        this._count = 0;
      }
    }

    /**
     * 在庫を補充する
     */
    supply() {
      if (this._supplyType === SUPPLY_TYPE.NONE || this._supplyFrequency <= 0 || this._count >= this.maxCount()) {
        return;
      }
      let supplyTimes = 0;
      switch (this._supplyType) {
        case SUPPLY_TYPE.BATTLE_COUNT:
          supplyTimes = Math.floor(($gameSystem.battleCount() - this._counterForSupply)/this._supplyFrequency);
          break;
        case SUPPLY_TYPE.PLAY_TIME:
          supplyTimes = Math.floor(($gameSystem.playtime() - this._counterForSupply)/this._supplyFrequency);
          break;
        default:
          return;
      }
      for (let i = 0; i < supplyTimes; i++) {
        this.increaseCount(this._supplyCount);
      }
      // 補充用カウンターの更新
      this._counterForSupply += supplyTimes * this._supplyFrequency;
    }

    setSupplyCounter(counter) {
      this._counterForSupply = counter;
    }

    /**
     * 補充用カウンターをリセットする
     */
    resetSupplyCounter() {
      switch (this._supplyType) {
        case SUPPLY_TYPE.BATTLE_COUNT:
          this._counterForSupply = $gameSystem.battleCount();
          break;
        case SUPPLY_TYPE.PLAY_TIME:
          this._counterForSupply = $gameSystem.playtime();
          break;
      }
    }

    /**
     * @return {number} 最大在庫数
     */
    maxCount() {
      // 将来的に最大数を別に設定できるようにしても良い
      return this._initialCount;
    }
  }

  /**
   * @type {ShopStockManager}
   */
  const shopStockManager = new ShopStockManager();

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    /**
     * ゲーム開始時に初期化する
     */
    shopStockManager.initialize();
  };

  const _Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
  Game_System.prototype.onBeforeSave = function () {
    _Game_System_onBeforeSave.call(this);
    this._shopStock = shopStockManager.toSaveData();
  };

  const _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
  Game_System.prototype.onAfterLoad = function () {
    _Game_System_onAfterLoad.call(this);
    if (this._shopStock && Array.isArray(this._shopStock)) {
      shopStockManager.updateCountBySaveData(this._shopStock);
    } else {
      /**
       * セーブデータになければとりあえず初期化する
       */
      shopStockManager.initialize();
    }
  };

  const _Scene_Shop_create = Scene_Shop.prototype.create;
  Scene_Shop.prototype.create = function (){
    _Scene_Shop_create.call(this);
    // ショップを開いたタイミングで補充する
    shopStockManager.supplyCurrentShopStock();
  };

  const _SceneShop_doBuy = Scene_Shop.prototype.doBuy;
  Scene_Shop.prototype.doBuy = function (number) {
    _SceneShop_doBuy.call(this, number);
    shopStockManager.decreaseCurrentStockCount(this._item, this._buyWindow.indexOfSameItem(), number);
  };

  const _SceneShop_doSell = Scene_Shop.prototype.doSell;
  Scene_Shop.prototype.doSell = function (number) {
    _SceneShop_doSell.call(this, number);
    if (settings.supplyWhenSell) {
      shopStockManager.increaseCurrentStockCount(this._item, 0, number);
    }
  };

  const _SceneShop_maxBuy = Scene_Shop.prototype.maxBuy;
  Scene_Shop.prototype.maxBuy = function () {
    const currentStock = shopStockManager.stockCount(this._item, this._buyWindow.indexOfSameItem());
    return currentStock > 0 ? Math.min(
      currentStock,
      _SceneShop_maxBuy.call(this)
    ) : _SceneShop_maxBuy.call(this);
  };

  const _WindowShopStatus_refresh = Window_ShopStatus.prototype.refresh;
  Window_ShopStatus.prototype.refresh = function () {
    _WindowShopStatus_refresh.call(this);
    // 在庫数表記
    const currentStock = this.stockCount();
    if (currentStock || currentStock === 0) {
      this.drawStock(this.textPadding(), this.lineHeight());
    }
  };

  Window_ShopStatus.prototype.drawStock = function (x, y) {
    const width = this.contents.width - this.textPadding() - x;
    const stockWidth = this.textWidth('0000');
    this.changeTextColor(this.systemColor());
    this.drawText(settings.stockNumberLabel, x, y, width - stockWidth);
    this.resetTextColor();
    this.drawText(this.stockCount(), x, y, width, 'right');
  };

  Window_ShopStatus.prototype.stockCount = function () {
    return shopStockManager.stockCount(this._item, this.indexOfSameItem());
  };

  Window_ShopStatus.prototype.indexOfSameItem = function () {
    return this._indexOfSameItem ? this._indexOfSameItem : 0;
  };

  Window_ShopStatus.prototype.setIndexOfSameItem = function (index) {
    this._indexOfSameItem = index;
  }

  const _Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
  Window_ShopBuy.prototype.updateHelp = function() {
    if (this._statusWindow) {
        this._statusWindow.setIndexOfSameItem(this.indexOfSameItem());
    }
    _Window_ShopBuy_updateHelp.call(this);
  };

  /**
   * 指定したアイテムの在庫数を取得する
   * @param {RPG.Item} item アイテムデータ
   * @param {number} index 在庫リストの中での順番
   * @return {number}
   */
  Window_ShopBuy.prototype.stockCount = function (item, index) {
    return shopStockManager.stockCount(item, index);
  };

  /**
   * 指定したアイテムが売り切れであるかどうか
   * @param {RPG.Item} item アイテムデータ
   * @param {number} index 在庫リストの中での順番
   * @return {boolean}
   */
  Window_ShopBuy.prototype.soldOut = function (item, index) {
    return this.stockCount(item, index) === 0;
  };

  const _WindowShopBuy_price = Window_ShopBuy.prototype.price;
  Window_ShopBuy.prototype.price = function (item) {
    return this.soldOut(item, this.indexOfSameItem()) ? settings.soldOutLabel : _WindowShopBuy_price.call(this, item);
  };

  const _WindowShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
  Window_ShopBuy.prototype.isEnabled = function (item) {
    return _WindowShopBuy_isEnabled.call(this, item) && 
      !this.soldOut(item, this.indexOfSameItem());
  };

  const _Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
  Window_ShopBuy.prototype.drawItem = function(index) {
    this._indexForDrawing = index;
    this._isDrawing = true;
    _Window_ShopBuy_drawItem.call(this, index);
    this._isDrawing = false;
  };

  /**
   * このショップの同一アイテムで何番目のアイテムを選択しているか
   * アイテムを選択していない場合や、存在しない場合は -1 を返す
   * 描画中は描画対象を選択しているとみなす
   * @return {number}
   */
  Window_ShopBuy.prototype.indexOfSameItem = function () {
    const index = this._isDrawing ? this._indexForDrawing : this.index();
    if (this._extendedData.length <= index || index < 0) {
      return -1;
    }
    return this._extendedData[index].indexOfSameItem;
  };

  /**
   * ソート順を上書き
   */
  Window_ShopBuy.prototype.makeItemList = function () {
    this._data = [];
    this._price = [];
    /**
     * 拡張データ
     */
    this._extendedData = [];
    /**
     * 同名アイテムで何番目か
     */
    let indexesOfSameItem = {};
    this._shopGoods.map((goods, index) => {
      let item = null;
      switch (goods[0]) {
        case 0:
          item = $dataItems[goods[1]];
          break;
        case 1:
          item = $dataWeapons[goods[1]];
          break;
        case 2:
          item = $dataArmors[goods[1]];
          break;
      }
      if (item) {
        /**
         * 売り切れを一番下に表示する
         */
        const key = `${goods[0]}_${item.id}`;
        if (!indexesOfSameItem[key]) {
          indexesOfSameItem[key] = 0;
        }
        return {
          item: item,
          price: goods[2] === 0 ? item.price : goods[3],
          indexOfSameItem: indexesOfSameItem[key],
          soldOut: this.soldOut(item, indexesOfSameItem[key]++),
          goodsIndex: index,
        };
      } else {
        return {};
      }
    }, this).filter(goods => goods.item).sort((a, b) => {
      if (settings.soldOutAtBottom) {
        if (a.soldOut && !b.soldOut) return 1;
        if (!a.soldOUt && b.soldOut) return -1;
      }
      /**
       * Array.prototype.sort が stable になるのは NW.js 0.34.0以降
       * RPGツクールMV1.6系は NW.js 0.29.4 のため、元々のindexで比較してやる
       */
      return a.goodsIndex - b.goodsIndex;
    }).forEach(goods => {
      this._data.push(goods.item);
      this._price.push(goods.price);
      this._extendedData.push({
        indexOfSameItem: goods.indexOfSameItem
      });
    }, this);
  };
})();
