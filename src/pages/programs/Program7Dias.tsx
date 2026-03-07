import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTracking } from "@/hooks/useTracking";

const days = [
  {
    day: 1,
    title: "Mapeando suas dores físicas",
    color: "bg-green-50 border-green-200",
    headerColor: "bg-green-100",
    iconColor: "text-green-600",
    description: "Antes de transformar, precisamos conhecer. Hoje é o dia de parar e olhar com gentileza para o seu corpo.",
    tasks: [
      {
        id: "1a",
        text: "Reserve 15 minutos em um momento tranquilo",
        detail: "Encontre um lugar calmo. Respire fundo e prepare-se para observar seu corpo com curiosidade amorosa.",
      },
      {
        id: "1b",
        text: "Liste as regiões do corpo onde sente desconforto",
        detail: "Cabeça/pescoço, ombros/costas, articulações, sistema digestivo. Anote a intensidade de 1 a 10.",
      },
      {
        id: "1c",
        text: "Identifique os gatilhos de cada dor",
        detail: "O que piora a dor? Postura, alimentação, estresse, clima? Seja honesta e detalhista.",
      },
      {
        id: "1d",
        text: "Anote quando cada dor começou e o que já tentou",
        detail: "Quanto mais clareza agora, mais eficaz será seu caminho de cura.",
      },
    ],
    reflection: "Existe uma conexão entre alguma dor física e momentos de mais estresse na sua vida?",
  },
  {
    day: 2,
    title: "Mapeando suas dores emocionais",
    color: "bg-rose-50 border-rose-200",
    headerColor: "bg-rose-100",
    iconColor: "text-rose-600",
    description: "Suas emoções não são exagero. Elas são mensagens valiosas sobre o que precisa ser ajustado na sua vida.",
    tasks: [
      {
        id: "2a",
        text: "Identifique os sintomas emocionais presentes",
        detail: "Ansiedade constante, dificuldade de relaxar, irritabilidade, tristeza sem causa, dificuldade de concentração.",
      },
      {
        id: "2b",
        text: "Faça a Roda das Emoções",
        detail: "Para cada emoção (ansiedade, tristeza, estresse, raiva), dê uma nota de 0 a 10 conforme a frequência semanal.",
      },
      {
        id: "2c",
        text: "Identifique os gatilhos emocionais",
        detail: "Situações, pessoas ou ambientes que drenam sua energia. Padrões de pensamento negativos recorrentes.",
      },
      {
        id: "2d",
        text: "Reflita sobre a conexão corpo-emoção",
        detail: "A tensão no pescoço aumenta nos dias de maior ansiedade? Observe esses padrões.",
      },
    ],
    reflection: "Qual emoção está consumindo mais da sua energia nessa fase da sua vida?",
  },
  {
    day: 3,
    title: "Ajustando sua alimentação",
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-amber-100",
    iconColor: "text-amber-600",
    description: "Alimentação é medicina. Pequenas mudanças podem resultar em grandes transformações na sua energia e alívio de dores.",
    tasks: [
      {
        id: "3a",
        text: "Escolha 3 mudanças simples para implementar esta semana",
        detail: "Comece o dia com água morna e limão. Adicione vegetais em pelo menos 2 refeições. Substitua açúcar refinado por mel ou frutas.",
      },
      {
        id: "3b",
        text: "Remova 1 alimento inflamatório",
        detail: "Açúcar refinado, farinha branca, alimentos ultraprocessados, frituras ou excesso de laticínios. Escolha um para reduzir.",
      },
      {
        id: "3c",
        text: "Adicione 1 alimento anti-inflamatório",
        detail: "Cúrcuma, gengibre, alho, azeite extra virgem, oleaginosas, frutas vermelhas ou vegetais verdes escuros.",
      },
      {
        id: "3d",
        text: "Desafio do dia: prepare uma refeição totalmente natural",
        detail: "Colorida, sem ultraprocessados. Celebre esse ato de cuidado consigo mesma!",
      },
    ],
    reflection: "Quais alimentos você percebe que mais afetam seu humor ou sua energia?",
  },
  {
    day: 4,
    title: "Ritual matinal com intenção",
    color: "bg-purple-50 border-purple-200",
    headerColor: "bg-purple-100",
    iconColor: "text-purple-600",
    description: "Como você começa o dia determina como você vive o dia. Mesmo 10 minutos dedicados a você podem transformar sua energia.",
    tasks: [
      {
        id: "4a",
        text: "Despertar consciente: 3 respirações antes do celular",
        detail: "Ao abrir os olhos, respire fundo 3 vezes antes de pegar o celular. Agradeça por mais um dia.",
      },
      {
        id: "4b",
        text: "Hidratação imediata: água morna com limão",
        detail: "Beba um copo grande de água morna, de preferência com algumas gotas de limão.",
      },
      {
        id: "4c",
        text: "Movimento gentil: 5 minutos de alongamento",
        detail: "Alongamentos suaves ou saudações ao sol para despertar o corpo. Sem pressa.",
      },
      {
        id: "4d",
        text: "Escreva sua intenção do dia",
        detail: "Complete a frase: 'Hoje eu escolho...' ou 'Hoje eu permito...'. Anote ou diga em voz alta.",
      },
    ],
    reflection: "Desenhe seu ritual ideal considerando o tempo que você tem disponível. O que é possível e sustentável?",
  },
  {
    day: 5,
    title: "Óleos essenciais para sua rotina",
    color: "bg-teal-50 border-teal-200",
    headerColor: "bg-teal-100",
    iconColor: "text-teal-600",
    description: "Com apenas 4 ou 5 óleos essenciais de qualidade, você cria uma rotina completa de autocuidado.",
    tasks: [
      {
        id: "5a",
        text: "Prepare o blend para ansiedade",
        detail: "3 gotas lavanda + 2 gotas olíbano + 1 gota bergamota. Use no difusor ou dilua em 10ml óleo carreador para aplicar nos pulsos.",
      },
      {
        id: "5b",
        text: "Prepare o blend para sono profundo",
        detail: "4 gotas lavanda + 2 gotas cedro + 1 gota camomila. Difunda 30 minutos antes de dormir ou aplique diluído na planta dos pés.",
      },
      {
        id: "5c",
        text: "Prepare o blend para energia matinal",
        detail: "3 gotas limão + 2 gotas alecrim + 1 gota hortelã-pimenta. Inale diretamente ou difunda durante seu ritual matinal.",
      },
      {
        id: "5d",
        text: "Anote como cada óleo afetou seu estado",
        detail: "Qual te trouxe mais alívio? Qual você quer usar com mais frequência? O corpo responde diferente para cada pessoa.",
      },
    ],
    reflection: "Qual sensação você mais quer cultivar: calma, foco ou energia? Qual blend você vai adotar na sua rotina?",
  },
  {
    day: 6,
    title: "Movimento terapêutico",
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-100",
    iconColor: "text-blue-600",
    description: "Movimento não é punição. É celebração do seu corpo, medicina que alivia dores e libera tensões acumuladas.",
    tasks: [
      {
        id: "6a",
        text: "Escolha uma prática terapêutica para hoje",
        detail: "Yoga suave, caminhada de 20 minutos, dança livre, pilates ou simples alongamento matinal de 10 minutos.",
      },
      {
        id: "6b",
        text: "Pratique a sequência para dor muscular",
        detail: "Blend: 4 gotas copaíba + 3 gotas pimenta preta + 2 gotas cedro atlas em 20ml óleo vegetal. Massageie a área com movimentos circulares.",
      },
      {
        id: "6c",
        text: "Integre movimento pequeno ao longo do dia",
        detail: "A cada 1 hora sentada, levante e faça 2 minutos de movimento. Ative a circulação e reduza a rigidez.",
      },
      {
        id: "6d",
        text: "Anote como se sentiu depois do movimento",
        detail: "Mais leve? Menos dor? Mais disposta? Registre para lembrar nos dias sem motivação.",
      },
    ],
    reflection: "Qual forma de movimento trouxe mais prazer ou alívio? Como incluí-la na sua rotina de forma sustentável?",
  },
  {
    day: 7,
    title: "Plano de continuidade",
    color: "bg-emerald-50 border-emerald-200",
    headerColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
    description: "Chegamos ao último dia desta jornada — mas este é apenas o começo. A transformação real acontece na consistência.",
    tasks: [
      {
        id: "7a",
        text: "Liste as 3 práticas mais impactantes da semana",
        detail: "Quais mudanças fizeram mais diferença para você? Essas são as práticas que precisam entrar na sua rotina primeiro.",
      },
      {
        id: "7b",
        text: "Defina seu checklist de autocuidado semanal",
        detail: "Ritual matinal, pelo menos 1 refeição anti-inflamatória, 10 min de movimento, uso de óleos, 1 momento de respiração consciente.",
      },
      {
        id: "7c",
        text: "Antecipe os obstáculos e defina soluções",
        detail: "\"Não tenho tempo\" → 5 minutos diários. \"Esqueci\" → alarme no celular. \"Sem motivação\" → aja mesmo sem vontade. A ação gera motivação.",
      },
      {
        id: "7d",
        text: "Celebre cada sinal de progresso",
        detail: "Dormiu melhor? Menos ansiedade? Mais paciência? Menos dor? Esses são sinais reais de transformação. Celebre!",
      },
    ],
    reflection: "Imagine onde você pode estar em 30 dias se mantiver consistência nas 3 práticas que escolheu. O que muda na sua vida?",
  },
];

