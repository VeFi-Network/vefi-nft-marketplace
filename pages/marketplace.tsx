import React from 'react'
import styled  from 'styled-components';
import Filled_CTA_Button from '../components/Button/CTA/Filled';
import Ghost_CTA_Button from '../components/Button/Ghost';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { useState } from 'react';
import Card from '../components/Card';
import Background from './background';

const MarketplaceContainer = styled.div`
    min-height: 100vh;
    width: 100vw;
    background: #0C0C0C;
    padding-left: 55px;
    padding-top: 20px;
    padding-bottom: 30px;

`;


const DiscoverText = styled.div`
font-family: 'MonumentExtended';
font-style: normal;
font-weight: 400;
font-size: 55px;
line-height: 140%;

margin-top: 60px;

display: flex;
align-items: center;

color: #FFFFFF;
margin-left: 55px;




`;

const ButtonContainer = styled.div`
margin-left: 55px;
margin-top: 30px;
display: flex;
flex-direction: row;
gap: 30px;



`;
 
const FilterByText =styled.div`
    margin-top: -250px;
    margin-left: 55px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #EBF8FF;

    display: flex;
    flex-direction: row;
    gap: 10px;
    


`;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 24px;
    margin-top: 21px;
    margin-left: 55px;

`;

const FilterBtn = styled.button`

    background: #373943;
    border-radius: 11px;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    border: none;


    color: #5C95FF;
    padding: 10px;


    cursor: pointer;

    display: flex;
    flex-direction: row;
    gap: 11px;

`;

const FilterAllBtn = styled.button`

    background: #373943;
    border-radius: 11px;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    border: none;


    color: #5C95FF;
    padding: 10px 50px 10px 10px;


    cursor: pointer;

    display: flex;
    flex-direction: row;
    gap: 11px;

`;

const SearchBar = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 10px 20px 10px 10px;



background: #373943;
border-radius: 11px;
gap: 10px;

.input{
    background: transparent;
    color: #828282;
    border: none;
    outline: none;   
    width: 150px;

}



`;


const NFTContainer = styled.div`
display: flex;
flex-direction: row;
 justify-content: space-around;


 padding-left: 7%;
 padding-right: 10%;

 align-items: center;




transition-duration: 500ms;

opacity: ${(props: { visible: any; }) => props.visible?"1":"0"};

z-index: 3;


background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
backdrop-filter: blur(16.86px);

border-radius: 20px 20px 0px 0px;

width: -moz-calc(100% - 150px);

width: -webkit-calc(100% - 150px);

width: -o-calc(100% - 150px);

width: calc(100% - 150px);
height: 400px;
margin-left: 55px;
margin-top: 80px;
border: 1px solid #383838;

`;

const NFTTransparentContainer = styled.div`
margin-left: 55px;



background: linear-gradient(254.33deg, rgba(255, 255, 255, 0.1) 1.71%, rgba(255, 255, 255, 0.05) 99.35%);
backdrop-filter: blur(16.86px);


border-radius: 20px 20px 0px 0px;
box-sizing: border-box;
height: 400px;


width: -moz-calc(100% - 150px);

width: -webkit-calc(100% - 150px);

width: -o-calc(100% - 150px);

width: calc(100% - 150px);

margin-top: -310px;


border: 1px solid #383838;

z-index: 1;
opacity: 0;
        










`;



const ParentNFTCont = styled.div`
    

    &:hover{
        .transparent-cont{
        margin-top: 20px;
          height: 500px;
        opacity: 1;
        

        }

        .nft-container{
            display: none;
      
         
        }

        .hover-container{
            display: flex;
        
     
        }


    
    }

`;

const NFTSubCont = styled.div`
display: flex;
flex-direction: row;
 justify-content: space-around;

 width: 100%;
 margin-top: -120px;
 transition-duration: 250ms;
 opacity: ${(props: { visible: any; }) => props.visible?"1":"0"};


`;

const PaddedSpace =styled.div`
    min-width: 50px;
   

`;

const NFTScrollableContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
display: none;
align-items: center;

margin-top: 20px;




height: 410px;

flex-direction: row;
gap: 25px;
overflow-x: auto;
transition-duration: 500ms;
opacity: ${(props: { visible: any; }) => props.visible?"1":"0"};



