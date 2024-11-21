import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import StorageService from "../services/s3.ts";
import { GetObjectCommand } from "@aws-sdk/client-s3";

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
    const awsBucketGet = await StorageService.bucket?.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_ARN,
        Key: "raspberry.jpeg",
      })
    );
    console.log("awsBucketGet: \n ----", awsBucketGet);
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
    console.log("REQ>FILES: \n", req.files);
    console.log("REQ>BODY: \n", req.body);
    console.log("REQ>HEADERS: \n", req.headers);
    StorageService;
    // const category = await prisma.category.findUnique({
    //   where: { name: categoryLabel },
    // });
    // if (!category) {
    //   res.status(404).send("Could not find category");
    //   return;
    // }

    // const product = await prisma.product.create({
    //   data: {
    //     name,
    //     price,
    //     categoryId: category.id,
    //     stockQuantity,
    //   },
    // });
    // const pictures = productPictures as ProductPictureType[];
    // const createPicturesPromises = [];

    // for (let picture of pictures) {
    //   if (picture.url && !Number.isNaN(picture.index)) {
    //     createPicturesPromises.push(
    //       await prisma.productPicture.create({
    //         data: {
    //           index: picture.index,
    //           url: picture.url,
    //           productId: product.id,
    //         },
    //       })
    //     );
    //   }
    // }
    // const savedPictures = await Promise.all(createPicturesPromises);
    // const { id, ...rest } = product;
    // res.status(201).json({ ...rest, totalPictures: savedPictures.length });

    res.status(200).json({ ok: "ok" });
  } catch (error) {
    console.log("ERROR : \n", error);
  }
};
