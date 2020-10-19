import React from 'react'
import LoaderIcon from '../assets/icons/loader.svg'

export default function Spinner() {
  return (
    <div
      className="grid justify-center items-center"
      style={{ height: '25vh' }}
    >
      <LoaderIcon className="animate-spin" />
    </div>
  )
}
