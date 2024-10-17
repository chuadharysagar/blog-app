'use client'
import { assets, blog_data } from '@/assets/assets';
import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const page = ({ params }) => {
  const [data, setData] = useState(null);

  const fectchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: {
        id: params.id
      }
    });

    setData(response.data);

  }

  useEffect(() => {
    fectchBlogData();
  }, [])


  return (
    data ? <>
      <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
          <Link href={'/'}>
            <Image src={assets.logo} width={180} alt='logo' className='w-[130px] sm:w-auto' />
          </Link>
          <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get started
            <Image src={assets.arrow} alt='arrow' />
          </button>
        </div>
        <div className='text-center my-24'>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
          <Image className='mx-auto mt-6 border border-white rounded-full' src={data.authorImg} width={60} height={60} alt='auther image' />
          <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>

      </div>
      <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt='blog -news image' />
         <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}>
          
          </div>        
        <div className='my-24'>
          <p className='text-black font font-semibold my-4'>Share this artical on social media</p>
          <div className='flex'>
            <Image className='cursor-pointer' src={assets.facebook_icon} width={50} alt='facebook icon' />
            <Image className='cursor-pointer' src={assets.twitter_icon} width={50} alt='twitter icon' />
            <Image className='cursor-pointer' src={assets.googleplus_icon} width={50} alt='google icon' />
          </div>

        </div>
      </div>
      <Footer />
    </> : <></>
  )
}

export default page