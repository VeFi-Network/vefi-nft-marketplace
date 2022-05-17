import axios from 'axios';
import { NFT_API } from './constants';
import { NFTModel } from './models/nft';
import { CollectionModel } from './models/collection';
import { AccountModel } from './models/account';

const baseAxios = axios.create({
  baseURL: NFT_API
});

export function createOrUpdateAccount(body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    baseAxios
      .post('/api/account', body, { headers: { 'Content-Type': 'application/json' } })
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getAuthenticatedUser(token: any): Promise<AccountModel> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get('/api/account', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getAllNFTsByNetwork(network: string, page: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/byNetwork?page=${page}`)
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getNFTByIdAndNetwork(id: number, network: string, page: number): Promise<NFTModel> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${id}/byId?page=${page}`)
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getNFTsByCollection(collection: string, network: string, page: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collection}/byCollection?page=${page}`)
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getNFTsByOwner(token: string, network: string, page: number): Promise<NFTModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/byOwner?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getAllCollections(network: string, page: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/all?page=${page}`)
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}

export function getAllCollectionsByOwner(network: string, token: string, page: number): Promise<CollectionModel[]> {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/collection/${network}/byOwner?page=${page}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => resolve(res.data.result))
      .catch(reject);
  });
}
