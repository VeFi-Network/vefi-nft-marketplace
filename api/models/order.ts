import { NFTModel } from './nft';
export enum OrderStatus {
  STARTED = 'STARTED',
  ACCEPTED = 'ACCEPTED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export interface OrderModel {
  id: number;
  orderId: string;
  to: string;
  bidCurrency: string;
  amount: number;
  collection: string;
  creator: string;
  status: OrderStatus;
  network: string;
  timeStamp: number;
  nft?: NFTModel;
}
