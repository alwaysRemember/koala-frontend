import {
  IProductConfigModuleItem,
  IProductDetailResponse,
  IProductConfigModuleOption,
} from '../../interface';
import { MutableRefObject } from 'react';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-08 15:07:39
 * @LastEditTime: 2020-11-27 16:47:15
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/SelectProductConfig/interface.ts
 */

export interface ISelectProductConfig {
  productConfig: Array<IProductConfigModuleItem>;
  cref: MutableRefObject<ISelectProductConfigRef | undefined>;
  productShowAmount: string; // 经过父级处理过的显示出的金额
  data: IProductDetailResponse;
  buyNow: (type: 'modal') => void;
  saveToShoppingCart: (type: 'modal') => void;
  selectProductConfigListChange: (
    list: Array<IProductConfigModuleOption>,
  ) => void;
}
export interface ISelectProductConfigRef {
  changeShow: (type: boolean) => void; //修改modal显示状态
  getBuyQuantity: () => number; // 获取购买数量
}
