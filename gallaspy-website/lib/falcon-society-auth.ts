import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "falcon_society_session";

function getSecret() {
  const secret = process.env.FALCON_SOCIETY_SESSION_SECRET;

  if (!secret) {
    throw new Error("FALCON_SOCIETY_SESSION_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export async function createFalconSocietySession() {
  return new SignJWT({
    access: "falcon-society",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyFalconSocietySession(token?: string) {
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getSecret());

    return payload.access === "falcon-society";
  } catch {
    return false;
  }
}

export function getFalconSocietyCookieName() {
  return COOKIE_NAME;
}
