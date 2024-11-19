import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

export async function getCategories(_: Request, res: Response): Promise<void> {
  try {
    const categories = await prismaClient.category.findMany();
    res.status(200).json(categories);
  } catch (err) {
    console.log("GetCategories error: \n", err);
  }
}
