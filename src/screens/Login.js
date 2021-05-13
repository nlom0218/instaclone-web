import React from 'react';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { darkModeVar, isLoggedInVar } from '../apllo';

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`
const Container = styled.div`
`

const Login = () => {
    return (<Container>
        <Title>Login</Title>
    </Container>);
}

export default Login;