`;


const DiscoverAndAnimate = styled.div`
    display: flex;
    flex-direction: row;

`;

const SeeMore = styled.div`
    color: white;
    display: none;
    margin-left: 90%;
    margin-top: 15px;
    cursor: pointer;

    flex-direction: row;
    gap: 15px;


`;


const DiscoverPart = styled.div`
    width: 600px;
`;

const AnimatePart = styled.div`
    width: 100%;
    margin-top: -170px;
    z-index: 0;

`;

export default function marketplace() {

  const [searchValue,setSearchValue ] = useState("Search artwork");

  const [transition,setTransition] = useState(false);

  const applyTransition = ()=>{
    
      setTransition(true);
  }

  return (
    <>
    <MarketplaceContainer>
        <Navbar />
        <DiscoverAndAnimate>
            <DiscoverPart>  
                <DiscoverText>
                    Discover, <br /> collect, and sell <br /> extraordinary <br /> NFTs
                </DiscoverText>
                <ButtonContainer>
                    <Filled_CTA_Button>Get Started</Filled_CTA_Button>
                    <Ghost_CTA_Button>Become a Creator</Ghost_CTA_Button>
                </ButtonContainer>
            </DiscoverPart>

            <AnimatePart>
                <Background />
            </AnimatePart>

           

        </DiscoverAndAnimate>
        
        <FilterByText>
            <Image height={18} width={18} src="/icons/filter.svg"  />
            <div> Filter by</div>
        </FilterByText>
        <FilterContainer>
            <FilterAllBtn>All</FilterAllBtn>
            <FilterBtn>Top Selling <div style={{marginTop: -1}}><Image width="12px"  height="9px" src="/icons/downIcon.svg"/></div></FilterBtn>
            <FilterBtn>Price <div style={{marginTop: -1}}><Image width="12px"  height="9px" src="/icons/downIcon.svg"/></div></FilterBtn>
            <SearchBar><Image height="18px" width="18px" src={"/icons/search.svg"} /> <input className='input' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} onClick={()=>setSearchValue("")} /></SearchBar>
        </FilterContainer>
        <ParentNFTCont>
        <NFTContainer visible={!transition} className='nft-container'>
            <NFTSubCont visible={!transition}>
                <Card collectionName='God of War' NFTImageURI='/nft/nft01.png' NFTPrice='247' NFTName='ToomuchLag' ></Card>
                <Card collectionName='Rolling Ape' NFTImageURI='/nft/nft02.png' NFTPrice='7' NFTName='Unknowest' ></Card>
                <Card collectionName='Lost in Space' NFTImageURI='/nft/nft03.png' NFTPrice='2' NFTName='Wereywanle' ></Card>
            
            </NFTSubCont>
           
           

         
         </NFTContainer>
      <NFTTransparentContainer visible={transition} className="transparent-cont"  onMouseEnter={() => {setTimeout(()=>{applyTransition();},250)}} onMouseLeave={() => {setTimeout(()=>{setTransition(false)},200)}}>  

             <NFTScrollableContainer  visible={transition}  
                 className="hover-container">

              <PaddedSpace />
                <Card collectionName='God of War' NFTImageURI='/nft/nft01.png' NFTPrice='247' NFTName='ToomuchLag' ></Card>
                <Card collectionName='Rolling Ape' NFTImageURI='/nft/nft02.png' NFTPrice='7' NFTName='Unknowest' ></Card>
                <Card collectionName='Lost in Space' NFTImageURI='/nft/nft03.png' NFTPrice='2' NFTName='Wereywanle' ></Card>
                <Card collectionName='Rolling Ape' NFTImageURI='/nft/nft02.png' NFTPrice='7' NFTName='Unknowest' ></Card>
            <PaddedSpace />
           
              
            
            </NFTScrollableContainer> 

            <SeeMore className="hover-container" >
  
               See more 
               <Image height={18} width={18} src="/icons/right-arrow.svg"  />
            </SeeMore>

       

      
      </NFTTransparentContainer>
        </ParentNFTCont>
       
      
    </MarketplaceContainer>
    

    </>
  )
}
