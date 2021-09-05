import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery, queryCache } from 'react-query'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { string, object, number } from 'yup'

import Layout from 'components/Layout'
import Spinner from 'components/Spinner'
import Alert from 'components/Alert'
import cartService from 'services/carts'
import productService from 'services/product'
import orderService from 'services/orders'

const schema = object().shape({
  name: string()
    .min(3, 'Name field must be at least 3 characters in length.')
    .required('Name field is required.')
    .label('Name'),
  emailAddress: string()
    .email('Email field must contain a valid email address.')
    .required('Email field is required.')
    .label('Email'),
  mobileNumber: string()
    .min(10, 'Mobile number field must be at least 10 digits in length.')
    .max(10, 'Mobile number field cannot exceed 10 characters in length.')
    .required('Mobile number field is required.')
    .label('Mobile number'),
  address: string()
    .min(20, 'Address field must be at least 20 characters in length.')
    .required('Address field is required.')
    .label('Address'),
  pinCode: number()
    .test(
      'len',
      'Pin code field must be exactly 6 digits in length.',
      (pinCode) => ('' + pinCode).length === 6
    )
    .required('Pin code field is required.')
    .label('Pin code'),
})

export default function CartPage() {
  const [cartId, setCartId] = useState(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating },
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      emailAddress: '',
      mobileNumber: '',
      address: '',
      pinCode: '',
    },
    resolver: yupResolver(schema),
  })
  const address = watch('address', '')

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

  const onSubmit = async (deliveryDetails) => {
    try {
      const response = await orderService.create({ cartId, ...deliveryDetails })
      const order = response.data

      localStorage.removeItem('cartId')

      router.push(`/order/${order._id}`)
    } catch (error) {
      console.error(error)
    }
  }

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
          <h1 className="font-medium text-md">Item Summary:</h1>
        </div>
        {error && <Alert message={error.message} />}
        {isLoading && <Spinner />}
        {data && (
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {data.products.length > 0 && (
              <div className="my-4">
                <div className="font-medium text-md">Delivery Details:</div>
                <div className="my-2">
                  <input
                    id="name"
                    type="text"
                    className="border w-full py-1 px-4 rounded-md"
                    placeholder="Name"
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <div className="text-red-500 text-sm my-1">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="my-2">
                  <input
                    id="emailAddress"
                    type="email"
                    className="border w-full py-1 px-4 rounded-md"
                    placeholder="Email address"
                    {...register('emailAddress')}
                  />
                  {errors.emailAddress?.message && (
                    <div className="text-red-500 text-sm my-1">
                      {errors.emailAddress.message}
                    </div>
                  )}
                </div>
                <div className="my-2">
                  <input
                    id="mobileNumber"
                    type="number"
                    className="border w-full py-1 px-4 rounded-md"
                    placeholder="Mobile number"
                    {...register('mobileNumber')}
                  />
                  {errors.mobileNumber?.message && (
                    <div className="text-red-500 text-sm my-1">
                      {errors.mobileNumber.message}
                    </div>
                  )}
                </div>
                <div className="my-2">
                  <textarea
                    id="address"
                    className="border w-full py-1 px-4 rounded-md"
                    rows="4"
                    placeholder="Address"
                    {...register('address')}
                  />
                  <div className="flex flex-row-reverse">
                    <p className="text-sm text-gray-500">
                      characters: {address?.length}
                    </p>
                  </div>
                  {errors.address?.message && (
                    <div className="text-red-500 text-sm my-1">
                      {errors.address.message}
                    </div>
                  )}
                </div>
                <div className="my-2">
                  <input
                    id="pinCode"
                    type="number"
                    className="border w-full py-1 px-4 rounded-md"
                    placeholder="Pin code"
                    {...register('pinCode')}
                  />
                  {errors.pinCode?.message && (
                    <div className="text-red-500 text-sm my-1">
                      {errors.pinCode.message}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 my-2">
              <div className="grid grid-cols-1">
                <span className="text-gray-500">
                  {data.products.length} item selected
                </span>
                <span>₹ {totalPrice}</span>
              </div>
              <div className="grid">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded"
                  disabled={totalPrice === 0 || isSubmitting || isValidating}
                >
                  Buy now
                </button>
              </div>
            </div>
          </form>
        )}
      </Layout>
    </Fragment>
  )
}
