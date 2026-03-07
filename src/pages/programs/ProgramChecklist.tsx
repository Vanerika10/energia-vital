import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "matinal",
    title: "Habitos Matinais",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
    items: [
      {
        id: "m1",
        text: "Evito o celular nos primeiros 10 minutos do dia",
        why: "Checar o celular ao acordar ativa cortisol e te coloca em modo reativo. Dar 10 minutos para si mesma antes de qualquer tela reconecta voce consigo antes das demandas do mundo.",
        action: "Deixe o celular do outro lado do quarto. Use um despertador tradicional.",
      },
      {
        id: "m2",
        text: "Bebo agua antes do cafe",
        why: "Apos 7-8h de sono, seu corpo esta desidratado. Cafe em jejum sem hidratacao previa aumenta cortisol e pode causar picos de ansiedade.",
        action: "Mantenha um copo de agua filtrada na cabeceira. Beba 300-500ml ao acordar. Espere 20-30 minutos antes do cafe.",
      },
      {
        id: "m3",
        text: "Faco respiracao consciente ao acordar",
        why: "A respiracao consciente ativa o sistema nervoso parassimpatico, reduz cortisol e cria espaco interno de calma antes que a correria comece.",
        action: "Uma mao no peito, outra na barriga. Inspire 4, segure 4, expire 6. Repita 5 vezes — menos de 2 minutos.",
      },
    ],
  },
  {
    id: "corpo",
    title: "Escuta Corporal",
    color: "bg-rose-50 border-rose-200",
    badgeColor: "bg-rose-100 text-rose-700",
    items: [
      {
        id: "c1",
        text: "Presto atencao aos sinais de dor e desconforto",
        why: "Dor e comunicacao. Ignorar acumula e amplifica. Escutar com inteligencia e o primeiro passo para a cura.",
        action: "Reserve 5 minutos para um body scan: escaneie mentalmente cada parte do corpo, da cabeca aos pes, observando tensao ou dor.",
      },
      {
        id: "c2",
        text: "Investigo causas antes de apenas medicar sintomas",
        why: "Analgésicos silenciam a mensagem mas nao resolvem a raiz. O corpo vai continuar gritando ate ser ouvido de verdade.",
        action: "Quando aparecer dor, pergunte: onde dói? Quando comecu? O que melhora? O que piora? Registre padroes.",
      },
      {
        id: "c3",
        text: "Tenho ferramentas de regulacao emocional a mao",
        why: "Oleos essenciais trabalham diretamente no sistema limbico. Uma unica inalacao pode mudar seu estado em segundos.",
        action: "Coloque lavanda ou hortela na bolsa. 2-3 gotas no lenco, inale profundamente em momentos de estresse.",
      },
    ],
  },
  {
    id: "alimentacao",
    title: "Alimentacao Consciente",
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700",
    items: [
      {
        id: "a1",
        text: "Como comida de verdade na maior parte do tempo",
        why: "Comida ultra processada inflama, desregula hormonios e drena energia. Comida de verdade nutre celulas e equilibra o corpo.",
        action: "Teste dos 5 ingredientes: se tem mais de 5 ingredientes ou nomes impronunciaveis, substitua por versao mais simples.",
      },
      {
        id: "a2",
        text: "Incluo proteina, gordura boa e vegetais nas refeicoes",
        why: "Essa combinacao mantem saciedade, estabiliza glicemia e fornece energia duradoura sem picos de insulina.",
        action: "Monte o prato: metade vegetais coloridos, um quarto proteina (ovo, frango, peixe), um quarto carboidrato complexo + gordura boa.",
      },
      {
        id: "a3",
        text: "Bebo pelo menos 2 litros de agua por dia",
        why: "Desidratacao cronica causa fadiga, dor de cabeca, irritabilidade e queda de concentracao — mesmo sem sentir sede.",
        action: "Divida em 3 blocos: 500-700ml ate 12h, 700ml-1L ate 18h, 300-500ml apos 18h. Use garrafa de 500ml para controle visual.",
      },
    ],
  },
  {
    id: "movimento",
    title: "Movimento Diario",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
    items: [
      {
        id: "mv1",
        text: "Movo meu corpo de alguma forma todos os dias",
        why: "Movimento regular reduz 30% o risco de doencas cardiacas, melhora 40% os sintomas de ansiedade e melhora 50% a qualidade do sono em 4 semanas.",
        action: "Comece com 3 dias na semana, 20-30 min. Bloqueie na agenda como reuniao inegociavel.",
      },
      {
        id: "mv2",
        text: "Faco pausas ativas durante o dia de trabalho",
        why: "Sedentarismo nao e ausencia de exercicio — e ausencia de movimento. Ficar 8h sentada e biologicamente prejudicial.",
        action: "Configure alarme a cada 60 minutos. Levante, alonte, caminhe 2 minutos. Pequeno, mas eficaz.",
      },
      {
        id: "mv3",
        text: "Pratico atividade que realmente gosto",
        why: "Se voce odeia, nao vai sustentar. Movimento nao e punicao — e celebracao do seu corpo.",
        action: "Danca, yoga, caminhada, natacao, pilates, bike. Teste opcoes ate encontrar o que traz prazer genuino.",
      },
    ],
  },
  {
    id: "sono",
    title: "Sono Reparador",
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-700",
    items: [
      {
        id: "s1",
        text: "Durmo entre 7 e 8 horas por noite",
        why: "Sono e quando o corpo se regenera, o cerebro se limpa de toxinas, hormonios se equilibram. Sem sono de qualidade, tudo desmorona.",
        action: "Defina hora de dormir retrocedendo a partir do horario de acordar. Respeite esse compromisso com voce mesma.",
      },
      {
        id: "s2",
        text: "Tenho ritual de desaceleracao antes de dormir",
        why: "Sem descompressao, o sistema nervoso permanece ativado. Voce deita mas nao descansa. Dorme mas acorda cansada.",
        action: "1h antes: desligue telas. Aplique lavanda ou vetiver nos pulsos. 3 alongamentos suaves. Anote 3 pendencias e 1 gratidao.",
      },
      {
        id: "s3",
        text: "Acordo me sentindo restaurada",
        why: "Quantidade nao e qualidade. 8h de sono agitado nao restabelecem o corpo. Sono profundo e o objetivo.",
        action: "Quarto fresco (18-21C), escuridao total, horario regular. Evite cafeina apos 14h.",
      },
    ],
  },
  {
    id: "estresse",
    title: "Gestao de Estresse",
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
    items: [
      {
        id: "e1",
        text: "Tenho tecnicas de regulacao que funcionam para mim",
        why: "Voce nao pode eliminar o estresse. Mas pode — e deve — criar estrategias de regulacao emocional consciente.",
        action: "Box breathing (4-4-4-4): inspire 4 tempos, segure 4, expire 4, segure 4. Repita 5 vezes. Ativa o parassimpatico instantaneamente.",
      },
      {
        id: "e2",
        text: "Pratico essas tecnicas regularmente, nao so em crise",
        why: "Tecnicas praticadas quando calma tornam-se automaticas quando voce realmente precisar. Treine o sistema nervoso.",
        action: "Escolha 2 tecnicas e pratique por 2 semanas, mesmo sem necessidade imediata.",
      },
      {
        id: "e3",
        text: "Reconheco meus gatilhos de estresse",
        why: "Identificar o gatilho quebra o ciclo automatico de estresse. Nao da pra mudar o que nao se enxerga.",
        action: "Escreva livremente por 10 minutos sem editar. Externalizar pensamentos traz clareza sobre o que realmente importa.",
      },
    ],
  },
  {
    id: "conexoes",
    title: "Conexoes Sociais",
    color: "bg-pink-50 border-pink-200",
    badgeColor: "bg-pink-100 text-pink-700",
    items: [
      {
        id: "co1",
        text: "Tenho pessoas com quem posso ser vulneravel",
        why: "Relacoes de qualidade reduzem riscos de doencas cardiacas, depressao e declinio cognitivo. Conexao real nao acontece por mensagem.",
        action: "Esta semana, convide uma pessoa importante para um cafe, caminhada ou jantar. Presenca, sem agenda.",
      },
      {
        id: "co2",
        text: "Priorizo tempo de qualidade com quem amo",
        why: "Solidao nao e estar sozinha — e estar desconectada. Em era de mil contatos digitais, a epidemia de solidao nunca foi tao alta.",
        action: "Desligue o celular durante conversas importantes. Pergunte de verdade: 'Como voce esta?' e escute a resposta.",
      },
      {
        id: "co3",
        text: "Nutro amizades de forma ativa, nao passiva",
        why: "Relacoes precisam de investimento. Esperar que o outro tome iniciativa e formula para o isolamento.",
        action: "Agende encontros presenciais. Compartilhe vulnerabilidades, nao so sucessos. Participe de grupos com interesses em comum.",
      },
    ],
  },
  {
    id: "limites",
    title: "Limites e Autocuidado",
    color: "bg-teal-50 border-teal-200",
    badgeColor: "bg-teal-100 text-teal-700",
    items: [
      {
        id: "l1",
        text: "Sei dizer nao quando necessario",
        why: "Dizer nao para os outros e dizer sim para voce. Isso nao e egoismo — e autocuidado responsavel.",
        action: "Esta semana, pratique dizer nao a uma coisa pequena. Comeca desconfortavel. Fica libertador.",
      },
      {
        id: "l2",
        text: "Protejo meu tempo e energia conscientemente",
        why: "Disponibilidade 24/7 nao e profissionalismo — e autossabotagem. Urgencia dos outros nem sempre e sua emergencia.",
        action: "Defina 1 limite claro: hora de desligar o trabalho, nao responder mensagens fora do horario, ou uma pratica de autocuidado inegociavel.",
      },
      {
        id: "l3",
        text: "Tenho praticas regulares de autocuidado",
        why: "Autocuidado nao e spa. E qualquer acao que protege e nutre sua saude fisica, mental e emocional de forma sustentavel.",
        action: "Liste 3 praticas que voce sabe que te fazem bem e que estao sendo negligenciadas. Escolha 1 e agende na proxima semana.",
      },
    ],
  },
];

