/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-29 16:27:56
 * @LastEditTime: 2020-11-10 17:19:58
 * @FilePath: /koala-frontend/src/pages/PersonalCenter/data.ts
 */
import { addressListPath, favoritesPagePath } from '../../router';
import { EAddressListPathSource } from '../AddressList/enums';
import { IMenuItem } from './interface';

export const menuList: Array<IMenuItem> = [
  {
    label: '地址管理',
    path: addressListPath({ source: EAddressListPathSource.USER_CENTER }),
  },
  {
    label: '我的收藏',
    path: favoritesPagePath(),
  },
  {
    label: '我的评价',
    path: '',
  },
];
