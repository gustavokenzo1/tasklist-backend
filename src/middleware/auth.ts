import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      if (err.message === "jwt expired") {
        return res.status(401).json({ error: "Login expirado" });
      } else {
        return res.status(401).json({ error: "Token Inválido" });
      }
    }

    req.user_id = decoded.id;

    return next();
  });
}
