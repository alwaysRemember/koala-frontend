import Taro from '@tarojs/taro';
import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import { AtAvatar, AtBadge, AtList, AtListItem, AtButton } from 'taro-ui';
import { useMappedState } from 'redux-react-hook';
import { IReducers } from 'src/store/reducers/interface';
import { IFrontUserLoginResponse } from '../Login/interface';
import completed from '../../images/personalCenter/completed.png';
import pendingPayment from '../../images/personalCenter/pending-payment.png';
import toBeDelivered from '../../images/personalCenter/to_be_delivered.png';
import toBeReceived from '../../images/personalCenter/to_be_received.png';
import styles from './index.module.scss';
import { menuList } from './data';
import { IMenuItem } from './interface';
import { orderListPath } from '../../router';
import { EDeafultTabKey } from '../OrderList/interface';
import { EOrderType } from '../../enums/EOrder';

const PersonalCenter = () => {
  let { userInfo } = useMappedState<IReducers>((state) => state);
  userInfo = userInfo as IFrontUserLoginResponse;

  /**
   * 菜单点击
   * @param data
   */
  const menuClick = (data: IMenuItem) => {
    // TODO 菜单点击
  };

  return (
    <View className={styles['user-wrapper']}>
      {/* 头像部分 */}
      <View className={styles['user-avatar-wrpper']}>
        <AtAvatar circle image={userInfo.avatarUrl} />
        <View className={styles['user-info']}>
          <Text className={styles['name']}>{userInfo.nickName}</Text>
          <Text className={styles['address']}>
            {userInfo.country} {userInfo.province}
          </Text>
        </View>
      </View>
      {/* 订单部分 */}
      <View className={styles['order']}>
        <View className={styles['order-title']}>
          <Text className={styles['label']}>我的订单</Text>
          <View
            className={styles['view-order']}
            onClick={() => {
              Taro.navigateTo({
                url: orderListPath({
                  type: EDeafultTabKey.ALL,
                }),
              });
            }}
          >
            <Text>查看全部订单</Text>
            <View className={styles['at-icon at-icon-chevron-right']} />
          </View>
        </View>
        <View className={styles['order-status-list']}>
          {/* TODO 菜单点击 */}
          <View
            className={styles['order-status-item']}
            onClick={() => {
              Taro.navigateTo({
                url: orderListPath({
                  type: EOrderType.PENDING_PAYMENT,
                }),
              });
            }}
          >
            <AtBadge value={10}>
              <Image src={pendingPayment} className={styles['icon']} />
            </AtBadge>
            <Text>待付款</Text>
          </View>
          <View
            className={styles['order-status-item']}
            onClick={() => {
              Taro.navigateTo({
                url: orderListPath({
                  type: EOrderType.TO_BE_DELIVERED,
                }),
              });
            }}
          >
            <AtBadge value={0}>
              <Image src={toBeDelivered} className={styles['icon']} />
            </AtBadge>
            <Text>待发货</Text>
          </View>
          <View
            className={styles['order-status-item']}
            onClick={() => {
              Taro.navigateTo({
                url: orderListPath({
                  type: EOrderType.TO_BE_RECEIVED,
                }),
              });
            }}
          >
            <AtBadge value="">
              <Image src={toBeReceived} className={styles['icon']} />
            </AtBadge>
            <Text>待收货</Text>
          </View>
          <View
            className={styles['order-status-item']}
            onClick={() => {
              Taro.navigateTo({
                url: orderListPath({
                  type: EOrderType.FINISHED,
                }),
              });
            }}
          >
            <AtBadge value="">
              <Image src={completed} className={styles['icon']} />
            </AtBadge>
            <Text>已完成</Text>
          </View>
        </View>
      </View>
      {/* 菜单部分 */}
      <AtList className={styles['menu-list']} hasBorder={false}>
        {menuList.map((item: IMenuItem) => (
          <AtListItem
            title={item.label}
            arrow="right"
            key={item.label}
            onClick={() => menuClick(item)}
          />
        ))}
      </AtList>

      {/* 联系客服 */}
      <AtButton type="primary" openType="contact" className={styles['contact']}>
        联系客服
      </AtButton>
    </View>
  );
};

PersonalCenter.config = {
  navigationBarTitleText: '个人中心',
};

export default PersonalCenter;
