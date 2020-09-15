import React, { useState } from 'react';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { AtSwipeAction } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { IAddressItem, IAddressListPathParams } from './interface';
import { getShoppingAddressList } from '../../api';
import { EAddressListPathSource } from './enums';
import { setClassName } from '../../utils';
import { useDispatch } from 'redux-react-hook';
import { selectShoppingAddress } from '../../store/actions';
import { addShoppingAddressPath } from '../../router';
import { EPageType } from '../AddShoppingAddress/enums';

const AddressList = () => {
  const {
    params: { source = EAddressListPathSource.USER_CENTER },
  } = useRouter<IAddressListPathParams>();
  const dispatch = useDispatch();
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
    console.log('addressClick');

    if (source !== EAddressListPathSource.ORDER_CONFIRM) return;
  };

  /**
   * 滑动操作栏点击
   * @param index
   */
  const actionClick = (index: number) => {
    console.log('actionClick');

    // 删除
    if (index === 0) {
    }
  };

  /**
   * 修改收货地址数据
   * @param data
   */
  const modifyAddress = (data: IAddressItem) => {
    console.log('modifyAddress');

    dispatch(selectShoppingAddress(data));
    Taro.navigateTo({
      url: addShoppingAddressPath({ type: EPageType.UPDATE }),
    });
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
      {data.map((item) => (
        <AtSwipeAction
          onClick={(_, index) => {
            actionClick(index);
          }}
          isOpened={item.id === addressItemOpenedId}
          autoClose
          key={item.id}
          options={[
            {
              text: '删除',
              style: {
                backgroundColor: '#e93b3d',
              },
            },
          ]}
          onOpened={() => setAddressItemOpenedId(item.id)}
        >
          <View
            className={styles['address-item']}
            onClick={() => addressClick(item.id)}
          >
            <View className={styles['info']}>
              <Text className={styles['info-top']}>
                <Text className={styles['name-and-phone']}>
                  {item.name} &nbsp; {item.phone}
                </Text>
                {item.isDefaultSelection && (
                  <Text className={styles['default-selection']}>默认</Text>
                )}
              </Text>
              <Text className={styles['address']}>
                {item.area.join(' ')} {item.address}
              </Text>
            </View>
            <View
              className={setClassName([
                'at-icon',
                'at-icon-settings',
                styles['setting'],
              ])}
              onClick={(e) => {
                e.stopPropagation();
                modifyAddress(item);
              }}
            />
          </View>
        </AtSwipeAction>
      ))}
    </View>
  );
};

export default AddressList;
