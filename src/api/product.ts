/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 15:02:42
 * @LastEditTime: 2020-11-18 15:08:30
 * @FilePath: /koala-frontend/src/api/product.ts
 */
import { IProductCommentResponseData } from 'src/pages/ProductComment/interface';
import { IProductDetailResponse } from 'src/pages/ProductDetail/interface';
import {
  IProductListRequestParams,
  IProductListResponseData,
} from 'src/pages/ProductList/interface';
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

/**
 * 获取商品评价
 * @param params
 */
export const getProductComment = (params: { productId: string }) =>
  request<IProductCommentResponseData>({
    url: `/product/get-product-comment`,
    params,
    method: 'POST',
  });

/**
 * 获取产品列表
 * @param params
 * @param showLoading
 */
export const getProductList = (
  params: IProductListRequestParams,
  showLoading: boolean,
) =>
  request<IProductListResponseData>({
    url: `/product/get-product-list`,
    method: 'POST',
    params,
    showLoading,
  });
