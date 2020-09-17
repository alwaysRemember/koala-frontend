import { IAddressItem } from '../AddressList/interface';
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-09 17:28:13
 * @LastEditTime: 2020-09-17 17:59:43
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

export interface IBuyProductItem extends IOrderConfirmDefaultParams {
  remarks: string;
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
export interface IOrderItem {
  productId: string;
  buyQuantity: number; // 购买数量
  selectProductConfigList: Array<number>;
}

/**
 * 获取默认收货地址接口response
 */
export interface IGetDefaultShoppingAddressResponse {
  defaultAddress: IAddressItem;
  addressLength: number;
}
