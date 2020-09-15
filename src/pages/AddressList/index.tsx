import React, { useState } from 'react';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import { AtSwipeAction, AtDivider, AtButton } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import { IAddressItem, IAddressListPathParams } from './interface';
import { deleteShoppingAddress, getShoppingAddressList } from '../../api';
import { EAddressListPathSource } from './enums';
import { setClassName } from '../../utils';
import { useDispatch } from 'redux-react-hook';
import { selectShoppingAddress } from '../../store/actions';
import { addShoppingAddressPath } from '../../router';
import { EPageType } from '../AddShoppingAddress/enums';
import { showToast } from '../../utils/wxUtils';

const AddressList = () => {
  const {
    params: { source = EAddressListPathSource.USER_CENTER },
  } = useRouter<IAddressListPathParams>();
  const dispatch = useDispatch();
  const [data, setData] = useState<Array<IAddressItem>>([]);

  const [addressItemOpenedId, setAddressItemOpenedId] = useState<number>(); // 当前滑动打开的地址操作栏id

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
  const addressClick = (data: IAddressItem) => {
    if (source !== EAddressListPathSource.ORDER_CONFIRM) return;
    dispatch(selectShoppingAddress(data));
    Taro.navigateBack();
  };

  /**
   * 滑动操作栏点击
   * @param index 0 删除
   * @param id
   */
  const actionClick = async (index: number, { id }: IAddressItem) => {
    // 删除
    if (index === 0) {
      await deleteShoppingAddress({ id });
      await showToast({
        title: '删除成功',
      });
      getData();
    }
  };

  /**
   * 修改收货地址数据
   * @param data
   */
  const modifyAddress = (data: IAddressItem) => {
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
            actionClick(index, item);
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
            onClick={() => addressClick(item)}
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
      {!data.length && (
        <AtDivider content="暂无记录" fontColor="#e93b3d" lineColor="#e93b3d" />
      )}
      <View className={styles['add-address-wrapper']}>
        <AtButton
          className={styles['add-address']}
          type="primary"
          full
          onClick={() => {
            Taro.navigateTo({
              url: addShoppingAddressPath({
                type: EPageType.ADD,
              }),
            });
          }}
        >
          添加收货地址
        </AtButton>
      </View>
    </View>
  );
};

export default AddressList;
