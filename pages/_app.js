import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import cartService from 'services/carts'
import * as gtag from 'utils/gtag'

import 'styles/index.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
