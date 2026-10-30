const SQUARE_API_VERSION = "2026-07-15";

export function getSquareMembershipConfig() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const environment = process.env.SQUARE_ENVIRONMENT ?? "sandbox";

  if (!accessToken || !locationId) {
    throw new Error("Square membership configuration is incomplete");
  }

  if (environment !== "sandbox" && environment !== "production") {
    throw new Error("Invalid Square environment");
  }

  const baseUrl =
    environment === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";

  return {
    accessToken,
    locationId,
    environment,
    baseUrl,
    apiVersion: SQUARE_API_VERSION,
  };
}

export async function sendSquareMembershipRequest(
  resource: string,
  body: Record<string, unknown>
): Promise<unknown> {
  const config = getSquareMembershipConfig();

  if (config.environment !== "sandbox") {
    throw new Error("Membership enrollment is sandbox-only");
  }

  if (!/^[a-z0-9/-]+$/.test(resource) || resource.startsWith("/")) {
    throw new Error("Invalid Square API resource");
  }

  const response = await fetch(
    `${config.baseUrl}/v2/${resource}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Square-Version": config.apiVersion,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Square membership request failed: HTTP ${response.status}`
    );
  }

  return response.json();
}

export async function retrieveSquareMembershipRecord(
  resource: "payments" | "subscriptions" | "invoices" | "orders",
  recordId: string
): Promise<unknown> {
  if (
    !recordId ||
    !(resource === "invoices"
      ? /^[A-Za-z0-9_:-]+$/.test(recordId)
      : /^[A-Za-z0-9_-]+$/.test(recordId))
  ) {
    throw new Error("Invalid Square record ID");
  }

  const config = getSquareMembershipConfig();

  const response = await fetch(
    `${config.baseUrl}/v2/${resource}/${encodeURIComponent(recordId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Square-Version": config.apiVersion,
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Square verification request failed: HTTP ${response.status}`
    );
  }

  return response.json();
}

export async function retrieveSquareMembershipPlan(
  planVariationId: string
): Promise<unknown> {
  if (
    !planVariationId ||
    !/^[A-Za-z0-9_-]+$/.test(planVariationId)
  ) {
    throw new Error("Invalid Square plan variation ID");
  }

  const config = getSquareMembershipConfig();

  const response = await fetch(
    `${config.baseUrl}/v2/catalog/object/${encodeURIComponent(planVariationId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Square-Version": config.apiVersion,
        Accept: "application/json",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Square membership plan lookup failed: HTTP ${response.status}`
    );
  }

  return response.json();
}
