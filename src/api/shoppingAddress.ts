/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-11 14:19:09
 * @LastEditTime: 2020-09-11 15:28:18
 * @FilePath: /koala-frontend/src/api/shoppingAddress.ts
 */
import { request } from '../request';
import { ICityDataItem } from '../pages/AddShoppingAddress/interface';

/**
 * 获取省市区数据
 */
export const getCityData = () =>
  request<Array<ICityDataItem>>({
    url: '/global/get-city-data',
    method: 'GET',
  });
