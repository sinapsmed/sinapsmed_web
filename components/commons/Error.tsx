import React from 'react'

const Error = ({error}: {error: string|null}) => {
  return (
    error ? <p className='text-red-500'>{error}</p>: null
  )
}

export default Error