import React from 'react'
import Logo from '../logo'
import AuthLinks from './AuthLinks'

const Navbar = () => {
  return (
    <section className='px-4 py-8'>
        <nav className='flex justify-between mx-auto max-w-screen-xl'>
            <Logo />
            <AuthLinks />
        </nav>
    </section>
  )
}

export default Navbar