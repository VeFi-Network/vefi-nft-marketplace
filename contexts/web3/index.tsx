import React, { createContext, useEffect, useContext, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import type Web3 from 'web3';
import chains from '../../chains.json';

type Web3ContextType = {
  account?: string | null;
  library?: Web3;
  chainId?: number;
  active: boolean;
  error?: Error;
  connectMetamask: () => void;
  connectWalletConnect: () => void;
  disconnectWallet: () => void;
};

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

const injectedConnector = new InjectedConnector({
  supportedChainIds: [97, 56, 32520, 64668]
});

const walletConnectConnector = new WalletConnectConnector({
  rpc: {
    97: process.env.NEXT_PUBLIC_BSC_TESTNET_RPC as string
  },
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org',
  supportedChainIds: [97, 56, 32520, 64668]
});

export const Web3ContextProvider = ({ children }: any) => {
  const { library, account, activate, deactivate, active, chainId, error } = useWeb3React<Web3>();

  const connectMetamask = useCallback(() => {
    if (!active) {
      activate(injectedConnector, undefined, true).then(() => {
        console.log('Metamask connected!');
      });
    }
  }, [active]);

  const connectWalletConnect = useCallback(() => {
    if (!active) {
      activate(walletConnectConnector, undefined, true).then(() => {
        console.log('Walletconnect connected');
      });
    }
  }, [active]);

  const disconnectWallet = useCallback(() => {
    if (active) deactivate();
  }, [active]);

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
    <Web3Context.Provider
      value={{ account, library, chainId, connectMetamask, connectWalletConnect, disconnectWallet, active, error }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  return useContext(Web3Context);
};
