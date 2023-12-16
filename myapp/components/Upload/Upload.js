'use client'
import React, {useMemo, useState} from 'react'
import UploadForm from '../Forms/UploadForm/UploadForm'
import UploadCard from '../Cards/UploadCard/UploadCard'

const Upload = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false);
  const count = useMemo(() => {
    return files.filter(file => file?.status === 'success').length
  }, [files])

  const handleUpload = async () => {
    const filesUpload = files.filter(file => file?.status === 'succss')
    const formData = new FormData()
    filesUpload.forEach(file => {
      formData.append('files', file.filesUpload)

      if(!file.title){
        file.title = file.name.replace(/.(jpeg||jpg||png)$/gi,'')
      }
    })

    const newFiles = filesUpload.map(file => ({...file, filesUpload: '', imgUrl: ''}))
    console.log(newFiles)
  }
  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col max-w-screen-xl  mx-auto items-center'>
      <UploadForm setFiles={setFiles} />
      <div className='masonry flex mt-8'>
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
      <button
      style={{margin: '20px 0'}}
      disabled={count <= 0 || count > 5 || loading}
      onClick={handleUpload}
      className='bg-grey px-2 py-4 hover:bg-gray-600'>
        {
          loading
          ? "Loading..."
          : count
            ? `Submit ${count} photos`
            :   'Submit to thejayadad'
        }
      </button>
      </div>
    </section>
  )
}

export default Upload