import styled from 'styled-components';

export const Category = styled.section`
  width: calc(100% - 150px);
  margin: 0px auto;
  margin-top: 80px;
  height: 100%;

  .category__container {
    background: rgba(255, 255, 255, 0.1);
    padding: 20px 30px;
    height: 100%;
    border-radius: 10px;
    padding-bottom: 50px;
  }
  .category__heading {
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 0;
    h2 {
      font-family: 'MonumentExtended';
      color: #fff;
    }
  }
  .cartegory__card__listing {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 5px;
    @media screen and (max-width: 760px) {
      width: 100%;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 760px) {
    width: 90%;
  }
`;

export const CategoryCardWrapper = styled.div`
  width: 225px;
  height: 260px;
  overflow: hidden;
  margin-bottom: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  .category__card__image {
    width: 100%;
    height: 260px;

    img {
      width: 225px !important;
      height: 260px !important;
      object-fit: cover;
    }
    @media screen and (max-width: 760px) {
      width: 100%;
      display: flex;

      span {
        position: static !important;
      }
      img {
        width: 100% !important;
      }
    }
  }
  .cartegory__card__footer {
    background: linear-gradient(137.43deg, rgba(0, 0, 0, 0.6) 3.89%, rgba(255, 255, 255, 0.2) 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    height: 60px;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .footer__text {
      h2 {
        color: #fff;
        font-weight: 600;
        word-wrap: break-word;
        font-size: 1.2rem;
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 760px) {
    width: 100%;
  }
`;
