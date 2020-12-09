import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
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
import { IMenuItem, IOrderBtnItem } from './interface';
import { loginPath, orderListPath } from '../../router';
import { EDeafultTabKey } from '../OrderList/interface';
import { EOrderType } from '../../enums/EOrder';
import { getPersonalCenterData } from '../../api';

const PersonalCenter = () => {
  let { userInfo } = useMappedState<IReducers>((state) => state);
  userInfo = userInfo as IFrontUserLoginResponse;
  const isLogin = !!userInfo.openid; // 是否登录了
  const [orderBtnList, setOrderBtnList] = useState<Array<IOrderBtnItem>>([
    {
      type: EOrderType.PENDING_PAYMENT,
      text: '待付款',
      badgeNumber: 0,
      icon: pendingPayment,
    },
    {
      type: EOrderType.TO_BE_DELIVERED,
      text: '待发货',
      badgeNumber: 0,
      icon: toBeDelivered,
    },
    {
      type: EOrderType.TO_BE_RECEIVED,
      text: '待收货',
      badgeNumber: 0,
      icon: toBeReceived,
    },
    {
      type: EOrderType.COMMENT,
      text: '待评价',
      badgeNumber: 0,
      icon: completed,
    },
  ]);

  const getData = async () => {
    try {
      const { orderBtnListData } = await getPersonalCenterData();
      setOrderBtnList((prev) => {
        const data: Array<IOrderBtnItem> = JSON.parse(JSON.stringify(prev));
        return data.map((item) => ({
          ...item,
          badgeNumber:
            orderBtnListData.find((d) => d.type === item.type)?.badgeNumber ||
            0,
        }));
      });
    } catch (e) {}
  };

  /**
   * 菜单点击
   * @param data
   */
  const menuClick = ({ path }: IMenuItem) => {
    Taro.navigateTo({
      url: path,
    });
  };

  useDidShow(() => {
    if (!isLogin) return;
    getData();
  });

  usePullDownRefresh(getData);

  return (
    <View className={styles['user-wrapper']}>
      {/* 头像部分 */}
      <View className={styles['user-avatar-wrpper']}>
        <AtAvatar circle image={userInfo.avatarUrl} />
        <View className={styles['user-info']}>
          {(isLogin && (
            <Text className={styles['name']}>{userInfo.nickName}</Text>
          )) || (
            <AtButton
              type="primary"
              size="small"
              circle
              className={styles['please-login']}
              onClick={() => {
                Taro.navigateTo({
                  url: loginPath(),
                });
              }}
            >
              请登录
            </AtButton>
          )}
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
          {orderBtnList.map(({ type, text, badgeNumber, icon }) => (
            <View
              className={styles['order-status-item']}
              onClick={() => {
                Taro.navigateTo({
                  url: orderListPath({
                    type,
                  }),
                });
              }}
            >
              {(!!badgeNumber && (
                <AtBadge value={badgeNumber}>
                  <Image src={icon} className={styles['icon']} />
                </AtBadge>
              )) || <Image src={icon} className={styles['icon']} />}
              <Text>{text}</Text>
            </View>
          ))}
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
