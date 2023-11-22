import mongoose from "mongoose"

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['CUSTOMER', 'ADMIN'],
    required: true,
    default: "CUSTOMER"
  },
  avatar: {
    type: String,
    required: true,
    default: "https://api.lorem.space/image/face?w=640&h=480&r=867"
  }
});

export default mongoose.model("User", UserSchema, "users");

