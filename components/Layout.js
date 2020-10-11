import React from 'react'
import Link from 'next/link'

import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Layout() {
  return (
    <div className="pb-5">
      <Header />
      <main className="p-4">
        <ul className="grid grid-cols-3 gap-1">
          <li>
            <a
              className="inline-block border-b-2 border-blue-500 pb-1  text-blue-500"
              href="#"
            >
              Burger 🍔
            </a>
          </li>
          <li>
            <a className="inline-block" href="#">
              Pizza 🍕
            </a>
          </li>
          <li>
            <a className="inline-block" href="#">
              Cake 🍰
            </a>
          </li>
        </ul>
        <section className="grid grid-cols-1 gap-4 py-4">
          <Link href="/product/001">
            <a>
              <div className="grid bg-gray-100 border rounded-lg p-4 cursor-pointer">
                <img className="p-5" src="/images/burger-001.png" />
                <h3 className="text-md font-semibold">Pigeon Burger</h3>
                <p className="font-thin text-xs">
                  Americon burger with extra cheese
                </p>
                <p className="text-sm">₹ 300</p>
                <button
                  type="button"
                  className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded"
                >
                  Order Now
                </button>
              </div>
            </a>
          </Link>

          <div className="grid bg-gray-100 border rounded-lg p-4 cursor-pointer">
            <img className="p-5" src="/images/burger-001.png" />
            <h3 className="text-md font-semibold">Toasty Burgers</h3>
            <p className="font-thin text-xs">Mexican Beef burger with chees</p>
            <p className="text-sm">₹ 300</p>
            <button
              type="button"
              className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded"
            >
              Order Now
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
