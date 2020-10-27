import Taro, { showToast } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { IBtnProps, IOrderOperationBtnProps } from './interface';
import styles from './index.module.scss';
import { View } from '@tarojs/components';
import { setClassName } from '../../utils';
import { AtButton } from 'taro-ui';
import { EOrderType } from '../../enums/EOrder';
import {
  cancelOrder,
  confirmOrder,
  orderPayment,
  returnOfGoods,
} from '../../api';
import { callWxPay } from '../../utils/wxUtils';
import { useDispatch } from 'redux-react-hook';
import {
  updateReturnOfGoodsModalInfo,
  updateReturnOfGoodsModalType,
} from '../../store/actions';

const OrderOperationBtn = ({
  orderId,
  orderType,
  updateTime,
  amount,
  changeData,
  orderCheck,
}: IOrderOperationBtnProps) => {
  const dispatch = useDispatch();

  const [btnList, setBtnList] = useState<Array<IBtnProps>>([]);

  // 退货
  const returnOfGoodsFn = () => {
    dispatch(
      updateReturnOfGoodsModalInfo({
        amount,
        confirm: async (reason: string) => {
          try {
            await returnOfGoods({ orderId, reason });
            changeData();
          } catch (e) {}
        },
      }),
    );
    dispatch(updateReturnOfGoodsModalType(true));
  };

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
  const confirmOrderFn = async () => {
    try {
      await confirmOrder({ orderId });
      await showToast({
        title: '收货成功',
      });
      changeData();
    } catch (e) {}
  };

  // 付款
  const payment = async () => {
    try {
      const params = await orderPayment({ orderId: orderId });
      await callWxPay(params, amount);
      changeData();
    } catch (e) {}
  };

  // 退款快递信息
  const refundCourierInfoFn = () => {
    try {
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
          new Date().getTime() - new Date(updateTime).getTime() <= 604800000, // 当前订单状态支持退货&&订单最后一次修改时间小于7天
        onClick: returnOfGoodsFn,
        className: 'return-of-goods',
      },
      // 当前btn显示判断为 已完结||待评价 && 订单已签收
      {
        name: '退货快递信息',
        show:
          [EOrderType.COMMENT, EOrderType.FINISHED].findIndex(
            (value) => value === orderType,
          ) > -1 && orderCheck,
        onClick: refundCourierInfoFn,
        className: 'refund-courier-info',
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
        onClick: confirmOrderFn,
        className: 'confirm-receipt',
      },
    ]);
  }, [orderType, orderCheck]);

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
