/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 16:05:12
 * @LastEditTime: 2020-09-09 18:04:19
 * @FilePath: /koala-frontend/src/router/index.ts
 */

import { pathParamsTransfer } from '../utils';
import { IProductDetailPathParams } from 'src/pages/ProductDetail/interface';

type TPath<T extends {} | null> = (params?: T) => string;

/**
 * 产品详情页面
 * @param params
 */
export const productDetailPath: TPath<IProductDetailPathParams> = (params) =>
  `/pages/ProductDetail/index${params ? pathParamsTransfer(params) : ''}`;

/**
 * 小程序主页
 */
export const appletHomePath: TPath<null> = () => '/pages/Home/index';

/**
 * 登录页面
 */
export const loginPath: TPath<null> = () => '/pages/Login/index';

/**
 * 订单确认页面
 */
export const orderConfirmPath: TPath<null> = () => '/pages/OrderConfirm/index';
