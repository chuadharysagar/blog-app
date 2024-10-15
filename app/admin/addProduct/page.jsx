'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
    // for imaghe preview in image label
    const [image, setImage] = useState(false);
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"Alex Bennett",
        authoImg:"/author_img.png",

    });
  
     const onChangeHandler =(event)=>{
           const name = event.target.name;
           const value = event.target.value;

           setData(data=>({...data,[name]:value}));
           console.log(data);
     }

     const onSubmitHandler = async(event)=>{
        event.preventDefault();

        const formData = new formData();
        formData.append('title',data.title);
        formData.append('description',data.description),
        formData.append('category',data.category);
        formData.append('author',data.author);
        formData.append('authorImg',data.authoImg);
        formData.append('image',image);

        const response = await axios.post('/api/blog',formData);

        if(response.data.success){
            toast.success(response.data.msg);
        }else{
            toast.error("Error");
        }
 
     }

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload Thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-4' src={!image?assets.upload_area:URL.createObjectURL(image)} alt='upload area' width={140} height={70} />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />

                <p className='text-xl mt-4'>Blog title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required/>
                
                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Write conntent here' rows={6} required/>
                 
                 <p className='text-xl mt-4'>Blog Category</p>
                 <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
                     <option value="Startup">Startup</option>
                     <option value="Technnolgy">Technnolgy</option>
                     <option value="Lifestyle">Lifestyle</option>
                 </select>
                 <br />
                 <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
            </form>
        </>
    )
}

export default page