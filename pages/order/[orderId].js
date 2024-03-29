import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'
import Alert from 'components/Alert'
import orderService from 'services/orders'
import cartService from 'services/carts'
import productService from 'services/product'

export default function OrderPage(props) {
  const router = useRouter()

  const { data, isLoading, error } = useQuery(
    ['order', { orderId: router.query.orderId }],
    () => {
      return orderService.get(router.query.orderId).then(async (response) => {
        const order = response.data
        const cart = await cartService.get(order.cartId).then((r) => r.data)

        const products = await Promise.all(
          cart.products.map((product) => {
            return productService.get(product.id)
          })
        )

        return {
          order,
          cart,
          products,
        }
      })
    },
    {
      initialData: {
        order: props.order,
        cart: props.cart,
        products: props.products,
      },
    }
  )

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <Alert message={error.message} />
      </Layout>
    )
  }

  const totalPrice = Math.round(
    data.products
      .map((p) => {
        const { quantity } =
          data.cart.products.find((e) => e.id === p.data._id) ?? {}
        return {
          ...p.data,
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
        {data.products.map((prod) => {
          const product = prod.data
          const { quantity } =
            data.cart.products.find((p) => p.id === product._id) ?? {}

          return (
            <div
              style={{ gridTemplateColumns: '64px 1fr 48px' }}
              className="grid gap-x-4 my-2 items-center"
              key={product._id}
            >
              <Link
                href={`/product/${product._id}?backlink=/order/${router.query.orderId}`}
              >
                <a>
                  <img
                    className="rounded"
                    src={product.image}
                    alt={`${product.name} image`}
                    width="64px"
                    height="64px"
                    loading="lazy"
                  />
                </a>
              </Link>
              <div className="grid">
                <Link
                  href={`/product/${product._id}?backlink=/order/${router.query.orderId}`}
                >
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
        {data.order?.name && (
          <div>
            <h4 className="font-bold mt-2">Delivery Details:</h4>
            <div>{data.order.name}</div>
            <div>
              {data.order.mobileNumber}, {data.order.emailAddress}
            </div>
            <div>
              {data.order.address} - {data.order.pinCode}
            </div>
          </div>
        )}
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

export async function getServerSideProps({ query }) {
  try {
    const { order, cart, products } = await orderService
      .get(query.orderId)
      .then(async (response) => {
        const order = response.data
        const cart = await cartService.get(order.cartId).then((r) => r.data)

        const products = await Promise.all(
          cart.products.map((product) => {
            return productService.get(product.id)
          })
        )

        return {
          order,
          cart,
          products,
        }
      })

    return {
      props: {
        order,
        cart,
        products,
      },
    }
  } catch (err) {
    return {
      props: {
        order: {},
        cart: {},
        products: [],
      },
    }
  }
}
