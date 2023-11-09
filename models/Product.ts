import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
  id: ObjectId,
  title: String,
  price: Number,
  description: String,
  categoryId: Number,
  images: [{ type: String }]
})

export default mongoose.model("Product", ProductSchema)
