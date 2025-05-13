import { Request, Response, NextFunction } from "express";

const allowedIps =
  process.env.ALLOWED_IPS?.split(",").map((ip) => ip.trim()) || [];

export default function ipWhitelist(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestIp = req.ip;
  console.log(`Request IP: ${requestIp}`);

  if (allowedIps.includes(requestIp || "")) {
    console.log(`IP ${requestIp} is allowed`);
    return next();
  }

  res.status(401).json({ error: "Unauthorized" });
}
