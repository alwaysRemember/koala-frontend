import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';

const OrderConfirm = () => {
  const state = useMappedState<IReducers>((state) => state);
  return <View>order Confirm</View>;
};

export default OrderConfirm;
