import {  Page,  Card,  Layout, Link as PLink, FormLayout, TextField, Heading,  MediaCard, PageActions, ColorPicker , hsbToRgb, Button } from '@shopify/polaris';
import {ResourcePicker} from '@shopify/app-bridge-react';
import store from 'store-js'
import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery} from '@apollo/client';

const GET_PRODUCTS = gql`
    query getProducts($ids: [ID!]!){
        nodes(ids: $ids){
        ...on Product{
            title
            handle
            descriptionHtml
            id
            images(first: 1){
            edges{
                node{
                originalSrc
                altText
                }
            }
            }
            variants(first: 1){
            edges{
                node{
                price
                id
                }
            }
            }
        }
        }
    }    
`;

export default function ProductInfo(){
    const [state, setState] = useState({
        modalOpen: false
      });

    const [productChoice, setProductChoice] = useState(false);
    
    function handleResourcePicker(resources){
        const products = resources.selection.map((product) => product.id );
        store.set('productIds', products);
        setState({modalOpen:false});
        setProductChoice(true);
        console.log(store.get('productIds'));
    }
    const { loading, error, data } = useQuery(GET_PRODUCTS,{
        variables: {
            "ids": store.get('productIds')
          },
    })
    // if (loading) return <p>Loading...</p>;
    // console.log(data);
    // return <h1>Load Complete</h1>
    function showMediaCard(){
        if(productChoice){
            if(loading){
                return(<div>Loading Product</div>)
            }else{
                const product = {
                    title: data.nodes[0].title,
                    description: data.nodes[0].descriptionHtml.replace( /(<([^>]+)>)/ig, ''),
                    id: data.nodes[0].id,
                    image_url: data.nodes[0].images.edges[0].node.originalSrc,
                }
                console.log(product);
                return(
                <MediaCard
                    title={product.title}
                    primaryAction={{
                        content: 'Select Product',
                        onAction: () => {setState({modalOpen: true})},
                    }}
                    description={product.description}
                    >
                    <img
                        alt=""
                        width="100%"
                        height="100%"
                        style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        }}
                        src={product.image_url}
                    />
                </MediaCard>
                )
            }            
        }        
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
                    {!productChoice ? <Button
                        onClick={()=>{
                            setState({modalOpen:true})
                        }}
                        >Choose a product</Button>:''}  
                 {showMediaCard()}     
                </Card>
            </Layout.AnnotatedSection>
        </>
    )
}