import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
type Props = {};

const CollectionRoundAvatar = styled.div`
  border: 5px solid #5c95ff;
  border-radius: 50%;
  width: 236px;
  height: 236px;

  margin-top: -118px;

  background: url('/nft/nft03.png') no-repeat;
  background-size: 100%;
`;

const CollectionInfoCont = styled.div`
  width: 350px;
  margin-top: 30px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  gap: 17px;

  @media screen and (max-width: 760px) {
    width: 100%;
  }
  .name {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 47px;
    color: #ffffff;
  }

  .creator {
    display: flex;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    gap: 12px;

    .blue {
      color: #5c95ff;
    }
  }
`;

const StyledStatsDiv = styled.div`
  width: 898px;
  height: 105px;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
`;

const DescriptionDiv = styled.div`
  width: 872px;
  height: 115px;
  margin-top: 60px;
`;

const DescriptionText = styled.div`
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 39px;
  text-align: center;
  color: #ebf8ff;
`;

const StatsBox = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  color: white;

  .big-num {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    font-size: 68px;
    line-height: 81px;
    display: flex;
    flex-direction: row;
    gap: 0px;
    margin-left: -10px;
  }

  .blue-div {
    background: #5c95ff;
    border-radius: 3px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 5px 20px;
    gap: 10px;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #ffffff;
  }
`;

export default function CollectionData({}: Props) {
  return (
    <>
      <CollectionRoundAvatar></CollectionRoundAvatar>
      <CollectionInfoCont>
        <div className="name">Lost in Space</div>
        <div className="creator">
          Created By: <div className="blue"> Wereywanle</div>{' '}
          <Image src="/icons/verification.svg" alt="" width="20px" height="20px" className="tick" />
        </div>
      </CollectionInfoCont>

      <StyledStatsDiv>
        <StatsBox>
          <div className="big-num">10</div>
          <div className="blue-div">Items</div>
        </StatsBox>

        <StatsBox>
          <div className="big-num">20</div>
          <div className="blue-div">Owners</div>
        </StatsBox>

        <StatsBox>
          <div className="big-num">
            {' '}
            <Image src="/icons/eth_classic.svg" width="47px" height="47px" /> 2.0
          </div>
          <div className="blue-div">Floor Price</div>
        </StatsBox>

        <StatsBox>
          <div className="big-num">
            <Image src="/icons/eth_classic.svg" width="47px" height="47px" /> 20.5
          </div>
          <div className="blue-div">Volume Traded</div>
        </StatsBox>
      </StyledStatsDiv>

      <DescriptionDiv>
        <DescriptionText>Lost in space in collaboration with The MetaArt Club launches an NFT </DescriptionText>
        <DescriptionText>collection inspired by the theme of 'Every Body'—exploring the relationship </DescriptionText>
        <DescriptionText>between avatars and bodies in the metaverse</DescriptionText>
      </DescriptionDiv>
    </>
  );
}
