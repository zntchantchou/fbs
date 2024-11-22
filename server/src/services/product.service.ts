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
  pictures: { url: string; index: number }[];
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
        model: model,
        categoryId: category.id,
        stockQuantity: stockQuantity,
        productPicture: { create: [...pictures] },
      },
    });
  }
}

export default new ProductService();
