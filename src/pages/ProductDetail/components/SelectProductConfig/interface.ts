import { IProductConfigModuleItem, IProductDetailResponse } from '../../interface';
import { MutableRefObject } from 'react';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-08 15:07:39
 * @LastEditTime: 2020-09-08 17:04:56
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/SelectProductConfig/interface.ts
 */
export interface ISelectProductConfig {
  productConfig: Array<IProductConfigModuleItem>;
  cref: MutableRefObject<ISelectProductConfigRef | undefined>;
  productShowAmount: string; // 经过父级处理过的显示出的金额
  data: IProductDetailResponse;
}
export interface ISelectProductConfigRef {
  changeShow: (type: boolean) => void;
}
