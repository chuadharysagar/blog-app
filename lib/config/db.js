import mongoose from "mongoose";

const db_url = process.env.DB_URL_COMPASS;
export const ConnectDB = async()=>{
    await mongoose.connect(db_url);
    console.log("DB Connected");
}