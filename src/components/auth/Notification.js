import React from 'react';
import styled from 'styled-components';

const SNotification = styled.div`
    margin-top: 20px;
    color: #2ecc71;
`

const Notification = ({ message }) => {
  return (message === "" || !message ? null : <SNotification>{message}</SNotification>);
}

export default Notification;