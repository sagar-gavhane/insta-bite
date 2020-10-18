import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import Layout from 'components/Layout'
import orderService from 'services/orders'
import cartService from 'services/carts'
import productService from 'services/product'

export default function OrderPage() {
  const router = useRouter()

  const { data, isLoading, error } = useQuery(
    ['order', { orderId: router.query.orderId }],
    () => {
      return orderService.get(router.query.orderId).then(async (response) => {
        const order = response.data
        const d2 = await cartService.get(order.cartId)
        const cart = d2.data

        const d3 = await Promise.all(
          cart.products.map((product) => {
            return productService.get(product.id)
          })
        )
        const products = d3.data

        return {
          order,
          cart,
          products,
        }
      })
    }
  )

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error occured: ${error.message}</h1>
  }

  const totalPrice = Math.round(
    data.products
      .map((p) => {
        const { quantity } = data.cart.products.find((e) => e.id === p.id)

        return {
          ...p,
          quantity,
        }
      })
      .map((p) => p.quantity * p.price)
      .reduce((a, c) => a + c, 0)
  )

  return (
    <Layout>
      <h1 className="font-bold">My Order #{router.query.orderId}</h1>
      <p className="my-2">
        Your order has been successfully placed and will be get delivered within
        next 45 minutes.
      </p>
      <div>
        {data.products.map((product) => {
          const { quantity } = data.cart.products.find(
            (p) => p.id === product.id
          )

          return (
            <div
              style={{ gridTemplateColumns: '64px 1fr 48px' }}
              className="grid gap-4 items-center"
              key={product.id}
            >
              <Link href={`/product/${product.id}?backlink=/cart`}>
                <a>
                  <img className="rounded" src={product.image} width="64px" />
                </a>
              </Link>
              <div className="grid">
                <Link href={`/product/${product.id}?backlink=/cart`}>
                  <a className="font-medium text-sm">{product.name}</a>
                </Link>
                <span className="text-xs">₹ {product.price}</span>
              </div>
              <div className="grid border-2 border-blue-500 rounded">
                <span className="bg-blue-500 text-white px-1 py-1 flex justify-center">
                  {quantity}
                </span>
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
      </div>
    </Layout>
  )
}
