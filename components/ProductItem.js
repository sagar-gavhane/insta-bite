import React from 'react'
import Link from 'next/link'

export default function ProductItem(props) {
  return (
    <Link href={`/product/${props._id}?backlink=/?tab=${props.selectedTab}`}>
      <a>
        <div className="grid bg-gray-100 p-4 cursor-pointer">
          <img className="p-5" src={props.image} />
          <h3 className="text-md font-semibold">{props.name}</h3>
          <p className="font-thin text-xs">{props.shortText}</p>
          <p className="text-sm">₹ {props.price}</p>
          <button
            type="button"
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 my-2 rounded"
          >
            Order Now
          </button>
        </div>
      </a>
    </Link>
  )
}
