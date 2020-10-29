/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-23 12:23:18
 * @LastEditTime: 2020-10-29 16:35:42
 * @FilePath: /koala-frontend/src/api/order.ts
 */
import { IRefundCourierInfo } from 'src/components/OrderOperationBtn/interface';
import { IProductCommentRequestData } from 'src/pages/CommentPage/interface';
import { ILogisticsInfoResponseData } from 'src/pages/LogisticsInfo/interface';
import {
  ICreateOrderParams,
  ICreateOrderResponse,
} from 'src/pages/OrderConfirm/interface';
import {
  IGetOrderListRequestParams,
  IGetOrderListResponse,
} from 'src/pages/OrderList/interface';
import { IGetOrderListAccordingToPayOrderId } from 'src/pages/PaymentResult/interface';
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
 * @param isShowLoading 是否显示loading组件
 */
export const getOrderList = (
  params: IGetOrderListRequestParams,
  isShowLoading: boolean,
) =>
  request<IGetOrderListResponse>({
    method: 'POST',
    url: `${BASE}/get-order-list`,
    params,
    showLoading: isShowLoading,
  });

/**
 * 取消订单
 * @param params
 */
export const cancelOrder = (params: { orderId: string }) =>
  request({
    method: 'POST',
    url: `${BASE}/cancel-order`,
    params,
  });

/**
 * 订单付款
 * @param params
 */
export const orderPayment = (params: { orderId: string }) =>
  request<ICreateOrderResponse>({
    method: 'POST',
    url: `${BASE}/order-payment`,
    params,
  });

/**
 * 申请退款
 * @param params
 */
export const returnOfGoods = (params: { orderId: string; reason: string }) =>
  request({
    method: 'POST',
    url: `${BASE}/return-of-goods`,
    params,
  });

/**
 * 确认收货
 * @param params
 */
export const confirmOrder = (params: { orderId: string }) =>
  request({
    method: 'POST',
    url: `${BASE}/confirm-order`,
    params,
  });

/**
 * 添加退货快递信息
 * @param params
 */
export const refundCourierInfo = (params: IRefundCourierInfo) =>
  request({
    method: 'POST',
    url: `${BASE}/add-refund-courier-info`,
    params,
  });

/**
 * 获取快递信息
 * @param params
 */
export const getLogisticsInfo = (params: { orderId: string }) =>
  request<ILogisticsInfoResponseData | null>({
    url: `${BASE}/get-logistics-info`,
    method: 'POST',
    params,
  });

/**
 * 提交订单评价
 * @param params
 */
export const submitOrderComment = (params: IProductCommentRequestData) =>
  request({
    url: `${BASE}/submit-order-comment`,
    method: 'POST',
    params,
  });
