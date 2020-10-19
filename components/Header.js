import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header>
      <div className="py-2 mt-2 text-center text-5xl font-extrabold leading-none tracking-tight">
        <Link href="/">
          <a>
            <img
              src="/images/logo.png"
              className="inline-block w-20"
              alt="logo"
              loading="lazy"
            />
          </a>
        </Link>
      </div>
    </header>
  )
}
