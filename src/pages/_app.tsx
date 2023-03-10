import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import '../../tailwind.css';

const client = new QueryClient();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>TAA - Mende</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
