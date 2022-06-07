import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
type Props = {
  dropDownList: boolean[];
  setDropdownList: any;
  valueList: string[];
  setValueList: any;
  name: string;
  dropDownValueList: string[];
  defaultValue: string;
  width: string;
  top: string;
  hideFirst: boolean;
};

const DynamicDropdownCont = styled.div`
  display: flex;
  flex-direction: row;
  gap: 27px;
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
  position: relative;

  margin-top: ${(props: { top: string }) => (props.top ? props.top : '36px')};

  color: #5c95ff;

  .cross {
    font-size: 22px;
  }

  .close-icon {
    position: absolute;
    left: 95%;
    top: 0%;
    transition-duration: 250ms;

    &:hover {
      transform: scale(1.4);
    }
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

export default function DynamicDropdown({
  dropDownList,
  setDropdownList,
  valueList,
  setValueList,
  name,
  dropDownValueList,
  defaultValue,
  width,
  top,
  hideFirst
}: Props) {
  const setSelectedValue = (index: number, value: string) => {
    let tempValueList = [...valueList];
    tempValueList[index] = value;
    setValueList(tempValueList);
  };

  const deleteSelectedValue = (index: number) => {
    let tempValueList = [...valueList];
    let tempDropdownlist = [...dropDownList];
    tempValueList.splice(index);
    tempDropdownlist.splice(index);

    setValueList(tempValueList);
    setDropdownList(tempDropdownlist);
  };

  return (
    <DynamicDropdownCont>
      {valueList &&
        valueList.map((value, i) => (
          <Dropdown
            onClick={() => {
              let newdropdownList = [...dropDownList];
              newdropdownList[i] = !newdropdownList[i];
              setDropdownList(newdropdownList);
            }}
            key={i}
            width={width}
            top={top}
          >
            {value}{' '}
            {value == defaultValue && (
              <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
            )}
            {!hideFirst && (
              <img
                onClick={(e: any) => {
                  e.stopPropagation();
                  deleteSelectedValue(i);
                }}
                src="/icons/closeIcon.svg"
                width="12px"
                height="12px"
                className="close-icon"
              />
            )}
            {hideFirst && i != 0 && (
              <img
                onClick={(e: any) => {
                  e.stopPropagation();
                  deleteSelectedValue(i);
                }}
                src="/icons/closeIcon.svg"
                width="12px"
                height="12px"
                className="close-icon"
              />
            )}
            {dropDownList[i] && (
              <DropdownContainer>
                {dropDownValueList &&
                  dropDownValueList.map((data, index) => (
                    <div key={index} onClick={() => setSelectedValue(i, data)} className="drop-el">
                      {data}
                    </div>
                  ))}
              </DropdownContainer>
            )}
          </Dropdown>
        ))}

      <Dropdown
        onClick={(e: any) => {
          if (valueList.length < 4) {
            let newValueList = [...valueList];
            newValueList.push(defaultValue);
            let newDropdownList = [...dropDownList];
            newDropdownList.push(false);
            setDropdownList(newDropdownList);
            setValueList(newValueList);
          }
        }}
        width="130px"
        top="27px"
      >
        <span className="cross">+</span> Add {name}
      </Dropdown>
    </DynamicDropdownCont>
  );
}
