import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  z-index: -1;
  /* width: 1400px; */
  /* height: calc(100vh + 110px); */
  /* min-width: 1000px;
  min-height: 1200px; */
`;

const ObjectContainer1 = styled.div`
  ${(props: { animate: boolean }) => (props.animate ? '' : 'transition-duration: 2s;')}
  animation-timing-function: ease-out;
  margin-left: ${(props: { animate: boolean }) => (props.animate ? '52%' : '0')};
  margin-top: -240px;
  background: url('/objects/objectGrouped.png') no-repeat;
  background-size: cover;
  width: 100%;

  height: 950px;
  img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain;
  }
`;

// const ObjectContainer2 = styled.div`
//   width: 600px;
//   height: 600px;

//   ${(props: { animate: boolean }) => (props.animate ? '' : 'transition-duration: 2s;')}
//   margin-left: ${(props: { animate: boolean }) => (props.animate ? '30%' : '40%')};

//   margin-top: -250px;
// `;

export default function Background() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 200);
  }, []);

  return (
    <MainContainer>
      <ObjectContainer1 animate={!animate}></ObjectContainer1>
    </MainContainer>
  );
}
