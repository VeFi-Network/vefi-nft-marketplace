import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  background: #5c95ff;
  padding: 40px;
  z-index: 999;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 40px 15px;
  }
`;

export const SubDiv1 = styled.div`
  flex: 1;
  width: 100%;

  .stay_loop {
    .loop_text {
      font-family: 'MonumentExtended' sans-serif;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    .loop_desc {
      font-family: 'Rubik';
      margin: 10px 0;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;
      color: #ffffff;

      br {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
    }
  }

  .signup {
    margin: 40px 0;
    display: flex;
    align-items: center;

    div {
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }

    input {
      background: #ffffff;
      border-radius: 11px;
      border: none;
      outline: none;
      height: 45px;
      width: 250px;
      padding: 0 10px;

      &::placeholder {
        color: #828282;
      }

      @media screen and (max-width: 768px) {
        width: 100%;
        margin-bottom: 10px;
      }
    }

    button {
      margin: 0 10px;
      background: #1f1f1f;
      border-radius: 11px;
      border: none;
      outline: none;
      height: 45px;
      padding: 0 10px;
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      cursor: pointer;

      @media screen and (max-width: 768px) {
        width: 100%;
        margin: 0;
        text-align: center;
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      width: 100%;
    }
  }

  .logo_container {
    margin: 10px 0;
  }

  .community {
    margin-top: 30px;

    .join {
      font-family: 'MonumentExtended' sans-serif;
      font-style: normal;
      font-weight: 800;
      font-size: 18px;
      line-height: 19px;
      color: #ffffff;
    }

    .socials {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .icon {
        font-size: 35px;
        margin-right: 20px;
        color: #ffffff;
      }
    }
  }
`;

export const SubDiv2 = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;

  .marketplace {
    flex: 1;

    .nav_section {
      font-family: 'MonumentExtended' sans-serif;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    @media screen and (max-width: 768px) {
      margin: 30px 0;
    }
  }

  .my_account {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
      @media screen and (max-width: 768px) {
        margin: 10px 0;
      }
    }
    .nav_section {
      font-family: 'MonumentExtended' sans-serif;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    @media screen and (max-width: 768px) {
      margin: 20px 0;
    }
  }

  .company {
    flex: 1;
    .nav_section {
      font-family: 'MonumentExtended' sans-serif;
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    @media screen and (max-width: 768px) {
      margin: 20px 0;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FootLink = styled.div`
  margin: 10px 0;

  a {
    text-decoration: none;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
  }
`;
