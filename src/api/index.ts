/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 17:39:39
 * @LastEditTime: 2020-06-22 19:19:21
 * @FilePath: /koala-frontend/src/api/index.ts
 */
import { request } from "../request/index";

export const userLogin = () =>
  request<{id:string}>({
    url: "/front/login/1",
    params: {},
    method: "POST"
  });
