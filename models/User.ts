import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  role: String,
  email: String,
  password: String,
  avatar: String
});

export default mongoose.model("User", UserSchema, "users");

