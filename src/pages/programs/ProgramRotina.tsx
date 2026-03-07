import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, Circle, Sun, Clock, Moon, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const blocks = [
  {
    id: "manha",
    label: "Bloco 1",
    title: "Ativacao Matinal",
    subtitle: "7 a 12 minutos",
    icon: Sun,
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-amber-100",
    iconColor: "text-amber-600",
    badgeColor: "bg-amber-100 text-amber-700",
    intro: "O objetivo e estabilizar sua energia para o dia. Nao se trata de transformacao magica — e comecar com o corpo hidratado, a mente clara e uma sensacao de controle, mesmo que minima.",
    steps: [
      {
        id: "m1",
        time: "2 min",
        title: "Hidratacao estrategica",
        description: "Ao acordar, beba 1 copo grande de agua (300ml) com uma pitada de sal marinho ou algumas gotas de limao espremido na hora.",
        tip: "Deixe um copo de agua ao lado da cama na noite anterior.",
      },
      {
        id: "m2",
        time: "3 min",
        title: "Respiracao reguladora",
        description: "Inspire contando ate 4, segure por 4 segundos, expire contando ate 6. Repita por 3 minutos (8-10 ciclos). Pode fazer sentada na cama.",
        tip: "A expiracao mais longa que a inspiracao sinaliza ao cerebro que voce esta segura, reduzindo cortisol.",
      },
      {
        id: "m3",
        time: "2 min",
        title: "Decisao alimentar consciente",
        description: "Antes de sair de casa, decida sua primeira refeicao. Nao deixe para decidir com fome ou pressa. Planeje na calma dos primeiros minutos.",
        tip: "Proteina + gordura boa + carboidrato complexo = energia estavel o dia todo.",
      },
      {
        id: "m4",
        time: "1 min",
        title: "Oleo essencial para foco",
        description: "1-2 gotas de alecrim, limao ou hortela-pimenta na palma das maos. Esfregue e inale profundamente 3 vezes. Ou aplique nos pulsos (diluido).",
        tip: "Alecrim para concentracao, limao para energia, hortela-pimenta para despertar mental.",
      },
    ],
  },
  {
    id: "dia",
    label: "Bloco 2",
    title: "Sustentacao Diurna",
    subtitle: "Micro ajustes ao longo do dia",
    icon: Clock,
    color: "bg-blue-50 border-blue-200",
    headerColor: "bg-blue-100",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
    intro: "Sao micro ajustes que se integram a sua rotina existente. Nao sao mais tarefas — sao decisoes pontuais que evitam a queda de energia e a inflamacao emocional que sabota seus dias.",
    steps: [
      {
        id: "d1",
        time: "contínuo",
        title: "Regra do 3x Agua",
        description: "Manha (ate 12h): 500-700ml. Tarde (12-18h): 700ml-1L. Noite (apos 18h): 300-500ml. Use garrafa de 500ml para controle visual.",
        tip: "Amarre o habito a algo que voce ja faz: todo fim de tarefa, beba um copo.",
      },
      {
        id: "d2",
        time: "preventivo",
        title: "Lanche inteligente",
        description: "Tenha sempre a mao opcoes que combinam proteina, gordura boa e fibra: castanhas + frutas secas, ovo cozido + tomate, abacate com limao.",
        tip: "Prepare no domingo ou na noite anterior. Remova a decisao do momento de vulnerabilidade.",
      },
      {
        id: "d3",
        time: "90 seg",
        title: "Pausa de regulacao",
        description: "Quando sentir tensao crescendo: pare, feche os olhos ou olhe para um ponto fixo, respire fundo e devagar 5 vezes. Depois volte ao que estava fazendo.",
        tip: "Use antes de reunioes importantes, depois de conversas tensas, quando sentir irritacao crescendo.",
      },
      {
        id: "d4",
        time: "2 min",
        title: "Descarregar tensao no banheiro",
        description: "Gire o pescoco lentamente 5x cada lado. Levante os ombros ate as orelhas, segure 3s, solte com forca — repita 5x. Massageie as temporas por 30s.",
        tip: "O banheiro e o unico lugar com privacidade garantida em qualquer ambiente. Use esse espaco estrategicamente.",
      },
    ],
  },
  {
    id: "noite",
    label: "Bloco 3",
    title: "Descompressao Noturna",
    subtitle: "10 minutos de desligamento",
    icon: Moon,
    color: "bg-indigo-50 border-indigo-200",
    headerColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-100 text-indigo-700",
    intro: "Se voce nao cria um ritual de descompressao, seu sistema nervoso permanece ativado. Voce deita mas nao descansa. Sao apenas 10 minutos, mas eles fazem diferenca entre uma noite reparadora e uma noite inquieta.",
    steps: [
      {
        id: "n1",
        time: "20 min antes",
        title: "Sem telas",
        description: "Desligue celular, TV e computador pelo menos 20 minutos antes de dormir. A luz azul bloqueia melatonina e mantém o cerebro ativo.",
        tip: "Substitua por leitura, alongamento suave ou journaling.",
      },
      {
        id: "n2",
        time: "1 min",
        title: "Oleo calmante",
        description: "Aplique lavanda, camomila ou vetiver nos pulsos e pescoco. Respire fundo 3 vezes. Sinal poderoso ao corpo de que e hora de desacelerar.",
        tip: "Sempre diluido em oleo vegetal para pele sensivel.",
      },
      {
        id: "n3",
        time: "3 min",
        title: "Tres movimentos de alongamento",
        description: "Torcao deitada, alongamento de pernas na parede, postura da crianca — 1 minuto cada. Libere a tensao acumulada no corpo antes de dormir.",
        tip: "Faca com respiracao lenta e consciente, sem pressa.",
      },
      {
        id: "n4",
        time: "3 min",
        title: "Lista de descarrego mental",
        description: "Anote em um papel: 3 coisas que ficaram pendentes para amanha + 1 coisa pela qual voce e grata hoje. Isso libera a mente e encerra o dia com intencao.",
        tip: "Escrever as pendencias 'transfere' a responsabilidade para o papel, permitindo o cerebro relaxar.",
      },
    ],
  },
];

