import { ObjectId } from "mongoose"

export type Item = {
    productId: ObjectId,
    orderId: ObjectId,
    quantity: number
}
