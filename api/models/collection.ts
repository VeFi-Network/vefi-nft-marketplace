export enum CollectionCategory {
  WEARABLES = 'WEARABLES',
  SPORTS = 'SPORTS',
  ART = 'ART',
  COLLECTIBLES = 'COLLECTIBLES',
  DOMAIN_NAMES = 'DOMAIN NAMES',
  MUSIC = 'MUSIC',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  FASHION = 'FASHION',
  GAMING = 'GAMING',
  UTILITY = 'UTILITY',
  REAL_ESTATE = 'REAL ESTATE'
}

type CollectionMetadata = {
  name: string;
  category: CollectionCategory;
  imageURI: string;
  bannerURI: string;
  symbol: string;
  owner: string;
  description: string;
};

export interface CollectionModel {
  collectionName: string;
  collectionCategory: CollectionCategory;
  metadata: CollectionMetadata;
  collectionId: string;
  timeStamp: number;
  collectionSymbol: string;
  collectionOwner: string;
  collectionURI: string;
  network: string;
  id: number;
}
