/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 16:05:12
 * @LastEditTime: 2020-08-25 16:16:15
 * @FilePath: /koala-frontend/src/router/index.ts
 */

import { pathParamsTransfer } from "../utils";
import { IProductDetailPathParams } from "src/pages/ProductDetail/interface";

/**
 * 产品详情页面
 * @param params
 */
export const productDetailPath = (params: IProductDetailPathParams): string =>
  `/pages/ProductDetail/index${params ? pathParamsTransfer(params) : ""}`;
