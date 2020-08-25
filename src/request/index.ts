/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-22 16:39:37
 * @LastEditTime: 2020-08-25 16:00:02
 * @FilePath: /koala-frontend/src/request/index.ts
 */
import Taro from "@tarojs/taro";
import { IRequestOptions, TContentType, IResponse } from "./interface";
import codeType from "./codeType";
import { showToast } from "../utils/wxUtils";
import store from "../store";

const mockUrl = "http://192.168.50.198:3721";
const serverTestUrl = "http://yaer.ngrok2.xiaomiqiu.cn";

const host = process.env.NODE_ENV === "development" ? serverTestUrl : serverTestUrl;

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
      title: "请稍等...",
      mask: true
    });
  return new Promise<T>(async (res, rej) => {
    try {
      // 发起请求
      const result = await Taro.request<IResponse<T>>({
        url: `${host}/api/front${url}`,
        data: params,
        method,
        header: {
          "content-type": _setContentType(contentType),
          openid: store.getState().userInfo.openid
        }
      });
      // 判断请求code是否为200
      if (result.statusCode !== 200) throw new Error("服务器出错，请稍后重试");

      // 获取请求结果
      const { data } = await result;
      // 校验请求状态
      await codeType(data.code, data.message);
      res(data.data);
    } catch (e) {
      await showToast({
        title: (e.message && e.message) || "服务器出错，请稍后重试"
      });
      rej();
    } finally {
      Taro.hideLoading();
    }
  });
};
