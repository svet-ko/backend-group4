import mongoose, { ObjectId } from "mongoose"
import ItemsRepo from "../models/Item.js"
import ProductsService from "./productsService.js";

async function getAllItemsByOrderId(id: ObjectId) {
    return await ItemsRepo.findById(id);
}

async function getTotalAmountByOrderId(orderId: string){
    const id = new mongoose.Schema.Types.ObjectId(orderId);
    const items = await getAllItemsByOrderId(id);
    let amount = 0;
    const amounts = await Promise.all(
        Array(items).map(item => {
            const id = item && item.productId && item.productId.toString();
            const product = id && Object(ProductsService.findOne(id));
            
            if (product && product.price && item.quantity) {
                return amount += product.price * item.quantity;
            }
        })
    )
    return amounts.filter(entry => entry !== undefined && entry !== null).reduce((acc: number, curr: number) => acc + curr, 0);
}

export default {
    getTotalAmountByOrderId
}