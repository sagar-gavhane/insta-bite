import React from 'react'
import Link from 'next/link'

import SearchBar from 'components/SearchBar'
import ShoppingCart from '../assets/icons/shopping-cart.svg'

export default function Header() {
  return (
    <header>
      <div className="px-5 py-2 my-2 text-center text-5xl font-extrabold leading-none tracking-tight">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-700">
          InstaBite
        </h1>
      </div>
      <div
        className="grid px-4 py-2"
        style={{ gridTemplateColumns: '1fr 50px' }}
      >
        <SearchBar />
        <div className="grid justify-center items-center cursor-pointer text-gray-500 hover:text-gray-700">
          <Link href="/cart">
            <a>
              <ShoppingCart />
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}
