/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 17:39:39
 * @LastEditTime: 2020-07-01 15:57:37
 * @FilePath: /koala-frontend/src/api/index.ts
 */
import { request } from "../request/index";
import {
  IUserLoginParams,
  IFrontUserLoginResponse
} from "src/pages/Login/interface";
import { IHomeData } from "src/pages/Home/interface";

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

/**
 * 获取首页信息
 */
export const getHomeInfo = () =>
  request<IHomeData>({
    url: "/front/home",
    method: "GET"
  });
