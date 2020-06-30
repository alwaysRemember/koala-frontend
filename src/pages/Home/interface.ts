/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-30 14:19:31
 * @LastEditTime: 2020-06-30 16:10:45
 * @FilePath: /koala-frontend/src/pages/Home/interface.ts
 */

export interface IHomeData {
  bannerList: Array<IBannerItem>;
  classificationList: Array<IClassificationItem>;
  showClassificationMore: boolean; // 是否显示分类的更多选项
  featuredList: Array<IFeaturedItem>;
}

export interface IBannerItem {
  id: number;
  imgUrl: string;
  path: string;
}

// 分类
export interface IClassificationItem {
  id: number;
  name: string;
  path: string;
  imgUrl: string;
}

// 精选推荐
export interface IFeaturedItem {
  id: number;
  logo: string;
  name: string;
  introduction: string;
  amount: number;
}
