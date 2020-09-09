/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-09-07 14:50:14
 * @LastEditTime: 2020-09-09 18:08:58
 * @FilePath: /koala-frontend/global.d.ts
 */
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
      | 'jd';
    [key: string]: any;
  };
};
