/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 16:05:12
 * @LastEditTime: 2020-10-28 18:24:27
 * @FilePath: /koala-frontend/src/router/index.ts
 */

import { pathParamsTransfer } from '../utils';
import { IProductDetailPathParams } from 'src/pages/ProductDetail/interface';
import { IAddressListPathParams } from 'src/pages/AddressList/interface';
import { IAddShoppingAddressPathParams } from 'src/pages/AddShoppingAddress/interface';
import { IPaymentResultPathParams } from 'src/pages/PaymentResult/interface';
import { IOrderListPathParams } from 'src/pages/OrderList/interface';
import { ILogisticsInfoPathParams } from 'src/pages/LogisticsInfo/interface';

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

/**
 * 地址管理页面
 * @param params
 */
export const addressListPath: TPath<IAddressListPathParams> = (params) =>
  `/pages/AddressList/index${params ? pathParamsTransfer(params) : ''}`;

/**
 * 添加/修改 收货地址
 * @param params
 */
export const addShoppingAddressPath: TPath<IAddShoppingAddressPathParams> = (
  params,
) =>
  `/pages/AddShoppingAddress/index${params ? pathParamsTransfer(params) : ''}`;

/**
 * 支付结果页面
 * @param params
 */
export const paymentResultPath: TPath<IPaymentResultPathParams> = (params) =>
  `/pages/PaymentResult/index${params ? pathParamsTransfer(params) : ''}`;

/**
 * 订单列表页面
 * @param params
 */
export const orderListPath: TPath<IOrderListPathParams> = (params) =>
  `/pages/OrderList/index${params ? pathParamsTransfer(params) : ''}`;

/**
 * 快递信息页面
 * @param params
 */
export const logisticsInfo: TPath<ILogisticsInfoPathParams> = (params) =>
  `/pages/LogisticsInfo/index${params ? pathParamsTransfer(params) : ''}`;
