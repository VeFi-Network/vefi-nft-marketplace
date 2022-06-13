import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type PriceContextType = {
  [key: string]: {
    usd: number;
  };
};

const PriceContext = createContext<PriceContextType>({} as PriceContextType);

export const PriceProvider = ({ children }: any) => {
  const [price, setPrice] = useState<PriceContextType>({} as PriceContextType);

  useEffect(() => {
    const coins = ['avalanche-2', 'binancecoin', 'bitrise-token', 'clover', 'matic-network', 'telos', 'gatechain-token'];
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`)
      .then(res => res.data)
      .then(setPrice);
  }, []);

  return <PriceContext.Provider value={{ ...price }}>{children}</PriceContext.Provider>;
};

export const usePrice = () => useContext(PriceContext);
