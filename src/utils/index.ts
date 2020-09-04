/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-25 16:08:27
 * @LastEditTime: 2020-09-04 11:37:29
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

/**
 * 金额转换
 * @param value
 * @param type
 */
export const transferAmount = (
  value: number | string,
  type: "yuan" | "fen" = "yuan"
): number | string => {
  switch (type) {
    case "yuan":
      return (Number(value) / 100).toFixed(2);
    case "fen":
      return Number(value) * 100;
  }
};

export const setClassName = (classNameList: Array<string>) =>
  classNameList.join(" ");
