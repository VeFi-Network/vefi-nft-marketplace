import React from 'react';
import Navbar from '../../components/Navbar';
import { usePageQuery } from '../../hooks';
import { CreateNewCollection, CreateNewItem } from '../../routes';
import { SectionContainer, SectionWrapper } from '../../styles/createCollections.styled';
const Create = () => {
  const { slug } = usePageQuery();
  return (
    <>
      <SectionWrapper>
        <Navbar />
        <div className="exploreNft"></div>
        <SectionContainer>
          {slug === 'collection' ? (
            <>
              <CreateNewCollection />
            </>
          ) : (
            <>
              <CreateNewItem />
            </>
          )}
        </SectionContainer>
      </SectionWrapper>
    </>
  );
};

export default Create;
