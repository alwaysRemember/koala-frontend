import React from 'react';
import Tarom from '@tarojs/taro';
import { View } from '@tarojs/components';
import { useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';

const OrderConfirm = () => {
  const state = useMappedState<IReducers>((state) => state);
  console.table(state.orderConfirmDefaultParams);
  console.log('========================');
  console.table(state.orderConfirmDefaultParams.selectProductConfigList);

  return <View> order Confirm</View>;
};

export default OrderConfirm;
