import App from 'next/app';
import Head from 'next/head';
import{ AppProvider } from '@shopify/polaris';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { Component } from 'react';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';

class MyApp extends App{
  render(){
    const { Component, pageProps } = this.props;
    const config = {
      apiKey: SHOPIFY_API_KEY,
      shopOrigin: Cookies.get("shopOrigin"),
      forceRedirect: true
    };
    return (
      <>
        <Head>
          <title>Test App</title>
          <meta/>
        </Head>
        <Provider config={config}>
          <AppProvider i18n={"translations"}>
            <Component {...pageProps} />
          </AppProvider>
        </Provider>
      </>
    )
  }
}
export default MyApp;