import styled from 'styled-components';

export const Container = styled.div`
  width: calc(100% - 150px);
  margin: 50px auto;
  display: flex;

  flex-direction: column;
  align-items: center;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  /* Note: backdrop-filter has minimal browser support */
  border: 1px solid linear-gradient(0deg, #9a9898 100%, #383838 100%);
  border-radius: 20px;
  @media screen and (max-width: 760px) {
    width: 90%;
  }
  h3 {
    font-family: 'MonumentExtended';
    font-style: normal;
    font-weight: 600;
    font-size: 1.8rem;
    line-height: 140%;
    color: #ffffff;
    padding-top: 50px;
    text-align: center;

    @media screen and (max-width: 900px) {
      font-size: 25px;
      line-height: 100%;
    }
  }

  .slider_con {
    position: relative;
    width: 100%;
    color: white;
    padding: 30px;

    .swiper-container {
      width: 100%;

      @media screen and (max-width: 900px) {
        .swiper-container {
          width: 900px;
        }
      }

      @media screen and (max-width: 640px) {
        .swiper-container {
          width: 640px;
        }
      }
    }

    .slider_item_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 250px;
      height: 280px;
      padding: 20px;

      @media screen and (max-width: 760px) {
        width: 100%;
      }
      .image {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: blur(0.5px);

        img {
          object-fit: contain;
        }
      }

      .title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 600;
        font-size: 1rem;
        line-height: 114.5%;

        /* or 23px */

        text-align: center;

        color: #ffffff;
      }
      .content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 0.79rem;
        line-height: 140%;
        /* or 22px */

        text-align: center;

        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;
