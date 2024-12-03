import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaClient = new PrismaClient();

// add-item ()
export async function addItemToCart(
  req: Request,
  res: Response
): Promise<void> {
  const uid = req.user?.uid as string;
  if (!req.body.quantity || !req.body.productId) {
    res
      .status(400)
      .json({ message: "missing 'quantity' or 'productId' param in request" });
    return;
  }
  try {
    const product = await prismaClient.product.count({
      where: { id: req.body.productId },
    });
    if (!product) {
      res.status(404).json({ message: "could not find the product" });
      return;
    }
    const userCart = await prismaClient.cart.count({
      where: { userId: req.user?.uid },
    });
    console.log("USER CART", userCart);

    const itemToCreate = {
      productId: req.body.productId,
      quantity: req.body.quantity,
      timestamp: Date(),
    };
    if (userCart) {
      const updatedCart = await prismaClient.cart.update({
        where: { userId: uid },
        data: { items: { create: [itemToCreate] } },
      });
      if (updatedCart) {
        console.log("updated a cart ", updatedCart);
        res.status(200).json(userCart);
        return;
      }
    }
    const cart = await prismaClient.cart.create({
      data: {
        userId: uid,
        items: {
          create: [itemToCreate],
        },
      },
    });
    console.log("created a cart ", cart);
    res.status(200).json(cart);
    return;
  } catch (e) {
    console.log("ERROR UPDATING CART: ", e);
    res.status(500).json({ error: e });
    return;
  }
}
// delete-item (only needs the item)

export async function deleteItemFromCart(
  _: Request,
  res: Response
): Promise<void> {
  try {
    const categories = await prismaClient.category.findMany();
    res.status(200).json(categories);
  } catch (err) {
    console.log("GetCategories error: \n", err);
  }
}
