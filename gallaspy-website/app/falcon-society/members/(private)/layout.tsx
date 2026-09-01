import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getFalconSocietyCookieName,
  verifyFalconSocietySession,
} from "@/lib/falcon-society-auth";

export default async function FalconSocietyPrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getFalconSocietyCookieName())?.value;

  const authenticated = await verifyFalconSocietySession(token);

  if (!authenticated) {
    redirect("/falcon-society/members");
  }

  return <>{children}</>;
}
