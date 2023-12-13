import { text } from "express"
import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [{ type: String }]
})
ProductSchema.index({title: "text", category: "text"})
export default mongoose.model("Product", ProductSchema)
