import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Mapeamento de ofertas para dias de acesso
const OFFER_DAYS: Record<string, number> = {
  "HR7J7S2": 30,   // mensal
  "Q96HUGG": 90,   // trimestral (à vista)
};

function extractEmail(payload: any): string | null {
  return (
    payload?.customer?.email ||
    payload?.buyer?.email ||
    payload?.client?.email ||
    payload?.email ||
    payload?.data?.customer?.email ||
    payload?.data?.buyer?.email ||
    payload?.data?.email ||
    payload?.purchaser?.email ||
    payload?.payer?.email ||
    null
  );
}

function extractName(payload: any): string | null {
  return (
    payload?.customer?.name ||
    payload?.buyer?.name ||
    payload?.client?.name ||
    payload?.name ||
    payload?.data?.customer?.name ||
    payload?.data?.buyer?.name ||
    null
  );
}

function extractOfferId(payload: any): string | null {
  return (
    payload?.offer?.id ||
    payload?.offer_id ||
    payload?.data?.offer?.id ||
    payload?.data?.offer_id ||
    null
  );
}

function isPaymentApproved(payload: any): boolean {
  const status = (
    payload?.status ||
    payload?.event ||
    payload?.data?.status ||
    payload?.data?.event ||
    payload?.payment?.status ||
    payload?.transaction?.status ||
    ""
  ).toLowerCase();

  const approvedKeywords = [
    "approved", "paid", "completed", "success",
    "aprovado", "pago", "concluido",
    "payment.approved", "purchase.approved",
  ];
  return approvedKeywords.some(k => status.includes(k));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const rawBody = await req.text();
    let payload: any = {};

    try {
      payload = JSON.parse(rawBody);
    } catch {
      const params = new URLSearchParams(rawBody);
      payload = Object.fromEntries(params.entries());
    }

    console.log("=== NEXANO WEBHOOK RECEBIDO ===");
    console.log("Headers:", JSON.stringify(Object.fromEntries(req.headers.entries())));
    console.log("Payload:", JSON.stringify(payload));

    if (!isPaymentApproved(payload)) {
      console.log("Evento ignorado - nao e pagamento aprovado. Status:", payload?.status || payload?.event);
      return new Response(JSON.stringify({ ok: true, message: "Evento ignorado" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const email = extractEmail(payload);
    if (!email) {
      console.error("Email nao encontrado no payload:", JSON.stringify(payload));
      return new Response(JSON.stringify({ error: "Email nao encontrado no payload" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const name = extractName(payload);
    const offerId = extractOfferId(payload);
    const days = (offerId && OFFER_DAYS[offerId]) ? OFFER_DAYS[offerId] : 90;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);

    console.log("Liberando acesso: email=" + email + ", dias=" + days + ", expira=" + expiresAt.toISOString());

    const { error } = await supabase
      .from("manual_access")
      .upsert({
        user_email: email.toLowerCase().trim(),
        granted_by: null,
        expires_at: expiresAt.toISOString(),
        user_name: name || email,
      }, { onConflict: "user_email" });

    if (error) {
      console.error("Erro ao salvar acesso:", error);
      throw error;
    }

    console.log("Acesso liberado com sucesso para " + email + " ate " + expiresAt.toISOString());

    return new Response(JSON.stringify({ ok: true, email, expires_at: expiresAt.toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Erro no webhook:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
