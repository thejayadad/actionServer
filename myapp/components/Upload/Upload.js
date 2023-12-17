'use client'
import React, {useMemo, useState} from 'react'
import UploadForm from '../Forms/UploadForm/UploadForm'
import UploadCard from '../Cards/UploadCard/UploadCard'
import { uploadPhotos } from '@/actions/photosActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';


const Upload = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const count = useMemo(() => {
    return files.filter((file) => file?.status === 'success').length;
  }, [files]);


  const handleUpload = async () => {
    const filesUpload = files.filter((file) => file?.status === 'success');
    const formData = new FormData();
  
    filesUpload.forEach((file, index) => {
      if (file.filesUpload && file.filesUpload.type) {
        const blob = new Blob([file.filesUpload], { type: file.filesUpload.type });
        formData.append('files', blob, file.filesUpload.name || '');
  
        if (!file.title) {
          file.title = (file.filesUpload?.name || '').replace(/.(jpeg|jpg|png)$/gi, '');
        }
      }
    });
  
    setLoading(true);
  
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.errMsg) {
        toast.error(response.data.errMsg);
      }
    } catch (error) {
      console.error('Error during upload:', error);
      toast.error('Error during upload. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <section className='px-4 py-12'>
      <div className='flex flex-col max-w-screen-xl mx-auto items-center'>
        <UploadForm setFiles={setFiles} />
        <div className='masonry flex mt-8'>
          {files.map((file, index) => (
            <UploadCard key={index} file={file} setFiles={setFiles} index={index} />
          ))}
        </div>
        <button
          style={{ margin: '20px 0' }}
          disabled={count <= 0 || count > 5 || loading}
          onClick={handleUpload}
          className='bg-grey px-2 py-4 hover:bg-gray-600'
        >
          {loading ? 'Loading...' : count ? `Submit ${count} photos` : 'Submit to thejayadad'}
        </button>
      </div>
    </section>
  );
};

export default Upload;
