import React, { useState } from 'react'
import styled from 'styled-components';
import Navbar from '../../../../components/Navbar';
import Image from 'next/image';
import Filled_CTA_Button from '../../../../components/Button/CTA/Filled';
type Props = {}

const MainContainer = styled.div`
background: #0c0c0c;
width: 100%;
min-height: 100vh;
position: relative;
display: flex;
flex-direction: column;
align-items: center;

`;

const NavbarContainer = styled.div`
    width: 100%;
`;

const ColoredBackground = styled.div`
  width: 964px;
  height: 1300px;
  background: url('/objects/marketplaceObjects.svg') no-repeat;
  position: absolute;
  top: -5%;
  right: 0%;
  z-index: 0;
`;

const ParentExploreAndData  = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 1000px;


    @media (max-width: 1300px) {
        min-width: 700px;
      }
    z-index: 2;

    .title{
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        color: #EBF8FF;
        margin-top: 80px;

    }

    .round-dot{
        border: 2px dashed #5C95FF;
        border-radius: 50%;
        width: 108px;
        height: 108px;
        margin-top: 27px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .white-text{
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #EBF8FF;
        margin-top: 53px;
    }

    .text{
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #EBF8FF;
        margin-top: 11px;
    }

    .dotted-div{
        width: 356px;
        height: 177px;
        border: 2px dashed #5C95FF;
        border-radius: 11px;
        margin-top: 27px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

    }

    .dotted-div-small{
        width: 356px;
        height: 130px;
        border: 2px dashed #5C95FF;
        border-radius: 11px;
        margin-top: 27px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

    }

    .blue{
        color: #5C95FF;
    }

    .heading{
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #EBF8FF;
        margin-top: 58px;

    }

    .input-div{
        margin-top: 27px;
        width: 468px;
        height: 38px;
        border: 1.5px solid #5C95FF;
        border-radius: 4px;

        .inp{
            height: 38px;
            border: none;
            width: 468px;
            outline: none;
            background: transparent;
            padding-left: 16px;
            color: rgba(255, 255, 255, 0.58);

        }

    }

    .input-div-small{
        margin-top: 11px;
        width: 468px;
        height: 38px;
        border: 1.5px solid #5C95FF;
        border-radius: 4px;

        .inp{
            height: 38px;
            border: none;
            width: 468px;
            outline: none;
            background: transparent;
            padding-left: 16px;
            color: rgba(255, 255, 255, 0.58);


        }

    }

    .text-area{
        border: 1.5px solid #5C95FF;
        border-radius: 4px;
        width: 468px;
        height: 184px;
        margin-top: 26px;

        .real-text-area{
            width: 100%;
            height: 100%;
            background: transparent;
            border:none;
            outline: none;
            resize: none;

      

            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            color: rgba(255, 255, 255, 0.58);
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 12px;
            padding-bottom: 12px;
            

        }
    }


    .dropdown-cont{
        display: flex;
        flex-direction: row;
        gap: 27px;
    }

    .switch-cont{
        display: flex;
        flex-direction: row;
        width: 400px;
        justify-content: space-between;
        align-items: center;


        .switch {

            position: relative;
            display: inline-block;
            width: 32.2px;
            height: 21px;
          
          }
          
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
            
       
          }
          
      
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #373943;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 15.4px;
            width: 15.4px;
            left: 4px;
            bottom: 2.8px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
          }
          
          input:checked + .slider {
            background-color: grey;
            
         
          }
          
          input:focus + .slider {
            
          }
          
          input:checked + .slider:before {
              
            -webkit-transform: translateX(8px);
            -ms-transform: translateX(8px);
            transform: translateX(8px);
          }
          
          
          .slider.round {
            border-radius: 34px;
          }
          
          .slider.round:before {
            border-radius: 50%;
          }
    }

    margin-bottom: 50px;    

`;

const DropdownContainer = styled.div`
    width: ${(props:{width:string})=>props.width?props.width:"155.78px"};
    background: #373943;
    border-radius: 11px;
    position: absolute;

    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 30px;
    margin-left: -10px;
    z-index: 3;

    .drop-el{
        height: 38px;
        display: flex;
        align-items: center;
        padding-left: 10px;

        &:hover{
            opacity: 0.5;
        }
    }
