'use client'
import React, {useState} from 'react'
import UploadForm from '../Forms/UploadForm/UploadForm'

const Upload = () => {
  const [files, setFiles] = useState([])
  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col max-w-screen-xl mx-auto'>
      <UploadForm setFiles={setFiles} />
      </div>
    </section>
  )
}

export default Upload