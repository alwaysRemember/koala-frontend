import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { AtAvatar, AtBadge, AtList, AtListItem, AtButton } from "taro-ui";
import { useSelector } from "@tarojs/redux";
import { IReducers } from "src/store/reducers/interface";
import { IFrontUserLoginResponse } from "../Login/interface";
import completed from "../../images/personalCenter/completed.png";
import pendingPayment from "../../images/personalCenter/pending-payment.png";
import toBeDelivered from "../../images/personalCenter/to_be_delivered.png";
import toBeReceived from "../../images/personalCenter/to_be_received.png";
import "./index.sass";
import { menuList } from "./data";
import { IMenuItem } from "./interface";

const PersonalCenter = () => {
  let { userInfo } = useSelector<IReducers, IReducers>(state => state);
  userInfo = userInfo as IFrontUserLoginResponse;

  /**
   * 菜单点击
   * @param data
   */
  const menuClick = (data: IMenuItem) => {
    // TODO 菜单点击
  };

  return (
    <View className="user-wrapper">
      {/* 头像部分 */}
      <View className="user-avatar-wrpper">
        <AtAvatar circle image={userInfo.avatarUrl} />
        <View className="user-info">
          <Text className="name">{userInfo.nickName}</Text>
          <Text className="address">
            {userInfo.country} {userInfo.province}
          </Text>
        </View>
      </View>
      {/* 订单部分 */}
      <View className="order">
        <View className="order-title">
          <Text className="label">我的订单</Text>
          <View className="view-order">
            <Text>查看全部订单</Text>
            <View className="at-icon at-icon-chevron-right" />
          </View>
        </View>
        <View className="order-status-list">
          {/* TODO 菜单点击 */}
          <View className="order-status-item">
            <AtBadge value={10}>
              <Image src={pendingPayment} className="icon" />
            </AtBadge>
            <Text>待付款</Text>
          </View>
          <View className="order-status-item">
            <AtBadge value={0}>
              <Image src={toBeDelivered} className="icon" />
            </AtBadge>
            <Text>待发货</Text>
          </View>
          <View className="order-status-item">
            <AtBadge value="">
              <Image src={toBeReceived} className="icon" />
            </AtBadge>
            <Text>待收货</Text>
          </View>
          <View className="order-status-item">
            <AtBadge value="">
              <Image src={completed} className="icon" />
            </AtBadge>
            <Text>已完成</Text>
          </View>
        </View>
      </View>
      {/* 菜单部分 */}
      <AtList className="menu-list" hasBorder={false}>
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
      <AtButton type="primary" openType="contact" className="contact">
        联系客服
      </AtButton>
    </View>
  );
};

PersonalCenter.config = {
  navigationBarTitleText: "个人中心"
};

export default PersonalCenter;
