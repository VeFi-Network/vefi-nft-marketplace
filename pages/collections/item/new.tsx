import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import Filled_CTA_Button from '../../../components/Button/CTA/Filled';

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

  .dotted-div {
    width: 356px;
    height: 177px;
    border: 2px dashed #5c95ff;
    border-radius: 11px;
    margin-top: 29px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

  .dropdown-cont {
    display: flex;
    flex-direction: row;
    gap: 27px;
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 11px;
  background: #373943;
  border-radius: 11px;
  width: ${(props: { width: string }) => (props.width ? props.width : '155.78px')};
  height: 37px;
  cursor: pointer;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  margin-top: ${(props: { top: string }) => (props.top ? props.top : '36px')};

  color: #5c95ff;

  .cross {
    font-size: 22px;
  }
`;

const DropdownContainer = styled.div`
  width: ${(props: { width: string }) => (props.width ? props.width : '155.78px')};
  background: #373943;
  border-radius: 11px;
  position: absolute;

  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 30px;
  margin-left: -10px;
  z-index: 3;

  .drop-el {
    height: 38px;
    display: flex;
    align-items: center;
    padding-left: 10px;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const FieldsDiv = styled.div`
  border: 1px solid red;
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
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const [traitsList, setTraitList] = useState(['Select Trait']);

  const [colDropdown, setColDropdown] = useState(false);
  const [colValue, setColVal] = useState('Select collection');

  const [propDropdown, setPropDropdown] = useState(false);
  const [propertiesValue, setPropertiesValue] = useState('Select properties');

  const [labelDropdown, setLabelDropdown] = useState(false);
  const [labelValue, setLabelValue] = useState('Select label');
  return (
    <MainContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <ParentExploreAndData>
        <div className="title">Create new item</div>

        <div className="white-text">
          Image, Video, Audio or 3D model<span className="blue">*</span>
        </div>

        <div className="text">
          File type supported: jpg, png, gif, Mp4, SVG, WEBM, <br /> Mp3, WAV, OGG, GLB, GLTF,{' '}
          <span className="blue"> Max size 40mb</span>
        </div>

        <div className="dotted-div">
          <Image src="/collection/dummyImage.svg" width="56px" height="56px" />
        </div>

        <Heading className="heading">
          Name<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input type="text" className="inp" placeholder="Item Name" />
        </div>

        <Heading className="heading">
          Owner<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input type="text" className="inp" placeholder="Paste the owner address of the NFT" />
        </div>

        <Heading className="heading">External link</Heading>

        <div className="text">
          VefiNft will include a link to this URL on this item’s <br /> detail page so users can click to learn more
          about it <br /> so you are welcome to link your own web page with <br /> more details.
        </div>

        <div className="input-div">
          <input type="text" className="inp" placeholder="https//Yoursite.io/item/567" />
        </div>

        <Heading top={'48px'}>
          Description<span className="blue">*</span>
        </Heading>

        <div className="text">
          The description will be included on the item <br /> detail page underneath its image.
        </div>

        <div className="text-area">
          <textarea
            className="real-text-area"
            id=""
            placeholder="provide a detailed description of your item"
            rows={7}
          ></textarea>
        </div>

        <Heading top={'38px'}>Collection</Heading>

        <div className="text">This is the collection where your item will appear.</div>

        <Dropdown
          onClick={() => {
            setColDropdown(!colDropdown);
          }}
        >
          {colValue}
          {colValue == 'Select collection' && (
            <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
          )}
          {colDropdown && (
            <DropdownContainer>
              <div onClick={() => setColVal('Collection 1')} className="drop-el">
                Collection 1
              </div>
              <div onClick={() => setColVal('Collection 2')} className="drop-el">
                Collection 2
              </div>
              <div onClick={() => setColVal('Collection 3')} className="drop-el">
                Collection 3
              </div>
              <div onClick={() => setColVal('Collection 4')} className="drop-el">
                Collection 4
              </div>
            </DropdownContainer>
          )}
        </Dropdown>

        <Heading top={'33px'}>Properties</Heading>

        <div className="text">
          Textual traits that show up as rectangles you can <br /> choose more than one
        </div>

        <Dropdown
          onClick={() => {
            setPropDropdown(!propDropdown);
          }}
        >
          {propertiesValue}{' '}
          {propertiesValue == 'Select properties' && (
            <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
          )}
          {propDropdown && (
            <DropdownContainer>
              <div onClick={() => setPropertiesValue('Property 1')} className="drop-el">
                Property 1
              </div>
              <div onClick={() => setPropertiesValue('Property 2')} className="drop-el">
                Property 2
              </div>
              <div onClick={() => setPropertiesValue('Property 3')} className="drop-el">
                Property 3
              </div>
              <div onClick={() => setPropertiesValue('Property 4')} className="drop-el">
                Property 4
              </div>
            </DropdownContainer>
          )}
        </Dropdown>

        <Heading top={'33px'}>
          Traits <span className="blue">*</span>
        </Heading>

        <div className="text">Select the NFT Traits</div>

        <div className="dropdown-cont">
          {traitsList &&
            traitsList.map((trait, i) => (
              <Dropdown key={i} width="150px" top="27px">
                {trait} <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
              </Dropdown>
            ))}

          <Dropdown
            onClick={() => {
              if (traitsList.length < 4) {
                let newTraitList = [...traitsList];
                newTraitList.push('Select Trait');
                console.log(newTraitList);
                setTraitList(newTraitList);
              }
            }}
            width="130px"
            top="27px"
          >
            <span className="cross">+</span> Add Trait
          </Dropdown>
        </div>

        <Heading top={'33px'}>
          Labels<span className="blue">*</span>
        </Heading>

        <div className="text">Select between Legendary, Rare, Iconic, Super-Rare</div>

        <Dropdown
          width="130px"
          top="20px"
          onClick={() => {
            setLabelDropdown(!labelDropdown);
          }}
        >
          {labelValue}{' '}
          {labelValue == 'Select label' && (
            <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
          )}
          {labelDropdown && (
            <DropdownContainer width="130px">
              <div onClick={() => setLabelValue('Legendary')} className="drop-el">
                Legendary
              </div>
              <div onClick={() => setLabelValue('Rare')} className="drop-el">
                Rare
              </div>
              <div onClick={() => setLabelValue('Iconic')} className="drop-el">
                Iconic
              </div>
              <div onClick={() => setLabelValue('Super-Rare')} className="drop-el">
                Super-Rare
              </div>
            </DropdownContainer>
          )}
        </Dropdown>

        <Heading top={'33px'}>Unlockable content</Heading>

        <div className="switch-cont">
          <div className="text">
            Include unlockable contents that can only be revield <br /> by the owner of the item.
          </div>

          <label className="switch">
            <input type="checkbox" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)} />
            <span className="slider round"></span>
          </label>
        </div>

        <Heading top={'36px'}>Explicit and sensitive content</Heading>

        <div className="switch-cont">
          <div className="text">Set this collection as explicit and sensitive content</div>

          <label className="switch">
            <input type="checkbox" checked={checkbox2} onChange={() => setCheckbox2(!checkbox2)} />
            <span className="slider round"></span>
          </label>
        </div>

        <Filled_CTA_Button style={{ width: 90, height: 42, marginTop: 33 }}>Create</Filled_CTA_Button>
      </ParentExploreAndData>
      <StyledExploreNft src="/icons/exploreNFT.png" />
      <ColoredBackground></ColoredBackground>
    </MainContainer>
  );
}
