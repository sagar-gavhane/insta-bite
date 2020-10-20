import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import { GA_TRACKING_ID } from 'utils/gtag'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* primary meta tags */}
          <meta
            name="title"
            content="Order pizza, burger, or cake  - insta-bite.com"
          />
          <meta
            name="description"
            content="Order Pizza online from Insta bite and Get home delivery within the next 45 minutes. Yummy pizza delivered fast & fresh. "
          />
          {/* open graph / facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://insta-bite.com/" />
          <meta
            property="og:title"
            content="Order pizza, burger, or cake  - insta-bite.com"
          />
          <meta
            property="og:description"
            content="Order Pizza online from Insta bite and Get home delivery within the next 45 minutes. Yummy pizza delivered fast & fresh. "
          />
          <meta
            property="og:image"
            content="https://insta-bite.com/meta-og-image.jpg"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          {/* twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://insta-bite.com/" />
          <meta
            property="twitter:title"
            content="Order pizza, burger, or cake  - insta-bite.com"
          />
          <meta
            property="twitter:description"
            content="Order Pizza online from Insta bite and Get home delivery within the next 45 minutes. Yummy pizza delivered fast & fresh. "
          />
          <meta
            property="twitter:image"
            content="https://insta-bite.com/meta-twitter-image.jpg"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
