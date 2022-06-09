import styled from 'styled-components';

export const CategoryWrapper = styled.section`
  width: calc(100% - 150px);
  margin: 0 auto;

  @media screen and (max-width: 760px) {
    width: 95%;
  }
  .listItem {
    width: 280px;
    display: flex;
    height: 400px;
    background: red;
    margin: 10px;
  }

  .wrapper {
    background: green;
    position: relative;
    .sliderArrow {
      width: 50px;
      height: 100px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }
    .container {
      display: flex;
      width: max-content;
    }
  }
`;
