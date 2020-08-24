import {  Page,  Card,  Layout, Link as PLink, FormLayout, TextField, Heading,  MediaCard, PageActions, ColorPicker , hsbToRgb} from '@shopify/polaris';
import {ResourcePicker} from '@shopify/app-bridge-react';
import store from 'store-js'
import React, { useState, useEffect, useCallback } from 'react';

export default function ProductInfo(){
    const [state, setState] = useState({
        modalOpen: false
      })

    function handleResourcePicker(resources){
        const products = resources.selection.map((product) => product.id );
        store.set('productIds', products);
        setState({modalOpen:false});
        console.log(store.get('productIds'));
    }
    return(
        <>
            <ResourcePicker 
            resourceType="Product"
            open={state.modalOpen}
            onCancel={()=>setState({modalOpen: false})}
            showVariant={false}
            onSelection={(resources)=>{          
            handleResourcePicker(resources)
            }}
            />
            <Layout.AnnotatedSection
                    title="Product Information"
                    description="Provide info of sale"
                >
                <Card sectioned>                
                    <MediaCard
                        title="Test Product"
                        primaryAction={{
                            content: 'Select Product',
                            onAction: () => {setState({modalOpen: true})},
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
        </>
    )
}