import { Router, type IRouter } from "express";

const router: IRouter = Router();

const WORKSPACE_PASSWORD = process.env["WORKSPACE_PASSWORD"];

if (!WORKSPACE_PASSWORD) {
  throw new Error(
    "WORKSPACE_PASSWORD environment variable is required but was not provided.",
  );
}

const SESSION_COOKIE = "rto_session";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

router.get("/auth/status", (req, res): void => {
  const authenticated = req.signedCookies?.[SESSION_COOKIE] === "1";
  res.json({ authenticated });
});

router.post("/auth/login", (req, res): void => {
  const { password } = req.body as { password?: unknown };

  if (typeof password !== "string" || password !== WORKSPACE_PASSWORD) {
    res.status(401).json({ error: "Incorrect password" });
    return;
  }

  res.cookie(SESSION_COOKIE, "1", {
    signed: true,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env["NODE_ENV"] === "production",
    maxAge: MAX_AGE_MS,
  });

  res.json({ authenticated: true });
});

router.post("/auth/logout", (req, res): void => {
  res.clearCookie(SESSION_COOKIE);
  res.json({ authenticated: false });
});

export default router;
