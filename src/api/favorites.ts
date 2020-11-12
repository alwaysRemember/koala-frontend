/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-11 14:02:47
 * @LastEditTime: 2020-11-12 15:00:06
 * @FilePath: /koala-frontend/src/api/favorites.ts
 */

const BASE = '/favorites';
import { IGetFavoritesResponseData } from 'src/pages/Favorites/interface';
import { request } from '../request';

/**
 *获取收藏列表
 * @param params
 */
export const getFavoritesData = () =>
  request<IGetFavoritesResponseData>({
    url: `${BASE}/get-favorites-data`,
    method: 'GET',
  });

/**
 * 删除收藏的商品
 * @param params
 */
export const removeFavorites = (params: { favoritesId: number }) =>
  request({
    method: 'POST',
    url: `${BASE}/remove-favorites`,
    params,
  });
