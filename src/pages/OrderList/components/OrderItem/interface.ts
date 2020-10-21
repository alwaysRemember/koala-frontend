/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-16 14:50:05
 * @LastEditTime: 2020-10-21 15:23:51
 * @FilePath: /koala-frontend/src/pages/OrderList/components/OrderItem/interface.ts
 */
import { IOrderDataItem } from '../../interface';

export interface IOrderItemProps {
  data: IOrderDataItem;
  changeData: () => void;
}

export interface IBtnProps {
  name: string;
  onClick: () => void;
  className: string;
  show: boolean;
}
