import { parseEther } from '@ethersproject/units';
import { AddressZero } from '@ethersproject/constants';

export const addresses: { [key: number]: string } = {
  97: process.env.NEXT_PUBLIC_BSC_MARKETPLACE_ADDRESS as string,
  80001: process.env.NEXT_PUBLIC_MATIC_MARKETPLACE_ADDRESS as string
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
    97: {
      nftMintFee: parseEther('0.000008'),
      collectionDeployFee: parseEther('0.00008')
    },
    80001: {
      nftMintFee: parseEther('0.000008'),
      collectionDeployFee: parseEther('0.00008')
    }
  },
  paymentTokensPerNetwork: {
    80001: [
      {
        token: AddressZero,
        logo: '/icons/matic.svg',
        name: 'Polygon'
      }
    ],
    97: [
      {
        token: AddressZero,
        logo: '/icons/binance.svg',
        name: 'Binance'
      }
    ]
  }
};
