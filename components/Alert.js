import React from 'react'

export default function Alert({ message }) {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 my-2"
      role="alert"
    >
      <p className="font-bold">Error occurred</p>
      <p>{message}</p>
    </div>
  )
}
