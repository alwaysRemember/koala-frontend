/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-08-14 15:50:55
 * @LastEditTime: 2020-08-14 16:12:21
 * @FilePath: /koala-frontend/src/components/SearchInput/interface.ts
 */
export interface ISearchInputProps {
  isDisable?: boolean;
  searchConfirm?: (value: string) => void;
}
