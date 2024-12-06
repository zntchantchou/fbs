import { Order, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

export async function getOrders(req: Request, res: Response): Promise<void> {
  try {
    const uid = req.user?.uid;
    const orders = await prismaClient.order.findMany({
      where: { userId: uid },
    });
    res.status(200).json(orders);
  } catch (err) {
    console.log("getOrders error: \n", err);
  }
}

type OrderItem = { quantity: number; productId: string };
export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const uid = req.user?.uid;
    const orderItems = req.body.items as OrderItem[];
    if (!isValidNewOrder(orderItems)) {
      res.status(400).send("MISSING ORDER OR ITEMS IN REQUEST");
      return;
    }
    const productIds = orderItems.map((item) => item.productId);
    const products = await prismaClient.product.findMany({
      where: { id: { in: productIds } },
    });
    let missingProducts: string[] = [];
    const getPrice = (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product) {
        missingProducts.push(productId);
        return 0;
      }
      return product.price;
    };

    const formattedItems = orderItems.map((item) => {
      return {
        ...item,
        price: getPrice(item.productId),
      };
    });
    if (missingProducts.length) {
      res.status(400).json({
        message: `could not find products with ids : ${[...missingProducts]}`,
      });
    }

    const totalAmount = formattedItems
      .map((item) => item.quantity * item.price)
      .reduce((a, b) => a + b, 0);

    await prismaClient.order.create({
      data: {
        userId: uid as string,
        items: { create: formattedItems },
        totalAmount,
      },
    });
    res.status(200).json({ order: orderItems });
  } catch (err) {
    console.log("createOrder error: \n", err);
  }
}

const isValidNewOrder = (items: any) => {
  if (
    !items ||
    !items.length ||
    items.some(
      (i: { productId: string; quantity: number }) =>
        !i.productId || !i.quantity
    )
  ) {
    return false;
  }
  return true;
};
