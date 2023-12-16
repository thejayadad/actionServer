'use client'
import React from 'react';
import { FiLock, FiX } from 'react-icons/fi';

const UploadCard = React.memo(({ file, setFiles, index }) => {

const validate = ({title, tags}) => {
  const errors = {}
  if(title.length > 100){
    errors.title = 'title is too long'
  }     else{
    errors.title = ""
  }


  if(tags.length > 20){
    errors.tags = 'tag is too long'
  }else{
    errors.tags = ""
  }
  return errors?.title || errors?.tags ? 'error' : 'success'
}


  const handleChangeTitle = (e) => {
    const {value} = e.target;
    const newFile = {
      ...file,
      title: value,
      status: validate({title: value, tags: file?.tags})
    }
    setFiles(files => files.map((item, i) => i === index ? newFile : item))
  }

  const handleInputTags = (e) => {
    if(e.key === 'Enter' || e.key === ','){
      let tag = e.target.value.trim().replace(/\s+/g, '').replace(',', '');

      if(tag.length > 1 && !file?.tags?.includes(tag)){
        const newFile = {
          ...file,
          tags: [...file.tags, tag],
          status: validate({title: file.title, tags: [...file.tags, tag]})
        }
        setFiles(files => files.map((item, i) => i === index ? newFile : item))
      }
      e.target.value = '';
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const newTags = file.tags.filter((tag) => tag !== tagToRemove);
    const newFile = {
      ...file,
      tags: newTags,
      status: validate({ title: file.title, tags: newTags }),
    };
    setFiles((files) => files.map((item, i) => (i === index ? newFile : item)));
  };

  const handleChangePublic = () => {
    setFiles(files => files.map((item, i) =>
    i === index ? {...file, public: !file.public} : item
    ))
  }

  const handleRemoveFile = () => {
    setFiles(files => files.filter((_, i) => i !== index))
  }
  
  return (
    <div className={`flex flex-col ${file?.status}`}>
         <div className="cursor-pointer text-red-500" onClick={handleRemoveFile}>
          <FiX className="text-2xl mt-2 hover:text-red-700" />
        </div>
    <img src={file?.imgUrl} alt={file?.title || ''} width={200} height={280} title={file?.title} />

    {file?.errMsg ? (
      <div className='text-center'>
        <h2 className='text-center'>Wrong File Type</h2>
        <span>{file?.errMsg}</span>
      </div>
    ) : (
      <div className=''>
        <div className='flex flex-col' title={`${file?.title?.length} / 100`}>
          <input
            type='text'
            autoComplete='off'
            placeholder='Add A Title'
            defaultValue={file?.title}
            onChange={handleChangeTitle}
            className='border border-gray-300 rounded p-2 mb-2 w-full focus:outline-none focus:border-primary transition-all duration-300'
          />
        </div>
        <div className='flex flex-wrap mb-2' title={`${file?.tags?.length} / 5`}>
          {file?.tags?.map((tag, tagIndex) => (
            <div key={tagIndex} className='flex items-center mr-2 mb-2'>
              <span className='p-2 rounded-xl bg-secondary text-white'>{tag}</span>
              <span onClick={() => handleRemoveTag(tag)}>
                <FiX className='ml-2 cursor-pointer text-gray-500 hover:text-red-500' />
              </span>
            </div>
          ))}
          <input
            type='text'
            autoComplete='off'
            onKeyUp={handleInputTags}
          />
        </div>
        <label className='flex items-center cursor-pointer mb-2'>
          <input
            onChange={handleChangePublic}
            type='checkbox' checked={file?.public} className='mr-2' />
          <span className='text-sm text-gray-800'>Make Public</span>
          <FiLock className={`ml-2 ${file?.public ? 'text-green-500' : 'text-gray-500'}`} />
        </label>
     
      </div>
    )}
  </div>
  );
});

export default UploadCard;
