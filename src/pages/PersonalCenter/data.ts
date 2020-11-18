/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-29 16:27:56
 * @LastEditTime: 2020-11-17 16:06:46
 * @FilePath: /koala-frontend/src/pages/PersonalCenter/data.ts
 */
import {
  addressListPath,
  favoritesPagePath,
  myCommentPagePath,
} from '../../router';
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
    path: myCommentPagePath(),
  },
];
