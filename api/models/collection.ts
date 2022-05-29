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
  WEARABLES: '/images/sports.svg',
  SPORTS: '/images/sports.svg',
  ART: '/images/art.png',
  COLLECTIBLES: '/images/collectibles.svg',
  'DOMAIN NAMES': '/images/domain_names.svg',
  MUSIC: '/images/music.svg',
  PHOTOGRAPHY: '/images/sports.svg',
  FASHION: '/images/sports.svg',
  GAMING: '/images/video-game-assets.svg',
  UTILITY: '/images/ticketing.svg',
  'REAL ESTATE': '/images/virtual-land.svg',
  CARTOONS: '/images/sports.svg',
  MOVIES: '/images/sports.svg',
  'GIFT CARDS': '/images/sports.svg'
};

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
