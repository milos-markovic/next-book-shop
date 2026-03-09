import { Textarea } from './ui/textarea'

type InputTextareaProps = {
    id?: string;
    label?: string;
    name: string;  
    rows?: number;
    cols?: number;
    placeholder?: string;
    defaultValue?: string;
    errors?: string[];
    isRequired?: boolean
}

const InputTextarea = ({ label, name, rows = 5, cols = 20, placeholder="", id="", defaultValue="", errors=[], isRequired }: InputTextareaProps) => {
  return (
    <div>
        <label htmlFor={id}>
            {label}
            {isRequired && <span className="ml-1 text-red-500">*</span>}
        </label>
        <Textarea name={name} rows={rows} cols={cols} id={id} placeholder={placeholder} defaultValue={defaultValue} className='mt-1'/>

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

export default InputTextarea