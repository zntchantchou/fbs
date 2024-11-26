import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StorageService from "../services/storage.service.ts";
import ProductService, { NewProductData } from "services/product.service.ts";
import { randomUUID } from "crypto";

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
      include: { pictures: true },
    });
    res.status(200).json(products);
    return;
  } catch (error) {
    console.log("[GET PRODUCTS] error", error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "No id was provided" });
      return;
    }
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: { pictures: true, category: true },
    });

    const formattedProduct = { ...product };
    const formattedCategory = { ...product?.category };
    delete formattedProduct.categoryId;
    res
      .status(200)
      .json({ ...formattedProduct, category: formattedCategory.name });
    return;
  } catch (error) {
    console.log("[GET PRODUCT] error: \n", error);
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
      !req.body.brand ||
      !req.body.description ||
      !req.body.model ||
      !req?.files?.length
    ) {
      res.status(400).json({ error: "Bad Request" });
      return;
    }
    const files = req.files as Express.Multer.File[];
    const folderName = randomUUID();
    const saveFilePromises = files.map((file) =>
      StorageService.uploadFile(file, folderName)
    );
    const savedFiles = await Promise.all(saveFilePromises);
    const productData: NewProductData = {
      name: req.body.name,
      stockQuantity: Number.parseInt(req.body.stockQuantity),
      price: Number.parseFloat(req.body.price),
      categoryName: req.body.category,
      brand: req.body.brand,
      description: req.body.description,
      model: req.body.model,
      userId: req.user?.uid as string,
      pictures: savedFiles.map((picture, index) => ({
        filename: picture.Key?.replace(/[a-zA-Z0-9]\//, "") as string,
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
