/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-03 15:09:53
 * @LastEditTime: 2020-09-07 16:55:53
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/BottomOperatingArea/interface.ts
 */
export interface IBottomOperatingArea {
  favorites: boolean; // 是否收藏
  favoriteChange: (type: boolean) => void; // 收藏状态切换
}
