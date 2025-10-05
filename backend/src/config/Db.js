import mongoose from "mongoose";

const connectdb=()=>{
    mongoose.connect("mongodb://localhost:27017/User")
    console.log("db connected");
    
}



export default connectdb