import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import Layout from 'components/Layout'
import ProductItem from 'components/ProductItem'
import Spinner from 'components/Spinner'
import Alert from 'components/Alert'
import productService from 'services/product'

const tabs = [
  {
    link: '/?tab=pizza',
    value: 'pizza',
    label: 'Pizza 🍕',
  },
  {
    link: '/?tab=burger',
    value: 'burger',
    label: 'Burger 🍔',
  },
  {
    link: '/?tab=cake',
    value: 'cake',
    label: 'Cake 🍰',
  },
  {
    link: '/?tab=rollbar',
    value: 'rollbar',
    label: 'Rollbar 🌭',
  },
]

export default function HomePage(props) {
  const [selectedTab, setSelectedTab] = useState('pizza')

  const router = useRouter()

  const { isLoading, data: response, error } = useQuery(
    ['products', { selectedTab }],
    () => productService.get(null, `type=${selectedTab}`),
    {
      initialData: props.products,
    }
  )

  useEffect(() => {
    const nextSelectedTab = router.query.tab ?? 'pizza'
    setSelectedTab(nextSelectedTab)
  }, [router.query.tab])

  return (
    <Fragment>
      <Head>
        <title>Order pizza, burger, or cake - insta-bite.com</title>
      </Head>
      <Layout>
        <ul className="grid grid-cols-4 justify-items-center">
          {tabs.map((tab) => {
            return (
              <li key={tab.value}>
                <Link href={tab.link}>
                  <a
                    className={cn('inline-block', {
                      'border-b-2 border-blue-500 pb-1 text-blue-500':
                        selectedTab === tab.value,
                    })}
                  >
                    {tab.label}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
        {error && <Alert message={error.message} />}
        {isLoading && <Spinner />}
        {response && (
          <section className="grid grid-cols-1 grid-rows-1 gap-8 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {response.data.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  {...product}
                  selectedTab={selectedTab}
                />
              )
            })}
          </section>
        )}
      </Layout>
    </Fragment>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const products = await productService.get(
      null,
      `type=${query.tab ?? 'pizza'}`
    )
    return {
      props: {
        products: products,
      },
    }
  } catch (err) {
    return {
      props: {
        products: [],
      },
    }
  }
}
