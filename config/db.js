import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance =  await mongoose.connect(process.env.MONGO_URI)
        console.log(`\nConnected to DB !! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("error :- ", error);
        process.exit(1);
    }
};

export default connectDB;