import mongoose from "mongoose";
import log from "../utils/log";

const options = {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const url = <string> process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/qrgen";

export async function connectDatabase() {
  await mongoose
    .connect(url, options)
    .then(() => {
      log.log("Database connection successfull");
      return mongoose;
    })
    .catch((err) => {
      throw err;
    });

  mongoose.connection.on("error", (err) => {
    log.error(err);
  });
}
