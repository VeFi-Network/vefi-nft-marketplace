import styled from 'styled-components';

export const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  background: url('/objects/colorBackground.svg') no-repeat #0c0c0c;
  min-height: 100vh;
  background-position-x: 100%;
  background-position-y: -100vh;
  background-size: 40% 70%;
  color: #ebf8ff;
  .exploreNft {
    background: url('/icons/exploreNFT.png') no-repeat;
    position: absolute;
    left: 10px;
    top: 200px;
    height: 100vh;
    width: 100px;
  }
  @media screen and (max-width: 760px) {
    background-size: contain;
    background-position-y: 0px;
    .exploreNft {
      display: none;
    }
  }
  @media screen and (min-width: 1500px) and (max-width: 2000px) {
    background-position-y: -80vh;
  }
`;

export const SectionContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0px auto;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;
export const FormWrapper = styled.div`
  input[type='file'] {
    display: none;
  }
  padding: 50px 0;
  .form__field {
    padding: 20px 0;

    .select__field {
      display: flex;
      gap: 20px;
      button {
        display: flex;
        background: #373943;
        border: none;
        outline: none;
        outline-width: 0px;
        align-items: center;
        gap: 5px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.8rem;
      }
    }
    .submitBtn {
      @media screen and (max-width: 760px) {
        width: 100%;
        padding: 15px;
        height: 60px;
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }
  .title {
    max-width: 400px;

    h3 {
      color: #ebf8ff;

      span {
        color: #5c95ff;
      }
    }
    p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.9rem;
      span {
        color: #5c95ff;
      }
      @media screen and (max-width: 760px) {
        font-size: 0.75rem;
      }
    }
  }
  .heading {
    h2 {
      color: #ebf8ff;
    }
  }
  .ant-select-selector {
    background: #373943 !important;
    border: 1px solid #373943 !important;
    outline: none !important;
    outline-width: 0px;
    color: #ebf8ff;
  }
  .ant-select-arrow {
    color: #ebf8ff;
  }
  .form__body {
    display: flex;
    flex-direction: column;
    .icon {
      font-size: 2.5rem;
      color: #5c95ff;
    }
    .circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .rectangle {
      width: 30%;
      height: 150px;
      border-radius: 5px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      display: flex;
      @media screen and (max-width: 760px) {
        width: 100%;
      }
    }
    input[type='text'],
    textarea,
    .ant-input-number {
      background: transparent;
      border: 1px solid #5c95ff;
      padding: 8px;
      outline: none;
      outline-width: 0px;
      border-radius: 3px;
      width: 50%;
      color: #ebf8ff !important;
      @media screen and (max-width: 760px) {
        width: 100%;
      }
    }
    .ant-input-number-handler-wrap {
      background: #373943 !important;
      .ant-input-number-handler {
        border-left: 1px solid #373943;
      }
      .ant-input-number-handler-down {
        border-left: 1px solid #373943;
      }
    }
  }
  .file__upload__wrapper {
    border: 2px dashed #5c95ff;
  }
`;
