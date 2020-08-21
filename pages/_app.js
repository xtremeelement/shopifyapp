import App from 'next/app';
import Head from 'next/head';
import{ AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { Component } from 'react';

class MyApp extends App{
  render(){
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Test App</title>
          <meta charset='utf-8'/>
          <AppProvider i18n={"translations"}>
            <Component {...pageProps} />
          </AppProvider>
        </Head>
      </>
    )
  }
}
export default MyApp;