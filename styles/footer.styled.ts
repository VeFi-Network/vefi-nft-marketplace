import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #5c95ff;
  padding: 40px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width:100% ;
    padding:40px 15px ;
  }
`;
export const SubDiv1 = styled.div`
  flex: 1;
  width:100% ;

  .stay_loop {
    .loop_text {
      font-family: 'Monument Extended';
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 24px;
      color: #ffffff;
    }

    .loop_desc {
      font-family: 'Roboto';
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

    div{
        @media screen and (max-width: 768px) {
          width:100% ;
        }
    }

    input {
      background: #ffffff;
      border-radius: 11px;
      border: none;
      outline: none;
      height: 40px;
      width: 250px;
      padding: 0 10px;

      &::placeholder {
        color: #828282;
      }

      @media screen and (max-width: 768px) {
          width:100% ;
          margin-bottom: 10px;
        }
    }

    button {
      margin: 0 10px;
      background: #1f1f1f;
      border-radius: 11px;
      border: none;
      outline: none;
      height: 40px;
      padding: 0 10px;
      font-family: 'Rubik';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
      display: flex;
      align-items: center;
      justify-content:center ;
      color: #ffffff;

      @media screen and (max-width: 768px) {
          width:100% ;
          margin: 0;
          text-align:center ;
        }
    }

    @media screen and (max-width: 768px) {
          flex-direction:column ;
          width:100% ;
        }
  }


`;
export const SubDiv2 = styled.div`
  flex: 1;
`;
