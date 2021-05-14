import React from 'react';
import styled from 'styled-components';

const SInput = styled.input`
    width: 100%;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid ${(props) => props.theme.borderColor};
    border-radius: 3px;
    margin-top: 5px;
    box-sizing: border-box;
    &::placeholder {
        font-size: 12px;
    }
`

const Input = (props) => {
  return (<SInput {...props} />);
}

export default Input;