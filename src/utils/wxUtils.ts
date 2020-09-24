/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 21:31:22
 * @LastEditTime: 2020-09-24 14:09:39
 * @FilePath: /koala-frontend/src/utils/wxUtils.ts
 */
import Taro from '@tarojs/taro';
import { ICreateOrderResponse } from 'src/pages/OrderConfirm/interface';
import { EToastIcon } from '../enums/EWXUtils';

/**
 * 弹窗提醒
 * @param param0
 */
export const showToast = ({
  title,
  icon = EToastIcon.NONE,
  duration = 1000,
}: {
  title: string;
  icon?: EToastIcon;
  duration?: number;
}): Promise<null> => {
  return new Promise((res) => {
    Taro.showToast({
      title,
      icon,
      duration,
      mask: true,
    });
    setTimeout(() => {
      res();
    }, duration);
  });
};

/**
 * 微信支付
 * @param param0
 */
export const wxPay = ({
  package: pk,
  paySign,
  timeStamp,
  nonceStr,
}: ICreateOrderResponse): Promise<null> => {
  return new Promise(async (res, rej) => {
    await Taro.requestPayment({
      package: pk,
      paySign,
      timeStamp,
      nonceStr,
      signType: 'MD5',
      fail(data) {
        rej(data);
      },
      success() {
        res();
      },
    });
  });
};
