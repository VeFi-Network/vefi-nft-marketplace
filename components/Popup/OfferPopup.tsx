import React, { useState } from 'react'
import Image from 'next/image';
import styled from 'styled-components';
import DropdownComponentWithIcon from './DropdownWithIcon';
import Filled_CTA_Button from '../Button/CTA/Filled';

const MainSellContainer = styled.div`
    height: 719px;
    width: 1006px;
    margin-top: -330.5px;
    margin-left: -503px;
    background: #222222;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    padding-left: 67px;
    top: ${(props:{open:boolean})=>props.open?"50%":"-50%"};
    opacity: ${(props:{open:boolean})=>props.open?"1":"0"};
    transition-duration: 500ms;
    z-index: 5;

    .img-title{
        display: flex;
        flex-direction: row;
        margin-left: 20px;

        .image-container{
            width: 265px;
            height: 263px;
            margin-top: -80px;
            background: #222222;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
         
            .nft-img{
                border-radius: 14px;
            }
        }

        .title{
            font-family: 'Rubik';
            font-style: normal;
            color: #EBF8FF;
            font-weight: 500;
            font-size: 40px;
            line-height: 47px;
            margin-left: 55px;
            margin-top: 51px;
        }
        
    }


    .text {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #ebf8ff;
        margin-top: 11px;
      }

      .input-div{
        width: 195px;
        height: 38px;
        border: 1.5px solid #5C95FF;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 13px;
        margin-top: 10px;
      
        .eth-container{
            border-radius: 50%;
            width: 18px;
            height: 18px;
            background: #EDF0F4;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }

        .input{
            width: 100px;
            margin-left: 10px;
            border: none;
            background: transparent;
            outline: none;
         
            -moz-appearance: textfield;
            color: rgba(255, 255, 255, 0.58);

        }
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }


    
    }

    .input-div-large{
        width: 404px;
        height: 38px;
        border: 1.5px solid #5C95FF;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 13px;
        margin-top: 10px;

        .input-large{
            width: 380px;
            border: none;
            outline: none;
            background: transparent;
            color: rgba(255, 255, 255, 0.58);
        }
    
    }

    .offer-btn{
        width: 180px;
        height: 42px;
        margin-top: 32px;
    }
      

`;

const Heading = styled.div`
  margin-top: ${(props: { top: string }) => (props.top ? props.top : '58px')};
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #ebf8ff;
`;


type Props = {
    modal:boolean,
    setModal: any,
    nftById: any
    transition: boolean
}

export default function OfferPopup({modal,setModal,nftById,transition}: Props) {

const [tokenDropdown,setTokenDropdown] = useState(false);
const [tokenValue, setTokenValue] = useState(0);
  
return (
    <>
    {
        modal?(
            <MainSellContainer open={transition}>
                    <div className="img-title">                     
                        <div className="image-container">
                            <img width="244px" height="238.53px" src={nftById?nftById.metadata?.imageURI:"/nft/nft02.png"} alt="" className="nft-img" />
                        </div>
                        <div className="title">
                           Please make <br /> your offer
                        </div>
                    </div>

                    <Heading top="68px">
                            Set a price
                    </Heading>

                    <div className="text">
                             Input the price you would like to offer 
                    </div>

                    <div className="input-div">
                        <div className="eth-container">
                            <Image width="12px" height="12px" src={tokenValue==0?"/icons/eth.svg":"/logo/bnb.png"} />
                        </div>
                        <input placeholder="0.00" type="number" className="input" />
                    </div>

                    <Heading top="27px">
                            Select token
                    </Heading>

                    <div className="text">
                            Select the token you will like to transact with
                    </div>

                    <DropdownComponentWithIcon
                    setDropdown={setTokenDropdown}
                     dropdown={tokenDropdown}
                      value={tokenValue} 
                      onChange={function (value: any): void {
                          setTokenValue(value);
                      } } 
                      dropDownList={[
                          {name:"Ethereum",image:"/icons/eth.svg"},
                          {name:"Binance",image:"/logo/bnb.png"}
                    ]} 
                      width={''} 
                      top={'10px'} 
                      
                    />

                    <Heading top='15px' >
                        Payment Address
                    </Heading>

                    <div className="text">
                        Impute your Payment address
                    </div>

                    <div className="input-div-large">
                        <input placeholder="0x2FB785e7Aa6DFdBbfa82EB7e16a2bE6F0CeB369b" type="text" className="input-large" />
                    </div>

                    <Filled_CTA_Button className="offer-btn">
                        Proceed to make offer
                    </Filled_CTA_Button>

                    


                    
             </MainSellContainer>
        ):null
    }
    </>
  )
}