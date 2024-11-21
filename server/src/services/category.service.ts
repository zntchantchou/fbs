import { Category, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

class CategoryService {
  public async getCategoryById(id: string): Promise<Category | null> {
    return prismaClient.category.findUnique({ where: { id } });
  }

  public async getCategoryByName(name: string): Promise<Category | null> {
    return prismaClient.category.findUnique({ where: { name } });
  }
}

export default new CategoryService();
