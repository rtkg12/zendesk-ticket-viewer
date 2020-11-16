import React from 'react';
import { Alert, Title, Close } from '@zendeskgarden/react-notifications';

const ErrorNotification = () => (
  <Alert type="error">
    <Title>Error</Title>
    Sorry, something went wrong. Please try again in some time.
    <Close aria-label="Close Alert" />
  </Alert>
);

export default ErrorNotification;
