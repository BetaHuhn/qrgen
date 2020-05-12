import mongoose from "mongoose";

const server = "127.0.0.1:27017";
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
      console.log("Database connection successfull: " + database);
      return mongoose;
    })
    .catch((err) => {
      throw err;
    });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
}
