enum NFTLevels {
  LEGENDARY = 'LEGENDARY',
  RARE = 'RARE',
  ICONIC = 'ICONIC',
  SUPERRARE = 'SUPERRARE'
}

type NFTMetadata = {
  name: string;
  description: string;
  owner: string;
  imageURI: string;
  traits: Array<string>;
  levels: Array<NFTLevels>;
};

export interface NFTModel {
  id: number;
  tokenId: number;
  tokenURI: string;
  collectionId: string;
  timeStamp: string;
  network: string;
  owner: string;
  metadata?: NFTMetadata;
}
