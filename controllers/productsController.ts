import { NextFunction, Request, Response } from "express"

import ProductsService from "../services/productsService"
import { ApiError } from "../errors/ApiError"

async function findAllProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const title = req.query.title as string;
  const categoryId = req.query.categoryId as string;
  const price = Number(req.query.price);
  
  const products = await ProductsService.findAll({title, categoryId, price});

  if (!products) {
    next(ApiError.resourceNotFound("Products not found"))
    return
  }

  res.json(products);
}

async function findOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId
  const product = await ProductsService.findOne(productId)

  if (!product) {
    next(ApiError.resourceNotFound("Product is not found."))
    return
  }

  res.json(product);
}

async function createOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newProduct = req.body
  const product = await ProductsService.createOne(newProduct)

  if (!product) {
    next(ApiError.resourceNotFound("Category id is not found"));
    return;
  }

  res.status(201).json(product)
}

async function deleteOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId;
  const product = await ProductsService.deleteOne(productId);

  if (!product) {
    next(ApiError.resourceNotFound("Product is not found"));
    return;
  }

  res.json(product);
}

async function updateOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId;
  const updatesForProduct = req.body;
  const productToUpdate = await ProductsService.findOne(productId);

  if (!productToUpdate) {
    next(ApiError.resourceNotFound("Product is not found"));
    return;
  }

  const updatedProduct = await ProductsService.updateOne(
    productId,
    updatesForProduct
  );

  if (!updatedProduct) {
    next(ApiError.internal("Could not update product"));
    return;
  }

  res.json({ updatedProduct });
}

export default {
  findOneProduct,
  findAllProduct,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct
}
