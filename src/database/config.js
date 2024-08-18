// import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
// dotenv.config()

const connectDB = async () => {
    try {
        // console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;