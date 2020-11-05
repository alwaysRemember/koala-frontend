import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import React from 'react';
import styles from './index.module.scss';
import { IOrderItemProps } from './interface';
import { EOrderTypeTransferVal } from '../../../../enums/EOrder';
import { transferAmount } from '../../../../utils';
import { orderDetailPagePath } from '../../../../router';
import OrderOperationBtn from '../../../../components/OrderOperationBtn';
import OrderProductItem from '../OrderProductItem';

const OrderItem = ({ data, changeData }: IOrderItemProps) => {
  return (
    <View
      className={styles['order-item-wrapper']}
      onClick={() => {
        Taro.navigateTo({
          url: orderDetailPagePath({
            orderId: data.orderId,
          }),
        });
      }}
    >
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
      {/* 商品列表 */}
      <OrderProductItem productList={data.productList} />

      <OrderOperationBtn
        orderId={data.orderId}
        amount={data.amount}
        orderCheckTime={data.orderCheckTime}
        orderCheck={data.orderCheck}
        orderType={data.orderType}
        hasRefundCourierInfo={data.hasRefundCourierInfo}
        productList={data.productList}
        changeData={changeData}
      />
    </View>
  );
};
export default OrderItem;
