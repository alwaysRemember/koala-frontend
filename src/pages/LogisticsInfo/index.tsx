import React, { useEffect, useState } from 'react';
import Taro, { usePullDownRefresh, useRouter } from '@tarojs/taro';
import { AtIcon, AtList, AtListItem, AtTimeline } from 'taro-ui';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';
import {
  ILogisticsInfoPathParams,
  ILogisticsInfoResponseData,
} from './interface';
import { Item } from 'taro-ui/types/timeline';
import { getLogisticsInfo } from '../../api';
import { showToast } from '../../utils/wxUtils';
const LogisticsInfo = () => {
  const {
    params: { orderId },
  } = useRouter<ILogisticsInfoPathParams>();
  const [data, setData] = useState<ILogisticsInfoResponseData | null>();

  const getData = async (isPullDownRefresh: boolean = false) => {
    if (!orderId) {
      showToast({
        title: '未获取到订单ID',
      });
      return;
    }
    try {
      const data = await getLogisticsInfo({ orderId });
      setData(data);
    } catch (e) {}
    isPullDownRefresh && Taro.stopPullDownRefresh();
  };

  const copyNum = () => {
    if (!data?.num) return;
    try {
      Taro.setClipboardData({
        data: data?.num,
      });
    } catch (e) {}
  };

  usePullDownRefresh(() => {
    getData(true);
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className={styles['logitics-info-wrapper']}>
      {/* 快递信息 */}
      {!!data && (
        <View className={styles['logitics-info']}>
          <AtList>
            <AtListItem title="快递名称" extraText={data?.name} />
            <AtListItem
              title="快递单号"
              extraText={data?.num}
              className={styles['num']}
              onClick={copyNum}
            />
            <AtListItem title="快递状态" extraText={data?.signStatus} />
          </AtList>
          <View className={styles['express-data']}>
            <AtTimeline
              items={
                data?.expressData.map<Item>(({ context, time }, index) => ({
                  title: time,
                  content: [context],
                  icon:
                    !index && data.signStatus === '签收'
                      ? 'check-circle'
                      : 'loading-2',
                })) || []
              }
            />
          </View>
        </View>
      )}
      {/* 不存在快递信息 */}
      {data === null && (
        <View className={styles['no-logitics-info']}>
          <AtIcon
            prefixClass="icon"
            value="meiyoushuju"
            size="40"
            className={styles['no-logitics-info-icon']}
          />
          <Text className={styles['msg']}>没有快递信息</Text>
        </View>
      )}
    </View>
  );
};

export default LogisticsInfo;
