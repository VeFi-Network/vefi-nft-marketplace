import styled from 'styled-components';
export const Container = styled.div`
  background: rgba(255, 255, 255, 0.2);
  /* Note: backdrop-filter has minimal browser support */
  border: 1px solid linear-gradient(0deg, #9a9898 100%, #383838 100%);
  /* border-radius: 20px; */
  color: rgba(255, 255, 255, 0.9);
  padding: 30px 80px;
  width: calc(100% - 150px);
  margin: 80px auto;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: 'Rubik', sans-serif;
  .heading {
    font-size: 3rem;
    font-weight: 800;
    font-family: 'MonumentExtended';
    padding: 10px 0;
    color: #fff;

    @media screen and (max-width: 760px) {
      font-size: 1.3rem;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 760px) {
    width: 95%;
    padding: 20px;
    font-size: 0.8rem;
  }
  .desc {
    p {
      font-size: 1rem;
      @media screen and (max-width: 760px) {
        font-size: 0.9rem;
      }
    }
  }
  .list__wrapper {
    margin-left: 20px;
  }
  ul {
    margin: 10px 0 20px 20px;
  }
  li {
    line-height: 1.8rem;
  }
  .blockquote {
    color: rgba(255, 255, 255, 0.8);
  }
  .container {
    h2 {
      font-size: 1.4rem;
      font-weight: 800;
      font-family: 'Rubik', sans-serif;
      color: #fff;
    }

    .desc {
      margin: 20px 0;
      font-size: 0.9rem;
      font-family: 'Rubik', sans-serif;
      line-height: 1.5rem;
      color: rgba(255, 255, 255, 0.8);

      ul {
        margin-left: 20px;
      }
    }
    .blockquote {
      color: rgba(255, 255, 255, 0.8);
      margin-left: 20px;

      span {
        display: block;
        line-height: 2rem;
      }
    }
  }
`;
