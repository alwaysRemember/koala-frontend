import React, { useState } from 'react';
import Taro from '@tarojs/taro';
import {
  AtInput,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
} from 'taro-ui';
import { Button } from '@tarojs/components';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { IReducers } from '../../store/reducers/interface';
import { updateRefundCourierInfoModalType } from '../../store/actions';
import { showToast } from '../../utils/wxUtils';

const RefundCourierInfoModal = () => {
  const {
    refundCourierInfoModalData: { showType, confirm },
  } = useMappedState<IReducers>((state) => state);
  const dispatch = useDispatch();

  const [courierName, setCourierName] = useState<string>('');
  const [courierNum, setCourierNum] = useState<string>('');
  return (
    <AtModal
      isOpened={showType}
      onClose={() => {
        dispatch(updateRefundCourierInfoModalType(false));
      }}
    >
      <AtModalHeader>请填写退货快递信息</AtModalHeader>
      {showType && (
        <AtModalContent>
          <AtInput
            name="courierName"
            title="快递名称"
            type="text"
            placeholder="请输入快递名称"
            value={courierName}
            onChange={(v) => {
              setCourierName(v as string);
              return v;
            }}
          />
          <AtInput
            name="courierNum"
            title="快递单号"
            type="text"
            placeholder="请输入快递单号"
            value={courierNum}
            onChange={(v) => {
              setCourierNum(v as string);
              return v;
            }}
          />
        </AtModalContent>
      )}
      <AtModalAction>
        <Button
          onClick={() => {
            dispatch(updateRefundCourierInfoModalType(false));
          }}
        >
          取消
        </Button>{' '}
        <Button
          onClick={() => {
            if (!courierName || !courierNum) {
              showToast({
                title: '请填写快递信息',
              });
              return;
            }
            dispatch(updateRefundCourierInfoModalType(false));
            confirm &&
              confirm({
                courierName,
                courierNum,
              });
          }}
        >
          确定
        </Button>
      </AtModalAction>
    </AtModal>
  );
};

export default RefundCourierInfoModal;
