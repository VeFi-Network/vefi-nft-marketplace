export type AccountMetadata = {
  imageURI: string;
  bannerURI: string;
  name: string;
};

export interface AccountModel {
  accountId: string;
  name: string;
  email: string;
  metadataURI: string;
  metadata: AccountMetadata;
  createdAt?: string;
}
