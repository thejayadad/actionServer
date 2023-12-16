'use client'
import React, {useState} from 'react'
import UploadForm from '../Forms/UploadForm/UploadForm'
import UploadCard from '../Cards/UploadCard/UploadCard'

const Upload = () => {
  const [files, setFiles] = useState([])
  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col max-w-screen-xl  mx-auto items-center'>
      <UploadForm setFiles={setFiles} />
      <div className='masonry'>
      {
        files.map((file, index) => {
          return (
            <UploadCard
              key={index}
              file={file}
              setFiles={setFiles}
              index={index}
            />
          );
        })
        }
      </div>
      </div>
    </section>
  )
}

export default Upload