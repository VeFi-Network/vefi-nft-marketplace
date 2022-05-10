import styled from 'styled-components';

type Props = {
  color?: string;
  borderRadius?: string;
  backgroundColor?: string;
  fontSize?: string;
};

const Filled_CTA_Button = styled.button`
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  color: ${(props: Props) => props.color || '#FFF'};
  border-radius: ${(props: Props) => props.borderRadius || '11px'};
  background-color: ${(props: Props) => props.backgroundColor || '#5C95FF'};

  font-size: ${(props: Props) => props.fontSize || '14px'};

  border: none;

  transition-duration: 250ms;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

export default Filled_CTA_Button;
