import React, { useState } from 'react';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtListItem,
} from 'taro-ui';
import Taro from '@tarojs/taro';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';
import { Picker, Button } from '@tarojs/components';
import { transferAmount } from '../../utils';
import { reasonList } from './data';
import { updateReturnOfGoodsModalType } from '../../store/actions';
const ReturnOfGoodsModal = () => {
  const {
    returnOfGoodsModalData: { showType, amount, confirm },
  } = useMappedState<IReducers>((state) => state);
  const dispatch = useDispatch();
  const [reason, setReason] = useState<number>(0);
  return (
    <AtModal
      isOpened={showType}
      onClose={() => {
        dispatch(updateReturnOfGoodsModalType(false));
      }}
    >
      <AtModalHeader>请选择退款原因</AtModalHeader>
      <AtModalContent>
        <AtListItem
          title="退款金额"
          extraText={`${transferAmount(amount, 'yuan')} 元`}
        />
        <Picker
          mode="selector"
          range={reasonList}
          value={reason}
          onChange={(e) => {
            setReason(e.detail.value as number);
          }}
        >
          <AtListItem
            title="退款原因"
            extraText={reasonList[reason]}
            arrow="right"
            hasBorder={false}
          />
        </Picker>
      </AtModalContent>
      <AtModalAction>
        <Button
          onClick={() => {
            dispatch(updateReturnOfGoodsModalType(false));
          }}
        >
          取消
        </Button>{' '}
        <Button
          onClick={() => {
            dispatch(updateReturnOfGoodsModalType(false));
            confirm(reasonList[reason]);
          }}
        >
          确定
        </Button>
      </AtModalAction>
    </AtModal>
  );
};
export default ReturnOfGoodsModal;
