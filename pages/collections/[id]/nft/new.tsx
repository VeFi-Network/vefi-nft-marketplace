import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../../components/Navbar';
import Filled_CTA_Button from '../../../../components/Button/CTA/Filled';
import FileContainer from '../../../../components/Collections/FileContainer';
import DropdownComponent from '../../../../components/Collections/Dropdown';
import DynamicDropdown from '../../../../components/Collections/DynamicDropdown';
import { pinFile, pinJson } from '../../../../api/ipfs';
import { NFTMetadata } from '../../../../api/models/nft';

type Props = {};

const MainContainer = styled.div`
  background: #0c0c0c;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavbarContainer = styled.div`
  width: 100%;
`;

const ColoredBackground = styled.div`
  width: 964px;
  height: 1300px;
  background: url('/objects/marketplaceObjects.svg') no-repeat;
  position: absolute;
  top: -5%;
  right: 0%;
  z-index: 0;
`;

const ParentExploreAndData = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1000px;

  @media (max-width: 1300px) {
    min-width: 700px;
  }
  z-index: 2;

  .title {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #ebf8ff;
    margin-top: 80px;
  }

  .white-text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-top: 53px;
  }

  .text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #ebf8ff;
    margin-top: 11px;
  }

  .blue {
    color: #5c95ff;
  }

  .heading {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-top: 58px;
  }

  .input-div {
    margin-top: 27px;
    width: 468px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;

    .inp {
      height: 38px;
      border: none;
      width: 468px;
      outline: none;
      background: transparent;
      padding-left: 16px;
      color: rgba(255, 255, 255, 0.58);
    }
  }

  .input-div-small {
    margin-top: 11px;
    width: 468px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;

    .inp {
      height: 38px;
      border: none;
      width: 468px;
      outline: none;
      background: transparent;
      padding-left: 16px;
      color: rgba(255, 255, 255, 0.58);
    }
  }

  .text-area {
    border: 1.5px solid #5c95ff;
    border-radius: 4px;
    width: 468px;
    height: 184px;
    margin-top: 26px;

    .real-text-area {
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      outline: none;
      resize: none;

      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.58);
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }

  .dropdown-cont {
    display: flex;
    flex-direction: row;
    gap: 27px;
  }

  .switch-cont {
    display: flex;
    flex-direction: row;
    width: 400px;
    justify-content: space-between;
    align-items: center;

    .switch {
      position: relative;
      display: inline-block;
      width: 32.2px;
      height: 21px;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #373943;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 15.4px;
      width: 15.4px;
      left: 4px;
      bottom: 2.8px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: grey;
    }

    input:focus + .slider {
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(8px);
      -ms-transform: translateX(8px);
      transform: translateX(8px);
    }

    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  }

  margin-bottom: 50px;
`;

const Heading = styled.div`
  margin-top: ${(props: { top: string }) => (props.top ? props.top : '58px')};
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ebf8ff;
`;

