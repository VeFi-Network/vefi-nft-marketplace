import { NFTModel } from './nft';

export enum SaleStatus {
  ON_GOING = 'ON_GOING',
  CANCELLED = 'CANCELLED',
  FINALIZED = 'FINALIZED'
}

export interface SaleModel {
  marketId: string;
  creator: string;
  collectionId: string;
  tokenId: number;
  currency: string;
  price: number;
  timeStamp: number;
  status: SaleStatus;
  network: string;
  nft?: NFTModel;
}
