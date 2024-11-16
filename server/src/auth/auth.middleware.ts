import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("[authMiddleware] req.headers: ", req.headers);
  console.log(" [authMiddleware] ----------- ");
  next();
}
