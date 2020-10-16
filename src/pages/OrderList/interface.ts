import { EOrderType } from 'src/enums/EOrder';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-15 14:19:51
 * @LastEditTime: 2020-10-16 16:57:52
 * @FilePath: /koala-frontend/src/pages/OrderList/interface.ts
 */
export enum EDeafultTabKey {
  ALL = 'ALL',
}

export interface IOrderListPathParams extends Partial<Record<string, string>> {
  type: EOrderType | EDeafultTabKey;
}
export interface ITabDataItem {
  key: EOrderType | EDeafultTabKey;
  title: string;
  page: number;
  total: number;
  list: Array<IOrderDataItem>;
}

export interface IGetOrderListRequestParams {
  page: number;
  orderType: EOrderType | EDeafultTabKey;
}

export interface IGetOrderListResponse {
  total: number;
  list: Array<IOrderDataItem>;
}

export interface IOrderDataItem {
  orderId: string;
  orderType: EOrderType;
  amount: number;
  productList: Array<IProductItem>;
  updateTime: Date;
}

export interface IProductItem {
  productId: string;
  img: string;
  name: string;
  amount: string;
  buyQuantity: number;
  productConfigList: Array<string>;
}
