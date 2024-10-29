import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        orderBy: {
          date: "desc",
        },
      }
    );

    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((exp) => ({
      ...exp,
      amount: exp.amount.toString(),
    }));
    res.json(expenseByCategorySummary);
  } catch (e) {
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
