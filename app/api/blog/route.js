const { NextResponse } = require("next/server");
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from 'fs/promises'


// connect to the databse 
const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

// testig api 
export async function GET(request) {
    console.log("blog get hit");
    return NextResponse.json({ msg: "API Working" });
}

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