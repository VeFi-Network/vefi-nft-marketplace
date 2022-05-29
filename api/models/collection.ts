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
  REAL_ESTATE = 'REAL ESTATE',
  CARTOONS = 'CARTOONS',
  MOVIES = 'MOVIES',
  GIFT_CARDS = 'GIFT CARDS'
}

export const CollectionCategoryImages = {
  "WEARABLES" : '/categoriesImages/sports.svg',
  "SPORTS" :'/categoriesImages/sports.svg',
  "ART" :'/categoriesImages/art.png',
  "COLLECTIBLES" :'/categoriesImages/collectibles.svg',
  "DOMAIN NAMES" :'/categoriesImages/domain_names.svg',
  "MUSIC" : '/categoriesImages/music.svg',
  "PHOTOGRAPHY" : '/categoriesImages/sports.svg',
  "FASHION" : '/categoriesImages/sports.svg',
  "GAMING" : '/categoriesImages/video-game-assets.svg',
  "UTILITY" : '/categoriesImages/ticketing.svg',
  "REAL ESTATE" : '/categoriesImages/virtual-land.svg',
  "CARTOONS" : '/categoriesImages/sports.svg',
  "MOVIES" : '/categoriesImages/sports.svg',
  "GIFT CARDS" : '/categoriesImages/sports.svg',
}

export type CollectionMetadata = {
  name: string;
  category: CollectionCategory;
  imageURI: string;
  bannerURI: string;
  symbol: string;
  owner: string;
  description: string;
  hasExplicitContent: boolean;
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
  floorPrice?: number;
}
