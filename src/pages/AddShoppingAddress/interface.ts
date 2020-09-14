/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-10 15:54:26
 * @LastEditTime: 2020-09-14 15:57:48
 * @FilePath: /koala-frontend/src/pages/AddShoppingAddress/interface.ts
 */

import { EPageType } from './enums';

export type TCityItem = { [key: string]: any };
// 页面所需参数
export interface IAddShoppingAddressPathParams
  extends Partial<Record<string, string>> {
  type: EPageType; // 页面类型
}

// 省市区参数
export interface ICityDataItem {
  value: string;
  key: string;
  parentKey: string;
  children: Array<ICityDataItem>;
}

/**
 * 新增收货地址所需参数
 */
export interface IAddShoppingAddressParams {
  id?: number;
  name: string;
  phone: string;
  address: string;
  area: Array<string>;
  isDefaultSelection: boolean;
}
