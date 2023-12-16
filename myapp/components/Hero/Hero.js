'use client'
import React from 'react'

const Hero = () => {
  return (
    <section className='px-4 py-12'>
        <div className='text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 mx-auto '>
            <h2 className='text-3xl font-extrabold text-gray-700  sm:text-4xl'>
                <span className='block'>SportsHub</span>
                <span class="block text-secondary">
                It&#x27;s today or never.
            </span>
            </h2>
            <p class="text-xl mt-4 max-w-lg mx-auto text-gray-400">
            I had noticed that both in the very poor and very rich extremes of society the mad were often allowed to mingle freely
        </p>
        <div class="lg:mt-0 lg:flex-shrink-0">
            <div class="mt-12 inline-flex rounded-md shadow">
                <button type="button" class="py-4 px-6  bg-transparent text-secondary hover:bg-primary focus:ring-primary focus:ring-offset-indigo-200  border border-secondary w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-2xl">
                    Get started
                </button>
            </div>
        </div>
        </div>
    </section>
  )
}

export default Hero