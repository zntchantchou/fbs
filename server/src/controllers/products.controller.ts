import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const search = req.query.search?.toString();
    // const products = await prisma.product.findMany({
    //   where: {
    //     name: {
    //       contains: search,
    //     },
    //   },
    // });
    // console.log("BEFORE ERROR");
    res.send("nada");
    return;
  } catch (error) {
    // res.status(500).json({ message: "error retrieving products" });
    console.log("error");
    res.json({ error });
  }
};

type ProductPictureType = {
  url: string;
  index: number;
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, price, stockQuantity, categoryLabel, productPictures } =
      req.body;

    const category = await prisma.category.findUnique({
      where: { name: categoryLabel },
    });
    if (!category) {
      res.status(404).send("Could not find category");
      return;
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId: category.id,
        stockQuantity,
      },
    });
    const pictures = productPictures as ProductPictureType[];
    const createPicturesPromises = [];

    for (let picture of pictures) {
      if (picture.url && !Number.isNaN(picture.index)) {
        createPicturesPromises.push(
          await prisma.productPicture.create({
            data: {
              index: picture.index,
              url: picture.url,
              productId: product.id,
            },
          })
        );
      }
    }
    const savedPictures = await Promise.all(createPicturesPromises);
    const { id, ...rest } = product;
    res.status(201).json({ ...rest, totalPictures: savedPictures.length });
  } catch {}
};
