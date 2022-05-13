import React, { createContext, useEffect, useContext, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import type Web3 from 'web3';

type Web3ContextType = {
  account?: string | null;
  library?: Web3;
  chainId?: number;
  connectOrDisconnectWeb3: () => void;
};

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

const injectedConnector = new InjectedConnector({
  supportedChainIds: [97, 56, 32520, 64668],
});

export const Web3ContextProvider = ({ children }: any) => {
  const { library, account, activate, deactivate, active, chainId, connector } = useWeb3React<Web3>();

  const connectOrDisconnectWeb3 = useCallback(() => {
    if (!active) {
      activate(injectedConnector, undefined, true).then(() => {
        console.log('Web3 connected!');
      });
    } else {
      deactivate();
      console.log('Web3 disconnected!');
    }
  }, [active]);

  const switchChain = useCallback((chain: number) => {
    if ((window as any).ethereum) {}
  }, [chainId]);

  useEffect(() => {
    injectedConnector.isAuthorized().then(isAuth => {
      if (isAuth) {
        activate(injectedConnector, undefined, true).then(() => {
          console.log('Web3 connected');
        });
      }
    });
  }, []);

  return (
    <Web3Context.Provider value={{ account, library, chainId, connectOrDisconnectWeb3 }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  return useContext(Web3Context);
};
