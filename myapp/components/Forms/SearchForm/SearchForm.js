'use client'
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const SearchForm = () => {
    const router = useRouter()
    const handleAction = (FormData) => {
        const value = FormData.get('search')
        const search = value.toLowerCase().trim().replace(/\s+/g, ' ');
        router.push(`/search/photos/${search}`)
    }
    return (
      <div className="relative">
    <form action={handleAction}>
    <input
          type="search"
          name='search'
          placeholder="Search"
          className="border w-96 border-secondary  rounded-full px-4 py-2 pl-10 focus:outline-none focus:border-grey transition-all duration-300"
        />
        <button 
        title='search'
        className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <FaSearch className="text-gray-400" />
        </button>
    </form>
      </div>
    );
  };
  
  export default SearchForm;
  