import { View, Text } from '@tarojs/components';
import moment from 'moment';
import { AtIcon, AtList, AtListItem } from 'taro-ui';
import Taro, { useDidShow, useRouter } from '@tarojs/taro';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getOrderDetail } from '../../api';
import { updatePageChangeGetDataType } from '../../store/actions';
import { IReducers } from '../../store/reducers/interface';
import { showToast } from '../../utils/wxUtils';
import styles from './index.module.scss';
import {
  IOrderDetailPathParams,
  IOrderDetailResponseData,
  IOrderShowInfoItem,
} from './interface';
import { transferAmount } from '../../utils';
import { EOrderType, EOrderTypeTransferVal } from '../../enums/EOrder';
import OrderOperationBtn from '../../components/OrderOperationBtn';
import OrderProductItem from '../OrderList/components/OrderProductItem';

const OrderDetail = () => {
  const {
    params: { orderId },
  } = useRouter<IOrderDetailPathParams>();

  const { pageChangeGetDataType } = useMappedState<IReducers>((state) => state);
  const dispatch = useDispatch();

  const [data, setData] = useState<IOrderDetailResponseData>();

  const [isIphoneX, setIsIphoneX] = useState<boolean>(false);

  const [orderShowInfo, setOrderShowInfo] = useState<Array<IOrderShowInfoItem>>(
    [],
  );

  const getData = async () => {
    if (!orderId) {
      showToast({
        title: '订单id不存在',
      });
      return;
    }
    try {
      const data = await getOrderDetail({ orderId });
      setData(data);
    } catch (e) {}
  };

  useEffect(() => {
    setOrderShowInfo([
      {
        label: '订单编号',
        value: data?.orderId || '',
      },
      {
        label: '订单签收时间',
        value: data?.orderCheckTime
          ? moment(data.orderCheckTime).format('YYYY-MM-DD hh:mm:ss')
          : '',
      },
      {
        label: '退款入账账户',
        value: data?.refundRecvAccount || '',
      },
      {
        label: '退款成功时间',
        value: data?.refundSuccessTime || '',
      },
      {
        label: '微信支付单号',
        value: data?.transactionId || '',
      },
    ]);
  }, [data]);
  useEffect(() => {
    getData();
  }, []);

  useDidShow(() => {
    const { model } = Taro.getSystemInfoSync();
    if (
      model.search('iPhone X') != -1 ||
      model.search('iPhone 11') != -1 ||
      model.search('iPhone 12') != -1
    ) {
      setIsIphoneX(true);
    }
  });

  useDidShow(() => {
    if (pageChangeGetDataType) {
      getData();
      dispatch(updatePageChangeGetDataType(false));
    }
  });
  return (
    <View className={styles['order-detail-wrapper']}>
      {/* 订单状态 */}
      <View className={styles['order-status']}>
        <Text className={styles['status']}>
          {EOrderTypeTransferVal[data?.orderType as EOrderType]}
        </Text>
        <AtIcon
          prefixClass="icon"
          value="dingdanzhuangtai"
          size="30"
          className={styles['icon']}
        />
      </View>
      {/* 收货地址 */}
      <View className={styles['shopping-address-wrapper']}>
        <AtIcon
          prefixClass="icon"
          value="shouhuodizhi"
          size="30"
          className={styles['icon']}
        />
        <View className={styles['info']}>
          <View className={styles['contact']}>
            <Text className={styles['name']}>{data?.shoppingAddress.name}</Text>
            <Text className={styles['phone']}>
              {data?.shoppingAddress.phone}
            </Text>
          </View>
          <Text className={styles['address']}>
            {data?.shoppingAddress.area.join(' ')}
            {data?.shoppingAddress.address}
          </Text>
        </View>
      </View>
      {/* 产品列表 */}
      <View className={styles['product-list-wrapper']}>
        <OrderProductItem
          productList={data?.productList || []}
          canClickProduct={true}
        />
        <AtListItem
          title="商品总价"
          extraText={`${transferAmount(data?.amount || 0, 'yuan')} 元`}
        />
        <AtListItem
          title="运费"
          extraText={`${transferAmount(data?.orderShopping || 0, 'yuan')} 元`}
        />
      </View>
      {/* 订单信息 */}
      <View className={styles['order-info-wrapper']}>
        {orderShowInfo
          .filter((item) => item.value)
          .map((item, index) => (
            <View
              className={styles['item']}
              key={index}
              onClick={() => {
                Taro.setClipboardData({
                  data: item.value,
                });
              }}
            >
              <Text className={styles['label']}>{item.label}</Text>
              <Text className={styles['value']}>{item.value}</Text>
            </View>
          ))}
      </View>
      {/* 订单操作栏 */}
      <View className={styles['order-btn']}>
        <View
          className={styles['con']}
          style={{
            bottom: Taro.pxTransform(isIphoneX ? 64 : 0),
          }}
        >
          {!!data && (
            <OrderOperationBtn
              orderCheck={data.orderCheck}
              orderCheckTime={data.orderCheckTime}
              orderId={data.orderId}
              orderType={data.orderType}
              amount={data.amount}
              hasRefundCourierInfo={data.hasRefundCourierInfo}
              productList={data.productList}
              changeData={getData}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;
