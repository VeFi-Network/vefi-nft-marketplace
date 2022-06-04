import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

import Card from '../Card';

const GreyContainerMain = styled.div`
  width: 1248px;
  height: 1375px;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  border-radius: 20px;
  margin-top: 83px;
  z-index: 2;
`;

const FilterByText = styled.div`
  margin-top: 54px;
  margin-left: 55px;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ebf8ff;

  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 21px;
  margin-left: 55px;
`;

const FilterBtn = styled.button`
  background: #373943;
  border-radius: 11px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: none;

  color: #5c95ff;
  padding: 10px;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  gap: 11px;
`;

const FilterAllBtn = styled.button`
  background: #373943;
  border-radius: 11px;

  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: none;

  color: #5c95ff;
  padding: 10px 50px 10px 10px;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  gap: 11px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 20px 10px 10px;

  background: #373943;
  border-radius: 11px;
  gap: 10px;

  z-index: 3;

  .input {
    background: transparent;
    color: #828282;
    border: none;
    outline: none;
    width: 150px;
  }
`;

const ItemsEventsDiv = styled.div`
  width: 400px;
  height: 50px;
  margin-left: 55px;
  margin-top: 62px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
`;

const ItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  color: white;
  cursor: pointer;
  padding: 5px;

  ${(props: { active: boolean }) => (props.active ? 'border-bottom: 3px solid #5C95FF;' : '')}
`;

const ButtonViewContainer = styled.div`
  margin-left: 30px;
  width: 117px;
  display: flex;
  flex-direction: row;
  height: 37px;

  cursor: pointer;
`;

const Grid4Button = styled.div`
  background: #5c95ff;
  border-radius: 11px 0px 0px 11px;
  height: 37px;
  width: 57px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const Grid9Button = styled.div`
  background: #373943;
  border-radius: 11px 0px 0px 11px;
  height: 37px;
  width: 57px;

  border-radius: 11px 0px 0px 11px;
  transform: matrix(-1, 0, 0, 1, 0, 0);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CreateNewItem = styled.div`
  width: 198px;
  height: 44px;
  border: 1px solid #ebf8ff;
  border-radius: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  margin-left: 55px;
  margin-top: 46px;
  color: white;
  cursor: pointer;

  .cross {
    font-size: 25px;
    margin-top: -6px;
    margin-left: 20px;
  }
`;

const NFTContainer = styled.div`
  margin-top: 90px;
  padding-left: 15%;
  padding-right: 15%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

type Props = {};

export default function GreyContainer({}: Props) {
  const [searchValue, setSearchValue] = useState('Search artwork');

  return (
    <GreyContainerMain>
      <FilterByText>
        <Image height={18} width={18} src="/icons/filter.svg" />
        <div> Filter by</div>
      </FilterByText>

      <FilterContainer>
        <FilterAllBtn>All</FilterAllBtn>
        <FilterBtn>
          Top Selling{' '}
          <div style={{ marginTop: -1 }}>
            <Image width="12px" height="9px" src="/icons/downIcon.svg" />
          </div>
        </FilterBtn>
        <FilterBtn>
          Price{' '}
          <div style={{ marginTop: -1 }}>
            <Image width="12px" height="9px" src="/icons/downIcon.svg" />
          </div>
        </FilterBtn>
        <SearchBar>
          <Image height="18px" width="18px" src={'/icons/search.svg'} />{' '}
          <input
            className="input"
            value={searchValue}
            onChange={e => {
              setSearchValue(e.target.value);
            }}
            onClick={() => setSearchValue('')}
          />
        </SearchBar>
      </FilterContainer>

      <FilterContainer style={{ marginTop: '36px' }}>
        <FilterAllBtn>Buy Now</FilterAllBtn>
        <FilterBtn>On Auction </FilterBtn>
        <FilterBtn>New </FilterBtn>
        <FilterBtn>Has Offers </FilterBtn>
        <FilterBtn>Single Items</FilterBtn>
        <FilterBtn>Single Items</FilterBtn>
      </FilterContainer>

      <ItemsEventsDiv>
        <ItemDiv active={true}>
          <Image src="/icons/grid4.svg" width="18px" height="18px" />
          Items
        </ItemDiv>
        <ItemDiv active={false}>
          <Image src="/icons/events.svg" width="18px" height="18px" />
          Events
        </ItemDiv>

        <ButtonViewContainer>
          <Grid4Button>
            <Image src="/icons/grid4.svg" width="18px" height="18px" />
          </Grid4Button>
          <Grid9Button>
            <Image src="/icons/grid9.svg" width="18px" height="18px" />
          </Grid9Button>
        </ButtonViewContainer>
      </ItemsEventsDiv>

      <CreateNewItem>
        {' '}
        <div className="cross">+</div> Create New Item
      </CreateNewItem>

      <NFTContainer>
        <Card name="God of War" imageURI="/nft/nft01.png" price="247" owner="ToomuchLag" linkTo=""></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo=""></Card>
        <Card name="Lost in Space" imageURI="/nft/nft03.png" price="2" owner="Wereywanle" linkTo=""></Card>
        <Card name="Rolling Ape" imageURI="/nft/nft02.png" price="7" owner="Unknowest" linkTo=""></Card>
      </NFTContainer>
    </GreyContainerMain>
  );
}
