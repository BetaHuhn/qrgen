import mongoose from "mongoose";
import log from "../utils/log";

const server = process.env.DB_ADDRESS || "localhost:27017";
const database = process.env.DB;
const options = {
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const url = `mongodb://${server}/${database}?authSource=admin`;

export async function connectDatabase() {
  await mongoose
    .connect(url, options)
    .then(() => {
      log.log("Database connection successfull: " + database);
      return mongoose;
    })
    .catch((err) => {
      throw err;
    });

  mongoose.connection.on("error", (err) => {
    log.error(err);
  });
}
