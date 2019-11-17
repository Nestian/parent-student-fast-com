import * as React from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';

export const loadingMessage = (
  <Container style={{ textAlign: 'center', paddingTop: '200px' }}>
    <Typography variant="h3">Loading...</Typography>
    <br />
    <CircularProgress size={100} />
  </Container>
);
