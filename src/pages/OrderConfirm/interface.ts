/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-09 17:28:13
 * @LastEditTime: 2020-09-15 18:05:30
 * @FilePath: /koala-frontend/src/pages/OrderConfirm/interface.ts
 */

import { IProductConfigModuleOption } from '../ProductDetail/interface';

// 下单页面的基础参数
export interface IOrderConfirmDefaultParams {
  productId: string;
  productName: string;
  productMainImg: string;
  buyQuantity: number; // 购买数量
  selectProductConfigList: Array<IProductConfigModuleOption>; // 选择的产品配置 如果没有配置则为undefined
  productAmount: number; //产品基础金额
  productShipping: number; //运费
}

/**
 * 下单接口所需参数
 */
export interface IBuyProductParams {
  buyProductList: Array<IBuyProductItem>;
}

/**
 * 下单产品参数
 */
export interface IBuyProductItem {
  productId: string;
  buyQuantity: number; // 购买数量
  selectProductConfigList: Array<number>;
}
