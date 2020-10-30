import React, { useEffect } from 'react'
import getConfig from 'next/config'
import * as Sentry from '@sentry/node'
import { RewriteFrames } from '@sentry/integrations'
import { useRouter } from 'next/router'
import { Auth0Provider } from '@auth0/auth0-react'

import cartService from 'services/carts'
import * as gtag from 'utils/gtag'

import 'styles/index.css'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig()
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          frame.filename = frame.filename.replace(distDir, 'app:///_next')
          return frame
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  })
}

export default function MyApp({ Component, pageProps, err }) {
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
      <Component {...pageProps} err={err} />
    </Auth0Provider>
  )
}
