/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-10-16 14:50:05
 * @LastEditTime: 2020-10-23 14:07:16
 * @FilePath: /koala-frontend/src/pages/OrderList/components/OrderItem/interface.ts
 */
import { IOrderDataItem } from '../../interface';

export interface IOrderItemProps {
  data: IOrderDataItem;
  changeData: () => void;
}
