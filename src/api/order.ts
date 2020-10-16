import {
  ICreateOrderParams,
  ICreateOrderResponse,
} from 'src/pages/OrderConfirm/interface';
import {
  IGetOrderListRequestParams,
  IGetOrderListResponse,
} from 'src/pages/OrderList/interface';
import { IGetOrderListAccordingToPayOrderId } from 'src/pages/PaymentResult/interface';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-23 12:23:18
 * @LastEditTime: 2020-10-15 15:07:02
 * @FilePath: /koala-frontend/src/api/order.ts
 */
import { request } from '../request';

const BASE = '/order';

/**
 * 创建订单
 * @param params
 */
export const createOrder = (params: ICreateOrderParams) =>
  request<ICreateOrderResponse>({
    method: 'POST',
    url: `${BASE}/create-order`,
    params,
  });

/**
 *根据支付id获取订单列表
 * @param params
 */
export const getOrderListAccordingToPayOrderId = (params: {
  payOrderId: string;
}) =>
  request<IGetOrderListAccordingToPayOrderId>({
    method: 'POST',
    url: `${BASE}/get-pay-order`,
    params,
  });

/**
 * 获取订单列表
 * @param params
 */
export const getOrderList = (params: IGetOrderListRequestParams) =>
  request<IGetOrderListResponse>({
    method: 'POST',
    url: `${BASE}/get-order-list`,
    params,
  });
