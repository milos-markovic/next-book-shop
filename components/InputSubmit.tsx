import React from 'react'

type InputSubmitProps = {
    label: string;
}

const InputSubmit = ({label}: InputSubmitProps) => {
  return (
    <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded mt-4 flex mx-auto'>{label}</button>
  )
}

export default InputSubmit