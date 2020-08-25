/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 14:54:46
 * @LastEditTime: 2020-08-25 15:38:16
 * @FilePath: /koala-frontend/src/api/home.ts
 */

import { IHomeData } from "../pages/Home/interface";
import { request } from "../request";

/**
 * 获取首页信息
 */
export const getHomeInfo = () =>
  request<IHomeData>({
    url: "/home/get-home-data",
    method: "GET"
  });
