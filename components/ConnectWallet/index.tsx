import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const ConnectWalletWrapper = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 200px);
  align-items: center;
  .container {
    width: 100%;
    max-width: 1200px;
    background: var(--bg-lightdark);
    margin: 0 auto;
    color: #fff;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-top: 60px;
    padding-bottom: 30px;
    border-radius: 20px;

    .title {
      h1 {
        color: #fff;
        font-family: 'Rubik';
        padding-bottom: 10px;
        ::first-letter {
          font-size: 1.2em;
        }
      }
      h2 {
        font-size: 1.2em;
        font-family: 'Rubik';
      }
    }
    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1em;
    }
  }
  @media screen and (max-width: 760px) {
    width: 95%;
    margin: 0 auto;
    height: max-content;

    .container {
      .title {
        h2 {
          font-size: 1em;
          line-height: 40px;
          padding-bottom: 20px;
        }
      }
    }
  }
`;
const ConnectWallet = () => {
  return (
    <>
      <ConnectWalletWrapper>
        <div className="container">
          <div className="title">
            <h1>Oops!</h1>
            <h2>Connect your Wallet</h2>
          </div>
          <div className="body">
            <p>You need to connect your wallet to continue</p>
          </div>
        </div>
      </ConnectWalletWrapper>
    </>
  );
};

export default ConnectWallet;
