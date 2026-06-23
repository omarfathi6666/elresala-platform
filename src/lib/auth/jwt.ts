import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export interface JwtPayload {
  id: string;
  role: "ADMIN" | "STUDENT";
  email?: string;
  phone?: string;
}

export async function createToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET_KEY);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, JWT_SECRET_KEY);

  return payload as unknown as JwtPayload;
}
