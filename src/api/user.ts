/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 14:53:22
 * @LastEditTime: 2020-08-25 15:38:06
 * @FilePath: /koala-frontend/src/api/user.ts
 */

import {
  IUserLoginParams,
  IFrontUserLoginResponse,
  IUpdateUserPhone
} from "../pages/Login/interface";
import { request } from "../request";

/**
 * 用户登录
 * @param params
 */
export const userLogin = (params: IUserLoginParams) =>
  request<IFrontUserLoginResponse>({
    url: "/login",
    params,
    method: "POST"
  });

/**
 * 更新用户手机号
 * @param params
 */
export const updateUserPhone = (params: IUpdateUserPhone) =>
  request<{ phone: string }>({
    url: "/update-user-phone",
    method: "POST",
    params,
    contentType: "json"
  });