const STORAGE_KEY = "ev_checklist_progress";

const ProgramChecklist = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allItems = categories.flatMap((c) => c.items);
  const totalChecked = allItems.filter((item) => checked[item.id]).length;
  const total = allItems.length;

  const getScore = () => {
    if (totalChecked <= 7) return { label: "Iniciando a jornada", color: "text-rose-600" };
    if (totalChecked <= 14) return { label: "Construindo consciência", color: "text-amber-600" };
    if (totalChecked <= 18) return { label: "No caminho certo", color: "text-blue-600" };
    return { label: "Mulher saudavel", color: "text-green-600" };
  };

  const score = getScore();

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Link to="/programas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" /> Programas
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-1">Checklist da Mulher Saudavel</h1>
          <p className="text-sm text-muted-foreground mb-3">21 ajustes simples para elevar sua qualidade de vida. Descubra onde voce esta e o que precisa mudar.</p>

          <div className="bg-muted/40 rounded-2xl p-4 flex items-center gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-sm font-semibold ${score.color}`}>{score.label}</span>
                <span className="text-xs text-muted-foreground">{totalChecked}/{total}</span>
              </div>
              <div className="bg-muted rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(totalChecked / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {categories.map((cat, ci) => {
            const catChecked = cat.items.filter((i) => checked[i.id]).length;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: ci * 0.07 }}
                className={`border rounded-2xl overflow-hidden ${cat.color}`}
              >
                <div className="px-5 py-3 flex items-center justify-between">
                  <h2 className="font-semibold text-sm text-foreground">{cat.title}</h2>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                    {catChecked}/{cat.items.length}
                  </span>
                </div>

                <div className="px-5 pb-4 space-y-3">
                  {cat.items.map((item) => {
                    const isExpanded = expanded === item.id;
                    const isChecked = checked[item.id];
                    return (
                      <div key={item.id} className="bg-white/50 rounded-xl p-3">
                        <button
                          onClick={() => toggle(item.id)}
                          className="w-full flex items-start gap-3 text-left"
                        >
                          {isChecked ? (
                            <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground" />
                          )}
                          <p className={`text-sm font-medium leading-snug flex-1 ${isChecked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {item.text}
                          </p>
                        </button>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : item.id)}
                          className="ml-8 text-[11px] text-muted-foreground hover:text-foreground mt-1.5 underline underline-offset-2"
                        >
                          {isExpanded ? "Menos detalhes" : "Ver detalhes e como aplicar"}
                        </button>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-8 mt-2 space-y-1.5"
                          >
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.why}</p>
                            <div className="bg-white/70 rounded-lg p-2.5">
                              <p className="text-[11px] font-semibold text-foreground mb-0.5">Como aplicar:</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{item.action}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Nao existe pontuacao perfeita. Escolha 1-3 areas para focar nos proximos 30 dias.
        </motion.p>
      </div>
    </div>
  );
};

export default ProgramChecklist;
