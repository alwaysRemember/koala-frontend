/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 14:04:07
 * @LastEditTime: 2020-10-27 16:39:12
 * @FilePath: /koala-frontend/src/components/OrderOperationBtn/interface.ts
 */

import { EOrderType } from 'src/enums/EOrder';

export interface IOrderOperationBtnProps {
  orderId: string;
  amount: number;
  orderType: EOrderType;
  orderCheck: boolean;
  orderCheckTime: Date;
  hasRefundCourierInfo: boolean;
  changeData: () => void;
}

export interface IBtnProps {
  name: string;
  onClick: () => void;
  className: string;
  show: boolean;
}

export interface IRefundCOurierConfirmParams {
  courierName: string;
  courierNum: string;
}

// 退货的快递信息
export interface IRefundCourierInfo extends IRefundCOurierConfirmParams {
  orderId: string;
}
