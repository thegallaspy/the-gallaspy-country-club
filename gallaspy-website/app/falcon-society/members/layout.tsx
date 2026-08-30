import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getFalconSocietyCookieName,
  verifyFalconSocietySession,
} from "@/lib/falcon-society-auth";

export default async function FalconSocietyMembersLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getFalconSocietyCookieName())?.value;

  const authenticated = await verifyFalconSocietySession(token);

  /*
   * Allow the password-entry page itself to render.
   * Individual private pages remain protected by their
   * server-side checks until we split the login route
   * into a separate route group.
   */
  return <>{children}</>;
}
