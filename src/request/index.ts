/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 16:39:37
 * @LastEditTime: 2020-06-22 19:25:37
 * @FilePath: /koala-frontend/src/request/index.ts
 */
import Taro from "@tarojs/taro";
import { IRequestOptions, TContentType, IResponse } from "./interface";
import codeType from "./codeType";

const host =
  process.env.NODE_ENV === "development"
    ? "http://yaer.free.idcfengye.com"
    : "";

/**
 * 设置请求类型
 * @param ct
 */
const _setContentType = (ct: TContentType): string => {
  let contentType: string;
  switch (ct) {
    case "form":
      contentType = "application/x-www-form-urlencoded";
      break;
    case "formData":
      contentType = "multipart/form-data";
      break;
    case "json":
      contentType = "application/json";
      break;
    default:
      contentType = "application/json";
  }
  return contentType;
};

/**
 * 请求方法
 * @param param0
 */
export const request = <T>({
  url,
  params,
  method,
  contentType = "json",
  showLoading = true
}: IRequestOptions): Promise<T> => {
  showLoading &&
    Taro.showLoading({
      title: "Loading..."
    });
  return new Promise<T>(async (res, rej) => {
    try {
      // 发起请求
      const result = await Taro.request<IResponse<T>>({
        url: host + url,
        data: params,
        method,
        header: {
          "content-type": _setContentType(contentType)
        }
      });
      // 获取请求结果
      const { data } = await result;
      // 校验请求状态
      await codeType(data.code, data.message);
      res(data.data);
    } catch (e) {
      rej();
    } finally {
      Taro.hideLoading();
    }
  });
};
