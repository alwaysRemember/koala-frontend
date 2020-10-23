/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-16 14:50:05
 * @LastEditTime: 2020-10-23 14:55:27
 * @FilePath: /koala-frontend/src/pages/OrderList/components/OrderItem/interface.ts
 */
import { IOrderDataItem } from '../../interface';

export interface IOrderItemProps {
  data: IOrderDataItem;
  changeData: () => void;
}
