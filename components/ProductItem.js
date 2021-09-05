import React from 'react'
import Link from 'next/link'
import cogoToast from 'cogo-toast'
import { queryCache } from 'react-query'

import cartService from 'services/carts'

import PlusIcon from '../assets/icons/plus.svg'

export default function ProductItem(props) {
  const productHref = `/product/${props._id}?backlink=/?tab=${props.selectedTab}`

  return (
    <div className="grid cursor-pointer border shadow-md">
      <Link href={productHref}>
        <a className="relative">
          <img
            className=""
            src={props.image.replace(
              /upload/,
              'upload/ar_1:1,c_thumb,e_auto_brightness,g_auto,h_500,q_80,w_500'
            )}
            alt={`${props.name} image`}
            loading="lazy"
          />
          <span
            className="font-semibold text-md absolute px-3 py-2 text-gray-100 bg-black rounded-md"
            style={{ bottom: '10px', left: '10px' }}
          >
            ₹ {props.price}
          </span>
        </a>
      </Link>
      <div className="p-4">
        <Link href={productHref}>
          <a>
            <h3 className="text-md font-semibold text-black">{props.name}</h3>
          </a>
        </Link>
        <p className="font-thin text-xs">{props.shortText}</p>
        <button
          type="button"
          className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded inline-flex items-center"
          onClick={() => {
            const cartId = localStorage.getItem('cartId')

            cartService.get(cartId).then(async (res) => {
              let products = res.data.products

              if (products.length === 0) {
                products = products.concat({
                  id: props._id,
                  quantity: 1,
                })
              } else {
                const productIdx = products.findIndex((p) => p.id === props._id)

                if (productIdx === -1) {
                  products = products.concat({
                    id: props._id,
                    quantity: 1,
                  })
                } else {
                  products[productIdx].quantity =
                    products[productIdx].quantity + 1
                }
              }

              cartService.update(cartId, { products }).then(() => {
                queryCache.invalidateQueries(['cart_count'])
                cogoToast.success('Added to cart', {
                  position: 'top-center',
                })
              })
            })
          }}
        >
          <PlusIcon /> <span className="ml-1">Add to cart</span>
        </button>
      </div>
    </div>
  )
}
