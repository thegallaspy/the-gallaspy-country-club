import "server-only";

export type GallaspyShot = {
  distance: number;
  lie: string;
  wind: string;
  question: string;
};

type IntelligenceResponse = {
  success?: boolean;
  advice?: string;
  error?: string;
};

export async function getGallaspyIntelligenceAdvice(
  shot: GallaspyShot,
): Promise<string> {
  const baseUrl = process.env.GALLASPY_AI_URL;
  const apiKey = process.env.GALLASPY_AI_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Gallaspy Intelligence is not configured.");
  }

  const parsedUrl = new URL(baseUrl);

  if (
    parsedUrl.protocol !== "https:" &&
    !(
      process.env.NODE_ENV !== "production" &&
      parsedUrl.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(parsedUrl.hostname)
    )
  ) {
    throw new Error("Gallaspy Intelligence requires a secure URL.");
  }

  const endpoint = new URL("/app/caddie", parsedUrl);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Gallaspy-API-Key": apiKey,
    },
    body: JSON.stringify(shot),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(
      `Gallaspy Intelligence returned HTTP ${response.status}.`,
    );
  }

  const result: IntelligenceResponse = await response.json();

  if (
    result.success !== true ||
    typeof result.advice !== "string" ||
    !result.advice.trim()
  ) {
    throw new Error("Gallaspy Intelligence returned invalid advice.");
  }

  return result.advice.trim();
}
