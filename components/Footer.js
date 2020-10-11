import React from 'react'
import Link from 'next/link'

import HomeIcon from './../assets/icons/home.svg'
import UserIcon from './../assets/icons/user.svg'
import ShoppingCartIcon from './../assets/icons/shopping-cart.svg'

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 w-full">
      <footer className="grid grid-cols-3 bg-gray-900 text-white">
        <div className="flex justify-center cursor-pointer bg-gray-800 p-4 px-0 hover:text-gray-500">
          <Link href="/">
            <a>
              <HomeIcon width="18" />
            </a>
          </Link>
        </div>
        <div className="flex justify-center cursor-pointer p-4 px-0 hover:text-gray-500">
          <Link href="/account">
            <a>
              <UserIcon width="18" />
            </a>
          </Link>
        </div>
        <div className="flex justify-center cursor-pointer p-4 px-0 hover:text-gray-500">
          <Link href="/cart">
            <a>
              <ShoppingCartIcon width="18" />
            </a>
          </Link>
        </div>
      </footer>
    </div>
  )
}
