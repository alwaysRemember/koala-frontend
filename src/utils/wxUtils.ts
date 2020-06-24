/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 21:31:22
 * @LastEditTime: 2020-06-24 21:37:18
 * @FilePath: /koala-frontend/src/utils/wxUtils.ts
 */

import { EToastIcon } from "../enums/EWXUtils";

/**
 * 弹窗提醒
 * @param param0
 */
export const showToast = ({
  title,
  icon = EToastIcon.NONE,
  duration = 1000
}: {
  title: string;
  icon?: EToastIcon;
  duration?: number;
}): Promise<null> => {
  return new Promise(res => {
    wx.showToast({
      title,
      icon,
      duration
    });
    setTimeout(() => {
      res();
    }, duration);
  });
};
