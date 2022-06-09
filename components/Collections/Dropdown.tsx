import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import styled from 'styled-components';

type Props = {
  setDropdown: any;
  dropdown: boolean;
  value: string;
  onChange: (value: any) => void;
  dropDownList: string[];
  defaultValue: string;
  width: string;
  top: string;
};

const DropdownMain = styled.div`
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
  overflow-y: scroll;

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

export default function DropdownComponent({
  setDropdown,
  dropdown,
  value,
  onChange,
  dropDownList,
  defaultValue,
  width,
  top
}: Props) {
  return (
    <DropdownMain
      onClick={() => {
        setDropdown(!dropdown);
      }}
      width={width}
      top={top}
    >
      {value}
      {!dropdown ? <FiChevronDown /> : <FiChevronUp />}
      {dropdown && (
        <DropdownContainer width={width}>
          {dropDownList &&
            dropDownList.map((data, index) => (
              <div key={index} onClick={() => onChange(data)} className="drop-el">
                {data}
              </div>
            ))}
        </DropdownContainer>
      )}
    </DropdownMain>
  );
}
