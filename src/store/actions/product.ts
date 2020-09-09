import { IOrderConfirmDefaultParams } from 'src/pages/OrderConfirm/interface';
import { IReduxAction } from 'src/interface/global';
import { UPDATE_ORDER_CONFIRM_PARAMS } from '../constants';

/**
 * 设置下单页初始参数
 * @param data
 */
export const updateOrderConfirmDefaultParams = (
  data: IOrderConfirmDefaultParams,
): IReduxAction<IOrderConfirmDefaultParams> => {
  return {
    type: UPDATE_ORDER_CONFIRM_PARAMS,
    data,
  };
};
