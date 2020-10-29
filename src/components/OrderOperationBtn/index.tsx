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
  refundCourierInfo,
  returnOfGoods,
} from '../../api';
import { callWxPay } from '../../utils/wxUtils';
import { useDispatch } from 'redux-react-hook';
import {
  updateCommentPageData,
  updateRefundCourierInfoModalInfo,
  updateRefundCourierInfoModalType,
  updateReturnOfGoodsModalInfo,
  updateReturnOfGoodsModalType,
} from '../../store/actions';
import { EToastIcon } from '../../enums/EWXUtils';
import { commentPagePath, logisticsInfo } from '../../router';

const OrderOperationBtn = ({
  orderId,
  orderType,
  orderCheckTime,
  amount,
  changeData,
  orderCheck,
  hasRefundCourierInfo,
  productList,
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
  const comment = () => {
    dispatch(updateCommentPageData({ productList }));
    Taro.navigateTo({
      url: commentPagePath({ orderId }),
    });
  };

  // 查看物流
  const viewLogistics = () => {
    Taro.navigateTo({
      url: logisticsInfo({
        orderId,
      }),
    });
  };

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
    dispatch(
      updateRefundCourierInfoModalInfo({
        confirm: async (params) => {
          try {
            await refundCourierInfo({ ...params, orderId });
            await showToast({
              title: '添加快递信息成功',
              icon: EToastIcon.SUCCESS,
            });
            changeData();
          } catch (e) {}
        },
      }),
    );
    dispatch(updateRefundCourierInfoModalType(true));
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
          new Date().getTime() -
            new Date(orderCheckTime || new Date()).getTime() <=
            604800000, // 当前订单状态支持退货&&签收时间在七天内
        onClick: returnOfGoodsFn,
        className: 'return-of-goods',
      },
      // 当前btn显示判断为 退款中 && 订单已签收 && 未填写过退款快递信息
      {
        name: '退货快递信息填写',
        show:
          [EOrderType.REFUNDING].findIndex((value) => value === orderType) >
            -1 &&
          orderCheck &&
          !hasRefundCourierInfo,
        onClick: refundCourierInfoFn,
        className: 'refund-courier-info',
      },
      {
        name: '查看物流',
        show:
          [
            EOrderType.TO_BE_RECEIVED,
            EOrderType.COMMENT,
            EOrderType.FINISHED,
          ].findIndex((v) => v === orderType) > -1,
        onClick: viewLogistics,
        className: 'view-logistics',
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
  }, [orderType, orderCheck, orderCheckTime, hasRefundCourierInfo]);

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
