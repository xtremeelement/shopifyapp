import Head from 'next/head'
import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import {  Page,  Card,  Layout, Link as PLink, FormLayout, TextField, Heading,  MediaCard, PageActions, ColorPicker , hsbToRgb} from '@shopify/polaris';
import {ResourcePicker} from '@shopify/app-bridge-react';
import { set } from 'js-cookie';
import store from 'store-js'

export default function Create() {

  const [state, setState] = useState({
    modalOpen: false
  })

  const [formState, setFormState] = useState({
      title: 'Test',
      saleprice:'999'
  })  

  function handleText(name, text, id){
      console.log(formState);
      let newState = {
          [name]: text
      }
      console.log({
          ...formState,
          ...newState
      })
      setFormState({
          ...formState,
          ...newState
      })
  }  

  function handleResourcePicker(resources){
    const products = resources.selection.map((product) => product.id );
    store.set('productIds', products);
    setState({modalOpen:false});
    console.log(store.get('productIds'));
  }

    const [color, setColor] = useState({
        color:{
            hue: 120,
            brightness: 1,
            saturation: 0            
        },
        rgbColor:{
            red: 255,
            green: 255,
            blue: 255
        }
    });
  
    // const handleTextColor = useCallback(setColor, []);
    function handleTextColor(color){        
        let newRGBColor = hsbToRgb(color);        
        let newState ={
            color:color,
            rgbColor:newRGBColor            
        }
        setColor(newState)
    }

    const [bgColor, setBgColor] = useState({
        color:{
            hue: 120,
            brightness: 1,
            saturation: 0            
        },
        rgbColor:{
            red: 255,
            green: 255,
            blue: 255
        }
    });
  
    // const handleTextColor = useCallback(setColor, []);
    function handleBGColor(color){        
        let newRGBColor = hsbToRgb(color);        
        let newState ={
            color:color,
            rgbColor:newRGBColor            
        }
        setBgColor(newState)
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
                    <TextField label="Title" onChange={(text, id) => handleText('title', text, id)} 
                    value={formState.title}/>
                    <TextField label="Sale Price" onChange={(text, id) =>handleText('saleprice', text, id)}
                    value={formState.saleprice} />
                    <div>
                        <div className="Polaris-Label">
                            <label id="Polaris-ColorPickerLabel" htmlFor="Polaris-ColorPicker" className="Polaris-Label__Text">Choose Text Color</label>
                        </div>
                        <div style={{
                            display: 'flex',
                            
                        }}>
                            <ColorPicker onChange={handleTextColor} color={color.color} />
                            <div style={{
                                padding: '0 10px'
                            }}>
                                <div className="Polaris-Label">
                                    <label id="Polaris-SelectedColorLabel" htmlFor="Polaris-SelectedColor" className="Polaris-Label__Text">Selected Color</label>
                                </div>
                                <div style={{
                                    width: '100px',
                                    height: '40px',
                                    backgroundColor: `rgb(${color.rgbColor.red},${color.rgbColor.green},${color.rgbColor.blue})`
                                    }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className="Polaris-Label">
                        <label id="Polaris-ColorPickerLabel" htmlFor="Polaris-ColorPicker" className="Polaris-Label__Text">Choose Background Color</label>
                    </div>
                    <div style={{
                        display: 'flex',
                    }}>
                        <ColorPicker onChange={handleBGColor} color={bgColor.color} />
                        <div style={{
                            padding: '0 10px'
                        }}>
                            <div className="Polaris-Label" >
                                <label id="Polaris-SelectedColorLabel" htmlFor="Polaris-SelectedColor" className="Polaris-Label__Text">Selected Color</label>
                            </div>
                            <div style={{
                                width: '100px',
                                height: '40px',
                                backgroundColor: `rgb(${bgColor.rgbColor.red},${bgColor.rgbColor.green},${bgColor.rgbColor.blue})`
                                }}>
                            </div>
                        </div>
                    </div>
                    </div>
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
