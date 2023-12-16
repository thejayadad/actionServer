'use client'
import { validFiles } from '@/lib/validFiles';
import React, { useRef } from 'react';
import { FiCloud } from 'react-icons/fi';

const UploadForm = React.memo(({ setFiles }) => {
  const formRef = useRef();


const handleInputFiles = files => {
  if(!files.length) return

  [...files].map(file => {
    const result = validFiles(file)
    setFiles(prev => [...prev, result])
  })

  formRef.current.reset()
}
const handleDrop = (e) => {
  e.preventDefault()
  const data = e.dataTransfer;
  handleInputFiles(data.files)
}

  return (
    <form 
    onDrop={handleDrop} onDragOver={e => e.preventDefault()}
    >
      <input
        id='upload'
        multiple
        hidden
        type='file'
        onChange={e => handleInputFiles(e.target.files)}
      />
      <label
        className='flex flex-col justify-center items-center border-2 border-dotted border-gray-500 cursor-pointer rounded-md'
        style={{ height: '300px', width: '500px' }}
        htmlFor='upload'
      >
        <FiCloud className='text-5xl mb-2 text-grey' />
        <div className='text-lg font-bold text-gray-800'>
          Drag and Drop Your Images
        </div>
        <p className='text-sm text-gray-500'>
          or click here to browse (up to 5 images)
        </p>
      </label>
    </form>
  );
});

export default UploadForm;
