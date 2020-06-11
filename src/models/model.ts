import mongoose, { Document, Schema } from "mongoose";

export interface IShort extends Document {
  _id: string;
  code: string;
  url: string;
  count: number;
  addedAt: number;
}

const shortSchema: Schema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  code: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
  },
  addedAt: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IShort>("Short", shortSchema);
