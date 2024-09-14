import mongoose from "mongoose";
import "dotenv/config";


const connectDB = async () => {
    try {
      const mongoURI = `${process.env.ADMIN_MONGO_URI}${process.env.ADMIN_MONGODB_NAME}`;
      const conn = await mongoose.connect(
        `${process.env.ADMIN_MONGO_URI}${process.env.ADMIN_MONGODB_NAME}`
      );    
      console.log(`AdminDB-connected: ${conn.connection.host}`);
    } catch (error: any) {
      console.log(error.message);
      process.exit(1);
    }
  };
  
  export { connectDB };