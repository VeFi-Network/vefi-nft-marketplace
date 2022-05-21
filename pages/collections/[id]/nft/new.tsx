import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import _ from 'lodash';
import Navbar from '../../../../components/Navbar';
import Filled_CTA_Button from '../../../../components/Button/CTA/Filled';
import FileContainer from '../../../../components/Collections/FileContainer';
import DropdownComponent from '../../../../components/Collections/Dropdown';
import DynamicDropdown from '../../../../components/Collections/DynamicDropdown';
import { pinFile, pinJson } from '../../../../api/ipfs';
import { NFTLevels, NFTMetadata } from '../../../../api/models/nft';

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
      color: #fff;
      padding: 3px;
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
  const [traitsIDs, setTraitsIDs] = useState<string[]>([uuid()]);

  const [nftMetadata, setNftMetadata] = useState<Omit<NFTMetadata, 'imageURI'>>({
    name: '',
    owner: '',
    description: '',
    traits: [],
    levels: [],
    externalLink: '',
    isExplicit: false
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
      levels: [],
      externalLink: '',
      isExplicit: false
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
            placeholder="Name of this asset."
          />
        </div>

        <Heading className="heading">
          Owner<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input
            type="text"
            value={nftMetadata.owner}
            onChange={setProperty}
            name="owner"
            className="inp"
            placeholder="Owner of this asset (can be an Ethereum address or an ENS name)."
          />
        </div>

        <Heading top="27px">External URL</Heading>

        <div className="input-div">
          <input
            value={nftMetadata.externalLink}
            onChange={setProperty}
            name="externalLink"
            type="text"
            className="inp"
            placeholder="An external URL containing more information about this asset."
          />
        </div>

        <Heading top="27px">Description</Heading>

        <div className="text">
          <span className="blue">Note</span> Syntax is supported. 1 to 2000 words only.
        </div>

        <div className="text-area">
          <textarea
            className="real-text-area"
            id=""
            placeholder="Provide a detailed description of your item."
            rows={7}
            value={nftMetadata.description}
            onChange={setProperty}
            name="description"
          ></textarea>
        </div>

        <Heading top="27px">Levels</Heading>

        <div className="switch-cont">
          <div className="text">Set this item's levels</div>

          {_.map(Object.values(NFTLevels).sort(), val => (
            <div
              key={val}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
                margin: 2
              }}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={nftMetadata.levels.includes(val)}
                  onChange={() => {
                    if (!nftMetadata.levels.includes(val))
                      setNftMetadata({ ...nftMetadata, levels: [...nftMetadata.levels, val] });
                    else setNftMetadata({ ...nftMetadata, levels: nftMetadata.levels.filter(level => level !== val) });
                  }}
                />
                <span className="slider round"></span>
              </label>
              <span className="blue" style={{ fontSize: 12 }}>
                {val}
              </span>
            </div>
          ))}
        </div>

        <Heading top="27px">
          Traits<span className="blue">*</span>
        </Heading>
        <div className="text">Set this item's traits.</div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 10 }}>
          <div style={{ flexBasis: '90%', flexGrow: 1 }}>
            {_.map(traitsIDs, (id, index) => (
              <div className="input-div" key={id} style={{ width: 200 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ flexBasis: '90%', flexGrow: 1 }}>
                    <input
                      value={nftMetadata.traits[index]}
                      onChange={event => {
                        const traits = nftMetadata.traits;
                        traits[index] = event.target.value;
                        setNftMetadata({ ...nftMetadata, traits });
                      }}
                      name={`trait-${id}`}
                      type="text"
                      className="inp"
                      style={{ width: 'inherit' }}
                      placeholder="Enter trait."
                    />
                  </div>
                  <div style={{ flexBasis: '5%', flexGrow: 1 }}></div>
                  <div style={{ flexBasis: '5%', flexGrow: 1 }}>
                    <Filled_CTA_Button
                      disabled={traitsIDs.length === 1}
                      style={{
                        textAlign: 'center',
                        width: 25,
                        height: 25,
                        fontSize: 17,
                        padding: 4,
                        background: traitsIDs.length === 1 ? 'grey' : undefined
                      }}
                      onClick={() => {
                        setTraitsIDs(traitsIDs.filter(val => val !== id));
                        const traits = nftMetadata.traits;
                        traits.splice(index, 1);
                        setNftMetadata({ ...nftMetadata, traits });
                      }}
                    >
                      <FaMinus />
                    </Filled_CTA_Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flexBasis: '5%', flexGrow: 1 }}></div>
          <div style={{ flexBasis: '5%', flexGrow: 1 }}>
            <Filled_CTA_Button
              onClick={() => setTraitsIDs([...traitsIDs, uuid()])}
              style={{ textAlign: 'center', width: 25, height: 25, fontSize: 17, padding: 4 }}
            >
              <FaPlus />
            </Filled_CTA_Button>
          </div>
        </div>

        <Heading top={'52px'}>Explicit and sensitive content</Heading>

        <div className="switch-cont">
          <div className="text">Set this collection as explicit and sensitive content</div>

          <label className="switch">
            <input
              type="checkbox"
              checked={nftMetadata.isExplicit}
              onChange={() => setNftMetadata({ ...nftMetadata, isExplicit: !nftMetadata.isExplicit })}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <Filled_CTA_Button disabled={!allConditionsSatisfied()} onClick={mintNFT} style={{ marginTop: 33 }}>
          {allConditionsSatisfied() ? 'Create' : 'Please fill in all required fields correctly'}
        </Filled_CTA_Button>
      </ParentExploreAndData>
      <StyledExploreNft src="/icons/exploreNFT.png" />
      <ColoredBackground></ColoredBackground>
    </MainContainer>
  );
}
