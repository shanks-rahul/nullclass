import mongoose from "mongoose";
const connectTodB=async()=>{
    try {
        const {connection}=await mongoose.connect(
            `mongodb://127.0.0.1:27017/INTERN`
        )
        if(connection){
            console.log(`Database connected to ${connection.host}`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectTodB;