import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function getSignedMembershipRecords(recordId?: string) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user?.email_confirmed_at) {
    return null;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Membership records unavailable");
  }

  const admin = createAdminClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  let query = admin
    .from("gallaspy_membership_signed_records")
    .select("id,membership_plan,signed_full_name,accepted_at,documents")
    .eq("user_id", user.id)
    .order("accepted_at", { ascending: false });

  if (recordId) {
    query = query.eq("id", recordId);
  }

  const result = await query;

  if (result.error) {
    throw new Error("Unable to retrieve membership records");
  }

  return result.data ?? [];
}
