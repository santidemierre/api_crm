import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className='text-center text-white my-4 p-2 bg-red-500 uppercase rounded-md'>
        {children}
    </div>
  )
}

export default Alerta