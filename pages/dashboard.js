import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { Avatar, Badge, Page, Thumbnail, CalloutCard, Card, EmptyState, Layout } from '@shopify/polaris';

export default function Home() {
  return (   
    <Page>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout>
        <Layout.Section>
          <Card>
            <p>This is the dashboard page.</p>
          </Card>
        </Layout.Section>        
      </Layout>
    </Page>
  )
}
