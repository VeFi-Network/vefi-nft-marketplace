import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import Image from 'next/image';

const MainContainer = styled.div`
    background: transparent;
  
    z-index: -1;

    


`;

const ObjectContainer1 = styled.div`

    width: 600px;
    height: 600px;
  
    ${(props: { animate: boolean; }) => props.animate?"":"transition-duration: 2s;"}
    margin-left: ${(props: { animate: boolean; }) => props.animate?"100%":"60%"};
  
    margin-top: ${(props: { animate: boolean; }) => props.animate?"0px":"100px"};

    `;

const ObjectContainer2 = styled.div`

    width: 600px;
    height: 600px;
  
    ${(props: { animate: boolean; }) => props.animate?"":"transition-duration: 2s;"}
    margin-left: ${(props: { animate: boolean; }) => props.animate?"90%":"40%"};
  
    margin-top: -250px;
    `;






export default function Background() {

  const [animate,setAnimate] = useState(false);



  useEffect(()=>{
    setTimeout(()=>{setAnimate(true)},200);
  },[]);



  return (
    <MainContainer>

        <ObjectContainer1 animate={!animate}>
             <Image src='/objects/object1.png' width="645px" height="645px" />
        </ObjectContainer1>
        <ObjectContainer2 animate={!animate}>
             <Image src='/objects/object2.png' width="645px" height="645px" />
        </ObjectContainer2>
            
    </MainContainer>
  )
}
