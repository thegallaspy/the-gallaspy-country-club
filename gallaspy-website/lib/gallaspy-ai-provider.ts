import "server-only";

import {
  getGallaspyIntelligenceAdvice,
  type GallaspyShot,
} from "./gallaspy-intelligence";

export type GallaspyAIProvider = "openai" | "gallaspy";

export function getGallaspyAIProvider(): GallaspyAIProvider {
  const configured = process.env.GALLASPY_AI_PROVIDER;

  if (configured === "gallaspy") {
    return "gallaspy";
  }

  return "openai";
}

export async function getGallaspyProviderAdvice(
  shot: GallaspyShot,
): Promise<string> {
  const provider = getGallaspyAIProvider();

  if (provider === "gallaspy") {
    return getGallaspyIntelligenceAdvice(shot);
  }

  throw new Error(
    "OpenAI remains handled by the existing AI Caddie API route.",
  );
}
