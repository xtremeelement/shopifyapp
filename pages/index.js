import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { Avatar, Badge, Page, Thumbnail, CalloutCard, Card, EmptyState, Layout } from '@shopify/polaris';

export default function Home() {
  return (   
    <Page>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <Layout>
        <Layout.Section>
          <Card title="Order details" sectioned>
            <p>View a summary of your order.</p>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Tags" sectioned>
            <p>Add tags to your order.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
