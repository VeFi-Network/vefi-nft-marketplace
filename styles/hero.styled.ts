import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
  backdrop-filter: blur(16.86px);
  /* Note: backdrop-filter has minimal browser support */
  border: 1px solid linear-gradient(0deg, #9a9898 100%, #383838 100%);
  border-radius: 20px;
  h3 {
    font-family: 'Monument Extended' sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 140%;
    color: #ffffff;
    padding:20px 0 ;
  }

  .slider_con {
    position: relative;
    width: 100%;
    color: white;
    padding: 30px;

    .swiper-container{
        width:100% ;
    }

    .slider_item_container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 250px;
      min-height: 280px;
      padding: 20px;

      .image {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: blur(.5px) ;
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
        font-size: 20px;
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
        font-size: 16px;
        line-height: 140%;
        /* or 22px */

        text-align: center;

        color: #ffffff;
      }
    }
  }
`;
