import { AddressZero } from '@ethersproject/constants';
import { parseEther } from '@ethersproject/units';

export const addresses: { [key: number]: string } = {
  56: '0x6ad3c20D6B29E363617aBE5f6473E029300b0f73',
  137: '0x6269b4705FCdBAbF81D4636e33c2100f757A05ac',
  32520: '0xA1FcA451AF5782d6A25582DAc5AF77B867a5bcC9',
  1024: '0x64FAF984Bf60dE19e24238521814cA98574E3b00',
  43114: '0xb562b09Bc2317D18a82FD415B7Fb33540Db7e723',
  40: '0x64FAF984Bf60dE19e24238521814cA98574E3b00'
};

export const WETH: { [key: number]: string } = {
  56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  32520: '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
  1024: '0x1376C97C5c512d2d6F9173A9A3A016B6140b4536',
  43114: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  40: '0xd102ce6a4db07d247fcc28f366a623df0938ca9e'
};

export const CONSTANTS: {
  feesPerNetwork: {
    [key: number]: {
      nftMintFee: ReturnType<typeof parseEther>;
      collectionDeployFee: ReturnType<typeof parseEther>;
    };
  };
  paymentTokensPerNetwork: {
    [key: number]: Array<{
      token: string;
      logo: string;
      name: string;
    }>;
  };
} = {
  feesPerNetwork: {
    56: {
      nftMintFee: parseEther('0.416400'),
      collectionDeployFee: parseEther('0.867500')
    },
    137: {
      nftMintFee: parseEther('196.501809935208'),
      collectionDeployFee: parseEther('409.37877069834997')
    },
    32520: {
      nftMintFee: parseEther('29107361.63'),
      collectionDeployFee: parseEther('5813481.48')
    },
    1024: {
      nftMintFee: parseEther('923.076923077'),
      collectionDeployFee: parseEther('1923.07692308')
    },
    43114: {
      nftMintFee: parseEther('4.916520'),
      collectionDeployFee: parseEther('10.242750')
    },
    40: {
      nftMintFee: parseEther('467.624777878'),
      collectionDeployFee: parseEther('974.218287246')
    }
  },
  paymentTokensPerNetwork: {
    56: [
      {
        token: AddressZero,
        logo: '/icons/binance.svg',
        name: 'Binance'
      },
      {
        token: WETH[56],
        logo: '/icons/binance.svg',
        name: 'Wrapped Binance'
      }
    ],
    137: [
      {
        token: AddressZero,
        logo: '/icons/matic.svg',
        name: 'Polygon'
      },
      {
        token: WETH[137],
        logo: '/icons/matic.svg',
        name: 'Wrapped Matic'
      }
    ],
    32520: [
      {
        token: AddressZero,
        logo: '/icons/brise.svg',
        name: 'Brise'
      },
      {
        token: WETH[32520],
        logo: '/icons/brise.svg',
        name: 'Wrapped Brise'
      }
    ],
    43114: [
      {
        token: AddressZero,
        logo: '/icons/avax.svg',
        name: 'Avalanche'
      },
      {
        token: WETH[43114],
        logo: '/icons/brise.svg',
        name: 'Wrapped Avax'
      }
    ],
    40: [
      {
        token: AddressZero,
        logo: '/icons/telos.svg',
        name: 'Telos'
      },
      {
        token: WETH[43114],
        logo: '/icons/telos.svg',
        name: 'Wrapped Telos'
      }
    ],
    1024: [
      {
        token: AddressZero,
        logo: '/icons/clover.svg',
        name: 'Clover'
      },
      {
        token: WETH[1024],
        logo: '/icons/clover.svg',
        name: 'Wrapped Clover'
      }
    ]
  }
};
