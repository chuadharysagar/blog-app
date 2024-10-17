const { NextResponse } = require("next/server");
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises'
const fs = require('fs');


// connect to the databse 
const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// api end point for getting all blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id"); //retrive id
    
    if(blogId){
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    }else{
       const blogs = await BlogModel.find({});
       return NextResponse.json({blogs});
    }
}


//API end point for uploadinnng blogs
export async function POST(request) {
    const formData = await request.formData();
    const timeStamp = Date.now();

    const image = formData.get('image'); // get image from from data
    const imageByteData = await image.arrayBuffer(); // convert to the byte data
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timeStamp}_${image.name}`; // path for the file

    await writeFile(path, buffer); // store it in public folder
    const imgUrl = `/${timeStamp}_${image.name}`;

    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`,
    }
     //store into database
     await BlogModel.create(blogData);
     console.log("Blog Saved")
 
    return NextResponse.json({success:true,msg:"Blog Added"});
}


// creating api enndpoint to delete blog
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({msg:"Blog Deleted"});
}