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

  const [state, setState] = useState({
    modalOpen: false
  });
  const router = useRouter();

  function handleResourcePicker(resources){
    const products = resources.selection.map((product) => product.id );
    store.set('productIds', products);
    setState({modalOpen:false});
    console.log(products);
    console.log(store.get('productIds'));
    router.push("/create")
  }

  return (   
    <Page>
      <Head>
        <title>Geeksample</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <ResourcePicker 
        resourceType="Product"
        open={state.modalOpen}
        onCancel={()=>setState({modalOpen: false})}
        showVariant={false}
        onSelection={(resources)=>{          
          handleResourcePicker(resources)
        }}
        />      
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Create a sale banner for a product"
            action={{content: 'Select Product', onAction: ()=>{setState({modalOpen:true})}}}
            secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}            
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Create a sale banner anywhere on your page  .</p>
          </EmptyState>
        </Layout.Section>        
      </Layout>
    </Page>
  )
}
