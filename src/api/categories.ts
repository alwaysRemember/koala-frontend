/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-11-16 17:28:41
 * @LastEditTime: 2020-11-16 17:30:17
 * @FilePath: /koala-frontend/src/api/categories.ts
 */
import { ICategoriesItem } from 'src/pages/Categories/interface';
import { request } from '../request';

const BASE_URL = '/categories';

/**
 * 获取分类列表
 */
export const getCategoriesList = () =>
  request<Array<ICategoriesItem>>({
    url: `${BASE_URL}/get-categories-list`,
    method: 'GET',
  });
