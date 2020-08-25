/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 16:08:27
 * @LastEditTime: 2020-08-25 16:12:50
 * @FilePath: /koala-frontend/src/utils/index.ts
 */

 /**
  * 格式化路由参数
  * @param params 
  */
export const pathParamsTransfer = (params: { [key: string]: any }): string => {
  const arr = Object.keys(params);
  return arr
    .map(
      (key, index) =>
        `${!index ? "?" : ""}${key}=${params[key]}${
          index !== arr.length - 1 ? "&" : ""
        }`
    )
    .join("");
};