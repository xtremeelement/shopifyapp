import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { Avatar, Badge, Page, Thumbnail, CalloutCard, Card, EmptyState, Layout, Link as PLink } from '@shopify/polaris';
import {ResourcePicker} from '@shopify/app-bridge-react';
import { set } from 'js-cookie';
import store from 'store-js'
import { userRouter, useRouter } from 'next/router';

export default function Home() {
  
  const router = useRouter();  

  function clickedStart(){
    router.push('/create')
  }

  return (   
    <Page>
      <Head>
        <title>Geeksample</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>           
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Create a sale banner for a product"
            action={{content: 'Start', onAction: ()=>{clickedStart()}}}
            secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}            
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Get more sales now using a sales banner!</p>
          </EmptyState>
        </Layout.Section>        
      </Layout>
    </Page>
  )
}
