import Taro, { showToast } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { IBtnProps, IOrderOperationBtnProps } from './interface';
import styles from './index.module.scss';
import { View } from '@tarojs/components';
import { setClassName } from '../../utils';
import { AtButton } from 'taro-ui';
import { EOrderType } from '../../enums/EOrder';
import { cancelOrder, orderPayment } from '../../api';
import { callWxPay } from '../../utils/wxUtils';

const OrderOperationBtn = ({
  orderId,
  orderType,
  updateTime,
  amount,
  changeData,
}: IOrderOperationBtnProps) => {
  const [btnList, setBtnList] = useState<Array<IBtnProps>>([]);

  // 退货
  const returnOfGoods = () => {};

  // 取消订单
  const cancelOrderFn = async () => {
    try {
      await cancelOrder({
        orderId: orderId,
      });
      await showToast({
        title: '取消成功',
      });
      changeData();
    } catch (e) {}
  };

  // 评价
  const comment = () => {};

  // 查看物流
  const viewLogitics = () => {};

  // 确认收货
  const confirmReceipt = () => {};

  // 付款
  const payment = async () => {
    try {
      const params = await orderPayment({ orderId: orderId });
      await callWxPay(params, amount);
      changeData();
    } catch (e) {}
  };

  useEffect(() => {
    setBtnList([
      {
        name: '取消订单',
        show:
          [EOrderType.PENDING_PAYMENT, EOrderType.TO_BE_DELIVERED].findIndex(
            (value) => value === orderType,
          ) !== -1,
        onClick: cancelOrderFn,
        className: 'cancel-order',
      },
      {
        name: '退货',
        show:
          [
            EOrderType.TO_BE_RECEIVED,
            EOrderType.COMMENT,
            EOrderType.FINISHED,
          ].findIndex((value) => value === orderType) > -1 &&
          new Date().getTime() - new Date(updateTime).getTime() <=
            604800000, // 当前订单状态支持退货&&订单最后一次修改时间小于7天
        onClick: returnOfGoods,
        className: 'return-of-goods',
      },
      {
        name: '查看物流',
        show: orderType === EOrderType.TO_BE_RECEIVED,
        onClick: viewLogitics,
        className: 'view-logitics',
      },
      {
        name: '评价',
        show: orderType === EOrderType.COMMENT,
        onClick: comment,
        className: 'comment',
      },
      {
        name: '付款',
        show: orderType === EOrderType.PENDING_PAYMENT,
        onClick: payment,
        className: 'payment',
      },
      {
        name: '确认收货',
        show: orderType === EOrderType.TO_BE_RECEIVED,
        onClick: confirmReceipt,
        className: 'confirm-receipt',
      },
    ]);
  }, []);
  return (
    <View className={styles['btn-wrappr']}>
      {btnList
        .filter((item) => item.show)
        .map(({ className, name, onClick }) => (
          <AtButton
            key={className}
            circle
            size="small"
            type="secondary"
            className={setClassName([styles['btn'], styles[className]])}
            onClick={onClick}
          >
            {name}
          </AtButton>
        ))}
    </View>
  );
};

export default OrderOperationBtn;
