/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:42:42
 * @LastEditTime: 2020-09-09 17:40:46
 * @FilePath: /koala-frontend/src/store/actions/user.ts
 */
/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-06-24 15:42:42
 * @LastEditTime: 2020-06-24 16:50:44
 * @FilePath: /koala-frontend/src/store/actions/user.ts
 */
import Taro from '@tarojs/taro';
import { IFrontUserLoginResponse } from '../../pages/Login/interface';
import { IReduxAction } from '../../interface/global';
import { UPDATE_USER_INFO } from '../constants';
import { EUserStorage } from '../../enums/EUserGlobal';

// 更新用户信息
export const updateUserInfo = (
  data: IFrontUserLoginResponse,
): IReduxAction<IFrontUserLoginResponse> => {
  // 设置缓存
  Taro.setStorageSync(EUserStorage.LOCAL_USER_INFO, JSON.stringify(data));
  return {
    type: UPDATE_USER_INFO,
    data,
  };
};
