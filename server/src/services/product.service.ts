import { PrismaClient } from "@prisma/client";
import CategoryService from "./category.service.ts";

const prismaClient = new PrismaClient();

export interface NewProductData {
  name: string;
  price: number;
  stockQuantity: number;
  categoryName: string;
  pictures: { url: string; index: number }[];
}

class ProductService {
  async saveProduct({
    name,
    price,
    stockQuantity,
    categoryName,
    pictures,
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
        categoryId: category.id,
        stockQuantity: stockQuantity,
        productPicture: { create: [...pictures] },
      },
    });
  }
}

export default new ProductService();
