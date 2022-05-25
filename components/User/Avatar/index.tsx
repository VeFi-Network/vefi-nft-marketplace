type Props = {
  avatarSrcUrl?: string;
  width?: string | '100px';
  height?: string | '100px';
};

const Avatar = ({ avatarSrcUrl, width, height }: Props) => {
  return (
    <>
      <img src={avatarSrcUrl} width={width} height={height} />
    </>
  );
};

export default Avatar;
