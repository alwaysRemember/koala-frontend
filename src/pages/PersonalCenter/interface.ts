/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-29 16:28:02
 * @LastEditTime: 2020-11-10 14:51:59
 * @FilePath: /koala-frontend/src/pages/PersonalCenter/interface.ts
 */

import { EOrderType } from 'src/enums/EOrder';

export interface IMenuItem {
  path: string; // 地址
  label: string; // 菜单名
}
export interface IDefaultOrderBtnItem {
  type: EOrderType;
  badgeNumber: number;
}

export interface IOrderBtnItem extends IDefaultOrderBtnItem {
  text: string;
  icon: string;
}

export interface IPersonalCenterResponseData {
  orderBtnListData: Array<IDefaultOrderBtnItem>;
}
