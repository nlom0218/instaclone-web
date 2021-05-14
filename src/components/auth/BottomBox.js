import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const SBottomBox = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    a {
        margin-left: 8px;
        font-weight: 600;
        color: ${(props) => props.theme.accent};
    }
`

const BottomBox = ({ cta, link, linkText }) => {
  return (<SBottomBox>
    <span>{cta}</span>
    <Link to={link}>{linkText}</Link>
  </SBottomBox>);
}

export default BottomBox;