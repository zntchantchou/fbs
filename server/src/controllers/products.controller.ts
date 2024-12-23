import { Request, Response } from "express";
import { PrismaClient, ProductPicture } from "@prisma/client";
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
      include: { pictures: true, category: true },
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

    res.status(200).json(product);
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
      categoryId: req.body.category,
      brand: req.body.brand,
      description: req.body.description,
      model: req.body.model,
      userId: req.user?.uid as string,
      pictureFolderId: folderName,
      pictures: savedFiles.map((picture, index) => ({
        filename: picture.Key?.replace(folderName + "/", "") as string,
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

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("UPDATE PRODUCT");
  try {
    const productId = req.params.id;
    const files = req.files as Express.Multer.File[];
    const productToUpdate = await prisma.product.findUnique({
      where: { id: productId },
      include: { pictures: true },
    });
    let newProductPictures;
    let updatedProductPictures;
    let hasProductBeenUpdated = false;
    let picturesToDeleteIds: string[] = [];
    if (!productToUpdate) {
      console.log("NO PRODUCT TO UPDATE");
      res.send(400).json({ message: "could not find product to update" });
      return;
    }
    console.log("PICTURE DATA CHECK: ", req.body.picturesData);
    if (req.body.picturesData) {
      const picturesData = JSON.parse(req.body.picturesData) as {
        index: number;
        filename: string;
        id: string;
      }[];
      console.log("FILES ", files);

      const saveFilePromises = files.map((file) => {
        console.log("SAVE PROMISE START");
        return StorageService.uploadFile(
          file,
          productToUpdate?.pictureFolderId as string
        );
      });
      // CREATE PICTURES
      const uploadedFiles = await Promise.all(saveFilePromises);
      if (!picturesData.length) {
        console.log("NO PICTURE DATA");

        res.status(400).json({ message: "missing data for the pictures" });
        return;
      }
      console.log("uploadedFiles ", uploadedFiles);
      let productPicturesToCreate: ProductPicture[] = picturesData
        .filter((data) => !data.id)
        .map((data, i) => {
          return {
            index: data.index, // FIND THE INDEXES FOR EACH PICTURE TO SAVE
            productId,
            filename: data.filename,
            url: uploadedFiles[i].Location as string,
          } as ProductPicture;
        });
      // CREATE PICTURE OBJECTS IN DB
      newProductPictures = await prisma.productPicture.createMany({
        data: productPicturesToCreate,
      });

      // DELETE PICTURES
      let picturesToKeepIds = picturesData
        .filter((picData) => !!picData.id)
        .map((picData) => picData.id);
      picturesToDeleteIds = [...productToUpdate.pictures]
        .filter((existingPic) => !picturesToKeepIds.includes(existingPic.id))
        .map((pic) => pic.id);

      console.log("Pictures To delete ", picturesToDeleteIds);
      if (picturesToDeleteIds.length) {
        await prisma.productPicture.deleteMany({
          where: {
            id: { in: picturesToDeleteIds },
          },
        });
      }

      // UPDATE PICTURES
      const idsToIndexesMap: { [index: string]: number } = {};
      for (const pic of picturesData) {
        if (
          pic.id &&
          !picturesToDeleteIds.includes(pic.id) && // filter out deleted pictures
          !Number.isNaN(pic.index)
        ) {
          idsToIndexesMap[pic.id] = pic.index;
        }
      }
      const picturesToUpdate = [...productToUpdate.pictures].filter(
        (picture) =>
          picture.index !== idsToIndexesMap[picture.id] &&
          !picturesToDeleteIds.includes(picture.id) // filter out deleted pictures
      );
      if (picturesToUpdate.length) {
        console.log("picturesToUpdate ", picturesToUpdate);
        const updatedPromises = picturesToUpdate.map((pic) =>
          prisma.productPicture.update({
            where: { id: pic.id },
            data: { ...pic, index: idsToIndexesMap[pic.id] },
          })
        );
        updatedProductPictures = await Promise.all(updatedPromises);
      }
    }
    // UPDATE PRODUCT ITSELF
    const updatedProductData: { [index: string]: number | string } = {};
    const properties = [
      "name",
      "model",
      "brand",
      "price",
      "stockQuantity",
      "description",
      "category",
    ];
    for (const field of properties) {
      const value = req.body[field];
      console.log("FOR LOOP");
      if (!value) continue;
      if (field === "category") {
        updatedProductData["categoryId"] = value;
        continue;
      }
      if (["price", "stockQuantity"].includes(field)) {
        updatedProductData[field] = parseInt(value as string);
        continue;
      }
      updatedProductData[field] = value;
    }
    if (Object.values(updatedProductData).length) {
      await prisma.product.update({
        where: { id: productToUpdate.id },
        data: updatedProductData,
      });
      hasProductBeenUpdated = true;
    }
    res.status(200).json({
      product_updated: hasProductBeenUpdated,
      pictures_created: newProductPictures ? newProductPictures.count : 0,
      pictures_updated: updatedProductPictures
        ? updatedProductPictures.length
        : 0,
      pictures_deleted: picturesToDeleteIds.length,
    });
  } catch (error) {
    console.error("ERROR : \n", error);
    res.status(500).json({ msg: "error saving the product", error });
  }
};
