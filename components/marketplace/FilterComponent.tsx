import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
type Props = {};

const FilterByText = styled.div`
  margin-top: 50px;
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
`;

const FilterBtn = styled.button`
  background: #373943;
  border-radius: 11px;
  cursor: pointer;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  border: none;
  color: #5c95ff;
  padding: 10px;
  height: 37px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FilterAllBtn = styled.button`
  background: #373943;
  border-radius: 11px;
  font-family: 'RubikRegular';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  height: 37px;
  border: none;
  color: #5c95ff;
  padding: 10px 50px 10px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px 10px 10px;
  background: #373943;
  border-radius: 11px;
  gap: 10px;
  height: 37px;
  z-index: 3;

  .input {
    background: transparent;
    color: #828282;
    border: none;
    outline: none;
    width: 150px;
    margin-top: -1px;
  }
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
  margin-top: 75px;
  color: white;
  cursor: pointer;
  z-index: 2;

  transition-duration: 250ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .cross {
    font-size: 25px;
    margin-top: -6px;
    margin-left: 20px;
  }
`;

const FilterParentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterAndBtnContainer = styled.div`
  width: 1180px;
  min-width: 1000px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 50px;

  @media (max-width: 1280px) {
    width: 950px;
    min-width: 700px;
    padding-right: 30px;
  }
`;

export default function FilterComponent({}: Props) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <FilterAndBtnContainer>
      <FilterParentContainer>
        <FilterByText>
          <Image height={18} width={18} src="/icons/filter.svg" />
          <div> Filter by</div>
        </FilterByText>
        <FilterContainer>
          <FilterAllBtn>All</FilterAllBtn>
          <FilterBtn>
            Top Selling{' '}
            <div style={{ marginTop: -1 }}>
              <Image width="12px" style={{ zIndex: 1 }} height="9px" src="/icons/downIcon.svg" />
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
              placeholder="Search artwork"
              onChange={e => {
                setSearchValue(e.target.value);
              }}
              onClick={() => setSearchValue('')}
            />
          </SearchBar>
        </FilterContainer>
      </FilterParentContainer>

      <CreateNewItem>
        {' '}
        <div className="cross">+</div> Create New Item
      </CreateNewItem>
    </FilterAndBtnContainer>
  );
}
