import { View, Text } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import React from 'react';
import { transferAmount } from '../../utils';
import { AtIcon, AtButton } from 'taro-ui';
import { EPaymentResultType } from './enum';
import styles from './index.module.scss';
import { IPaymentResultPathParams } from './interface';
import {
  appletHomePath,
  orderDetailPagePath,
  orderListPath,
} from '../../router';
import { getOrderListAccordingToPayOrderId } from '../../api';
import { showToast } from '../../utils/wxUtils';
import { EOrderType } from '../../enums/EOrder';

/**
 * 进入当前页面必须为关闭历史所有所有记录的情况在跳转进来
 */
const PaymentResult = () => {
  const {
    params: { type = EPaymentResultType.SUCCESS, amount = '0', payOrderId },
  } = useRouter<IPaymentResultPathParams>();

  const goHome = () => {
    Taro.switchTab({
      url: appletHomePath(),
    });
  };

  const viewOrder = async () => {
    try {
      const { orderList } = await getOrderListAccordingToPayOrderId({
        payOrderId,
      });
      if (!orderList.length) {
        showToast({
          title: '未找到对应订单',
        });
        return;
      }
      let url: string = '';
      if (orderList.length === 1) {
        url = orderDetailPagePath({
          orderId: orderList[0],
        });
      } else {
        url = orderListPath({
          type: EOrderType.TO_BE_DELIVERED,
        });
      }
      Taro.redirectTo({
        url,
      });
    } catch (e) {}
  };

  // 获取支付结果
  const _getPaymentResult = (): { icon: string; msg: string } => {
    const data: {
      [key in EPaymentResultType]: { icon: string; msg: string };
    } = {
      [EPaymentResultType.SUCCESS]: {
        icon: 'chenggong',
        msg: `支付成功，支付金额：${transferAmount(amount, 'yuan')}`,
      },
      [EPaymentResultType.CANCEL]: {
        icon: 'shibai',
        msg: '支付失败,请在两小时内支付订单',
      },
    };
    return data[type];
  };

  const { icon, msg } = _getPaymentResult();

  return (
    <View className={styles['payment-result-wrapper']}>
      <AtIcon
        prefixClass="icon"
        value={icon}
        size="130"
        className={styles['payment-status']}
      />
      <Text className={styles['msg']}>{msg}</Text>
      <View className={styles['btn-wrapper']}>
        <AtButton
          type="primary"
          size="small"
          className={styles['go-home']}
          onClick={goHome}
        >
          回到首页
        </AtButton>
        <AtButton
          size="small"
          type="secondary"
          className={styles['view-order']}
          onClick={viewOrder}
        >
          查看订单
        </AtButton>
      </View>
    </View>
  );
};

export default PaymentResult;
