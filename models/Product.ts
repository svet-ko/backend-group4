import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
  id: ObjectId,
  title: String,
  price: Number,
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [{ type: String }]
})

export default mongoose.model("Product", ProductSchema)
