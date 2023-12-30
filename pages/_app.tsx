import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { IntlProvider } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';
import RTL from '../src/RTL';
import { ar_messages, en_messages } from '@/src/locales';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <RTL>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <IntlProvider
          locale='ar'
          messages={ar_messages}
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </RTL>
  );
}
