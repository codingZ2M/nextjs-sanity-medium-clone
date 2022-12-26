import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <div className='w-ful bg-[#FFC017] border-b border-black'>
    <header className='flex items-center justify-between p-5 max-w-screen-2xl mx-auto'>
       <div className='flex items-center'>
            <Link href="/">
                <img src="/mlo.png" className='w-52 object-contain cursor-pointer' alt="logo"/>
            </Link>
       </div>
       
       <div className='flex space-x-8'>
                <div className="hidden md:inline-flex items-center space-x-6">
                    <span>Our Story</span>
                    <span>Membership</span>
                    <span>Write</span>
                    <span>Sign In</span>
                </div>
               <button className='text-white font-medium bg-black px-6 py-2.5 rounded-full'>
                   Get Started
               </button>
       </div>

    </header>
    </div>
  )
}

export default Header