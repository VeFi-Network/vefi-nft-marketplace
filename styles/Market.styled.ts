import styled from 'styled-components';

import { CardContainer } from '../components/Card';

export const MarktePlaceWrapper = styled.section`
  width: 100%;
  background: url('/objects/colorBackground.svg') no-repeat #0c0c0c;
  background-position: top right;
  background-position-y: -300px;
  padding-bottom: 80px;

  .marketplace__container {
    position: relative;
  }
  .container {
    width: calc(100% - 150px);
    margin: 0 auto;

    @media screen and (max-width: 760px) {
      width: 90%;
    }
    .exploreNft {
      position: absolute;
      left: 0;
      z-index: 1;
      height: 400px;
      display: none;
      img {
        width: 100% !important;
        height: 400px !important;
      }
    }
  }
  .wrapper {
    background: rgba(255, 255, 255, 0.1);
    padding: 40px 30px;
    border-radius: 10px;
  }
`;

export const FilterWrapper = styled.div`
  width: 100%;
  height: max-content;
  padding-bottom: 40px;
  margin-top: 50px;

  .filter__heading {
    display: flex;
    align-items: center;
    gap: 5px;
    color: rgba(255, 255, 255, 0.5);
    padding-bottom: 10px;
  }
  .filter__body {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 760px) {
      flex-direction: column;
    }
    .filter__left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      @media screen and (max-width: 760px) {
        flex-wrap: wrap;
        width: 100%;

        margin-bottom: 20px;
      }
      .ant-btn,
      .ant-select-selector,
      .input__wrapper {
        background: #373943 !important;
        border: none !important;
        padding-left: 20px !important;
        border-radius: 5px !important;
        color: rgba(255, 255, 255, 0.4) !important;
        padding-right: 20px !important;
      }
      .ant-btn {
        padding-left: 10px !important;
        &.active {
          background: #5c95ff !important;
        }
      }
      .input__box {
        @media screen and (max-width: 760px) {
          width: 100%;
          input {
            width: 100%;
          }
        }
      }
      .input__wrapper {
        padding: 5px;
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.4) !important;
        gap: 5px;

        input {
          background: transparent;
          border: none;
          outline: none;
        }
      }
    }
    .filter__right {
      button {
        background: transparent !important;
        display: flex;
        align-items: center;
        gap: 10px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 15px 20px;
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
        &:hover {
          transform: scale(1.1);
        }
      }
      @media screen and (max-width: 760px) {
        width: 100%;

        Button {
          width: 100%;
        }
      }
    }
  }
`;

export const CollectionWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;

  .collection__container {
    display: flex;
    width: max-content;
    gap: 10px;
    padding-bottom: 10px;
    justify-content: flex-start;
    align-items: flex-start;
    @media screen and (max-width: 760px) {
      width: 100%;
      flex-direction: column;
    }
  }
  .collections {
    width: 100%;
    flex-wrap: wrap;
    ${CardContainer} {
      margin-bottom: 20px;
    }
  }
`;

export const SellersWrapper = styled.div`
  width: 100%;
  padding: 50px 0;

  .sellers__container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    a {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .top__seller__info {
      display: flex;
      width: 222px;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      .seller__image {
        display: flex;
        img {
          width: 30px !important;
          object-fit: contain;
        }
      }
      .seller__name {
        color: rgba(255, 255, 255, 0.8);
        font-family: 'Rubik';
        font-weight: 600;
      }
      @media screen and (max-width: 760px) {
        width: max-content;
        margin-left: 20px;
      }
    }
  }
`;
