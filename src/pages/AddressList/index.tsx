import React, { useState } from 'react';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { AtSwipeAction } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { IAddressItem, IAddressListPathParams } from './interface';
import { getShoppingAddressList } from '../../api';
import { EAddressListPathSource } from './enums';
import { setClassName } from '../../utils';

const AddressList = () => {
  const {
    params: { source = EAddressListPathSource.USER_CENTER },
  } = useRouter<IAddressListPathParams>();
  const [data, setData] = useState<Array<IAddressItem>>([]);

  const [addressItemOpenedId, setAddressItemOpenedId] = useState<number>();

  const getData = async () => {
    try {
      const list = await getShoppingAddressList();
      setData(list);
    } catch (e) {}
  };

  /**
   * 地址点击
   * @param id
   */
  const addressClick = (id: number) => {
    if (source !== EAddressListPathSource.ORDER_CONFIRM) return;
  };

  /**
   * 滑动操作栏点击
   * @param index
   */
  const actionClick = (index: number) => {
    // 删除
    if (index === 0) {
    }
  };

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title:
        source === EAddressListPathSource.ORDER_CONFIRM
          ? '选择收货地址'
          : '收货地址管理',
    });
    getData();
  });

  return (
    <View className={styles['address-list']}>
      {data.map(({ id, name, phone, address, isDefaultSelection, area }) => (
        <AtSwipeAction
          onClick={(_, index) => {
            actionClick(index);
          }}
          isOpened={id === addressItemOpenedId}
          autoClose
          key={id}
          options={[
            {
              text: '删除',
              style: {
                backgroundColor: '#e93b3d',
              },
            },
          ]}
          onOpened={() => setAddressItemOpenedId(id)}
        >
          <View
            className={styles['address-item']}
            onClick={() => addressClick(id)}
          >
            <View className={styles['info']}>
              <Text className={styles['info-top']}>
                <Text className={styles['name-and-phone']}>
                  {name} &nbsp; {phone}
                </Text>
                {isDefaultSelection && (
                  <Text className={styles['default-selection']}>默认</Text>
                )}
              </Text>
              <Text className={styles['address']}>
                {area.join(' ')} {address}
              </Text>
            </View>
            <View
              className={setClassName([
                'at-icon',
                'at-icon-settings',
                styles['setting'],
              ])}
            />
          </View>
        </AtSwipeAction>
      ))}
    </View>
  );
};

export default AddressList;
