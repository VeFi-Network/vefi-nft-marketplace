import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const MainContainer = styled.div`
  background: transparent;

  z-index: -1;

  min-width: 1000px;
  min-height: 1200px;
`;

const ObjectContainer1 = styled.div`
  ${(props: { animate: boolean }) => (props.animate ? '' : 'transition-duration: 2s;')}

  animation-timing-function: ease-out;

  margin-left: ${(props: { animate: boolean }) => (props.animate ? '32%' : '5%')};
  margin-top: 0px;
  width: 1400px;
  height: 1000px;
`;

const ObjectContainer2 = styled.div`
  width: 600px;
  height: 600px;

  ${(props: { animate: boolean }) => (props.animate ? '' : 'transition-duration: 2s;')}
  margin-left: ${(props: { animate: boolean }) => (props.animate ? '30%' : '40%')};

  margin-top: -250px;
`;

export default function Background() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 200);
  }, []);

  return (
    <MainContainer>
      <ObjectContainer1 animate={!animate}>
        <Image src="/objects/objectGrouped.png" height="1300px" width="1400px" />
      </ObjectContainer1>
    </MainContainer>
  );
}
