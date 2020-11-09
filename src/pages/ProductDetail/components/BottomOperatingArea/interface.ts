import { EProductStatus } from 'src/enums/EProduct';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-03 15:09:53
 * @LastEditTime: 2020-11-09 15:26:12
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/BottomOperatingArea/interface.ts
 */
export interface IBottomOperatingArea {
  productStatus: EProductStatus;
  favorites: boolean; // 是否收藏
  favoriteChange: (type: boolean) => void; // 收藏状态切换
  buyNow: () => void;
}
