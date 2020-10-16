import { IOrderDataItem } from '../../interface';

export interface IOrderItemProps {
  data: IOrderDataItem;
}

export interface IBtnProps {
  name: string;
  onClick: () => void;
  className: string;
  show: boolean;
}
