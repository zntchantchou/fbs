import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
const prisma = new PrismaClient();

dotenv.config();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

const PRODUCTS_USER_ID = process.env.PRODUCT_SEED_USER_ID;

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");
  const orderedFileNames = ["category.json", "product.json"];
  const orderedDeleteModel = [
    "productPicture.json",
    "product.json",
    "category.json",
  ];

  await deleteAllData(orderedDeleteModel);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }
    if (modelName && modelName.toLowerCase() === "product") {
      console.log("FORMAT PRODUCT DATA");
      seedProductsData(jsonData, model);
      continue;
    }
    for (const data of jsonData) {
      await model.create({
        data,
      });
    }
    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

const seedProductsData = async (jsonData: any, model: any) => {
  const categories = await prisma.category.findMany({});
  console.log("categories ", categories);
  for (const data of jsonData) {
    const { pictures, category, ...rest } = data;
    const targetCategory = categories.find((c) => c.name === category);
    if (!targetCategory) continue;
    await model.create({
      data: {
        ...rest,
        pictures: { create: pictures },
        userId: PRODUCTS_USER_ID,
        pictureFolderId: "",
        categoryId: targetCategory?.id,
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
