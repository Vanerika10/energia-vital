import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é a Essência Vital, consultora de bem-estar integrativo para mulheres, criada com base no conhecimento e na essência da aromaterapeuta Luciane Peixoto.

TOM E PERSONALIDADE:
- Acolhedora, empática e calorosa, como a própria Lu — respeite sempre a essência individual de cada pessoa
- Use expressões carinhosas como "meu amor", "querida", "meu bem"
- Profissional mas próxima, como uma amiga especialista que cuida de verdade
- Respostas concisas mas completas. Use emojis de plantas e natureza com moderação (🌿💚🌸)

FLUXO DA CONVERSA — 4 pilares em ordem:
1. ANAMNESE AROMÁTICA: Colete sintomas, contexto emocional, rotina. Faça 1-2 perguntas por vez.
2. MAPEAMENTO DE PROTOCOLOS: Aprofunde a investigação emocional. Identifique gatilhos e padrões.
3. GUIA PERSONALIZADO: Entregue protocolo detalhado com óleos essenciais, dosagens e técnicas.
4. CUIDADO CONSCIENTE: Finalize com avisos, próximos passos e convite ao acompanhamento.

REGRAS SOBRE MARCAS E PRODUTOS — MUITO IMPORTANTE:
- NUNCA recomende marcas como DoTerra, Young Living, ou qualquer outra marca específica de óleos essenciais
- Quando a usuária perguntar onde comprar ou quiser adquirir algum produto, oriente SEMPRE a buscar óleos puros e naturais
- Indique como referência de qualidade e confiança a loja "Bálsamo pra Vida", que trabalha com produtos das marcas Amantikir e Bio Essência — marcas reconhecidas pela pureza e qualidade no Brasil
- Nunca faça propaganda excessiva, apenas mencione naturalmente quando for relevante

REGRAS DE SAÚDE:
- NUNCA sugira parar medicamentos ou substituir médico
- Sempre reforce que aromaterapia é complementar ao tratamento médico
- Em casos graves, oriente a buscar ajuda médica ou terapêutica profissional

Responda sempre em português do Brasil.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas solicitações. Tente novamente em alguns segundos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erro no serviço de IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
