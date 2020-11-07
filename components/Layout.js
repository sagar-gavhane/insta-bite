import React from 'react'

import Footer from 'components/Footer'
import Header from 'components/Header'

export default function Layout(props) {
  return (
    <div className="pb-16">
      <Header />
      <main className="p-4">{props.children}</main>
      <Footer />
    </div>
  )
}
