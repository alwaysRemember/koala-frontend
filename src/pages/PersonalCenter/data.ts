/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-29 16:27:56
 * @LastEditTime: 2020-11-10 14:33:27
 * @FilePath: /koala-frontend/src/pages/PersonalCenter/data.ts
 */
import { addressListPath } from '../../router';
import { EAddressListPathSource } from '../AddressList/enums';
import { IMenuItem } from './interface';

export const menuList: Array<IMenuItem> = [
  {
    label: '消息列表',
    path: '',
  },
  {
    label: '地址管理',
    path: addressListPath({ source: EAddressListPathSource.USER_CENTER }),
  },
  {
    label: '我的收藏',
    path: '',
  },
  {
    label: '我的评价',
    path: '',
  },
];
