import React from 'react'
import Link from 'next/link';

const Header = () => {
  return (
    <div className='w-ful bg-[#ffffff]'>
    <header className='flex items-center justify-between p-5 max-w-screen-2xl mx-auto'>
       <div className='flex items-center'>
            <Link href="/">
                <span className='text-black text-xl sm:text-2xl font-bold'>CODINGZ2M TRAVEL BLOG</span>
            </Link>
       </div>
       
       <div className='flex space-x-8'>
                <div className="hidden md:inline-flex items-center space-x-6">
                    <span className="cursor-pointer hover:text-lg translate-x-1 duration-700">Home</span>
                    <span className="cursor-pointer hover:text-lg translate-x-1 duration-700">Travel</span>
                    <span className="cursor-pointer hover:text-lg translate-x-1 duration-700">Contact</span>
                    <span className="cursor-pointer hover:text-lg translate-x-1 duration-700">Membership</span>
                    <span className="cursor-pointer hover:text-lg translate-x-1 duration-700">Write</span>
                    <span className="cursor-pointer hover:text-lg translate-x-1 duration-700">Sign In</span>
                </div>
               <button className='text-black font-medium border-2 border-[#FF2929] px-6 py-2 
                              rounded-full hover:bg-black hover:text-white hover:border-white'>
                   Login
               </button>
       </div>

    </header>
    </div>
  )
}

export default Header