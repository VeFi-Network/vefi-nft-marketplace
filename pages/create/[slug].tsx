import React from 'react';
import { usePageQuery } from '../../hooks';
import { CreateNewCollection, CreateNewItem } from '../../routes';
const Create = () => {
  const { slug } = usePageQuery();
  return (
    <>
      {slug === 'collection' ? (
        <>
          <CreateNewCollection />
        </>
      ) : (
        <>
          <CreateNewItem />
        </>
      )}
    </>
  );
};

export default Create;
