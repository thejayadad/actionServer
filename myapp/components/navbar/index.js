import React from 'react'
import Logo from '../logo'
import AuthLinks from './AuthLinks'
import getServerUser from '@/lib/getServerUser'
import SearchForm from '../Forms/SearchForm/SearchForm'

const Navbar = async () => {
  const user = await getServerUser()
  console.log(user)
  return (
    <section className='px-4 py-8'>
        <nav className='flex justify-between mx-auto max-w-screen-xl'>
            <Logo />
            <SearchForm />
            <AuthLinks user={user} />
        </nav>
    </section>
  )
}

export default Navbar