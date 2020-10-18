import React, { useEffect } from 'react'
import cartService from 'services/carts'
import 'styles/index.css'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const cartId = localStorage.getItem('cartId')

    if (!cartId) {
      cartService.create().then((response) => {
        localStorage.setItem('cartId', response.data._id)
      })
    }
  })
  return <Component {...pageProps} />
}

export default MyApp
