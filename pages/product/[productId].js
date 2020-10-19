import React, { Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'
import Alert from 'components/Alert'
import productService from 'services/product'
import cartService from 'services/carts'

import ArrowLeftIcon from './../../assets/icons/arrow-left.svg'

export default function ProductPage() {
  const router = useRouter()

  const { isLoading, error, data: response } = useQuery(
    ['product', { id: router.query.productId }],
    () => {
      return productService.get(router.query.productId)
    }
  )

  return (
    <Fragment>
      <Head>
        <title>
          {response ? response.data.name : 'Product'} - insta-bite.com
        </title>
      </Head>
      <Layout>
        <div className="grid">
          <Link href={router.query.backlink ?? '/'}>
            <a className="p-2">
              <ArrowLeftIcon />
            </a>
          </Link>
        </div>
        {error && <Alert message={error.message} />}
        {isLoading && <Spinner />}
        {response && (
          <div>
            <img
              src={response.data.image}
              className="rounded my-4"
              alt={`${response.data.name} image`}
              loading="lazy"
            />
            <h2 className="font-bold text-lg my-2">{response.data.name}</h2>
            <p className="text-sm">{response.data.description}</p>
            <div className="grid grid-cols-2 my-2">
              <div className="grid grid-cols-1">
                <span className="text-gray-500">Price</span>
                <span className="font-bold">₹ {response.data.price}</span>
              </div>
              <div className="grid">
                <button
                  className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded"
                  onClick={() => {
                    const cartId = localStorage.getItem('cartId')

                    cartService.get(cartId).then(async (res) => {
                      let products = res.data.products

                      if (products.length === 0) {
                        products = products.concat({
                          id: response.data._id,
                          quantity: 1,
                        })
                      } else {
                        const productIdx = products.findIndex(
                          (p) => p.id === response.data._id
                        )

                        if (productIdx === -1) {
                          products = products.concat({
                            id: response.data._id,
                            quantity: 1,
                          })
                        } else {
                          products[productIdx].quantity =
                            products[productIdx].quantity + 1
                        }
                      }

                      cartService.update(cartId, { products }).then(() => {
                        router.push('/cart')
                      })
                    })
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </Fragment>
  )
}