const getStorageKey = (date: string) => `ev_rotina_${date}`;
const getToday = () => new Date().toISOString().split("T")[0];

const ProgramRotina = () => {
  const today = getToday();
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(getStorageKey(today)) || "{}");
    } catch {
      return {};
    }
  });
  const [openBlock, setOpenBlock] = useState<string | null>("manha");

  useEffect(() => {
    localStorage.setItem(getStorageKey(today), JSON.stringify(completed));
  }, [completed, today]);

  const toggle = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allSteps = blocks.flatMap((b) => b.steps);
  const totalCompleted = allSteps.filter((s) => completed[s.id]).length;
  const total = allSteps.length;

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
          <h1 className="text-2xl font-bold text-foreground mb-1">Rotina Natural — Metodo 3B</h1>
          <p className="text-sm text-muted-foreground mb-3">O metodo dos 3 blocos para viver com qualidade de vida mesmo na correria. Manha, dia e noite em poucos minutos.</p>

          <div className="flex items-center gap-3 mb-1">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: total > 0 ? `${(totalCompleted / total) * 100}%` : "0%" }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{totalCompleted}/{total} hoje</span>
          </div>
          <p className="text-[11px] text-muted-foreground">Progresso de hoje ({today.split("-").reverse().join("/")})</p>
        </motion.div>

        <div className="space-y-4">
          {blocks.map((block, bi) => {
            const BlockIcon = block.icon;
            const isOpen = openBlock === block.id;
            const blockCompleted = block.steps.filter((s) => completed[s.id]).length;
            const blockTotal = block.steps.length;

            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: bi * 0.1 }}
                className={`border rounded-2xl overflow-hidden ${block.color}`}
              >
                <button
                  onClick={() => setOpenBlock(isOpen ? null : block.id)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <BlockIcon className={`h-5 w-5 shrink-0 ${block.iconColor}`} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${block.badgeColor}`}>{block.label}</span>
                        <span className="text-xs text-muted-foreground">{block.subtitle}</span>
                      </div>
                      <p className="font-semibold text-sm text-foreground mt-0.5">{block.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{blockCompleted}/{blockTotal}</span>
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
                        <p className="text-xs text-muted-foreground leading-relaxed italic">{block.intro}</p>

                        <div className="space-y-3">
                          {block.steps.map((step) => (
                            <div key={step.id} className="bg-white/50 rounded-xl p-4">
                              <div className="flex items-start gap-3">
                                <button onClick={() => toggle(step.id)} className="mt-0.5 shrink-0">
                                  {completed[step.id] ? (
                                    <CheckCircle className={`h-5 w-5 ${block.iconColor}`} />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <p className={`text-sm font-medium leading-snug ${completed[step.id] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                      {step.title}
                                    </p>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${block.badgeColor} shrink-0`}>{step.time}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{step.description}</p>
                                  <div className="bg-white/70 rounded-lg px-3 py-2">
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                                      <span className="font-semibold text-foreground">Dica: </span>
                                      {step.tip}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-muted/30 rounded-2xl p-4 text-center"
        >
          <p className="text-xs font-semibold text-foreground mb-1">O que voce ganha com o Metodo 3B</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-left">
            {["Sono mais profundo", "Menos ansiedade noturna", "Mais foco e energia", "Menos dependencia de cafe"].map((benefit) => (
              <div key={benefit} className="flex items-start gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <p className="text-xs text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">Progresso reinicia todo dia. Seu historico fica salvo neste dispositivo.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramRotina;
