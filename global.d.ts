/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-19 14:26:50
 * @LastEditTime: 2020-06-19 17:17:42
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
