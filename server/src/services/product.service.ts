import { PrismaClient } from "@prisma/client";
import CategoryService from "./category.service.ts";

const prismaClient = new PrismaClient();

export interface NewProductData {
  name: string;
  price: number;
  stockQuantity: number;
  categoryName: string;
  brand: string;
  description: string;
  model: string;
  userId: string;
  pictureFolderId: string;
  pictures: { url: string; index: number; filename: string }[];
}

class ProductService {
  async saveProduct({
    name,
    price,
    stockQuantity,
    categoryName,
    pictures,
    brand,
    description,
    model,
    userId,
    pictureFolderId,
  }: NewProductData) {
    const category = await CategoryService.getCategoryByName(categoryName);
    if (!category)
      throw new Error(
        "[ProductService][saveProduct]: could not get category : " +
          categoryName
      );
    return prismaClient.product.create({
      data: {
        name: name,
        price: price,
        brand: brand,
        description: description,
        userId: userId,
        model: model,
        pictureFolderId: pictureFolderId,
        categoryId: category.id,
        stockQuantity: stockQuantity,
        pictures: { create: [...pictures] },
      },
    });
  }
}

export default new ProductService();
