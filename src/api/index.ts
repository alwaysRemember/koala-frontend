/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 17:39:39
 * @LastEditTime: 2020-06-23 15:47:07
 * @FilePath: /koala-frontend/src/api/index.ts
 */
import { request } from "../request/index";
import { IUserLoginParams, IFrontUserLoginResponse } from "src/pages/Login/interface";

/**
 * 用户登录
 * @param params
 */
export const userLogin = (params: IUserLoginParams) =>
  request<IFrontUserLoginResponse>({
    url: "/front/login",
    params,
    method: "POST"
  });
