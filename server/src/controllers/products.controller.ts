import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StorageService from "../services/s3.ts";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import ProductService, { NewProductData } from "services/product.service.ts";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.status(200).json(products);
    return;
  } catch (error) {
    console.log("[GET PRODUCTS] error", error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (
      !req.body.name ||
      isNaN(req.body.price) ||
      !req.body.stockQuantity ||
      !req.body.category ||
      !req?.files?.length
    ) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    const files = req.files as Express.Multer.File[];
    const saveFilePromises = files.map((file) =>
      StorageService.uploadFile(file)
    );
    const savedFiles = await Promise.all(saveFilePromises);
    const productData: NewProductData = {
      name: req.body.name,
      stockQuantity: Number.parseInt(req.body.stockQuantity),
      price: Number.parseFloat(req.body.price),
      categoryName: req.body.category,
      pictures: savedFiles.map((picture, index) => ({
        url: picture.Location as string,
        index,
      })),
    };
    const savedProduct = await ProductService.saveProduct(productData);
    res.status(201).json({ ...savedProduct, totalPictures: savedFiles.length });
  } catch (error) {
    console.log("ERROR : \n", error);
  }
};
