import React from 'react'
import { Input } from './ui/input'

type InputFieldProps = {
    type?: string;
    name: string;
    placeholder?: string;
    label?: string;
    defaultValue?: string | number;
    errors?: string[];
    isRequired?: boolean
}

const InputField = ({ type = 'text', name, placeholder = '', label='', defaultValue, errors = [], isRequired}: InputFieldProps) => {
  return (
    <div>
        <label htmlFor={name}>{label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Input type={type} id={name} name={name} className='mt-1' placeholder={placeholder} defaultValue={defaultValue} />

        {errors && (
            <div className='text-red-500 mt-1 block'>
                {errors.map((error, index) => (      
                    <div key={index}>{error}</div>
                ))}
            </div>
        )} 
    </div>
  )
}

export default InputField