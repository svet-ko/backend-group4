import { NextFunction, Request, Response } from "express"

import ProductsService from "../services/productsService.js"
import { ApiError } from "../errors/ApiError.js"
import { ObjectId } from "mongoose"

export async function findAllProduct(_: Request, res: Response) {
  const products = await ProductsService.findAll()

  res.json({ products })
}

export async function findOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId
  const product = await ProductsService.findOne(productId)

  if (!product) {
    next(ApiError.resourceNotFound("Product not found."))
    return
  }

  res.json({ product })
}

export async function createOneProduct(req: Request, res: Response) {
  const newProduct = req.body
  const product = await ProductsService.createOne(newProduct)

  res.status(201).json({ product })
}

export default {
  findOneProduct,
  findAllProduct,
  createOneProduct,
  //updateOneProduct,
  //deleteOneProduct
}
