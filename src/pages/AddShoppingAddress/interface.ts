/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-10 15:54:26
 * @LastEditTime: 2020-11-02 14:56:25
 * @FilePath: /koala-frontend/src/pages/AddShoppingAddress/interface.ts
 */

import { EPageSource, EPageType } from './enums';

export type TCityItem = { [key: string]: any };
// 页面所需参数
export interface IAddShoppingAddressPathParams
  extends Partial<Record<string, string>> {
  type: EPageType; // 页面类型
  source: EPageSource; // 页面来源
}

// 省市区参数
export interface ICityDataItem {
  value: string;
  key: string;
  parentKey: string;
  children: Array<ICityDataItem>;
}

export interface IShoppingAddress {
  name: string;
  phone: string;
  address: string;
  area: Array<string>;
}
/**
 * 新增收货地址所需参数
 */
export interface IAddShoppingAddressParams extends IShoppingAddress {
  id?: number;
  isDefaultSelection: boolean;
}
