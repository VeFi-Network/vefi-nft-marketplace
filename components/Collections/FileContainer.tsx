import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

type Props = {
  file: any;
  setFile: any;
  type: number;
};

const DottedLineDivItem = styled.div`
  width: 356px;
  height: 177px;
  border: 2px dashed #5c95ff;
  border-radius: 11px;
  margin-top: 29px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  @media screen and (max-width: 760px) {
    width: 100%;
  }
  .file-area {
    border: 1px solid red;
    position: absolute;
    width: 356px;
    height: 177px;
    opacity: 1;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }

  .preview-image {
    aspect-ratio: original;
    height: 98%;
    max-width: 350px;
  }

  .close-icon {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 95%;
    transition-duration: 250ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.25);
    }
  }
`;

const DottedLineDivSmall = styled.div`
  width: 356px;
  height: 130px;
  border: 2px dashed #5c95ff;
  border-radius: 11px;
  margin-top: 27px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  .file-area {
    border: 1px solid red;
    position: absolute;
    width: 356px;
    height: 130px;
    opacity: 1;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }

  .preview-image {
    aspect-ratio: original;
    height: 98%;
    max-width: 350px;
  }

  .close-icon {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 95%;
    transition-duration: 250ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.25);
    }
  }
`;

const RoundDotted = styled.div`
  border: 2px dashed #5c95ff;
  border-radius: 50%;
  width: 108px;
  height: 108px;
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .file-area {
    border: 1px solid red;
    position: absolute;
    border-radius: 50%;
    width: 108px;
    height: 108px;
    opacity: 1;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }

  .preview-image {
    aspect-ratio: original;
    width: 108px;
    height: 108px;
    border-radius: 50%;
  }

  .close-icon {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 85%;
    transition-duration: 250ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.25);
    }
  }
`;

export default function FileContainer({ file, setFile, type }: Props) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        setFile({
          ...file,
          imagePreview: reader.result,
          file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {type == 1 && (
        <DottedLineDivItem className="dotted-div">
          {!file && (
            <>
              <input type="file" onChange={handleFileChange} className="file-area" />
              <Image src="/collection/dummyImage.svg" width="56px" height="56px" />
            </>
          )}

          {file && file?.imagePreview && (
            <>
              <img
                onClick={() => setFile(null)}
                src="/icons/closeIcon.svg"
                width="24px"
                height="24px"
                className="close-icon"
              />
              <img src={file.imagePreview} className="preview-image" />
            </>
          )}
        </DottedLineDivItem>
      )}

      {type == 2 && (
        <RoundDotted>
          {!file && (
            <>
              <input type="file" onChange={handleFileChange} className="file-area" />
              <Image src="/collection/dummyImage.svg" width="56px" height="56px" />
            </>
          )}

          {file && file?.imagePreview && (
            <>
              <img
                onClick={() => setFile(null)}
                src="/icons/closeIcon.svg"
                width="24px"
                height="24px"
                className="close-icon"
              />
              <img src={file.imagePreview} className="preview-image" />
            </>
          )}
        </RoundDotted>
      )}

      {type == 3 && (
        <DottedLineDivSmall className="dotted-div-small">
          {!file && (
            <>
              <input type="file" onChange={handleFileChange} className="file-area" />
              <Image src="/collection/dummyImage.svg" width="56px" height="56px" />
            </>
          )}

          {file && file?.imagePreview && (
            <>
              <img
                onClick={() => setFile(null)}
                src="/icons/closeIcon.svg"
                width="24px"
                height="24px"
                className="close-icon"
              />
              <img src={file.imagePreview} className="preview-image" />
            </>
          )}
        </DottedLineDivSmall>
      )}
    </>
  );
}
