import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
       <Image src={assets.logo_light} alt='footer logo' width={120} />
       <p className='text-sm text-white'>All right reserved. Copyright @blogger</p>
       <div className='flex'>
        <Image src={assets.facebook_icon} alt='facebook icon ' width={40} className='cursor-pointer'/>
        <Image src={assets.twitter_icon} alt='twitter ' width={40} className='cursor-pointer'/>
        <Image src={assets.googleplus_icon} alt='google' width={40} className='cursor-pointer'/>
       </div>
    </div>
  )
}

export default Footer