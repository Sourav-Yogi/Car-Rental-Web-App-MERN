import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected', ()=>console.log("Database is Connected"))
        await mongoose.connect(`${process.env.MONGOOSE_URI}/car-rental`)
    } catch (error) {
        console.log(error.message);
        process.exit(1);  
    }
}

export default connectDB;