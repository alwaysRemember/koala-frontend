/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-30 14:19:31
 * @LastEditTime: 2020-08-13 15:43:52
 * @FilePath: /koala-frontend/src/pages/Home/interface.ts
 */

import { EBannerTypeEnum } from "./components/Banner/enums";

export interface IHomeData {
  bannerList: Array<IBannerItem>;
  categoriesList: Array<ICategoriesItem>;
  showCategoriesMore: boolean; // 是否显示分类的更多选项
  featuredList: Array<IFeaturedItem>;
}

export interface IBannerItem {
  id: number;
  imgUrl: string;
  type: EBannerTypeEnum;
}

// 分类
export interface ICategoriesItem {
  id: string;
  categoriesName: string;
  categoriesIconUrl: string;
}

// 精选推荐
export interface IFeaturedItem {
  id: string;
  logo: string;
  name: string;
  introduction: string;
  amount: number;
}
