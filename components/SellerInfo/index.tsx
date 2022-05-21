import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  imageURI: string;
  linkTo?: any;
};

const SellerInfo = (props: Props) => {
  return (
    <>
      <div className="top__seller__info">
        <Link href={props.linkTo}>
          <a>
            <div className="seller__image">
              <Image src={props.imageURI} width="18px" height="18px" />
            </div>
            <div className="seller__name">{props.name}</div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default SellerInfo;
