import { EProductStatus } from 'src/enums/EProduct';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-20 14:00:04
 * @LastEditTime: 2020-09-09 16:06:57
 * @FilePath: /koala-frontend/src/pages/ProductDetail/interface.ts
 */

export interface IProductDetailPathParams {
  productId: string;
}

// 产品详情数据
// TODO 缺少数据： 产品评价
export interface IProductDetailResponse {
  productId: string;
  productVideo: IProductDetailVideo;
  productBanner: Array<IProductDetailBanner>;
  productAmount: number;
  productName: string;
  productStatus: EProductStatus;
  productType: boolean; // 是否为7天无理由退款商品
  productBrief: string; // 产品简介
  productContent: string; // 产品内容介绍
  productParameter: Array<{ key: string; value: string }>; // 产品参数
  productConfigList: Array<IProductConfig>;
  productDeliveryCity: string; // 发货地点
  productSales: number; // 产品销量
  productShipping: number; // 运费
  productFavorites: boolean; // 收藏状态
  productMainImg: string; //商品主图
}

// 产品配置
export interface IProductConfig {
  id: number;
  categoryName: string; // 分类名称
  name: string; // 配置项名称
  amount: number;
}

export interface IProductDetailFile {
  id: string;
  url: string;
}
export interface IProductDetailVideo extends IProductDetailFile {}

export interface IProductDetailBanner extends IProductDetailFile {}

export interface IProductConfigModuleOption extends IProductConfig {
  isSelect: boolean;
}
export interface IProductConfigModuleItem {
  categoryName: string;
  list: Array<IProductConfigModuleOption>;
}
export interface IPageGlobal {
  pageLoading: boolean;
}
