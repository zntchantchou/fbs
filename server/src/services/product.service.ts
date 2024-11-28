import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export interface NewProductData {
  name: string;
  price: number;
  stockQuantity: number;
  categoryId: string;
  brand: string;
  description: string;
  model: string;
  userId: string;
  pictureFolderId: string;
  pictures: { url: string; index: number; filename: string }[];
}
class ProductService {
  async saveProduct({ pictures, ...data }: NewProductData) {
    return prismaClient.product.create({
      data: { ...data, pictures: { create: [...pictures] } },
    });
  }
}

export default new ProductService();
