import type { Request, Response, NextFunction } from "express";

export function requireSession(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.signedCookies?.["rto_session"] === "1") {
    next();
    return;
  }
  res.status(401).json({ error: "Unauthorized" });
}
