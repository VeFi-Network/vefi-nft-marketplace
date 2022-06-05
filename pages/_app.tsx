import '../styles/globals.css';
import 'antd/dist/antd.css';

import { Web3ReactProvider } from '@web3-react/core';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import Web3 from 'web3';

import { APIContextProvider } from '../contexts/api';
import { SocketProvider } from '../contexts/socket';
import { Web3ContextProvider } from '../contexts/web3';

function getLibrary(provider: any) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ContextProvider>
          <APIContextProvider>
            <SocketProvider>
              <MoralisProvider
                serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string}
                appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID as string}
              >
                <Component {...pageProps} />
              </MoralisProvider>
            </SocketProvider>
          </APIContextProvider>
        </Web3ContextProvider>
      </Web3ReactProvider>
    </>
  );
}

export default MyApp;