`;

const Heading = styled.div`
    margin-top: ${(props:{top:string})=>props.top?props.top:"58px"};
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #EBF8FF;

`;

const Dropdown = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 11px;
    background: #373943;
    border-radius: 11px;
    width: ${(props:{width:string})=>props.width?props.width:"155.78px"};
    height: 37px;
    cursor: pointer;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    margin-top: ${(props:{top:string})=>props.top?props.top:"36px"};


    color: #5C95FF;

    .cross{
        font-size: 22px;
    }

`;

const FieldsDiv = styled.div`
    border: 1px solid red;


`;

const StyledExploreNft = styled.img`
  height: 585px;
  width: 97px;
  position: absolute;
  left: 7px;
  top: 361px;
`;
export default function New({}: Props) {

  const [checkbox,setCheckbox] = useState(false);
  const [paymentTokenList,setPaymentTokenList] = useState<string[]>([]);
  
  const [categoryDropdown,setCatDropdown] = useState(false);
  const [categoryValue, setCatVal] = useState('Add Category');

  const [blockchainDropdown,setBlockchainDropdown] = useState(false);
  const [blockValue, setBlockValue] = useState('Select Blockchain');
  return (
    <MainContainer>
        <NavbarContainer>
            <Navbar />
        </NavbarContainer>
        <ParentExploreAndData>
            <div className="title">
                Create your Collection
            </div>


           <Heading top={"31px"} >
               Logo Image <span className="blue">*</span>
           </Heading>

            <div className="text">
            This image will also be used for navigation 350x350 <br /> recomended.
            </div>

            <div className="round-dot">
                <Image src="/collection/dummyImage.svg"  width="56px" height="56px"/>
            </div>

            <Heading top={"56px"} >
               Featured Image <span className="blue">*</span>
             </Heading>

             <div className="text">
             This image will be used to feature your artwork on the <br /> home page category pages or other promotional <br /> areas in VefiNft. <span className='blue'>(Optional)</span>
            </div>

            <div className="dotted-div">
                <Image src="/collection/dummyImage.svg"  width="56px" height="56px"/>
            </div>

            <Heading top={"56px"} >
               Banner Image <span className="blue">*</span>
             </Heading>
            

            <div className="text">
            This image will appear at the top of your collection <br /> page avoid to add too much text, as the dimension <br /> change on different device 1440x250 recomended <br /> <span className='blue'>(Optional)</span>
            </div>

            <div className="dotted-div-small">
                <Image src="/collection/dummyImage.svg"  width="56px" height="56px"/>
            </div>

            <Heading className="heading">
                Name<span className="blue">*</span>
            </Heading>

            <div className="input-div">
                <input type="text" className="inp" placeholder='Item Name' />
            </div>

            <Heading top="30px">
                Symbol<span className="blue">*</span>
            </Heading>

            <div className="input-div">
                <input type="text" className="inp" placeholder='Symbol of collection' />
            </div>

            <Heading top="30px">
                Fee Reciever<span className="blue">*</span>
            </Heading>

            <div className="input-div">
                <input type="text" className="inp" placeholder='Address that receives the fees paid for minting NFTs in this collection ' />
            </div>

            <Heading top="27px">
                URL<span className="blue">*</span>
            </Heading>

            <div className="text">
            Customize your URL on VefiNft, Must only contain <br /> lover case Letters, numbers and Hyphens.
            </div>

            <div className="input-div">
                <input type="text" className="inp" placeholder='https//vefinft.io/assets/lost-in-space' />
            </div>

            <Heading top="27px">
                Description<span className="blue">*</span>
            </Heading>

            
            <div className="text">
            <span className="blue">Note</span> Syntax is supported. 1 to 2000 words only. 
            </div>

            <div className="text-area">
                <textarea className="real-text-area" id="" placeholder='provide a detailed description of your item'  rows={7}></textarea>
            </div>  


            <Dropdown onClick={()=>{
                setCatDropdown(!categoryDropdown);
            }} width="135px">
                {categoryValue}  
                {
                    categoryValue=='Add Category' && <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
                }
               {
                   categoryDropdown && (
                    <DropdownContainer width="135px">
                        <div onClick={()=>setCatVal('Category 1')} className="drop-el">Category 1</div>
                        <div onClick={()=>setCatVal('Category 2')} className="drop-el">Category 2</div>
                        <div onClick={()=>setCatVal('Category 3')} className="drop-el">Category 3</div>
                        <div onClick={()=>setCatVal('Category 4')} className="drop-el">Category 4</div>
                    </DropdownContainer>
                   )
               }
               
            </Dropdown>

            <Heading top="64px">
                Royalties<span className="blue">*</span>
            </Heading>

            <div className="text">
            Collect a fee when a user Re-sells an item you originally created. <br /> this is deducted from the final sale price and paid monthly to a <br /> payout adress of your choosen.
            </div>

            <Heading top="25px">
                Percentage fee
            </Heading>

            <div className="input-div-small">
                <input type="text" className="inp" placeholder='0.000' />
            </div>

           
            <Heading top="39px">
                Blockchain
            </Heading>           

            <div className="text">
            Sellect the blockchain where you’d like new items from this <br /> collection to be added by defult.
            </div>

            <Dropdown onClick={()=>{
                setBlockchainDropdown(!blockchainDropdown);
            }} width="170px" top="27px">
                {blockValue} 
                {
                    blockValue=='Select Blockchain' && <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
                }
                {
                   blockchainDropdown && (
                    <DropdownContainer width="170px">
                        <div onClick={()=>setBlockValue('Blockchain 1')} className="drop-el">Blockchain 1</div>
                        <div onClick={()=>setBlockValue('Blockchain 2')} className="drop-el">Blockchain 2</div>
                        <div onClick={()=>setBlockValue('Blockchain 3')} className="drop-el">Blockchain 3</div>
                        <div onClick={()=>setBlockValue('Blockchain 4')} className="drop-el">Blockchain 4</div>
                    </DropdownContainer>
                   )
               }
            </Dropdown>


            <Heading top="39px">
                payment tokens
            </Heading> 

            <div className="text">
            These tokens may be used to buy and sell your items
            </div>

            <div className="dropdown-cont">
                <Dropdown width="150px" top="27px">
                     <Image width="17px" style={{ zIndex: 1 ,borderRadius: "50%"}} height="17px" src="/logo/eth.jpg" />   Ethereum  <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
                </Dropdown>

                {
                    paymentTokenList && paymentTokenList.map((coin,i)=>(
                            <Dropdown key={i} width="150px" top="27px">
                                    {coin}  <Image width="12px" style={{ zIndex: 1 }} height="11px" src="/icons/downIcon.svg" />
                            </Dropdown>
                    ))
                }

                <Dropdown 
                    onClick={
                        ()=>{
                            if(paymentTokenList.length <3){
                                let newTokenList = [...paymentTokenList];
                                newTokenList.push('Select Token');
                                console.log(newTokenList);
                                setPaymentTokenList(newTokenList);
                            }
                          
                        }
                    }
                width="130px" top="27px">
                   <span className="cross">+</span>  Add Token
                </Dropdown>
            </div>

            <Heading top={"52px"} >
                Explicit and sensitive content
            </Heading>

           
            <div className="switch-cont">
                <div className="text">
                Set this collection as explicit and sensitive content
                </div>


                <label 
                className="switch">
                    <input type="checkbox" checked={checkbox} onChange={()=>setCheckbox(!checkbox)}/>
                    <span className="slider round"></span>
                </label>
            </div>  


            <Filled_CTA_Button  style={{width: 90,height:42,marginTop: 33}}>Create</Filled_CTA_Button>

        </ParentExploreAndData>
        <StyledExploreNft src="/icons/exploreNFT.png" />
        <ColoredBackground></ColoredBackground>
    </MainContainer>
  )
}