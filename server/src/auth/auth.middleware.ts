/// <reference path="../types/express/index.d.ts" />

import { NextFunction, Request, Response } from "express";
import AuthService from "./auth";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.token) {
    res.status(401).send();
    return next();
  }
  try {
    const auth = AuthService.getAuthentication();
    const decodedToken = await auth.verifyIdToken(req.headers.token as string);
    req.user = { ...decodedToken };
    console.log("------- USER: ------- \n\n", decodedToken);
    if (!decodedToken) res.status(401).send();
    return next();
  } catch (err) {
    res.statusCode = 500;
    res.send();
  }
}
