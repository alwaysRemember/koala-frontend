import { EOrderType } from 'src/enums/EOrder';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-15 14:19:51
 * @LastEditTime: 2020-10-15 15:00:25
 * @FilePath: /koala-frontend/src/pages/OrderList/interface.ts
 */
export type TDeafultTabKey = 'ALL';

export interface ITabDataItem {
  key: EOrderType | TDeafultTabKey;
  title: string;
  page: number;
  list: Array<IOrderDataItem>;
}

export interface IGetOrderListRequestParams {
  page: number;
  orderType: EOrderType;
  searchProductName?: string;
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
}

export interface IProductItem {
  productId: string;
  img: string;
  name: string;
  amount: string;
  buyQuantity: number;
  productConfig: Array<string>;
}
