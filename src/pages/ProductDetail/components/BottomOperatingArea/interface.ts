import { EProductStatus } from 'src/enums/EProduct';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-03 15:09:53
 * @LastEditTime: 2020-11-27 16:14:05
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/BottomOperatingArea/interface.ts
 */
export interface IBottomOperatingArea {
  productStatus: EProductStatus;
  favorites: boolean; // 是否收藏
  favoriteChange: (type: boolean) => void; // 收藏状态切换
  buyNow: () => void;
  saveToShoppingCart: () => void; // 添加至购物车
}
