import axios from 'axios';
import { NFT_API } from './constants';

const baseAxios = axios.create({
  baseURL: NFT_API,
});

export function getAllNFTsByNetwork(network: string) {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/byNetwork`)
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

export function getNFTByIdAndNetwork(id: number, network: string) {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${id}/byId`)
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

export function getNFTsByCollection(collection: string, network: string) {
  return new Promise((resolve, reject) => {
    baseAxios
      .get(`/api/nft/${network}/${collection}/byCollection`)
      .then(res => resolve(res.data))
      .catch(reject);
  });
}
