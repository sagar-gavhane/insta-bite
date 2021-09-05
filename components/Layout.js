import React from 'react'

import Header from 'components/Header'

export default function Layout(props) {
  return (
    <div className="pb-16">
      <Header />
      <main className="p-4">{props.children}</main>
    </div>
  )
}
