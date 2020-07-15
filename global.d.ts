/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-19 14:26:50
 * @LastEditTime: 2020-07-15 14:13:19
 * @FilePath: /koala-frontend/global.d.ts
 */

declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.css";
declare module "*.less";
declare module "*.scss";
declare module "*.sass";
declare module "*.styl";

declare namespace JSX {
  interface IntrinsicElements {
    import: any;
    template: any;
  }
}

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | "weapp"
      | "swan"
      | "alipay"
      | "h5"
      | "rn"
      | "tt"
      | "quickapp"
      | "qq";
    [key: string]: any;
  };
};
declare const wx: {
  [key: string]: any;
};
