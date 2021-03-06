import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery, queryCache } from 'react-query'

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'
import Alert from 'components/Alert'
import cartService from 'services/carts'
import productService from 'services/product'
import orderService from 'services/orders'

export default function CartPage() {
  const [cartId, setCartId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setCartId(localStorage.getItem('cartId'))
  }, [])

  const { isLoading, error, data, refetch } = useQuery(
    ['carts', { cartId }],
    async () => {
      const { data: cart } = await cartService.get(cartId)

      const products = await Promise.all(
        cart.products.map((product) => {
          const quantity = product.quantity

          return productService.get(product.id).then((res) => {
            return {
              ...res.data,
              quantity,
            }
          })
        })
      )

      return {
        ...cart,
        products,
      }
    }
  )

  let totalPrice = 0

  if (data) {
    totalPrice = Math.round(
      data.products.map((p) => p.quantity * p.price).reduce((a, c) => a + c, 0)
    )
  }

  return (
    <Fragment>
      <Head>
        <title>Cart - insta-bite.com</title>
      </Head>
      <Layout>
        <div>
          <h1 className="font-medium text-lg">Cart</h1>
        </div>
        {error && <Alert message={error.message} />}
        {isLoading && <Spinner />}
        {data && (
          <Fragment>
            <div className="my-4">
              {data.products.length === 0 && <h2>Cart is empty</h2>}
              {data.products.map((product) => {
                return (
                  <div
                    style={{ gridTemplateColumns: '64px 1fr 1fr' }}
                    className="grid gap-4 items-center"
                    key={product._id}
                  >
                    <Link href={`/product/${product.id}?backlink=/cart`}>
                      <a>
                        <img
                          className="rounded"
                          src={product.image}
                          alt={`${product.name} image`}
                          loading="lazy"
                          width="64px"
                        />
                      </a>
                    </Link>
                    <div className="grid">
                      <Link href={`/product/${product._id}?backlink=/cart`}>
                        <a className="font-medium text-sm">{product.name}</a>
                      </Link>
                      <span className="text-xs">₹ {product.price}</span>
                    </div>
                    <div className="grid grid-cols-3 border-2 border-blue-500 rounded">
                      <button
                        className="bg-blue-500 text-white px-2 py-1"
                        onClick={() => {
                          const products = data.products.map((p) => {
                            if (p._id === product._id && p.quantity > 1) {
                              return {
                                id: p._id,
                                quantity: p.quantity - 1,
                              }
                            }

                            return {
                              id: p._id,
                              quantity: p.quantity,
                            }
                          })

                          cartService.update(cartId, { products }).then(() => {
                            refetch()
                            queryCache.invalidateQueries(['cart_count'])
                          })
                        }}
                      >
                        -
                      </button>
                      <span className="flex justify-center bg-white text-black px-2 py-1">
                        {product.quantity}
                      </span>
                      <button
                        className="bg-blue-500 text-white px-2 py-1"
                        onClick={() => {
                          const products = data.products.map((p) => {
                            if (p._id === product._id) {
                              return {
                                id: p._id,
                                quantity: p.quantity + 1,
                              }
                            }

                            return {
                              id: p._id,
                              quantity: p.quantity,
                            }
                          })

                          cartService.update(cartId, { products }).then(() => {
                            refetch()
                            queryCache.invalidateQueries(['cart_count'])
                          })
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-2 my-2">
              <div className="grid grid-cols-1">
                <span className="text-gray-500">
                  {data.products.length} item selected
                </span>
                <span>₹ {totalPrice}</span>
              </div>
              <div className="grid">
                <button
                  className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded"
                  disabled={totalPrice === 0}
                  onClick={() => {
                    orderService.create(cartId).then((response) => {
                      const order = response.data
                      localStorage.removeItem('cartId')
                      router.push(`/order/${order._id}`)
                    })
                  }}
                >
                  Buy now
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </Layout>
    </Fragment>
  )
}
