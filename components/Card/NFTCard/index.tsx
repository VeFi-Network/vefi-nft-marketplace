// @ts-ignore
import ethAddress from 'ethereum-address';
import { formatEthAddress } from 'eth-address';
import React from 'react';
import { NFTModel } from '../../../api/models/nft';
import {
  CardHeader,
  CardContainer,
  CardFooter,
  CardFooterContainer,
  CardFooterItem
} from '../../../styles/users.styled';
import Button from '../../Button/Ghost';
import Link from 'next/link';

type Props = {
  model: NFTModel;
  onClick?: (event: any) => void;
};

const NFTCard = ({ model, onClick }: Props) => {
  return (
    <>
      <CardContainer>
        <CardHeader>
          <img src={model?.metadata?.image} width={329} height={378} alt="nft user" />
        </CardHeader>
        <CardFooterContainer>
          <CardFooter>
            <CardFooterItem>
              <div className="nft-meta-data">
                <span className="nft_collection_name">{model?.metadata?.name}</span>
                <Link href={`/users/${model.owner}?tab=1`}>
                  <span className="nft_name">
                    {ethAddress.isAddress(model.metadata?.owner)
                      ? formatEthAddress(model.metadata?.owner as string)
                      : model.metadata?.owner}
                  </span>
                </Link>
              </div>
              <div className="nft-price-info">
                {/* <div className="price">
                  <Image src="/icons/eth_classic.svg" width={20} height={20} />
                  <div>2 eth</div>
                </div> */}
                <Button
                  onClick={onClick}
                  borderThickness="1px"
                  width="65px"
                  borderRadius="4px"
                  fontSize="12px"
                  padding="5px 20px"
                >
                  View
                </Button>
              </div>
            </CardFooterItem>
          </CardFooter>
        </CardFooterContainer>
      </CardContainer>
    </>
  );
};

export default NFTCard;
