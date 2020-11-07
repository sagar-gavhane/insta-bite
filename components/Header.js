import React, { useEffect } from 'react'
import Link from 'next/link'
import { useQuery, queryCache } from 'react-query'

import cartService from 'services/carts'

import UserIcon from '../assets/icons/user.svg'
import ShoppingCartIcon from '../assets/icons/shopping-cart.svg'

export default function Header() {
  let cartId = null

  useEffect(() => {
    cartId = localStorage.getItem('cartId')
    queryCache.refetchQueries(['cart_count'])
  }, [])

  const { data: count } = useQuery(
    ['cart_count'],
    async () => {
      if (!cartId) return Promise.resolve(null)

      return cartService
        .get(cartId)
        .then((response) =>
          response.data.products.reduce((a, c) => +a + c.quantity, 0)
        )
    },
    {
      initialData: null,
    }
  )

  return (
    <header
      className="grid grid-cols-2 items-center p-4 shadow"
      style={{ gridTemplateColumns: '1fr 75px' }}
    >
      <Link href="/">
        <a>
          <img
            src="https://res.cloudinary.com/insta-bite/image/upload/c_thumb,w_200,g_face/v1604746565/logo_kri2k2.png"
            className="inline-block object-scale-down w-4 mr-1"
            alt="logo"
            loading="lazy"
          />
          <h1 className="inline-block text-md cursor-pointer select-none text-red-500">
            InstaBite
          </h1>
        </a>
      </Link>
      <div className="grid grid-cols-2 items-center gap-2 md:gap-4">
        <Link href="/account">
          <a className="flex justify-center">
            <UserIcon className="cursor-pointer" />
          </a>
        </Link>
        <Link href="/cart">
          <a className="flex justify-center relative">
            {!Number.isNaN(parseInt(count)) && (
              <span
                className="absolute bg-orange-500 p-1 rounded-full text-white flex w-4 h-4 items-center justify-center"
                style={{ fontSize: '8px', right: '0px', top: '-4px' }}
              >
                {count}
              </span>
            )}
            <ShoppingCartIcon className="cursor-pointer" />
          </a>
        </Link>
      </div>
    </header>
  )
}
