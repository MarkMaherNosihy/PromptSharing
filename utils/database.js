import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }else{
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "prompt_sharing"
            })
            isConnected = true;
            console.log("MongoDB is connected");
        } catch (error) {
            console.log(error);
        }
    }
}