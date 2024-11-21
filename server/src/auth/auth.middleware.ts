/// <reference path="../types/express/index.d.ts" />

import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.js";

export async function authMiddlewareFn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.token) {
      throw new Error("No token!");
    }
    const auth = AuthService.getAuthentication();
    const decodedToken = await auth.verifyIdToken(req.headers.token as string);
    req.user = { ...decodedToken };
    if (!decodedToken) throw new Error("No token!");
    else next();
  } catch (err) {
    // handle all possible errors here
    console.error("[authMiddleware] error: \n", err);
    res.status(401).json({ err });
  }
}

export function authMiddleware() {
  return authMiddlewareFn;
}
