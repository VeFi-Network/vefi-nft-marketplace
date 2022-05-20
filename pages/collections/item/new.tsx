import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../../components/Navbar';
import Filled_CTA_Button from '../../../components/Button/CTA/Filled';
import { pinFile,  pinJson } from '../../../api/ipfs';
import FileContainer from '../../../components/Collections/FileContainer';
import DropdownComponent from '../../../components/Collections/Dropdown';
import DynamicDropdown from '../../../components/Collections/DynamicDropdown';

type Props = {};

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

const ParentExploreAndData = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  z-index: 2;
  min-width: 1000px;

  @media (max-width: 1300px) {
    min-width: 700px;
  }

  .title {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #ebf8ff;
    margin-top: 80px;
  }

  .white-text {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-top: 53px;
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
  .blue {
    color: #5c95ff;
  }

  .heading {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ebf8ff;
    margin-top: 58px;
  }

  .input-div {
    margin-top: 27px;
    width: 468px;
    height: 38px;
    border: 1.5px solid #5c95ff;
    border-radius: 4px;

    .inp {
      height: 38px;
      border: none;
      width: 468px;
      outline: none;
      background: transparent;
      padding-left: 16px;
      color: rgba(255, 255, 255, 0.58);
    }
  }

  .text-area {
    border: 1.5px solid #5c95ff;
    border-radius: 4px;
    width: 468px;
    height: 184px;
    margin-top: 26px;

    .real-text-area {
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
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

  .switch-cont {
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
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 15.4px;
      width: 15.4px;
      left: 4px;
      bottom: 2.8px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
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

  .dropdown {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 11px;
    background: #373943;
    border-radius: 11px;
    width: 155.73px;
    height: 37px;
    cursor: pointer;

    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    margin-top: 21px;

    color: #5c95ff;
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

const StyledExploreNft = styled.img`
  height: 585px;
  width: 97px;
  position: absolute;
  left: 7px;
  top: 361px;
`;

export default function NewCollection({}: Props) {
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const [traitsList, setTraitList] = useState(['Select Trait']);
  const [traitsDropdownList, setTraitsDropdown] = useState<boolean[]>([false]);

  const [colDropdown, setColDropdown] = useState(false);
  const [colValue, setColVal] = useState('Select collection');

  const [propDropdown, setPropDropdown] = useState(false);
  const [propertiesValue, setPropertiesValue] = useState('Select properties');

  const [labelDropdown, setLabelDropdown] = useState(false);
  const [labelValue, setLabelValue] = useState('Select label');

  const [file, setFile] = useState<any | null>(null);

  const [nftData,setNftData] = useState({
    name:"",
    owner:"",
    externalLink:"",
    description:""
    
  })

  const setProperty = (e:any)=>{
    setNftData(
      {...nftData,
        [e.target.name]:e.target.value
      }
    )
  }


  const checkTraitsList=()=>{
    for(let item of traitsList){
      if(item=='Select Trait')
        return false;
    }
    return true;
  }

  const [btnEnabled,setBtnEnabled] = useState(false);

  const allConditionsSatisfied = ()=>{
    if(file && nftData.name!='' && nftData.description!='' && nftData.owner!='' && labelValue!='Select label' && checkTraitsList()){
      return true;
    }
    else{
      return false;
    }

  }

  const resetAllFields = ()=>{
    setNftData({
      name:"",
      owner:"",
      externalLink:"",
      description:""
      
    });
    setFile(null);
    setLabelValue('Select label');
    setTraitList(['Select Trait']);
    setColVal('Select collection');
    setPropertiesValue('Select properties');

  }

  useEffect(()=>{
    if(allConditionsSatisfied()==btnEnabled){
      // Do nothing --- preventing unncecessary state change
    }
    else{
       if(allConditionsSatisfied()){
      setBtnEnabled(true);
    }
    else{
      setBtnEnabled(false);
    }
    }


   
  },[nftData,file,traitsList,labelValue])



  const createNftButton = async()=>{
    try{
      if(allConditionsSatisfied()){
        console.log("Pinning File");
        const formData = new FormData();
        formData.append("file", file.file);
        let respObj;
        // Pin Image File
        pinFile(formData).then((res:any)=>{
          console.log(res);
          if(res?.response?.CID && res?.response?.fileURI)
          {
            window.open(res.response.fileURI);
            //pin JSON
            pinJson({
              name: nftData.name,
              description: nftData.description,
              image: `ipfs://${res.response.CID}`,
              imageCID: res.response.CID,
              fileURI: res.response.fileURI,
              owner: nftData.owner,
              label: labelValue,
              traits: traitsList.toString(),  
            }).then((pinResponse:any)=>{
              console.log(pinResponse);
              if(pinResponse?.response?.CID && pinResponse?.response?.itemURI)
              {
              window.open(pinResponse.response.itemURI);
              resetAllFields();
              }
              else{
                console.log("Item API did not return accepted format");
              }
            }).catch((err)=>{
              console.log("Inner Catch Block Error ==" +err);
            })
          }
          else{
            console.log("File API did not return accepted format");
          }
         
        }).catch((e)=>{
          console.log("Catch block error" +e);
        })

     


      }
      else{
        console.log("Enter all details");
      }
      }
    catch(e){
      console.log("Error Occured ===" +e);
    }
      
  }


  return (
    <MainContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <ParentExploreAndData>
        <div className="title">Create new item</div>

        <div className="white-text">
          Image, Video, Audio or 3D model<span className="blue">*</span>
        </div>

        <div className="text">
          File type supported: jpg, png, gif, Mp4, SVG, WEBM, <br /> Mp3, WAV, OGG, GLB, GLTF,{' '}
          <span className="blue"> Max size 40mb</span>
        </div>

        <FileContainer file={file} setFile={setFile} type={1} />

        <Heading className="heading">
          Name<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input value={nftData.name} name="name" onChange={setProperty} type="text" className="inp" placeholder="Item Name" />
        </div>

        <Heading className="heading">
          Owner<span className="blue">*</span>
        </Heading>

        <div className="input-div">
          <input type="text" value={nftData.owner} onChange={setProperty} name="owner" className="inp" placeholder="Paste the owner address of the NFT" />
        </div>

        <Heading className="heading">External link</Heading>

        <div className="text">
          VefiNft will include a link to this URL on this item’s <br /> detail page so users can click to learn more
          about it <br /> so you are welcome to link your own web page with <br /> more details.
        </div>

        <div className="input-div">
          <input type="text" value={nftData.externalLink} onChange={setProperty} name="externalLink" className="inp" placeholder="https//Yoursite.io/item/567" />
        </div>

        <Heading top={'48px'}>
          Description<span className="blue">*</span>
        </Heading>

        <div className="text">
          The description will be included on the item <br /> detail page underneath its image.
        </div>

        <div className="text-area">
          <textarea
            className="real-text-area"
            id=""
            placeholder="provide a detailed description of your item"
            rows={7}
            value={nftData.description} onChange={setProperty} name="description"
          ></textarea>
        </div>

        <Heading top={'38px'}>Collection</Heading>

        <div className="text">This is the collection where your item will appear.</div>


        <DropdownComponent 
          dropdown={colDropdown} 
          setDropdown={setColDropdown} 
          value={colValue} 
          setValue={setColVal}
          dropDownList={['Collection 1','Collection 2','Collection 3','Collection 4']} 
          defaultValue={'Select collection'} 
          width={'155.78px'}  
          top={'36px'}        
        />


        <Heading top={'33px'}>Properties</Heading>

        <div className="text">
          Textual traits that show up as rectangles you can <br /> choose more than one
        </div>

        <DropdownComponent
         dropdown={propDropdown} 
         setDropdown={setPropDropdown} 
         value={propertiesValue} 
         setValue={setPropertiesValue} 
         dropDownList={['Property 1','Property 2','Property 3','Property 4']} 
         defaultValue={'Select properties'} 
         width={'155.78px'}  
         top={'36px'}  
         
        />
        

        <Heading top={'33px'}>
          Traits <span className="blue">*</span>
        </Heading>

        <div className="text">Select the NFT Traits</div>

        <DynamicDropdown 
        dropDownList={traitsDropdownList} 
        setDropdownList={setTraitsDropdown}
        valueList={traitsList}
        setValueList={setTraitList}
        name={'Trait'} 
        dropDownValueList={['Trait 1','Trait 2','Trait 3','Trait 4']} 
        defaultValue={'Select Trait'} 
        width={'150px'} 
        top={'27px'} 
        hideFirst={true}    
           />

        <Heading top={'33px'}>
          Labels<span className="blue">*</span>
        </Heading>

        <div className="text">Select between Legendary, Rare, Iconic, Super-Rare</div>

        <DropdownComponent 
          dropdown={labelDropdown} 
          setDropdown={setLabelDropdown}
          value={labelValue} 
          setValue={setLabelValue} 
          dropDownList={['Legendary','Rare','Iconic','Super-Rare']}
          defaultValue={'Select label'}
          width={'130px'}
          top={'20px'}          

        />

        <Heading top={'33px'}>Unlockable content</Heading>

        <div className="switch-cont">
          <div className="text">
            Include unlockable contents that can only be revield <br /> by the owner of the item.
          </div>

          <label className="switch">
            <input type="checkbox" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)} />
            <span className="slider round"></span>
          </label>
        </div>

        <Heading top={'36px'}>Explicit and sensitive content</Heading>

        <div className="switch-cont">
          <div className="text">Set this collection as explicit and sensitive content</div>

          <label className="switch">
            <input type="checkbox" checked={checkbox2} onChange={() => setCheckbox2(!checkbox2)} />
            <span className="slider round"></span>
          </label>
        </div>

        {
          btnEnabled? (
            <Filled_CTA_Button onClick={createNftButton} style={{ width: 90, height: 42, marginTop: 33 }}>Create</Filled_CTA_Button>
          ): (
            <Filled_CTA_Button onClick={createNftButton} style={{background: 'grey',width:250,  marginTop: 33 }}>Please fill all required details</Filled_CTA_Button>
          )
        }
     
      </ParentExploreAndData>
      <StyledExploreNft src="/icons/exploreNFT.png" />
      <ColoredBackground></ColoredBackground>
    </MainContainer>
  );
}
