/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 15:02:42
 * @LastEditTime: 2020-09-07 16:58:37
 * @FilePath: /koala-frontend/src/api/product.ts
 */
import { IProductDetailResponse } from 'src/pages/ProductDetail/interface';
import { request } from '../request';

/**
 * 获取产品详情
 * @param params
 */
export const getProductDetail = (params: { productId: string }) =>
  request<IProductDetailResponse>({
    url: '/product/get-product-detail',
    params,
    method: 'POST',
  });

/**
 * 收藏商品
 * @param params
 */
export const favoriteProduct = (params: {
  productId: string;
  favoriteType: boolean;
}) =>
  request<{ favoriteType: boolean }>({
    url: '/product/favorite-product-type',
    params,
    method: 'POST',
  });
