/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-09 17:28:13
 * @LastEditTime: 2020-09-09 17:33:36
 * @FilePath: /koala-frontend/src/pages/OrderConfirm/interface.ts
 */

import { IProductConfigModuleOption } from '../ProductDetail/interface';

// 下单页面的基础参数
export interface IOrderConfirmDefaultParams {
  productId: string;
  buyQuantity: number; // 购买数量
  selectProductConfigList: Array<IProductConfigModuleOption> | undefined; // 选择的产品配置 如果没有配置则为undefined
  productAmount: number; //产品基础金额
}
