import mongoose from "mongoose";

const DataBaseConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("Invalid mongo uri");
    }
    await mongoose.connect(mongoUri);
    console.log("database connection established");
  } catch (err) {
    console.log("oops something when wrong , ", err);
    //process.exit(1);
  }
};

export default DataBaseConnection;
