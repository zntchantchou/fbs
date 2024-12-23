/// <reference path="../types/express/index.d.ts" />

import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service.ts";

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
    console.log("[authmiddleware] user: \n", decodedToken);
    if (!decodedToken) throw new Error("No token!");
    else next();
  } catch (err) {
    // handle all possible errors here
    console.error(
      "---------- [authMiddleware] Error (INVALID TOKEN): ----------- \n"
    );
    res.status(401).json({ error: "Your token has expired" });
  }
}

export function authMiddleware() {
  return authMiddlewareFn;
}
