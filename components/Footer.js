import React from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import Link from 'next/link'

import HomeIcon from './../assets/icons/home.svg'
import UserIcon from './../assets/icons/user.svg'
import ShoppingCartIcon from './../assets/icons/shopping-cart.svg'

export default function Footer() {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <footer className="grid grid-cols-3 bg-gray-900 text-white">
        <Link href="/">
          <a>
            <div
              className={cn(
                'flex justify-center cursor-pointer p-4 px-0 hover:text-gray-500',
                {
                  'bg-gray-800': router.pathname === '/',
                }
              )}
            >
              <HomeIcon width="18" />
            </div>
          </a>
        </Link>
        <Link href="/account">
          <a>
            <div
              className={cn(
                'flex justify-center cursor-pointer p-4 px-0 hover:text-gray-500',
                {
                  'bg-gray-800': router.pathname === '/account',
                }
              )}
            >
              <UserIcon width="18" />
            </div>
          </a>
        </Link>
        <Link href="/cart">
          <a>
            <div
              className={cn(
                'flex justify-center cursor-pointer p-4 px-0 hover:text-gray-500',
                {
                  'bg-gray-800': router.pathname === '/cart',
                }
              )}
            >
              <ShoppingCartIcon width="18" />
            </div>
          </a>
        </Link>
      </footer>
    </div>
  )
}
