import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { ServiceProvider } from '../services';
import theme from '../styles/theme';

export default function App(props) {
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Kanban Board</title>
      </Head>
      <ServiceProvider>
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </ServiceProvider>
    </React.Fragment>
  );
}
