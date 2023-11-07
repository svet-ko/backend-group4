import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  name: String,
  role: String,
  email: String,
  password: String,
  avatar: String
});

export default mongoose.model("users", UserSchema);
