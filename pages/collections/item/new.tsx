import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar';
import Filled_CTA_Button from '../../../components/Button/CTA/Filled';
import { pinFile, pinJson } from '../../../api/ipfs';
import FileContainer from '../../../components/Collections/FileContainer';
import DropdownComponent from '../../../components/Collections/Dropdown';
import { CollectionMetadata, CollectionCategory } from '../../../api/models/collection';
import { Spin } from 'antd';

type Props = {};

const MainContainer = styled.div`
  background: #0c0c0c;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
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
  padding-bottom: 20px;
  z-index: 2;
  min-width: 1000px;

  @media (max-width: 1300px) {
    min-width: 700px;
  }

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
      padding: 16px;
      color: rgba(255, 255, 255, 0.58);
      font-size: 12px;
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
      background-color: #59981a;
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

  .dropdown {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 11px;
    background: #373943;
    border-radius: 11px;
    width: 155.73px;
    height: 37px;
    cursor: pointer;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    margin-top: 21px;

    color: #5c95ff;
  }
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

export default function NewCollection({}: Props) {
  const [bannerImage, setBannerImage] = useState<any>(null);
  const [avatarImage, setAvatarImage] = useState<any>(null);
  const [dropdownShown, setDropdownShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tip, setTip] = useState<string>('');

  const [collectionMetadata, setCollectionMetadata] = useState<Omit<Omit<CollectionMetadata, 'imageURI'>, 'bannerURI'>>(
    {
      name: '',
      owner: '',
      category: CollectionCategory.ART,
      description: '',
      symbol: '',
      hasExplicitContent: false
    }
  );

  const setProperty = (e: any) => {
    setCollectionMetadata({ ...collectionMetadata, [e.target.name]: e.target.value });
  };

  const allConditionsSatisfied = (): boolean => {
    return (
      !!bannerImage &&
      !!avatarImage &&
      !!collectionMetadata.name &&
      !!collectionMetadata.owner &&
      !!collectionMetadata.category &&
      !!collectionMetadata.symbol &&
      collectionMetadata.name.length >= 4 &&
      collectionMetadata.owner.length >= 4 &&
      collectionMetadata.symbol.length >= 3
    );
  };

  const resetAllFields = () => {
    setCollectionMetadata({
      name: '',
      owner: '',
      description: '',
      category: CollectionCategory.ART,
      symbol: '',
      hasExplicitContent: false
    });
    setBannerImage(null);
    setAvatarImage(null);
  };

  const createCollection = async () => {
    try {
      setIsLoading(true);
      const bannerFormData = new FormData();

      // Append the banner file to the form data.
      bannerFormData.append('file', bannerImage.file);

      // Pin file to IPFS
      setTip('Pinning banner to IPFS');
      const bannerPinningResponse = await pinFile(bannerFormData);

      const avatarFormData = new FormData();

      // Append the avatar file to the form data.
      avatarFormData.append('file', avatarImage.file);

      // Pin file to IPFS
      setTip('Pinning avatar to IPFS');
      const avatarPinningResponse = await pinFile(avatarFormData);

      if (allConditionsSatisfied()) {
        setTip('Pinning metadata to IPFS');
        const jsonPinningResponse = await pinJson({
          ...collectionMetadata,
          imageURI: avatarPinningResponse.response.fileURI,
          bannerURI: bannerPinningResponse.response.fileURI
        });
        resetAllFields();
        console.log(jsonPinningResponse);
      }

      setIsLoading(false);
      setTip('');
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <MainContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <Spin spinning={isLoading} size="large" tip={tip}>
        <ParentExploreAndData>
          <div className="title">Create New Collection</div>

          <Heading className="heading">
            Collection Banner <span className="blue">*</span>
          </Heading>

          <div className="text">
            Supported File Types: JPG, JPEG, PNG, GIF, WEBP
            <span className="blue"> Max size 40mb</span>
          </div>

          <FileContainer file={bannerImage} setFile={setBannerImage} type={1} />

          <Heading className="heading">
            Collection Avatar <span className="blue">*</span>
          </Heading>

          <div className="text">
            Supported File Types: JPG, JPEG, PNG, GIF, WEBP
            <span className="blue"> Max size 40mb</span>
          </div>

          <FileContainer file={avatarImage} setFile={setAvatarImage} type={1} />

          <Heading className="heading">
            Name<span className="blue">*</span>
          </Heading>

          <div className="input-div">
            <input
              value={collectionMetadata.name}
              name="name"
              onChange={setProperty}
              type="text"
              className="inp"
              placeholder="Name of your collection"
            />
          </div>

          <Heading className="heading">
            Owner<span className="blue">*</span>
          </Heading>

          <div className="input-div">
            <input
              type="text"
              value={collectionMetadata.owner}
              onChange={setProperty}
              name="owner"
              className="inp"
              placeholder="Owner of this collection (Could be an Ethereum address or an ENS name)."
            />
          </div>

          <Heading className="heading">
            Symbol<span className="blue">*</span>
          </Heading>

          <div className="input-div">
            <input
              type="text"
              value={collectionMetadata.symbol}
              onChange={setProperty}
              name="symbol"
              className="inp"
              placeholder="Collection symbol."
            />
          </div>

          <Heading top={'48px'}>
            Description<span className="blue">*</span>
          </Heading>

          <div className="text">Describe your collection.</div>

          <div className="text-area">
            <textarea
              className="real-text-area"
              id=""
              placeholder="Provide a detailed description of your collection."
              rows={7}
              value={collectionMetadata.description}
              onChange={setProperty}
              name="description"
            ></textarea>
          </div>

          <Heading top={'38px'}>Collection Category</Heading>

          <div className="text">This is the category your collection belongs to.</div>

          <DropdownComponent
            dropdown={dropdownShown}
            setDropdown={setDropdownShown}
            value={collectionMetadata.category}
            onChange={value => setCollectionMetadata({ ...collectionMetadata, category: value })}
            dropDownList={Object.values(CollectionCategory).sort()}
            defaultValue={collectionMetadata.category}
            width={'155.78px'}
            top={'36px'}
          />

          <Heading top={'36px'}>Explicit and sensitive content.</Heading>

          <div className="switch-cont">
            <div className="text">Set this collection as having explicit and sensitive content.</div>

            <label className="switch">
              <input
                type="checkbox"
                checked={collectionMetadata.hasExplicitContent}
                onChange={() =>
                  setCollectionMetadata({
                    ...collectionMetadata,
                    hasExplicitContent: !collectionMetadata.hasExplicitContent
                  })
                }
              />
              <span className="slider round"></span>
            </label>
          </div>

          <Filled_CTA_Button disabled={!allConditionsSatisfied()} onClick={createCollection} style={{ marginTop: 33 }}>
            {allConditionsSatisfied() ? 'Create' : 'Please fill in the required fields'}
          </Filled_CTA_Button>
        </ParentExploreAndData>
      </Spin>
      <StyledExploreNft src="/icons/exploreNFT.png" />
      <ColoredBackground></ColoredBackground>
    </MainContainer>
  );
}
