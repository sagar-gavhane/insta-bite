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
        <ul className="grid grid-cols-3 justify-items-center">
          <li>
            <Link href="/?tab=pizza">
              <a
                className={cn('inline-block', {
                  'border-b-2 border-blue-500 pb-1 text-blue-500':
                    selectedTab === 'pizza',
                })}
              >
                Pizza 🍕
              </a>
            </Link>
          </li>
          <li>
            <Link href="/?tab=burger">
              <a
                className={cn('inline-block', {
                  'border-b-2 border-blue-500 pb-1 text-blue-500':
                    selectedTab === 'burger',
                })}
              >
                Burger 🍔
              </a>
            </Link>
          </li>
          <li>
            <Link href="/?tab=cake">
              <a
                className={cn('inline-block', {
                  'border-b-2 border-blue-500 pb-1 text-blue-500':
                    selectedTab === 'cake',
                })}
              >
                Cake 🍰
              </a>
            </Link>
          </li>
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
