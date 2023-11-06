import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  name: String,
  role: String,
  email: String,
  password: String,
  avatar: String
});

export default mongoose.model("User", UserSchema);
