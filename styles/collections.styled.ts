import styled from 'styled-components';

export const NFTCollectionWrapper = styled.div`
  z-index: 10;
  height: auto;
  .username {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      color: #fff;
      font-weight: 800;
      font-size: 1.5rem;
    }
  }
  .user__info {
    margin-top: -8px;
    display: flex;
    p {
      color: #fff;
      font-size: 0.7rem;
    }
    @media screen and (max-width: 760px) {
      text-align: center;
    }
  }
`;

export const NFTUserStats = styled.div`
  width: 100%;

  .user__nft__statistics {
    width: 100%;
    max-width: 800px;
    margin: 0px auto;
    justify-content: space-around;
    display: flex;
    .stat {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: max-content;
      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
          margin-bottom: -10px;
          font-size: 2.5rem;
          font-weight: 600;
          color: #fff;

          @media screen and (max-width: 760px) {
            font-size: 1.5rem;
          }
        }
      }
      .label {
        background: #5c95ff;
        padding: 5px 10px;
        width: 100%;
        justify-content: center;
        display: flex;
        color: #fff;
        font-size: 0.6rem;
        border-radius: 3px;
      }
    }
  }
`;

export const NFTCollectionDescription = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 800px;
  margin-bottom: 30px;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 50px;

    p {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      font-size: 1rem;
    }
    @media screen and (max-width: 760px) {
      padding: 1rem 2rem;
      text-align: left;
      word-break: break-all;
    }
  }
`;
