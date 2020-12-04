/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-27 18:09:05
 * @LastEditTime: 2020-12-04 16:03:56
 * @FilePath: /koala-frontend/src/pages/ShoppingCart/interface.ts
 */

import { EProductStatus } from '../../enums/EProduct';

// 删除购物车产品
export interface IDeleteProductForShoppingCartRequestParams {
  idList: Array<string>;
}

export interface IShoppingCartRequestParams {
  page: number;
}

export interface IShoppingCartResponseData {
  total: number;
  list: Array<IShoppingCartItem>;
}
export interface IShoppingCartItem {
  shoppingCartId: string;
  productId: string;
  name: string;
  productImg: string;
  amount: number;
  productShipping: number;
  buyQuantity: number;
  buyConfigList: Array<TBuyConfig>;
  productStatus: EProductStatus;
}
export interface IShoppingCartShowPageDataItem extends IShoppingCartItem {
  isSelect: boolean;
}

export type TBuyConfig = {
  id: number;
  name: string;
  categoryName: string;
  amount: number;
};
