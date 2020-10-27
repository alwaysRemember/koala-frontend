/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-23 14:04:07
 * @LastEditTime: 2020-10-26 17:20:58
 * @FilePath: /koala-frontend/src/components/OrderOperationBtn/interface.ts
 */

import { EOrderType } from 'src/enums/EOrder';

export interface IOrderOperationBtnProps {
  orderId: string;
  amount: number;
  orderType: EOrderType;
  orderCheck: boolean;
  updateTime: Date;
  changeData: () => void;
}

export interface IBtnProps {
  name: string;
  onClick: () => void;
  className: string;
  show: boolean;
}
