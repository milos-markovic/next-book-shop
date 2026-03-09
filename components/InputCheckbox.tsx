import React from 'react'

type InputCheckboxProps = {
    name: string,
    label?: string,
    defaultValue?: boolean | undefined,
    errors?: string[],
    isRequired?: boolean
}

const InputCheckbox = ({name, label, defaultValue, errors = [], isRequired}: InputCheckboxProps) => {
  return (
    <div>
        <label>
            {label}
            {isRequired && <span className="text-red-500 ml-1"></span>}
        </label>
        <input type="checkbox" name={name} defaultChecked={defaultValue} className="ml-2" />

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

export default InputCheckbox