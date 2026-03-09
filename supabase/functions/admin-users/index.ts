import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Auth error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("Not authenticated");

    // Check admin role
    const { data: roleData } = await supabaseClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) throw new Error("Unauthorized: admin role required");

    const { action, ...params } = await req.json();

    if (action === "list_users") {
      // List all manual access entries
      const { data: manualAccess, error } = await supabaseClient
        .from("manual_access")
        .select("*")
        .order("granted_at", { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify({ users: manualAccess }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "grant_access") {
      const { email, name } = params;
      if (!email) throw new Error("Email is required");

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 90);

      const { data, error } = await supabaseClient
        .from("manual_access")
        .upsert(
          {
            user_email: email,
            user_name: name || null,
            granted_by: user.id,
            granted_at: new Date().toISOString(),
            expires_at: expiresAt.toISOString(),
          },
          { onConflict: "user_email" }
        )
        .select()
        .single();

      if (error) throw error;

      return new Response(JSON.stringify({ success: true, access: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "revoke_access") {
      const { email } = params;
      if (!email) throw new Error("Email is required");

      const { error } = await supabaseClient
        .from("manual_access")
        .delete()
        .eq("user_email", email);

      if (error) throw error;

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("Invalid action");
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: msg.includes("Unauthorized") ? 403 : 500,
    });
  }
});
