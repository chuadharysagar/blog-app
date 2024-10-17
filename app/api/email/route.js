import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";


const LoadDB = async () => {
    ConnectDB();
}

LoadDB();

export async function POST(request) {
    const formData = await request.formData();

    const emailData = {
        email: `${formData.get('email')}`,
    }

    await EmailModel.create(emailData);

    return NextResponse.json({ success: true, msg: "Email Subscribed" });

}

//get all the email data from the mongodb

export async function GET(request) {
    const emails = await EmailModel.find({});


    return NextResponse.json({ emails });

}


// Delete the email id 
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');

    await EmailModel.findByIdAndDelete(id);

    return NextResponse.json({success:true,msg:"Email deleted"})
    
}