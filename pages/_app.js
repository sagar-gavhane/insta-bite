import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Auth0Provider } from '@auth0/auth0-react'

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
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window === 'undefined' ? {} : window.location.origin}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  )
}

export default MyApp
