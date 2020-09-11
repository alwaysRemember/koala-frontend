/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 16:48:55
 * @LastEditTime: 2020-09-11 15:11:40
 * @FilePath: /koala-frontend/src/request/interface.ts
 */

import { EResponseCode } from './enum';

export type TContentType = 'form' | 'json' | 'formData';
export type TMethods = 'POST' | 'GET';

export interface IRequestOptions {
  url: string;
  params?: any;
  method: TMethods;
  contentType?: TContentType;
  showLoading?: boolean;
  isStaticResources?: boolean; // 是否为静态资源
}

export interface IResponse<T> {
  code: EResponseCode;
  data: T;
  message: string;
}
