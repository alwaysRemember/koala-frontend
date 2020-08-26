/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-26 16:10:58
 * @LastEditTime: 2020-08-26 16:31:41
 * @FilePath: /koala-frontend/src/pages/ProductDetail/components/Banner/interface.ts
 */

import { IProductDetailVideo, IProductDetailBanner } from "../../interface";

export interface IBannerProps {
  video: IProductDetailVideo;
  bannerList: Array<IProductDetailBanner>;
}

export enum EModuleSwitch {
  VIDEO = "VIDEO",
  "IMG" = "IMG"
}

export interface IModuleListItem {
  title: string;
  click: () => void;
  type: EModuleSwitch;
  status: boolean;
}
