import {
  ICreateOrderParams,
  ICreateOrderResponse,
} from 'src/pages/OrderConfirm/interface';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-23 12:23:18
 * @LastEditTime: 2020-09-23 12:25:47
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
