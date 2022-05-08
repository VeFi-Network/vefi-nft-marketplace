import styled from 'styled-components';

type Props = {
    borderRadius?: string;
    backgroundColor?: string;
    borderColor?: string;
    fontSize?: string;
    borderThickness?: string;
}

const Ghost_CTA_Button = styled.button`
    color:#fff;
    cursor:pointer;
    padding:10px 20px;
    border:${(props:Props) => props.borderThickness} solid;
    border-radius:${(props:Props) => props.borderRadius || "11px"};
    background-color:${(props:Props) => props.backgroundColor || "transparent"};
    border-color:${(props:Props) => props.borderColor || "#EBF8FF"};
    font-size:${(props:Props) => props.fontSize || "14px"};
`

export default Ghost_CTA_Button;