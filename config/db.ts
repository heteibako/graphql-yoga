import { connect, connection } from "mongoose";

const connectDB = async () => {
  try {
    if (connection.readyState >= 1) {
      return;
    }
    connect(`${process.env.MONGODB_URI}`);
    console.log(`Mongodb connected to ${process.env.MONGODB_URI}`);
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
};

export default connectDB;
