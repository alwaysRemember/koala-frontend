import { IProductConfigModuleItem } from '../../interface';
import { MutableRefObject } from 'react';

/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-08 15:07:39
 * @LastEditTime: 2020-09-08 15:19:36
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/SelectProductConfig/interface.ts
 */
export interface ISelectProductConfig {
  productConfig: Array<IProductConfigModuleItem>;
  productMainImg: string;
  cref: MutableRefObject<ISelectProductConfigRef | undefined>;
  productAmount: string;
}
export interface ISelectProductConfigRef {
  changeShow: (type: boolean) => void;
}
