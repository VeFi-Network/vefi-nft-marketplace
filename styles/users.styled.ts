import styled from 'styled-components';

export const UsersWrapper = styled.div`
  background: #0c0c0c;
  width: 100%;
  font-family: 'Rubik', sans-serif;
  padding-bottom: 50px;
  .user__header {
    height: 50px;
    align-items: center;
    width: 100%;
  }
  .user__header__banner {
    position: relative;

    .nft__wrapper {
      position: absolute;
      width: 100%;
    }
  }
`;

export const UserNFTBanner = styled.div`
  width: 100%;
  padding: 80px 0;
  background: url(${(props: { bg: string }) => (props.bg ? props.bg : '')}) no-repeat;
  background-size: cover;
  background-position: top center;
  border-top: 3px solid #5c95ff;
  border-bottom: 3px solid #5c95ff;
`;

export const UserNFTInfo = styled.div`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -90px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .display__pics {
    width: 180px;
    height: 180px;
    background: #5c95ff;
    display: flex;
    justify-content: center;
    border: 3px solid #5c95ff;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 180px !important;
      height: 180px !important;
      object-fit: cover;
    }
  }
  .user__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .username {
      display: flex;
      h2 {
        margin: 10px 0 -5px 0;
        font-size: 2rem;
        color: #ccc;
        display: flex;
        align-items: center;
        gap: 5px;
        span {
          background: yellow;
          padding: 8px;
          border-radius: 50%;
        }
      }
    }
    .join__date {
      display: flex;
      p {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    }
  }
`;

export const NFTUserInfo = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  z-index: 1;
  div:nth-child(1) {
    width: 200px;
    height: 300px;
    right: 150px;
    top: 0;
    opacity: 0.6;
    position: absolute;
    background: #5c95ff;

    filter: blur(100px);
  }
  div:nth-child(2) {
    position: absolute;
    width: 200px;
    height: 200px;
    right: 0;
    bottom: -40px;
    opacity: 0.6;
    background: #e21950;

    filter: blur(80px);
  }
  div:nth-child(3) {
    position: absolute;
    width: 200px;
    height: 100px;
    right: 0;
    bottom: -150px;
    background: #e21950;
    filter: blur(100px);
  }
`;

export const NFTUserCollectionInfo = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  border-radius: 20px;

  backdrop-filter: blur(2px);
  padding: 30px 40px;

  @media screen and (max-width: 760px) {
    width: 95%;
  }
  .filter__collection {
    display: flex;
    width: 100%;
    flex-direction: column;

    .heading {
      display: flex;
      color: rgba(255, 255, 255, 0.3);
      align-items: center;
      margin-bottom: 15px;
      font-size: 0.9rem;
      gap: 5px;
      font-weight: 400;
      span {
        display: flex;
      }
    }

    .collection {
      width: 100%;
      display: flex;
      @media screen and (max-width: 760px) {
        flex-direction: column;
        .properties {
          margin-bottom: 20px;
        }
      }
      .properties {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }
      .search__box {
        display: flex;
        background: #373943;
        width: 100%;

        border-radius: 8px;
        color: rgba(255, 255, 255, 0.3);
        align-items: center;
        padding: 10px;
        gap: 8px;
        input {
          background: transparent;
          border: none;
          outline: none;
          color: #ccc;
          padding: 2px 0;
        }
      }
    }
  }
  .sort__collection {
    width: 100%;
    margin-top: 30px;

    .sort__collection__container {
      display: flex;
      gap: 30px;
      align-items: center;
      @media screen and (max-width: 760px) {
        width: 100%;

        .sort {
          width: 100%;
          gap: 5px !important;
          span:last-child {
            font-size: 0.7rem !important;
          }
        }
      }
      .sort {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 8px;

        transition: all 0.3s ease-in;
        &:hover {
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
        }
        &.active {
          border-bottom: 1px solid #5c95ff;
        }
        span {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.3);
          &:last-child {
            font-size: 0.9rem;
          }
        }

        .sort__display {
          border: none;

          button {
            border: none;
            cursor: pointer;
            padding: 8px 20px;
            border-radius: 5px;
            transition: all 0.3s ease-in;
            &:first-child {
              background: #5c95ff;
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }
            &:last-child {
              border-top-left-radius: 0px;
              border-bottom-left-radius: 0px;
            }
            &.active {
              background: #5c95ff;
            }
            @media screen and (max-width: 760px) {
              padding: 8px 10px;
            }
          }
        }
      }
    }
  }
  .create__collection__btn {
    margin: 30px 0 80px 0;
    display: flex;

    button {
      background: transparent !important;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 20px 30px;
      color: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 5px;
      transition: all 0.3s ease-in;
      &:hover {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
`;

export const NFTCollection = styled.div`
  width: 100%;

  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0;
    justify-content: space-between;
  }
`;

export const NFTArt = styled.div`
  width: 250px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 58.79%, #000 92.21%);
  overflow: hidden;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  cursor: pointer;
  .nft__image {
    width: 100%;
    display: flex;
    margin-top: 20px;
    margin-bottom: -40px;
    img {
      width: 100% !important;
      height: 250px !important;
      object-fit: contain;
    }
  }
  .nft__footer {
    display: flex;
    background: rgba(255, 255, 255, 0.2);
    padding: 15px 10px;
    backdrop-filter: blur(10px);
    color: #fff;
    align-items: center;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .nft__prev__users {
      width: 90%;
      position: absolute;
      top: 0;
      display: flex;
      margin-top: -15px;
      span {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        img {
          object-fit: cover;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          margin-left: -10px;
        }
      }
    }
    .nft__footer__info__left {
      flex: 0.6;
      display: flex;
      .title {
        h2 {
          font-size: 0.98rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          text-transform: capitalize;
        }
        p {
          margin: 0;
          font-size: 0.7rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          width: max-content;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .nft__footer__info__right {
      flex: 0.4;
      text-align: right;
      button {
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding: 8px 15px;
        background: transparent;
        border-radius: 5px;
        margin-top: 5px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.7rem;
        cursor: pointer;
      }
      .price__value {
        font-size: 1.5rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  @media screen and (max-width: 760px) {
    gap: 2px !important;
    width: 300px !important;
    margin-bottom: 10px !important;
    .nft__image {
      margin-top: 0 !important;
      img {
        width: 100% !important;
        height: 300px !important;
        object-fit: cover;
      }
    }
  }
`;
