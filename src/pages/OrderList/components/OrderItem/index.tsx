import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import React from 'react';
import styles from './index.module.scss';
import { IOrderItemProps } from './interface';
import { EOrderTypeTransferVal } from '../../../../enums/EOrder';
import { transferAmount } from '../../../../utils';
import ImagePreload from '../../../../components/ImagePreload';
import OrderOperationBtn from '../../../../components/OrderOperationBtn';

const OrderItem = ({ data, changeData }: IOrderItemProps) => {
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

        <OrderOperationBtn
          orderId={data.orderId}
          amount={data.amount}
          orderCheckTime={data.orderCheckTime}
          orderCheck={data.orderCheck}
          orderType={data.orderType}
          changeData={changeData}
        />
      </View>
    </View>
  );
};
export default OrderItem;
