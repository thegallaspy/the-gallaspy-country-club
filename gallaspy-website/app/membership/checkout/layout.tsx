import Script from "next/script";
import type { ReactNode } from "react";

export default function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  const src =
    process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production"
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";

  return (
    <>
      <Script src={src} strategy="afterInteractive" />
      {children}
    </>
  );
}
