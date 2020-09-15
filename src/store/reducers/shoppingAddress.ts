import { IReduxAction } from 'src/interface/global';
import { IAddressItem } from 'src/pages/AddressList/interface';
import { SELECT_SHOPPING_ADDRESS } from '../constants';

/**
 * 收货地址
 * @param state
 * @param actions
 */
export const shoppingAddress = (
  state: IAddressItem | null = null,
  actions: IReduxAction<IAddressItem | null>,
): IAddressItem | null => {
  switch (actions.type) {
    case SELECT_SHOPPING_ADDRESS:
      return actions.data;
    default:
      return state;
  }
};
