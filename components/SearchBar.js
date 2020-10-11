import React from 'react'

import SearchIcon from '../assets/icons/search.svg'

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        className="bg-gray-100 appearance-none border border-gray-500 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500"
        type="text"
      />
      <div className="absolute top-0 right-0 pt-3 pr-2 text-gray-500 cursor-pointer">
        <SearchIcon width="18" height="18" />
      </div>
    </div>
  )
}
