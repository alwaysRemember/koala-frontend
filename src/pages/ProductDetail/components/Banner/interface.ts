/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-26 16:10:58
 * @LastEditTime: 2020-09-09 16:08:03
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/Banner/interface.ts
 */

import {
  IProductDetailVideo,
  IProductDetailBanner,
  IPageGlobal,
} from '../../interface';

export interface IBannerProps extends IPageGlobal {
  video: IProductDetailVideo;
  bannerList: Array<IProductDetailBanner>;
}

export enum EModuleSwitch {
  VIDEO = 'VIDEO',
  IMG = 'IMG',
}

export interface IModuleListItem {
  title: string;
  click: () => void;
  type: EModuleSwitch;
  status: boolean;
}
