import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { Avatar, Badge, Page, Thumbnail } from '@shopify/polaris';

export default function Home() {
  return (
   
    <Page
    breadcrumbs={[{content: 'Products', url: '/products'}]}
    title="3/4 inch Leather pet collar"
    titleMetadata={<Badge status="success">Paid</Badge>}
    subtitle="Perfect for any pet"
    thumbnail={
      <Thumbnail
        source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
        alt="Black leather pet collar"
      />
    }
    primaryAction={{content: 'Save', disabled: true}}
    secondaryActions={[
      {
        content: 'Duplicate',
        accessibilityLabel: 'Secondary action label',
        onAction: () => alert('Duplicate action'),
      },
      {
        content: 'View on your store',
        onAction: () => alert('View on your store action'),
      },
    ]}
    actionGroups={[
      {
        title: 'Promote',
        accessibilityLabel: 'Action group label',
        actions: [
          {
            content: 'Share on Facebook',
            accessibilityLabel: 'Individual action label',
            onAction: () => alert('Share on Facebook action'),
          },
        ],
      },
    ]}
    pagination={{
      hasPrevious: true,
      hasNext: true,
    }}
    additionalNavigation={<Avatar size="small" initials="CD" customer={false} />}
    separator
  >
    <p>Page content</p>
    <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
  </Page>
  )
}
