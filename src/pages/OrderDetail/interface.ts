import { EOrderType } from 'src/enums/EOrder';
import {
  IAddShoppingAddressParams,
  IShoppingAddress,
} from '../AddShoppingAddress/interface';
import { IOrderDataItem } from '../OrderList/interface';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-02 14:49:43
 * @LastEditTime: 2020-11-05 15:57:42
 * @FilePath: /koala-frontend/src/pages/OrderDetail/interface.ts
 */
export interface IOrderDetailPathParams
  extends Partial<Record<string, string>> {
  orderId: string;
}

export interface IOrderDetailResponseData extends IOrderDataItem {
  orderShopping: number;
  shoppingAddress: IShoppingAddress;
  remarkList: Array<IOrderRemark>;
  refundRecvAccount: string; // 退款入账账户
  refundSuccessTime: string; // 退款成功时间
  transactionId: string; // 支付单号
}

export interface IOrderRemark {
  productId: string;
  remark: string;
}
export interface IOrderShowInfoItem {
  label: string;
  value: string;
}