const STORAGE_KEY = "ev_7dias_progress";

const Program7Dias = () => {
  const { track } = useTracking();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  });
  const [openDay, setOpenDay] = useState<number | null>(() => { track("program_open", { program: "7-dias" }); return 1; });
  const [reflections, setReflections] = useState<Record<number, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY + "_reflections") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTasks));
    // rastrear conclusão completa (todos os 7 dias)
    if (days.every((d) => d.tasks.every((t) => completedTasks[t.id]))) {
      track("program_complete", { program: "7-dias" });
    }
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + "_reflections", JSON.stringify(reflections));
  }, [reflections]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      if (next[taskId]) track("program_task", { program: "7-dias", item_id: taskId });
      return next;
    });
  };

  const getDayCompleted = (dayNum: number) => {
    const d = days[dayNum - 1];
    return d.tasks.every((t) => completedTasks[t.id]);
  };

  const totalCompleted = days.filter((d) => getDayCompleted(d.day)).length;

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
          <h1 className="text-2xl font-bold text-foreground mb-1">7 Dias para Organizar Sua Saude</h1>
          <p className="text-sm text-muted-foreground mb-3">Uma jornada para mapear suas dores, ajustar sua rotina e criar práticas naturais de autocuidado.</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(totalCompleted / 7) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{totalCompleted}/7 dias</span>
          </div>
        </motion.div>

        <div className="space-y-3">
          {days.map((d, i) => {
            const isCompleted = getDayCompleted(d.day);
            const isOpen = openDay === d.day;
            const tasksCount = d.tasks.filter((t) => completedTasks[t.id]).length;

            return (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className={`border rounded-2xl overflow-hidden ${d.color}`}
              >
                <button
                  onClick={() => setOpenDay(isOpen ? null : d.day)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {isCompleted ? (
                      <CheckCircle className={`h-5 w-5 shrink-0 ${d.iconColor}`} />
                    ) : (
                      <div className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center ${d.iconColor.replace("text-", "border-")}`}>
                        <span className={`text-[10px] font-bold ${d.iconColor}`}>{d.day}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">DIA {d.day}</p>
                      <p className="font-semibold text-sm text-foreground leading-snug truncate">{d.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{tasksCount}/{d.tasks.length}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">{d.description}</p>

                        <div className="space-y-2">
                          {d.tasks.map((task) => (
                            <button
                              key={task.id}
                              onClick={() => toggleTask(task.id)}
                              className="w-full flex items-start gap-3 text-left group"
                            >
                              {completedTasks[task.id] ? (
                                <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${d.iconColor}`} />
                              ) : (
                                <Circle className="h-5 w-5 shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                              )}
                              <div>
                                <p className={`text-sm font-medium leading-snug ${completedTasks[task.id] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                  {task.text}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{task.detail}</p>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="pt-2">
                          <p className="text-xs font-semibold text-foreground mb-1.5">Reflexao do dia</p>
                          <p className="text-xs text-muted-foreground mb-2 italic">"{d.reflection}"</p>
                          <textarea
                            className="w-full text-xs p-3 rounded-xl border bg-white/60 resize-none focus:outline-none focus:ring-1 focus:ring-current placeholder:text-muted-foreground"
                            rows={3}
                            placeholder="Escreva sua reflexao aqui..."
                            value={reflections[d.day] || ""}
                            onChange={(e) => setReflections((prev) => ({ ...prev, [d.day]: e.target.value }))}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Seu progresso e salvo automaticamente neste dispositivo.
        </motion.p>
      </div>
    </div>
  );
};

export default Program7Dias;
