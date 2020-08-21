import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import {  Page,  Card,  Layout, Link as PLink, FormLayout, TextField, Heading,  MediaCard, PageActions } from '@shopify/polaris';
import {ResourcePicker} from '@shopify/app-bridge-react';
import { set } from 'js-cookie';
import store from 'store-js'

export default function Create() {

  const [state, setState] = useState({
    modalOpen: false
  });

  function handleResourcePicker(resources){
    const products = resources.selection.map((product) => product.id );
    store.set('productIds', products);
    setState({modalOpen:false});
    console.log(products);
    console.log(store.get('productIds'));
  }

  return (   
    <Page
    breadcrumbs={[{content: 'Home', url: '/'}]}
    title="Create A Banner"
    >
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
            <Layout.AnnotatedSection
                title="Banner Title"
                description="Create a name for your banner"
            >
                <Card sectioned>
                <FormLayout>
                    <TextField type="text" label="Title" onChange={() => {}} />
                    <TextField type="text" label="Sale Price" onChange={() => {}} />
                    
                </FormLayout>
                </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection
                title="Product Information"
                description="Provide info of sale"
            >
            <Card sectioned>                
                <MediaCard
                    title="Test Product"
                    primaryAction={{
                        content: 'Change product',
                        onAction: () => {},
                    }}
                    description={`Price: $49.95`}
                    
                    >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }}
                        src="https://burst.shopifycdn.com/photos/smiling-businesswoman-in-office.jpg?width=1850"
                    />
                </MediaCard>                
            </Card>
            </Layout.AnnotatedSection>
        </Layout>
        <PageActions
            primaryAction={{
                content: 'Save',
            }}
            secondaryActions={[
                {
                content: 'Delete',
                destructive: true,
                },
            ]}
            />
    </Page>
  )
}