const StyledExploreNft = styled.img`
  height: 585px;
  width: 97px;
  position: absolute;
  left: 7px;
  top: 361px;
`;
export default function NewNFT({}: Props) {
  const [avatarImage, setAvatarImage] = useState<any>(null);
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);

  const [blockchainDropdown, setBlockchainDropdown] = useState(false);

  const [nftMetadata, setNftMetadata] = useState<Omit<NFTMetadata, 'imageURI'>>({
    name: '',
    owner: '',
    description: '',
    traits: [],
    levels: []
  });

  const setProperty = (e: any) => {
    setNftMetadata(metadata => ({ ...metadata, [e.target.name]: e.target.value }));
  };

  const allConditionsSatisfied = (): boolean => {
    return (
      !!avatarImage &&
      nftMetadata.name.length >= 7 &&
      nftMetadata.owner.length >= 4 &&
      nftMetadata.traits.length > 0 &&
      nftMetadata.levels.length > 0
    );
  };

  const resetAllFields = () => {
    setNftMetadata({
      name: '',
      owner: '',
      description: '',
      traits: [],
      levels: []
    });
    setAvatarImage(null);
  };

  const mintNFT = async () => {
    try {
    } catch (e) {
      console.log('Error Occured ===' + e);
    }
  };

  return (
    <MainContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <ParentExploreAndData>
        <div className="title">Mint your NFT.</div>

        <Heading top={'31px'}>
          Avatar <span className="blue">*</span>
        </Heading>

        <div className="text">
          Supported File Types: JPG, JPEG, PNG, GIF, WEBP
          <span className="blue"> Max size 40mb</span>
        </div>

        <FileContainer file={avatarImage} setFile={setAvatarImage} type={2} />

        <Heading className="heading">
          Name<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input
            type="text"
            value={nftMetadata.name}
            onChange={setProperty}
            name="name"
            className="inp"
            placeholder="Item Name"
          />
        </div>

        <Heading top="30px">
          Symbol<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input
            value={collectionItem.symbol}
            onChange={setProperty}
            name="symbol"
            type="text"
            className="inp"
            placeholder="Symbol of collection"
          />
        </div>

        <Heading top="30px">
          Fee Reciever<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input
            value={collectionItem.feeReciever}
            name="feeReciever"
            onChange={setProperty}
            type="text"
            className="inp"
            placeholder="Address that receives the fees paid for minting NFTs in this collection "
          />
        </div>

        <Heading top="27px">
          URL<span className="blue">*</span>
        </Heading>

        <div className="text">
          Customize your URL on VefiNft, Must only contain <br /> lover case Letters, numbers and Hyphens.
        </div>

        <div className="input-div">
          <input
            value={collectionItem.url}
            onChange={setProperty}
            name="url"
            type="text"
            className="inp"
            placeholder="https//vefinft.io/assets/lost-in-space"
          />
        </div>

        <Heading top="27px">
          Description<span className="blue">*</span>
        </Heading>

        <div className="text">
          <span className="blue">Note</span> Syntax is supported. 1 to 2000 words only.
        </div>

        <div className="text-area">
          <textarea
            className="real-text-area"
            id=""
            placeholder="provide a detailed description of your item"
            rows={7}
            value={collectionItem.description}
            onChange={setProperty}
            name="description"
          ></textarea>
        </div>

        <DropdownComponent
          dropdown={categoryDropdown}
          setDropdown={setCatDropdown}
          value={categoryValue}
          setValue={setCatVal}
          defaultValue={'Add Category'}
          dropDownList={['Category 1', 'Category 2', 'Category 3', 'Category 4']}
          width="135px"
          top={'36px'}
        />

        <Heading top="64px">
          Royalties<span className="blue">*</span>
        </Heading>

        <div className="text">
          Collect a fee when a user Re-sells an item you originally created. <br /> this is deducted from the final sale
          price and paid monthly to a <br /> payout adress of your choosen.
        </div>

        <Heading top="25px">Percentage fee</Heading>

        <div className="input-div-small">
          <input
            value={collectionItem.feePercentage}
            onChange={setProperty}
            name="feePercentage"
            type="text"
            className="inp"
            placeholder="0.000"
          />
        </div>

        <Heading top="39px">Blockchain</Heading>

        <div className="text">
          Sellect the blockchain where you’d like new items from this <br /> collection to be added by defult.
        </div>

        <DropdownComponent
          dropdown={blockchainDropdown}
          setDropdown={setBlockchainDropdown}
          value={blockValue}
          setValue={setBlockValue}
          dropDownList={['Ethereum', 'Binance', 'Polygon', 'Arbitrum']}
          defaultValue={'Select Blockchain'}
          width={'170px'}
          top={'36px'}
        />

        <Heading top="39px">payment tokens</Heading>

        <div className="text">These tokens may be used to buy and sell your items</div>

        <DynamicDropdown
          dropDownList={paymentDropdownList}
          setDropdownList={setPaymentDropdown}
          valueList={paymentTokenList}
          setValueList={setPaymentTokenList}
          name={'Token'}
          dropDownValueList={['Ethereum', 'Matic', 'Cardano']}
          defaultValue={'Select Token'}
          width={'150px'}
          top={'27px'}
          hideFirst={false}
        />

        <Heading top={'52px'}>Explicit and sensitive content</Heading>

        <div className="switch-cont">
          <div className="text">Set this collection as explicit and sensitive content</div>

          <label className="switch">
            <input type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)} />
            <span className="slider round"></span>
          </label>
        </div>
          <Filled_CTA_Button disabled={!allConditionsSatisfied()} onClick={mintNFT} style={{ background: 'grey', width: 250, marginTop: 33 }}>
            {}
          </Filled_CTA_Button>
      </ParentExploreAndData>
      <StyledExploreNft src="/icons/exploreNFT.png" />
      <ColoredBackground></ColoredBackground>
    </MainContainer>
  );
}
