import Image from 'next/image';
import { Input } from './ui/input'

type InputFileProps = {
    name: string;
    label?: string;
    currentImage?: string;
    errors?: string[];
    isRequired?: boolean
}

const InputFile = ({name, label, currentImage = '', errors = [], isRequired}: InputFileProps) => {
  return (
    <div>
        <label htmlFor={name}>
            {label}
            {isRequired && <span className='text-red-500 ml-1'>*</span>}
        </label>

        {currentImage && <Image src={currentImage} alt="Current Cover Image" width={70} height={150} className="block mt-2 mb-2"/>}
        <Input type="file" id={name} name={name} className='mt-1' />

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

export default InputFile