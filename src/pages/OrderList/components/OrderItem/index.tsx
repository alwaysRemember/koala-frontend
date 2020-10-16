import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtButton, AtIcon } from 'taro-ui';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { IBtnProps, IOrderItemProps } from './interface';
import { EOrderType, EOrderTypeTransferVal } from '../../../../enums/EOrder';
import { setClassName, transferAmount } from '../../../../utils';
import ImagePreload from '../../../../components/ImagePreload';
const OrderItem = ({ data }: IOrderItemProps) => {
  const [btnList, setBtnList] = useState<Array<IBtnProps>>([]);

  // 退货
  const returnOfGoods = () => {};

  // 取消订单
  const cancelOrder = () => {};

  // 评价
  const comment = () => {};

  // 查看物流
  const viewLogitics = () => {};

  // 确认收货
  const confirmReceipt = () => {};

  // 付款
  const payment = () => {};

  useEffect(() => {
    setBtnList([
      {
        name: '取消订单',
        show:
          [EOrderType.PENDING_PAYMENT, EOrderType.TO_BE_DELIVERED].findIndex(
            (value) => value === data.orderType,
          ) !== -1,
        onClick: cancelOrder,
        className: 'cancel-order',
      },
      {
        name: '退货',
        show:
          [
            EOrderType.TO_BE_RECEIVED,
            EOrderType.COMMENT,
            EOrderType.FINISHED,
          ].findIndex((value) => value === data.orderType) > -1 &&
          new Date().getTime() - new Date(data.updateTime).getTime() <=
            604800000, // 当前订单状态支持退货&&订单最后一次修改时间小于7天
        onClick: returnOfGoods,
        className: 'return-of-goods',
      },
      {
        name: '查看物流',
        show: data.orderType === EOrderType.TO_BE_RECEIVED,
        onClick: viewLogitics,
        className: 'view-logitics',
      },
      {
        name: '评价',
        show: data.orderType === EOrderType.COMMENT,
        onClick: comment,
        className: 'comment',
      },
      {
        name: '付款',
        show: data.orderType === EOrderType.PENDING_PAYMENT,
        onClick: payment,
        className: 'payment',
      },
      {
        name: '确认收货',
        show: data.orderType === EOrderType.TO_BE_RECEIVED,
        onClick: confirmReceipt,
        className: 'confirm-receipt',
      },
    ]);
  }, []);
  return (
    <View className={styles['order-item-wrapper']}>
      <View className={styles['order-id']}>
        <View className={styles['info']}>
          <Text className={styles['label']}>订单号: </Text>
          <Text className={styles['value']}>{data.orderId}</Text>
        </View>
        <View
          className={styles['copy']}
          onClick={() => {
            Taro.setClipboardData({
              data: data.orderId,
            });
          }}
        >
          <AtIcon prefixClass="icon" value="fuzhi" size="12" />
        </View>
      </View>
      <View className={styles['order-info']}>
        <View className={styles['order-amount']}>
          <Text className={styles['label']}>订单金额: </Text>
          <Text className={styles['value']}>
            {transferAmount(data.amount, 'yuan')} 元
          </Text>
        </View>
        <Text className={styles['order-type']}>
          {EOrderTypeTransferVal[data.orderType]}
        </Text>
      </View>
      <View className={styles['product-list']}>
        {data.productList.map((item) => (
          <View className={styles['product-item']} key={item.productId}>
            <View className={styles['img']}>
              <ImagePreload
                src={item.img}
                width={180}
                height={180}
                borderRadius={14}
              />
            </View>
            {/* 商品信息 */}
            <View className={styles['product-info']}>
              <Text className={styles['product-name']}>{item.name}</Text>
              <View className={styles['config-and-quantity']}>
                <Text className={styles['config']}>
                  {item.productConfigList.join(' ')}
                </Text>
                <Text className={styles['quantity']}>X {item.buyQuantity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
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
    </View>
  );
};
export default OrderItem;
