import styled from 'styled-components';

export const BridgeBackground = styled.section`
  width: 100%;
  position: relative;
  background: url('/objects/bridge2.svg') no-repeat;
  background-position: top right;
  background-size: contain;
  height: 100vh;
  @media screen and (max-width: 760px) {
    min-height: 100vh;
    background-size: contain;
    background-position: top bottom;
  }
  .bg__left {
    background: url('/objects/colorBackground.svg') no-repeat;
    height: 500px;
    background-size: 40% 90%;

    background-position-y: 0px;

    @media screen and (max-width: 760px) {
      display: none;
    }
  }
  .exploreNft {
    margin-top: -200px;
  }
`;

export const BridgeContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;

  .container {
    width: 100%;
    max-width: 500px;
    margin: 10vh auto;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 30px 30px;
    border-radius: 20px;
    @media screen and (max-width: 760px) {
      width: 95%;
    }
    .heading {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0 20px 0;
      h2 {
        font-size: 1.8rem;
        font-family: 'MonumentExtended', sans-serif;
        text-align: center;
        line-height: 38px;
        font-weight: 800;
        color: #fff;

        @media screen and (max-width: 760px) {
          font-size: 1.4rem;
          line-height: 28px;
        }
        @media screen and (max-width: 320px) {
          font-size: 1.2rem;
        }
      }
    }

    .container__wrapper {
      width: 100%;
      display: flex;
      position: relative;
      flex-direction: column;

      .list__wrapper {
        display: flex;
        background: #373943;
        width: 100%;
        margin-bottom: 2px;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        cursor: pointer;
        @media screen and (max-width: 380px) {
          padding: 15px 10px;

          .list__text {
            margin-left: 10px;
          }
        }
        &:nth-child(1) {
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        &:nth-child(3) {
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        .list__logo {
          display: flex;
          align-items: center;
          border-radius: 50%;
          overflow: hidden;
          img {
            object-fit: cover;
            border-radius: 50%;
            width: 30px !important;
            height: 30px !important;
          }
        }
        .list__text {
          text-align: left !important;
          width: 80%;
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
        }
        .list__icon {
          color: rgba(255, 255, 255, 0.4) !important;
        }
      }
      .list__switch {
        display: flex;
        margin: 0 auto;
        padding: 5px;
        left: 50%;
        top: 38%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: absolute;
        justify-content: center;
        align-items: center;
        background: #373943;
        border-radius: 5px;
        cursor: pointer;
        img {
          width: 8px !important;
        }
      }
    }
    .button__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 0;

      button {
        padding: 5px 20px;
        height: 45px;
        width: max-content;
        border-radius: 10px;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 10px;

        .btn__icon {
          color: rgba(255, 255, 255, 0.9) !important;
          display: flex !important;
          align-items: center !important;
          font-size: 0.7rem;
        }
      }
    }
  }
`;
export const BridgeChainWrapper = styled.div`
  .select__chain__heading {
    margin: 20px 0;
    font-size: 1.2rem;
    font-family: 'Rubik';
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
  }
  .select__chain__search {
    margin-bottom: 20px;

    .ant-input-affix-wrapper {
      background-color: #222222 !important;
      border: 1px solid transparent !important;
      display: flex !important;
      align-items: center !important;
    }
    .ant-input-affix-wrapper-focused {
      outline: none !important ;
      border: 1px solid transparent !important;
    }
    .ant-input-prefix {
      color: #ccc !important;
      font-size: 0.9rem;
      padding-top: 2px;
    }
    .ant-input {
      background: transparent !important ;
      color: #ccc;
      outline: none !important ;
      padding-left: 3px;
    }
  }
  .select__chain__container {
    height: 250px;
    overflow-y: scroll;
  }
`;
export const SelectChainOptions = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const ChainOptions = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  .chain__logo {
    display: flex;
    overflow: hidden;
    img {
      width: 28px !important;
      height: 28px !important;
      object-fit: cover;
      border-radius: 50px;
    }
  }
  .chain__text {
    font-family: 'Rubik';
    color: #ebf8ff;
    font-size: 1rem;
    font-weight: 600;
  }
  &:hover {
    background: #222222;
    border-radius: 8px;
  }
`;
