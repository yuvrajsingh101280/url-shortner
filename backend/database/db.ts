import mongoose from "mongoose";

const connectTODB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(
      "Databse connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("Error in connecting to databse", error);
    process.exit(1);
  }
};
export default connectTODB;
