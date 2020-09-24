import { EPaymentResultType } from './enum';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-24 14:20:13
 * @LastEditTime: 2020-09-24 17:00:02
 * @FilePath: /koala-frontend/src/pages/PaymentResult/interface.ts
 */
export interface IPaymentResultPathParams
  extends Partial<Record<string, string>> {
  type: EPaymentResultType;
  amount: string;
  payOrderId: string;
}

export interface IGetOrderListAccordingToPayOrderId {
  orderList: Array<string>;
}
